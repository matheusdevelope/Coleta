import GText from "../../global/texts";
import db from "./SQLiteDatabase";
 
const all = (name, fieldvalue, fieldlabel) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      //comando SQL modificável
      tx.executeSql(
        `SELECT ${fieldvalue} as value, ${fieldlabel} as label FROM ${name};`,
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
         // console.log(`error on findAll ${GText.infoDB.Table.Branch.name} ` + error.message);
        }
      );
    });
  });
};


export default {
  all
};
