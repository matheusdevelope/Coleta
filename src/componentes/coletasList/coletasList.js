import React from 'react';
import GText from '../../global/texts';
import BoxColeta from './boxColeta';

import {FlatList} from './style';

 function ColetasList ({data, buttonLeft, buttonRight, isFocused, RouteName}){
   return (
  <FlatList
       data={data}
       renderItem={({item})=>(<BoxColeta data={item} buttonLeft={buttonLeft} buttonRight={buttonRight} isFocused={isFocused} RouteName={RouteName} />)}
       keyExtractor={item=>item[GText.infoDB.Table.Itens.fields.ColetaNumber]}
       />       
   )
 }

 export default ColetasList;