import GText from "../../../global/texts";
import db from "../SQLiteDatabase";

/**
 * INICIALIZAÇÃO DA TABELA
 * - Executa sempre, mas só cria a tabela caso não exista (primeira execução)
 */

  function Brands() {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS ${GText.infoDB.Table.Brands.name} 
      (
        ${GText.infoDB.Table.Brands.fields.id} INTEGER PRIMARY KEY AUTOINCREMENT,
        ${GText.infoDB.Table.Brands.fields.name}  TEXT
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
Brands()

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
        `INSERT INTO ${GText.infoDB.Table.Brands.name} (
          ${GText.infoDB.Table.Brands.fields.id},
          ${GText.infoDB.Table.Brands.fields.name}
        ) 
        values (?, ?);`,
        [
          obj[`${GText.infoDB.Table.Brands.fields.id}`],
          obj[`${GText.infoDB.Table.Brands.fields.name}`]
        ],
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
          console.log(`error on create ${GText.infoDB.Table.Brands.name} ` + error.message);
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
        `UPDATE ${GText.infoDB.Table.Brands.name} SET 
          ${GText.infoDB.Table.Brands.fields.name}=?
        WHERE ${GText.infoDB.Table.Brands.fields.id}=?;`,
        [
          obj[`${GText.infoDB.Table.Brands.fields.name}`],
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
          console.log(`error on update ${GText.infoDB.Table.Brands.name} ` + error.message);
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
        `SELECT * FROM ${GText.infoDB.Table.Brands.name} 
        WHERE ${GText.infoDB.Table.Brands.fields.id}=?;`,
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
          console.log(`error on find ${GText.infoDB.Table.Brands.name} ` + error.message);
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
        `SELECT * FROM ${GText.infoDB.Table.Brands.name} WHERE ${field} LIKE ?;`,
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
          console.log(`error on finBy ${GText.infoDB.Table.Brands.name} ` + error.message);
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
        `SELECT * FROM ${GText.infoDB.Table.Brands.name};`,
        [],
        (sqlTxn, res) => {
          let results = []
          let len = res.rows.length;
          if (len > 0) {
            for (let i = 0; i < len; i++) {
              let item = res.rows.item(i);
           
              results.push(item);
              console.log(results)
             
            }
          }
          resolve(results)  //return de object when the Promisse is complete
        },
        error => {
          reject(error.message)
          console.log(`error on findAll ${GText.infoDB.Table.Brands.name} ` + error.message);
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
        `DELETE FROM ${GText.infoDB.Table.Brands.name} 
        WHERE ${GText.infoDB.Table.Brands.fields.id}=?;`,
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
          console.log(`error on removeById ${GText.infoDB.Table.Brands.name} ` + error.message);
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
        `DELETE From ${GText.infoDB.Table.Brands.name} ;`,
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
          console.log(`error on find ${GText.infoDB.Table.Brands.name} ` + error.message);
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
