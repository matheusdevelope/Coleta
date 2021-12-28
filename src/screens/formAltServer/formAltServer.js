import React, { useState, useRef, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import styled from 'styled-components/native'
import Global from '../../global/global'
import GText from '../../global/texts'
import { TestServerAPI } from '../../services/Api/routesApi'
import { CreateOnDB, DeleteServerDB, GetOnDB, UpdateServerDB } from '../../services/routesData/routesData'
import SelectPicker from '../../componentes/selectPicker/selectPicker'
import { GetDataFormatPT } from '../../componentes/functions/Itens'
import Button from '../../componentes/button/button'
import ConfirmationModal from '../../componentes/modalConfirmation/modalConfirmation'
import { BackHandler } from 'react-native'
export default function FormAltServer({ route }) {
  const BaseForm = GText.infoDB.Table.Server.fields
  let ObjForm = {}
  Object.keys(BaseForm).forEach((obj) => {
    ObjForm[BaseForm[obj]] = ''
  })
  const navigation = useNavigation()
  const SelectPickerRef = useRef()
  const OnEdit = useRef(false)
  const ModalRef = useRef(null)
  const [form, setForm] = useState(ObjForm)
  const [ListOfServer, setListOfForm] = useState([])
  const [show, setShow] = useState({
    NewServer: false,
    buttons: [],
    loading: false
  })
  let copyShow = show

  const options = {
    Protocol: [{ label: "HTTP", value: 'http' }, { label: "HTTPS", value: 'https' }],
    ServerDefault: [{ label: GText.yes, value: GText.ValueDefaultServer }, { label: GText.no, value: 'N' }]
  }
  async function handleInitialDataOnForm() {
    const ret = await GetOnDB(GText.infoDB.Table.Server.name)
    for (let i = 0; i < ret.length; i++) {
      copyShow.buttons.push(false)
    }
    setShow({ ...copyShow })
    if (OnEdit.current) {
      const protocol = options.Protocol.find(obj => obj.value = OnEdit.current[BaseForm.protocol])
      SelectPickerRef.current.setValue(protocol)
    }
    if (!OnEdit.current) {
      if (ret.length > 0) {
        const newID = ret[0][BaseForm.id] + 1
        handleChangeText(BaseForm.id, newID.toString())
        setListOfForm([...ret])
      }
      else {
        handleChangeText(BaseForm.id, '1')
        setListOfForm([])
      }
    }
    else {
      setListOfForm([...ret])
    }

  }
  function handleChangeText(field, value) {
    let copyForm = form
    copyForm[field] = value
    let baseURL = copyForm[BaseForm.protocol] + '://' + copyForm[BaseForm.ip] + ':' + copyForm[BaseForm.port] + '/'
    copyForm[BaseForm.baseURL] = baseURL.length > 5 ? baseURL : ''
    copyForm[BaseForm.data] = GetDataFormatPT()
    setForm({ ...copyForm })
  }
  async function AddServerButton() {
    copyShow.loading = true
    setShow({ ...copyShow })
    async function OnDB() {
      if (OnEdit.current) {
        await handleUpdate(form)
      }
      else {
        await CreateOnDB(GText.infoDB.Table.Server.name, form)
      }
    }
    try {
      const ret = await TestServerAPI(form[BaseForm.baseURL] + form[BaseForm.testRoute])
      ret.status >= 200 & ret.status < 300 && OnDB();
      OnEdit.current = false
      setForm(ObjForm)
      handleInitialDataOnForm()
      copyShow.NewServer = false
      setShow({ ...copyShow })

    }
    catch (e) {
      alert(`Erro ao validar endereço do Servidor, verifique os paramêtros informados!
      
${e}`)
      console.log('erro teste', e)
    }
    copyShow.loading = false
    setShow({ ...copyShow })
  }
  async function handleDelete(id) {
    await DeleteServerDB(id)
    handleInitialDataOnForm()
  }
  async function handleSelectServer(obj) {
    ModalRef.current.sendvalue(obj)
    ModalRef.current.toggle()
  }
  async function handleUpdate(obj) {
    try {
      await UpdateServerDB(obj[BaseForm.id], obj)
    }
    catch (e) {
      alert(e)
    }
  }
  async function handleSetDefault(obj) {
    obj[BaseForm.default] = GText.ValueDefaultServer
    const newList = ListOfServer.map((item) => {
      if (item[BaseForm.id] !== obj[BaseForm.id]) {
        item[BaseForm.default] = 'N'
      }
      return item
    })
    for (let i = 0; i < newList.length; i++) {
      try {
        await UpdateServerDB(newList[i][BaseForm.id], newList[i])
        navigation.reset({ routes: [{ name: route.params.origin }] })
      }
      catch (e) {
        alert(e)
      }

    }
  }
  async function handleEditServer(item) {
    setForm({ ...item })
    OnEdit.current = item
    copyShow.NewServer = true
    copyShow.buttons = []
    setShow({ ...copyShow })
  }
  function onBackPress() {
    if (show.NewServer) {
      OnEdit.current = false
      copyShow.NewServer = false
      
      setShow({ ...copyShow })
    } else {
      navigation.canGoBack() && navigation.goBack()
    }
    return true

  }

  useEffect(() => {
    handleInitialDataOnForm()
    BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }

  }, [show.NewServer])

  function RenderListOfServers() {
    return (
      <ContainerList>
        <List>
          {ListOfServer.map((item, key) => {
            return (
              <ViewItemList key={key} onPress={() => { handleSelectServer(item) }} onLongPress={() => {
                copyShow.buttons[key] = !copyShow.buttons[key]
                setShow({ ...copyShow })
              }}
                style={{ backgroundColor: item[BaseForm.default] === GText.ValueDefaultServer ? Global.bluelight3 : Global.white }}>
                <>
                  <Text>{item[BaseForm.name]}</Text>
                  <TextList>{item[BaseForm.description]}</TextList>
                  <TextList>{item[BaseForm.baseURL]}</TextList>
                </>
                {
                  show.buttons[key] &&
                  <Line>
                    <Button name={Global.IconTrash} color={Global.colorButtonDelete} size={40}
                      onClick={() => { handleDelete(item[BaseForm.id]) }} />
                    <Button name={Global.IconEdit} color={Global.colorButtonDelete} size={40}
                      onClick={() => { handleEditServer(item) }} />
                  </Line>
                }
              </ViewItemList>
            )
          })}
        </List>

        <SingInButton onPress={() => {
          copyShow.loading = false
          copyShow.NewServer = !copyShow.NewServer
          setShow({ ...copyShow })
        }}>
          <Text>{GText.AddServer}</Text>
        </SingInButton>
        <ConfirmationModal ref={ModalRef} button={handleSetDefault} label={GText.labelModalSelectServer} />
      </ContainerList>
    )
  }

  return (
    <Container>
      <Text>{GText.AlterServerMessage}</Text>
      {
        !show.NewServer ?
          <RenderListOfServers />
          :
          <>
            <AreaInputs>
              <LineButton>
                <TextLabel>{GText.PlaceholderFormServer.PT[BaseForm.name] + ':'}</TextLabel>
                <Input
                  autoCorrect={false} value={form[BaseForm.name]} onChangeText={t => handleChangeText(BaseForm.name, t)}
                  editable={!show.loading} />
              </LineButton>
              <LineButton>
                <TextLabel>{GText.PlaceholderFormServer.PT[BaseForm.description] + ':'}</TextLabel>
                <Input
                  autoCorrect={false} value={form[BaseForm.description]} onChangeText={t => handleChangeText(BaseForm.description, t)}
                  editable={!show.loading} />
              </LineButton>
              <LineButton>
                <TextLabel>{GText.PlaceholderFormServer.PT[BaseForm.protocol] + ':'}</TextLabel>
                <SelectPicker ref={SelectPickerRef} name={BaseForm.protocol} options={options.Protocol} 
                onSelect={handleChangeText} />
              </LineButton>
              <LineButton>
                <TextLabel>{GText.PlaceholderFormServer.PT[BaseForm.ip] + ':'}</TextLabel>
                <Input autoCapitalize='none'
                  autoCorrect={false} value={form[BaseForm.ip]} onChangeText={t => handleChangeText(BaseForm.ip, t)}
                  editable={!show.loading} />
              </LineButton>
              <LineButton>
                <TextLabel>{GText.PlaceholderFormServer.PT[BaseForm.port] + ':'}</TextLabel>
                <Input
                  autoCorrect={false} value={form[BaseForm.port]} onChangeText={t => handleChangeText(BaseForm.port, t)}
                  editable={!show.loading} keyboardType="numeric" />
              </LineButton>
              <LineButton>
                <TextLabel>{GText.PlaceholderFormServer.PT[BaseForm.baseURL] + ':'}</TextLabel>
                <Input
                  autoCorrect={false} value={form[BaseForm.baseURL]} onChangeText={t => handleChangeText(BaseForm.baseURL, t)}
                  editable={false} />
              </LineButton>
              <LineButton>
                <TextLabel>{GText.PlaceholderFormServer.PT[BaseForm.testRoute] + ':'}</TextLabel>
                <Input autoCapitalize='none'
                  autoCorrect={false} value={form[BaseForm.testRoute]} onChangeText={t => handleChangeText(BaseForm.testRoute, t)}
                  editable={!show.loading} />
              </LineButton>
              <LineButton>
                <TextLabel>{GText.PlaceholderFormServer.PT[BaseForm.extra] + ':'}</TextLabel>
                <Input autoCorrect={false} value={form[BaseForm.extra]} editable={!show.loading}
                  onChangeText={t => handleChangeText(BaseForm.extra, t)} />
              </LineButton>
              {/* <LineButton>
                <TextLabel>{GText.PlaceholderFormServer.PT[BaseForm.default] + ':'}</TextLabel>
                <SelectPicker name={BaseForm.default} options={options.ServerDefault} onSelect={handleChangeText} />
              </LineButton> */}
            </AreaInputs>

            {show.loading &&
              <LoadingIcon size='large' color='#0C0A0A' />
            }
            <SingInButton onPress={AddServerButton} >
              <CustonButtonText>Validar e Adicionar</CustonButtonText>
            </SingInButton>
          </>
      }
    </Container>
  )
}
const Container = styled.ScrollView`
padding: 3%;
`
const ContainerList = styled.View`
flex:1;
justify-content:space-between;
height: ${Global.height - 100 + 'px'};
`
const List = styled.View`
flex: 1;
`
const Line = styled.View`
flex-direction: row ;
justify-content:space-around;
`

