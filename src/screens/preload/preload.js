
import React, { useEffect } from "react";
import{useNavigation} from '@react-navigation/native'
import styled from 'styled-components/native'
import Fundo from '../../assets/fundo.svg'
import GText from "../../global/texts";
import { GetProfileDB } from "../../services/routesData/routesData";
import profile from "../../services/SQLite/tables/profile";

export default () => {
    const navigation = useNavigation()

 
    // async function CheckAsync() {
    //     try {
    //         const PrimeiroUso = await GetAsync('PrimeiroUso')
    //         if (PrimeiroUso == undefined) {
    //             CreateLogError()
    //             ListaAsync.map(async (data)=>{
    //               await SetAsync(data, [])
    //             })
    //             await SetAsync("Cod_Importacao",'1')
    //             await SetAsync("PrimeiroUso","Nao")
    //             //OpenApp()
    //             console.log('Primeiro Uso')
    //         }
    //     }
    //     catch (e) { console.log('Preload', e) 
    //     SetLogError("Preload", e)
    // }
    // }
    // async function OpenApp(){
    //         try {
    //           const data = await GetAsync('DadosPerfil')
    //           if(data !== null) {
    //             if (data.token !=""){  
    //                 ListaAsync.map(async (data)=>{
    //                     await Refresh(data)
    //                   })
    //                 navigation.reset({ routes:[{name: 'HomeDrawer'}] })  
    //             }

    //           }
    //           else{   navigation.reset({ routes:[{name: 'Login'}] }) 
    //         CheckAsync()
    //         }
    //         } catch(e) {
    //             console.log('Erro no Verificados de Login',e)
    //   }}
     useEffect(() => {
        async function navigate() {
            const profile = await GetProfileDB()
            if(!profile){
                navigation.reset({ routes:[{name: 'Login'}] })
            }
            else{
              navigation.reset({ routes:[{name: 'HomeDrawer'}] })  
            }
        }
        navigate()      
     }, [])
    return (

        <Container>
            <Fundo width='100%' height='100%' />
            <Modal transparent={true} visible={true}>
                <ViewModal>
                    <LoadingIcon size='large' color='#0C0A0A' />
                </ViewModal>
            </Modal>
        </Container>
    )
}


const Container = styled.SafeAreaView`
background-color: #fff;
flex: 1;
justify-content: center;
align-items: center;
`
const LoadingIcon = styled.ActivityIndicator`
`
const Modal = styled.Modal`
`
const ViewModal = styled.View`
height:100%;
margin-bottom: 35%;
justify-content:flex-end;
flex:1;
`