import React, {
  useImperativeHandle,
  forwardRef,
  useState,
  useRef,
} from "react";
import { useEffect } from "react/cjs/react.development";
import GText from "../../global/texts";
import { CancelItensAPI } from "../../services/Api/routesApi";
import {
  CreateItensDB,
  DeleteItensDB,
  GetItensDB,
  UpdateItensDB,
  UpdateStatusItensOnDB,
} from "../../services/routesData/routesData";
import BoxItemColeta from "../boxItemColeta/boxItemColeta";
import { FlatList } from "./style";

const ItensList = (
  { EditItem, itens, isFocused, details, refresh, RouteName, HideCanceled },
  ref
) => {
  const [List, setList] = useState([]);
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
    const GT = tableItem;
    const Itens = await GetItensDB(GT.IdMobile, data[GT.IdMobile]);
    const ret = await CancelItensAPI(Itens);
    if (ret) {
      await UpdateStatusItensOnDB(
        GT.IdMobile,
        data[GT.IdMobile],
        GText.infoInputs.SendedStatusItem,
        GText.infoInputs.CancelStatusItem
      );
      GetData();
    } else {
      alert(GText.failedOnCancelItens);
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
  );
};

export default forwardRef(ItensList);
