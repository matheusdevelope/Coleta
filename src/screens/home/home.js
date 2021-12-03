import { useIsFocused, useNavigation } from "@react-navigation/core";
import React, { useEffect, useState, useRef } from "react";
import ColetasList from "../../componentes/coletasList/coletasList.js";
import Header from "../../componentes/header/header.js";
import ConfirmationModal from "../../componentes/modalConfirmation/modalConfirmation.js";
import SearchBox from "../../componentes/searchBox/searchBox.js";
import Global from "../../global/global.js";
import GText from "../../global/texts.js";
import { Container } from './style.js'
import { DeleteItensDB, GetItensGrouped } from '../../services/routesData/routesData'
function Home() {
    const isFocused = useIsFocused()
    const navigation = useNavigation()
    const ModalRef = useRef()
    const [search, setSearch] = useState('')
    const [data, setData] = useState([])
    const dataRef = useRef([])
    const field = GText.infoDB.Table.Itens.fields.ColetaNumber

    async function GetItens() {
        let ret = await GetItensGrouped()
        dataRef.current = OrderList(ret, field, true)
        setData(OrderList(ret, field, true))
    }
    /**
     * OrderList:
     * 
     * Receive the List and the Field to order;
     * 
     * The default order of list is ASC, to get DESC, set the last argument = True;
     */
    function OrderList(data, field, desc) {
        let list = data
        if (desc) {
            list.sort((a, b) => Number(a[field]) < Number(b[field]) ? 1 : Number(b[field]) < Number(a[field]) ? -1 : 0)
        } else {
            list.sort((a, b) => Number(a[field]) > Number(b[field]) ? 1 : Number(b[field]) > Number(a[field]) ? -1 : 0)
        }
        return list
    }
    function FilterList(List, field, input) {
        return List.filter(data => data[field].toLowerCase().includes(input.toLowerCase()))
    }
    function ButtonHeaderRight() {
        navigation.navigate(GText.NewColeta, { data: undefined })
    }
    function ButtonHeaderLeft() {
        navigation.openDrawer()
    }
    function OpenConfirmation(data) {
        ModalRef.current.toggle()
        ModalRef.current.sendvalue(data)

    }
    async function handleCancel(data) {
        await DeleteItensDB(GText.infoDB.Table.Itens.fields.ColetaNumber, data[GText.infoDB.Table.Itens.fields.ColetaNumber])
        await GetItens()
        ModalRef.current.toggle()
    }
    function handleEdit(data) {
        navigation.navigate(GText.NewColeta, { data: data })
    }
    
    useEffect(() => {
        isFocused &&
            GetItens()
    }, [isFocused])

    useEffect(() => {
        setData(FilterList(dataRef.current, GText.infoInputs.nNameClient, search))
    }, [search])

    
    return (
        <Container>
            <Header title={GText.title} name={Global.IconMenu} name2={Global.IconNew}
                size={Global.sizeIconHeader} color={Global.colorIconHeader}
                onClickLeft={() => { ButtonHeaderLeft() }} onClickRight={() => { ButtonHeaderRight() }} />
            <SearchBox placeholder={GText.SearchBox} name={Global.iconSearchBox}
                size={Global.sizeIconSearch} color={Global.colorIconSearch} input={search} setInput={setSearch} />
            <ColetasList data={data} buttonLeft={OpenConfirmation} buttonRight={handleEdit} />
            <ConfirmationModal ref={ModalRef} button={handleCancel} label={GText.labelModalBackHome} />
        </Container>
    )
}
export default Home