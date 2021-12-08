import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import { useEffect } from 'react/cjs/react.development';
import Global from '../../global/global';
import GText from '../../global/texts';
import Button from '../button/button';

import { Container, Line, Text, ButtonBox } from './style';

const BoxColeta = ({ data, buttonLeft, buttonRight, isFocused, RouteName}) => {
    const navigate = useNavigation()
    const [toggle, setToggle] = useState(false)

    function handleToggle() {
        setToggle(!toggle)
    }
    function handleLeft(data) {
        buttonLeft(data)
    }
    function handleRight(data) {
        buttonRight(data)
    }
    function handleDetails() {
        navigate.navigate(GText.Details, { data: data,  routeOrigin:RouteName })
    }
    function Icon() {
        if(RouteName == GText.MyColetas){
         return Global.IconTrash
        }else if(RouteName == GText.SendedColetas){
         return Global.IconCancel
        }
        else{
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
            <ButtonBox onLongPress={handleToggle} onPress={handleDetails} 
            style={{backgroundColor:data[GText.ItensCanceledTotal] == data[GText.ItensTotal] ? Global.redCanceled : Global.white}}>
                <Line>
                    <Text style={{ fontWeight: 'bold' }}>{data[GText.infoInputs.nNameClient]}</Text>
                </Line>
                <Line>
                    <Text>{data[GText.infoInputs.nColetaNumber]}</Text>
                    <Text>{GText.infoInputs.pItem}: {data[GText.ItensTotal]}</Text>
                    {
                        RouteName == GText.SendedColetas  &&
                        data[GText.ItensCanceledTotal] > 0 &&
                        <Text>{GText.infoInputs.CancelStatusItem}: {data[GText.ItensCanceledTotal]}</Text>
                    }
                    <Text>{GText.money} {data[GText.ValueTotal]}</Text>
                </Line>
            </ButtonBox>
            <Line>
                <Button name={Icon()} size={40} color={Global.colorButtonDelete}
                    onClick={() => { handleLeft(data) }}
                    style={{flex: 1, display: toggle ? 'flex' : 'none'}} />
                <Button name={Global.IconEdit} size={40} color={Global.colorButtonDelete}
                    onClick={() => { handleRight(data) }}
                    style={{flex: 1, display: toggle ? 'flex' : 'none'}} />
            </Line>
        </Container>
    )
}

export default BoxColeta;