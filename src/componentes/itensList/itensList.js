import React, { useImperativeHandle, forwardRef, useState } from 'react';
import GText from '../../global/texts';
import { CreateItensDB } from '../../services/routesData/routesData';
import BoxItemColeta from '../boxItemColeta/boxItemColeta';
import { FlatList } from './style';


const ItensList = ({ EditItem}, ref) => {
    const [List, setList] = useState([])

    async function InsertItensOnDB() {
        const lenght = List.length
        for (let i = 0; i < lenght; i++) {
            await CreateItensDB(List[i])
        }
    }
    function DeleteItem(data) {
        let copy = List
        const index = copy.findIndex(obj=>obj[GText.infoDB.Table.Itens.fields.Item] === data[GText.infoDB.Table.Itens.fields.Item])
        copy.splice(index, 1)
        setList([...copy])
    }
    

    useImperativeHandle(ref, () => ({
        InsertOnList: (data) => {
            setList([...List, data])
        },
        InsertOnDB: () => {
            InsertItensOnDB()
    }
  }));
return (
    <FlatList
        ref={ref}
        data={List}
        renderItem={({item}) => (<BoxItemColeta data={item} DeleteItem={DeleteItem} EditItem={EditItem}/>)}
        keyExtractor={item => item[GText.infoDB.Table.Itens.fields.Item]}
    />

)
}

export default forwardRef(ItensList);