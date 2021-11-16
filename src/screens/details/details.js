import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { Coletas } from '../../../DadosOffline/Coletas Lista';
import Header from '../../componentes/header/header';
import ItensList from '../../componentes/itensList/itensList';
import Global from '../../global/global';
import GText from '../../global/texts';
import { Container, Line, SubHeader, Text } from './style';

const Details = ({route}) => {
    const data = route.params ///params received by Home/Sended Screen
    const navigate = useNavigation()

    function handleEdit(params) {
        navigate.navigate(GText.NewColeta, data)
    }
    
    return ( 
        <Container>
            <Header title={GText.Details} name={Global.iconBack} name2={Global.IconEdit}
                size={Global.sizeIconHeader} color={Global.colorIconHeader}style={{marginLeft:8}}
                onClickLeft={() => { navigate.goBack() }} onClickRight={handleEdit} />
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
            <ItensList itens={Coletas} />
        </Container>
    )
}

export default Details;