import {openDatabase} from 'react-native-sqlite-storage'

const db = openDatabase({
    name: "rnDB7",
  })
 
export default db