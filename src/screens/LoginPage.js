import React from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
} from 'react-native';
import validationWrapper from '../validation/validation';
import { StackActions } from '@react-navigation/native';
import { loginUser } from '../database/NoteDB';
import { saveUserSession } from '../session/LoginSession';


class LoginPage extends React.Component{

constructor(props) {
    super(props)

    this.state = {
        username: '',
        password: '',
        usernameError : '',
        passwordError : ''
    }
}
    
async login(){
    let usernameError = validationWrapper('username', this.state.username);
    let passwordError = validationWrapper('password', this.state.password);
    this.setState({
      usernameError: usernameError,
      passwordError: passwordError,
    })

    if(usernameError=='' && passwordError == ''){
        let result = await loginUser(this.state.username, this.state.password);
        
        if(result.is_success){
            let userData = result.user_data;
            saveUserSession(userData).then(()=>{
                this.props.navigation.dispatch(
                    StackActions.replace('Main', {
                      user: 'jane',
                    })
                  );
            })
            
        }else{
            let message = result.message;
            alert(message)
        }
    }
}

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
                onChangeText={
                    text=>this.setState({
                        username : text,
                        usernameError : ''
                    })
                }
            />
            {
                this.state.usernameError != '' ? <View style={{marginTop:8}}><Text style={{color:'red'}}>{this.state.usernameError}</Text></View> : <View/>
            }
            
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
                onChangeText={
                    text=>this.setState({
                        password : text,
                        passwordError : ''
                    })
                }
            />
            {
                this.state.passwordError != '' ? <View style={{marginTop:8}}><Text style={{color:'red'}}>{this.state.passwordError}</Text></View> : <View/>
            }
            <View style={{height:16}}/>
            
            <Button
                onPress={
                    ()=>{
                        this.login();
                    }
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