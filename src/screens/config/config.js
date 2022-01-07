import React, { useEffect, useRef } from "react";
import {
  useNavigation,
  DrawerActions,
  useFocusEffect,
  useIsFocused,
} from "@react-navigation/core";
import { Container, Text, ViewIcon, View } from "./style.js";
import Header from "../../componentes/header/header.js";
import GText from "../../global/texts.js";
import Global from "../../global/global.js";
import ConfirmationModal from "../../componentes/modalConfirmation/modalConfirmation.js";
import { CommonActions } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import { DeleteOnDB } from "../../services/routesData/routesData.js";
import { BackHandler } from "react-native";

export default function Config({ route }) {
  const ModalRef = useRef();
  const navigate = useNavigation();
  const Menus = [
    {
      name: GText.nameMenuChangeServer,
      icon: Global.IconConfig,
      label: false,
      screen: GText.FormServer,
    },
    {
      name: GText.nameMenuClearData,
      icon: Global.IconTrash,
      label: false,
      screen: GText.SelectToSync,
    },
    {
      name: GText.nameMenuLogoff,
      icon: Global.IconSignOut,
      label: GText.labelModalLogoff,
      screen: GText.Login,
    },
  ];
  const isFocused = useIsFocused();

  function handleOpenDrawer() {
    ResetParamsOfScreens();
    navigate.dispatch(DrawerActions.openDrawer());
  }
  function ResetParamsOfScreens() {
    navigate.dispatch((state) => {
      state.routes.map((obj) => {
        if (obj.name == GText.SelectToSync) {
          obj.params = { origin: GText.Preload };
        }
      });
      return CommonActions.reset({
        ...state,
        stale: true,
      });
    });
  }
  async function GoToScreen(obj) {
    if (obj.screen === GText.Login) {
      await DeleteOnDB(GText.infoDB.Table.Log.name);
      await DeleteOnDB(GText.infoDB.Table.Profile.name);
    }
    navigate.navigate(obj.screen, { origin: GText.Config });
  }
  function handleConfirmationModal(obj) {
    if (obj.label) {
      ModalRef.current.sendvalue(obj);
      ModalRef.current.setLabel(obj.label);
      ModalRef.current.toggle();
    } else {
      GoToScreen(obj);
    }
  }
  function OnBack() {
    ResetParamsOfScreens();
    navigate.navigate(GText.MyColetas);
    return true;
  }
  useFocusEffect(
    React.useCallback(() => {
      BackHandler.addEventListener("hardwareBackPress", OnBack);
      return () => BackHandler.removeEventListener("hardwareBackPress", OnBack);
    }, [])
  );

  return (
    <Container>
      <Header
        title={GText.Config}
        name={Global.IconMenu}
        size={Global.sizeIconHeader}
        color={Global.colorIconHeader}
        onClickLeft={handleOpenDrawer}
      />
      {Menus.map((obj, key) => (
        <View
          key={key}
          onPress={() => {
            handleConfirmationModal(obj);
          }}
          activeOpacity={0.5}
        >
          <Text>{obj.name}</Text>
          <ViewIcon>
            <Icon
              name={obj.icon}
              size={Global.sizeiconsConfig}
              color={Global.blue}
            />
          </ViewIcon>
        </View>
      ))}
      <ConfirmationModal
        ref={ModalRef}
        button={GoToScreen}
        label={GText.labelModalSyncItens}
      />
    </Container>
  );
}
