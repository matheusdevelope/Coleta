import styled from 'styled-components/native'
import Global from '../../global/global'

export const Container = styled.View`
padding-left:${Global.padding};
padding-right:${Global.padding};
background-color: ${Global.white};
flex: 1;
border-radius: ${Global.borderRadius};
`
export const Input = styled.TextInput`
font-size: ${Global.fontSize};
color: ${Global.black};
padding:${Global.paddingHeightInputs} ${Global.padding};


`