import {openDatabase} from 'react-native-sqlite-storage'

const db = openDatabase({
    name: "eacasdis5",
  })
 
export default db