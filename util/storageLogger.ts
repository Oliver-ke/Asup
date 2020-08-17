import AsyncStorage from '@react-native-community/async-storage';

export default () => AsyncStorage.getAllKeys((err, keys:any) => {
    AsyncStorage.multiGet(keys, (error, stores) => {
      stores?.map((result, i, store) => {
        console.log({ [store[i][0]]: store[i][1] });
        return true;
      });
    });
  });

// export default async () => {
//   const uploads = await AsyncStorage.getItem('uploadComplete');
//   if(uploads){
//     const uploadObj = JSON.parse(uploads);
//     const update = uploadObj.map((item: object) => {
//       return {
//         ...item,
//         uploaded: true
//       }
//     });
//     await AsyncStorage.setItem('uploadComplete', JSON.stringify(update));
//     console.log('Done');
//   }
// }