import React from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
} from 'react-native';


class LoginPage extends React.Component{


render(){
    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            marginLeft : 16,
            marginRight : 16,
        }} >
            <Text 
                style={{
                    alignSelf:'center',
                    fontSize:26,
                    fontWeight:'700'
                }}
            >
                Login Page
           </Text>

           <View style={{height:64}}/>

            <TextInput 
                style={{
                    borderColor:'gray',
                    borderWidth : 1,
                    textAlign : 'left',
                    padding:8,
                    borderRadius:8
                }}
                autoCompleteType ='username'
                placeholder="Username"
            />
            <View style={{height:16}}/>
            <TextInput 
                style={{
                    borderColor:'gray',
                    borderWidth : 1,
                    textAlign:'left',
                    padding:8,
                    borderRadius:8
                }}
                secureTextEntry={true}
                autoCompleteType ='password'
                placeholder="Password"
            />
            <View style={{height:16}}/>
            
            <Button
                onPress={
                    ()=>{console.log('test');}
                }
                title="Login"
                color="#841584"
            >
                
            </Button>
        </View>
    );
}

}

export default LoginPage;