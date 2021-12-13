
import React, { useEffect, useState} from "react";
import { useNavigation } from '@react-navigation/native'
import Fundo from '../../assets/fundo.svg'
import { GetProfileDB } from "../../services/routesData/routesData";
import { Container, Modal, ViewModal, LoadingIcon } from './style.js'

export default ({ route }) => {
    const navigation = useNavigation()
    const [show, setShow] = useState(false)


    function handleInitialSyncData() {
        console.log('handleInitialSyncData')
        setShow(true)
    }

    useEffect(() => {
        console.log('useEffect preload')
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
                    <LoadingIcon size='large' color='#0C0A0A' />
                </ViewModal>
            </Modal>
        </Container>
    )
}