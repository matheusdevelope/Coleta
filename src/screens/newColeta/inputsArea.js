import React, { useRef } from 'react';
import { StyleSheet, Dimensions} from 'react-native';
import { Form } from '@unform/mobile';
import Input from '../../componentes/inputForm/input';
import { Line } from './style';
import GText from '../../global/texts';
import Global from '../../global/global';
import InputSelect from '../../componentes/inputSelected/inputSelect.js';
import Button from '../../componentes/button/button';
const {width, height } = Dimensions.get('window')

export default function SignIn(itens) {

    const formRef = useRef(null);
    function handleSubmit(data) {
        console.log(data);
        // { email: 'test@example.com', password: '123456' }
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
        
            <Form ref={formRef} onSubmit={handleSubmit} >
                <Line>
                    <InputSelect options={items} name={GText.nNameClient} placeholder={GText.pNameClient} editable />
                </Line>

                <Line>
                    <Input name={GText.nServicesExec} placeholder={GText.pServicesExec} style={styles.inputDivided} />
                </Line>
                <Line>
                    <Input name={GText.nDimension} placeholder={GText.pDimension} keyboardType="numeric" style={styles.inputDivided} />
                    <Input name={GText.nSerieNumber} placeholder={GText.pSerieNumber} keyboardType="numeric" style={styles.inputDivided} />
                    <Input name={GText.nDesign} placeholder={GText.pDesign} style={styles.inputDivided} />

                </Line>
                <Line>
                    <InputSelect options={items} name={GText.nBrand} placeholder={GText.pBrand} editable />
                    <Input name={GText.nBoard} placeholder={GText.pBoard} style={styles.inputDivided} />
                    <Input name={GText.nValue} placeholder={GText.pValue} style={styles.inputDivided} keyboardType="numeric" />
                </Line>
                <Input name={GText.nObservation} placeholder={GText.pObservation} style={styles.input} />

                <Line>
                    <InputSelect name={GText.nWarranty} options={items} placeholder={GText.pWarranty} />
                    <InputSelect name={GText.nCodBranch} options={items} placeholder={GText.pCodBranch} />
                    <InputSelect name={GText.nCodSituation} options={items} placeholder={GText.pCodSituation} />
                    
                </Line>
                
                {/* <SelectDropdown name={'testedrop'} 
                data={[{ title: "Egypt", cities: [{ title: "Cairo" }, { title: "Alex" }] },
                {
                  title: "Canada",
                  cities: [{ title: "Toronto" }, { title: "Quebec City" }],
                }]}
                onSelect={(selectedItem, index) => {
                  console.log(selectedItem, index);
                 // citiesDropdownRef.current.reset();
                // setCities([]);
                 // setCities(selectedItem.cities);
                }}
                defaultButtonText={"Select country"}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem.title;
                }}
                rowTextForSelection={(item, index) => {
                  return item.title;
                }}
                buttonStyle={styles.dropdown1BtnStyle}
                buttonTextStyle={styles.dropdown1BtnTxtStyle}
                renderDropdownIcon={() => {
                  return (
                   <Text>T</Text>
                  );
                }}
                dropdownIconPosition={"right"}
                dropdownStyle={styles.dropdown1DropdownStyle}
                rowStyle={styles.dropdown1RowStyle}
                rowTextStyle={styles.dropdown1RowTxtStyle}
                
                /> */}
                <Button name={Global.IconAdd} size={Global.sizeiconAdd} color={Global.bluelight} 
             onClick={() => formRef.current.submitForm()}
           // onClick={() => console.log('add')}
                    style={{
                        position: 'absolute', top: height - 130, right: 50,
                        borderRadius: 45, height: 60, width: 60, backgroundColor: Global.blue
                    }} />
                
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
        backgroundColor: Global.backgroundInputs,
        maxHeight: 36
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


    ,
    shadow: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 10,
      },
      header: {
        flexDirection: "row",
        width,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F6F6F6",
      },
      headerTitle: { color: "#000", fontWeight: "bold", fontSize: 16 },
      saveAreaViewContainer: { flex: 1, backgroundColor: "#000" },
      viewContainer: { flex: 1, width, backgroundColor: "#FFF" },
      scrollViewContainer: {
        flexGrow: 1,
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: "10%",
      },
      dropdownsRow: {
        flexDirection: "row",
        width: "100%",
        paddingHorizontal: "5%",
      },
    
      dropdown1BtnStyle: {
        flex: 1,
        height: 50,
        backgroundColor: "#FFF",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#444",
      },
      dropdown1BtnTxtStyle: { color: "#444", textAlign: "left" },
      dropdown1DropdownStyle: { backgroundColor: "#EFEFEF" },
      dropdown1RowStyle: {
        backgroundColor: "#EFEFEF",
        borderBottomColor: "#C5C5C5",
      },
      dropdown1RowTxtStyle: { color: "#444", textAlign: "left" },
    
      dropdown2BtnStyle: {
        flex: 1,
        height: 50,
        backgroundColor: "#FFF",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#444",
      },
      dropdown2BtnTxtStyle: { color: "#444", textAlign: "left" },
      dropdown2DropdownStyle: { backgroundColor: "#EFEFEF" },
      dropdown2RowStyle: {
        backgroundColor: "#EFEFEF",
        borderBottomColor: "#C5C5C5",
      },
      dropdown2RowTxtStyle: { color: "#444", textAlign: "left" },
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