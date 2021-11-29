import styled from 'styled-components/native'
import Global from '../../global/global'

export const FlatList = styled.FlatList`

`
export const SafeAreaView = styled.SafeAreaView`
margin-bottom: 10px;
padding: 10px;
flex: 1;
`
export const Container = styled.View`
min-height: ${((Global.MaxHeigtBoxItemColeta) + 'px')};
width: ${(Global.width +'px')};
`
export const ButtonBox = styled.TouchableOpacity`
padding: ${Global.paddingHeightInputs};
border-radius: ${Global.borderRadius};
background-color: ${Global.white};
margin:0 ${Global.marginInputs};
`
export const Text = styled.Text`
font-size: ${Global.fontSize};
color: ${Global.textColor};
`
export const Line = styled.View`
flex-direction: row;
justify-content: space-between;
margin:${Global.marginInputs};

`