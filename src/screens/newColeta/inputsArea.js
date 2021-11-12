import React, { useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Form } from '@unform/mobile';
import Input from '../../componentes/inputForm/input';
import { Line } from './style';
import GText from '../../global/texts';
import Global from '../../global/global';
import InputSelect from '../../componentes/inputSelected/inputSelect.js';
import Button from '../../componentes/button/button';

export default function SignIn() {
    const [input, setInput] = useState('')

    const formRef = useRef(null);
    function handleSubmit(data) {
        console.log(data);
        // { email: 'test@example.com', password: '123456' }
    }

    function ButtonsSelect() {

    }
    const items = [
        { label: "JavaScript", value: "JavaScript" },
        { label: "TypeStript", value: "TypeStript" },
        { label: "Python", value: "Python" },
        { label: "Java", value: "Java" },
        { label: "C++", value: "C++" },
        { label: "C", value: "C" },
    ]
    return (
        <Form ref={formRef} onSubmit={handleSubmit}>
            <Line>
                <InputSelect options={items} name={GText.nNameClient} placeholder={GText.pNameClient}/>
            </Line>

            <Line>
                <Input name={GText.nServicesExec} placeholder={GText.pServicesExec} style={styles.inputDivided} />
            </Line>
            <Line>
                <Input name={GText.nDimension} placeholder={GText.pDimension} style={styles.inputDivided} />
                <Input name={GText.nSerieNumber} placeholder={GText.pSerieNumber} keyboardType="numeric" style={styles.inputDivided} />
                <Input name={GText.nDesign} placeholder={GText.pDesign} style={styles.inputDivided} />

            </Line>
            <Line>
                <InputSelect options={items} name={GText.nBrand} placeholder={GText.pBrand} />
                <Input name={GText.nBoard} placeholder={GText.pBoard} style={styles.inputDivided} />
                <Input name={GText.nValue} placeholder={GText.pValue} style={styles.inputDivided} keyboardType="numeric" />
            </Line>
            <Input name={GText.nObservation} placeholder={GText.pObservation} style={styles.input} />

            <Line>
                <InputSelect name={GText.nWarranty} options={items} placeholder={GText.pWarranty} />
                <InputSelect name={GText.nCodBranch} options={items} placeholder={GText.pCodBranch} />
                <InputSelect name={GText.nCodSituation} options={items} placeholder={GText.pCodSituation} editable={false}/>
            </Line>
            <Button name={Global.IconAdd} size={Global.sizeiconAdd} color={Global.blue} onClick={() => formRef.current.submitForm()} />
        </Form>
    );
}

export const styles = StyleSheet.create({
    inputDivided: {
        fontSize: 18,
        flex: 1,
        borderRadius: 4,
        padding: Global.paddingHeightInputs_N,
        marginTop: Global.marginInputs_n,
        marginRight: Global.marginInputs_n - 4,
        marginLeft: Global.marginInputs_n - 4,
        backgroundColor: Global.backgroundInputs
    },
    input: {
        color: Global.textColor,
        fontSize: 18,
        borderRadius: 4,
        padding: Global.paddingHeightInputs_N,
        marginTop: Global.marginInputs_n,
        marginRight: Global.marginInputs_n - 4,
        marginLeft: Global.marginInputs_n - 4,
        backgroundColor: Global.backgroundInputs
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