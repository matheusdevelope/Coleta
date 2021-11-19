import Itens from './SQLite/tables/Itens'
import Clients from './SQLite/tables/clients'
import Brand from './SQLite/tables/brands'
import Profile from './SQLite/tables/profile'
import Company from './SQLite/tables/company'
import Branch from './SQLite/tables/branch'
import General from './SQLite/General'

export async function GetValuesInputSelect(options) {
   if(options !== undefined){
      const data = await General.all(options.name, options.fieldvalue, options.fieldlabel)
    return data 
   }
   return []
}