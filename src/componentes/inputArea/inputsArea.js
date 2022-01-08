import React, {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { StyleSheet } from "react-native";
import { Form } from "@unform/mobile";
import Input from "../inputForm/input";
import GText, {
  DateFormat,
  fiedlsHide,
  fieldsToString,
  HourFormat,
} from "../../global/texts";
import Global from "../../global/global";
import InputSelect from "../inputSelected/inputSelect.js";
import Button from "../button/button";
import { Label, Line } from "./style";
import {
  GetLastItemOnDB,
  GetProfileDB,
} from "../../services/routesData/routesData";
function InputArea({ InsertNewItemOnList, itens, isFocused }, ref) {
  const formRef = useRef(null);
  const DataDB = useRef(null);
  const HigherItem = useRef(0);
  const [OnEdit, setOnEdit] = useState(false);
  const GT = GText.infoInputs;

  const options = {
    clients: {
      name: GText.infoDB.Table.Clients.name,
      fieldvalue: GText.infoDB.Table.Clients.fields.id,
      fieldlabel: GText.infoDB.Table.Clients.fields.name,
      nameFieldHide: GT.nCodClient,
    },
    brands: {
      name: GText.infoDB.Table.Brands.name,
      fieldvalue: GText.infoDB.Table.Brands.fields.id,
      fieldlabel: GText.infoDB.Table.Brands.fields.name,
      nameFieldHide: GT.nCodBrand,
    },
    branch: {
      name: GText.infoDB.Table.Branch.name,
      fieldvalue: GText.infoDB.Table.Branch.fields.id,
      fieldlabel: GText.infoDB.Table.Branch.fields.category,
      nameFieldHide: GT.nCodBranch,
    },
    situation: {
      name: GText.infoDB.Table.Situation.name,
      fieldvalue: GText.infoDB.Table.Situation.fields.id,
      fieldlabel: GText.infoDB.Table.Situation.fields.name,
      nameFieldHide: GT.nCodSituation,
    },
    warranty: {
      name: GText.infoDB.Table.Warranty.name,
      fieldvalue: GText.infoDB.Table.Warranty.fields.id,
      fieldlabel: GText.infoDB.Table.Warranty.fields.name,
      nameFieldHide: GT.nCodWarranty,
    },
  };
  const fieldsToClear = [
    GT.nServicesExec,
    GT.nDimension,
    GT.nSerieNumber,
    GT.nDesign,
    GT.nBrand,
    // GT.nValue,
    GT.nWarranty,
    GT.nSituation,
    GT.nId,
    GT.nIdMobile,
  ];
  const fieldsNeedsValue = [
    GT.nNameClient,
    GT.nServicesExec,
    GT.nDimension,
    GT.nSerieNumber,
    GT.nDesign,
    GT.nBrand,
    GT.nValue,
    GT.nWarranty,
    //GT.nSituation,
    GT.nBranch,
  ];
  function setErrorsFields(data) {
    let ret = false;
    formRef.current.setErrors({});
    fieldsNeedsValue.forEach((obj) => {
      let value = data[obj];
      (value !== undefined) & (value !== null)
        ? (value = value.length)
        : (value = 0);
      if (value === 0) {
        ret = true;
        formRef.current.setFieldError(obj, Global.redInputs);
      }
    });
    /////debuf only
    ret = false;
    ////debug only
    return ret;
  }
  function ClearFields() {
    fieldsToClear.forEach((obj) => {
      formRef.current.clearField(obj);
    });
  }
  function handleSubmit(data) {
    data[GT.nStatus] = GT.InitialStatusItem;
    if (!setErrorsFields(data)) {
      InsertNewItemOnList(data);
      InitialValueFields();
      SetCountItem();
      ClearFields();
      OnEdit && setOnEdit(false);
    }
  }
  /**
   * -Function to set data on the hide fields of the InputArea;
   *
   * -Needs the Ref name of hide input and a value (value needs to be a String) ;
   */
  function SetDataHideFields(data, field) {
    formRef.current.setFieldValue(field, data);
  }
  function SetCountItem() {
    let newItem = "";
    let Item = Number(formRef.current.getFieldValue(GT.fiedlsHide.Item));
    let Higher = HigherItem.current;
    console.log(Item, Higher);
    if (Item < Higher) {
      newItem = Higher;
      formRef.current.setFieldValue(GT.fiedlsHide.Item, newItem.toString());
      HigherItem.current = newItem;
    } else {
      newItem = Item + 1;
      formRef.current.setFieldValue(GT.fiedlsHide.Item, newItem.toString());
      HigherItem.current = newItem;
    }
  }
  /**
   * The "LastNumberOfColeta" get and set the sequencial id to orders;
   * This make a top 1 desc select on local Db to get the last ID and SUM +1;
   * on first time of use, the value of db is null, then we take the INITIAL Sequence of the user profile
   */
  async function NumberColeta(ret) {
    let LastNumberOfColeta = await GetLastItemOnDB();
    if (LastNumberOfColeta === null) {
      return ret[GText.infoDB.Table.Profile.fields.initSequence].toString();
    } else {
      LastNumberOfColeta[0][GT.fiedlsHide.ColetaNumber] =
        Number(LastNumberOfColeta[0][GT.fiedlsHide.ColetaNumber]) + 1;
      return LastNumberOfColeta[0][GT.fiedlsHide.ColetaNumber].toString();
    }
  }
  async function InitialValueFields(LastItemOnEdit) {
    let ret = DataDB.current.profile;
    if ((ret === undefined) | (ret === null)) {
      alert("Dados Não Sincronizados");
      return;
    } else {
      const GTF = GT.fiedlsHide;
      const InitialData = [
        { name: GTF.id, initialData: "" },
        { name: GTF.IdMobile, initialData: "" },
        { name: GTF.CodImport, initialData: "1" },
        { name: GTF.Date, initialData: DateFormat },
        {
          name: GTF.Item,
          initialData:
            LastItemOnEdit === undefined ? "1" : LastItemOnEdit.toString(),
        },
        {
          name: GTF.CodCompany,
          initialData:
            ret[GText.infoDB.Table.Profile.fields.company].toString(),
        },
        {
          name: GTF.CodSalesmanI,
          initialData: ret[GText.infoDB.Table.Profile.fields.id].toString(),
        },
        { name: GTF.CodPriority, initialData: null },
        { name: GTF.ColetaDate, initialData: DateFormat },
        {
          name: GTF.CodSalesman,
          initialData: ret[GText.infoDB.Table.Profile.fields.id].toString(),
        },
        {
          name: GTF.CodCollector,
          initialData: ret[GText.infoDB.Table.Profile.fields.id].toString(),
        },
        { name: GTF.CodTechnician, initialData: "1" },
        { name: GTF.CodProduct, initialData: "1" },
        { name: GTF.CodType, initialData: null },
        { name: GTF.CodCancel, initialData: null },
        { name: GTF.ColetaNumber, initialData: DataDB.current.numberColeta },
        { name: GTF.Status, initialData: GT.InitialStatusItem },
        { name: GTF.InclusionDate, initialData: DateFormat },
        { name: GTF.InclusionHour, initialData: HourFormat },
        {
          name: GTF.InclusionUser,
          initialData: ret[GText.infoDB.Table.Profile.fields.name].toString(),
        },
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
        { name: GTF.CancelStation, initialData: null },
        { name: GTF.createdAt, initialData: "" },
        { name: GTF.updatedAt, initialData: "" },
      ];
      InitialData.forEach((data) => {
        formRef.current.setFieldValue(data.name, data.initialData);
      });
    }
  }
  async function GetDataDBNewColeta() {
    const ret = await GetProfileDB();
    const numberColeta = await NumberColeta(ret[0]);
    const obj = {
      profile: ret[0],
      numberColeta,
    };
    DataDB.current = obj;
    InitialValueFields();
  }
  async function GetDataOnEdit(itens) {
    const ret = await GetProfileDB();
    let LastItem = await GetLastItemOnDB(
      GT.nColetaNumber,
      itens[GT.nColetaNumber]
    );
    LastItem = LastItem[0][GT.nItem] + 1;
    const numberColeta = itens[GT.nColetaNumber].toString();
    const obj = {
      profile: ret[0],
      numberColeta,
    };
    HigherItem.current = LastItem !== undefined ? LastItem : 0;
    SetDataHideFields(itens[GT.nNameClient], GT.nNameClient);
    DataDB.current = obj;
    InitialValueFields(LastItem);
  }
  function handleResetForm() {
    formRef.current.setErrors({});
    formRef.current.reset();
    HigherItem.current = 0;
    InitialValueFields();
  }

  useImperativeHandle(ref, () => ({
    SetDataFielsOnEdit: (data) => {
      let ret = data;
      fieldsToString.forEach((obj) => {
        let temp = ret[obj];
        if ((temp !== undefined) & (temp !== null)) {
          temp = temp.toString();
        } else {
          temp = "";
        }
        ret[obj] = temp;
      });
      formRef.current.setData(data);
      setOnEdit(true);
    },
    resetForm: () => {
      handleResetForm();
    },
    getData: () => {
      return formRef.current.getData();
    },
  }));

  useEffect(() => {
    if (isFocused) {
      if (itens !== undefined) {
        GetDataOnEdit(itens);
      } else {
        GetDataDBNewColeta();
      }
    }
    return () => {
      isFocused && handleResetForm();
    };
  }, [isFocused]);

  return (
    <Form ref={formRef} onSubmit={handleSubmit}>
      <Line>
        <InputSelect
          options={options.clients}
          name={GT.nNameClient}
          isFocused={isFocused}
          placeholder={GT.pNameClient}
          editable
          SetDataHideFields={SetDataHideFields}
        />
      </Line>
      <Line>
        <Input
          name={GT.nServicesExec}
          placeholder={GT.pServicesExec}
          style={styles.inputDivided}
        />
      </Line>
      <Line>
        <Input
          name={GT.nDimension}
          placeholder={GT.pDimension}
          keyboardType="numeric"
          style={styles.inputDivided}
        />
        <Input
          name={GT.nSerieNumber}
          placeholder={GT.pSerieNumber}
          keyboardType="numeric"
          style={styles.inputDivided}
        />
        <Input
          name={GT.nDesign}
          UpperCase
          placeholder={GT.pDesign}
          style={styles.inputDivided}
        />
      </Line>
      <Line>
        <InputSelect
          options={options.brands}
          name={GT.nBrand}
          isFocused={isFocused}
          placeholder={GT.pBrand}
          editable
          SetDataHideFields={SetDataHideFields}
        />
        <Input
          name={GT.nBoard}
          UpperCase
          placeholder={GT.pBoard}
          style={styles.inputDivided}
        />
        <Input
          name={GT.nValue}
          placeholder={GT.pValue}
          style={styles.inputDivided}
          keyboardType="numeric"
        />
      </Line>
      <Input
        name={GT.nObservation}
        placeholder={GT.pObservation}
        style={styles.input}
      />
      <Line>
        <InputSelect
          name={GT.nBranch}
          options={options.branch}
          isFocused={isFocused}
          placeholder={GT.pBranch}
          SetDataHideFields={SetDataHideFields}
        />
        <InputSelect
          name={GT.nWarranty}
          options={options.warranty}
          isFocused={isFocused}
          placeholder={GT.pWarranty}
          SetDataHideFields={SetDataHideFields}
        />
        <InputSelect
          name={GT.nSituation}
          options={options.situation}
          isFocused={isFocused}
          placeholder={GT.pSituation}
          SetDataHideFields={SetDataHideFields}
        />
      </Line>
      {fiedlsHide.map((data, key) => {
        return <Input key={key} name={data.name} style={{ display: "none" }} />;
      })}
      <Line>
        <Label>{OnEdit ? "Editando Item" : "Novo Item"}</Label>
      </Line>
      <Button
        name={OnEdit ? Global.IconEdit : Global.IconAdd}
        size={Global.sizeiconAdd}
        color={Global.bluelight} //label={'Salvar edição!'}
        onClick={() => formRef.current.submitForm()}
        styleLabel={{ fontSize: 20, color: Global.white }}
        style={{ borderRadius: 10, backgroundColor: Global.blue, margin: 8 }}
      />
    </Form>
  );
}

export default forwardRef(InputArea);

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
    maxHeight: 36,
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
  },
});
