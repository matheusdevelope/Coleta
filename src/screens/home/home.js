import { useFocusEffect, useIsFocused, useNavigation } from "@react-navigation/core";
import React, { useEffect, useState, useRef } from "react";
import ColetasList from "../../componentes/coletasList/coletasList.js";
import Header from "../../componentes/header/header.js";
import ConfirmationModal from "../../componentes/modalConfirmation/modalConfirmation.js";
import SearchBox from "../../componentes/searchBox/searchBox.js";
import Global from "../../global/global.js";
import GText, { Routes } from "../../global/texts.js";
import { Container, Line } from './style.js'
import { DeleteItensDB, GetItensDB, GetItensGrouped, UpdateStatusItensOnDB } from '../../services/routesData/routesData'
import { CancelItensAPI, SendItensAPI } from "../../services/Api/routesApi.js";
import Button from "../../componentes/button/button.js";
import { Alert, BackHandler } from "react-native";

function Home({ route }) {
    const RouteName = route.name
    const isFocused = useIsFocused()
    const navigation = useNavigation()
    const ModalRef = useRef()
    const dataRef = useRef([])
    const search = useRef('')
    const CheckedAll = useRef(false)
    const ItensChecked = useRef(0)
    const [showCheckBox, setShowCheckBox] = useState(false)
    const [data, setData] = useState([])
    const field = GText.infoDB.Table.Itens.fields.ColetaNumber
 
//    clients.remove(60)
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
            handleSyncColeta()
        }
    }
    function handleSyncColeta() {
        const routes = Routes()
        navigation.navigate(GText.Syncing, { routes: [routes.itens], origin: GText.SendedColetas })
    }  
    function ButtonHeaderLeft() {
        navigation.openDrawer()
    }
    function OpenConfirmation(data) {
        if (ItensChecked.current > 0) {
            ModalRef.current.setLabel(getLabelModal(data))
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
        async function forArray(action) {
            for (let i = 0; i < arrayItens.length; i++) {
                await action(arrayItens[i])
            }
        }
        async function routeName(action1, action2) {
            if (RouteName == GText.MyColetas) {
                await forArray(action1)
            }
            else if (RouteName == GText.SendedColetas) {
                await forArray(action2)
            }
        }
        if (origin === 'left') {
            await routeName(handleDelete, handleCancelColeta)
        }
        else if (origin == 'right') {
            await routeName(handleSendColeta, handleSyncColeta)
        }
        ModalRef.current.toggle()
        await GetItens()
        toggleChecedkAll(true)
    }
    function handleOpenCheckBox() {
        setShowCheckBox(!showCheckBox)
    }
    function toggleChecedkAll(closelist) {
        CheckedAll.current = !CheckedAll.current
        handleOnChangeCheckBox(closelist ? false : CheckedAll.current, null, true)
        closelist && setShowCheckBox(false)

    }
    function handleOnChangeCheckBox(checked, param, all){
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
        setData(FilterList(dataRef.current, GText.infoInputs.nNameClient, search.current))
    }
    function handleEdit(data) {
        if (RouteName === GText.MyColetas) {
            handleSendColeta(data)
        }
        else if (RouteName === GText.SendedColetas) {
            navigation.navigate(GText.NewColeta, { data: data, routeOrigin: RouteName })
        }
    }
    async function handleDelete(data) {
        await DeleteItensDB(GText.infoDB.Table.Itens.fields.ColetaNumber, data)
    }
    async function handleSendColeta(data) {
        
        const GT = GText.infoDB.Table.Itens.fields
        const Itens = await GetItensDB(GT.ColetaNumber, data)
       // console.log('sendColetas',Itens)
        const ret = await SendItensAPI(Itens)
        if (ret) {
            await UpdateStatusItensOnDB(GT.ColetaNumber, data, GText.infoInputs.InitialStatusItem, GText.infoInputs.SendedStatusItem)
        }
        else {
           // alert(GText.failedOnSendItens)
           console.log(GText.failedOnSendItens)
        }
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
     
    function getLabelModal(origin) {
        let ret = {}
        function Label(more, one) {
            ret = ItensChecked.current > 1 ? more : one
        }
        if (RouteName == GText.MyColetas) {
            origin === 'right' ?
                Label(GText.labelModalSendColetasHome, GText.labelModalSendColetaHome)
                :
                Label(GText.labelModalDeleteColetasHome, GText.labelModalDeleteColetaHome)
        }
        else if (RouteName == GText.SendedColetas) {
            origin === 'left' ?
                Label(GText.labelModalCancelSendedItens, GText.labelModalCancelSendedItem)
                :
                Label(GText.labelModalSyncSendedItens, GText.labelModalSyncSendedItem)
        }
        return ret
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
    function RenderHeader() {
        if (showCheckBox) {
            return (
                <Header title={GText.Selection} name={Global.IconCloseList} name2={Global.IconList}
                    size={Global.sizeIconHeader} color={Global.colorIconHeader} onClickLeft={() => { toggleChecedkAll(true) }}
                    onClickRight={() => { toggleChecedkAll() }} />
            )
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
    useEffect(() => {
        isFocused &&
            GetItens()
        return () => {
            ItensChecked.current = 0
            setShowCheckBox(false)
        }
    }, [isFocused])

    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                if (showCheckBox) {
                    toggleChecedkAll(true);
                    return true;
                } else {
                    Alert.alert('Sair','Deseja sair do aplicativo?',
                        [
                            // {
                            //   text: "Ask me later",
                            //   onPress: () => console.log("Ask me later pressed")
                            // },
                            {
                              text: "CONTINUAR",
                              onPress: () => null,
                              style: "cancel"
                            },
                            { text: "SAIR", onPress: () => BackHandler.exitApp() }
                          ]
                    )
                    return true;
                }
            };
            BackHandler.addEventListener('hardwareBackPress', onBackPress);
            return () =>
                BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }, [showCheckBox])
    );
    function setSearch(value) {
        search.current = value
        setData(FilterList(dataRef.current, GText.infoInputs.nNameClient, search.current))
    }
    return (
        <Container>
            <RenderHeader />
            <SearchBox placeholder={GText.SearchBox} name={Global.iconSearchBox}
                size={Global.sizeIconSearch} color={Global.colorIconSearch} input={search.current} setInput={setSearch} />
            <ColetasList data={data} buttonLeft={OpenConfirmation} buttonRight={handleEdit} isFocused={isFocused}
                RouteName={RouteName} showCheckBox={showCheckBox} setShowCheckBox={handleOpenCheckBox}
                handleOnChange={handleOnChangeCheckBox}
            />
            <Line style={{ display: ItensChecked.current > 0 ? 'flex' : 'none' }}>
                <Button name={Icon()} size={40} color={Global.colorButtonDelete}
                    onClick={() => { OpenConfirmation('left') }}
                    style={{ flex: 1 }} />
                <Button name={RouteName === GText.SendedColetas ? Global.IconSync : Global.IconSend} size={35} color={Global.colorButtonDelete}
                    onClick={() => { OpenConfirmation('right') }}
                    style={{ flex: 1 }} />
            </Line>
            {
                showCheckBox && <ConfirmationModal ref={ModalRef} button={ButtonModal} label={getLabelModal()} />
            }

        </Container>
    )
}
export default Home