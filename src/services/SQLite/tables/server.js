import GText from "../../../global/texts";
import db from "../SQLiteDatabase";

/**
 * INICIALIZAÇÃO DA TABELA
 * - Executa sempre, mas só cria a tabela caso não exista (primeira execução)
 */

  function Server() {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS ${GText.infoDB.Table.Server.name} 
      (
        ${GText.infoDB.Table.Server.fields.id} INTEGER PRIMARY KEY AUTOINCREMENT,
        ${GText.infoDB.Table.Server.fields.name}  TEXT,
        ${GText.infoDB.Table.Server.fields.description}  TEXT,
        ${GText.infoDB.Table.Server.fields.protocol}  INT,
        ${GText.infoDB.Table.Server.fields.ip}  TEXT,
        ${GText.infoDB.Table.Server.fields.port}  TEXT,
        ${GText.infoDB.Table.Server.fields.baseURL}  TEXT,
        ${GText.infoDB.Table.Server.fields.priority}  INTEGER,
        ${GText.infoDB.Table.Server.fields.default}  TEXT,
        ${GText.infoDB.Table.Server.fields.extra}  TEXT
    );
      `,
        [],
        (sqlTxn, res) => {
          // console.log("table created successfully");
        },
        error => {
          console.log("error on creating table server " + error.message);
        },
      );
    });
  }
  Server()
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
      //SQL Comand
      tx.executeSql(
        `INSERT INTO ${GText.infoDB.Table.Server.name} (
          ${GText.infoDB.Table.Server.fields.name},
          ${GText.infoDB.Table.Server.fields.description},
          ${GText.infoDB.Table.Server.fields.protocol},
          ${GText.infoDB.Table.Server.fields.ip},
          ${GText.infoDB.Table.Server.fields.port},
          ${GText.infoDB.Table.Server.fields.baseURL},
          ${GText.infoDB.Table.Server.fields.priority},
          ${GText.infoDB.Table.Server.fields.default},
          ${GText.infoDB.Table.Server.fields.extra}
        ) 
        values ( ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
        [
          obj[`${GText.infoDB.Table.Server.fields.name}`],
          obj[`${GText.infoDB.Table.Server.fields.description}`],
          obj[`${GText.infoDB.Table.Server.fields.protocol}`],
          obj[`${GText.infoDB.Table.Server.fields.ip}`],
          obj[`${GText.infoDB.Table.Server.fields.port}`],
          obj[`${GText.infoDB.Table.Server.fields.baseURL}`],
          obj[`${GText.infoDB.Table.Server.fields.priority}`],
          obj[`${GText.infoDB.Table.Server.fields.default}`],
          obj[`${GText.infoDB.Table.Server.fields.extra}`]
        ],
        //generate a object with the result of SQL
        (sqlTxn, res) => {
          let len = res.rows.length;
          let results = false
          
          if (len > 0) {
            results = []
           for (let i = 0; i < len; i++) {
              let item = res.rows.item(i);
              results.push(item);
            }
          }
          resolve(results)  //return de object when the Promisse is complete
        },
        error => {
          reject(error.message)
          console.log(`error on create ${GText.infoDB.Table.Server.name} ` + error.message);
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
        `UPDATE ${GText.infoDB.Table.Server.name} SET 
        ${GText.infoDB.Table.Server.fields.name}=?,
        ${GText.infoDB.Table.Server.fields.description}=?,
        ${GText.infoDB.Table.Server.fields.protocol}=?,
        ${GText.infoDB.Table.Server.fields.ip}=?,
        ${GText.infoDB.Table.Server.fields.port}=?,
        ${GText.infoDB.Table.Server.fields.baseURL}=?,
        ${GText.infoDB.Table.Server.fields.priority}=?,
        ${GText.infoDB.Table.Server.fields.default}=?
        ${GText.infoDB.Table.Server.fields.extra}=?
        WHERE ${GText.infoDB.Table.Server.fields.id}=?;`,
        [
          obj[`${GText.infoDB.Table.Server.fields.name}`],
          obj[`${GText.infoDB.Table.Server.fields.description}`],
          obj[`${GText.infoDB.Table.Server.fields.protocol}`],
          obj[`${GText.infoDB.Table.Server.fields.ip}`],
          obj[`${GText.infoDB.Table.Server.fields.port}`],
          obj[`${GText.infoDB.Table.Server.fields.baseURL}`],
          obj[`${GText.infoDB.Table.Server.fields.priority}`],
          obj[`${GText.infoDB.Table.Server.fields.default}`],
          obj[`${GText.infoDB.Table.Server.fields.extra}`],
          id],
        //generate a object with the result of SQL
        (sqlTxn, res) => {
          let results = false
          let len = res.rows.length;
          if (len > 0) {
            results = []
            for (let i = 0; i < len; i++) {
              let item = res.rows.item(i);
              results.push(item);
            }
          }
          resolve(results)  //return de object when the Promisse is complete
        },
        error => {
          reject(error.message)
          console.log(`error on update ${GText.infoDB.Table.Server.name} ` + error.message);
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
        `SELECT * FROM ${GText.infoDB.Table.Server.name} 
        WHERE ${GText.infoDB.Table.Server.fields.id}=?;`,
        [id],
        (sqlTxn, res) => {
          let results = false
          let len = res.rows.length;
          if (len > 0) {
            results = []
            for (let i = 0; i < len; i++) {
              let item = res.rows.item(i);
              results.push(item);
            }
          }
          resolve(results)  //return de object when the Promisse is complete
        },
        error => {
          reject(error.message)
          console.log(`error on find ${GText.infoDB.Table.Server.name} ` + error.message);
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
        `SELECT * FROM ${GText.infoDB.Table.Server.name} WHERE ${field} LIKE ?;`,
        [param],
        (sqlTxn, res) => {
          let results = false
          let len = res.rows.length;
          if (len > 0) {
            results = []
            for (let i = 0; i < len; i++) {
              let item = res.rows.item(i);
              results.push(item);
            }
          }
          resolve(results)  //return de object when the Promisse is complete
        },
        error => {
          reject(error.message)
          console.log(`error on FindLike ${GText.infoDB.Table.Server.name} ` + error.message);
        }
      );
    });
  });
};


