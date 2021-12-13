  
import 'react-native-gesture-handler';
import * as React from 'react';
 import {LogBox } from 'react-native';
 LogBox.ignoreLogs(['Reanimated 2']);

import { NavigationContainer } from '@react-navigation/native';
import Main from './src/main'


export default function App() {
  return (
       <NavigationContainer>
           <Main>
          </Main> 
         
        </NavigationContainer>
  );
}


// --openssl-legacy-provider start