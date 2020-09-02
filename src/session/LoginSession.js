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