import React from "react";
import Clients from '../SQLite/tables/clients'
import Brands from '../SQLite/tables/brands'
import Itens from '../SQLite/tables/Itens'
import Company from '../SQLite/tables/company'
import Branch from '../SQLite/tables/branch'
import db from "../SQLite/SQLiteDatabase";
import GText, { Routes } from "../../global/texts";
import Profile from "../SQLite/tables/profile";
import Warranty from "../SQLite/tables/warranty";
import Situation from "../SQLite/tables/situation";
import Server from "../SQLite/tables/server";
import log from "../SQLite/tables/log";

const routes = Routes()
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
/**
* - IF use FIELD2, need to send the condition (format sql) and PARAM2
* - returns a object with data
*
*/
export async function GetItensDB(field, param, field2, condition, param2) {
  if (field !== undefined) {
    return await Itens.findLike(field, param, field2, condition, param2)
  } else {
    return await Itens.all()
  }
}
export async function GetLogDB(field, param) {
  if (field !== undefined) {
    return await log.findLike(field, param)
  } else {
    return await log.all()
  }
}
export async function DeleteItensDB(field, param) {
  return await Itens.remove(field,'=', param)
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
export async function GetItensGrouped(where, param, param2) {
  return await Itens.allGrouped(where, param, param2)
}
/**
 *  - `UPDATE ${GText.infoDB.Table.Itens.name} SET 
    ${GText.infoDB.Table.Itens.fields.Status} = '${newStatus}'
    WHERE ${where} = '${param}' 
    and ${GText.infoDB.Table.Itens.fields.Status} = '${param2}';`
 * @param {*} where 
 * @param {*} param 
 * @param {*} param2 
 * @param {*} newStatus 
 * @returns 
 */
export async function UpdateStatusItensOnDB(where, param, param2, newStatus) {
  return await Itens.updateStatus(where, param, param2, newStatus)
}
export async function GetServerDefaultOnDB() {
  return await Server.findDefault()
}
export async function CreateServerOnDB(data) {
  return await Server.create(data)
}
export async function DeleteServerDB(param) {
  return await Server.remove(param)
}
export async function UpdateServerDB(id, obj) {
  return await Server.update(id, obj)
}

export async function GetOnDB(TableName ) {
  let ret = false
  switch (TableName) {
    case routes.Branch:
      ret = await Branch.all();
      break;

    case routes.Brands:
      ret = await Brands.all();
      break;

    case routes.Clients:
      ret = await Clients.all();
      break;

    case routes.Company:
      ret = await Company.all();
      break;

    case routes.Itens:
      ret = await Itens.all();
      break;

    case routes.Profile:
      ret = await Profile.all();
      break;

    case routes.Server:
      ret = await Server.all();
      break;
    case routes.Situation:
      ret = await Situation.all();
      break;
    case routes.Warranty:
      ret = await Warranty.all();
      break;
      case routes.Log:
      ret = await log.all();
      break;
    default:
      alert("Failed on routesData GetOnDB function! ROUTEDATA");
  }
  return ret
}

export async function CreateOnDB(TableName, data) {
 
  let ret = false
  switch (TableName) {
    case routes.Branch:
      ret = await Branch.create(data);
      break;

    case routes.Brands:
      ret = await Brands.create(data);
      break;

    case routes.Clients:
      ret = await Clients.create(data);
      break;

    case routes.Company:
      ret = await Company.create(data);
      break;

    case routes.Itens:
      ret = await Itens.create(data);
      break;

    case routes.Profile:
      ret = await Profile.create(data);
      break;

    case routes.Server:
      ret = await Server.create(data);
      break;
    case routes.Situation:
      ret = await Situation.create(data);
      break;
    case routes.Warranty:
      ret = await Warranty.create(data);
      break;
      case routes.Log:
        ret = await log.create(data);
        break;
    default:
      console.log("Failed on routesData CreateOnDB function!");
  }
  return ret
}

export async function GetLastLogOnDB(field, param, field2, param2) {
  return await log.findLastLog(field, param, field2, param2)
}


export async function DeleteOnDB(TableName, field, condition, param) {
  let ret = false
  switch (TableName) {
    case routes.Branch:
      ret = await Branch.removeAll();
      break;

    case routes.Brands:
      ret = await Brands.removeAll();
      break;

    case routes.Clients:
      ret = await Clients.removeAll();
      break;

    case routes.Company:
      ret = await Company.removeAll();
      break;

    case routes.Itens:
      if(field){
        ret = await Itens.remove(field, condition, param);
      }
      else{
         ret = await Itens.removeAll();
      }
     
      break;

    case routes.Profile:
      ret = await Profile.removeAll();
      break;

    case routes.Server:
      ret = await Server.removeAll();
      break;
    case routes.Situation:
      ret = await Situation.removeAll();
      break;
    case routes.Warranty:
      ret = await Warranty.removeAll();
      break;
      case routes.Log:
        ret = await log.removeAll();
        break;
    default:
      alert("Failed on routesData DeleteONDB function! ROUTEDATA");
  }
  return await ret
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
        //  console.log(results)
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