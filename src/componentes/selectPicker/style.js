import styled from 'styled-components/native'
import Global from '../../global/global'

export const Container = styled.View`
flex: 1;
`
export const Text = styled.Text`
font-size: ${Global.fontSize};
color:${Global.textColor};
padding: ${Global.padding};
width: 100%;

`
export const LineButton = styled.TouchableOpacity`
flex-direction:row;
background-color: ${Global.white};
margin: 0;
border-radius: 4px;
padding-right: ${Global.padding};
height: 50px;
align-items:center;
`
 export const ViewSelectOptions = styled.View`
 max-height: ${(Global.MaxHeigtOptionsSelect + 'px')};
 border-radius: ${Global.borderRadius};
 background-color: ${Global.white};
 margin:0  5px  0 ${Global.marginInputs};
 `

export const ButtonOptions = styled.TouchableOpacity`
justify-content: center;
align-items: flex-start;
border: 1px ${Global.blackTransparent} solid;
border-radius:8px;
`