import {openDatabase} from 'react-native-sqlite-storage'

const db = openDatabase({
    name: "eciess5",
  })
 
export default db