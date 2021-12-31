import { useFocusEffect, useIsFocused, useNavigation } from "@react-navigation/core";
import React, { useRef } from "react";
import Header from "../../componentes/header/header.js";
import ItensList from "../../componentes/itensList/itensList.js";
import Global from "../../global/global.js";
import GText from "../../global/texts.js";
import InputArea from "../../componentes/inputArea/inputsArea.js";
import { Container } from './style.js'
import { GetItensGrouped } from "../../services/routesData/routesData.js";
import ConfirmationModal from "../../componentes/modalConfirmation/modalConfirmation.js";
import { BackHandler } from "react-native";
function NewColeta({ route }) {
    const ModalRef = useRef(null)
    const ListRef = useRef(null)
    const InputRef = useRef(null);
    const navigation = useNavigation()
    const isFocused = useIsFocused()
    const data = route.params.data

    async function dataToDetails(Route) {
        // *Route* is a explicit route used to block 
        //cancel itens on details screen when the coleta from SendedItens is saved.
        const ret = await GetItensGrouped(GText.infoDB.Table.Itens.fields.ColetaNumber, data[GText.infoDB.Table.Itens.fields.ColetaNumber])
        const dataToDetails = { data: ret[0], FromEditColeta: true, routeOrigin: Route ? Route : route?.params.routeOrigin }
        return dataToDetails
    }
    async function SaveItensOnDB() {
        //save changes and includes the go to :
        if (!ListRef.current.GetItemOnEdit()) {
            await ListRef.current.InsertOnDB()
            await InputRef.current.resetForm()
            await ListRef.current.resetList()
            data !== undefined ?
                navigation.navigate(GText.Details, await dataToDetails(GText.MyColetas))
                :
                navigation.goBack()
        }
        else {
            alert(GText.MessageAlertEditingItemNewColeta)
        }

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
            navigation.navigate(GText.MyColetas)
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

    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                ButtonHeaderLeft();
                return true;
            };
            BackHandler.addEventListener('hardwareBackPress', onBackPress);
            return () =>
                BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }, [])
    ); 

    return (
        <Container>
            <Header title={route.params.titleScreen !== undefined ? route.params.titleScreen : GText.NewColeta}
                name={Global.iconBack} name2={Global.iconSave}
                size={Global.sizeIconHeader} color={Global.colorIconHeader} style={{ marginLeft: 8 }}
                onClickLeft={() => { ButtonHeaderLeft() }} onClickRight={() => { ButtonHeaderRight() }} />
            <InputArea ref={InputRef} itens={data} isFocused={isFocused} InsertNewItemOnList={InsertNewItemOnList} />
            <ItensList ref={ListRef} itens={data} isFocused={isFocused} EditItem={EditItem} HideCanceled />
            <ConfirmationModal ref={ModalRef} button={Navigate} label={GText.labelModalBackNewColeta} invert />
        </Container>
    )
}
export default NewColeta