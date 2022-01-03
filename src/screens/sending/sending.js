
import React, { useEffect, useRef, useState } from "react";
import { Animated, BackHandler, Easing, StyleSheet } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import NetInfo from "@react-native-community/netinfo";
import { GetItensDB, UpdateItensDB } from "../../services/routesData/routesData";
import { Container, TextStyled, ViewStyled, ScrollView, Text, ViewLineSyncing, TextButton, TextTitle, ViewItens, View } from './style.js'
import { SendItensAPI, UpdateItensAPI } from "../../services/Api/routesApi";
import GText from "../../global/texts";
import Global from "../../global/global";
import BoxColeta from "../../componentes/coletasList/boxColeta";


export default ({ route }) => {
    let initialStatus = { total: 0, sended: 0, error: 0, showError: false, status: 'Sending' }
    const navigate = useNavigation()
    const StatusRef = useRef([])
    const [toggle, setTogle] = useState(false)
    const [status, setstatus] = useState(initialStatus)
    const RouteName = route.params.routeName
    const Data = route.params.data
    const FieldItem = GText.infoDB.Table.Itens.fields


    ////animation
    const [offsetX] = useState(new Animated.Value(-400));
    const translate = Animated.timing(offsetX, {
        toValue: 0,
        duration: 1000,
        easing: Easing.inOut(Easing.linear),
        useNativeDriver: true,
    });
    const reset = Animated.timing(offsetX, {
        toValue: -430,
        duration: 0,
        useNativeDriver: true,
    });
    const animation = Animated.sequence([translate, reset]);
    const transform = { transform: [{ translateX: offsetX }] };
    ////animation

    async function HaveConnection(action, Itens) {
        const Net = await NetInfo.fetch()
        if (Net.isConnected) {
            Itens ?
                action(Itens)
                :
                action()
        }
        else {
            let copy = status
            copy.status = 'NoInternet'
            setstatus({ ...copy })
        }
    }
    async function handleSendItens(Itens) {
        let copy = status
        copy.total = Itens.length
        copy.status = 'Sending'
        setstatus({ ...copy })
        let ItemFromDB = []
        for (let i = 0; i < Itens.length; i++) {
            try {
                ItemFromDB = await GetItensDB(FieldItem.ColetaNumber, Itens[i][FieldItem.ColetaNumber])
                ItemFromDB ?
                    await handleSendToApi(SeparateItens(ItemFromDB, Itens[i]), Itens[i])
                    :
                    handleCreateList(Itens[i], [{ message: 'Não encontrado no banco de dados' }])
            }
            catch (e) {
                handleCreateList(Itens[i], e)
            }
        }
        copy.status = 'Finish'
        setstatus({ ...copy })
    }
    async function handleSendToApi(Itens, objItem) {
        if (Itens.ItemToCreate.length > 0) {
            try {
                let ret = await SendItensAPI(Itens.ItemToCreate)
                for (let i = 0; i < ret.length; i++) {
                    try {
                        await UpdateItensDB(FieldItem.IdMobile, ret[i][FieldItem.IdMobile], ret[i])
                    }
                    catch (e) {
                        handleCreateList(objItem, { message: 'Falha atualizar status localmente, faça a sincronização do dados,', error: e })
                    }
                }
                handleCreateList(objItem)
            }
            catch (e) {
                handleCreateList(objItem, e)
            }
        }
        if (Itens.ItemToUpdate.length > 0) {
            try {
                let ret = await UpdateItensAPI(Itens.ItemToUpdate)
                for (let i = 0; i < ret.length; i++) {
                    try {
                        await UpdateItensDB(FieldItem.id, ret[i][FieldItem.id], ret[i])
                    }
                    catch (e) {
                        handleCreateList(objItem, { message: 'Falha atualizar status localmente, faça a sincronização do dados,', error: e })
                    }
                }
                handleCreateList(objItem)
            }
            catch (e) {
                handleCreateList(objItem, e)
            }
        }
    }
    function SeparateItens(itens, objItens) {
        let ObjSeparate = { ItemToCreate: [], ItemToUpdate: [] }
        itens.forEach((obj) => {
            if (obj[FieldItem.Status] === GText.infoInputs.InitialStatusItem) {
                obj[FieldItem.Status] = GText.infoInputs.SendedStatusItem
                 // Format Date to: 2021-01-01 12:00:00
                for (let props in obj) {
                    if (props.toString().includes('Data')) {
                        obj[props] = obj[props] !== null ? obj[props].slice(0, 19).replace('T', ' ') : obj[props]
                    }
                    else {
                    }
                }
                const createdAt = obj[FieldItem.createdAt]
                if (createdAt !== '' & createdAt !== undefined & createdAt !== null) {
                        if (obj[FieldItem.id] !== null & obj[FieldItem.id] !== undefined & obj[FieldItem.id] !== '') {
                        ObjSeparate.ItemToUpdate.push(obj)
                    }
                    else {
                        handleCreateList(objItens, { message: 'Coleta Sem ID do retaguarda para update.', error: [obj] })
                    }
                }
                else {
                    ObjSeparate.ItemToCreate.push(obj)
                }
            }
        })
        return ObjSeparate
    }
    function handleCreateList(item, error) {
        let Object = {
            NameRoute: '',
            amountRegister: '',
            ItemOnInsert: '',
            Errors: [],
            data: {},
            showError: false,
        }
        item['color'] = error ? Global.redCanceled : Global.white
        Object.data = item

        error && Object.Errors.push({ error: JSON.stringify(error[0] ? error[0] : error, null, '\t'), message: error[0] ? error[0].message : error.message })
        StatusRef.current.push({ ...Object })

        let copy = status
        error ? () => null : copy.sended = copy.sended + 1
        copy.error = CountErrors()
        setstatus({ ...copy })
    }
    function handleTryAgain() {
        let ItensWithErrors = []
        let ColetaNumbers = []
        StatusRef.current.map((obj) => {
            let have = ColetaNumbers.find(number => number === obj.data[FieldItem.ColetaNumber])
            ColetaNumbers.push(obj.data[FieldItem.ColetaNumber])
            have === undefined & obj.Errors.length > 0 && ItensWithErrors.push(obj.data)
        })
        StatusRef.current = []
        handleSendItens(ItensWithErrors)
    }
    function CountErrors() {
        let ret = 0
        StatusRef.current.map((obj) => {
            obj.Errors.length > 0 ? ret = ret + 1 : () => { }
        })
        return ret
    }
    function ShowButtons() {
        if (status.status === 'Finish' | status.status === 'NoInternet') {
            return true
        }
        else {
            return false
        }
    }
    function ShowError(key) {
        StatusRef.current[key].showError = !toggle
        setTogle(!toggle)
    }
    const onBackPress = () => {
        if (ShowButtons()) {
            navigate.goBack()
        }
        return true
    };

    useEffect(() => {
        HaveConnection(handleSendItens, Data)
        BackHandler.addEventListener('hardwareBackPress', onBackPress);
        return () => {
            StatusRef.current = []
            BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }
    }, [])

    useEffect(() => {
        Animated.loop(animation).start();
    }, [animation]);

    useEffect(() => {
        status.status === 'Finish' &&
            Animated.loop(animation).stop()
    }, [status, toggle]);

    function handleTitleHeader() {
        let ret = ''
        ret = status.status === 'Finish' ? GText.SendFinish : status.status === 'NoInternet' ? GText.noInternet : GText.Sending
        return ret
    }
    function RenderAnimation() {
        return (
            <Animated.View style={styles.syncProgressBarContainer}>
                <Animated.View style={[transform, styles.syncProgressBar]} />
                <Animated.View style={[transform, styles.syncProgressBar]} />
                <Animated.View style={[transform, styles.syncProgressBar]} />
                <Animated.View style={[transform, styles.syncProgressBar]} />
            </Animated.View>
        )
    }
    function RenderTotalOfItens() {
        return (
            <ViewStyled>
                <Text>
                    {GText.objSendingItens.totalToSend} : {status.total}
                </Text>
                <Text>
                    {GText.objSendingItens.sended} : {status.sended}
                </Text>
                <Text>
                    {GText.objSendingItens.error} : {status.error}
                </Text>
            </ViewStyled>
        )
    }

    return (
        <Container>
            <TextTitle >{handleTitleHeader()}</TextTitle>
            <RenderAnimation />
            <RenderTotalOfItens />
            <ScrollView>
                {StatusRef.current.map((item, key1) => (
                    <ViewItens key={key1}>
                        <BoxColeta readyOnly={true} data={item.data} RouteName={RouteName} />
                        {item.Errors.map((item, key) => (
                            <View key={key} onLongPress={() => { ShowError(key1) }}>
                                <TextStyled >{item.message}</TextStyled>
                                {StatusRef.current[key1].showError &&
                                    <TextStyled >{item.error}</TextStyled>
                                }
                            </View>
                        ))}
                    </ViewItens>
                ))}
            </ScrollView>
            {
                ShowButtons() > 0 &&
                <>
                    {CountErrors() > 0 &&
                        <ViewLineSyncing onPress={() => { HaveConnection(handleTryAgain) }} >
                            <TextButton style={{ color: Global.white }}>
                                {GText.messageTryAgainSync}
                            </TextButton>
                        </ViewLineSyncing>
                    }
                    <ViewLineSyncing onPress={onBackPress}>
                        <TextButton style={{ color: Global.white }}>
                            {GText.ButtonFinishSync}
                        </TextButton>
                    </ViewLineSyncing>
                </>
            }
        </Container>
    )
}


const styles = StyleSheet.create({
    headerContentContainer: {
        paddingHorizontal: 25,
        paddingTop: 80,
        paddingBottom: 40,
    },
    syncContentContainer: {
        paddingHorizontal: 25,
        paddingTop: 40,
        paddingBottom: 20,
    },
    title1: {
        fontWeight: '700',
        fontSize: 32,
        color: '#000',
    },
    title3: {
        fontWeight: '700',
        fontSize: 18,
    },
    body2: {
        fontSize: 14,
    },
    syncProgressBarContainer: {
        flexDirection: 'row',
    },
    syncProgressBar: {
        height: 4,
        marginHorizontal: 10,
        width: 200,
        backgroundColor: '#0000ff',
    },
});
