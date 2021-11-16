import styled from 'styled-components/native'
import Global from '../../global/global'
export const Modal = styled.Modal`
background-color: ${Global.backgroundModal};
`
export const Container = styled.TouchableOpacity`
flex: 1;
background-color: ${Global.backgroundModal};
`
export const View= styled.TouchableOpacity`
width: 70%;
margin: auto;
border-radius: ${Global.borderRadius};
background-color: ${Global.white};
align-items: center;
justify-content: space-between;
`
export const Line = styled.View`
flex-direction: row;
justify-content: space-between;
margin: ${Global.margin};
`
export const Text = styled.Text`
font-size: ${Global.fontSize};
color:${Global.textColor};
padding: ${Global.padding};
`
