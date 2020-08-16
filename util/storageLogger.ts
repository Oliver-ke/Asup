import AsyncStorage from '@react-native-community/async-storage';

export default () => {
    AsyncStorage.getItem('uploadWaiting').then(data => {
        if(data){
            const dataR = JSON.parse(data);
            console.log(dataR);
        }
    })
}