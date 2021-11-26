import { GetProfileDB } from "../services/routesData/routesData"

const GText = {
    title: 'Coletas',
    MyColetas: 'Minhas Coletas',
    SendedColetas: 'Coletas Enviadas',
    NewColeta: 'Nova Coleta',
    Config: 'Configurações',
    Send: 'Enviar',
    Cancel: 'Cancelar',
    SearchBox: 'Nome Cliente',
    Include: 'Incluir',
    Details: 'Detalhes Coleta',

    money: 'R$',
    TitleDeleteItem: 'Deletar Coleta',
    DeleteItem: 'Deletar',
    CancelDelete: 'Voltar',
    MessageDelete: 'Essa coleta ainda não foi enviada, tem certeza que deseja excluir?',


    infoInputs: {
        nIdMobile: 'IdMobile',
        nCodImport: 'Cod_Importacao',
        nCodCompany: 'CodEmpresa',
        nCodBranch: 'CodFilial',
        nBranch: 'Filial',
        nCodSalesmanI: 'CodVendedorIndex',
        nCodPriority: 'CodPrioridade',
        nColetaDate: 'DataColeta',
        nCodSalesman: 'CodVendedor',
        nCodCollector: 'CodColetador',
        nCodTechnician: 'CodTecnico',
        nCodClient: 'CodCliente',
        nCodSituation: 'CodSituacao',
        nSituation: 'Situacao',
        nCodProduct: 'CodProduto',
        nCodBrand: 'CodMarca',
        nCodType: 'CodTipo',
        nCodCancel: 'CodCancelamento',
        nItem: 'Item',
        nColetaNumber: 'NumeroColeta',
        nStatus: 'Status',
        nInclusionDate: 'DataLancamento',
        nInclusionHour: 'HoraLancamento',
        nInclusionUser: 'UsuarioLancamento',
        nInclusionStation: 'EstacaoLancamentos',
        nDate: 'DataEmissao',
        nNameClient: 'NomeCliente',
        nIdIdentityClient: 'CPF_CNPJ',
        nPhone: 'Celular',
        nWarranty: 'Garantia',
        nCodWarranty: 'CodGarantia',
        nImportColeta: "ImportaColeta",
        nNameProduct: 'NomeProduto',
        nSerieNumber: 'NumeroSerie',
        nBrand: 'Marca',
        nModelo: 'Modelo',
        nDimension: 'Dimensao',
        nDesign: 'Desenho',
        nFireNumber: 'NumeroFogo',
        nDotNumber: 'NumeroDot',
        nBoard: 'Placa',
        nServicesExec: 'ServicosExecutar',
        nInitialExam: 'ExameInicial',
        nObservation: 'Observacao',
        nValue: 'Valor',
        nCancelObservation: 'ObservacaoCancelamento',
        nCancelDate: 'DataCancelamento',
        nCancelHour: 'HoraCancelamento',
        nCancelUser: 'UsuarioCancelamento',
        nCancelStation: 'EstacaoCancelamento',

        pIdMobile: 'IdMobile',
        pCodImport: 'Cod_Importacao',
        pCodCompany: 'CodEmpresa',
        pCodBranch: 'CodFilial',
        pBranch: 'Filial',
        pCodSalesman: 'CodVendedorIndex',
        pCodPriority: 'CodPrioridade',
        pColetaDate: 'DataColeta',
        pCodSalesman: 'CodVendedor',
        pCodCollector: 'CodColetador',
        pCodTechnician: 'CodTecnico',
        pCodClient: 'CodCliente',
        pCodSituation: 'CodSituação',
        pSituation: 'Situação',
        pCodProduct: 'CodProduto',
        pCodBrand: 'CodMarca',
        pCodType: 'CodTipo',
        pCodCancel: 'CodCancelamento',
        pCodWarranty: 'CodGarantia',
        pItem: 'Item',
        pColetaNumber: 'Coleta',
        pStatus: 'Status',
        pInclusionDate: 'DataLancamento',
        pInclusionHour: 'HoraLancamento',
        pInclusionUser: 'UsuarioLancamento',
        pInclusionStation: 'EstacaoLancamentos',
        pDate: 'DataEmissao',
        pNameClient: 'Cliente',
        pIdIdentityClient: 'CPF_CNPJ',
        pPhone: 'Celular',
        pWarranty: 'Garantia',
        pImportColeta: "ImportaColeta",
        pNameProduct: 'NomeProduto',
        pSerieNumber: 'Série:',
        pBrand: 'Marca:',
        pModelo: 'Modelo',
        pDimension: 'Bitola:',
        pDesign: 'Desenho:',
        pFireNumber: 'NumeroFogo',
        pDotNumber: 'NumeroDot',
        pBoard: 'Placa:',
        pServicesExec: 'Serviços a executar',
        pInitialExam: 'ExameInicial',
        pObservation: 'Observação:',
        pValue: '00,00',
        pCancelObservation: 'ObservacaoCancelamento',
        pCancelDate: 'DataCancelamento',
        pCancelHour: 'HoraCancelamento',
        pCancelUser: 'UsuarioCancelamento',
        pCancelStation: 'EstacaoCancelamento',


        fiedlsHide: {
            CodImport: 'Cod_Importacao',
            CodCompany: 'CodEmpresa',
            CodBranch: 'CodFilial',
            CodSalesmanI: 'CodVendedorIndex',
            CodPriority: 'CodPrioridade',
            ColetaDate: 'DataColeta',
            CodSalesman: 'CodVendedor',
            CodCollector: 'CodColetador',
            CodTechnician: 'CodTecnico',
            CodClient: 'CodCliente',
            CodProduct: 'CodProduto',
            CodBrand: 'CodMarca',
            CodType: 'CodTipo',
            CodCancel: 'CodCancelamento',
            CodWarranty: 'CodGarantia',
            CodSituation: 'CodSituacao',
            Item: 'Item',
            HigherItem: 'MaiorItem',
            ColetaNumber: 'NumeroColeta',
            Status: 'Status',
            InclusionDate: 'DataLancamento',
            InclusionHour: 'HoraLancamento',
            InclusionUser: 'UsuarioLancamento',
            InclusionStation: 'EstacaoLancamentos',
            Date: 'DataEmissao',
            IdIdentityClient: 'CPF_CNPJ',
            Phone: 'Celular',
            ImportColeta: "ImportaColeta",
            NameProduct: 'NomeProduto',
            Modelo: 'Modelo',
            FireNumber: 'NumeroFogo',
            DotNumber: 'NumeroDot',
            InitialExam: 'ExameInicial',
            CancelObservation: 'ObservacaoCancelamento',
            CancelDate: 'DataCancelamento',
            CancelHour: 'HoraCancelamento',
            CancelUser: 'UsuarioCancelamento',
            CancelStation: 'EstacaoCancelamento',
        },
        InitialStatusItem:'Recebido',
        InitialPlatform:'Coleta Mobile',   ///pegar o nome do dispositivo
        InitialImportValue:'Sim',
    },
    infoDB: {
        Table: {
            Itens: {
                name: 'Coletas',
                fields: {
                    IdMobile: 'IdMobile',
                    CodImport: 'Cod_Importacao',
                    CodCompany: 'CodEmpresa',
                    CodBranch: 'CodFilial',
                    Branch:'Filial',
                    CodSalesmanI: 'CodVendedorIndex',
                    CodPriority: 'CodPrioridade',
                    ColetaDate: 'DataColeta',
                    CodSalesman: 'CodVendedor',
                    CodCollector: 'CodColetador',
                    CodTechnician: 'CodTecnico',
                    CodClient: 'CodCliente',
                    CodSituation: 'CodSituacao',
                    CodProduct: 'CodProduto',
                    Situation:'Situacao',
                    CodBrand: 'CodMarca',
                    CodType: 'CodTipo',
                    CodCancel: 'CodCancelamento',
                    CodWarranty:'CodGarantia',
                    Item: 'Item',
                    ColetaNumber: 'NumeroColeta',
                    Status: 'Status',
                    InclusionDate: 'DataLancamento',
                    InclusionHour: 'HoraLancamento',
                    InclusionUser: 'UsuarioLancamento',
                    InclusionStation: 'EstacaoLancamentos',
                    Date: 'DataEmissao',
                    NameClient: 'NomeCliente',
                    IdIdentityClient: 'CPF_CNPJ',
                    Phone: 'Celular',
                    Warranty: 'Garantia',
                    ImportColeta: "ImportaColeta",
                    NameProduct: 'NomeProduto',
                    SerieNumber: 'NumeroSerie',
                    Brand: 'Marca',
                    Modelo: 'Modelo',
                    Dimension: 'Dimensao',
                    Design: 'Desenho',
                    FireNumber: 'NumeroFogo',
                    DotNumber: 'NumeroDot',
                    Board: 'Placa',
                    ServicesExec: 'ServicosExecutar',
                    InitialExam: 'ExameInicial',
                    Observation: 'Observacao',
                    Value: 'Valor',
                    CancelObservation: 'ObservacaoCancelamento',
                    CancelDate: 'DataCancelamento',
                    CancelHour: 'HoraCancelamento',
                    CancelUser: 'UsuarioCancelamento',
                    CancelStation: 'EstacaoCancelamento',
                }
            },
            Clients: {
                name: 'Clientes',
                fields: {
                    id: 'CodCliente',
                    name: 'Nome',
                    fantasyName: 'NomeFantasia',
                    phone: 'Telefone',
                    cellphone: 'Celular',
                    identityClient: 'CNPJ_CPF'
                }
            },
            Brands: {
                name: 'Marcas',
                fields: {
                    id: 'CodMarca',
                    name: 'Nome',
                    fantasyName: 'NomeFantasia',
                    phone: 'Telefone',
                    cellphone: 'Celular',
                    identityClient: 'CNPJ_CPF'
                }
            },
            Profile: {
                name: 'Perfil',
                fields: {
                    id: 'CodVendedor',
                    name: 'Nome',
                    email: 'Email',
                    company: 'CodEmpresa',
                    defaultBranch: 'FilialPadrao',
                    initSequence: 'InicioSequenciaColeta',
                    finalSequence: 'FimSequenciaColeta'
                }
            },
            Company: {
                name: 'Empresa',
                fields: {
                    id: 'CodEmpresa',
                    name: 'Nome',
                }
            },
            Branch: {
                name: 'Filial3',
                fields: {
                    id: 'CodFilial',
                    name: 'Nome',
                    category: 'Categoria',
                }
            },
            Situation: {
                name: 'Situacao',
                typeKey: 'INTEGER',
                fields: {
                    id: 'CodSituacao',
                    name: 'Descricao'
                }
            },
            Warranty: {
                name: 'Garantia',
                typeKey: 'TEXT',
                fields: {
                    id: 'CodGarantia',
                    name: 'Descricao'
                }

            }
        }
    },
}

