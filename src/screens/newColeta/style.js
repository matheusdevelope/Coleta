import styled from 'styled-components/native'
import Global from '../../global/global'

export const Container = styled.SafeAreaView`
`
export const ContainerInputs = styled.SafeAreaView`
background-color: ${Global.bluelight};
height: 60px;
`
export const Text = styled.Text`
font-size: ${Global.fontSize};
color:${Global.textColor};

padding: ${Global.padding};

`
export const Line = styled.View`
flex-direction:row;
`
export const LineButton = styled.View`
flex-direction:row;
background-color: ${Global.white};
margin:${Global.margin} ${Global.margin} 0 ${Global.margin};
border-radius: ${Global.borderRadius};
`
export const ViewSelectOptions = styled.View`
max-height: 200px;
border-radius: ${Global.borderRadius};
background-color: ${Global.white};
margin:0 ${Global.margin};
padding: 0 ${Global.padding};
`

export const ButtonOptions = styled.TouchableOpacity`
justify-content: center;
align-items: flex-start;
`