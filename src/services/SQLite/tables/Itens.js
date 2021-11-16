import GText from "../../../global/texts";
import db from "../SQLiteDatabase";

/**
 * INICIALIZAÇÃO DA TABELA
 * - Executa sempre, mas só cria a tabela caso não exista (primeira execução)
 */

  function Itens() {
    db.transaction((tx) => {
      //   //<<<<<<<<<<<<<<<<<<<<<<<< USE ISSO APENAS DURANTE OS TESTES!!! >>>>>>>>>>>>>>>>>>>>>>>
      //   //tx.executeSql("DROP TABLE cars;");
      //   //<<<<<<<<<<<<<<<<<<<<<<<< USE ISSO APENAS DURANTE OS TESTES!!! >>>>>>>>>>>>>>>>>>>>>>>

      tx.executeSql(
        // brand TEXT, 
        //   model TEXT, 
        //   hp INT),
        `CREATE TABLE IF NOT EXISTS ${GText.infoDB.Table.Itens.name} 
     (
       ${GText.infoDB.Table.Itens.fields.IdMobile} INTEGER ,
       ${GText.infoDB.Table.Itens.fields.CodImport}  INT,
       ${GText.infoDB.Table.Itens.fields.CodCompany} INT,
       ${GText.infoDB.Table.Itens.fields.CodBranch}  INT,
       ${GText.infoDB.Table.Itens.fields.CodSalesmanI}  INT,
       ${GText.infoDB.Table.Itens.fields.CodPriority} INT,
       ${GText.infoDB.Table.Itens.fields.ColetaDate}  DATE,
       ${GText.infoDB.Table.Itens.fields.CodSalesman} INT,
       ${GText.infoDB.Table.Itens.fields.CodCollector} INT,
       ${GText.infoDB.Table.Itens.fields.CodTechnician}  INT,
       ${GText.infoDB.Table.Itens.fields.CodClient} INT,
       ${GText.infoDB.Table.Itens.fields.CodSituation} INT,
       ${GText.infoDB.Table.Itens.fields.CodProduct} INT,
       ${GText.infoDB.Table.Itens.fields.CodBrand}  INT,
       ${GText.infoDB.Table.Itens.fields.CodType} INT,
       ${GText.infoDB.Table.Itens.fields.CodCancel} INT,
       ${GText.infoDB.Table.Itens.fields.Item} INT,
       ${GText.infoDB.Table.Itens.fields.ColetaNumber} TEXT,
       ${GText.infoDB.Table.Itens.fields.Status}  TEXT,
       ${GText.infoDB.Table.Itens.fields.InclusionDate}  DATE,
       ${GText.infoDB.Table.Itens.fields.InclusionHour} TIME,
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
       ${GText.infoDB.Table.Itens.fields.CancelDate}   DATE,
       ${GText.infoDB.Table.Itens.fields.CancelHour} TIME,
       ${GText.infoDB.Table.Itens.fields.CancelUser} TEXT,
       ${GText.infoDB.Table.Itens.fields.CancelStation} TEXT
   );
     `,
        [],
        (sqlTxn, res) => {
          // // console.log("table created successfully");
        },
        error => {
          console.log("error on creating table " + error.message);
        },
      );
    });
  }
 Itens()


/**
 * CRIAÇÃO DE UM NOVO REGISTRO
 * - Recebe um objeto;
 * - Retorna uma Promise:
 *  - O resultado da Promise é o ID do registro (criado por AUTOINCREMENT)
 *  - Pode retornar erro (reject) caso exista erro no SQL ou nos parâmetros.
 */
