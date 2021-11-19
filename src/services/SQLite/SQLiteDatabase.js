import {openDatabase} from 'react-native-sqlite-storage'

const db = openDatabase({
    name: "teste2",
  })
 
export default db