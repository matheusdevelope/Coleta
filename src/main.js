import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './screens/home/home'
 import Icon from 'react-native-vector-icons/FontAwesome';
import NewColeta from './screens/newColeta/newColeta';
import GText from './global/texts';
import { Login } from './screens/teste/teste';
// import ColetasEnviadas from './screens/ColetasEnviadas';
// import Configuration from './screens/configuration';
// import EnviarColetas from './screens/EnviarColetas'


export default ({ navigation }) => {
    const Stack = createStackNavigator()
    const Drawer = createDrawerNavigator();

    const Icon1 = ()=>{return(<Icon name="list-alt" size={25} color="#7159c1" />)}
    const Icon2 = ()=>{return(<Icon name="plus-square" size={25} color="#7159c1" />)}
    const Icon3 = ()=>{return(<Icon name="list" size={25} color="#7159c1" />)}
    const Icon4 = ()=>{return(<Icon name="cog" size={25} color="#7159c1" />)}


    const ConfigurationScreen = ()=>{
        return  (
            <Stack.Navigator screenOptions={{ headerShown: false }} >
                <Stack.Screen name='ConfigurationScreen' component={Configuration} options={{
                    animationEnabled: false,
                }}
                />
                <Stack.Screen name='ENVIAR DADOS' component={EnviarColetas} options={{
                    animationEnabled: false,
                }}
                />
            </Stack.Navigator>
        )
    }
    const HomeDrawer= ()=>{
      return (
          
          <Drawer.Navigator initialRouteName={GText.NewColeta}
          drawerContentOptions={{
           // activeTintColor: '#e91e63',
            labelStyle:{fontSize:20},
          }}
          >
            <Drawer.Screen name={GText.NewColeta} component={NewColeta}
            options={{
                animationEnabled: true,
                drawerIcon: Icon2,
            }}
            /> 

            <Drawer.Screen name={GText.MyColetas} component={Home}
            options={{
                animationEnabled: true,
                drawerIcon: Icon1,
            }}
             />

             {/* <Drawer.Screen name="Coletas Enviadas" component={ColetasEnviadas}
            options={{
                animationEnabled: false,
                drawerIcon: Icon3,
            }}
            />
            
            <Drawer.Screen name="Configurações" component={ConfigurationScreen}
            options={{
                animationEnabled: false,
                drawerIcon: Icon4,
            }}
            /> */}
            
          </Drawer.Navigator>
      )
    }
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} >
            {/* <Stack.Screen name='Preload' component={Preload} options={{
                animationEnabled: false,
            }}
            />
            <Stack.Screen name='Login' component={Login} options={{
                animationEnabled: false,
            }}
            /> */}
            <Stack.Screen name='HomeDrawer' component={HomeDrawer} options={{
                animationEnabled: true,
            }} />
          
        </Stack.Navigator>
    )
}