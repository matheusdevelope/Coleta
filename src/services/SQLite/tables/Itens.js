import GText, { CreateSQLInsert, CreateSQLUpdate } from "../../../global/texts";
import db from "../SQLiteDatabase";
const item = GText.infoDB.Table.Itens.fields;
/**
 * INICIALIZAÇÃO DA TABELA
 * - Executa sempre, mas só cria a tabela caso não exista (primeira execução)
 */

function Itens() {
  db.transaction((tx) => {
    //   //<<<<<<<<<<<<<<<<<<<<<<<< USE ISSO APENAS DURANTE OS TESTES!!! >>>>>>>>>>>>>>>>>>>>>>>
    function droptable() {
      tx.executeSql(`DROP TABLE ${GText.infoDB.Table.Itens.name} ;`);
    }
    //  droptable();
    //   //<<<<<<<<<<<<<<<<<<<<<<<< USE ISSO APENAS DURANTE OS TESTES!!! >>>>>>>>>>>>>>>>>>>>>>>

    function createTable() {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS ${GText.infoDB.Table.Itens.name}
     (
       ${GText.infoDB.Table.Itens.fields.IdMobile} INTEGER PRIMARY KEY AUTOINCREMENT,
       ${GText.infoDB.Table.Itens.fields.id} INTEGER,
       ${GText.infoDB.Table.Itens.fields.CodImport}  INT,
       ${GText.infoDB.Table.Itens.fields.CodCompany} INT,
       ${GText.infoDB.Table.Itens.fields.Branch}  TEXT,
       ${GText.infoDB.Table.Itens.fields.CodSalesmanI}  INT,
       ${GText.infoDB.Table.Itens.fields.CodPriority} INT,
       ${GText.infoDB.Table.Itens.fields.ColetaDate}  TEXT,
       ${GText.infoDB.Table.Itens.fields.CodSalesman} INT,
       ${GText.infoDB.Table.Itens.fields.CodCollector} INT,
       ${GText.infoDB.Table.Itens.fields.CodTechnician}  INT,
       ${GText.infoDB.Table.Itens.fields.CodClient} INT,
       ${GText.infoDB.Table.Itens.fields.Situation} INT,
       ${GText.infoDB.Table.Itens.fields.CodProduct} INT,
       ${GText.infoDB.Table.Itens.fields.CodBrand}  INT,
       ${GText.infoDB.Table.Itens.fields.CodType} INT,
       ${GText.infoDB.Table.Itens.fields.CodCancel} INT,
       ${GText.infoDB.Table.Itens.fields.Item} INT,
       ${GText.infoDB.Table.Itens.fields.ColetaNumber} TEXT,
       ${GText.infoDB.Table.Itens.fields.Status}  TEXT,
       ${GText.infoDB.Table.Itens.fields.InclusionDate}  TEXT,
       ${GText.infoDB.Table.Itens.fields.InclusionHour} TEXT,
       ${GText.infoDB.Table.Itens.fields.InclusionUser}  TEXT,
       ${GText.infoDB.Table.Itens.fields.InclusionStation} TEXT,
       ${GText.infoDB.Table.Itens.fields.Date}  DATE,
       ${GText.infoDB.Table.Itens.fields.NameClient}  TEXT,
       ${GText.infoDB.Table.Itens.fields.IdIdentityClient} TEXT,
       ${GText.infoDB.Table.Itens.fields.Phone} TEXT,
       ${GText.infoDB.Table.Itens.fields.Warranty} TEXT,
       ${GText.infoDB.Table.Itens.fields.ImportColeta} TEXT,
       ${GText.infoDB.Table.Itens.fields.NameProduct} TEXT,
       ${GText.infoDB.Table.Itens.fields.SerieNumber} TEXT,
       ${GText.infoDB.Table.Itens.fields.Brand} TEXT,
       ${GText.infoDB.Table.Itens.fields.Modelo} TEXT,
       ${GText.infoDB.Table.Itens.fields.Dimension} INT,
       ${GText.infoDB.Table.Itens.fields.Design} TEXT,
       ${GText.infoDB.Table.Itens.fields.FireNumber} TEXT,
       ${GText.infoDB.Table.Itens.fields.DotNumber} TEXT,
       ${GText.infoDB.Table.Itens.fields.Board} TEXT,
       ${GText.infoDB.Table.Itens.fields.ServicesExec} TEXT,
       ${GText.infoDB.Table.Itens.fields.InitialExam} TEXT,
       ${GText.infoDB.Table.Itens.fields.Observation}  TEXT,
       ${GText.infoDB.Table.Itens.fields.Value}  NUMERIC,
       ${GText.infoDB.Table.Itens.fields.CancelObservation} TEXT,
       ${GText.infoDB.Table.Itens.fields.CancelDate}   TEXT,
       ${GText.infoDB.Table.Itens.fields.CancelHour} TIME,
       ${GText.infoDB.Table.Itens.fields.CancelUser} TEXT,
       ${GText.infoDB.Table.Itens.fields.CancelStation} TEXT,
       ${GText.infoDB.Table.Itens.fields.CodSituation} TEXT,
       ${GText.infoDB.Table.Itens.fields.CodWarranty} TEXT,
       ${GText.infoDB.Table.Itens.fields.CodBranch} TEXT,
       ${GText.infoDB.Table.Itens.fields.createdAt} TEXT,
       ${GText.infoDB.Table.Itens.fields.updatedAt} TEXT,

       UNIQUE(id)

   );
     `,
        [],
        (sqlTxn, res) => {
          //    console.log("table created successfully", GText.infoDB.Table.Itens.fields.CodWarranty);
        },
        (error) => {
          console.log("error on creating table " + error.message);
        }
      );
    }
    createTable();
  });
}
Itens();
/**
 * CRIAÇÃO DE UM NOVO REGISTRO
 * - Recebe um objeto;
 * - Retorna uma Promise:
 *  - O resultado da Promise é o ID do registro (criado por AUTOINCREMENT)
 *  - Pode retornar erro (reject) caso exista erro no SQL ou nos parâmetros.
 */
const create = (obj) => {
  //https://dev.to/mliakos/quick-post-about-the-sqlite-upsert-and-the-new-returning-clause-5fhl
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        //   `
        // INSERT INTO Coleta ( IdMobile, id, Cod_Importacao, CodEmpresa, CodFilial, Filial, CodVendedorIndex, CodPrioridade, DataColeta, CodVendedor, CodColetador, CodTecnico, CodCliente, CodSituacao, CodProduto, Situacao, CodMarca, CodTipo, CodCancelamento, CodGarantia, Item, NumeroColeta, Status, DataLancamento, HoraLancamento, UsuarioLancamento, EstacaoLancamentos, DataEmissao, NomeCliente, CPF_CNPJ, Celular, Garantia, ImportaColeta, NomeProduto, NumeroSerie, Marca, Modelo, Dimensao, Desenho, NumeroFogo, NumeroDot, Placa, ServicosExecutar, ExameInicial, Observacao, Valor, ObservacaoCancelamento, DataCancelamento, HoraCancelamento, UsuarioCancelamento, EstacaoCancelamento, updatedAt, createdAt)
        // VALUES ( '122', '147', null, '1', null, null, null, null, '2022-01-05T01:10:55.000Z', '3', '3', '1', null, null, '1', null, null, null, null, null, '4', '200000', 'Recebido', '2022-01-05T01:10:55.000Z', null, 'Matheus', 'Coleta Mobile', '2022-01-05T01:10:55.000Z', 'Teste', null, null, null, 'Sim', null, null, null, null, null, null, null, null, null, 'Serv edit', null, null, '133', null, null, null, null, null, '2022-01-08T01:19:49.665Z', '2022-01-04T16:31:46.644Z' )
        // ON CONFLICT (id)
        // DO UPDATE SET IdMobile = '122', id = '147', Cod_Importacao = null, CodEmpresa = '1', CodFilial = null, Filial = null, CodVendedorIndex = null, CodPrioridade = null, DataColeta = '2022-01-05T01:10:55.000Z', CodVendedor = '3', CodColetador = '3', CodTecnico = '1', CodCliente = null, CodSituacao = null, CodProduto = '1', Situacao = null, CodMarca = null,
        // CodTipo = null, CodCancelamento = null, CodGarantia = null, Item = '4', NumeroColeta = '200000', Status = 'Recebido', DataLancamento = '2022-01-05T01:10:55.000Z', HoraLancamento = null, UsuarioLancamento = 'Matheus', EstacaoLancamentos = 'Coleta Mobile', DataEmissao = '2022-01-05T01:10:55.000Z', NomeCliente = 'Teste', CPF_CNPJ = null, Celular = null, Garantia = null, ImportaColeta = 'Sim', NomeProduto = null, NumeroSerie = null, Marca = null, Modelo = null, Dimensao = null, Desenho = null, NumeroFogo = null, NumeroDot = null, Placa = null, ServicosExecutar = 'Serv edit', ExameInicial = null, Observacao = null, Valor = '133', ObservacaoCancelamento = null, DataCancelamento = null, HoraCancelamento = null, UsuarioCancelamento = null, EstacaoCancelamento = null, updatedAt = '2022-01-08T01:19:49.665Z', createdAt = '2022-01-04T16:31:46.644Z'
        // WHERE IdMobile = 122`

        CreateSQLInsert(
          GText.infoDB.Table.Itens.name,
          GText.infoDB.Table.Itens.fields,
          obj
        ),
        [],
        (sqlTxn, res) => {
          // console.log(sqlTxn)
          let results = [];
          let len = res.rows.length;
          if (len > 0) {
            for (let i = 0; i < len; i++) {
              let item = res.rows.item(i);
              results.push(item);
            }
          }
          resolve(results);
        },
        (error) => {
          reject(error.message, obj);
          console.log(
            `error on create ${GText.infoDB.Table.Itens.name} ` + error.message
          );
        }
      );
    });
  });
};
/**
 * ATUALIZA UM REGISTRO JÁ EXISTENTE
 * - Recebe o ID do registro e um OBJETO com valores atualizados;
 * - Retorna uma Promise:
 *  - O resultado da Promise é a quantidade de registros atualizados;
 *  - Pode retornar erro (reject) caso o ID não exista ou então caso ocorra erro no SQL.
 */
