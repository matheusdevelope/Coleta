import React, { useEffect, useRef, useState } from "react";
import { Animated, BackHandler, Easing, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import NetInfo from "@react-native-community/netinfo";
import {
  CreateOnDB,
  DeleteOnDB,
  GetLogDB,
  GetOnDB,
} from "../../services/routesData/routesData";
import {
  Container,
  TextStyled,
  ViewStyled,
  ScrollView,
  Text,
  ViewLineSyncing,
  TextButton,
} from "./style.js";
import { GetAPI } from "../../services/Api/routesApi";
import GText, { routes } from "../../global/texts";
import Global from "../../global/global";
import { GetDataFormatPT } from "../../componentes/functions/Itens";

export default ({ route }) => {
  const navigate = useNavigation();
  const StatusRef = useRef([]);
  const [show, setShow] = useState(false);

  ////animation
  const [offsetX] = useState(new Animated.Value(-400));
  const translate = Animated.timing(offsetX, {
    toValue: 0,
    duration: 1000,
    easing: Easing.inOut(Easing.linear),
    useNativeDriver: true,
  });
  const reset = Animated.timing(offsetX, {
    toValue: -430,
    duration: 0,
    useNativeDriver: true,
  });
  const animation = Animated.sequence([translate, reset]);
  const transform = { transform: [{ translateX: offsetX }] };
  ////animation
  async function HaveConnection() {
    const Net = await NetInfo.fetch();
    return Net.isConnected;
  }
  async function handleInitialSyncData(origin, routes) {
    await LoopRoutes(routes);
    if (await HaveConnection()) {
      if (origin !== GText.Preload) {
        setShow("Finish");
      } else {
        navigate.navigate(route.params.origin, { origin: GText.Preload });
      }
    } else {
      setShow("NoInternet");
    }
  }
  async function LoopRoutes(RoutesGet) {
    const retLog = await GetLogDB(
      GText.infoDB.Table.Log.fields.action,
      "firstAcess"
    );
    for (let i = 0; RoutesGet.length > i; i++) {
      let Object = {
        NameRoute: "",
        amountRegister: "",
        ItemOnInsert: "",
        Errors: [],
      };
      Object.NameRoute = RoutesGet[i];
      if (await HaveConnection()) {
        StatusRef.current.push({ ...Object });
        setShow(i);
        await CallApi(RoutesGet, i);
        await CreateOnDB(routes.Log, {
          Acao: GText.Log.actions.sync,
          Tipo: GText.Log.types.sync,
          Rota: RoutesGet[i],
          Data: `${GetDataFormatPT()}`,
        });
      } else {
        setShow("NoInternet");
      }
    }
    if (!retLog) {
      await CreateOnDB(routes.Log, {
        Acao: "firstAcess",
        Data: `${GetDataFormatPT()}`,
      });
    }
  }
  async function CallApi(RoutesGet, i) {
    const retPro = await GetOnDB(GText.infoDB.Table.Profile.name);

    ///Get the salesman id to send on param to the get metod api
    const ParamIdSalesman =
      RoutesGet[i] === routes.Itens
        ? retPro[0][GText.infoDB.Table.Profile.fields.id]
        : "";

    try {
      const ret = await GetAPI(RoutesGet[i], ParamIdSalesman);
      StatusRef.current[i].amountRegister = ret.length;
      setShow(i);
      await DeleteOnDB(RoutesGet[i]);
      const ret1 = await GetOnDB(RoutesGet[i]);
      if (true) {
        //ret1.length !== ret.length) {
        // if (RoutesGet[i] === routes.Itens) {
        //   await DeleteOnDB(
        //     RoutesGet[i],
        //     GText.infoDB.Table.Itens.fields.Status,
        //     "<>",
        //     GText.infoInputs.InitialStatusItem
        //   );
        // } else {
        //   await DeleteOnDB(RoutesGet[i]);
        // }

        await InsertOnDb(RoutesGet[i], ret, i);
        StatusRef.current[i].ItemOnInsert = ret.length;
        setShow(i);
      } else {
        StatusRef.current[i].ItemOnInsert = ret.length;
        setShow(i);
      }
    } catch (e) {
      StatusRef.current[i].Errors.push(e);
      await CreateOnDB(routes.Log, {
        Acao: "GetApi on preload",
        Data: `${GetDataFormatPT()}`,
        Erro: e.toString(),
      });
      setShow(i + 1);
    }
  }
  async function InsertOnDb(TableName, data, index) {
    let ret = true;
    let count = 0;
    for (let i = 0; data.length > i; i++) {
      ret = await CreateOnDB(TableName, data[i]);
      if (i - 20 === count) {
        count = i;
        StatusRef.current[index].ItemOnInsert = i;
        setShow(i);
      }
    }
    return ret;
  }
  async function handleSync(clearAll) {
    if (clearAll) {
      StatusRef.current = [];
      setShow(1);
      await handleInitialSyncData(route.params.origin, route.params.routes);
    } else {
      await handleInitialSyncData(route.params.origin, route.params.routes);
    }
  }
  function CountErrors() {
    let ret = 0;
    StatusRef.current.map((obj) => {
      obj.Errors.length > 0 ? (ret = ret + 1) : () => {};
    });
    return ret;
  }
  function handleBack() {
    route.params.origin !== GText.Preload
      ? navigate.goBack()
      : BackHandler.exitApp();
  }
  const onBackPress = () => {
    if ((show === "Finish") | (show === "NoInternet")) {
      return false;
    } else {
      return true;
    }
  };
  useEffect(() => {
    handleSync();
    BackHandler.addEventListener("hardwareBackPress", onBackPress);
    return () => {
      StatusRef.current = [];
      BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    };
  }, []);

  useEffect(() => {
    Animated.loop(animation).start();
  }, [animation]);

  useEffect(() => {
    show === "Finish" && Animated.loop(animation).stop();
  }, [show]);

  function handleTitleHeader() {
    let ret = "";
    ret =
      show === "Finish"
        ? GText.SyncFinish
        : show === "NoInternet"
        ? GText.noInternet
        : GText.Syncing;
    return ret;
  }

  return (
    <Container>
      <Text>{handleTitleHeader()}</Text>
      <Animated.View style={styles.syncProgressBarContainer}>
        <Animated.View style={[transform, styles.syncProgressBar]} />
        <Animated.View style={[transform, styles.syncProgressBar]} />
        <Animated.View style={[transform, styles.syncProgressBar]} />
        <Animated.View style={[transform, styles.syncProgressBar]} />
      </Animated.View>
      <ScrollView>
        {StatusRef.current.map((item, key) => {
          return (
            <ViewStyled
              key={key}
              style={{
                backgroundColor:
                  item.Errors.length > 0 ? Global.redInputs : Global.bluelight3,
              }}
            >
              <TextStyled style={{ fontWeight: "bold" }}>
                {item.NameRoute}
              </TextStyled>
              <TextStyled>
                {GText.ObjectSyncOnPreload.namountRegister}:{" "}
                {item.amountRegister}
              </TextStyled>
              <TextStyled>
                {GText.ObjectSyncOnPreload.nItemOnInsert}: {item.ItemOnInsert}
              </TextStyled>
              {item.Errors.map((item, key) => (
                <TextStyled key={key}>{`${item}`}</TextStyled>
              ))}
            </ViewStyled>
          );
        })}
      </ScrollView>
      {show === "Finish" && (
        <>
          <Text>{GText.totalErrors + ": " + CountErrors()}</Text>
          <ViewLineSyncing
            onPress={() => {
              handleSync(true);
            }}
          >
            <TextButton style={{ color: Global.white }}>
              {GText.messageTryAgainSync}
            </TextButton>
          </ViewLineSyncing>
          <ViewLineSyncing onPress={handleBack}>
            <TextButton style={{ color: Global.white }}>
              {GText.ButtonFinishSync}
            </TextButton>
          </ViewLineSyncing>
        </>
      )}
      {show === "NoInternet" && (
        <>
          <ViewLineSyncing
            onPress={() => {
              handleSync(true);
            }}
          >
            <TextButton style={{ color: Global.white }}>
              {GText.messageTryAgainSync}
            </TextButton>
          </ViewLineSyncing>
          <ViewLineSyncing onPress={handleBack}>
            <TextButton style={{ color: Global.white }}>
              {route.params.origin !== GText.Preload
                ? GText.ButtonFinishSync
                : GText.messageExitApp}
            </TextButton>
          </ViewLineSyncing>
        </>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  headerContentContainer: {
    paddingHorizontal: 25,
    paddingTop: 80,
    paddingBottom: 40,
  },
  syncContentContainer: {
    paddingHorizontal: 25,
    paddingTop: 40,
    paddingBottom: 20,
  },
  title1: {
    fontWeight: "700",
    fontSize: 32,
    color: "#000",
  },
  title3: {
    fontWeight: "700",
    fontSize: 18,
  },
  body2: {
    fontSize: 14,
  },
  syncProgressBarContainer: {
    flexDirection: "row",
  },
  syncProgressBar: {
    height: 4,
    marginHorizontal: 10,
    width: 200,
    backgroundColor: "#0000ff",
  },
});
