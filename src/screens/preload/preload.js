
import React, { useEffect } from "react";
import { useNavigation } from '@react-navigation/native'
import Fundo from '../../assets/fundo.svg'
import { GetLogDB, GetProfileDB } from "../../services/routesData/routesData";
import { Container, Modal, ViewModal, LoadingIcon } from './style.js'
import GText, { NameTables } from "../../global/texts";


export default ({ route }) => {
    const navigation = useNavigation()
    let RoutesGet = NameTables()

    async function navigate() {
        const retLog = await GetLogDB(GText.infoDB.Table.Log.fields.action, 'firstAcess')
        //   console.log('retLog', retLog)

        //  if (route.params.origin === GText.Preload) {
        const profile = await GetProfileDB()
        if (!profile) {
            navigation.reset({ routes: [{ name: 'Login' }] })
        }
        else {
            if (retLog) {
                navigation.reset({ routes: [{ name: 'HomeDrawer' }] })
            }
            else {
                navigation.navigate(GText.Syncing, { routes: RoutesGet, origin: GText.Preload })

            }
            //   }
        }
    }
    useEffect(() => {
        navigate()
    }, [route.params])
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