const update = (where, param, obj) => {
  //console.log(CreateSQLUpdate(GText.infoDB.Table.Itens.name, item ,where, param, obj))
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        CreateSQLUpdate(GText.infoDB.Table.Itens.name, item, where, param, obj),
        [],
        //generate a object with the result of SQL
        (sqlTxn, res) => {
          let results = false;
          let len = res.rows.length;
          if (len > 0) {
            results = [];
            for (let i = 0; i < len; i++) {
              let item = res.rows.item(i);
              results.push(item);
            }
          }
          //  console.log(results, res)
          resolve(results); //return de object when the Promisse is complete
        },
        (error) => {
          reject(error.message);
          console.log(
            `error on update ${GText.infoDB.Table.Itens.name} ` + error.message
          );
        }
      );
    });
  });
};

/**
 * BUSCA UM REGISTRO POR MEIO DO ID
 * - Recebe o ID do registro;
 * - Retorna uma Promise:
 *  - O resultado da Promise é o objeto (caso exista);
 *  - Pode retornar erro (reject) caso o ID não exista ou então caso ocorra erro no SQL.
 */
const find = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      //comando SQL modificável
      tx.executeSql(
        `SELECT * FROM ${GText.infoDB.Table.Itens.name}
        WHERE ${GText.infoDB.Table.Itens.fields.IdMobile}=?;`,
        [id],
        (sqlTxn, res) => {
          let results = false;
          let len = res.rows.length;
          if (len > 0) {
            results = [];
            for (let i = 0; i < len; i++) {
              let item = res.rows.item(i);
              results.push(item);
            }
          }
          resolve(results); //return de object when the Promisse is complete
        },
        (error) => {
          reject(error.message);
          console.log(
            `error on find ${GText.infoDB.Table.Itens.name} ` + error.message
          );
        }
      );
    });
  });
};

