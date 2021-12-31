
import React, { useEffect, useRef, useState } from "react";
import { Animated, BackHandler, Easing, StyleSheet } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import NetInfo from "@react-native-community/netinfo";
import { GetItensDB, UpdateStatusItensOnDB } from "../../services/routesData/routesData";
import { Container, TextStyled, ViewStyled, ScrollView, Text, ViewLineSyncing, TextButton, TextTitle, ViewItens, View } from './style.js'
import {  SendItensAPI } from "../../services/Api/routesApi";
import GText from "../../global/texts";
import Global from "../../global/global";
import BoxColeta from "../../componentes/coletasList/boxColeta";


export default ({ route }) => {
    const routess = {
        params: {
            data: [{ "NomeCliente": "teste", "NumeroColeta": "200000", "TotalItens": 2, "TotalItensCancelados": 0, "TotalItensNaoEnviados": 2, "ValorTotal": 486, "checked": true },
            { "NomeCliente": "teste", "NumeroColeta": "200001", "TotalItens": 2, "TotalItensCancelados": 0, "TotalItensNaoEnviados": 2, "ValorTotal": 486, "checked": true },
                // { "NomeCliente": "teste", "NumeroColeta": "200000", "TotalItens": 2, "TotalItensCancelados": 0, "TotalItensNaoEnviados": 2, "ValorTotal": 486, "checked": true },
                // { "NomeCliente": "teste", "NumeroColeta": "200001", "TotalItens": 2, "TotalItensCancelados": 0, "TotalItensNaoEnviados": 2, "ValorTotal": 486, "checked": true },         
            ]
            , buttonOrigin: 'right',
            routeName: GText.MyColetas
        }
    }
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
        let ItensSeparated = { ItemToCreate: [], ItemToUpdate: [] }
        for (let i = 0; i < Itens.length; i++) {
            try {
                await UpdateStatusItensOnDB(FieldItem.ColetaNumber, Itens[i][FieldItem.ColetaNumber], GText.infoInputs.InitialStatusItem, GText.infoInputs.SendedStatusItem)
                ItemFromDB = await GetItensDB(FieldItem.ColetaNumber, Itens[i][FieldItem.ColetaNumber])
                ItemFromDB ?
                    await handleSendToApi(SeparateItens(ItensSeparated, ItemFromDB), Itens[i])
                    :
                    handleCreateList(Itens[i], [{ message: 'Não encontrado no banco de dados' }])
            }
            catch (e) {
                await UpdateStatusItensOnDB(FieldItem.ColetaNumber, Itens[i][FieldItem.ColetaNumber], GText.infoInputs.SendedStatusItem, GText.infoInputs.InitialStatusItem)
                handleCreateList(Itens[i], e)
            }
        }

        copy.status = 'Finish'
        setstatus({ ...copy })
    }
    async function handleSendToApi(Itens, objItem) {
        try {
            Itens.ItemToCreate.length > 0 && await SendItensAPI(Itens.ItemToCreate)
            Itens.ItemToUpdate.length > 0 && await SendItensAPI(Itens.ItemToUpdate, 'update')
            handleCreateList(objItem)
        }
        catch (e) {
            await UpdateStatusItensOnDB(FieldItem.ColetaNumber, objItem[FieldItem.ColetaNumber], GText.infoInputs.SendedStatusItem, GText.infoInputs.InitialStatusItem)
            handleCreateList(objItem, e)
        }
    }
    function SeparateItens(ObjSeparate, itens) {
        itens.map((obj) => {
            if (obj[FieldItem.createdAt] !== '' & obj[FieldItem.createdAt] !== undefined & obj[FieldItem.createdAt] !== null) {
                ObjSeparate.ItemToUpdate.push(obj)
            }
            else {
                ObjSeparate.ItemToCreate.push(obj)
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
        //copy.sended = copy.total - CountErrors()
        setstatus({ ...copy })
    }
    function handleTryAgain() {
        let ItensWithErrors = []
        StatusRef.current.map((obj) => {
            obj.Errors.length > 0 && ItensWithErrors.push(obj.data)
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
    function RenderTotalOfItens() {
        return (
            <ViewStyled>
                <Text>
                    Coletas para Enviar : {status.total}
                </Text>
                <Text>
                    Coletas Enviadas : {status.sended}
                </Text>
                <Text>
                    Coletas com Erros : {status.error}
                </Text>
            </ViewStyled>
        )
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
