import GText from "../../../global/texts";
import db from "../SQLiteDatabase";

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
    //droptable()
    //   //<<<<<<<<<<<<<<<<<<<<<<<< USE ISSO APENAS DURANTE OS TESTES!!! >>>>>>>>>>>>>>>>>>>>>>>

    function createTable() {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS ${GText.infoDB.Table.Itens.name} 
     (
       ${GText.infoDB.Table.Itens.fields.IdMobile} INTEGER PRIMARY KEY AUTOINCREMENT,
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
       ${GText.infoDB.Table.Itens.fields.Date}  TEXT,
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
       ${GText.infoDB.Table.Itens.fields.CodBranch} TEXT
       
   );
     `,
        [],
        (sqlTxn, res) => {
        //    console.log("table created successfully", GText.infoDB.Table.Itens.fields.CodWarranty);
        },
        error => {
          console.log("error on creating table " + error.message);
        },
      );
    }
    createTable()

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
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      //comando SQL modificável
      tx.executeSql(
        `INSERT INTO ${GText.infoDB.Table.Itens.name} (
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
          ${GText.infoDB.Table.Itens.fields.CancelStation} ,
          ${GText.infoDB.Table.Itens.fields.CodSituation} ,
          ${GText.infoDB.Table.Itens.fields.CodBranch} ,
          ${GText.infoDB.Table.Itens.fields.CodWarranty}
        ) 
        values (
          ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,
          ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);`,
        [
          obj[`${GText.infoDB.Table.Itens.fields.CodImport}`],
          obj[`${GText.infoDB.Table.Itens.fields.CodCompany}`],
          obj[`${GText.infoDB.Table.Itens.fields.CodBranch}`],
          obj[`${GText.infoDB.Table.Itens.fields.CodPriority}`],
          obj[`${GText.infoDB.Table.Itens.fields.ColetaDate}`],
          obj[`${GText.infoDB.Table.Itens.fields.CodSalesmanI}`],
          obj[`${GText.infoDB.Table.Itens.fields.CodSalesman}`],
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
          obj[`${GText.infoDB.Table.Itens.fields.CodSituation}`],
          obj[`${GText.infoDB.Table.Itens.fields.CodBranch}`],
          obj[`${GText.infoDB.Table.Itens.fields.CodWarranty}`]

        ],
        (sqlTxn, res) => {
          // console.log(sqlTxn)
          let results = []
          let len = res.rows.length;
          if (len > 0) {
            for (let i = 0; i < len; i++) {
              let item = res.rows.item(i);
              results.push(item);
            }
          }
         // console.log(results)
          resolve(results)  //return de object when the Promisse is complete
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
const update = (where, param, obj) => {
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
        WHERE ${where}=?;`,
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
          param],
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
const findLike = (field, param, field2, condition ,  param2) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      const sql = `SELECT * FROM ${GText.infoDB.Table.Itens.name} WHERE ${field} LIKE ? 
      ${field2 !== undefined ? `AND ${field2} ${condition} '${param2}'` : ''}
      ;`
      //comando SQL modificável
      tx.executeSql(
        sql,
        [param],
        (sqlTxn, res) => {
          let results = []
          let len = res.rows.length;
          if (len > 0) {
            for (let i = 0; i < len; i++) {
              let item = res.rows.item(i);
              results.push(item);
            }
          }
          resolve(results)  //return de object when the Promisse is complete
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
          let results = []
          let len = res.rows.length;
          if (len > 0) {
            for (let i = 0; i < len; i++) {
              let item = res.rows.item(i);
              results.push(item);
            }
          }
          resolve(results)  //return de object when the Promisse is complete
        },
        error => {
          reject(error.message)
          console.log(`error on findAll ${GText.infoDB.Table.Itens.name} ` + error.message);
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
      const sql =  `
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
        ${GText.infoDB.Table.Itens.fields.NameClient} 
      FROM ${GText.infoDB.Table.Itens.name} Table1

      ${where !== undefined ? `
      where ${where} = '${param}'
      ` : ''}
      ${param2 !== undefined ? `
      or ${where} = '${param2}'
      ` : ''}
      Group By ${GText.infoDB.Table.Itens.fields.ColetaNumber}
      order by ${GText.infoDB.Table.Itens.fields.IdMobile} desc )
      ${param2 !== undefined ? `
      where ${GText.ItensNotSended} = 0
      ` : ''}
      `
      //comando SQL modificável
    // console.log(sql)
      tx.executeSql(
        sql
       ,
        [],
        (sqlTxn, res) => {
          let results = []
          let len = res.rows.length;
          if (len > 0) {
            for (let i = 0; i < len; i++) {
              let item = res.rows.item(i);
              results.push(item);
            }
          }
          // console.log(results)
          resolve(results)  //return de object when the Promisse is complete
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
        ?
        `SELECT * FROM ${GText.infoDB.Table.Itens.name} 
        ORDER BY ${GText.infoDB.Table.Itens.fields.IdMobile} DESC  ;`
        :
        ////tem que pesquisar com fazer o "TOP 1 no sqlite"

        `SELECT * FROM ${GText.infoDB.Table.Itens.name} 
        WHERE ${field} = ${param}
        ORDER BY ${GText.infoDB.Table.Itens.fields.IdMobile} DESC  ;`,
        [],
        (sqlTxn, res) => {
          let results = null
          let len = res.rows.length;
          if (len > 0) {
            results = []
            results.push(res.rows.item(0))
            // for (let i = 0; i < len; i++) {
            //   let item = res.rows.item(i);
            //   results.push(item);
            // }
          }
         // console.log(results)
          resolve(results)  //return de object when the Promisse is complete
        },
        error => {
          reject(error.message)
          console.log(`error on FindLastItem ${GText.infoDB.Table.Itens.name} ` + error.message);
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
const remove = (field, param) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      //comando SQL modificável
      tx.executeSql(
        `DELETE FROM ${GText.infoDB.Table.Itens.name} 
        WHERE ${field}=?;`,
        [param],
        (sqlTxn, res) => {
          let results = []
          let len = res.rows.length;
          if (len > 0) {
            for (let i = 0; i < len; i++) {
              let item = res.rows.item(i);
              
              results.push(item);
             
            }
          }
          resolve(results)  //return de object when the Promisse is complete
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

const updateStatus = (where, param,param2, newStatus)=>{
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `UPDATE ${GText.infoDB.Table.Itens.name} SET 
        ${GText.infoDB.Table.Itens.fields.Status} = ?
        WHERE ${where} = ? 
        and ${GText.infoDB.Table.Itens.fields.Status} = '${param2}';`,
        [newStatus, param],
        (sqlTxn, res) => {
          let len = res.rows.length;
          let results = []
          if (len > 0) {
            for (let i = 0; i < len; i++) {
              let item = res.rows.item(i);
              results.push(item);
            }
          }
          
          resolve(results)  //return de object when the Promisse is complete
        },
        error => {
          reject(error.message)
          console.log(`error on update ${GText.infoDB.Table.Itens.name} ` + error.message);
        },
      );
    });
  });
}

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
  removeAll
};
