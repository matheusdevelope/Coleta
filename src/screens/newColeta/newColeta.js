import { useNavigation } from "@react-navigation/core";
import React from "react";
import Header from "../../componentes/header/header.js";
import ItensList from "../../componentes/itensList/itensList.js";
import Global from "../../global/global.js";
import GText from "../../global/texts.js";
import InputArea from "../../componentes/inputArea/inputsArea.js";
import { Container } from './style.js'
 import { Clientes, Marcas, situation, warranty } from "../../../DadosOffline/Coletas Lista.js";
 import Situ from "../../services/SQLite/tables/situation";
import brands from "../../services/SQLite/tables/brands.js";
import branch from "../../services/SQLite/tables/branch.js";

function NewColeta({route}) {
    const navigation = useNavigation()
    const data = route.params


    //   const d = Object.keys(Coletas).length
    //    for (let index = 0; index < d; index++) {
    //     Itens.create(Coletas[index])
    //     }
    //   Itens.all()

    //   const d = Object.keys(Profile).length
    //    for (let index = 0; index < d; index++) {
         //            Perfi.create(Profile)
    //     }
     //  Perfi.all()

    //   const d = Object.keys(company).length
    //    for (let index = 0; index < d; index++) {
              //       Empresa.create(company)
    //     }
      // Empresa.all()

        //   const d = Object.keys(branch).length
        //   for (let index = 0; index < d; index++) {
        //       Filial.create(branch[index])
        //      }

    //   Filial.all()

    //    const d = Object.keys(Clientes).length
    //      for (let index = 0; index < d; index++) {
    //       clients.create(Clientes[index])
    //       }
      //  clients.all()
    
     const d = Object.keys(Marcas).length
       for (let index = 0; index < d; index++) {
         brands.create(Marcas[index])
       }
      brands.all()

    // const d = Object.keys(situation).length
    //    for (let index = 0; index < d; index++) {
    //     Situ.create(situation[index])
    //    }
    //  branch.all()

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