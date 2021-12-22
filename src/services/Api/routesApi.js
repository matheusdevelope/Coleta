import { Profile } from "../../../DadosOffline/Coletas Lista"
import api, { GetAddresServer } from "./api"

export async function SignInAPI(data) {
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
    try {
        const resp = await api.get(url);
        return await resp.data
    } catch (err) {
        return Promise.reject(err);
    }

}


/**
 * 
 * - Needs a array with Coletas object to send to DB online
 * 
 * - Retuns a bolean, true(sucess), false(failed)
 */
export async function SendItensAPI(data) {
    let ret = true
    //conect and send itens to DB online

    //after send with sucess
    return await ret
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