import GText from "../../../global/texts";
import db from "../SQLiteDatabase";

/**
 * INICIALIZAÇÃO DA TABELA
 * - Executa sempre, mas só cria a tabela caso não exista (primeira execução)
 */

  function Profile() {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS ${GText.infoDB.Table.Profile.name} 
      (
        ${GText.infoDB.Table.Profile.fields.id} INTEGER PRIMARY KEY,
        ${GText.infoDB.Table.Profile.fields.name}  TEXT,
        ${GText.infoDB.Table.Profile.fields.email}  TEXT,
        ${GText.infoDB.Table.Profile.fields.company}  INT,
        ${GText.infoDB.Table.Profile.fields.defaultBranch}  INT,
        ${GText.infoDB.Table.Profile.fields.initSequence}  INT,
        ${GText.infoDB.Table.Profile.fields.finalSequence}  INT
    );
      `,
        [],
        (sqlTxn, res) => {
          // console.log("table created successfully");
        },
        error => {
          console.log("error on creating table " + error.message);
        },
      );
    });
  }
  Profile()
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
        `INSERT INTO ${GText.infoDB.Table.Profile.name} (
          ${GText.infoDB.Table.Profile.fields.id},
          ${GText.infoDB.Table.Profile.fields.name},
          ${GText.infoDB.Table.Profile.fields.email},
          ${GText.infoDB.Table.Profile.fields.company},
          ${GText.infoDB.Table.Profile.fields.defaultBranch},
          ${GText.infoDB.Table.Profile.fields.initSequence},
          ${GText.infoDB.Table.Profile.fields.finalSequence}
        ) 
        values (?, ?, ?, ?, ?, ?, ?);`,
        [
          obj[`${GText.infoDB.Table.Profile.fields.id}`],
          obj[`${GText.infoDB.Table.Profile.fields.name}`],
          obj[`${GText.infoDB.Table.Profile.fields.email}`],
          obj[`${GText.infoDB.Table.Profile.fields.company}`],
          obj[`${GText.infoDB.Table.Profile.fields.defaultBranch}`],
          obj[`${GText.infoDB.Table.Profile.fields.initSequence}`],
          obj[`${GText.infoDB.Table.Profile.fields.finalSequence}`]
        ],
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
          console.log(`error on create ${GText.infoDB.Table.Profile.name} ` + error.message);
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
        `UPDATE ${GText.infoDB.Table.Profile.name} SET 
        ${GText.infoDB.Table.Profile.fields.id}=?,
        ${GText.infoDB.Table.Profile.fields.name}=?,
        ${GText.infoDB.Table.Profile.fields.email}=?,
        ${GText.infoDB.Table.Profile.fields.company}=?,
        ${GText.infoDB.Table.Profile.fields.defaultBranch}=?,
        ${GText.infoDB.Table.Profile.fields.initSequence}=?,
        ${GText.infoDB.Table.Profile.fields.finalSequence}=?
        WHERE ${GText.infoDB.Table.Profile.fields.id}=?;`,
        [
          obj[`${GText.infoDB.Table.Profile.fields.name}`],
          obj[`${GText.infoDB.Table.Profile.fields.email}`],
          obj[`${GText.infoDB.Table.Profile.fields.company}`],
          obj[`${GText.infoDB.Table.Profile.fields.defaultBranch}`],
          obj[`${GText.infoDB.Table.Profile.fields.initSequence}`],
          obj[`${GText.infoDB.Table.Profile.fields.finalSequence}`],
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
          console.log(`error on update ${GText.infoDB.Table.Profile.name} ` + error.message);
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
        `SELECT * FROM ${GText.infoDB.Table.Profile.name} 
        WHERE ${GText.infoDB.Table.Profile.fields.id}=?;`,
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
          console.log(`error on find ${GText.infoDB.Table.Profile.name} ` + error.message);
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
        `SELECT * FROM ${GText.infoDB.Table.Profile.name} WHERE ${field} LIKE ?;`,
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
          console.log(`error on FindLike ${GText.infoDB.Table.Profile.name} ` + error.message);
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
        `SELECT * FROM ${GText.infoDB.Table.Profile.name};`,
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
          console.log(`error on findAll ${GText.infoDB.Table.Profile.name} ` + error.message);
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
        `DELETE FROM ${GText.infoDB.Table.Profile.name} 
        WHERE ${GText.infoDB.Table.Profile.fields.id}=?;`,
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
          console.log(`error on removeById ${GText.infoDB.Table.Profile.name} ` + error.message);
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
        `DELETE From ${GText.infoDB.Table.Profile.name} ;`,
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
          console.log(`error on find ${GText.infoDB.Table.Profile.name} ` + error.message);
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
