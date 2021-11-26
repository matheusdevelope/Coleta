import { useNavigation } from "@react-navigation/core";
import React, { useRef, useState } from "react";
import Header from "../../componentes/header/header.js";
import ItensList from "../../componentes/itensList/itensList.js";
import Global from "../../global/global.js";
import GText from "../../global/texts.js";
import InputArea from "../../componentes/inputArea/inputsArea.js";
import { Container } from './style.js'
import { Clientes, Marcas, Profile, Situation, Warranty, Company, Branch, Coletas } from "../../../DadosOffline/Coletas Lista.js";
import warranty from "../../services/SQLite/tables/warranty";
import situation from "../../services/SQLite/tables/situation";
import brands from "../../services/SQLite/tables/brands.js";
import branch from "../../services/SQLite/tables/branch.js";
import clients from "../../services/SQLite/tables/clients.js";
import profile from "../../services/SQLite/tables/profile.js";
import Itens from "../../services/SQLite/tables/Itens";
import company from "../../services/SQLite/tables/company";
function NewColeta({ route }) { 
    const ListRef = useRef(null)
    const InputRef = useRef(null);
    const navigation = useNavigation()
    const data = route.params

    function ButtonHeaderRight(data) {
        //save changes and includes the go to :
        ListRef.current.InsertOnDB()
        navigation.navigate(GText.MyColetas)
    }
    function ButtonHeaderLeft(data) {
        //ask if really want exit, the data will be lost, then go back
        navigation.goBack()
    }
    function InsertNewItemOnList(data) {
       ListRef.current.InsertOnList(data)
    }
    function CreateDataOffline(params) {
        //   const a = Object.keys(Coletas).length
        //      for (let index = 0; index < a; index++) {
        //       Itens.create(Coletas[index])
        //       }
        //     Itens.all()

        // profile.create(Profile)
        // profile.all()

        // company.create(Company)
        // company.all()

        const d = Object.keys(Branch).length
        for (let index = 0; index < d; index++) {
            branch.create(Branch[index])
        }

        branch.all()

        // const e = Object.keys(Clientes).length
        // for (let index = 0; index < e; index++) {
        //     clients.create(Clientes[index])
        // }
        // clients.all()
        const f = Object.keys(Warranty).length
        for (let index = 0; index < f; index++) {
            warranty.create(Warranty[index])
        }
        warranty.all()
        const g = Object.keys(Situation).length
        for (let index = 0; index < g; index++) {
            situation.create(Situation[index])
        }
        situation.all()

        const h = Object.keys(Marcas).length
        for (let index = 0; index < h; index++) {
            brands.create(Marcas[index])
        }
        brands.all()
    }
   // CreateDataOffline()

    function EditItem(data) {
        InputRef.current.SetDataFielsOnEdit(data)
    }

    return (
        <Container>
            <Header title={GText.NewColeta} name={Global.iconBack} name2={Global.iconSave}
                size={Global.sizeIconHeader} color={Global.colorIconHeader} style={{ marginLeft: 8 }}
                onClickLeft={() => { ButtonHeaderLeft() }} onClickRight={() => { ButtonHeaderRight() }} />
            <InputArea ref={InputRef} InsertNewItemOnList={InsertNewItemOnList}   />
            <ItensList ref={ListRef} EditItem={EditItem} />
        </Container>
    )
}
export default NewColeta





















