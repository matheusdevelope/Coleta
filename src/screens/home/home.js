import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from "@react-navigation/core";
import React, { useEffect, useState, useRef } from "react";
import ColetasList from "../../componentes/coletasList/coletasList.js";
import Header from "../../componentes/header/header.js";
import ConfirmationModal from "../../componentes/modalConfirmation/modalConfirmation.js";
import SearchBox from "../../componentes/searchBox/searchBox.js";
import Global from "../../global/global.js";
import GText, { Routes } from "../../global/texts.js";
import { Container, Line } from "./style.js";
import {
  DeleteItensDB,
  GetItensDB,
  GetItensGrouped,
  UpdateStatusItensOnDB,
} from "../../services/routesData/routesData";
import { CancelItensAPI } from "../../services/Api/routesApi.js";
import Button from "../../componentes/button/button.js";
import { Alert, BackHandler } from "react-native";

function Home({ route }) {
  const RouteName = route.name;
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const ModalRef = useRef();
  const dataRef = useRef([]);
  const search = useRef("");
  const CheckedAll = useRef(false);
  const ItensChecked = useRef(0);
  const [showCheckBox, setShowCheckBox] = useState(false);
  const [data, setData] = useState([]);
  const [ItensCannotBeDeleted, setItensCannotBeDeleted] = useState(false);
  const field = GText.infoDB.Table.Itens.fields.ColetaNumber;

  async function GetItens() {
    let ret = [];
    if (RouteName === GText.MyColetas) {
      ret = await GetItensGrouped(
        GText.infoDB.Table.Itens.fields.Status,
        GText.infoInputs.InitialStatusItem
      );
    }
    if (RouteName === GText.SendedColetas) {
      ret = await GetItensGrouped(
        GText.infoDB.Table.Itens.fields.Status,
        GText.infoInputs.SendedStatusItem,
        GText.infoInputs.CancelStatusItem
      );
    }
    // console.log(ret);
    dataRef.current = OrderList(ret, field, true);
    setData(OrderList(ret, field, true));
  }
  /**
   * OrderList:
   *
   * Receive the List and the Field to order;
   *
   * The default order of list is ASC, to get DESC, set the last argument = True;
   */
  function OrderList(data, field, desc) {
    let list = data;
    if (desc) {
      list.sort((a, b) =>
        Number(a[field]) < Number(b[field])
          ? 1
          : Number(b[field]) < Number(a[field])
          ? -1
          : 0
      );
    } else {
      list.sort((a, b) =>
        Number(a[field]) > Number(b[field])
          ? 1
          : Number(b[field]) > Number(a[field])
          ? -1
          : 0
      );
    }
    return list;
  }
  function FilterList(List, field, input) {
    return List.filter((data) =>
      data[field].toLowerCase().includes(input.toLowerCase())
    );
  }
  function ButtonHeaderRight() {
    if (RouteName == GText.MyColetas) {
      navigation.navigate(GText.NewColeta, {
        data: undefined,
        routeOrigin: RouteName,
      });
    } else if (RouteName == GText.SendedColetas) {
      handleSyncColeta();
    }
  }
  function handleSyncColeta() {
    const routes = Routes();
    navigation.navigate(GText.Syncing, {
      routes: [routes.itens],
      origin: GText.SendedColetas,
    });
  }
  function ButtonHeaderLeft() {
    navigation.openDrawer();
  }
  function OpenConfirmation(data) {
    if (ItensChecked.current > 0) {
      ModalRef.current.setLabel(getLabelModal(data));
      ModalRef.current.toggle();
      ModalRef.current.sendvalue(data);
    } else {
      alert(GText.messageNoItensSelected);
    }
  }
  function ShowItensCannotBeDeleted(params) {
    let Itens = [];
    dataRef.current.forEach((obj) => {
      obj[GText.ItensTotal] !== obj[GText.ItensNotSended] &&
        Itens.push(obj[field]);
    });
    Itens.length > 0 &&
      alert(
        `${GText.messageCannotDeleteItens}:
${JSON.stringify(Itens, null, ",")}`
      );
  }
  async function ButtonModal(origin) {
    let arrayItens = [];
    dataRef.current.forEach((obj) => {
      if (obj.checked === true) {
        arrayItens.push(obj);
      }
    });

    async function routeName(action1, action2, origin) {
      if (RouteName == GText.MyColetas) {
        await action1(arrayItens, origin);
        origin === "left" && ShowItensCannotBeDeleted();
      } else if (RouteName == GText.SendedColetas) {
        await action2(arrayItens, origin);
      }
    }
    if (origin === "left") {
      await routeName(handleDelete, handleCancelColeta, origin);
      ModalRef.current.toggle();
      await GetItens();
      toggleChecedkAll(true);
    } else if (origin == "right") {
      toggleChecedkAll(true);
      await routeName(handleSendColeta, handleSyncColeta);
    }
    setItensCannotBeDeleted(false);
  }
  function handleOpenCheckBox() {
    setShowCheckBox(!showCheckBox);
  }
  function toggleChecedkAll(closelist) {
    CheckedAll.current = !CheckedAll.current;
    handleOnChangeCheckBox(closelist ? false : CheckedAll.current, null, true);
    closelist && setShowCheckBox(false);
  }
  function handleOnChangeCheckBox(checked, param, all) {
    let copyRef = dataRef.current;
    const newDataRef = copyRef.map((obj, index) => {
      if (all) {
        copyRef[index].checked = checked;
      } else {
        if (obj[GText.infoInputs.nColetaNumber] === param) {
          copyRef[index].checked = checked;
        }
      }
      return obj;
    });

    ItensChecked.current = all
      ? checked
        ? 1
        : 0
      : checked
      ? ItensChecked.current + 1
      : ItensChecked.current - 1;
    dataRef.current = newDataRef;
    setData(
      FilterList(dataRef.current, GText.infoInputs.nNameClient, search.current)
    );
  }
  async function handleDelete(arrayItens) {
    for (let i = 0; i < arrayItens.length; i++) {
      if (
        arrayItens[i][GText.ItensNotSended] === arrayItens[i][GText.ItensTotal]
      ) {
        await DeleteItensDB(
          GText.infoDB.Table.Itens.fields.ColetaNumber,
          arrayItens[i][GText.infoDB.Table.Itens.fields.ColetaNumber]
        );
      } else {
        !ItensCannotBeDeleted && setItensCannotBeDeleted(true);
      }
    }
  }
  async function handleSendColeta(data, origin) {
    navigation.navigate(GText.Sending, {
      data: data,
      buttonOrigin: origin,
      routeName: RouteName,
      action: "sending",
    });
  }

  async function handleCancelColeta(data, origin) {
    navigation.navigate(GText.Sending, {
      data: data,
      buttonOrigin: origin,
      routeName: RouteName,
      action: "cancel",
    });
  }
  function getLabelModal(origin) {
    let ret = {};
    function Label(more, one) {
      ret = ItensChecked.current > 1 ? more : one;
    }
    if (RouteName == GText.MyColetas) {
      origin === "right"
        ? Label(GText.labelModalSendColetasHome, GText.labelModalSendColetaHome)
        : Label(
            GText.labelModalDeleteColetasHome,
            GText.labelModalDeleteColetaHome
          );
    } else if (RouteName == GText.SendedColetas) {
      origin === "left"
        ? Label(
            GText.labelModalCancelSendedItens,
            GText.labelModalCancelSendedItem
          )
        : Label(
            GText.labelModalSyncSendedItens,
            GText.labelModalSyncSendedItem
          );
    }
    return ret;
  }
  function Icon() {
    if (RouteName == GText.MyColetas) {
      return Global.IconTrash;
    } else if (RouteName == GText.SendedColetas) {
      return Global.IconCancel;
    } else {
      return Global.IconDefault;
    }
  }
  function RenderHeader() {
    if (showCheckBox) {
      return (
        <Header
          title={GText.Selection}
          name={Global.IconCloseList}
          name2={Global.IconList}
          size={Global.sizeIconHeader}
          color={Global.colorIconHeader}
          onClickLeft={() => {
            toggleChecedkAll(true);
          }}
          onClickRight={() => {
            toggleChecedkAll();
          }}
        />
      );
    } else {
      if (RouteName == GText.MyColetas) {
        return (
          <Header
            title={GText.title}
            name={Global.IconMenu}
            name2={Global.IconNew}
            size={Global.sizeIconHeader}
            color={Global.colorIconHeader}
            onClickLeft={() => {
              ButtonHeaderLeft();
            }}
            onClickRight={() => {
              ButtonHeaderRight();
            }}
          />
        );
      } else if (RouteName == GText.SendedColetas) {
        return (
          <Header
            title={GText.SendedColetas}
            name={Global.IconMenu}
            name2={Global.IconSync}
            size={Global.sizeIconHeader}
            color={Global.colorIconHeader}
            onClickLeft={() => {
              ButtonHeaderLeft();
            }}
            onClickRight={() => {
              ButtonHeaderRight();
            }}
          />
        );
      }
    }
  }
  useEffect(() => {
    isFocused && GetItens();
    return () => {
      ItensChecked.current = 0;
      setShowCheckBox(false);
    };
  }, [isFocused]);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (showCheckBox) {
          toggleChecedkAll(true);
          return true;
        } else {
          Alert.alert(
            GText.objMessageExitApp.title,
            GText.objMessageExitApp.message,
            [
              {
                text: GText.objMessageExitApp.buttonLeft,
                onPress: () => null,
                style: "cancel",
              },
              {
                text: GText.objMessageExitApp.buttonRight,
                onPress: () => BackHandler.exitApp(),
              },
            ]
          );
          return true;
        }
      };
      BackHandler.addEventListener("hardwareBackPress", onBackPress);
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [showCheckBox])
  );
  useEffect(() => {
    return () => {
      //  ModalRef.current.close()
      CheckedAll.current = false;
      ItensChecked.current = 0;
    };
  }, []);
  function setSearch(value) {
    search.current = value;
    setData(
      FilterList(dataRef.current, GText.infoInputs.nNameClient, search.current)
    );
  }
  return (
    <Container>
      <RenderHeader />
      <SearchBox
        placeholder={GText.SearchBox}
        name={Global.iconSearchBox}
        size={Global.sizeIconSearch}
        color={Global.colorIconSearch}
        input={search.current}
        setInput={setSearch}
      />
      <ColetasList
        data={data} //buttonLeft={OpenConfirmation} buttonRight={handleEdit}
        isFocused={isFocused}
        RouteName={RouteName}
        showCheckBox={showCheckBox}
        setShowCheckBox={handleOpenCheckBox}
        handleOnChange={handleOnChangeCheckBox}
      />
      <Line style={{ display: ItensChecked.current > 0 ? "flex" : "none" }}>
        <Button
          name={Icon()}
          size={40}
          color={Global.colorButtonDelete}
          onClick={() => {
            OpenConfirmation("left");
          }}
          style={{ flex: 1 }}
        />
        <Button
          name={
            RouteName === GText.SendedColetas
              ? Global.IconSync
              : Global.IconSend
          }
          size={35}
          color={Global.colorButtonDelete}
          onClick={() => {
            OpenConfirmation("right");
          }}
          style={{ flex: 1 }}
        />
      </Line>
      {showCheckBox && (
        <ConfirmationModal
          ref={ModalRef}
          button={ButtonModal}
          label={getLabelModal()}
        />
      )}
    </Container>
  );
}
export default Home;
