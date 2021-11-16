import { useNavigation } from "@react-navigation/core";
import React from "react";
import { Dimensions } from 'react-native';
import Button from "../../componentes/button/button.js";
import Header from "../../componentes/header/header.js";
import ItensList from "../../componentes/itensList/itensList.js";
import Global from "../../global/global.js";
import GText from "../../global/texts.js";
import InputAreaNewColeta from "./inputsArea.js";
import {Container} from './style.js'


const { height } = Dimensions.get('window')


function NewColeta(){
    const navigation = useNavigation()

    function ButtonHeaderRight(data) {
        //save changes and includes the go to :
        navigation.navigate(GText.MyColetas)
    }
    function ButtonHeaderLeft(data) {
        //ask if really want exit, the data will be lost, then go back
        navigation.goBack()
    }
    function handleChangeSelect(data) {
        console.log('data')
    }
    const items=[
        { label: "JavaScript", value: "JavaScript" },
        { label: "TypeStript", value: "TypeStript" },
        { label: "Python", value: "Python" },
        { label: "Java", value: "Java" },
        { label: "C++", value: "C++" },
        { label: "C", value: "C" },
        
    ]
    return(
        <Container>
            <Header title={GText.NewColeta} name={Global.iconBack} name2={Global.iconSave}
            size={Global.sizeIconHeader} color={Global.colorIconHeader}
            onClickLeft={()=>{ButtonHeaderLeft()}} onClickRight={()=>{ButtonHeaderRight()}}/>
            <InputAreaNewColeta itens={items}/>
            {/* <ItensList itens={items}/> */}
            <Button name={Global.IconAdd} size={Global.sizeiconAdd} color={Global.bluelight} 
            // onClick={() => formRef.current.submitForm()}
            onClick={() => console.log('add')}
                    style={{
                        position: 'absolute', top: height - 130, right: 50,
                        borderRadius: 45, height: 60, width: 60, backgroundColor: Global.blue
                    }} />
                    
         </Container>
    )
}
export default NewColeta