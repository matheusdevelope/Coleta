import { Profile } from "../../../DadosOffline/Coletas Lista"

export async function SignInAPI(data) {
    let ret = true
    //conect and veryfy login profile to DB online
    //returns the data Profile user

    //after send with sucess
//provisorio
    if('erro' !== 'err'){
        return await Profile
    }
    else{
        return false
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
