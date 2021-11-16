import styled from 'styled-components/native'
import Global from '../../global/global'

export const FlatList = styled.FlatList`
flex: 1;
background-color: ${Global.white};
margin:${Global.margin} ;
border-radius: ${Global.borderRadius};

`
export const Text = styled.Text`
font-size: ${Global.fontSize};
color:${Global.textColor};
padding: ${Global.padding};
width: 100%;

`
export const TouchableOpacity = styled.TouchableOpacity`
font-size: ${Global.fontSize};
color:${Global.textColor};
padding: ${Global.padding};
width: 100%;

`