/**
 * BUSCA UM REGISTRO POR MEIO DA MARCA (brand)
 * - Recebe a marca do carro;
 * - Retorna uma Promise:
 *  - O resultado da Promise é um array com os objetos encontrados;
 *  - Pode retornar erro (reject) caso o ID não exista ou então caso ocorra erro no SQL;
 *  - Pode retornar um array vazio caso nenhum objeto seja encontrado.
 */
const findLike = (field, param, field2, condition, param2) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      const sql = `SELECT * FROM ${
        GText.infoDB.Table.Itens.name
      } WHERE ${field} LIKE ?
      ${field2 !== undefined ? `AND ${field2} ${condition} '${param2}'` : ""}

      ;`;
      // ${
      //   field2 !== undefined
      //     ? condition === "IN"
      //       ? "AND " + field2 + " " + condition + "(" + param2 + ")"
      //       : "AND " + field2 + " " + condition + `'` + param2 + `'`
      //     : ""
      // }
      // ${field2 !== undefined ? `AND ${field2} ${condition} '${param2}'` : ""}
      //comando SQL modificável
      tx.executeSql(
        sql,
        [param],
        (sqlTxn, res) => {
          let results = false;
          let len = res.rows.length;
          if (len > 0) {
            results = [];
            for (let i = 0; i < len; i++) {
              let item = res.rows.item(i);
              results.push(item);
            }
          }
          resolve(results); //return de object when the Promisse is complete
        },
        (error) => {
          reject(error.message);
          console.log(
            `error on finBy ${GText.infoDB.Table.Itens.name} ` + error.message
          );
        }
      );
    });
  });
};

