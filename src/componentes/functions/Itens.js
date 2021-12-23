import GText from "../../global/texts"

export async function SendItem(data) {
    const GT = GText.infoDB.Table.Itens.fields
    const Itens = await GetItensDB(GT.ColetaNumber, data[GT.ColetaNumber])
    const ret = await SendItensAPI(Itens)
    if (ret) {
        await UpdateStatusItensOnDB(GT.ColetaNumber, data[GT.ColetaNumber], GText.infoInputs.SendedStatusItem)
        await GetItens()
    }
    else {
        alert(GText.failedOnSendItens)
    }

}

export function GetDataFormatPT() {
    const DataNow = new Date()
    const GetDate = ('0' + DataNow.getDate()).substr(-2) + "/" + ("0" + (DataNow.getMonth() + 1)).substr(-2) + "/" + DataNow.getFullYear()
    const Hour = ('0' + DataNow.getHours()).substr(-2) + ":" + ('0' + DataNow.getMinutes()).substr(-2)
    const ret = GetDate + ' ' + Hour
    return ret
}