const ViewItemList = styled.TouchableOpacity`
margin: ${Global.margin} 0;
border-radius:${Global.borderRadius};
`
const TextList = styled.Text`
font-size: 16px;
color:${Global.textColor};
`
const Text = styled.Text`
font-size: 22px;
font-weight: bold;
color:${Global.black};
`
const AreaInputs = styled.View`
width: 100%;
margin: 20px 0 ;
`
export const LineButton = styled.View`
flex-direction:row;
background-color: ${Global.white};
margin: 5px 0;
padding-left:16px;
border-radius: 8px;
min-height: 50px;
align-items:center;
justify-content:space-between;
`
const TextLabel = styled.Text`
font-size: 16px;
font-weight: bold;
width: 25%;
`
const Input = styled.TextInput`
font-size: 18px;
color: #000;
align-items: center;
background-color: #fff;
border-radius: 8px;
margin: 5px 0;
padding-left: 16px;
min-height: 50px;
flex: 1;
`
export const LoadingIcon = styled.ActivityIndicator`
`
const SingInButton = styled.TouchableOpacity`
height: 40px;
width: 80%;
background-color: #1085BE;
border-radius: 10px;
justify-content: center;
align-items: center;
margin: auto ;
`
const CustonButtonText = styled.Text`
font-size: 18px;
color: #FFF;
font-weight:bold;
`