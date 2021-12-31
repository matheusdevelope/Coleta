
import { Profile } from "../../../DadosOffline/Coletas Lista"
import { tables } from "../../global/texts"
import api, { GetAddresServer } from "./api"

export async function SignInAPI(data, params) {
    let url = await GetAddresServer()
    url = url + tables.Profile + '/Login'
    if (params !== undefined) {
        url = url + '/' + params 
    }
    try {
        const resp = await api.post(url, data);
        return await resp.data
    } catch (err) {
        return Promise.reject(err);
    }
}

export async function GetAPI(route, params) {
    let url = await GetAddresServer()
    url = url + route
    if (params !== undefined) {
        url = url + '/' + params
    }
    try {
        const resp = await api.get(url);
        return await resp.data
    } catch (err) {
        return Promise.reject(err);
    }
}
export async function TestServerAPI(route) {
    try {
        const resp = await api.get(route);
        return resp
    } catch (err) {
        // return Promise.reject(err.response);
        return Promise.reject(err);
    }
}

/**
 * 
 * - Needs a array with Coletas object to send to DB online
 * 
 * - Retuns a boolean, true(sucess), false(failed)
 */
export async function SendItensAPI(data, params) {
    let url = await GetAddresServer()
    url = url + tables.Itens
    if (params !== undefined) {
        url = url + '/' + params
    }
    try {
        const resp = await api.post(url, data);
        return await resp.data
        
    } catch (err) {
        if(err.response !== undefined){
           if(err.response.status === 400){
            return Promise.reject(err.response.data.errors) 
        }
        else{
            return Promise.reject(err)
        } 
        }
        else{
            return Promise.reject(err)
        }
        
        
    }
}
export async function CancelItensAPI(data) {
    let ret = true
    //conect and send itens to DB online

    //after send with sucess
    return await ret
}




// routes.post('/Coletas', Coletas.store )
// routes.get('/Coletas', Coletas.index)
// routes.get('/Coletas/:Cod_Importacao', Coletas.indexByCod_Importacao)
// routes.put('/Coletas', Coletas.CancelColetas)


// routes.get('/Clientes', Cliente.index)
// routes.post('Clientes', Cliente.store)
// routes.get('/Marcas', Marca.index)
// routes.post('Marcas', Marca.store)

// routes.get('/', (req, res) => {
//     res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
//   }); 