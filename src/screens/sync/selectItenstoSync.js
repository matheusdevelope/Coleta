
import React, { useState, useRef, useEffect } from "react";
import { useNavigation, useIsFocused } from "@react-navigation/core";
import { DrawerActions } from '@react-navigation/native';
import { Container, TextStyled, ViewLine, ScrollView, Line, View } from './style.js'
import Header from "../../componentes/header/header.js";
import GText, { routes } from "../../global/texts.js";
import Global from "../../global/global.js";
import CheckBox from "@react-native-community/checkbox";
import Button from "../../componentes/button/button.js";
import ConfirmationModal from "../../componentes/modalConfirmation/modalConfirmation.js";
import { CreateOnDB, DeleteOnDB, GetLastLogOnDB } from "../../services/routesData/routesData.js";
import { GetDataFormatPT } from "../../componentes/functions/Itens.js";

function CreateArray() {
    let ret = []
    for (let prop in routes) {
        if (GText.infoDB.Table[prop].userAccess) {
            ret.push({
                name: routes[prop],
                checked: false
            })
        }
    }
    return ret
}
const ListToSync = CreateArray()


export default ({ route }) => {
    const Origin = route.params !== undefined ? route.params.origin : ''
    const ModalRef = useRef()
    const IsFocused = useIsFocused()
    const navigate = useNavigation()
    const CheckedAll = useRef(false)
    const ItensChecked = useRef(0)
    const [data, setData] = useState(ListToSync)

    async function GetLastSyncRoutes() {
        let Routes = ListToSync
        for (let i = 0; i < ListToSync.length; i++) {
            const ret = await GetLastLogOnDB(GText.infoDB.Table.Log.fields.route, Routes[i].name, GText.infoDB.Table.Log.fields.action, GText.Log.actions.sync)
            const ret1 = await GetLastLogOnDB(GText.infoDB.Table.Log.fields.route, Routes[i].name, GText.infoDB.Table.Log.fields.action, GText.Log.actions.delete)

            if (ret === null | ret === undefined) {
                Routes[i]['LastSync'] = ''
                Routes[i]['ID'] = 0
            }
            else {
                Routes[i]['LastSync'] = ret[0][GText.infoDB.Table.Log.fields.date]
                Routes[i]['ID'] = ret[0][GText.infoDB.Table.Log.fields.id]
            }

            if (ret1 === null | ret1 === undefined) {
                Routes[i]['Deleted'] = ''
            }
            else {
                if (ret1[0][GText.infoDB.Table.Log.fields.id] > Routes[i]["ID"]) {
                    Routes[i]['Deleted'] = ret1[0][GText.infoDB.Table.Log.fields.date]
                } else {
                    Routes[i]['Deleted'] = ''
                }
            }
        }
        setData([...Routes])
    }
    async function handleDeleteDataOnDB(SelectedData) {
        for (let i = 0; i < SelectedData.length; i++) {
            console.log(SelectedData[i])
            await DeleteOnDB(SelectedData[i])
            await CreateOnDB(GText.Routes.log, {
                Acao: GText.Log.actions.delete,
                Tipo: GText.Log.types.delete, Rota: SelectedData[i], Data: `${GetDataFormatPT()}`
            })
        }
        GetLastSyncRoutes()
        alert('Finish')
    }
    function handleButtonModal() {
        let SelectedData = []
        data.map((obj) => {
            obj.checked &&
                SelectedData.push(obj.name)
        })
        ModalRef.current.toggle()
        Origin === GText.Config ?
            handleDeleteDataOnDB(SelectedData)
            :
            navigate.navigate(GText.Syncing, { routes: SelectedData, origin: GText.SelectToSync })
    }
    function toggleChecedkAll(closelist) {
        CheckedAll.current = !CheckedAll.current
        handleOnChangeCheckBox(closelist ? false : CheckedAll.current, null, true)
        Origin === GText.Config ?
            closelist && navigate.reset({ routes: [{ name: Origin, params: undefined }] })
            :
            closelist && navigate.dispatch(DrawerActions.openDrawer())
    }
    function handleOnChangeCheckBox(checked, param, all) {
        let copyData = data
        const newData = copyData.map((obj, index) => {
            if (all) {
                copyData[index].checked = checked
            }
            else {
                if (obj.name === param) {
                    copyData[index].checked = checked
                }
            }
            return obj
        })

        ItensChecked.current = all ? checked ? copyData.length : 0 : checked ? ItensChecked.current + 1 : ItensChecked.current - 1;
        setData(newData)
    }
    function OpenConfirmation(data) {
        if (ItensChecked.current > 0) {
            ModalRef.current.setLabel(Origin === GText.Config ? GText.labelModalDeleteOnDB : GText.labelModalSyncItens)
            ModalRef.current.toggle()
            ModalRef.current.sendvalue(data)
        }
        else {
            alert(GText.messageNoItensSelected)
        }
    }
    useEffect(() => {
        IsFocused &&
            GetLastSyncRoutes()
        return () => {
            handleOnChangeCheckBox(false, null, true)
        }
    }, [IsFocused])


    return (
        <Container>
            <Header title={Origin === GText.Config ? GText.SelectToDelete : GText.SelectToSync} name={Global.iconBack} name2={Global.IconList}
                size={Global.sizeIconHeader} color={Global.colorIconHeader} onClickLeft={() => { toggleChecedkAll(true) }}
                onClickRight={() => { toggleChecedkAll() }} />
            <ScrollView>
                {data.map((item, key) => {
                    return (
                        <ViewLine key={key} onPress={() => { handleOnChangeCheckBox(!item.checked, item.name) }}
                            style={{ backgroundColor: item.checked === true ? Global.bluelight2 : Global.white }}>
                            <CheckBox value={item.checked === true ? true : false}
                                onValueChange={(newValue) => handleOnChangeCheckBox(newValue, item.name)} />
                            <View>
                                <TextStyled>{item.name}</TextStyled>
                                {
                                    item.Deleted !== '' ?
                                        <TextStyled style={{ fontSize: 12 }} >  {GText.messageDeleted + `:  ${item.Deleted}`} </TextStyled>
                                        :
                                        <TextStyled style={{ fontSize: 12 }} >  {GText.messageLastSync + `:  ${item.LastSync}`} </TextStyled>
                                }

                            </View>

                        </ViewLine>
                    )
                })}
            </ScrollView>
            <Line style={{ display: ItensChecked.current > 0 ? 'flex' : 'none' }}>
                <Button name={Origin === GText.Config ? Global.IconTrash : Global.IconSync} size={40} color={Global.colorButtonDelete}
                    onClick={() => { OpenConfirmation('left') }}
                    style={{ flex: 1 }} />
            </Line>
            <ConfirmationModal ref={ModalRef} button={handleButtonModal} label={GText.labelModalSyncItens} />
        </Container>
    )
}

