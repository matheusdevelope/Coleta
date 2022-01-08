import React, {
  useImperativeHandle,
  forwardRef,
  useState,
  useRef,
  useEffect,
} from "react";
import { Alert, FlatList } from "react-native";
import Global from "../../global/global";
import GText, { FormatErrorAPI } from "../../global/texts";
import { UpdateItensAPI } from "../../services/Api/routesApi";
import {
  CreateItensDB,
  DeleteItensDB,
  GetItensDB,
  UpdateItensDB,
} from "../../services/routesData/routesData";
import BoxItemColeta from "../boxItemColeta/boxItemColeta";
import { LoadingIcon } from "./style";

const ItensList = (
  { EditItem, itens, isFocused, details, refresh, RouteName, HideCanceled },
  ref
) => {
  const [List, setList] = useState([]);
  const [onLoading, setOnLoading] = useState(false);
  const ControlEditing = useRef(false);
  const tableItem = GText.infoDB.Table.Itens.fields;
  const field = tableItem.Item;

  async function InsertItensOnDB() {
    async function insert() {
      for (let i = 0; i < List.length; i++) {
        let copy = List[i];
        if (itens !== undefined) {
          const ret = await GetItensDB(
            tableItem.IdMobile,
            copy[tableItem.IdMobile]
          );
          if (ret) {
            await UpdateItensDB(
              tableItem.IdMobile,
              copy[tableItem.IdMobile],
              copy
            );
          } else {
            await CreateItensDB(copy);
          }
        } else {
          await CreateItensDB(copy);
        }
      }
    }
    await insert();
  }
  function handleEditItem(data) {
    if (EditItem !== undefined) {
      if (!ControlEditing.current) {
        EditItem(data);
        DeleteItem(data);
        ControlEditing.current = true;
      } else {
        alert(GText.MessageAlertEditingItemNewColeta);
      }
    }
  }
  async function DeleteItem(data) {
    if (RouteName === GText.SendedColetas) {
      CancelItem(data);
    } else {
      if ((itens !== undefined) & details) {
        await DeleteItensDB(tableItem.IdMobile, data[tableItem.IdMobile]);
        await refresh();
      }
      let copy = List;
      const index = copy.findIndex((obj) => obj[field] === data[field]);
      copy.splice(index, 1);
      setList([...copy]);
    }
  }
  async function CancelItem(data) {
    if (data[tableItem.ImportColeta] === GText.ValueImportColeta) {
      setOnLoading(true);
      data[tableItem.Status] = GText.infoInputs.CancelStatusItem;

      try {
        await UpdateItensAPI([data]);
        try {
          await UpdateItensDB(tableItem.id, data[tableItem.id], data);
        } catch (e) {
          Alert.alert(
            GText.failedOnCancelItens,
            JSON.stringify(FormatErrorAPI(e), null, ",")
          );
        }
      } catch (e) {
        Alert.alert(
          GText.failedOnCancelItens,
          JSON.stringify(FormatErrorAPI(e), null, ",")
        );
      }
      setOnLoading(false);
      GetData();
    } else {
      Alert.alert("Atenção", GText.messageCannotCancelItens);
    }
  }
  function VerifyAndChangeClient(list, newItem) {
    if (
      list[0][GText.infoInputs.nCodClient] !==
      newItem[GText.infoInputs.nCodClient]
    ) {
      list.forEach((obj) => {
        obj[GText.infoInputs.nCodClient] = newItem[GText.infoInputs.nCodClient];
        obj[GText.infoInputs.nNameClient] =
          newItem[GText.infoInputs.nNameClient];
      });
      return list;
    } else {
      return list;
    }
  }
  function OrderList(data) {
    data.sort((a, b) =>
      Number(a[field]) > Number(b[field])
        ? 1
        : Number(b[field]) > Number(a[field])
        ? -1
        : 0
    );
    return data;
  }
  function CreateList(data) {
    //this enable the next item edit
    ControlEditing.current = false;
    //Insert New Item on List
    let copyList = List;
    copyList.push(data);
    copyList = VerifyAndChangeClient(copyList, data);
    //Order list by selected field
    //Refresch list with news itens
    setList([...OrderList(copyList)]);
  }
  async function GetData() {
    let ret = [];
    ret = await GetItensDB(
      tableItem.ColetaNumber,
      itens[tableItem.ColetaNumber]
    );

    setList([...OrderList(ret)]);
  }

  useImperativeHandle(ref, () => ({
    InsertOnList: (data) => {
      CreateList(data);
    },
    InsertOnDB: async () => {
      await InsertItensOnDB();
    },
    resetList: () => {
      setList([]);
    },
    getData: () => {
      return List;
    },
    GetItemOnEdit: () => {
      return ControlEditing.current;
    },
  }));
  useEffect(() => {
    if (isFocused) {
      itens !== undefined && GetData();
    }
    return () => {
      ControlEditing.current = false;
      setList([]);
    };
  }, [isFocused]);

  return (
    <>
      {onLoading && (
        <LoadingIcon size="large" color={Global.black} style={{ margin: 4 }} />
      )}

      <FlatList
        ref={ref}
        data={List}
        renderItem={({ item }) => (
          <BoxItemColeta
            data={item}
            DeleteItem={DeleteItem}
            EditItem={handleEditItem}
            RouteName={RouteName}
            HideCanceled={HideCanceled}
            details={details}
          />
        )}
        keyExtractor={(item) => item[field]}
      />
    </>
  );
};

export default forwardRef(ItensList);
