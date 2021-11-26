import React, { useImperativeHandle, forwardRef, useState, useRef } from 'react';
import GText from '../../global/texts';
import { CreateItensDB } from '../../services/routesData/routesData';
import BoxItemColeta from '../boxItemColeta/boxItemColeta';
import { FlatList } from './style';


const ItensList = ({ EditItem }, ref) => {
    const [List, setList] = useState([])
    const ControlEditing = useRef(false)
    const field = GText.infoDB.Table.Itens.fields.Item

    function handleEditItem(data){
        if(!ControlEditing.current){
            EditItem(data)
            DeleteItem(data)
            ControlEditing.current = true
        }else{
            alert('Termine de editar o item anterior')
        }
    }
    async function InsertItensOnDB() {
        const lenght = List.length
        for (let i = 0; i < lenght; i++) {
            await CreateItensDB(List[i])
        }
    }
    function DeleteItem(data) {
        let copy = List
        const index = copy.findIndex(obj => obj[field] === data[field])
        copy.splice(index, 1)
        setList([...copy])
    }

    useImperativeHandle(ref, () => ({
        InsertOnList: (data) => {
            //this enable the next item edit
            ControlEditing.current = false
            //Insert New Item on List
            let copyList = List
            copyList.push(data)
            //Order list by selected field
            copyList.sort((a, b) => Number(a[field]) > Number(b[field]) ? 1 : Number(b[field]) > Number(a[field]) ? -1 : 0)
            //Refresch list with news itens
            setList([...copyList])
        },
        InsertOnDB: () => {
            InsertItensOnDB()
        }
    }));
    return (
        <FlatList
            ref={ref}
            data={List}
            renderItem={({ item }) => (<BoxItemColeta data={item} DeleteItem={DeleteItem} EditItem={handleEditItem} />)}
            keyExtractor={item => item[field]}
        />
    )
}

export default forwardRef(ItensList);