const create = (obj) => {
  console.log(obj.IdMobile)
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      //comando SQL modificável
      tx.executeSql(
        `INSERT INTO ${GText.infoDB.Table.Itens.name} (
          ${GText.infoDB.Table.Itens.fields.IdMobile} ,
          ${GText.infoDB.Table.Itens.fields.CodImport}  ,
          ${GText.infoDB.Table.Itens.fields.CodCompany} ,
          ${GText.infoDB.Table.Itens.fields.CodBranch}  ,
          ${GText.infoDB.Table.Itens.fields.CodPriority} ,
          ${GText.infoDB.Table.Itens.fields.ColetaDate} ,
          ${GText.infoDB.Table.Itens.fields.CodSalesmanI} ,
          ${GText.infoDB.Table.Itens.fields.CodSalesman} ,
          ${GText.infoDB.Table.Itens.fields.CodCollector} ,
          ${GText.infoDB.Table.Itens.fields.CodTechnician}  ,
          ${GText.infoDB.Table.Itens.fields.CodClient} ,
          ${GText.infoDB.Table.Itens.fields.CodSituation} ,
          ${GText.infoDB.Table.Itens.fields.CodProduct} ,
          ${GText.infoDB.Table.Itens.fields.CodBrand}  ,
          ${GText.infoDB.Table.Itens.fields.CodType} ,
          ${GText.infoDB.Table.Itens.fields.CodCancel} ,
          ${GText.infoDB.Table.Itens.fields.Item} ,
          ${GText.infoDB.Table.Itens.fields.ColetaNumber} ,
          ${GText.infoDB.Table.Itens.fields.Status}  ,
          ${GText.infoDB.Table.Itens.fields.InclusionDate}  ,
          ${GText.infoDB.Table.Itens.fields.InclusionHour} ,
          ${GText.infoDB.Table.Itens.fields.InclusionUser}  ,
          ${GText.infoDB.Table.Itens.fields.InclusionStation} ,
          ${GText.infoDB.Table.Itens.fields.Date}  ,
          ${GText.infoDB.Table.Itens.fields.NameClient}  ,
          ${GText.infoDB.Table.Itens.fields.IdIdentityClient} ,
          ${GText.infoDB.Table.Itens.fields.Phone} ,
          ${GText.infoDB.Table.Itens.fields.Warranty} ,
          ${GText.infoDB.Table.Itens.fields.ImportColeta} ,
          ${GText.infoDB.Table.Itens.fields.NameProduct} ,
          ${GText.infoDB.Table.Itens.fields.SerieNumber} ,
          ${GText.infoDB.Table.Itens.fields.Brand} ,
          ${GText.infoDB.Table.Itens.fields.Modelo} ,
          ${GText.infoDB.Table.Itens.fields.Dimension} ,
          ${GText.infoDB.Table.Itens.fields.Design} ,
          ${GText.infoDB.Table.Itens.fields.FireNumber} ,
          ${GText.infoDB.Table.Itens.fields.DotNumber} ,
          ${GText.infoDB.Table.Itens.fields.Board} ,
          ${GText.infoDB.Table.Itens.fields.ServicesExec} ,
          ${GText.infoDB.Table.Itens.fields.InitialExam} ,
          ${GText.infoDB.Table.Itens.fields.Observation}  ,
          ${GText.infoDB.Table.Itens.fields.Value}  ,
          ${GText.infoDB.Table.Itens.fields.CancelObservation} ,
          ${GText.infoDB.Table.Itens.fields.CancelDate}  ,
          ${GText.infoDB.Table.Itens.fields.CancelHour} ,
          ${GText.infoDB.Table.Itens.fields.CancelUser} ,
          ${GText.infoDB.Table.Itens.fields.CancelStation}
        ) 
        
        values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
        [
          obj[`${GText.infoDB.Table.Itens.fields.IdMobile}`],
          obj[`${GText.infoDB.Table.Itens.fields.CodImport}`],
          obj[`${GText.infoDB.Table.Itens.fields.CodCompany}`],
          obj[`${GText.infoDB.Table.Itens.fields.CodBranch}`],
          obj[`${GText.infoDB.Table.Itens.fields.CodSalesmanI}`],
          obj[`${GText.infoDB.Table.Itens.fields.CodPriority}`],
          obj[`${GText.infoDB.Table.Itens.fields.ColetaDate}`],
          obj[`${GText.infoDB.Table.Itens.fields.CodCollector}`],
          obj[`${GText.infoDB.Table.Itens.fields.CodTechnician}`],
          obj[`${GText.infoDB.Table.Itens.fields.CodClient}`],
          obj[`${GText.infoDB.Table.Itens.fields.CodSituation}`],
          obj[`${GText.infoDB.Table.Itens.fields.CodProduct}`],
          obj[`${GText.infoDB.Table.Itens.fields.CodBrand}`],
          obj[`${GText.infoDB.Table.Itens.fields.CodType}`],
          obj[`${GText.infoDB.Table.Itens.fields.CodCancel}`],
          obj[`${GText.infoDB.Table.Itens.fields.Item}`],
          obj[`${GText.infoDB.Table.Itens.fields.ColetaNumber}`],
          obj[`${GText.infoDB.Table.Itens.fields.Status}`],
          obj[`${GText.infoDB.Table.Itens.fields.InclusionDate}`],
          obj[`${GText.infoDB.Table.Itens.fields.InclusionHour}`],
          obj[`${GText.infoDB.Table.Itens.fields.InclusionUser}`],
          obj[`${GText.infoDB.Table.Itens.fields.InclusionStation}`],
          obj[`${GText.infoDB.Table.Itens.fields.Date}`],
          obj[`${GText.infoDB.Table.Itens.fields.NameClient}`],
          obj[`${GText.infoDB.Table.Itens.fields.IdIdentityClient}`],
          obj[`${GText.infoDB.Table.Itens.fields.Phone}`],
          obj[`${GText.infoDB.Table.Itens.fields.Warranty}`],
          obj[`${GText.infoDB.Table.Itens.fields.ImportColeta}`],
          obj[`${GText.infoDB.Table.Itens.fields.NameProduct}`],
          obj[`${GText.infoDB.Table.Itens.fields.SerieNumber}`],
          obj[`${GText.infoDB.Table.Itens.fields.Brand}`],
          obj[`${GText.infoDB.Table.Itens.fields.Modelo}`],
          obj[`${GText.infoDB.Table.Itens.fields.Dimension}`],
          obj[`${GText.infoDB.Table.Itens.fields.Design}`],
          obj[`${GText.infoDB.Table.Itens.fields.FireNumber}`],
          obj[`${GText.infoDB.Table.Itens.fields.DotNumber}`],
          obj[`${GText.infoDB.Table.Itens.fields.Board}`],
          obj[`${GText.infoDB.Table.Itens.fields.ServicesExec}`],
          obj[`${GText.infoDB.Table.Itens.fields.InitialExam}`],
          obj[`${GText.infoDB.Table.Itens.fields.Observation}`],
          obj[`${GText.infoDB.Table.Itens.fields.Value}`],
          obj[`${GText.infoDB.Table.Itens.fields.CancelObservation}`],
          obj[`${GText.infoDB.Table.Itens.fields.CancelDate}`],
          obj[`${GText.infoDB.Table.Itens.fields.CancelHour}`],
          obj[`${GText.infoDB.Table.Itens.fields.CancelUser}`],
          obj[`${GText.infoDB.Table.Itens.fields.CancelStation}`]

        ],
        (sqlTxn, res) => {
          let len = res.rows.length;
          if (len > 0) {
            for (let i = 0; i < len; i++) {
              let item = res.rows.item(i);
              let results = []
              results.push(item);
              resolve(results)  //return de object when the Promisse is complete
            }
          }
        },
        error => {
          reject(error.message, obj)
          console.log(`error on create ${GText.infoDB.Table.Itens.name} ` + error.message, obj.idMobile);
        },
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
const update = (id, obj) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      //comando SQL modificável
      tx.executeSql(
        `UPDATE ${GText.infoDB.Table.Itens.name} SET 
        ${GText.infoDB.Table.Itens.fields.CodImport} =?,
        ${GText.infoDB.Table.Itens.fields.CodCompany} =?,
        ${GText.infoDB.Table.Itens.fields.CodBranch} =?,
        ${GText.infoDB.Table.Itens.fields.CodPriority}=?,
        ${GText.infoDB.Table.Itens.fields.ColetaDate}=?,
        ${GText.infoDB.Table.Itens.fields.CodSalesmanI}=?,
        ${GText.infoDB.Table.Itens.fields.CodSalesman}=?,
        ${GText.infoDB.Table.Itens.fields.CodCollector}=?,
        ${GText.infoDB.Table.Itens.fields.CodTechnician} =?,
        ${GText.infoDB.Table.Itens.fields.CodClient}=?,
        ${GText.infoDB.Table.Itens.fields.CodSituation}=?,
        ${GText.infoDB.Table.Itens.fields.CodProduct}=?,
        ${GText.infoDB.Table.Itens.fields.CodBrand} =?,
        ${GText.infoDB.Table.Itens.fields.CodType}=?,
        ${GText.infoDB.Table.Itens.fields.CodCancel}=?,
        ${GText.infoDB.Table.Itens.fields.Item}=?,
        ${GText.infoDB.Table.Itens.fields.ColetaNumber}=?,
        ${GText.infoDB.Table.Itens.fields.Status} =?,
        ${GText.infoDB.Table.Itens.fields.InclusionDate} =?,
        ${GText.infoDB.Table.Itens.fields.InclusionHour}=?,
        ${GText.infoDB.Table.Itens.fields.InclusionUser} =?,
        ${GText.infoDB.Table.Itens.fields.InclusionStation}=?,
        ${GText.infoDB.Table.Itens.fields.Date} =?,
        ${GText.infoDB.Table.Itens.fields.NameClient} =?,
        ${GText.infoDB.Table.Itens.fields.IdIdentityClient}=?,
        ${GText.infoDB.Table.Itens.fields.Phone}=?,
        ${GText.infoDB.Table.Itens.fields.Warranty}=?,
        ${GText.infoDB.Table.Itens.fields.ImportColeta}=?,
        ${GText.infoDB.Table.Itens.fields.NameProduct}=?,
        ${GText.infoDB.Table.Itens.fields.SerieNumber}=?,
        ${GText.infoDB.Table.Itens.fields.Brand}=?,
        ${GText.infoDB.Table.Itens.fields.Modelo}=?,
        ${GText.infoDB.Table.Itens.fields.Dimension}=?,
        ${GText.infoDB.Table.Itens.fields.Design}=?,
        ${GText.infoDB.Table.Itens.fields.FireNumber}=?,
        ${GText.infoDB.Table.Itens.fields.DotNumber}=?,
        ${GText.infoDB.Table.Itens.fields.Board}=?,
        ${GText.infoDB.Table.Itens.fields.ServicesExec}=?,
        ${GText.infoDB.Table.Itens.fields.InitialExam}=?,
        ${GText.infoDB.Table.Itens.fields.Observation} =?,
        ${GText.infoDB.Table.Itens.fields.Value} =?,
        ${GText.infoDB.Table.Itens.fields.CancelObservation}=?,
        ${GText.infoDB.Table.Itens.fields.CancelDate} =?,
        ${GText.infoDB.Table.Itens.fields.CancelHour}=?,
        ${GText.infoDB.Table.Itens.fields.CancelUser}=?,
        ${GText.infoDB.Table.Itens.fields.CancelStation}=?
        WHERE ${GText.infoDB.Table.Itens.fields.IdMobile}=?;`,
        [
          obj[`${GText.infoDB.Table.Itens.fields.CodImport}`],
          obj[`${GText.infoDB.Table.Itens.fields.CodCompany}`],
          obj[`${GText.infoDB.Table.Itens.fields.CodBranch}`],
          obj[`${GText.infoDB.Table.Itens.fields.CodSalesmanI}`],
          obj[`${GText.infoDB.Table.Itens.fields.CodPriority}`],
          obj[`${GText.infoDB.Table.Itens.fields.ColetaDate}`],
          obj[`${GText.infoDB.Table.Itens.fields.CodCollector}`],
          obj[`${GText.infoDB.Table.Itens.fields.CodTechnician}`],
          obj[`${GText.infoDB.Table.Itens.fields.CodClient}`],
          obj[`${GText.infoDB.Table.Itens.fields.CodSituation}`],
          obj[`${GText.infoDB.Table.Itens.fields.CodProduct}`],
          obj[`${GText.infoDB.Table.Itens.fields.CodBrand}`],
          obj[`${GText.infoDB.Table.Itens.fields.CodType}`],
          obj[`${GText.infoDB.Table.Itens.fields.CodCancel}`],
          obj[`${GText.infoDB.Table.Itens.fields.Item}`],
          obj[`${GText.infoDB.Table.Itens.fields.ColetaNumber}`],
          obj[`${GText.infoDB.Table.Itens.fields.Status}`],
          obj[`${GText.infoDB.Table.Itens.fields.InclusionDate}`],
          obj[`${GText.infoDB.Table.Itens.fields.InclusionHour}`],
          obj[`${GText.infoDB.Table.Itens.fields.InclusionUser}`],
          obj[`${GText.infoDB.Table.Itens.fields.InclusionStation}`],
          obj[`${GText.infoDB.Table.Itens.fields.Date}`],
          obj[`${GText.infoDB.Table.Itens.fields.NameClient}`],
          obj[`${GText.infoDB.Table.Itens.fields.IdIdentityClient}`],
          obj[`${GText.infoDB.Table.Itens.fields.Phone}`],
          obj[`${GText.infoDB.Table.Itens.fields.Warranty}`],
          obj[`${GText.infoDB.Table.Itens.fields.ImportColeta}`],
          obj[`${GText.infoDB.Table.Itens.fields.NameProduct}`],
          obj[`${GText.infoDB.Table.Itens.fields.SerieNumber}`],
          obj[`${GText.infoDB.Table.Itens.fields.Brand}`],
          obj[`${GText.infoDB.Table.Itens.fields.Modelo}`],
          obj[`${GText.infoDB.Table.Itens.fields.Dimension}`],
          obj[`${GText.infoDB.Table.Itens.fields.Design}`],
          obj[`${GText.infoDB.Table.Itens.fields.FireNumber}`],
          obj[`${GText.infoDB.Table.Itens.fields.DotNumber}`],
          obj[`${GText.infoDB.Table.Itens.fields.Board}`],
          obj[`${GText.infoDB.Table.Itens.fields.ServicesExec}`],
          obj[`${GText.infoDB.Table.Itens.fields.InitialExam}`],
          obj[`${GText.infoDB.Table.Itens.fields.Observation}`],
          obj[`${GText.infoDB.Table.Itens.fields.Value}`],
          obj[`${GText.infoDB.Table.Itens.fields.CancelObservation}`],
          obj[`${GText.infoDB.Table.Itens.fields.CancelDate}`],
          obj[`${GText.infoDB.Table.Itens.fields.CancelHour}`],
          obj[`${GText.infoDB.Table.Itens.fields.CancelUser}`],
          obj[`${GText.infoDB.Table.Itens.fields.CancelStation}`],
          id],
        //generate a object with the result of SQL
        (sqlTxn, res) => {
          let len = res.rows.length;
          if (len > 0) {
            for (let i = 0; i < len; i++) {
              let item = res.rows.item(i);
              let results = []
              results.push(item);
              resolve(results)  //return de object when the Promisse is complete
            }
          }
        },
        error => {
          reject(error.message)
          console.log(`error on update ${GText.infoDB.Table.Itens.name} ` + error.message);
        },
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
          let len = res.rows.length;
          if (len > 0) {
            for (let i = 0; i < len; i++) {
              let item = res.rows.item(i);
              let results = [];
              results.push(item);
              resolve(results)  //return de object when the Promisse is complete
            }
          }
        },
        error => {
          reject(error.message)
          console.log(`error on find ${GText.infoDB.Table.Itens.name} ` + error.message);
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
const findLike = (field, param) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      //comando SQL modificável
      tx.executeSql(
        `SELECT * FROM ${GText.infoDB.Table.Itens.name} WHERE ${field} LIKE ?;`,
        [param],
        (sqlTxn, res) => {
          let len = res.rows.length;
          if (len > 0) {
            for (let i = 0; i < len; i++) {
              let item = res.rows.item(i);
              let results = []
              results.push(item);
              resolve(results)  //return de object when the Promisse is complete
            }
          }
        },
        error => {
          reject(error.message)
          console.log(`error on finBy ${GText.infoDB.Table.Itens.name} ` + error.message);
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
          let len = res.rows.length;
          console.log(res.rows)
          if (len > 0) {
            for (let i = 0; i < len; i++) {
              let item = res.rows.item(i);
              let results = []
              results.push(item);
              console.log(results)
              resolve(results)  //return de object when the Promisse is complete
            }
          }
        },
        error => {
          reject(error.message)
          console.log(`error on findAll ${GText.infoDB.Table.Itens.name} ` + error.message);
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
const remove = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      //comando SQL modificável
      tx.executeSql(
        `DELETE FROM ${GText.infoDB.Table.Itens.name} 
        WHERE ${GText.infoDB.Table.Itens.fields.IdMobile}=?;`,
        [id],
        (sqlTxn, res) => {
          let len = res.rows.length;
          if (len > 0) {
            for (let i = 0; i < len; i++) {
              let item = res.rows.item(i);
              let results = []
              results.push(item);
              resolve(results)  //return de object when the Promisse is complete
            }
          }
        },
        error => {
          reject(error.message)
          console.log(`error on removeById ${GText.infoDB.Table.Itens.name} ` + error.message);
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
          let len = res.rows.length;
          if (len > 0) {
            for (let i = 0; i < len; i++) {
              let item = res.rows.item(i);
              let results = []
              results.push(item);
              resolve(results)  //return de object when the Promisse is complete
            }
          }
        },
        error => {
          reject(error.message)
          console.log(`error on find ${GText.infoDB.Table.Itens.name} ` + error.message);
        }
      );
    });
  });
};

export default {
  create,
  update,
  find,
  findLike,
  all,
  remove,
  removeAll
};
