
import React, { useEffect} from "react";
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import Fundo from '../../assets/fundo.svg'
import {  GetLogDB,  GetProfileDB } from "../../services/routesData/routesData";
import { Container, Modal, ViewModal, LoadingIcon } from './style.js'
import Sync from "../sync/sync";
import GText from "../../global/texts";


export default ({ route }) => {
    const navigation = useNavigation()

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
        const RoutesGet = [
            GText.Routes.warranty,
            GText.Routes.brand,
            GText.Routes.situation,
            GText.Routes.branch,
            GText.Routes.client,
            GText.Routes.company,
            GText.Routes.itens,
            GText.Routes.branch,
        ]
        route.params.origin === 'preload' ?
            navigate() :
            navigation.navigate(GText.Syncing, {routes:RoutesGet} )
    }, [])

    return (
        <Container>
                    <Fundo width='100%' height='100%' />
                    <Modal transparent={true} visible={true}>
                        <ViewModal>
                            <LoadingIcon size='large' color='#0C0A0A' />
                        </ViewModal>
                    </Modal>
        </Container>
    )
}

