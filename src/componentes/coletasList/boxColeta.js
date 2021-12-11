import { useNavigation } from '@react-navigation/core';
import React, { forwardRef, useImperativeHandle, useState, useEffect } from 'react';
import CheckBox from '@react-native-community/checkbox';
import Global from '../../global/global';
import GText from '../../global/texts';
import Button from '../button/button';

import { Container, Line, Text, ButtonBox, LineBox } from './style';

const BoxColeta = ({ data,index, buttonLeft, buttonRight, isFocused, RouteName, showCheckBox, setShowCheckBox
     ,  checkedState, handleOnChange}, ref) => {
    const navigate = useNavigation()
    const [toggle, setToggle] = useState(false)

    const [valueCheckBox, setValueCheckBox] = useState(false)
console.log(checkedState)
    useImperativeHandle(ref, () => ({
        toggle: () => {
            setValueCheckBox(!valueCheckBox)
        },
        selectAll: () => {
            setValueCheckBox(true)
        },
        unselectAll: () => {
            setValueCheckBox(false)
        },
        value:()=>{
            return valueCheckBox
        }
    }));
    function handleSelectCheckBox() {
        handleOnChange()
        //setValueCheckBox(!valueCheckBox)
    }

    function handleToggle() {
        setShowCheckBox(!showCheckBox)
        // !showCheckBox &&
        //     setToggle(!toggle)
    }
    function handleLeft(data) {
        buttonLeft(data)
    }
    function handleRight(data) {
        buttonRight(data)
    }
    function handleDetails() {
        showCheckBox ?
            handleSelectCheckBox() :
            navigate.navigate(GText.Details, { data: data, routeOrigin: RouteName })
    }
    function Icon() {
        if (RouteName == GText.MyColetas) {
            return Global.IconTrash
        } else if (RouteName == GText.SendedColetas) {
            return Global.IconCancel
        }
        else {
            return Global.IconDefault
        }
    }
    useEffect(() => {
        return () => {
            setToggle(false)
        }
    }, [isFocused])

    return (
        <Container>
            <LineBox>
                <ButtonBox onLongPress={handleToggle} onPress={handleDetails}
                    style={{ backgroundColor: data[GText.ItensCanceledTotal] == data[GText.ItensTotal] ? Global.redCanceled : Global.white }}>
                    <Line>
                        <Text style={{ fontWeight: 'bold' }}>{data[GText.infoInputs.nNameClient]}</Text>
                    </Line>
                    <Line>
                        <Text>{data[GText.infoInputs.nColetaNumber]}</Text>
                        <Text>{GText.infoInputs.pItem}: {data[GText.ItensTotal]}</Text>
                        {
                            RouteName == GText.SendedColetas &&
                            data[GText.ItensCanceledTotal] > 0 &&
                            <Text>{GText.infoInputs.CancelStatusItem}: {data[GText.ItensCanceledTotal]}</Text>
                        }
                        <Text>{GText.money} {data[GText.ValueTotal]}</Text>
                    </Line>
                </ButtonBox>
                <Line style={{ display: // toggle ? 'flex' : 
                'none' }}>
                    <Button name={Icon()} size={40} color={Global.colorButtonDelete}
                        onClick={() => { handleLeft(data) }}
                        style={{ flex: 1 }} />
                    <Button name={Global.IconEdit} size={40} color={Global.colorButtonDelete}
                        onClick={() => { handleRight(data) }}
                        style={{ flex: 1 }} />
                </Line>
            </LineBox>
            {showCheckBox &&
                <CheckBox
                    value={checkedState[index]}
                    onValueChange={(newValue) => handleOnChange(index)}
                />}
        </Container>
    )
}

export default forwardRef(BoxColeta);