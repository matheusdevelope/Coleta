import { useIsFocused, useNavigation } from "@react-navigation/core";
import React, { useEffect, useState, useRef } from "react";
import ColetasList from "../../componentes/coletasList/coletasList.js";
import Header from "../../componentes/header/header.js";
import ConfirmationModal from "../../componentes/modalConfirmation/modalConfirmation.js";
import SearchBox from "../../componentes/searchBox/searchBox.js";
import Global from "../../global/global.js";
import GText from "../../global/texts.js";
import { Container } from './style.js'
import { DeleteItensDB, GetItensDB, GetItensGrouped, UpdateStatusItensOnDB } from '../../services/routesData/routesData'
import { CancelItensAPI, SendItensAPI } from "../../services/Api/routesApi.js";

function Home({ route }) {
    const RouteName = route.name
    const isFocused = useIsFocused()
    const navigation = useNavigation()
    const ModalRef = useRef()
    const dataRef = useRef([])
    const CheckBoxRef = useRef(false)
    const [search, setSearch] = useState('')
    const [showCheckBox, setShowCheckBox] = useState(false)
    const [data, setData] = useState([])
    const [checkedState, setCheckedState] = useState([]);
    const handleOnChange = (position) => {
    
        const updatedCheckedState = checkedState.map((item, index) =>
          index === position ? !item : item
        );
        setCheckedState(updatedCheckedState)
    }
    function handleOpenCheckBox(params) {
        console.log('e')
        handleOnChange()
        setShowCheckBox(!showCheckBox)
    }
    const field = GText.infoDB.Table.Itens.fields.ColetaNumber

    function getLabelModal() {
        if (RouteName == GText.MyColetas) {
            return GText.labelModalDeleteColetaHome
        }
        else if (RouteName == GText.SendedColetas) {
            return GText.labelModalCancelSendedItens
        }
    }
    async function GetItens() {
        let ret = []
        if (RouteName === GText.MyColetas) {
            ret = await GetItensGrouped(GText.infoDB.Table.Itens.fields.Status, GText.infoInputs.InitialStatusItem)
        }
        if (RouteName === GText.SendedColetas) {
            ret = await GetItensGrouped(GText.infoDB.Table.Itens.fields.Status, GText.infoInputs.SendedStatusItem, GText.infoInputs.CancelStatusItem)
        }
        dataRef.current = OrderList(ret, field, true)
        setCheckedState(new Array(data.length).fill(false))
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
        if (RouteName == GText.MyColetas) {
            navigation.navigate(GText.NewColeta, { data: undefined, routeOrigin:RouteName})
        }
        else if (RouteName == GText.SendedColetas) {
            alert('SYNC ITENS')
        }
    }
    function ButtonHeaderLeft() {
        navigation.openDrawer()
    }
    function OpenConfirmation(data) {
        ModalRef.current.toggle()
        ModalRef.current.sendvalue(data)
    }
    function ButtonModal(data) {
        if (RouteName == GText.MyColetas) {
            handleDelete(data)
        }
        else if (RouteName == GText.SendedColetas) {
            handleCancelColeta(data)
        }
    }
    async function handleCancelColeta(data) {
        const GT = GText.infoDB.Table.Itens.fields
        const Itens = await GetItensDB(GT.ColetaNumber, data[GT.ColetaNumber])
        const ret = await CancelItensAPI(Itens)
        if (ret) {
            await UpdateStatusItensOnDB(GT.ColetaNumber, data[GT.ColetaNumber],GText.infoInputs.SendedStatusItem, GText.infoInputs.CancelStatusItem)
            await GetItens()
            ModalRef.current.toggle()
        }
        else {
            alert(GText.failedOnCancelItens)
        }
    }
    async function handleDelete(data) {
        await DeleteItensDB(GText.infoDB.Table.Itens.fields.ColetaNumber, data[GText.infoDB.Table.Itens.fields.ColetaNumber])
        await GetItens()
        ModalRef.current.toggle()
    }
    function handleEdit(data) {
        if (RouteName === GText.MyColetas) {
            SendItem(data)
        }
        else if (RouteName === GText.SendedColetas) {
            navigation.navigate(GText.NewColeta, { data: data, routeOrigin:RouteName })
        }
    }
    async function SendItem(data) {
        const GT = GText.infoDB.Table.Itens.fields
        const Itens = await GetItensDB(GT.ColetaNumber, data[GT.ColetaNumber])
        const ret = await SendItensAPI(Itens)
        if (ret) {
            await UpdateStatusItensOnDB(GT.ColetaNumber, data[GT.ColetaNumber],GText.infoInputs.InitialStatusItem, GText.infoInputs.SendedStatusItem)
            await GetItens()
        }
        else {
            alert(GText.failedOnSendItens)
        }
    }
    function OpenSelectItens(){
        CheckBoxRef.current.value() ?
        CheckBoxRef.current.unselectAll() :
        CheckBoxRef.current.selectAll()
    }
    function RenderScreen() {
        if (RouteName == GText.MyColetas) {
            return (
                <Header title={GText.title} name={Global.IconMenu} name2={Global.IconNew} nameExtra={Global.IconSend}
                    size={Global.sizeIconHeader} color={Global.colorIconHeader} onClickLeft={() => { ButtonHeaderLeft() }} 
                    onClickRight={() => { ButtonHeaderRight() }} onClickRightExtra={()=>{OpenSelectItens()}} />
            )
        }
        else if (RouteName == GText.SendedColetas) {
            return (
                <Header title={GText.SendedColetas} name={Global.IconMenu} name2={Global.IconSync}
                    size={Global.sizeIconHeader} color={Global.colorIconHeader}
                    onClickLeft={() => { ButtonHeaderLeft() }} onClickRight={() => { ButtonHeaderRight() }} />
            )
        }

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
            <RenderScreen />
            <SearchBox placeholder={GText.SearchBox} name={Global.iconSearchBox}
                size={Global.sizeIconSearch} color={Global.colorIconSearch} input={search} setInput={setSearch} />
            <ColetasList data={data} buttonLeft={OpenConfirmation} buttonRight={handleEdit} isFocused={isFocused} 
            RouteName={RouteName} ref={CheckBoxRef} showCheckBox={showCheckBox} setShowCheckBox={handleOpenCheckBox}
            checkedState={checkedState} handleOnChange={handleOnChange}
            />
            <ConfirmationModal ref={ModalRef} button={ButtonModal} label={getLabelModal()} />
        </Container>
    )
}
export default Home