import React, { useImperativeHandle, forwardRef, useState, useRef } from 'react';
import { useEffect } from 'react/cjs/react.development';
import GText from '../../global/texts';
import { CreateItensDB, DeleteItensDB, GetItensDB } from '../../services/routesData/routesData';
import BoxItemColeta from '../boxItemColeta/boxItemColeta';
import { FlatList } from './style';


const ItensList = ({ EditItem, itens, isFocused, details, refresh }, ref) => {
    const [List, setList] = useState([])
    const ControlEditing = useRef(false)
    const field = GText.infoDB.Table.Itens.fields.Item

    async function InsertItensOnDB() {
        async function insert() {
            const lenght = List.length
            for (let i = 0; i < lenght; i++) {
                await CreateItensDB(List[i])
            }
        }
        if (itens !== undefined) {
            await DeleteItensDB(GText.infoDB.Table.Itens.fields.ColetaNumber, itens[GText.infoDB.Table.Itens.fields.ColetaNumber])
            await insert()
        } else {
            await insert()
        }
    }
    function handleEditItem(data) {
        if (EditItem !== undefined) {
            if (!ControlEditing.current) {
                EditItem(data)
                DeleteItem(data)
                ControlEditing.current = true
            } else {
                alert('Termine de editar o item anterior!')
            }
        }
    }
    async function DeleteItem(data) {
        if (itens !== undefined & details) {
            await DeleteItensDB(GText.infoDB.Table.Itens.fields.IdMobile, data[GText.infoDB.Table.Itens.fields.IdMobile])
            await refresh()
        }
        let copy = List
        const index = copy.findIndex(obj => obj[field] === data[field])
        copy.splice(index, 1)
        setList([...copy])
    }
    function VerifyAndChangeClient(list, newItem) {
        if (list[0][GText.infoInputs.nCodClient] !== newItem[GText.infoInputs.nCodClient]) {
            list.forEach((obj) => {
                obj[GText.infoInputs.nCodClient] = newItem[GText.infoInputs.nCodClient]
                obj[GText.infoInputs.nNameClient] = newItem[GText.infoInputs.nNameClient]
            })
            return list
        } else {
            return list
        }
    } 
    function CreateList(data) {
        //this enable the next item edit
        ControlEditing.current = false
        //Insert New Item on List
        let copyList = List
        copyList.push(data)
        copyList = VerifyAndChangeClient(copyList, data)
        //Order list by selected field
        copyList.sort((a, b) => Number(a[field]) > Number(b[field]) ? 1 : Number(b[field]) > Number(a[field]) ? -1 : 0)
        //Refresch list with news itens
        setList([...copyList])
    }
    async function GetData() {
        const ret = await GetItensDB(GText.infoDB.Table.Itens.fields.ColetaNumber, itens[GText.infoDB.Table.Itens.fields.ColetaNumber])
        setList(ret)
    }

    useImperativeHandle(ref, () => ({
        InsertOnList: (data) => {
            CreateList(data)
        },
        InsertOnDB: async () => {
            await InsertItensOnDB()
        },
        resetList: () => {
            setList([])
        },
        getData:()=>{
            return List
        }
    }));
    useEffect(() => {
        if (isFocused) {
            itens !== undefined &&
                GetData()
        }
        return()=>{
            ControlEditing.current = false
            setList([])
        }
    }, [isFocused])
    
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