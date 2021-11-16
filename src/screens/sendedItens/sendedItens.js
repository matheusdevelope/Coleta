
import React, { useState, useRef } from "react";
import ColetasList from "../../componentes/coletasList/coletasList";
import Header from "../../componentes/header/header";
import SearchBox from "../../componentes/searchBox/searchBox";
import Global from "../../global/global";
import GText from "../../global/texts";
import { Container } from "./style.js";
import { useNavigation } from "@react-navigation/core";
import { Coletas } from "../../../DadosOffline/Coletas Lista";
import ConfirmationModal from '../../componentes/modalConfirmation/modalConfirmation'

function SendedItens(){
    const navigation = useNavigation()
    const ModalRef = useRef()
    const [search, setSearch] = useState('')

    const data = Coletas.filter(data => data.NomeCliente.toLowerCase().includes(search.toLowerCase()))

    function ButtonHeaderRight(data) {
        //Sync data 
    }
    function ButtonHeaderLeft(data) {
        navigation.openDrawer()
    }
    function OpenConfirmation(data) {
        ModalRef.current.toggle()
        ModalRef.current.sendvalue(data)

    }
    function handleCancel(data) {
        ModalRef.current.toggle()
        //delete coleta
    }
    function handleEdit (data){
        navigation.navigate(GText.NewColeta, data)
    }
    
    return(
        <Container>
            <Header title={GText.SendedColetas} name={Global.IconMenu} name2={Global.IconSync}
            size={Global.sizeIconHeader} color={Global.colorIconHeader}
            onClickLeft={()=>{ButtonHeaderLeft()}} onClickRight={()=>{ButtonHeaderRight()}}/>
            <SearchBox placeholder={GText.SearchBox} name={Global.iconSearchBox} 
            size={Global.sizeIconSearch} color={Global.colorIconSearch} input={search} setInput={setSearch}/>
            <ColetasList data={data} buttonLeft={OpenConfirmation} buttonRight={handleEdit}/>
            <ConfirmationModal ref={ModalRef} buttonRight={handleCancel} />
        </Container>
    )
}
export default SendedItens