const findDefault = (field, param) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      //comando SQL modificável
      tx.executeSql(
        `SELECT ${GText.infoDB.Table.Server.fields.baseURL} FROM ${GText.infoDB.Table.Server.name} 
        WHERE ${GText.infoDB.Table.Server.fields.default} = '${GText.ValueDefaultServer}';`,
        [],
        (sqlTxn, res) => {
          let results = false
          let len = res.rows.length;
          if (len > 0) {
            results = []
            for (let i = 0; i < len; i++) {
              let item = res.rows.item(i);
              results.push(item);
            }
          }
          resolve(results)  //return de object when the Promisse is complete
        },
        error => {
          reject(error.message)
          console.log(`error on FindLike ${GText.infoDB.Table.Server.name} ` + error.message);
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
  let results = false
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      //comando SQL modificável
      tx.executeSql(
        `SELECT * FROM ${GText.infoDB.Table.Server.name};`,
        [],
        (sqlTxn, res) => {
          let results = false
          let len = res.rows.length;
          if (len > 0) {
            results = []
            for (let i = 0; i < len; i++) {
              let item = res.rows.item(i);
              results.push(item);
            }
          }
          resolve(results)  //return de object when the Promisse is complete
        },
        error => {
          reject(results)
          console.log(`error on findAll ${GText.infoDB.Table.Server.name} ` + error.message);
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
        `DELETE FROM ${GText.infoDB.Table.Server.name} 
        WHERE ${GText.infoDB.Table.Server.fields.id}=?;`,
        [id],
        (sqlTxn, res) => {
          let results = false
          let len = res.rows.length;
          if (len > 0) {
            results = []
            for (let i = 0; i < len; i++) {
              let item = res.rows.item(i);
              results.push(item);
            }
          }
          resolve(results)  //return de object when the Promisse is complete
        },
        error => {
          reject(error.message)
          console.log(`error on removeById ${GText.infoDB.Table.Server.name} ` + error.message);
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
        `DELETE From ${GText.infoDB.Table.Server.name} ;`,
        [],
        (sqlTxn, res) => {
          let results = false
          let len = res.rows.length;
          if (len > 0) {
            results = []
            for (let i = 0; i < len; i++) {
              let item = res.rows.item(i);
              results.push(item);
            }
          }
          resolve(results)  //return de object when the Promisse is complete
        },
        error => {
          reject(error.message)
          console.log(`error on find ${GText.infoDB.Table.Server.name} ` + error.message);
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
  findDefault,
  all,
  remove,
  removeAll
};
