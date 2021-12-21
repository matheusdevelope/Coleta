import { useIsFocused, useNavigation } from '@react-navigation/core';
import { useFocusEffect } from "@react-navigation/native";
import React, { useState } from 'react';
import { BackHandler } from 'react-native';
import Header from '../../componentes/header/header';
import ItensList from '../../componentes/itensList/itensList';
import Global from '../../global/global';
import GText from '../../global/texts';
import { GetItensGrouped } from '../../services/routesData/routesData';
import { Container, Line, SubHeader, Text } from './style';

const Details = ({ route }) => {
    const [data, setData] = useState(route.params.data ? route.params.data : route.params)
    const isFocused = useIsFocused()
    const navigate = useNavigation()

    function handleEdit() {
        navigate.navigate(GText.NewColeta, { data: data,  routeOrigin:route.params.routeOrigin, titleScreen:GText.EditColeta})
    }
    function handleBack() {
        route.params.FromEditColeta ?
            navigate.navigate(route.params.routeOrigin)
            :
            navigate.goBack()
    }
    async function handleRefresh() {
        const ret = await GetItensGrouped(GText.infoDB.Table.Itens.fields.ColetaNumber, data[GText.infoDB.Table.Itens.fields.ColetaNumber])
        if (ret[0] === undefined) {
            handleBack()
        } else {
            setData(ret[0])
        }
    }
    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                //Sem Retorno
                handleBack()
                return true;
            };
            BackHandler.addEventListener('hardwareBackPress', onBackPress);
            return () =>
                BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }, [])
    );
    return (
        <Container>
            <Header title={GText.Details} name={Global.iconBack} name2={Global.IconEdit}
                size={Global.sizeIconHeader} color={Global.colorIconHeader} style={{ marginLeft: 8 }}
                onClickLeft={handleBack} onClickRight={handleEdit} />
            <SubHeader>
                <Line>
                    <Text style={{ width: '75%' }}>{data.NomeCliente}</Text>
                    <Text  >{data.NumeroColeta}</Text>
                </Line>

                <Line>
                    <Text>Itens: {data.TotalItens}</Text>
                    <Text>{GText.money} {data.ValorTotal}</Text>
                </Line>
            </SubHeader>
            <ItensList itens={data} isFocused={isFocused} details refresh={handleRefresh} RouteName={route.params.routeOrigin} />
        </Container>
    )
}

export default Details;