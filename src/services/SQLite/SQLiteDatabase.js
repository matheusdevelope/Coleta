import {openDatabase} from 'react-native-sqlite-storage'

const db = openDatabase({
    name: "reactnativebases2",
  })
 
export default db