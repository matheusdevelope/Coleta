import React, { useRef } from 'react';
import { StyleSheet } from 'react-native';
import { Form } from '@unform/mobile';
import Input from '../inputForm/input';
import GText, { fiedlsHide } from '../../global/texts';
import Global from '../../global/global';
import InputSelect from '../inputSelected/inputSelect.js';
import Button from '../button/button';
import { Line } from './style'
import Itens from '../../services/SQLite/tables/Itens'
import Clients from '../../services/SQLite/tables/clients'
import Marcas from '../../services/SQLite/tables/brands'
import Perfil from '../../services/SQLite/tables/profile'
import Empresa from '../../services/SQLite/tables/company'
import Filial from '../../services/SQLite/tables/branch'
import { Clientes, Coletas } from '../../../DadosOffline/Coletas Lista';

export default function InputArea({ itens }) {

  const formRef = useRef(null);
  function handleSubmit(data) {
    console.log(data);
    // { email: 'test@example.com', password: '123456' }
  }

  // useEffect(()=>{
  //   DB.find(401)
  //   .then((e)=>{
  //     formRef.current.setData(e[0])
  //     console.log(e)
  //   })
  //   .catch(e=>console.log(e))

  // },[])

  // async function CarregarBase(params) {
  //   let codcli = 0
  //     const d = Object.keys(Coletas).length
  //      for (let index = 0; index < d; index++) {
  //       // console.log(Clientes[index])
  //       // codcli = Clientes[index].CodCliente
  //       // Clientes[index].CodCliente !== codcli
  //       // ?
  //       console.log('for: ',Coletas[index].IdMobile)
  //       await Itens.create(Coletas[index])
       
  //       // :
  //       // console.log(Clientes[index])
  //      }
  // // console.log(Coletas[4])
  
  // }
  // CarregarBase()
   Itens.all()
  // console.log(Coletas[4].IdMobile)


  return (

    <Form ref={formRef} onSubmit={handleSubmit} >
      <Line>
        <InputSelect options={itens} name={GText.infoInputs.nNameClient} placeholder={GText.infoInputs.pNameClient} editable />
      </Line>

      <Line>
        <Input name={GText.infoInputs.nServicesExec} placeholder={GText.infoInputs.pServicesExec} style={styles.inputDivided} />
      </Line>
      <Line>
        <Input name={GText.infoInputs.nDimension} placeholder={GText.infoInputs.pDimension} keyboardType="numeric" style={styles.inputDivided} />
        <Input name={GText.infoInputs.nSerieNumber} placeholder={GText.infoInputs.pSerieNumber} keyboardType="numeric" style={styles.inputDivided} />
        <Input name={GText.infoInputs.nDesign} placeholder={GText.infoInputs.pDesign} style={styles.inputDivided} />

      </Line>
      <Line>
        <InputSelect options={itens} name={GText.infoInputs.nBrand} placeholder={GText.infoInputs.pBrand} editable />
        <Input name={GText.infoInputs.nBoard} placeholder={GText.infoInputs.pBoard} style={styles.inputDivided} />
        <Input name={GText.infoInputs.nValue} placeholder={GText.infoInputs.pValue} style={styles.inputDivided} keyboardType="numeric" />
      </Line>
      <Input name={GText.infoInputs.nObservation} placeholder={GText.infoInputs.pObservation} style={styles.input} />

      <Line>
        <InputSelect name={GText.infoInputs.nWarranty} options={itens} placeholder={GText.infoInputs.pWarranty} />
        <InputSelect name={GText.infoInputs.nCodBranch} options={itens} placeholder={GText.infoInputs.pCodBranch} />
        <InputSelect name={GText.infoInputs.nCodSituation} options={itens} placeholder={GText.infoInputs.pCodSituation} />
      </Line>
      {
        fiedlsHide.map((data, key) => {
          return (
            <Input key={key} name={data.name} style={{display:'none'}} />
          )
        })
      }
      <Button name={Global.IconAdd} size={Global.sizeiconAdd} color={Global.bluelight}
        onClick={() => formRef.current.submitForm()}
        style={{
          borderRadius: 10, backgroundColor: Global.blue, margin: 8
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
})