import React, { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { StyleSheet } from 'react-native';
import { Form } from '@unform/mobile';
import Input from '../inputForm/input';
import GText, { fiedlsHide, fieldsToString } from '../../global/texts';
import Global from '../../global/global';
import InputSelect from '../inputSelected/inputSelect.js';
import Button from '../button/button';
import { Line } from './style';
import { GetLastItemOnDB, GetProfileDB } from '../../services/routesData/routesData';
function InputArea({ InsertNewItemOnList, itens}, ref) {
  const formRef = useRef(null);
  const DataDB = useRef(null);
  const HigherItem = useRef(0);
  const GT = GText.infoInputs

  const options = {
    clients: {
      name: GText.infoDB.Table.Clients.name,
      fieldvalue: GText.infoDB.Table.Clients.fields.id,
      fieldlabel: GText.infoDB.Table.Clients.fields.name,
      nameFieldHide: GT.nCodClient
    },
    brands: {
      name: GText.infoDB.Table.Brands.name,
      fieldvalue: GText.infoDB.Table.Brands.fields.id,
      fieldlabel: GText.infoDB.Table.Brands.fields.name,
      nameFieldHide: GT.nCodBrand
    },
    branch: {
      name: GText.infoDB.Table.Branch.name,
      fieldvalue: GText.infoDB.Table.Branch.fields.id,
      fieldlabel: GText.infoDB.Table.Branch.fields.category,
      nameFieldHide: GT.nCodBranch
    },
    situation: {
      name: GText.infoDB.Table.Situation.name,
      fieldvalue: GText.infoDB.Table.Situation.fields.id,
      fieldlabel: GText.infoDB.Table.Situation.fields.name,
      nameFieldHide: GT.nCodSituation
    },
    warranty: {
      name: GText.infoDB.Table.Warranty.name,
      fieldvalue: GText.infoDB.Table.Warranty.fields.id,
      fieldlabel: GText.infoDB.Table.Warranty.fields.name,
      nameFieldHide: GT.nCodWarranty
    }
  }
  const fieldsToClear = [
    GT.nServicesExec,
    GT.nDimension,
    GT.nSerieNumber,
    GT.nDesign,
    GT.nBrand,
    GT.nValue,
    GT.nWarranty,
    GT.nSituation,
  ]
  const fieldsNeedsValue = [
    GT.nNameClient,
    GT.nServicesExec,
    GT.nDimension,
    GT.nSerieNumber,
    GT.nDesign,
    GT.nBrand,
    GT.nValue,
    GT.nWarranty,
    GT.nSituation,
  ]
  function setErrorsFields(data) {
    let ret = false
    formRef.current.setErrors({})
    fieldsNeedsValue.forEach((obj) => {
      let value = data[obj]
      value !== undefined &    value !== null 
      ?
      value = value.length
      :
      value = 0
       if (value === 0 ) {
         ret = true
         formRef.current.setFieldError(obj,Global.redInputs)
       }
    })
    /////debuf only
    ret = false
    ////debu only
    return ret
  }
  function ClearFields() {
    fieldsToClear.forEach((obj) => {
      formRef.current.clearField(obj)
    })
  }
  function handleSubmit(data) {
    if( !setErrorsFields(data) ){
    ClearFields()
    InsertNewItemOnList(data)
    SetCountItem()
    }    
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
    let Item = Number(formRef.current.getFieldValue(GT.fiedlsHide.Item))
    let Higher = HigherItem.current
    if (Item < Higher) {
      newItem = Higher
      formRef.current.setFieldValue(GT.fiedlsHide.Item, newItem.toString())
      HigherItem.current = newItem
    }
    else {
      newItem = Item + 1
      formRef.current.setFieldValue(GT.fiedlsHide.Item, newItem.toString())
      HigherItem.current = newItem
    }


  }
  /**
       * The "LastNumberOfColeta" get and set the sequencial id to orders;
       * This make a top 1 desc select on local Db to get the last ID and SUM +1;
       * on first time of use, the value of db is null, then we take the INITIAL Sequence of the user profile
       */
  async function NumberColeta(ret) {
    let LastNumberOfColeta = await GetLastItemOnDB()
    if (LastNumberOfColeta === null) {
      return ret[GText.infoDB.Table.Profile.fields.initSequence].toString()
    }
    else {
      LastNumberOfColeta[0][GT.fiedlsHide.ColetaNumber] = Number(LastNumberOfColeta[0][GT.fiedlsHide.ColetaNumber]) + 1
      return LastNumberOfColeta[0][GT.fiedlsHide.ColetaNumber].toString()
    }
  }
  async function InitialValueFields(LastItemOnEdit) {
    const DataNow = new Date()
    const GetDate = ('0' + DataNow.getDate()).substr(-2) + "/" + ("0" + (DataNow.getMonth() + 1)).substr(-2) + "/" + DataNow.getFullYear()
    const Hour = (DataNow.getHours().toString() + ":" + DataNow.getMinutes().toString()).toString()
    let ret = DataDB.current.profile
    if (ret == undefined) {
      alert('Dados Não Sincronizados')
      return
    }
    else {
      const GTF = GT.fiedlsHide
      const InitialData = [
        { name: GTF.CodImport, initialData: null },
        { name: GTF.Item, initialData: LastItemOnEdit ===undefined ? '1' : LastItemOnEdit.toString() },
        { name: GTF.CodCompany, initialData: ret[GText.infoDB.Table.Profile.fields.company].toString() },
        { name: GTF.CodSalesmanI, initialData: ret[GText.infoDB.Table.Profile.fields.id].toString() },
        { name: GTF.CodPriority, initialData: null },
        { name: GTF.ColetaDate, initialData: GetDate },
        { name: GTF.CodSalesman, initialData: ret[GText.infoDB.Table.Profile.fields.id].toString() },
        { name: GTF.CodCollector, initialData: ret[GText.infoDB.Table.Profile.fields.id].toString() },
        { name: GTF.CodTechnician, initialData: '1' },
        { name: GTF.CodProduct, initialData: '1' },
        { name: GTF.CodType, initialData: null },
        { name: GTF.CodCancel, initialData: null },
        { name: GTF.ColetaNumber, initialData: DataDB.current.numberColeta },
        { name: GTF.Status, initialData: ret[GT.InitialStatusItem] },
        { name: GTF.InclusionDate, initialData: GetDate },
        { name: GTF.InclusionHour, initialData: Hour },
        { name: GTF.InclusionUser, initialData: ret[GText.infoDB.Table.Profile.fields.name].toString() },
        { name: GTF.InclusionStation, initialData: GT.InitialPlatform },
        { name: GTF.IdIdentityClient, initialData: null },
        { name: GTF.Phone, initialData: null },
        { name: GTF.ImportColeta, initialData: GT.InitialImportValue },
        { name: GTF.NameProduct, initialData: null },
        { name: GTF.Modelo, initialData: null },
        { name: GTF.FireNumber, initialData: null },
        { name: GTF.InitialExam, initialData: null },
        { name: GTF.CancelObservation, initialData: null },
        { name: GTF.CancelDate, initialData: null },
        { name: GTF.CancelHour, initialData: null },
        { name: GTF.CancelUser, initialData: null },
        { name: GTF.CancelStation, initialData: null }
      ]
      InitialData.forEach((data) => {
        formRef.current.setFieldValue(data.name, data.initialData)
      })
    }
  }
  async function GetDataDBNewColeta() {
    const ret = await GetProfileDB()
    const numberColeta = await NumberColeta(ret[0])
    const obj = {
      profile: ret[0],
      numberColeta
    }
    DataDB.current = obj
    InitialValueFields()
  }
  async function GetDataOnEdit(itens) {
    const ret = await GetProfileDB()
    let LastItem = await GetLastItemOnDB(GT.nColetaNumber, itens[GT.nColetaNumber])
    LastItem = LastItem[0][GT.nItem] + 1
    const numberColeta = itens[GT.nColetaNumber].toString()
    const obj = {
      profile: ret[0],
      numberColeta
    }
    SetDataHideFields(itens[GT.nNameClient], GT.nNameClient)
    
    DataDB.current = obj
    InitialValueFields(LastItem)
  }
  useImperativeHandle(ref, () => ({
    SetDataFielsOnEdit: (data) => {
      let teste1 = data
      fieldsToString.forEach(obj=>{
      let temp = teste1[obj]
      if(temp !== undefined & temp !== null){
        temp = temp.toString()
      }else{
        temp = ''
      }
      teste1[obj] = temp
      })
      formRef.current.setData(data)
    },
    resetForm: () => {
      formRef.current.setErrors({})
      formRef.current.reset()
      HigherItem.current = 0
      InitialValueFields()
    }
  }));
  useEffect(() => {
if(itens !== undefined){
  GetDataOnEdit(itens)
}else{
  GetDataDBNewColeta()
}
  }, [])

  return (
    <Form ref={formRef} onSubmit={handleSubmit} >
      <Line>
        <InputSelect options={options.clients} name={GT.nNameClient}
          placeholder={GT.pNameClient} editable SetDataHideFields={SetDataHideFields} />
      </Line>
      <Line>
        <Input name={GT.nServicesExec} placeholder={GT.pServicesExec} style={styles.inputDivided} />
      </Line>
      <Line>
        <Input name={GT.nDimension} placeholder={GT.pDimension} keyboardType="numeric" style={styles.inputDivided} />
        <Input name={GT.nSerieNumber} placeholder={GT.pSerieNumber} keyboardType="numeric" style={styles.inputDivided} />
        <Input name={GT.nDesign} UpperCase placeholder={GT.pDesign} style={styles.inputDivided} />
      </Line>
      <Line>
        <InputSelect options={options.brands} name={GT.nBrand}
          placeholder={GT.pBrand} editable SetDataHideFields={SetDataHideFields} />
        <Input name={GT.nBoard} UpperCase placeholder={GT.pBoard} style={styles.inputDivided} />
        <Input name={GT.nValue} placeholder={GT.pValue} style={styles.inputDivided} keyboardType="numeric" />
      </Line>
      <Input name={GT.nObservation} placeholder={GT.pObservation} style={styles.input} />
      <Line>
        <InputSelect name={GT.nWarranty} options={options.warranty}
          placeholder={GT.pWarranty} SetDataHideFields={SetDataHideFields} />
        <InputSelect name={GT.nBranch} options={options.branch}
          placeholder={GT.pBranch} SetDataHideFields={SetDataHideFields} />
        <InputSelect name={GT.nSituation} options={options.situation}
          placeholder={GT.pSituation} SetDataHideFields={SetDataHideFields} />
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
        style={{ borderRadius: 10, backgroundColor: Global.blue, margin: 8 }} />
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
    // backgroundColor: Global.backgroundInputs,
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
    // backgroundColor: Global.backgroundInputs
  }
})