import { useIsFocused, useNavigation } from "@react-navigation/core";
import React, { useRef } from "react";
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
import { GetItensGrouped } from "../../services/routesData/routesData.js";
import ConfirmationModal from "../../componentes/modalConfirmation/modalConfirmation.js";
function NewColeta({ route }) {
    const ModalRef = useRef(null)
    const ListRef = useRef(null)
    const InputRef = useRef(null);
    const navigation = useNavigation()
    const isFocused = useIsFocused()
    const data = route.params.data

    async function dataToDetails() {
        const ret = await GetItensGrouped(GText.infoDB.Table.Itens.fields.ColetaNumber, data[GText.infoDB.Table.Itens.fields.ColetaNumber])
        const dataToDetails = { data: ret[0], FromEditColeta: true, routeOrigin: route?.params.routeOrigin }
        return dataToDetails 
    }
    async function SaveItensOnDB() {
        //save changes and includes the go to :
        await ListRef.current.InsertOnDB()
        await InputRef.current.resetForm()
        await ListRef.current.resetList()
        data !== undefined ?
            navigation.navigate(GText.Details, await dataToDetails())
            :
            navigation.goBack()
    }
    async function ButtonHeaderRight() {
        const ret = ListRef.current.getData()
        if (ret[0] !== undefined) {
           await SaveItensOnDB()
        }        
    }
    async function Navigate() {
        data !== undefined ?
            navigation.navigate(GText.Details, await dataToDetails())
            :
            navigation.goBack()
    }
    function ButtonHeaderLeft() {
        const ret = ListRef.current.getData()
        if (ret[0] === undefined) {
            Navigate()
        }
        else {
            ModalRef.current.toggle()
        }
    }
    function InsertNewItemOnList(data) {
        ListRef.current.InsertOnList(data)
    }
    function EditItem(data) {
        InputRef.current.SetDataFielsOnEdit(data)
    }
   
    async function CreateDataOffline(params) {
        //   const a = Object.keys(Coletas).length
        //      for (let index = 0; index < a; index++) {
        //       Itens.create(Coletas[index])
        //       }
        //     Itens.all()

        // await profile.create(Profile)
        //  profile.all()

        // await company.create(Company)
        //  company.all()

        //  const d = Object.keys(Branch).length
        //  for (let index = 0; index < d; index++) {
        //      branch.create(Branch[index])
        //  }

        // branch.removeAll()

        //  const e = Object.keys(Clientes).length
        //  for (let index = 0; index < e; index++) {
        //    await  clients.create(Clientes[index])
        //  }
        //  clients.all()
        // warranty.removeAll()
        // const f = Object.keys(Warranty).length
        // for (let index = 0; index < f; index++) {
        //      warranty.create(Warranty[index])
        // }
       
        // situation.removeAll()
        // const g = Object.keys(Situation).length
        // for (let index = 0; index < g; index++) {
        //     situation.create(Situation[index])
        // }
        
        // brands.removeAll()
        // const h = Object.keys(Marcas).length
        // for (let index = 0; index < h; index++) {
        //     brands.create(Marcas[index])
        // }
        
    }
     CreateDataOffline()

    return (
        <Container>
            <Header title={GText.NewColeta} name={Global.iconBack} name2={Global.iconSave}
                size={Global.sizeIconHeader} color={Global.colorIconHeader} style={{ marginLeft: 8 }}
                onClickLeft={() => { ButtonHeaderLeft() }} onClickRight={() => { ButtonHeaderRight() }} />
            <InputArea ref={InputRef} itens={data} isFocused={isFocused} InsertNewItemOnList={InsertNewItemOnList} />
            <ItensList ref={ListRef} itens={data} isFocused={isFocused} EditItem={EditItem} HideCanceled />
            <ConfirmationModal ref={ModalRef} button={Navigate} label={GText.labelModalBackNewColeta} invert />
        </Container>
    )
}
export default NewColeta





















