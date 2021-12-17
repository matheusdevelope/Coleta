import {openDatabase} from 'react-native-sqlite-storage'

const db = openDatabase({
    name: "reactnativebas2",
  })
 
export default db