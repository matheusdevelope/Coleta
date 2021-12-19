
import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import Fundo from '../../assets/fundo.svg'
import { CreateOnDB, DeleteOnDB, GetLogDB, GetOnDB, GetProfileDB } from "../../services/routesData/routesData";
import { Container, Modal, ViewModal, LoadingIcon, TextStyled, ViewStyled, ScrollView, TextHeader } from './style.js'
import { GetAPI } from "../../services/Api/routesApi";
import GText from "../../global/texts";


export default ({ route }) => {


    const navigation = useNavigation()
    const StatusRef = useRef([])
    const [show, setShow] = useState(true)
    const DataNow = new Date()
    const GetDate = ('0' + DataNow.getDate()).substr(-2) + "/" + ("0" + (DataNow.getMonth() + 1)).substr(-2) + "/" + DataNow.getFullYear()
    const Hour = (DataNow.getHours().toString() + ":" + DataNow.getMinutes().toString()).toString()
    const [offsetX] = useState(new Animated.Value(-400));
    let CopyObject = GText.ObjectSyncOnPreload


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


    async function InsertOnDb(TableName, data, index) {
      //  StatusRef.current[index].amountRegister = data.length
        let ret = true
        let count = 0
        for (let i = 0; data.length > i; i++) {
            ret = await CreateOnDB(TableName, data[i])
            if ((i - 20) === count) {
                count = i
               // StatusRef.current[index].ItemOnInsert = i
                // StatusRef.current.ItemOnInsert = i
               // setShow(i)
            }
        }
        setShow(data.length)
        return ret
    }
   
    async function handleTry(RoutesGet, i, Object) {
        try {
            const ret = await GetAPI(RoutesGet[i])
             Object.amountRegister = ret.length
             console.log(Object)
             
             let copy = StatusRef.current
             copy.splice(i, 1, {...Object});
            // copy[i].amountRegister = ret.length
            console.log('copy')
             StatusRef.current = [...copy]
             console.log(StatusRef.current)
            setShow(i)
         
            const ret1 = await GetOnDB(RoutesGet[i])
            if (  true ){  // ret1.length !== ret.length) {
                await DeleteOnDB(RoutesGet[i])
                await InsertOnDb(RoutesGet[i], ret, i)
              
                // Object.ItemOnInsert = ret.length
                // StatusRef.current[i] = Object
               // setShow(i)
            }
            else {
                // Object.ItemOnInsert = ret.length
                // StatusRef.current[i] = Object
               // setShow(i)
            }            
        }
        catch (e) {
        //    Object.Errors.push(e)
            await CreateOnDB(GText.Routes.log,
                { Acao: 'GetApi on preload', Data: `${GetDate + ' ' + Hour}`, Erro: e.toString() })
           // setShow(i)
            // alert('handleInitialSyncData GetAPI, preload', e)
        }

    }
    // console.log(StatusRef.current)
    async function handle(RoutesGet, retLog, Object) {
        if (!retLog) {
            for (let i = 0; RoutesGet.length > i; i++) {
                Object.NameRoute = RoutesGet[i]
                StatusRef.current.push({...Object}) 
                setShow(i)
                await DeleteOnDB(RoutesGet[i])
                await handleTry(RoutesGet, i, Object)
            }
            await CreateOnDB(GText.Routes.log, { Acao: 'firstAcess', Data: `${GetDate + ' ' + Hour}` })
        }
    }
    
  
    async function handleInitialSyncData() {
        const RoutesGet = [
            //GText.Routes.warranty,
            GText.Routes.brand,
            GText.Routes.situation,
            GText.Routes.branch,
            // GText.Routes.client,
            // GText.Routes.company,
            // GText.Routes.itens,
            // GText.Routes.branch,
        ]
        let Object = {
            NameRoute: '',
            amountRegister: '',
            ItemOnInsert: '',
            Errors: []
        }
        await DeleteOnDB(GText.Routes.log)
        const retLog = await GetLogDB()
        await handle(RoutesGet, retLog, Object)
        //  navigate()
    }

    async function navigate() {
        const profile = await GetProfileDB()
        if (!profile) {
            navigation.reset({ routes: [{ name: 'Login' }] })
        }
        else {
            navigation.reset({ routes: [{ name: 'HomeDrawer' }] })
        }
    }
    useEffect(() => {
        console.log('useefefect')
        route.params.origin !== 'preload' ?
            navigate() :
            handleInitialSyncData()
    }, [])

    useEffect(() => {
        Animated.loop(animation).start();

        // Substitua esse setTimeout por uma chamada http ou qualquer outra chamada de serviço.
        // setTimeout(() => {
        //     console.log('Chamar serviço');
        // }, 4000);
    }, [animation]);

    return (
        <Container>

            {
                !show ?
                    <>
                        <Fundo width='100%' height='100%' />
                        <Modal transparent={true} visible={true}>
                            <ViewModal>
                                <LoadingIcon size='large' color='#0C0A0A' />
                            </ViewModal>
                        </Modal>
                    </>
                    :
                    <ScrollView>
                        <TextHeader>
                            Sincronizando Dados!
                        </TextHeader>
                        <Animated.View style={styles.syncProgressBarContainer}>
                            <Animated.View style={[transform, styles.syncProgressBar]} />
                            <Animated.View style={[transform, styles.syncProgressBar]} />
                            <Animated.View style={[transform, styles.syncProgressBar]} />
                            <Animated.View style={[transform, styles.syncProgressBar]} />
                        </Animated.View>
                        {
                            StatusRef.current.map((item, key) => (
                                <ViewStyled key={key}>
                                    <TextStyled style={{ fontWeight: 'bold' }}>{item.NameRoute}</TextStyled>
                                    <TextStyled>{GText.ObjectSyncOnPreload.namountRegister}: {item.amountRegister}</TextStyled>
                                    <TextStyled>{GText.ObjectSyncOnPreload.nItemOnInsert}: {item.ItemOnInsert}</TextStyled>
                                    <TextStyled>{GText.ObjectSyncOnPreload.nNameError}: </TextStyled>
                                    {/* {
                                        item.Errors.map((item, key) => (
                                            <TextStyled key={key}>{}</TextStyled>
                                        ))
                                    } */}
                                </ViewStyled>
                            ))
                        }
                      {/* <LoadingIcon size='large' color='#0C0A0A' /> */}
                    </ScrollView>
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
      color:'#000',
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
  