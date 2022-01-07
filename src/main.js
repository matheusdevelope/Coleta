import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "./screens/home/home";
import Icon from "react-native-vector-icons/FontAwesome";
import GText from "./global/texts";
import Details from "./screens/details/details";
import NewColeta from "./screens/newColeta/newColeta";
import Preload from "./screens/preload/preload";
import login from "./screens/login/login";
import SelectItenstoSync from "./screens/sync/selectItenstoSync";
import Global from "./global/global";
import Syncing from "./screens/sync/syncing";
import Sending from "./screens/sending/sending";
import FormAltServer from "./screens/formAltServer/formAltServer";
import Config from "./screens/config/config";

export default ({ navigation }) => {
  const Stack = createStackNavigator();
  const Drawer = createDrawerNavigator();

  const Icon1 = () => {
    return <Icon name="list-alt" size={25} color="#7159c1" />;
  };
  const Icon2 = () => {
    return <Icon name="plus-square" size={25} color="#7159c1" />;
  };
  const Icon3 = () => {
    return <Icon name={Global.IconList} size={25} color="#7159c1" />;
  };
  const Icon4 = () => {
    return <Icon name={Global.IconSync} size={25} color="#7159c1" />;
  };
  const Icon5 = () => {
    return <Icon name={Global.IconConfig} size={25} color="#7159c1" />;
  };

  const HomeDrawer = () => {
    return (
      <Drawer.Navigator
        initialRouteName={GText.MyColetas}
        drawerContentOptions={{
          // activeTintColor: '#e91e63',
          labelStyle: { fontSize: 20 },
        }}
      >
        <Drawer.Screen
          name={GText.NewColeta}
          component={NewColeta}
          options={{
            animationEnabled: true,
            drawerIcon: Icon2,
          }}
          ///The initialParams is needed to reset params to NewColeta
          initialParams={{ data: undefined }}
        />

        <Drawer.Screen
          name={GText.MyColetas}
          component={Home}
          options={{
            animationEnabled: true,
            drawerIcon: Icon1,
          }}
        />

        <Drawer.Screen
          name={GText.SendedColetas}
          component={Home}
          options={{
            animationEnabled: true,
            drawerIcon: Icon3,
          }}
        />
        <Drawer.Screen
          name={GText.SelectToSync}
          component={SelectItenstoSync}
          options={{
            animationEnabled: true,
            drawerIcon: Icon4,
          }}
          initialParams={{ origin: GText.Preload }}
        />

        <Drawer.Screen
          name={GText.Config}
          component={Config}
          options={{
            animationEnabled: false,
            drawerIcon: Icon5,
          }}
        />
      </Drawer.Navigator>
    );
  };

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={GText.Preload}
        component={Preload}
        initialParams={{ origin: GText.Preload }}
        options={{
          animationEnabled: true,
        }}
      />
      <Stack.Screen
        name={GText.FormServer}
        component={FormAltServer}
        options={{
          animationEnabled: true,
        }}
      />
      <Stack.Screen
        name={GText.Config}
        component={Config}
        options={{
          animationEnabled: true,
        }}
      />
      <Stack.Screen
        name={GText.Login}
        component={login}
        options={{ animationEnabled: true }}
      />
      <Stack.Screen
        name={GText.HomeDrawer}
        component={HomeDrawer}
        options={{
          animationEnabled: true,
        }}
      />
      <Stack.Screen
        name={GText.Details}
        component={Details}
        options={{
          animationEnabled: true,
        }}
      />
      <Stack.Screen
        name={GText.Syncing}
        component={Syncing}
        options={{
          animationEnabled: true,
        }}
      />
      <Stack.Screen
        name={GText.Sending}
        component={Sending}
        options={{
          animationEnabled: true,
        }}
      />
    </Stack.Navigator>
  );
};
