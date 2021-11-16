import React from 'react';
import BoxItemColeta from '../boxItemColeta/boxItemColeta';

import { FlatList } from './style';

 const ItensList = ({ itens }) => {
   return (
       <FlatList
       data={itens}
       renderItem={({item})=>(<BoxItemColeta data={item}/>)}
       keyExtractor={item=>item.id}
       />    
   )
 }

 export default ItensList;