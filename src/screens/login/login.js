import React, { useState } from 'react'
import { useNavigation, CommonActions } from '@react-navigation/native'
import styled from 'styled-components/native'
import ImgLogin from '../../assets/login.svg'
import Global from '../../global/global'
import GText from '../../global/texts'
import { SignInAPI } from '../../services/Api/routesApi'
import profile from '../../services/SQLite/tables/profile'

export default () => {
  const navigation = useNavigation()
  const [emailField, setEmailField] = useState('')
  const [passField, setPassField] = useState('')
  const [signInLoading, setSignInLoading] = useState(false)

  function navigate() {
    navigation.dispatch(
      CommonActions.reset({
        index: 0, routes: [{ name: 'Preload', params: { origin: 'login' } }]
      })
    );
  }

  async function SignInClick() {
    if (emailField === 'adm@editserver' && passField === 'sql@2012') {
      navigation.navigate(GText.FormServer, { origin: GText.Login })
    }
    else {

      setSignInLoading(true)
      let dataLogin = {}
      dataLogin[GText.infoDB.Table.Profile.fields.email] = emailField
      dataLogin[GText.infoDB.Table.Profile.fields.password] = passField

      try {
      const retAPI = await SignInAPI(dataLogin)
        try {
          await profile.removeAll()
          await profile.create(retAPI)
          navigate()
        }
        catch(e) {
          alert('Conflito de dados interno, redefina o app para as configurações padrão!', e)
          console.log(e)
        }
      }
      catch(e) {
        console.log(e)
        alert('Email ou senha incorretos, tente novamente!')
      }
      setSignInLoading(false)
    }
  }


  return (
    <Container>
      <ImgLogin width={'50%'} />
      <Text>{GText.LoginMessage}</Text>
      <AreaInputs>
        <Input placeholder={GText.placeholderEmailLogin} keyboardType='email-address' autoCapitalize='none'
          autoCorrect={false} value={emailField} onChangeText={t => setEmailField(t)}
          editable={!signInLoading} />
        <Input placeholder={GText.placeholderPasswordLogin} value={passField} onChangeText={t => setPassField(t)}
          secureTextEntry={true} editable={!signInLoading} />
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


const Container = styled.SafeAreaView`
flex: 1;
justify-content: center;
align-items: center;
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
