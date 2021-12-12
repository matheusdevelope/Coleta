import styled from 'styled-components/native'
import Global from '../../global/global'

export const Container = styled.SafeAreaView`
height: 100%;
width: 100%;
`
export const Text = styled.Text`
font-size: ${Global.fontSize};
color: ${Global.blue};
`

export const Line = styled.View`
flex-direction: row;
justify-content: space-between;
margin:${Global.marginInputs};
background-color: ${Global.white};
margin: ${Global.margin};
padding: ${Global.padding};
border-radius: ${Global.borderRadius};
`