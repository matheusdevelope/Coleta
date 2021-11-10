import React, { useEffect, useState } from "react";
import Inputs from "../../componentes/input/input.js";
import Global from "../../global/global.js";
import GText from "../../global/texts.js";
import { ContainerInputs, Input } from './style.js'

function InputAreaNewColeta() {
    const modelInput = {
        IdMobile: 1,
        Cod_Importacao: 1,
        CodEmpresa: 1,
        CodFilial: 1,
        CodVendedorIndex: 1,
        Item:1,
        NumeroColeta:1,
        Status: 'N',
        CodPrioridade: 1,
        DataLancamento: 'DataNow',
        HoraLancamento: 'HoraNow',
        UsuarioLancamento: '',
        EstacaoLancamentos: 'PlataformaMobile',
        DataEmissao: 'DataNow',
        DataColeta: 'dataColeta',
        CodVendedor: 1,
        CodColetador: 1,
        CodTecnico: 1,
        CodCliente: 1,
        NomeCliente: 'e',
        CPF_CNPJ: '',
        Celular: '',
        CodSituacao: '',
        Garantia: '',
        ImportaColeta: "RECEBIDO",
        CodProduto: 7093, //aqui vai ter que ir um padrao para alterar lá, ou importar a lista
        NomeProduto: 'Pneu + BITOLA',
        NumeroSerie: '',
        CodMarca: 1, //só vai ter se implementar a lista 
        Marca: '', //pretendo colocar lista de marcas cadastradas
        Modelo: '',
        Dimensao: '',
        Desenho: '',
        NumeroFogo: '',
        NumeroDot: '', //sequencial baseado no item
        CodSituacao: '', //aprovado sempre
        CodTipo: 1, //não sei o que é
        Placa: '',
        ServicosExecutar: '',
        ExameInicial: '',
        Observacao: '',
        Garantia: '',
        Valor: '',
        ImportaColeta: "RECEBIDO",
        CodCancelamento: null,
        ObservacaoCancelamento: null,
        DataCancelamento: null,
        HoraCancelamento: null,
        UsuarioCancelamento: null,
        EstacaoCancelamento: null
    }
    const [input, setInput] = useState(modelInput)

    function ChangeInput(e, id) {
        let copy = e
        input.NomeCliente = e
        console.log(copy.NomeCliente)
        setInput(input)
     }
    console.log(input.NomeCliente)
   
    return (
        <ContainerInputs>
            <Input placeholder={GText.PNameClient} value={input.NomeCliente} onChangeText={(e)=>{ChangeInput(e)}} 
            />
        </ContainerInputs>
    )
}
export default InputAreaNewColeta