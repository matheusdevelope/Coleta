import React from "react";
import Clients from '../SQLite/tables/clients'
import Brands from '../SQLite/tables/brands'
import Itens from '../SQLite/tables/Itens'
import Company from '../SQLite/tables/company'
import Branch from '../SQLite/tables/branch'
import db from "../SQLite/SQLiteDatabase";
import GText from "../../global/texts";
import Profile from "../SQLite/tables/profile";
import Warranty from "../SQLite/tables/warranty";
import Situation from "../SQLite/tables/situation";

/**
 * - This Function returns a Promise Object with data of local DB.
 * Don't need any parameters
 */
export async function GetClientsDB(params) {
    return await Clients.all()
}
export async function GetBrandsDB(params) {
    return await Brands.all()
}
export async function GetBranchsDB(params) {
    return await Branch.all()
}
export async function GetItensDB(field, param) {
  if (field !== undefined){
    return await Itens.findLike(field,param)
  }else{
    return await Itens.all()
  }
    

}
export async function DeleteItensDB(field, param) {
    return await Itens.remove(field,param)
}
export async function CreateItensDB(data) {
  return await Itens.create(data)
}
export async function GetProfileDB(params) {
  return await Profile.all()
}
export async function GetLastItemOnDB(field, param) {
  return await Itens.findLastItem(field, param)
}
export async function GetItensGrouped(params) {
  
  return await Itens.allGrouped()
}

export function GetDataDBFormatInput(table, fieldValue, fieldLabel) {
        return new Promise((resolve, reject) => {
          db.transaction((tx) => {
            //comando SQL modificávels
            tx.executeSql(
              `SELECT ${fieldValue} as value, ${fieldLabel} as label FROM ${table};`,
              [],
              (sqlTxn, res) => {
                let len = res.rows.length;
                let results = []
                if (len > 0) {
                  for (let i = 0; i < len; i++) {
                    let item = res.rows.item(i);
                    results.push(item);              
                  }
                }
              //  results.push({value:null, label:GText.infoInputs.defaultLabel})
                resolve(results)  //return de object when the Promisse is complete
              },
              error => {
                reject(error.message)
                console.log(`error on findAll ${GText.infoDB.Table.Branch.name} ` + error.message);
              }
            );
          });
        });
}