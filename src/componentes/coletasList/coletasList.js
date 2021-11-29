import React from 'react';
import BoxColeta from './boxColeta';

import {FlatList, SafeAreaView} from './style';

 function ColetasList ({data, buttonLeft, buttonRight}){
   return (
  <FlatList
       data={data}
       renderItem={({item})=>(<BoxColeta data={item} buttonLeft={buttonLeft} buttonRight={buttonRight}/>)}
       keyExtractor={item=>item.IdMobile}
       />       
   )
 }

 export default ColetasList;