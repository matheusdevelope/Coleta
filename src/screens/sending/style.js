import styled from 'styled-components/native'
import Global from '../../global/global'


export const Container = styled.SafeAreaView`
background-color: ${Global.white};
width: 100%;
height: 100%;
`
export const TextTitle = styled.Text`
font-size:${Global.fontSizeTitle};
color:${Global.textColor};
margin: 10px auto;
font-weight:900;
`
export const Text = styled.Text`
font-size:${Global.fontSize};
color:${Global.textColor};
font-weight:900;
`
export const TextButton = styled.Text`
font-size:${Global.fontSize};
color:${Global.textColor};
margin: auto;
font-weight:900;
`
export const TextStyled = styled.Text`
font-size:${Global.fontSize};
color:${Global.textColor};
`
export const ViewStyled = styled.View`
margin: ${Global.margin} ${Global.margin} 2px ${Global.margin};
border-radius:${Global.borderRadius};
padding:${Global.padding};
`
export const ViewItens = styled.View`
flex: 1;
margin: ${Global.margin} ${Global.margin} 2px ${Global.margin};
border-radius:${Global.borderRadius};
 padding:1px 0;
 background-color:${Global.white} ;
`
export const View = styled.TouchableOpacity`
flex:1;

`
export const ViewLine = styled.TouchableOpacity`
flex-direction:row;
margin: ${Global.margin} ${Global.margin} 2px ${Global.margin};
background-color:${Global.bluelight3Transparent};
border-radius:${Global.borderRadius};
padding:${Global.padding};
`
export const ViewLineSyncing = styled.TouchableOpacity`
margin: 5px 10px 10px 10px;
border-radius:${Global.borderRadius};
padding:${Global.padding};
background-color: ${Global.blue};
`

export const ButtonBox = styled.TouchableOpacity`
padding: ${Global.paddingHeightInputs};
border-radius: ${Global.borderRadius};
background-color: ${Global.white};
margin:0 ${Global.marginInputs};
`
export const ScrollView = styled.ScrollView`
background-color: #efefefef ;
`
export const Line = styled.View`
flex-direction: row;
justify-content: space-between;
margin:${Global.marginInputs};
background-color: ${Global.white};
margin: ${Global.margin};
padding: ${Global.padding};
border-radius: ${Global.borderRadius};
`