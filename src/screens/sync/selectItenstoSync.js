
import React, { useState, useRef, useEffect } from "react";
import { useNavigation, useIsFocused } from "@react-navigation/core";
import { Container, TextStyled, ViewLine, ScrollView, Line, View } from './style.js'
import Header from "../../componentes/header/header.js";
import GText from "../../global/texts.js";
import Global from "../../global/global.js";
import CheckBox from "@react-native-community/checkbox";
import Button from "../../componentes/button/button.js";
import ConfirmationModal from "../../componentes/modalConfirmation/modalConfirmation.js";
import { GetLastLogOnDB } from "../../services/routesData/routesData.js";

const RoutesGet1 = [
    { name: GText.Routes.warranty, checked: false },
    { name: GText.Routes.brand, checked: false },
    { name: GText.Routes.situation, checked: false },
    { name: GText.Routes.client, checked: false },
    { name: GText.Routes.company, checked: false },
    { name: GText.Routes.itens, checked: false },
    { name: GText.Routes.branch, checked: false }
]

export default ({ route }) => {
    const ModalRef = useRef()
    const IsFocused = useIsFocused()
    const navigate = useNavigation()
    const CheckedAll = useRef(false)
    const ItensChecked = useRef(0)
    const [data, setData] = useState(RoutesGet1)

    async function GetLastSyncRoutes() {
        let Routes = RoutesGet1
        for (let i = 0; i < RoutesGet1.length; i++) {
            const ret = await GetLastLogOnDB(GText.infoDB.Table.Log.fields.route, Routes[i].name)
            if(ret === null | ret === undefined){
                Routes[i]['LastSync'] = ''                
            }
            else{
                Routes[i]['LastSync'] = ret[0][GText.infoDB.Table.Log.fields.date]
            }
        }
        setData([...Routes])
    }

   

    function handleSync() {
        let SelectedData = []
        data.map((obj) => {
            obj.checked &&
                SelectedData.push(obj.name)
        })
        //  handleOnChangeCheckBox(false,null,true)
        navigate.navigate(GText.Syncing, { routes: SelectedData, origin: GText.SelectToSync })
    }

    function toggleChecedkAll(closelist) {
        CheckedAll.current = !CheckedAll.current
        handleOnChangeCheckBox(closelist ? false : CheckedAll.current, null, true)
        closelist && navigate.goBack()
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
            ModalRef.current.setLabel(GText.labelModalSyncItens)
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
         return ()=>{
           
             handleOnChangeCheckBox(false,null,true)
         }
    }, [IsFocused])


    return (
        <Container>
            <Header title={GText.SelectToSync} name={Global.iconBack} name2={Global.IconList}
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
                                <TextStyled style={{ fontSize: 12 }} >  {GText.messageLastSync + `  ${item.LastSync}`} </TextStyled>
                            </View>

                        </ViewLine>
                    )
                })}
            </ScrollView>
            <Line style={{ display: ItensChecked.current > 0 ? 'flex' : 'none' }}>
                <Button name={Global.IconSync} size={40} color={Global.colorButtonDelete}
                    onClick={() => { OpenConfirmation('left') }}
                    style={{ flex: 1 }} />
            </Line>
            <ConfirmationModal ref={ModalRef} button={handleSync} label={GText.labelModalSyncItens} />
        </Container>
    )
}

