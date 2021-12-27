
import React, { useState, useRef, useEffect } from "react";
import { useNavigation, useIsFocused } from "@react-navigation/core";
import { Container, Text, ViewIcon, View } from './style.js'
import Header from "../../componentes/header/header.js";
import GText from "../../global/texts.js";
import Global from "../../global/global.js";
import CheckBox from "@react-native-community/checkbox";
import Button from "../../componentes/button/button.js";
import ConfirmationModal from "../../componentes/modalConfirmation/modalConfirmation.js";

import Icon from 'react-native-vector-icons/FontAwesome';


export default function Config({ route }) {
    const ModalRef = useRef()
    const IsFocused = useIsFocused()
    const navigate = useNavigation()
    const CheckedAll = useRef(false)
    const ItensChecked = useRef(0)
    const Menus = [{
        name: GText.nameMenuChangeServer,
        icon: Global.IconConfig,
        label: false,
        screen:GText.FormServer
    },
    {
        name: GText.nameMenuClearData,
        icon: Global.IconTrash,
        label: false,
        screen:GText.SelectToSync
    },
    {
        name: GText.nameMenuLogoff,
        icon: Global.IconSignOut,
        label: GText.labelModalLogoff,
        screen:GText.Login
    }
    ]

    function onBack() {
        navigate.goBack()
    }
    async function ButtonModal(origin) {
        if (origin === 'left') {
            await routeName(handleDelete, handleCancelColeta)
        }
        else if (origin == 'right') {
            await routeName(handleSendColeta, handleSyncColeta)
        }
        ModalRef.current.toggle()
    }
    function GoToScreen(obj) {
        navigate.navigate(obj.screen, {origin:GText.Config})
    }
    function handleConfirmationModal(obj) {
        if (obj.label) {
            ModalRef.current.sendvalue(obj)
            ModalRef.current.setLabel(obj.label)
            ModalRef.current.toggle()
        }
        else{
            GoToScreen(obj)
        }
    }

    return (
        <Container>
            <Header title={GText.Config} name={Global.iconBack}
                size={Global.sizeIconHeader} color={Global.colorIconHeader} onClickLeft={onBack} />
            {
                Menus.map((obj, key) => (
                    <View key={key} onPress={() => { handleConfirmationModal(obj) }} activeOpacity={0.5}>
                        <Text>{obj.name}</Text>
                        <ViewIcon>
                            <Icon name={obj.icon} size={40} color={Global.blue} />
                        </ViewIcon>

                    </View>
                ))
            }



            <ConfirmationModal ref={ModalRef} button={() => { }} label={GText.labelModalSyncItens} />
        </Container>
    )
}

