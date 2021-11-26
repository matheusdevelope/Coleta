import {openDatabase} from 'react-native-sqlite-storage'

const db = openDatabase({
    name: "reactnativebase",
  })
 
export default db