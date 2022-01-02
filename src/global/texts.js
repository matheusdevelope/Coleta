import { GetProfileDB } from "../services/routesData/routesData"


const DataNow = new Date()
export const HourFormat = (DataNow.getHours().toString() + ":" + DataNow.getMinutes().toString()).toString()
export const DateFormat = FormatDate(DataNow)
export function FormatDate(date) {
    let NewDate = date.toISOString().split('T')[0] + ' ' + date.toTimeString().split(' ')[0]
    return  NewDate
}
const GText = {
    title: 'Coletas',
    MyColetas: 'Minhas Coletas',
    SendedColetas: 'Coletas Enviadas',
    NewColeta: 'Nova Coleta',
    EditColeta: 'Editar Coleta',
    Config: 'Configurações',
    Preload: 'Preload',
    Login: 'Login',
    HomeDrawer: 'HomeDrawer',
    FormServer: 'Alterar Server',
    AddServer: 'Adicionar Server',
    SelectToSync: 'Sincronizar Dados',
    SelectToDelete: 'Excluir Dados',
    Syncing: 'Sincronizando Dados',
    SyncFinish: 'Dados Sincronizados!',
    Sending: 'Enviando Coletas',
    SendFinish: 'Coletas Enviadas',
    messageLastSync: 'Última Att.',
    messageDeleted: 'Deletado',
    messageTryAgainSync: 'Tentar Novamente',
    messageExitApp: 'Sair do aplicativo',
    objMessageExitApp: {
        title: 'Sair',
        message: 'Deseja sair do aplicativo?',
        buttonLeft: 'Continuar',
        buttonRight: 'Sair'
    },
    objSendingItens: {
        totalToSend: 'Coletas para Enviar',
        sended: 'Coletas Enviadas',
        error: 'Coletas com Erros'
    },
    noInternet: 'Sem Conexão com a Internet!',
    totalErrors: 'Total de Erros',
    Send: 'Enviar',
    Cancel: 'Cancelar',
    SearchBox: 'Nome Cliente',
    Include: 'Incluir',
    Details: 'Detalhes Coleta',
    Selection: 'Selecionar Itens',
    LoginMessage: 'Faça seu login!',
    AlterServerMessage: 'Conexão com o Servidor',
    ButtonSignIn: 'Entrar',
    ButtonFinishSync: 'Voltar',
    failedOnSendItens: 'Falha ao enviar coleta para o retaguarda!',
    failedOnCancelItens: 'Falha ao cancelar coleta no retaguarda!',
    messageNoItensSelected: 'Selecione pelo menos um item!',
    placeholderPasswordLogin: 'Insira sua senha',
    placeholderEmailLogin: 'Insira seu email',
    money: 'R$',
    yes: 'Sim',
    no: 'Não',

    nameMenuLogoff: 'Sair da Conta',
    nameMenuChangeServer: 'Configurar Servidor',
    nameMenuClearData: 'Limpar dados',
    //ServerDefault needs be = the model of InfoDB.Table.Server.Fields
    PlaceholderFormServer: {
        PT: {
            BaseURL: 'URL Completa',
            CodServer: 'ID Server',
            Descricao: 'Descrição Servidor',
            Extra: 'Dados extras',
            Ip: 'IP ou DNS',
            Nome: 'Nome Servidor',
            Padrao: 'Servidor Padrão',
            Porta: 'Porta Servidor',
            Prioridade: 'Prioridade Servidor',
            Protocolo: 'Protocolo Conexão',
            RotaTeste: 'Rota Teste',
            data: 'Data'
        },
        EN: {
            name: 'Nome Servidor',
            description: 'Descrição do Servidor',
            protocol: 'Protocolo (http / https)',
            ip: 'IP ou DNS',
            port: 'Porta do Servidor',
            baseURL: 'URL Completa',
            priority: 'Prioridade do Servidor',
            default: 'Servidor Padrão',
            extra: 'Dados extras'
        }
    },
    ServerDefault: {
        Nome: 'Server Padrão',
        Descricao: 'Server AWS',
        Protocolo: 'http',
        Ip: '54.233.252.63',
        Porta: '3200',
        BaseURL: 'http://54.233.252.63:3200/',
        Prioridade: 1,
        Padrao: 'S',
        Extra: ''
    },
    ServerDefaultLocal: {
        Nome: 'Server Local',
        Descricao: 'Apenas para debug',
        Protocolo: 'http',
        Ip: '192.168.100.15',
        Porta: '3200',
        BaseURL: 'http://192.168.0.88:3200/',
        Prioridade: 1,
        Padrao: 'S',
        Extra: ''
    },
    ObjectSyncOnPreload: {
        nNameRoute: 'Rota',
        namountRegister: 'Total de Itens',
        nItemOnInsert: 'Itens Registrados',
        nErrors: [],
        nNameError: 'Erros'
    },
    ValueDefaultServer: 'S',
    labelModalLogoff: {
        title: 'Desconectar sua conta',
        message: 'Seus dados não sincronizados serão descartados, tem certeza que deseja sair?',
        buttonLeft: 'Voltar',
        buttonRight: 'Sair'
    },
    labelModalSelectServer: {
        title: 'Selecionar Servidor',
        message: 'Este servidor será definido e utilizado como padrão, deseja continuar?',
        buttonLeft: 'Voltar',
        buttonRight: 'Selecionar'
    },
    labelModalSendColetaHome: {
        title: 'Enviar Coleta',
        message: 'Essa coleta será enviada para o retaguarda, deseja continuar?',
        buttonLeft: 'Voltar',
        buttonRight: 'Enviar'
    },
    labelModalSendColetasHome: {
        title: 'Enviar Coletas',
        message: 'As coletas serão enviadas para o retaguarda, deseja continuar?',
        buttonLeft: 'Voltar',
        buttonRight: 'Enviar'
    },
    labelModalSyncSendedItem: {
        title: 'Sincronizar Dados',
        message: 'Deseja sincronizar dados da coleta?',
        buttonLeft: 'Voltar',
        buttonRight: 'Sincronizar'
    },
    labelModalSyncSendedItens: {
        title: 'Sincronizar Dados',
        message: 'Deseja sincronizar dados das coletas?',
        buttonLeft: 'Voltar',
        buttonRight: 'Sincronizar'
    },
    labelModalDeleteColetaHome: {
        title: 'Deletar Coleta',
        message: 'Essa coleta ainda não foi enviada, tem certeza que deseja excluir?',
        buttonLeft: 'Voltar',
        buttonRight: 'Deletar'
    },
    labelModalDeleteColetasHome: {
        title: 'Deletar Coletas',
        message: 'Essas coletas ainda não foram enviadas, tem certeza que deseja excluir?',
        buttonLeft: 'Voltar',
        buttonRight: 'Deletar'
    },
    labelModalCancelSendedItem: {
        title: 'Cancelar Coleta',
        message: 'Essa coleta ficará indisponível para uso no retaguarda, tem certeza que deseja cancelar?',
        buttonLeft: 'Voltar',
        buttonRight: 'Cancelar'
    },
    labelModalCancelSendedItens: {
        title: 'Cancelar Coleta',
        message: 'As coletas ficarão indisponíveis para uso no retaguarda, tem certeza que deseja cancelar?',
        buttonLeft: 'Voltar',
        buttonRight: 'Cancelar'
    },
    labelModalBackNewColeta: {
        title: 'Descartar Coleta',
        message: 'Os dados inseridos não foram salvos, ao sair serão descartados!',
        buttonLeft: 'Continuar',
        buttonRight: 'Descartar',
        invertButtons: true
    },
    labelModalSyncItens: {
        title: 'Sincronizar Dados',
        message: 'Deseja sincronizar os dados selecionados?',
        buttonLeft: 'Voltar',
        buttonRight: 'Sincronizar'
    },
    labelModalDeleteOnDB: {
        title: 'Deletar Dados',
        message: 'Deseja realmente deletar os dados selecionados?',
        buttonLeft: 'Voltar',
        buttonRight: 'Deletar'
    },
    MessageAlertEditingItemNewColeta: 'Termine de editar o item anterior!',
    ValueTotal: 'ValorTotal',
    ItensTotal: 'TotalItens',
    ItensNotSended: 'TotalItensNaoEnviados',
    ItensCanceledTotal: 'TotalItensCancelados',
    LastItem: 'UltimoItem',

    infoInputs: {
        nId:'id',
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
        pBranch: 'Tipo Pneu',
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
        pItem: 'Itens',
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
            id:'id',
            IdMobile: 'IdMobile',
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
            Date: 'DataEmissao',
            updatedAt: 'updatedAt',
            createdAt: 'createdAt'
        },
        InitialStatusItem: 'AguardandoEnvio',
        SendedStatusItem: 'Recebido',
        CancelStatusItem: 'Cancelado',
        InitialPlatform: 'Coleta Mobile',   ///pegar o nome do dispositivo
        InitialImportValue: 'Sim',
    },
    Routes: {
        branch: 'Filial',
        brand: 'Marcas',
        itens: 'Coletas',
        client: 'Clientes',
        company: 'Empresas',
        profile: 'Perfil',
        server: 'Server',
        situation: 'Situacao',
        warranty: 'Garantia',
        log: 'Log'
    },
    infoDB: {
        Table: {
            Itens: {
                name: 'Coleta',
                userAccess: true,
                fields: {
                    IdMobile: 'IdMobile',
                    id:'id',
                    CodImport: 'Cod_Importacao',
                    CodCompany: 'CodEmpresa',
                    CodBranch: 'CodFilial',
                    Branch: 'Filial',
                    CodSalesmanI: 'CodVendedorIndex',
                    CodPriority: 'CodPrioridade',
                    ColetaDate: 'DataColeta',
                    CodSalesman: 'CodVendedor',
                    CodCollector: 'CodColetador',
                    CodTechnician: 'CodTecnico',
                    CodClient: 'CodCliente',
                    CodSituation: 'CodSituacao',
                    CodProduct: 'CodProduto',
                    Situation: 'Situacao',
                    CodBrand: 'CodMarca',
                    CodType: 'CodTipo',
                    CodCancel: 'CodCancelamento',
                    CodWarranty: 'CodGarantia',
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
                    updatedAt: 'updatedAt',
                    createdAt: 'createdAt'
                }
            },
            Clients: {
                name: 'Cliente',
                userAccess: true,
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
                name: 'Marca',
                userAccess: true,
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
                userAccess: false,
                fields: {
                    id: 'CodVendedor',
                    name: 'Nome',
                    email: 'Email',
                    password: 'Senha',
                    company: 'CodEmpresa',
                    defaultBranch: 'FilialPadrao',
                    initSequence: 'InicioSequenciaColeta',
                    finalSequence: 'FimSequenciaColeta',
                    totalAccess: 'AcessoTotal',
                    dateLastAccess: 'DataUltimoAcesso'
                }
            },
            Company: {
                name: 'Empresa',
                userAccess: false,
                fields: {
                    id: 'CodEmpresa',
                    name: 'Nome',
                }
            },
            Branch: {
                name: 'Filial',
                userAccess: false,
                fields: {
                    id: 'CodFilial',
                    name: 'Nome',
                    category: 'Categoria',
                }
            },
            Situation: {
                name: 'Situacao',
                userAccess: true,
                typeKey: 'INTEGER',
                fields: {
                    id: 'CodSituacao',
                    name: 'Descricao'
                }
            },
            Warranty: {
                name: 'Garantia',
                userAccess: true,
                typeKey: 'TEXT',
                fields: {
                    id: 'CodGarantia',
                    name: 'Descricao'
                }

            },
            Server: {
                name: 'Server',
                userAccess: false,
                fields: {
                    id: 'CodServer',
                    name: 'Nome',
                    description: 'Descricao',
                    protocol: 'Protocolo',
                    ip: 'Ip',
                    port: 'Porta',
                    baseURL: 'BaseURL',
                    priority: 'Prioridade',
                    default: 'Padrao',
                    extra: 'Extra',
                    testRoute: 'RotaTeste',
                    data: 'data'
                }
            },
            Log: {
                name: 'Log',
                userAccess: false,
                fields: {
                    id: 'ID',
                    action: 'Acao',
                    route: 'Rota',
                    error: 'Erro',
                    type: 'Tipo',
                    user: 'User',
                    station: 'Estacao',
                    description: 'Descricao',
                    date: 'Data',
                    extra: 'Extra'
                }
            },
        }
    },
    Log: {
        types: {
            sync: 'Sync',
            error: 'Error',
            delete: 'Delete',
            access: 'Access'
        },
        actions: {
            sync: 'Sync',
            error: 'Error',
            delete: 'Delete',
            access: 'Access'
        },

    }
}
export function CreateSQLUpdate(Nametable, fields, where, param, obj) {
    function format(value) {
        if (value === undefined | value === null ) {
            return null
        } else if(value.length <=0){
            return null 
        }
        else {
            return `'${value}'`
        }
    }
    let SQL = `UPDATE ${Nametable} SET `
    for (let props in fields) {
        console.log(fields[props] + ' = ' + format(obj[fields[props]]))
        SQL = SQL + fields[props] + ' = ' + format(obj[fields[props]]) + ', '
    }
    SQL = SQL.substring(0, (SQL.length - 2))
    SQL += ` WHERE ${where} = ${param}`
    return SQL
}
export function CreateSQLInsert(Nametable, fields, obj) {
    
    function format(value) {
        if (value === undefined | value === null) {
            return null
        } else {
            return `'${value}'`
        }
    }
    let SQL = `INSERT INTO ${Nametable} ( `
    for (let props in fields) {
        if (fields[props] !== 'IdMobile') {
            SQL = SQL + fields[props] + ', '
        }
    }
    SQL = SQL.substring(0, (SQL.length - 2))
    SQL += ') VALUES ( '

    for (let props in fields) {
        if (fields[props] !== 'IdMobile') {
           // SQL += '?, '
          
           SQL += format(obj[fields[props]]) + ', '
        }
    }
    SQL = SQL.substring(0, (SQL.length - 2))

    SQL += ` )`
    return SQL
}

