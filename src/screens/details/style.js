import styled from 'styled-components/native'
import Global from '../../global/global'

export const Container = styled.SafeAreaView`

`
export const SubHeader =  styled.View`
background-color: ${Global.white};
border-radius: ${Global.borderRadius};
margin: ${Global.margin};
padding: 0 ${Global.paddingHeightInputs};
`
export const Text = styled.Text`
font-size: ${Global.fontSize};
color: ${Global.textColor};
font-weight: bold;
`
export const Line = styled.View`
flex-direction:row;
justify-content: space-between;
`
