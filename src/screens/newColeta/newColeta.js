import { useNavigation } from "@react-navigation/core";
import React from "react";
import Header from "../../componentes/header/header.js";
import ItensList from "../../componentes/itensList/itensList.js";
import Global from "../../global/global.js";
import GText from "../../global/texts.js";
import InputArea from "../../componentes/inputArea/inputsArea.js";
import { Container } from './style.js'

function NewColeta({route}) {
    const navigation = useNavigation()
    const data = route.params

    function ButtonHeaderRight(data) {
        //save changes and includes the go to :
        navigation.navigate(GText.MyColetas)
    }
    function ButtonHeaderLeft(data) {
        //ask if really want exit, the data will be lost, then go back
        navigation.goBack()
    }
    
    const items = [
        { label: "JavaScript", value: "JavaScript" },
        { label: "TypeStript", value: "TypeStript" },
        { label: "Python", value: "Python" },
        { label: "Java", value: "Java" },
        { label: "C++", value: "C++" },
        { label: "C", value: "C" },
        { label: "JavaScript", value: "JavaScrit" },
        { label: "TypeStript", value: "TypeStrpt" },
        { label: "Python", value: "Pytho" },
        { label: "Java", value: "Jva" },
        { label: "C++", value: "C+" },
        { label: "C", value: "Ca" },

    ]
  
    return (
        <Container>
            <Header title={GText.NewColeta} name={Global.iconBack} name2={Global.iconSave}
                size={Global.sizeIconHeader} color={Global.colorIconHeader} style={{marginLeft:8}}
                onClickLeft={() => { ButtonHeaderLeft() }} onClickRight={() => { ButtonHeaderRight() }} />
            <InputArea itens={items} />
            <ItensList itens={null} />
        </Container>
    )
}
export default NewColeta