// export function CreateValuesSQLInsert(fields, obj) {
//   //  let fields = fields
//     // delete fields.IdMobile
//     function format(value) {
//         if (value === undefined | value === null) {
//             return null
//         } else {
//             return value
//         }
//     }
//     let SQL = []
//     for (let props in copyFields) {
//         SQL += '?, ' 
//         SQL.push(format(obj[copyFields[props]]))
//     }
//     return SQL
// }

export function Routes() {
    const BaseForm = GText.infoDB.Table
    let RoutesGet = {}
    for (let prop in BaseForm) {
        // if (BaseForm[prop].name !== BaseForm.Log.name, BaseForm[prop].name !== BaseForm.Clients.name)
        RoutesGet[prop] = BaseForm[prop].name
    }
    return RoutesGet
}
export function Tables() {
    const BaseForm = GText.infoDB.Table
    let RoutesGet = {}
    for (let prop in BaseForm) {
        RoutesGet[prop] = BaseForm[prop].name
    }
    return RoutesGet
}
export const tables = Tables()


export function NameTables(params) {
    const BaseForm = GText.infoDB.Table
    let RoutesGet = []
    for (let prop in BaseForm) {
        if (BaseForm[prop].name !== BaseForm.Log.name &
            BaseForm[prop].name !== BaseForm.Profile.name &
            BaseForm[prop].name !== BaseForm.Server.name &
            BaseForm[prop].name !== BaseForm.Clients.name) {
            RoutesGet.push(BaseForm[prop].name)
        }

    }
    return RoutesGet
}

