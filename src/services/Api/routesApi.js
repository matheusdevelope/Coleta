
import { Profile } from "../../../DadosOffline/Coletas Lista"
import api, { GetAddresServer } from "./api"

export async function SignInAPI(data) {
    

  //  console.log(await GetOnDB(GText.infoDB.Table.Profile.fields))
    let ret = true
    //conect and veryfy login profile to DB online
    //returns the data Profile user

    //after send with sucess
    //provisorio
    if ('erro' !== 'err') {
        return await Profile
    }
    else {
        return false
    }
}

export async function GetAPI(route, params) {
    let url = await GetAddresServer()
    url = url + route
    if(params !== undefined){
    url = url + '/' + params
    }

  //  console.log(url)
   // const ret = await API.GetItensDB(`Coletas/${data.Cod_Importacao}`)

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
   // let ret = false
    let url = await GetAddresServer()
    url = url + "Coletas"
    if(params !== undefined){
    url = url + '/' + params
    }

    console.log(url)
   // const ret = await API.GetItensDB(`Coletas/${data.Cod_Importacao}`)

    try {
        const resp = await api.post(url, data);
        return await resp.data
    } catch (err) {
        return Promise.reject(err);
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