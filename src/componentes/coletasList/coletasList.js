import React, { forwardRef } from 'react';
import GText from '../../global/texts';
import BoxColeta from './boxColeta';

import {FlatList} from './style';

 function ColetasList ({data, buttonLeft, buttonRight, isFocused, RouteName, showCheckBox, setShowCheckBox, checkedState, handleOnChange}, ref){
   return (
  <FlatList
       data={data}
       renderItem={({item, index})=>(<BoxColeta data={item} index={index} buttonLeft={buttonLeft} buttonRight={buttonRight}
        isFocused={isFocused} RouteName={RouteName} showCheckBox={showCheckBox} setShowCheckBox={setShowCheckBox} 
        checkedState={checkedState} handleOnChange={handleOnChange} ref={ref}/>)}
       keyExtractor={item=>item[GText.infoDB.Table.Itens.fields.ColetaNumber]}
       />       
   )
 }

 export default forwardRef(ColetasList);