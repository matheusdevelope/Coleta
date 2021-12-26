import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import styled from 'styled-components/native'
import Global from '../../global/global'
import GText from '../../global/texts'
import { TestServerAPI } from '../../services/Api/routesApi'
import { useEffect } from 'react/cjs/react.development'
import { CreateOnDB, DeleteServerDB, GetOnDB } from '../../services/routesData/routesData'
import SelectPicker from '../../componentes/selectPicker/selectPicker'
import { GetDataFormatPT } from '../../componentes/functions/Itens'
import Button from '../../componentes/button/button'

export default function FormAltServer() {
  const BaseForm = GText.infoDB.Table.Server.fields
  let ObjForm = {}
  Object.keys(BaseForm).forEach((obj) => {
    ObjForm[BaseForm[obj]] = ''
  })
  const navigation = useNavigation()
  const [form, setForm] = useState(ObjForm)
  const [ListOfServer, setListOfForm] = useState([])
  const [signInLoading, setSignInLoading] = useState(false)
  const [showButton, setShowButton] = useState(false)
  const [showNewServer, setShowNewServer] = useState(false)

  async function handleInitialDataOnForm() {
    const ret = await GetOnDB(GText.infoDB.Table.Server.name)
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

  function handleChangeText(field, value) {
    let copyForm = form
    copyForm[field] = value
    let baseURL = copyForm[BaseForm.protocol] + '://' + copyForm[BaseForm.ip] + ':' + copyForm[BaseForm.port] + '/'
    copyForm[BaseForm.baseURL] = baseURL.length > 5 ? baseURL : ''
    copyForm[BaseForm.data] = GetDataFormatPT()
    setForm({ ...copyForm })
  }

  useEffect(() => {
    handleInitialDataOnForm()
  }, [])

  async function SignInClick() {
    setSignInLoading(true)
    try {
      const ret = await TestServerAPI(form[BaseForm.baseURL] + form[BaseForm.testRoute])
      ret.status >= 200 & ret.status < 300 &&
        await CreateOnDB(GText.infoDB.Table.Server.name, form)
        handleInitialDataOnForm()
        setShowNewServer(false)
      //  navigation.reset({ routes: [{ name: GText.Login }] })
    }
    catch (e) {
      alert(`Erro ao validar endereço do Servidor, verifique os paramêtros informados!
      
${e}`)
      console.log('erro teste', e)
    }
    setSignInLoading(false)
  }

  const options = {
    Protocol: [{ label: "HTTP", value: 'http' }, { label: "HTTPS", value: 'https' }],
    ServerDefault: [{ label: GText.yes, value: GText.ValueDefaultServer }, { label: GText.no, value: 'N' }]
    ,

  }
  async function handleDelete(id) {
    await DeleteServerDB(id)
    handleInitialDataOnForm()
  }
  function RenderListOfServers() {
    return (
      <ContainerList>
        <List>
          {ListOfServer.map((item, key) => (
            <ViewItemList key={key} onPress={()=>{setShowButton(!showButton)}}>
              <>
              <Text>{item[BaseForm.name]}</Text>
              <TextList>{item[BaseForm.description]}</TextList>
              <TextList>{item[BaseForm.baseURL]}</TextList>
              </>
              {
                showButton && <Button name={Global.IconTrash} color={Global.colorButtonDelete} size={40} 
              onClick={()=>{handleDelete(item[BaseForm.id])}}/>
              }
             
              
            </ViewItemList>
          ))}
        </List>

        <SingInButton onPress={()=>{setShowNewServer(!showNewServer)}}>
          <Text>{GText.AddServer}</Text>
        </SingInButton>
      </ContainerList>
    )
  }
  return (
    <Container>
      <Text>{GText.AlterServerMessage}</Text>
      {
        !showNewServer ?
          <RenderListOfServers />
          :
          <>
            <AreaInputs>
              <LineButton>
                <TextLabel>{GText.PlaceholderFormServer.PT[BaseForm.name] + ':'}</TextLabel>
                <Input
                  autoCorrect={false} value={form[BaseForm.name]} onChangeText={t => handleChangeText(BaseForm.name, t)}
                  editable={!signInLoading} />
              </LineButton>
              <LineButton>
                <TextLabel>{GText.PlaceholderFormServer.PT[BaseForm.description] + ':'}</TextLabel>
                <Input
                  autoCorrect={false} value={form[BaseForm.description]} onChangeText={t => handleChangeText(BaseForm.description, t)}
                  editable={!signInLoading} />
              </LineButton>
              <LineButton>
                <TextLabel>{GText.PlaceholderFormServer.PT[BaseForm.protocol] + ':'}</TextLabel>
                <SelectPicker name={BaseForm.protocol} options={options.Protocol} onSelect={handleChangeText} />
              </LineButton>
              <LineButton>
                <TextLabel>{GText.PlaceholderFormServer.PT[BaseForm.ip] + ':'}</TextLabel>
                <Input autoCapitalize='none'
                  autoCorrect={false} value={form[BaseForm.ip]} onChangeText={t => handleChangeText(BaseForm.ip, t)}
                  editable={!signInLoading} />
              </LineButton>
              <LineButton>
                <TextLabel>{GText.PlaceholderFormServer.PT[BaseForm.port] + ':'}</TextLabel>
                <Input
                  autoCorrect={false} value={form[BaseForm.port]} onChangeText={t => handleChangeText(BaseForm.port, t)}
                  editable={!signInLoading} keyboardType="numeric" />
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
                  editable={!signInLoading} />
              </LineButton>
              <LineButton>
                <TextLabel>{GText.PlaceholderFormServer.PT[BaseForm.extra] + ':'}</TextLabel>
                <Input autoCorrect={false} value={form[BaseForm.extra]} editable={!signInLoading}
                  onChangeText={t => handleChangeText(BaseForm.extra, t)} />
              </LineButton>
              <LineButton>
                <TextLabel>{GText.PlaceholderFormServer.PT[BaseForm.default] + ':'}</TextLabel>
                <SelectPicker name={BaseForm.default} options={options.ServerDefault} onSelect={handleChangeText} />
              </LineButton>
            </AreaInputs>

            {signInLoading &&
              <LoadingIcon size='large' color='#0C0A0A' />
            }
            <SingInButton onPress={SignInClick} >
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
const ViewItemList = styled.TouchableOpacity`

background-color:${Global.white} ;
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

