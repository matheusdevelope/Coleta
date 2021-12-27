import styled from 'styled-components/native'
import Global from '../../global/global'


export const Container = styled.SafeAreaView`
width: 100%;
height: 100%;
`
export const Text = styled.Text`
font-size:${Global.fontSizeTitle};
color:${Global.textColor};
font-weight:900;
`
export const View = styled.TouchableOpacity`
background-color: ${Global.white};
margin: 4px 0;
padding:${Global.padding};
border-radius:${Global.borderRadius};
flex-direction:row;
justify-content:space-between;
align-items:center;
`
export const ViewIcon = styled.View`
width: 50px;
justify-content:center;
align-items:center;
`

