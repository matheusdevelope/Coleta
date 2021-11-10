import styled from 'styled-components/native'
import Global from '../../global/global'

export const Container = styled.SafeAreaView`
flex-direction: row;
justify-content: space-between;
align-items: center;
background-color: ${Global.white};
height: 40px;
border-radius: ${Global.borderRadius};
padding-left:${Global.padding};
padding-right:${Global.padding};
margin: ${Global.margin};
`