/**
 * BUSCA TODOS OS REGISTROS DE UMA DETERMINADA TABELA
 * - Não recebe parâmetros;
 * - Retorna uma Promise:
 *  - O resultado da Promise é uma lista (Array) de objetos;
 *  - Pode retornar erro (reject) caso o ID não exista ou então caso ocorra erro no SQL;
 *  - Pode retornar um array vazio caso não existam registros.
 */
const all = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      //comando SQL modificável
      tx.executeSql(
        `SELECT * FROM ${GText.infoDB.Table.Itens.name};`,
        [],
        (sqlTxn, res) => {
          let results = false;
          let len = res.rows.length;
          if (len > 0) {
            results = [];
            for (let i = 0; i < len; i++) {
              let item = res.rows.item(i);
              results.push(item);
            }
          }
          resolve(results); //return de object when the Promisse is complete
        },
        (error) => {
          reject(error.message);
          console.log(
            `error on findAll ${GText.infoDB.Table.Itens.name} ` + error.message
          );
        }
      );
    });
  });
};

// (SELECT TOP 1 Table2.${GText.infoDB.Table.Itens.fields.Item}
//   FROM ${GText.infoDB.Table.Itens.name} Table2
//   WHERE  Table2.${GText.infoDB.Table.Itens.fields.ColetaNumber}
//   = Table1.${GText.infoDB.Table.Itens.fields.ColetaNumber}
//   order by ${GText.infoDB.Table.Itens.fields.Item} desc
//   ) As ${GText.LastItem} ,

