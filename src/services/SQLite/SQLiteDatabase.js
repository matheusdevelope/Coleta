import {openDatabase} from 'react-native-sqlite-storage'

const db = openDatabase({
    name: "eacnaies5",
  })
 
export default db