import {openDatabase} from 'react-native-sqlite-storage'

const db = openDatabase({
    name: "eacis5",
  })
 
export default db