const allGrouped = (where, param, param2) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      const sql = `
      SELECT * FROM(
      SELECT
      (SELECT SUM(Table2.${GText.infoDB.Table.Itens.fields.Value} )
        FROM ${GText.infoDB.Table.Itens.name} Table2
        WHERE  Table2.${GText.infoDB.Table.Itens.fields.ColetaNumber}
        = Table1.${GText.infoDB.Table.Itens.fields.ColetaNumber}
        ) As ${GText.ValueTotal} ,
        (SELECT COUNT(Table2.${GText.infoDB.Table.Itens.fields.ColetaNumber} )
        FROM ${GText.infoDB.Table.Itens.name} Table2
        WHERE  Table2.${GText.infoDB.Table.Itens.fields.ColetaNumber}
        = Table1.${GText.infoDB.Table.Itens.fields.ColetaNumber}
        ) As ${GText.ItensTotal} ,
        (SELECT COUNT(Table2.${GText.infoDB.Table.Itens.fields.ColetaNumber} )
        FROM ${GText.infoDB.Table.Itens.name} Table2
        WHERE  Table2.${GText.infoDB.Table.Itens.fields.ColetaNumber}
        = Table1.${GText.infoDB.Table.Itens.fields.ColetaNumber}
        AND Table2.${GText.infoDB.Table.Itens.fields.Status}
        =  '${GText.infoInputs.CancelStatusItem}'
        ) As ${GText.ItensCanceledTotal} ,
        (SELECT COUNT(Table2.${GText.infoDB.Table.Itens.fields.ColetaNumber} )
        FROM ${GText.infoDB.Table.Itens.name} Table2
        WHERE  Table2.${GText.infoDB.Table.Itens.fields.ColetaNumber}
        = Table1.${GText.infoDB.Table.Itens.fields.ColetaNumber}
        AND Table2.${GText.infoDB.Table.Itens.fields.Status}
        =  '${GText.infoInputs.InitialStatusItem}'
        ) As ${GText.ItensNotSended} ,
        ${GText.infoDB.Table.Itens.fields.ColetaNumber},
        ${GText.infoDB.Table.Itens.fields.NameClient} ,
        ('false') as checked
      FROM ${GText.infoDB.Table.Itens.name} Table1

      ${
        where !== undefined
          ? `
      where ${where} = '${param}'
      `
          : ""
      }
      ${
        param2 !== undefined
          ? `
      or ${where} = '${param2}'
      `
          : ""
      }
      Group By ${GText.infoDB.Table.Itens.fields.ColetaNumber}
      order by ${GText.infoDB.Table.Itens.fields.IdMobile} desc )
      ${
        param2 !== undefined
          ? `
      where ${GText.ItensNotSended} = 0
      `
          : ""
      }
      `;
      //comando SQL modificável
      //  console.log(sql)
      tx.executeSql(
        sql,
        [],
        (sqlTxn, res) => {
          let results = [];
          let len = res.rows.length;
          if (len > 0) {
            for (let i = 0; i < len; i++) {
              let item = res.rows.item(i);
              results.push(item);
            }
          }
          resolve(results); //return de object when the Promisse is complete
        },
        (error) => {
          reject(error.message);
          console.log(
            `error on findAll ${GText.infoDB.Table.Itens.name} ` + error.message
          );
        }
      );
    });
  });
};

/**
 * BUSCA TODOS OS REGISTROS DE UMA DETERMINADA TABELA
 * - Não recebe parâmetros;
 * - Retorna uma Promise:
 *  - O resultado da Promise é uma lista (Array) de objetos;
 *  - Pode retornar erro (reject) caso o ID não exista ou então caso ocorra erro no SQL;
 *  - Pode retornar um array vazio caso não existam registros.
 */
