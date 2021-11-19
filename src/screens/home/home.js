import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import { useRef } from "react";
// import { Coletas } from "../../../DadosOffline/Coletas Lista.js";
import ColetasList from "../../componentes/coletasList/coletasList.js";
import Header from "../../componentes/header/header.js";
import ConfirmationModal from "../../componentes/modalConfirmation/modalConfirmation.js";
import SearchBox from "../../componentes/searchBox/searchBox.js";
import Global from "../../global/global.js";
import GText from "../../global/texts.js";
import { Container } from './style.js'
function Home() {
    const navigation = useNavigation()
    const ModalRef = useRef()
    const [search, setSearch] = useState('')

    const data = []// Coletas.filter(data => data.NomeCliente.toLowerCase().includes(search.toLowerCase()))

    function ButtonHeaderRight(data) {
        navigation.navigate(GText.NewColeta)
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
    function handleEdit(data) {
        navigation.navigate(GText.NewColeta, data)
    }

    return (
        <Container>
            <Header title={GText.title} name={Global.IconMenu} name2={Global.IconNew}
                size={Global.sizeIconHeader} color={Global.colorIconHeader}
                onClickLeft={() => { ButtonHeaderLeft() }} onClickRight={() => { ButtonHeaderRight() }} />
            <SearchBox placeholder={GText.SearchBox} name={Global.iconSearchBox}
                size={Global.sizeIconSearch} color={Global.colorIconSearch} input={search} setInput={setSearch} />
            <ColetasList data={data} buttonLeft={OpenConfirmation} buttonRight={handleEdit} />
            <ConfirmationModal ref={ModalRef} buttonRight={handleCancel} />

        </Container>
    )
}
export default Home