export function Properties(params) {
    const BaseForm = GText.infoDB.Table.Profile.fields
    let RoutesGet = []
    for (let prop in BaseForm) {
        //  if (BaseForm[prop].name !== BaseForm.Log.name, BaseForm[prop].name !== BaseForm.Clients.name)
        RoutesGet.push(BaseForm[prop])
    }
    return RoutesGet
}

export const routes = Routes()

export const RoutesGet = [
    { name: routes.Warranty, checked: false },
    { name: routes.Brand, checked: false },
    { name: routes.Situation, checked: false },
    { name: routes.Client, checked: false },
    { name: routes.Company, checked: false },
    { name: routes.Itens, checked: false },
    { name: routes.Branch, checked: false }
]


export const fiedlsHide = [
    { name: GText.infoInputs.fiedlsHide.id },
    { name: GText.infoInputs.fiedlsHide.IdMobile },
    { name: GText.infoInputs.fiedlsHide.CodImport },
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
    { name: GText.infoInputs.fiedlsHide.HigherItem },
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
    { name: GText.infoInputs.fiedlsHide.CodWarranty },
    { name: GText.infoInputs.fiedlsHide.Date },
    { name: GText.infoInputs.fiedlsHide.createdAt },
    { name: GText.infoInputs.fiedlsHide.updatedAt },
]
export const fieldsToString = [
    GText.infoDB.Table.Itens.fields.id,
    GText.infoDB.Table.Itens.fields.IdMobile,
    GText.infoDB.Table.Itens.fields.CodImport,
    GText.infoDB.Table.Itens.fields.CodCompany,
    GText.infoDB.Table.Itens.fields.CodBranch,
    GText.infoDB.Table.Itens.fields.Branch,
    GText.infoDB.Table.Itens.fields.CodSalesmanI,
    GText.infoDB.Table.Itens.fields.CodPriority,
    GText.infoDB.Table.Itens.fields.ColetaDate,
    GText.infoDB.Table.Itens.fields.CodSalesman,
    GText.infoDB.Table.Itens.fields.CodCollector,
    GText.infoDB.Table.Itens.fields.CodTechnician,
    GText.infoDB.Table.Itens.fields.CodClient,
    GText.infoDB.Table.Itens.fields.CodSituation,
    GText.infoDB.Table.Itens.fields.CodProduct,
    GText.infoDB.Table.Itens.fields.Situation,
    GText.infoDB.Table.Itens.fields.CodBrand,
    GText.infoDB.Table.Itens.fields.CodType,
    GText.infoDB.Table.Itens.fields.CodCancel,
    GText.infoDB.Table.Itens.fields.CodWarranty,
    GText.infoDB.Table.Itens.fields.Item,
    GText.infoDB.Table.Itens.fields.ColetaNumber,
    GText.infoDB.Table.Itens.fields.Status,
    GText.infoDB.Table.Itens.fields.InclusionDate,
    GText.infoDB.Table.Itens.fields.InclusionHour,
    GText.infoDB.Table.Itens.fields.InclusionUser,
    GText.infoDB.Table.Itens.fields.InclusionStation,
    GText.infoDB.Table.Itens.fields.Date,
    GText.infoDB.Table.Itens.fields.NameClient,
    GText.infoDB.Table.Itens.fields.IdIdentityClient,
    GText.infoDB.Table.Itens.fields.Phone,
    GText.infoDB.Table.Itens.fields.Warranty,
    GText.infoDB.Table.Itens.fields.ImportColeta,
    GText.infoDB.Table.Itens.fields.NameProduct,
    GText.infoDB.Table.Itens.fields.SerieNumber,
    GText.infoDB.Table.Itens.fields.Brand,
    GText.infoDB.Table.Itens.fields.Modelo,
    GText.infoDB.Table.Itens.fields.Dimension,
    GText.infoDB.Table.Itens.fields.Design,
    GText.infoDB.Table.Itens.fields.FireNumber,
    GText.infoDB.Table.Itens.fields.DotNumber,
    GText.infoDB.Table.Itens.fields.Board,
    GText.infoDB.Table.Itens.fields.ServicesExec,
    GText.infoDB.Table.Itens.fields.InitialExam,
    GText.infoDB.Table.Itens.fields.Observation,
    GText.infoDB.Table.Itens.fields.Value,
    GText.infoDB.Table.Itens.fields.CancelObservation,
    GText.infoDB.Table.Itens.fields.CancelDate,
    GText.infoDB.Table.Itens.fields.CancelHour,
    GText.infoDB.Table.Itens.fields.CancelUser,
    GText.infoDB.Table.Itens.fields.CancelStation,
    // GText.infoDB.Table.Itens.fields.Date,
]
export default GText