import React, { useImperativeHandle, forwardRef, useState } from 'react';
import { useEffect } from 'react/cjs/react.development';
import GText from '../../global/texts';
import BoxItemColeta from '../boxItemColeta/boxItemColeta';
import { Container, FlatList } from './style';


const ItensList = ({ itens }, ref) => {
  const [List, setList] = useState([])
  useImperativeHandle(ref, () => ({
    Insert: (data) => {
      let copy = List
      copy.push(data)
      toggle(copy)
    }
  }));
  function toggle(data) {
    console.log('Set List')
    setList(data)
  }
  console.log('fora Set List')
  return (
       <FlatList
       ref={ref}
       data={List}
       renderItem={({item})=>(<BoxItemColeta data={item}/>)}
       keyExtractor={item=>item[GText.infoDB.Table.Itens.fields.IdMobile]}
       /> 

  )
}

export default forwardRef(ItensList);