import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import { useEffect } from 'react/cjs/react.development';
import Global from '../../global/global';
import GText from '../../global/texts';
import Button from '../button/button';

import { Container, Line, Text, ButtonBox } from './style';

const BoxColeta = ({ data, buttonLeft, buttonRight }) => {
    const navigate = useNavigation()
    const [toggle, setToggle] = useState(false)

    function handleToggle() {
        setToggle(!toggle)
    }
    function handleLeft(data) {
        buttonLeft(data)
        handleToggle()
    }
    function handleRight(data) {
        buttonRight(data)
        handleToggle()
    }
    function handleDetails() {
        navigate.navigate(GText.Details, data)
    }

    useEffect(()=>{
        return()=>{
            setToggle(false)
        }
    },[])

    return (
        <Container>
            <ButtonBox onLongPress={handleToggle}
                onPress={handleDetails}>
                <Line>
                    <Text style={{ fontWeight: 'bold' }}>{data[GText.infoInputs.nNameClient]}</Text>
                </Line>
                <Line>
                    <Text>
                        {/* {GText.infoInputs.pColetaNumber}:  */}
                        {data[GText.infoInputs.nColetaNumber]}</Text>
                    <Text>{GText.infoInputs.pItem}: {data[GText.ItensTotal]}</Text>
                    <Text>{GText.money} {data[GText.ValueTotal]}</Text>

                </Line>

            </ButtonBox>
            <Line>
                <Button name={Global.IconTrash} size={40} color={Global.colorButtonDelete}
                    onClick={() => { handleLeft(data) }}
                    style={{
                        flex: 1,
                        display: toggle ? 'flex' : 'none'
                    }} />
                <Button name={Global.IconEdit} size={40} color={Global.colorButtonDelete}
                    onClick={() => { handleRight(data) }}
                    style={{
                        flex: 1,
                        display: toggle ? 'flex' : 'none'
                    }} />
            </Line>
        </Container>
    )
}

export default BoxColeta;