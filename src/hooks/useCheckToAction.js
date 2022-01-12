import React from "react";
import { Alert } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import GText, { FormatErrorAPI, Tables } from "../global/texts";
import { GetAPIp } from "../services/Api/routesApi";
import { UpdateItensDB } from "../services/routesData/routesData";

async function HaveConnection() {
  const Net = await NetInfo.fetch();
  return Net.isConnected;
}
export default async function useCheckToAction(data) {
  let retorno = false;
  if (await HaveConnection()) {
    try {
      const ret = await GetAPIp(
        Tables().Itens,
        `${GText.infoDB.Table.Itens.fields.ColetaNumber}=${
          data[GText.infoDB.Table.Itens.fields.ColetaNumber]
        }`
      );
      if (ret.data.length > 0) {
        for (let i = 0; i < ret.data.length; i++) {
          try {
            await UpdateItensDB(
              GText.infoDB.Table.Itens.fields.id,
              ret.data[i][GText.infoDB.Table.Itens.fields.id],
              ret.data[i]
            );
            retorno = true;
          } catch (e) {
            Alert.alert(GText.atention, FormatErrorAPI(e));
          }
        }
      } else {
        Alert.alert(GText.atention, FormatErrorAPI(ret));
      }
    } catch (e) {
      Alert.alert(GText.atention, FormatErrorAPI(e));
    }
  } else {
    Alert.alert(GText.atention, GText.messageCannotActionWithNoInternet);
  }
  return retorno;
}
