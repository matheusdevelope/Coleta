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
flex-direction: row;
align-items: center;
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
/* flex: 1; */
`
export const Line = styled.View`
flex-direction: row;
justify-content: space-between;
margin:${Global.marginInputs};

`
export const LineBox = styled.View`
flex: 1;
min-height: ${((Global.MaxHeigtBoxItemColeta) + 'px')};
margin-bottom: ${Global.margin};
`