export const fiedlsHide = [
    { name: GText.infoInputs.fiedlsHide.CodImport, initialData: null },
    { name: GText.infoInputs.fiedlsHide.CodCompany },
    { name: GText.infoInputs.fiedlsHide.CodSalesmanI },
    { name: GText.infoInputs.fiedlsHide.CodPriority },
    { name: GText.infoInputs.fiedlsHide.ColetaDate },
    { name: GText.infoInputs.fiedlsHide.CodSalesman },
    { name: GText.infoInputs.fiedlsHide.CodCollector },
    { name: GText.infoInputs.fiedlsHide.CodTechnician },
    { name: GText.infoInputs.fiedlsHide.CodClient },
    { name: GText.infoInputs.fiedlsHide.CodProduct },
    { name: GText.infoInputs.fiedlsHide.CodBrand },
    { name: GText.infoInputs.fiedlsHide.CodType },
    { name: GText.infoInputs.fiedlsHide.CodCancel },
    { name: GText.infoInputs.fiedlsHide.Item },
    { name: GText.infoInputs.fiedlsHide.HigherItem},
    { name: GText.infoInputs.fiedlsHide.ColetaNumber },
    { name: GText.infoInputs.fiedlsHide.Status },
    { name: GText.infoInputs.fiedlsHide.InclusionHour },
    { name: GText.infoInputs.fiedlsHide.InclusionUser },
    { name: GText.infoInputs.fiedlsHide.InclusionStation },
    { name: GText.infoInputs.fiedlsHide.InclusionDate },
    { name: GText.infoInputs.fiedlsHide.IdIdentityClient },
    { name: GText.infoInputs.fiedlsHide.Phone },
    { name: GText.infoInputs.fiedlsHide.ImportColeta },
    { name: GText.infoInputs.fiedlsHide.NameProduct },
    { name: GText.infoInputs.fiedlsHide.Modelo },
    { name: GText.infoInputs.fiedlsHide.FireNumber },
    { name: GText.infoInputs.fiedlsHide.DotNumber },
    { name: GText.infoInputs.fiedlsHide.InitialExam },
    { name: GText.infoInputs.fiedlsHide.CancelObservation },
    { name: GText.infoInputs.fiedlsHide.CancelDate },
    { name: GText.infoInputs.fiedlsHide.CancelHour },
    { name: GText.infoInputs.fiedlsHide.CancelUser },
    { name: GText.infoInputs.fiedlsHide.CancelStation },
    { name: GText.infoInputs.fiedlsHide.CodSituation },
    { name: GText.infoInputs.fiedlsHide.CodBranch },
    { name: GText.infoInputs.fiedlsHide.CodWarranty }
]

export default GText