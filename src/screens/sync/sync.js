
import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing, StyleSheet } from 'react-native';
import { CreateOnDB, DeleteOnDB, GetLogDB, GetOnDB } from "../../services/routesData/routesData";
import { Container, TextStyled, ViewStyled, ScrollView, Text } from './style.js'
import { GetAPI } from "../../services/Api/routesApi";
import GText from "../../global/texts";
import { useNavigation } from "@react-navigation/native";


export default ({route}) => {
    const navigate = useNavigation()
    const StatusRef = useRef([])
    const [show, setShow] = useState(false)
    const DataNow = new Date()
    const GetDate = ('0' + DataNow.getDate()).substr(-2) + "/" + ("0" + (DataNow.getMonth() + 1)).substr(-2) + "/" + DataNow.getFullYear()
    const Hour = (DataNow.getHours().toString() + ":" + DataNow.getMinutes().toString()).toString()

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
    
    async function handleInitialSyncData(routes) {
        await LoopRoutes(routes)
        navigate.goBack()
    }

    async function LoopRoutes(RoutesGet) {
        const retLog = await GetLogDB()
        if (retLog) {
            for (let i = 0; RoutesGet.length > i; i++) {
                let Object = {
                    NameRoute: '',
                    amountRegister: '',
                    ItemOnInsert: '',
                    Errors: []
                }
                Object.NameRoute = RoutesGet[i]
                StatusRef.current.push({ ...Object })
                setShow(i)
                await CallApi(RoutesGet, i)
            }
            await CreateOnDB(GText.Routes.log, { Acao: 'firstAcess', Data: `${GetDate + ' ' + Hour}` })
        }
    }

    async function CallApi(RoutesGet, i) {
        console.log(RoutesGet[i])
        try {
            const ret = await GetAPI(RoutesGet[i])
            StatusRef.current[i].amountRegister = ret.length
            setShow(i)

            const ret1 = await GetOnDB(RoutesGet[i])
            if (ret1.length !== ret.length) {
                await DeleteOnDB(RoutesGet[i])
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
            await CreateOnDB(GText.Routes.log,
                { Acao: 'GetApi on preload', Data: `${GetDate + ' ' + Hour}`, Erro: e.toString() })
            setShow(i + 1)
            // alert('handleInitialSyncData GetAPI, preload', e)
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
    function handleSync(routes) {
        handleInitialSyncData(routes)
    }  

    useEffect(() => {
        Animated.loop(animation).start();
    }, [animation]);
    useEffect(()=>{
        console.log(route.params.routes)
        handleSync(route.params.routes)
        return()=>{
            StatusRef.current = [] 
        }
    },[])

    return (
        <Container>
            <Text>{GText.Syncing}</Text>
            <Animated.View style={styles.syncProgressBarContainer}>
                <Animated.View style={[transform, styles.syncProgressBar]} />
                <Animated.View style={[transform, styles.syncProgressBar]} />
                <Animated.View style={[transform, styles.syncProgressBar]} />
                <Animated.View style={[transform, styles.syncProgressBar]} />
            </Animated.View>
            <ScrollView>
                {
                    StatusRef.current.map((item, key) => (
                        <ViewStyled key={key}>
                            <TextStyled style={{ fontWeight: 'bold' }}>{item.NameRoute}</TextStyled>
                            <TextStyled>{GText.ObjectSyncOnPreload.namountRegister}: {item.amountRegister}</TextStyled>
                            <TextStyled>{GText.ObjectSyncOnPreload.nItemOnInsert}: {item.ItemOnInsert}</TextStyled>
                            {
                                item.Errors.map((item, key) => (
                                    <TextStyled key={key}>{`${item}`}</TextStyled>
                                ))
                            }
                        </ViewStyled>
                    ))
                }
            </ScrollView>
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
