import React, { useRef } from 'react';
import { StyleSheet } from 'react-native';
import { Form } from '@unform/mobile';
import Input from '../inputForm/input';
import GText, { fiedlsHide } from '../../global/texts';
import Global from '../../global/global';
import InputSelect from '../inputSelected/inputSelect.js';
import Button from '../button/button';
import { Line } from './style'

export default function InputArea({ itens }) {

  const formRef = useRef(null);
  function handleSubmit(data) {
    console.log(data);
    // { email: 'test@example.com', password: '123456' }
  }

  const options = {
    clients:{
      name:GText.infoDB.Table.Brands.name,
      fieldvalue:GText.infoDB.Table.Brands.fields.id,
      fieldlabel:GText.infoDB.Table.Brands.fields.name
    },
    brands:{
      name:GText.infoDB.Table.Brands.name,
      fieldvalue:GText.infoDB.Table.Brands.fields.id,
      fieldlabel:GText.infoDB.Table.Brands.fields.name
    },
    branch:{
      name:GText.infoDB.Table.Branch.name,
      fieldvalue:GText.infoDB.Table.Branch.fields.id,
      fieldlabel:GText.infoDB.Table.Branch.fields.name
    },
    situation:{
      name:GText.infoDB.Table.Situation.name,
      fieldvalue:GText.infoDB.Table.Situation.fields.id,
      fieldlabel:GText.infoDB.Table.Situation.fields.name
    },
    warranty:{
      name:GText.infoDB.Table.Branch.name,
      fieldvalue:GText.infoDB.Table.Branch.fields.id,
      fieldlabel:GText.infoDB.Table.Branch.fields.name
    }
  }

  return (

    <Form ref={formRef} onSubmit={handleSubmit} >
      <Line>
        <InputSelect options={options.clients} name={GText.infoInputs.nNameClient} placeholder={GText.infoInputs.pNameClient} editable />
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
        <InputSelect options={options.brands} name={GText.infoInputs.nBrand} placeholder={GText.infoInputs.pBrand} editable />
        <Input name={GText.infoInputs.nBoard} placeholder={GText.infoInputs.pBoard} style={styles.inputDivided} />
        <Input name={GText.infoInputs.nValue} placeholder={GText.infoInputs.pValue} style={styles.inputDivided} keyboardType="numeric" />
      </Line>
      <Input name={GText.infoInputs.nObservation} placeholder={GText.infoInputs.pObservation} style={styles.input} />

      <Line>
        <InputSelect name={GText.infoInputs.nWarranty} options={options.warranty} placeholder={GText.infoInputs.pWarranty} />
        <InputSelect name={GText.infoInputs.nCodBranch} options={options.branch} placeholder={GText.infoInputs.pCodBranch} />
        <InputSelect name={GText.infoInputs.nCodSituation} options={options.situation} placeholder={GText.infoInputs.pCodSituation} />
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