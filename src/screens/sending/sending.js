
import React, { useEffect, useRef, useState } from "react";
import { Animated, BackHandler, Easing, StyleSheet } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import NetInfo from "@react-native-community/netinfo";
import { CreateOnDB, DeleteOnDB, GetItensDB, GetLogDB, GetOnDB } from "../../services/routesData/routesData";
import { Container, TextStyled, ViewStyled, ScrollView, Text, ViewLineSyncing, TextButton, TextTitle, ViewItens } from './style.js'
import { GetAPI } from "../../services/Api/routesApi";
import GText, { routes } from "../../global/texts";
import Global from "../../global/global";
import { GetDataFormatPT } from "../../componentes/functions/Itens";
import BoxColeta from "../../componentes/coletasList/boxColeta";


export default ({ //route
 }) => {
     const route = {params:{data:[{"NomeCliente": "teste", "NumeroColeta": "200003", "TotalItens": 2, "TotalItensCancelados": 0, "TotalItensNaoEnviados": 2, "ValorTotal": 486, "checked": true}] 
        , buttonOrigin:'right', 
        routeName:GText.MyColetas}}

    const navigate = useNavigation()
    const StatusRef = useRef([])
    const [show, setShow] = useState(false)
    const [StatusSending, setStatusSending] = useState(
        {
            loading:false,
            amountSelected:0,
            itemOnSending:0,
            errors:[]
        }
    )
    const RouteName = route.params.routeName
    const Data =  route.params.data

   
    async function handleDelete(data) {
        await DeleteItensDB(GText.infoDB.Table.Itens.fields.ColetaNumber, data)
    }
    async function handleSendColeta(data) {

        const GT = GText.infoDB.Table.Itens.fields
        try {
            await UpdateStatusItensOnDB(GT.ColetaNumber, data, GText.infoInputs.InitialStatusItem, GText.infoInputs.SendedStatusItem)
            const Itens = await GetItensDB(GT.ColetaNumber, data)
            await SendItensAPI(Itens)
        }
        catch (e) {
            await UpdateStatusItensOnDB(GT.ColetaNumber, data, GText.infoInputs.SendedStatusItem, GText.infoInputs.InitialStatusItem)
            Alert.alert(GText.failedOnSendItens, `${e[0].message}${' , Value: '}${e[0].value}`, [
                { text: 'Ok', onPress: () => null }
            ]
            )
        }
    }
    async function handleCancelColeta(data) {
        const GT = GText.infoDB.Table.Itens.fields
        await UpdateStatusItensOnDB(GT.ColetaNumber, data, GText.infoInputs.SendedStatusItem, GText.infoInputs.CancelStatusItem)
        const Itens = await GetItensDB(GT.ColetaNumber, data)
        const ret = await CancelItensAPI(Itens)
        if (ret) {
            //   await UpdateStatusItensOnDB(GT.ColetaNumber, data, GText.infoInputs.SendedStatusItem, GText.infoInputs.CancelStatusItem)
        }
        else {
            await UpdateStatusItensOnDB(GT.ColetaNumber, data, GText.infoInputs.CancelStatusItem, GText.infoInputs.SendedStatusItem)
            alert(GText.failedOnCancelItens)
        }
    }

    async function ButtonModal(origin) {
     
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
    }

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
    async function HaveConnection() {
        const Net = await NetInfo.fetch()
        return Net.isConnected
    }
    async function handleInitialSyncData(origin, routes) {
        await LoopRoutes(routes)
        if (await HaveConnection()) {
            if (origin !== GText.Preload) {
                setShow('Finish')
            }
            else {
                navigate.navigate(route.params.origin, { origin: GText.Preload })
            }
        }
        else {
            setShow('NoInternet')
        }

    }
    async function LoopRoutes(RoutesGet) {
        const retLog = await GetLogDB(GText.infoDB.Table.Log.fields.action, 'firstAcess')
        for (let i = 0; RoutesGet.length > i; i++) {
            let Object = {
                NameRoute: '',
                amountRegister: '',
                ItemOnInsert: '',
                Errors: []
            }
            Object.NameRoute = RoutesGet[i]
            if (await HaveConnection()) {
                StatusRef.current.push({ ...Object })
                setShow(i)
                await CallApi(RoutesGet, i)
                await CreateOnDB(routes.Log, { Acao: GText.Log.actions.sync, Tipo: GText.Log.types.sync, Rota: RoutesGet[i], Data: `${GetDataFormatPT()}` })
            }
            else {
                setShow('NoInternet')
            }
        }
        if (!retLog) {
            await CreateOnDB(routes.Log, { Acao: 'firstAcess', Data: `${GetDataFormatPT()}` })
        }
    }
    async function CallApi(RoutesGet, i) {
        const retPro = await GetOnDB(GText.infoDB.Table.Profile.name)
        const RetProfile = RoutesGet[i] === routes.Itens ? retPro[0][GText.infoDB.Table.Profile.fields.id] : ''

        try {
            const ret = await GetAPI(RoutesGet[i], RetProfile)
            StatusRef.current[i].amountRegister = ret.length
            setShow(i)
           // await DeleteOnDB(RoutesGet[i])
            const ret1 = await GetOnDB(RoutesGet[i])
            if (ret1.length !== ret.length) {
                if (RoutesGet[i] === routes.Itens) {
                    await DeleteOnDB(RoutesGet[i], GText.infoDB.Table.Itens.fields.Status, '<>', GText.infoInputs.InitialStatusItem)
                }
                else {
                    await DeleteOnDB(RoutesGet[i])
                }
                await InsertOnDb(RoutesGet[i], ret, i)
                StatusRef.current[i].ItemOnInsert = ret.length
                setShow(i)
            }
            else {
                StatusRef.current[i].ItemOnInsert = ret.length
                setShow(i)
            }
        }
        catch (e) {
            StatusRef.current[i].Errors.push(e)
            await CreateOnDB(routes.Log,
                { Acao: 'GetApi on preload', Data: `${GetDataFormatPT()}`, Erro: e.toString() })
            setShow(i + 1)
        }
    }
    async function InsertOnDb(TableName, data, index) {
        let ret = true
        let count = 0
        for (let i = 0; data.length > i; i++) {
            ret = await CreateOnDB(TableName, data[i])
            if ((i - 20) === count) {
                count = i
                StatusRef.current[index].ItemOnInsert = i
                setShow(i)
            }
        }
        return ret
    }
    async function handleSync(clearAll) {
        if (clearAll) {
            StatusRef.current = []
            setShow(1)
            await handleInitialSyncData(route.params.origin, route.params.routes)
        }
        else {
            await handleInitialSyncData(route.params.origin, route.params.routes)
        }
    }
    function CountErrors() {
        let ret = 0
        StatusRef.current.map((obj) => {
            obj.Errors.length > 0 ? ret = ret + 1 : () => { }
        })
        return ret
    }
    function handleBack() {
        route.params.origin !== GText.Preload ?
            navigate.goBack()
            :
            BackHandler.exitApp()
    }
    const onBackPress = () => {
        if (show === 'Finish' | show === 'NoInternet') {
            return false
        }
        else {
            return true;
        }

    };



    function handleCreateList() {
        let Object = {
            NameRoute: '',
            amountRegister: '',
            ItemOnInsert: '',
            Errors: [],
            data:{},
            loading:false
        }
        Data.forEach((obj)=>{
            obj['color'] = Global.white
            Object.data = obj
            StatusRef.current.push({ ...Object })
        })
        setShow(1)
    }
    
    async function handleSendItens() {
        const FieldItem = GText.infoDB.Table.Itens.fields
        for(let i = 0; i <= Data.length; i++){
            const ObjItem = Data[i]
            try{
              // const ItemFromBD = await GetItensDB(FieldItem.ColetaNumber, ObjItem[FieldItem.ColetaNumber])
                console.log('ItemFromBD')
            }
            catch(e){
                console.log(e)
            }
        }  
    }


    useEffect(() => {
       handleCreateList()
       handleSendItens()
       // BackHandler.addEventListener('hardwareBackPress', onBackPress);
        return () => {
            StatusRef.current = []
         //   BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }
    }, [])

    useEffect(() => {
        Animated.loop(animation).start();
    }, [animation]);

    useEffect(() => {
        show === 'Finish' &&
            Animated.loop(animation).stop()
    }, [show]);

    function handleTitleHeader() {
        let ret = ''
        ret = show === 'Finish' ? GText.SendFinish : show === 'NoInternet' ? GText.noInternet : GText.Sending
        return ret
    }
    function RenderTotalOfItens(params) {
        const CountItensToSend = Data.length
        return(
            <ViewStyled>
                <Text>
                    Coletas para Enviar : {CountItensToSend}
                </Text>
                <Text>
                    Coletas Enviadas : {CountItensToSend}
                </Text>
            </ViewStyled>
        )
    }

    return (
        <Container>
            <TextTitle >{handleTitleHeader()}</TextTitle>
            <Animated.View style={styles.syncProgressBarContainer}>
                <Animated.View style={[transform, styles.syncProgressBar]} />
                <Animated.View style={[transform, styles.syncProgressBar]} />
                <Animated.View style={[transform, styles.syncProgressBar]} />
                <Animated.View style={[transform, styles.syncProgressBar]} />
            </Animated.View>
            <RenderTotalOfItens/>
            <ScrollView>
                {
                    StatusRef.current.map((item, key) => {
                        return (

                            <ViewItens key={key}
                                style={{ backgroundColor: item.Errors.length > 0 ? Global.redInputs : Global.bluelight3 }} >
                                <BoxColeta readyOnly={true} data={item.data} RouteName={RouteName}/>
                                {/* <TextStyled style={{ fontWeight: 'bold' }}>{item.NameRoute}</TextStyled>
                                <TextStyled>{GText.ObjectSyncOnPreload.namountRegister}: {item.amountRegister}</TextStyled>
                                <TextStyled>{GText.ObjectSyncOnPreload.nItemOnInsert}: {item.ItemOnInsert}</TextStyled> */}
                                {
                                    item.Errors.map((item, key) => (
                                        <TextStyled key={key}>{`${item}`}</TextStyled>
                                    ))
                                }
                            </ViewItens>
                        )
                    })
                }
            </ScrollView>
            {
                show === 'Finish' &&
                <>
                    <Text>{GText.totalErrors + ': ' + CountErrors()}</Text>
                    <ViewLineSyncing onPress={() => { handleSync(true) }} >
                        <TextButton style={{ color: Global.white }}>
                            {GText.messageTryAgainSync}
                        </TextButton>
                    </ViewLineSyncing>
                    <ViewLineSyncing onPress={handleBack}>
                        <TextButton style={{ color: Global.white }}>
                            {GText.ButtonFinishSync}
                        </TextButton>
                    </ViewLineSyncing>
                </>

            }
            {
                show === 'NoInternet' &&
                <>
                    <ViewLineSyncing onPress={() => { handleSync(true) }} >
                        <TextButton style={{ color: Global.white }}>
                            {GText.messageTryAgainSync}
                        </TextButton>
                    </ViewLineSyncing>
                    <ViewLineSyncing onPress={handleBack}>
                        <TextButton style={{ color: Global.white }}>
                            {route.params.origin !== GText.Preload
                                ? GText.ButtonFinishSync
                                : GText.messageExitApp}
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
