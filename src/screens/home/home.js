import { useNavigation } from "@react-navigation/core";
import React from "react";
import Header from "../../componentes/header/header.js";
import SearchBox from "../../componentes/searchBox/searchBox.js";
import Global from "../../global/global.js";
import GText from "../../global/texts.js";
import {Container} from './style.js'

function Home(){
    const navigation = useNavigation()

    function ButtonSearch(data) {
        console.log(data)
    }
    function ButtonHeaderRight(data) {
        navigation.navigate(GText.NewColeta)
    }
    function ButtonHeaderLeft(data) {
        navigation.openDrawer()
    }
    
    return(
        <Container>
            <Header title={GText.title} name='navicon' name2='plus-square'
            size={Global.sizeIconHeader} color={Global.colorIconHeader}
            onClickLeft={()=>{ButtonHeaderLeft()}} onClickRight={()=>{ButtonHeaderRight()}}/>
            <SearchBox placeholder={GText.SearchBox} name={Global.iconSearchBox} 
            size={Global.sizeIconSearch} color={Global.colorIconSearch} onClick={ButtonSearch}/>
        </Container>
    )
}
export default Home