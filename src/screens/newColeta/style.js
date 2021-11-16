import styled from 'styled-components/native'
import Global from '../../global/global'

export const Container = styled.SafeAreaView`
flex: 1;
`

export const Line = styled.View`
flex-direction:row;
width: auto;
`
export const LineButton = styled.View`
flex-direction:row;
background-color: ${Global.white};
margin:${Global.margin} ${Global.margin} 0 ${Global.margin};
border-radius: ${Global.borderRadius};
`