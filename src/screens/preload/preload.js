
import React, { useEffect, useRef, useState } from "react";
import { useNavigation } from '@react-navigation/native'
import Fundo from '../../assets/fundo.svg'
import { CreateOnDB, DeleteOnDB, GetProfileDB } from "../../services/routesData/routesData";
import { Container, Modal, ViewModal, LoadingIcon, Text } from './style.js'
import { GetAPI } from "../../services/Api/routesApi";
import GText from "../../global/texts";

export default ({ route }) => {
    const ModelObject = {
        NameRoute: '',
        amountRegister: '',
        ItemOnInsert: '',
        Error: '',
    }
    const navigation = useNavigation()
    const StatusRef = useRef(ModelObject)
    
    const [show, setShow] = useState(false)
console.log(StatusRef.current)
    async function InsertOnDb(TableName, data) {
        await DeleteOnDB(TableName)
        let ret = false
        for (let i = 0; data.length > i; i++) {
            try {
                ret = await CreateOnDB(TableName, data[i])
                // let copy = show
                // copy.ItemOnInsert = i
                StatusRef.current.ItemOnInsert = i
               // setShow(copy)
              //  console.log(i)
              setShow(!show)
            }
            catch (e) {
                let copy = show
                copy.Error = e
                //setShow(copy)
                StatusRef.current.Error = e
                //  console.log('error CreateOnDB PRELOAD',e)
                alert(`error CreateOnDB PRELOAD', ${e}`)
                return false
            }
           
        }
        return ret

    }

    async function handleInitialSyncData() {
        const RoutesGet = [
            //GText.Routes.warranty,
            //  GText.Routes.situation,
            //    GText.Routes.branch,
            GText.Routes.brand,
            //    GText.Routes.company,
            //GText.Routes.itens
        ]
        for (let i = 0; RoutesGet.length > i; i++) {

            const ret = await GetAPI(RoutesGet[i])
            if (ret) {
                const ret1 = await InsertOnDb(RoutesGet[i], ret)
                if (!ret1) {
                    console.log('erro return InsertOnDb', ret1)
                    return ret1
                }
                console.log(ret1)
            }
            else {
                console.log('erro return GetAPI', ret)
            }
        }
    }

    useEffect(() => {
        async function navigate() {
            const profile = await GetProfileDB()
            if (!profile) {
                navigation.reset({ routes: [{ name: 'Login' }] })
            }
            else {
                navigation.reset({ routes: [{ name: 'HomeDrawer' }] })
            }
        }
        route.params.origin !== 'preload' ?
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
                    <Text>{StatusRef.current.Error}</Text>
                    <LoadingIcon size='large' color='#0C0A0A' />
                    
                </ViewModal>
            </Modal>
        </Container>
    )
}