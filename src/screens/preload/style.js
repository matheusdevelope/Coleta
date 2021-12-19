import styled from 'styled-components/native'
import Global from '../../global/global'

export const Container = styled.SafeAreaView`
background-color: #fff;
flex: 1;
justify-content: center;
align-items: center;
`
export const LoadingIcon = styled.ActivityIndicator`
`
export const Modal = styled.Modal`
`
export const ViewModal = styled.View`
height:100%;
margin-bottom: 35%;
justify-content:flex-end;
flex:1;
`
export const TextHeader = styled.Text`
font-size:40px;
color:#000;
margin: 30px auto;
font-weight:bold;
`
export const TextStyled = styled.Text`
font-size:30px;
color:${Global.textColor};
`
export const ViewStyled = styled.View`
margin: 8px;
background-color:${Global.bluelight3Transparent};
border-radius:${Global.borderRadius};
padding:${Global.padding};
`
export const ScrollView = styled.ScrollView`
background-color:${Global.white};
width: 100%;
`