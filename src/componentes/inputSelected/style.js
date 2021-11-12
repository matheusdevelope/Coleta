import styled from 'styled-components/native'
import Global from '../../global/global'

export const Container = styled.View`
flex: 1;
position: relative;
min-width: 60px;
`
export const Text = styled.Text`
font-size: ${Global.fontSize};
color:${Global.textColor};
padding: ${Global.padding};
width: 100%;
`
export const LineButton = styled.View`
flex-direction:row;
background-color: ${Global.white};
margin:${Global.margin} ${Global.marginInputs} 0 ${Global.marginInputs};
border-radius: 4px;
padding-right: ${Global.padding};
`
export const ViewSelectOptions = styled.View`
max-height: ${Global.MaxHeigtOptionsSelect};
border-radius: ${Global.borderRadius};
background-color: ${Global.white};
margin:0  1px  0 ${Global.marginInputs};
position: absolute;
bottom:-${Global.MaxHeigtOptionsSelect};
right:4px;
left: 0;
z-index: 3;
`

export const ButtonOptions = styled.TouchableOpacity`
justify-content: center;
align-items: flex-start;
`