const findLastItem = (field, param) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      //comando SQL modificável
      tx.executeSql(
        param == undefined
          ? `SELECT * FROM ${GText.infoDB.Table.Itens.name}
        ORDER BY ${GText.infoDB.Table.Itens.fields.IdMobile} DESC  ;`
          : ////tem que pesquisar com fazer o "TOP 1 no sqlite"

            `SELECT * FROM ${GText.infoDB.Table.Itens.name}
        WHERE ${field} = ${param}
        ORDER BY ${GText.infoDB.Table.Itens.fields.Item} DESC  ;`,
        [],
        (sqlTxn, res) => {
          let results = null;
          let len = res.rows.length;
          if (len > 0) {
            results = [];
            results.push(res.rows.item(0));
            // for (let i = 0; i < len; i++) {
            //   let item = res.rows.item(i);
            //   results.push(item);
            // }
          }
          // console.log(results)
          resolve(results); //return de object when the Promisse is complete
        },
        (error) => {
          reject(error.message);
          console.log(
            `error on FindLastItem ${GText.infoDB.Table.Itens.name} ` +
              error.message
          );
        }
      );
    });
  });
};

/**
 * REMOVE UM REGISTRO POR MEIO DO ID
 * - Recebe o ID do registro;
 * - Retorna uma Promise:
 *  - O resultado da Promise a quantidade de registros removidos (zero indica que nada foi removido);
 *  - Pode retornar erro (reject) caso o ID não exista ou então caso ocorra erro no SQL.
 */
const remove = (field, condition, param) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      //comando SQL modificável
      tx.executeSql(
        `DELETE FROM ${GText.infoDB.Table.Itens.name}
        WHERE ${field} ${condition} ?;`,
        [param],
        (sqlTxn, res) => {
          let results = false;
          let len = res.rows.length;
          if (len > 0) {
            results = [];
            for (let i = 0; i < len; i++) {
              let item = res.rows.item(i);
              results.push(item);
            }
          }
          resolve(results); //return de object when the Promisse is complete
        },
        (error) => {
          reject(error.message);
          console.log(
            `error on removeById ${GText.infoDB.Table.Itens.name} ` +
              error.message
          );
        }
      );
    });
  });
};
/**
 * REMOVE Todos REGISTROS DA TABELA
 * - Não Recebe o ID do registro;
 * - Retorna uma Promise:
 *  - O resultado da Promise a quantidade de registros removidos (zero indica que nada foi removido);
 *  - Pode retornar erro (reject) caso o ID não exista ou então caso ocorra erro no SQL.
 */
const removeAll = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      //comando SQL modificável
      tx.executeSql(
        `DELETE From ${GText.infoDB.Table.Itens.name} ;`,
        [],
        (sqlTxn, res) => {
          let results = false;
          let len = res.rows.length;
          if (len > 0) {
            results = [];
            for (let i = 0; i < len; i++) {
              let item = res.rows.item(i);
              results.push(item);
            }
          }
          resolve(results); //return de object when the Promisse is complete
        },
        (error) => {
          reject(error.message);
          console.log(
            `error on find ${GText.infoDB.Table.Itens.name} ` + error.message
          );
        }
      );
    });
  });
};

const updateStatus = (where, param, param2, newStatus) => {
  return new Promise((resolve, reject) => {
    const sql = `UPDATE ${GText.infoDB.Table.Itens.name} SET
    ${GText.infoDB.Table.Itens.fields.Status} = '${newStatus}'
    WHERE ${where} = '${param}'
    and ${GText.infoDB.Table.Itens.fields.Status} = '${param2}';`;
    //  console.log(sql)
    db.transaction((tx) => {
      tx.executeSql(
        sql,
        [],
        (sqlTxn, res) => {
          let results = false;
          let len = res.rows.length;
          if (len > 0) {
            results = [];
            for (let i = 0; i < len; i++) {
              let item = res.rows.item(i);
              results.push(item);
            }
          }
          resolve(results); //return de object when the Promisse is complete
        },
        (error) => {
          reject(error.message);
          console.log(
            `error on update ${GText.infoDB.Table.Itens.name} ` + error.message
          );
        }
      );
    });
  });
};
// all().then((obj)=>{console.log(obj)})

export default {
  create,
  update,
  updateStatus,
  find,
  findLike,
  findLastItem,
  all,
  allGrouped,
  remove,
  removeAll,
};
