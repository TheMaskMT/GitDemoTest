import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key, value) => {
    try {
      console.log(key,value)
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      // saving error
      console.log('Không lưu được giá trị')
    }
  };

export const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        // value previously stored
        console.log(value)
      }
    } catch (e) {
      // error reading value
      console.log('Không đọc được giá trị')
    }
  };

  

// export function logCurrentStorage() {
//   AsyncStorage.getAllKeys().then((keyArray) => {
//     AsyncStorage.multiGet(keyArray).then((keyValArray) => {
//       let myStorage: any = {};
//       for (let keyVal of keyValArray) {
//         myStorage[keyVal[0]] = keyVal[1]
//       }

//       console.log('CURRENT STORAGE: ', myStorage);
//     })
//   });
// }
