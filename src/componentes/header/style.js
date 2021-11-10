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