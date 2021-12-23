import React, { useState } from 'react'
import { useNavigation, CommonActions } from '@react-navigation/native'
import styled from 'styled-components/native'
import Global from '../../global/global'
import GText from '../../global/texts'
import { SignInAPI, TestServerAPI } from '../../services/Api/routesApi'
import profile from '../../services/SQLite/tables/profile'
import { useEffect } from 'react/cjs/react.development'
import { CreateOnDB, GetOnDB } from '../../services/routesData/routesData'

export default function FormAltServer() {
  const BaseForm = GText.infoDB.Table.Server.fields
  let ObjForm = {}
  Object.keys(BaseForm).forEach((obj) => {
    ObjForm[BaseForm[obj]] = ''
  })
  const FormArray = Object.keys(ObjForm)
  const navigation = useNavigation()
  const [form, setForm] = useState(ObjForm)
  const [signInLoading, setSignInLoading] = useState(false)

  async function handleInitialDataOnForm() {
    const ret = await GetOnDB(GText.infoDB.Table.Server.name)
    if (ret.length > 0) {
      const newID = ret[0][BaseForm.id] + 1
      handleChangeText(BaseForm.id, newID.toString())
    }
    else {
      handleChangeText(BaseForm.id, '1')
    }
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
     
     navigation.reset({ routes: [{ name: GText.Login }] })
    }
    catch(e) {
      alert(`Erro ao validar endereço do Servidor, verifique os paramêtros informados!
      
${e}`)
      console.log('erro teste', e)
    }
    setSignInLoading(false)
    //  await CreateOnDB(GText.infoDB.Table.Server.name, form)
    
  }

  function handleChangeText(field, value) {
    let copyForm = form
    copyForm[field] = value
    let baseURL = copyForm[BaseForm.protocol] + '://' + copyForm[BaseForm.ip] + ':' + copyForm[BaseForm.port] + '/'

    copyForm[BaseForm.baseURL] = baseURL.length > 5 ? baseURL : ''
    setForm({ ...copyForm })
  }
  return (
    <Container>
      <Text>{GText.AlterServerMessage}</Text>
      <AreaInputs>
        {
          FormArray.map((obj, key) => (
            <Input key={key} placeholder={GText.PlaceholderFormServer.PT[obj]} autoCapitalize='none'
              autoCorrect={false} value={form[obj]} onChangeText={t => handleChangeText(obj, t)}
              editable={(obj === BaseForm.id | obj === BaseForm.baseURL) ? false : !signInLoading} />
          ))
        }
      </AreaInputs>
      {signInLoading &&
        <LoadingIcon size='large' color='#0C0A0A' />
      }
      <SingInButton onPress={SignInClick} >
        <CustonButtonText>{GText.ButtonSignIn}</CustonButtonText>
      </SingInButton>
    </Container>
  )
}
const Input = styled.TextInput`
font-size: 20px;
color: #000;
align-items: center;
font-size:16px;
background-color: #fff;
border: 1px ${Global.blackTransparent} solid;
border-radius: 8px;
margin: 5px 0;
padding-left: 16px;

`
export const LoadingIcon = styled.ActivityIndicator`
`
const AreaInputs = styled.View`
width: 90%;
margin: 20px 0 ;
`


const Container = styled.ScrollView`
/* flex: 1;
justify-content: center;
align-items: center; */
padding: 8%;
background-color: "#efefef";
`

const SingInButton = styled.TouchableOpacity`
height: 40px;
width: 80%;
background-color: #1085BE;
border-radius: 10px;
justify-content: center;
align-items: center;
margin: 20px 0;
`
const CustonButtonText = styled.Text`
font-size: 18px;
color: #FFF;
font-weight:bold;
`
const Text = styled.Text`
font-size: 22px;
font-weight: bold;
`
