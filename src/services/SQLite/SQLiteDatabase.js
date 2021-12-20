import {openDatabase} from 'react-native-sqlite-storage'

const db = openDatabase({
    name: "reactnativebases3",
  })
 
export default db