
import React, { useEffect, useRef, useState } from "react";
import { useNavigation } from '@react-navigation/native'
import Fundo from '../../assets/fundo.svg'
import { CreateOnDB, DeleteOnDB, GetLogDB, GetOnDB, GetProfileDB } from "../../services/routesData/routesData";
import { Container, Modal, ViewModal, LoadingIcon, Text } from './style.js'
import { GetAPI } from "../../services/Api/routesApi";
import GText from "../../global/texts";

export default ({ route }) => {
    const ModelObject = {
        NameRoute: '',
        amountRegister: '',
        ItemOnInsert: '',
        Error: [],
    }
    const navigation = useNavigation()
    const StatusRef = useRef(ModelObject)
    const [show, setShow] = useState(false)


    async function InsertOnDb(TableName, data) {
        StatusRef.current.amountRegister = data.length
        let ret = true
        let count = 0
        for (let i = 0; data.length > i; i++) {
            ret = await CreateOnDB(TableName, data[i])
            if ((i - 20) === count) {
                count = i
                StatusRef.current.ItemOnInsert = i
                setShow(i)
            }
        }
        setShow(data.length)
        return ret
    }

    async function handleInitialSyncData() {
        const RoutesGet = [
            GText.Routes.warranty,
            GText.Routes.situation,
            GText.Routes.branch,
            GText.Routes.brand,
            GText.Routes.client,
            GText.Routes.company,
            //GText.Routes.itens
            GText.Routes.branch,
        ]
      //  await DeleteOnDB(GText.Routes.log)
        const retLog = await GetLogDB()
       //   console.log(retLog)

        if (!retLog) {
            for (let i = 0; RoutesGet.length > i; i++) {
                StatusRef.current.NameRoute = RoutesGet[i]
                setShow(i)
                await DeleteOnDB(RoutesGet[i])
                try {
                    const ret = await GetAPI(RoutesGet[i])
                    StatusRef.current.amountRegister = ret.length
                    setShow(i)

                    const ret1 = await GetOnDB(RoutesGet[i])
                    if (ret1.length !== ret.length) {

                        await DeleteOnDB(RoutesGet[i])
                        await InsertOnDb(RoutesGet[i], ret)
                        StatusRef.current.ItemOnInsert = ret.length
                        setShow(i)
                    }
                    else {
                        StatusRef.current.ItemOnInsert = ret.length
                        setShow(i)
                    }
                }
                catch (e) {
                    StatusRef.current.Error.push(e)
                    await CreateOnDB(GText.Routes.log,
                        { Acao: 'GetApi on preload', Data: `'${new Date()}'`, Erro: e.toString() })
                    setShow(i)
                    // alert('handleInitialSyncData GetAPI, preload', e)
                }
            }
          //  console.log('antes')
            await CreateOnDB(GText.Routes.log, { Acao: 'firstAcess', Data: new Date() })
        }
      //  await CreateOnDB(GText.Routes.log, { Acao: 'firstAcess', Data: new Date() })
        console.log('passou a criacao ')

        navigate()

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

        route.params.origin === 'preload' ?
            navigate() :
            handleInitialSyncData()
    }, [])

    return (

        <Container>
            <Fundo width='100%' height='100%' />
            <Modal transparent={true} visible={true}>
                <ViewModal>
                    <Text>{StatusRef.current.NameRoute}</Text>
                    <Text>{StatusRef.current.amountRegister}</Text>
                    <Text>{StatusRef.current.ItemOnInsert}</Text>
                    {
                        StatusRef.current.Error.map((item, key) => (
                            <Text key={key}>{item[0]}</Text>
                        ))
                    }

                    <Text>{show}</Text>
                    <LoadingIcon size='large' color='#0C0A0A' />

                </ViewModal>
            </Modal>
        </Container>
    )
}