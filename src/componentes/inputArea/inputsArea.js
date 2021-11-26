import React, { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { StyleSheet } from 'react-native';
import { Form } from '@unform/mobile';
import Input from '../inputForm/input';
import GText, { fiedlsHide } from '../../global/texts';
import Global from '../../global/global';
import InputSelect from '../inputSelected/inputSelect.js';
import Button from '../button/button';
import { Line } from './style';
import { GetLastItemOnDB, GetProfileDB } from '../../services/routesData/routesData';
function InputArea({InsertNewItemOnList},ref) {
  const formRef = useRef(null);
  useImperativeHandle(ref, () => ({
    SetDataFielsOnEdit:(data)=>{
      formRef.current.setData(data)
    }
}));
  const options = {
    clients: {
      name: GText.infoDB.Table.Clients.name,
      fieldvalue: GText.infoDB.Table.Clients.fields.id,
      fieldlabel: GText.infoDB.Table.Clients.fields.name,
      nameFieldHide: GText.infoInputs.nCodClient
    },
    brands: {
      name: GText.infoDB.Table.Brands.name,
      fieldvalue: GText.infoDB.Table.Brands.fields.id,
      fieldlabel: GText.infoDB.Table.Brands.fields.name,
      nameFieldHide: GText.infoInputs.nCodBrand
    },
    branch: {
      name: GText.infoDB.Table.Branch.name,
      fieldvalue: GText.infoDB.Table.Branch.fields.id,
      fieldlabel: GText.infoDB.Table.Branch.fields.category,
      nameFieldHide: GText.infoInputs.nCodBranch
    },
    situation: {
      name: GText.infoDB.Table.Situation.name,
      fieldvalue: GText.infoDB.Table.Situation.fields.id,
      fieldlabel: GText.infoDB.Table.Situation.fields.name,
      nameFieldHide: GText.infoInputs.nCodSituation
    },
    warranty: {
      name: GText.infoDB.Table.Warranty.name,
      fieldvalue: GText.infoDB.Table.Warranty.fields.id,
      fieldlabel: GText.infoDB.Table.Warranty.fields.name,
      nameFieldHide: GText.infoInputs.nCodWarranty
    }
  }
  function handleSubmit(data) {
    InsertNewItemOnList(data)
    SetCountItem()
  }
  /**
   * -Function to set data on the hide fields of the InputArea;
   * 
   * -Needs the Ref name of hide input and a value (value needs to be a String) ;
   */
  function SetDataHideFields(data, field) {
    formRef.current.setFieldValue(field, data)
  }
  function SetCountItem() {
    let newItem = ''
    let Item = Number(formRef.current.getFieldValue(GText.infoInputs.fiedlsHide.Item)) 
    let HigherItem = Number(formRef.current.getFieldValue(GText.infoInputs.fiedlsHide.HigherItem))
  ///não esta  funcionado ainda
    if(Item>HigherItem){
      newItem = Item + 1
      formRef.current.setFieldValue(GText.infoInputs.nDimension, newItem.toString())
      formRef.current.setFieldValue(GText.infoInputs.fiedlsHide.HigherItem, newItem.toString())
    }
    else{
      newItem = HigherItem + 1
      formRef.current.setFieldValue(GText.infoInputs.nDimension, newItem.toString())
      formRef.current.setFieldValue(GText.infoInputs.fiedlsHide.Item, newItem.toString())
    // formRef.current.setFieldValue(GText.infoInputs.fiedlsHide.HigherItem, newItem.toString())
    }
  }
  /**
       * The "LastNumberOfColeta" get and set the sequencial id to orders;
       * This make a top 1 desc select on local Db to get the last ID and SUM +1;
       * on first time of use, the value of db is null, then we take the INITIAL Sequence of the user profile
       */
   async function NumberColeta(ret) {
   //  console.log(ret ) //[GText.infoDB.Table.Profile.fields.initSequence])
    let LastNumberOfColeta = await GetLastItemOnDB()
    if (LastNumberOfColeta === null) {
      return ret[GText.infoDB.Table.Profile.fields.initSequence].toString()
    }
    else {
      LastNumberOfColeta[0][GText.infoInputs.fiedlsHide.ColetaNumber] = Number(LastNumberOfColeta[0][GText.infoInputs.fiedlsHide.ColetaNumber]) + 1
      return LastNumberOfColeta[0][GText.infoInputs.fiedlsHide.ColetaNumber].toString()
    }
  }
  async function GetDataDB(data) {

    const DataNow = new Date()
    const GetDate = ('0' + DataNow.getDate()).substr(-2) + "/" + ("0" + (DataNow.getMonth() + 1)).substr(-2) + "/" + DataNow.getFullYear()
    const Hour = (DataNow.getHours().toString() + ":" + DataNow.getMinutes().toString()).toString()

    let ret = []
    ret = await GetProfileDB()
    ret = ret[0]
    if (ret == undefined) {
      alert('Dados Não Sincronizados')
      return
    }
    else {
    //  NumberColeta(ret)
      /**
       * This set the data to the hide fields, like data, hour, who makes the order...
       */
      const InitialData = [
        { name: GText.infoInputs.fiedlsHide.CodImport, initialData: null },
        { name: GText.infoInputs.fiedlsHide.Item, initialData: '1' },
        { name: GText.infoInputs.fiedlsHide.HigherItem, initialData: '1' },
        { name: GText.infoInputs.fiedlsHide.CodCompany, initialData: ret[GText.infoDB.Table.Profile.fields.company].toString() },
        { name: GText.infoInputs.fiedlsHide.CodSalesmanI, initialData: ret[GText.infoDB.Table.Profile.fields.id].toString() },
        { name: GText.infoInputs.fiedlsHide.CodPriority, initialData: null },
        { name: GText.infoInputs.fiedlsHide.ColetaDate, initialData: GetDate },
        { name: GText.infoInputs.fiedlsHide.CodSalesman, initialData: ret[GText.infoDB.Table.Profile.fields.id].toString() },
        { name: GText.infoInputs.fiedlsHide.CodCollector, initialData: ret[GText.infoDB.Table.Profile.fields.id].toString() },
        { name: GText.infoInputs.fiedlsHide.CodTechnician, initialData: '1' },
        { name: GText.infoInputs.fiedlsHide.CodProduct, initialData: '1' },
        { name: GText.infoInputs.fiedlsHide.CodType, initialData: null },
        { name: GText.infoInputs.fiedlsHide.CodCancel, initialData: null },
        { name: GText.infoInputs.fiedlsHide.ColetaNumber, initialData: await NumberColeta(ret) },
        { name: GText.infoInputs.fiedlsHide.Status, initialData: ret[GText.infoInputs.InitialStatusItem] },
        { name: GText.infoInputs.fiedlsHide.InclusionDate, initialData: GetDate },
        { name: GText.infoInputs.fiedlsHide.InclusionHour, initialData: Hour },
        { name: GText.infoInputs.fiedlsHide.InclusionUser, initialData: ret[GText.infoDB.Table.Profile.fields.name].toString() },
        { name: GText.infoInputs.fiedlsHide.InclusionStation, initialData: GText.infoInputs.InitialPlatform },
        { name: GText.infoInputs.fiedlsHide.IdIdentityClient, initialData: null },
        { name: GText.infoInputs.fiedlsHide.Phone, initialData: null },
        { name: GText.infoInputs.fiedlsHide.ImportColeta, initialData: GText.infoInputs.InitialImportValue },
        { name: GText.infoInputs.fiedlsHide.NameProduct, initialData: null },
        { name: GText.infoInputs.fiedlsHide.Modelo, initialData: null },
        { name: GText.infoInputs.fiedlsHide.FireNumber, initialData: null },
        { name: GText.infoInputs.fiedlsHide.InitialExam, initialData: null },
        { name: GText.infoInputs.fiedlsHide.CancelObservation, initialData: null },
        { name: GText.infoInputs.fiedlsHide.CancelDate, initialData: null },
        { name: GText.infoInputs.fiedlsHide.CancelHour, initialData: null },
        { name: GText.infoInputs.fiedlsHide.CancelUser, initialData: null },
        { name: GText.infoInputs.fiedlsHide.CancelStation, initialData: null }
      ]
      InitialData.forEach((data) => {
        formRef.current.setFieldValue(data.name, data.initialData)
      })
    }
  }
  useEffect(() => {
    GetDataDB()
  }, [])

  return (
    <Form ref={formRef} onSubmit={handleSubmit} >
      <Line>
        <InputSelect options={options.clients} name={GText.infoInputs.nNameClient}
          placeholder={GText.infoInputs.pNameClient} editable SetDataHideFields={SetDataHideFields} />
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
        <InputSelect options={options.brands} name={GText.infoInputs.nBrand}
          placeholder={GText.infoInputs.pBrand} editable SetDataHideFields={SetDataHideFields} />
        <Input name={GText.infoInputs.nBoard} placeholder={GText.infoInputs.pBoard} style={styles.inputDivided} />
        <Input name={GText.infoInputs.nValue} placeholder={GText.infoInputs.pValue} style={styles.inputDivided} keyboardType="numeric" />
      </Line>
      <Input name={GText.infoInputs.nObservation} placeholder={GText.infoInputs.pObservation} style={styles.input} />

      <Line>
        <InputSelect name={GText.infoInputs.nWarranty} options={options.warranty}
          placeholder={GText.infoInputs.pWarranty} SetDataHideFields={SetDataHideFields} />
        <InputSelect name={GText.infoInputs.nBranch} options={options.branch}
          placeholder={GText.infoInputs.pBranch} SetDataHideFields={SetDataHideFields} />
        <InputSelect name={GText.infoInputs.nSituation} options={options.situation}
          placeholder={GText.infoInputs.pSituation} SetDataHideFields={SetDataHideFields} />
      </Line>
      {
        fiedlsHide.map((data, key) => {
          return (
            <Input key={key} name={data.name} style={{ display: 'none' }} />
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

export default forwardRef(InputArea)

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