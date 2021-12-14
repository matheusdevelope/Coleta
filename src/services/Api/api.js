// http://54.233.252.63:3200/

import axios from "axios";
import GText from "../../global/texts";
import { CreateServerOnDB, GetServerDefaultOnDB } from "../routesData/routesData";
async function GetAddresServer() {
    const ret = await GetServerDefaultOnDB()
    if (ret) {
        return ret
    } else {
        const ret1 = await CreateServerOnDB(GText.ServerDefault)
        if (ret1) {
            return ret1[0][GText.infoDB.Table.Server.fields.baseURL]
        }
        else (
            alert('Failed on find and define the default server!')
        )
    }
    return 'http://127.0.0.1:8080/'
}

const api = axios.create({
        baseURL: `${GText.ServerDefault.BaseURL}`
    })
export default api