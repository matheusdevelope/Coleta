import { useIsFocused, useNavigation } from "@react-navigation/core";
import React, { useEffect, useState, useRef } from "react";
import ColetasList from "../../componentes/coletasList/coletasList.js";
import Header from "../../componentes/header/header.js";
import ConfirmationModal from "../../componentes/modalConfirmation/modalConfirmation.js";
import SearchBox from "../../componentes/searchBox/searchBox.js";
import Global from "../../global/global.js";
import GText from "../../global/texts.js";
import { Container, Line } from './style.js'
import { DeleteItensDB, GetItensDB, GetItensGrouped, UpdateStatusItensOnDB } from '../../services/routesData/routesData'
import { CancelItensAPI, SendItensAPI } from "../../services/Api/routesApi.js";
import Button from "../../componentes/button/button.js";

function Home({ route }) {
    const RouteName = route.name
    const isFocused = useIsFocused()
    const navigation = useNavigation()
    const ModalRef = useRef()
    const dataRef = useRef([])
    const CheckedAll = useRef(false)
    const [search, setSearch] = useState('')
    const [showCheckBox, setShowCheckBox] = useState(false)
    const [data, setData] = useState([])
    const ItensChecked = useRef(0)
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
            navigation.navigate(GText.NewColeta, { data: undefined, routeOrigin: RouteName })
        }
        else if (RouteName == GText.SendedColetas) {
            alert('SYNC ITENS')
        }
    }
    function ButtonHeaderLeft() {
        navigation.openDrawer()
    }
    function OpenConfirmation(data) {
        if (ItensChecked.current > 0) {
            ModalRef.current.toggle()
            ModalRef.current.sendvalue(data)
        }
        else {
            alert(GText.messageNoItensSelected)
        }
    }
    async function ButtonModal(origin) {
        let arrayItens = []
        dataRef.current.forEach((obj) => {
            if (obj.checked === true) {
                arrayItens.push(obj[GText.infoInputs.nColetaNumber])
            }
        })
        if (origin === 'left') {
            if (RouteName == GText.MyColetas) {
                for (let i = 0; i < arrayItens.length; i++) {
                    await handleDelete(arrayItens[i])
                }
            }
            else if (RouteName == GText.SendedColetas) {
                for (let i = 0; i < arrayItens.length; i++) {
                    await handleCancelColeta(arrayItens[i])
                }
            }
        }
        else if(origin == 'right'){
            for (let i = 0; i < arrayItens.length; i++) {
                await SendItem(arrayItens[i])
            }
        }
        await GetItens()
        ModalRef.current.toggle()
    }
    async function handleCancelColeta(data) {
        const GT = GText.infoDB.Table.Itens.fields
        const Itens = await GetItensDB(GT.ColetaNumber, data)
        const ret = await CancelItensAPI(Itens)
        if (ret) {
            await UpdateStatusItensOnDB(GT.ColetaNumber, data, GText.infoInputs.SendedStatusItem, GText.infoInputs.CancelStatusItem)
        }
        else {
            alert(GText.failedOnCancelItens)
        }
    }
    async function handleDelete(data) {
        await DeleteItensDB(GText.infoDB.Table.Itens.fields.ColetaNumber, data)
    }
    function handleEdit(data) {
        if (RouteName === GText.MyColetas) {
            SendItem(data)
        }
        else if (RouteName === GText.SendedColetas) {
            navigation.navigate(GText.NewColeta, { data: data, routeOrigin: RouteName })
        }
    }
    async function SendItem(data) {
        const GT = GText.infoDB.Table.Itens.fields
        const Itens = await GetItensDB(GT.ColetaNumber, data)
        const ret = await SendItensAPI(Itens)
        if (ret) {
            await UpdateStatusItensOnDB(GT.ColetaNumber, data, GText.infoInputs.InitialStatusItem, GText.infoInputs.SendedStatusItem)
        }
        else {
            alert(GText.failedOnSendItens)
        }
    }
    function RenderScreen() {
        if (showCheckBox) {
            // if (RouteName == GText.MyColetas) {
                return (
                    <Header title={GText.Selection} name={Global.IconMenu} name2={CheckedAll.current ? Global.IconCloseList : Global.IconList}
                        size={Global.sizeIconHeader} color={Global.colorIconHeader} onClickLeft={() => { ButtonHeaderLeft() }}
                        onClickRight={() => { toggleChecedkAll() }} />
                )
            // }
            // else if (RouteName == GText.SendedColetas) {
            //     return (
            //         <Header title={GText.Selection} name={Global.IconMenu} name2={Global.IconSync}
            //             size={Global.sizeIconHeader} color={Global.colorIconHeader}
            //             onClickLeft={() => { ButtonHeaderLeft() }} onClickRight={() => { ButtonHeaderRight() }} />
            //     )
            // }
        }
        else {
            if (RouteName == GText.MyColetas) {
                return (
                    <Header title={GText.title} name={Global.IconMenu} name2={Global.IconNew}
                        size={Global.sizeIconHeader} color={Global.colorIconHeader} onClickLeft={() => { ButtonHeaderLeft() }}
                        onClickRight={() => { ButtonHeaderRight() }} />
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


    }
    function toggleChecedkAll() {
        CheckedAll.current = !CheckedAll.current
        handleOnChange(CheckedAll.current, null, true)
        !CheckedAll.current && setShowCheckBox(false)

    }

    const handleOnChange = (checked, param, all) => {
        let copyRef = dataRef.current
        const newDataRef = copyRef.map((obj, index) => {
            if (all) {
                copyRef[index].checked = checked
            }
            else {
                if (obj[GText.infoInputs.nColetaNumber] === param) {
                    copyRef[index].checked = checked
                }
            }
            return obj
        })

        ItensChecked.current = all ? checked ? 1 : 0 : checked ? ItensChecked.current + 1 : ItensChecked.current - 1;
        dataRef.current = newDataRef
        setData(FilterList(dataRef.current, GText.infoInputs.nNameClient, search))
    }
    function handleOpenCheckBox() {
        setShowCheckBox(!showCheckBox)
    }
    function Icon() {
        if (RouteName == GText.MyColetas) {
            return Global.IconTrash
        } else if (RouteName == GText.SendedColetas) {
            return Global.IconCancel
        }
        else {
            return Global.IconDefault
        }
    }
    useEffect(() => {
        isFocused &&
            GetItens()

        return () => {
            ItensChecked.current = 0
            setShowCheckBox(false)
        }
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
                RouteName={RouteName} showCheckBox={showCheckBox} setShowCheckBox={handleOpenCheckBox}
                handleOnChange={handleOnChange}
            />
            <Line style={{ display: ItensChecked.current > 0 ? 'flex' : 'none' }}>
                <Button name={Icon()} size={40} color={Global.colorButtonDelete}
                    onClick={() => { OpenConfirmation('left') }}
                    style={{ flex: 1 }} />
                <Button name={RouteName === GText.SendedColetas ? Global.IconSync : Global.IconSend} size={35} color={Global.colorButtonDelete}
                    onClick={() => { OpenConfirmation('right') }}
                    style={{ flex: 1 }} />
            </Line>
            <ConfirmationModal ref={ModalRef} button={ButtonModal} label={getLabelModal()} />
        </Container>
    )
}
export default Home