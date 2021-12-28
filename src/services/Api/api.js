// http://54.233.252.63:3200/

import axios from "axios";
import GText from "../../global/texts";
import { CreateServerOnDB, GetServerDefaultOnDB } from "../routesData/routesData";
export async function GetAddresServer() {
    const ret = await GetServerDefaultOnDB()
    // console.log(ret)
    if (ret) {
        return ret[0][GText.infoDB.Table.Server.fields.baseURL]
    } else {
        const ret1 = await CreateServerOnDB(GText.ServerDefault)
        const ret2 = await GetServerDefaultOnDB()
            return ret2[0][GText.infoDB.Table.Server.fields.baseURL]
    }
    return 'http://127.0.0.1:8080/'
}

 const api = axios.create({
     baseURL: ``,
     timeout:3000
 })


export default api