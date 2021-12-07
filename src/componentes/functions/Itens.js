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