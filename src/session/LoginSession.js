import AsyncStorage from '@react-native-community/async-storage';

export async function saveUserSession(user){

    try {
        const jsonValue = JSON.stringify(user)
        await AsyncStorage.setItem('@user_data', jsonValue);
    } catch (e) {
        console.log(e)
    // saving error
    }

}

export async function getUserData(user){
    var result = {};

    try {
        const jsonValue = await AsyncStorage.getItem('@user_data')
        result = jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.log(e)
    }

    return result;

}