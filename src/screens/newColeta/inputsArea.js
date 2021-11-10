import React, { useRef } from 'react';
import { Button, StyleSheet } from 'react-native';
import { Form } from '@unform/mobile';
import Input from '../../componentes/inputForm/input';
import { Line } from './style';
import GText from '../../global/texts';
import Global from '../../global/global';

export default function SignIn() {
    const formRef = useRef(null);
    function handleSubmit(data) {
        console.log(data);
        // { email: 'test@example.com', password: '123456' }
    }
    return (
        <Form ref={formRef} onSubmit={handleSubmit}>
            <Input name={GText.nNameClient} placeholder={GText.pNameClient} style={styles.input} />
            <Line>
                <Input name={GText.nServicesExec} placeholder={GText.pServicesExec} style={styles.inputDivided} />

            </Line>
            <Line>
                <Input name={GText.nDimension} placeholder={GText.pDimension} style={styles.inputDivided} />
                <Input name={GText.nSerieNumber} placeholder={GText.pSerieNumber} style={styles.inputDivided} />
                <Input name={GText.nDesign} placeholder={GText.pDesign} style={styles.inputDivided} />

            </Line>
            <Line>
                <Input name={GText.nBrand} placeholder={GText.pBrand} style={styles.inputDivided} />
                <Input name={GText.nBoard} placeholder={GText.pBoard} style={styles.inputDivided} />
                <Input name={GText.nValue} placeholder={GText.pValue} style={styles.inputDivided} />
            </Line>
            <Input name={GText.nObservation} placeholder={GText.pObservation} style={styles.input} />

            <Button title="Sign in" onPress={() => formRef.current.submitForm()} />
        </Form>
    );
}
// placeholder = 'Cliente:'
// placeholder = 'CPF/CNPJ'
// placeholder = 'Celular:'
// placeholder = 'Serviço:'
// placeholder = 'Bitola:'
// placeholder = 'Serie:'
// placeholder = 'Desenho:'
// placeholder = 'Marca:'
// placeholder = 'Placa:'
// placeholder = '00,00'
// placeholder = 'Observação:'


export const styles = StyleSheet.create({
    inputDivided: {
        fontSize: 18,
        flex: 1,
        borderRadius: 10,
        margin: 10,
        backgroundColor: Global.bluelight3
    },
    input: {
        color: Global.textColor,
        fontSize: 18,
        borderRadius: 10,
        margin: 10,
        backgroundColor: Global.bluelight3
    }
});
























// import React, { useEffect, useState } from "react";
// import GText from "../../global/texts.js";
// import { Form } from '@unform/web'
// import { ContainerInputs, Input } from './style.js'



// function InputAreaNewColeta() {
//     let modelInput = {
//         IdMobile: 1,
//         Cod_Importacao: 1,
//         CodEmpresa: 1,
//         CodFilial: 1,
//         CodVendedorIndex: 1,
//         Item: 1,
//         NumeroColeta: 1,
//         Status: 'N',
//         CodPrioridade: 1,
//         DataLancamento: 'DataNow',
//         HoraLancamento: 'HoraNow',
//         UsuarioLancamento: '',
//         EstacaoLancamentos: 'PlataformaMobile',
//         DataEmissao: 'DataNow',
//         DataColeta: 'dataColeta',
//         CodVendedor: 1,
//         CodColetador: 1,
//         CodTecnico: 1,
//         CodCliente: 1,
//         NomeCliente: 'teste',
//         CPF_CNPJ: '',
//         Celular: '',
//         CodSituacao: '',
//         Garantia: '',
//         ImportaColeta: "RECEBIDO",
//         CodProduto: 7093, //aqui vai ter que ir um padrao para alterar lá, ou importar a lista
//         NomeProduto: 'Pneu + BITOLA',
//         NumeroSerie: '',
//         CodMarca: 1, //só vai ter se implementar a lista 
//         Marca: '', //pretendo colocar lista de marcas cadastradas
//         Modelo: '',
//         Dimensao: '',
//         Desenho: '',
//         NumeroFogo: '',
//         NumeroDot: '', //sequencial baseado no item
//         CodSituacao: '', //aprovado sempre
//         CodTipo: 1, //não sei o que é
//         Placa: '',
//         ServicosExecutar: '',
//         ExameInicial: '',
//         Observacao: '',
//         Garantia: '',
//         Valor: '',
//         ImportaColeta: "RECEBIDO",
//         CodCancelamento: null,
//         ObservacaoCancelamento: null,
//         DataCancelamento: null,
//         HoraCancelamento: null,
//         UsuarioCancelamento: null,
//         EstacaoCancelamento: null
//     }
//     const [input, setInput] = useState(modelInput)

//     return (
//         <ContainerInputs>
//             <Input placeholder={GText.PNameClient} value={input.NomeCliente}
//                 onChangeText={(e) => { ChangeInput(e) }}
//             />
//         </ContainerInputs>
//     )
// }
// export default InputAreaNewColeta