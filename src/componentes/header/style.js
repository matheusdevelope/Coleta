import styled from 'styled-components/native'
import Global from '../../global/global'

export const Container = styled.SafeAreaView`
flex-direction: row;
justify-content: space-between;
align-items: center;
background-color: ${Global.blue};
height: 50px;
padding-left:${Global.padding};
padding-right:${Global.padding};
`
export const Text = styled.Text`
font-size: ${Global.fontSizeTitle};
color: ${Global.white};
font-weight:bold;
`
export const Box1 = styled.View`
flex-direction: row;
max-width: ${Global.MaxWidth};
flex:1;
justify-content: space-between;
`
export const Box2 = styled.View`
flex-direction: row-reverse;
max-width: ${Global.MaxWidth};
flex:1;
justify-content: space-between;
`