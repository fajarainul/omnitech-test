import React from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  Switch,
  Button,
  Image,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment'
import ImagePicker from 'react-native-image-picker';
import validationWrapper, {constraints} from '../validation/validation';
import { TouchableOpacity } from 'react-native-gesture-handler';
import RadioGroup from 'react-native-radio-buttons-group';
import validate from 'validate.js';
import { updateUser } from '../database/NoteDB';
import { saveUserSession, getUserData } from '../session/LoginSession';

class FormProfile extends React.Component{

    constructor(props) {
        super(props)
    
        this.state = {
            selectedDate : '',
            showDate : false,
            firstname : '',
            lastname : '',
            email : '',
            sex : 1,
            password : '',
            rePassword : '',
            image : '',
            firstnameError : '',
            lastnameError : '',
            emailError : '',
            imageError : '',
            birthdateError : '',
            passwordError : '',
            repasswordError : '',
            data: [
                {
                    label: 'Male',
                    value: 1,
                    color :"#81b0ff",
                    selected : false
                },
                {
                    label: 'Female',
                    value: 2,
                    color :"#81b0ff",
                    selected : false
                },
            ],
        }
    }

    async componentDidMount(){
        let user = await getUserData();

        
        var temp = [...this.state.data]
        for(var i=0; i<this.state.data.length;i++){
            var temp2 = {
                ...temp[i],
                selected : this.state.data[i].value == user.sex
            }

            temp[i] = {
                ...temp2,
            } 
        }
    
        if(user){
            this.setState({
                firstname : user.firstname,
                lastname : user.lastname,
                selectedDate : Moment(user.birthdate).toDate(),
                email : user.email,
                image : user.imageprofile,
                data : [...temp]
            }, ()=>{console.log(this.state.data)})
        }

        
    }

    selectImage = () =>{
        const options = {
            'title'  : 'Select Image'
        }
        ImagePicker.showImagePicker(options, (response) => {
          
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            } else {
              const source = response.uri;
        
              this.setState({
                image: source,
                imageError : ''
              });
            }
          });
    }

    onChangeDate = (event, date) =>{

        this.setState({
            selectedDate : date,
            showDate : false,
            birthdateError : ''
        })
    }  

    async updateProfile(){
        var tests = {
            confirmPassword: {
              equality: "password"
            }
          };
        let firstnameError = validationWrapper('firstname', this.state.firstname);
        let lastnameError = validationWrapper('lastname', this.state.lastname);
        let emailError = validationWrapper('email', this.state.email);
        let imageError = validationWrapper('imageprofile', this.state.image);
        let birthdateError = validationWrapper('birthdate', this.state.selectedDate);
        let passwordError = validationWrapper('password', this.state.password);
        let repasswordError = '';
        let tempError = validate({password: this.state.password, confirmPassword: this.state.rePassword}, {confirmPassword:constraints['confirmPassword']});

        if(tempError!==undefined){
            repasswordError = tempError['confirmPassword'][0];
        }

        this.setState({
            firstnameError,
            lastnameError,
            emailError,
            imageError,
            birthdateError,
            passwordError,
            repasswordError
        })
        
    
        if(firstnameError == '' && lastnameError == '' && 
            emailError == '' && imageError == '' && 
            birthdateError == '' && passwordError == '' && 
            repasswordError == ''){
            
            let selectedSex = this.state.data.find(e => e.selected == true);

            var user = {
                firstname : this.state.firstname,
                lastname : this.state.lastname,
                email : this.state.email,
                birthdate : Moment(this.state.selectedDate).format('YYYY-MM-DD'),
                sex : selectedSex.value,
                password : this.state.password,
                imageprofile : this.state.image,
                id : 1
            }

            let result = await updateUser(user);

            if(result){
                await saveUserSession(user)

                Alert.alert(
                    "Success",
                    "Update Profile Success",
                    [
                        { text: "OK", onPress: () => {
                                this.goback();
                            } 
                        },
                        
                    ],
                    { cancelable: false }
                );
            }else{
                alert('Update profile failed')
            }

        }
    }

    goback(){
        this.props.route.params.onNavigateBack(); 
        this.props.navigation.pop();
    }

    render(){
        return(
            <ScrollView>

                <View
                    style={{
                        marginTop : 24,
                        marginBottom : 24,
                        marginLeft : 21,
                        marginRight : 21
                    }}
                >

                    <TextInput
                        style={[styles.inputText, styles.formInput]}
                        placeholder="First Name"
                        onChangeText={
                            text=>this.setState({
                                firstname : text,
                                firstnameError : ''
                            })
                        }
                        defaultValue={this.state.firstname}
                    />
                    {
                        this.state.firstnameError != '' ? <View><Text style={{color:'red'}}>{this.state.firstnameError}</Text></View> : <View/>
                    }

                    <TextInput
                        style={[styles.inputText, styles.formInput]}
                        placeholder="Last Name"
                        onChangeText={
                            text=>this.setState({
                                lastname : text,
                                lastnameError : ''
                            })
                        }
                        defaultValue={this.state.lastname}
                    />
                    {
                        this.state.lastnameError != '' ? <View><Text style={{color:'red'}}>{this.state.lastnameError}</Text></View> : <View/>
                    }

                    <TextInput
                        style={[styles.inputText, styles.formInput]}
                        placeholder="Email"
                        onChangeText={
                            text=>this.setState({
                                email : text,
                                emailError : ''
                            })
                        }
                        defaultValue={this.state.email}
                    />
                    {
                        this.state.emailError != '' ? <View><Text style={{color:'red'}}>{this.state.emailError}</Text></View> : <View/>
                    }

                    <View style={[{flexDirection:"row", justifyContent:"space-between", alignItems:"center"}, styles.formInput]}>

                        <TextInput
                            style={[{flex:1},styles.inputText, styles.formInput]}
                            placeholder="Birth Date"
                            editable={false}
                            defaultValue={this.state.selectedDate === '' ? '' : Moment(this.state.selectedDate).format("DD MMMM YYYY")}
                        />

                        <View style={{width:16}}></View>

                        <TouchableOpacity
                            onPress={()=>{
                                this.setState({
                                    showDate : true
                                })
                            }}    
                        >
                            <Icon
                                
                                Icon name="calendar" size={16} color="gray"
                            />
                        </TouchableOpacity>

                    </View>

                    {
                        this.state.birthdateError != '' ? <View><Text style={{color:'red'}}>{this.state.birthdateError}</Text></View> : <View/>
                    }

                    <View>
                        <RadioGroup 
                            radioButtons={this.state.data} 
                            onPress={data => this.setState({ data })} 
                            flexDirection='row'
                        />
                    </View>

                    <TextInput
                        style={[styles.inputText, styles.formInput]}
                        placeholder="Password"
                        onChangeText={
                            text=>this.setState({
                                password : text,
                                passwordError : ''
                            })
                        }
                        secureTextEntry ={true}
                    />
                    {
                        this.state.passwordError != '' ? <View><Text style={{color:'red'}}>{this.state.passwordError}</Text></View> : <View/>
                    }

                    <TextInput
                        style={[styles.inputText, styles.formInput]}
                        placeholder="Confirm Password"
                        onChangeText={
                            text=>this.setState({
                                rePassword : text,
                                repasswordError : ''
                            })
                        }
                        secureTextEntry ={true}
                    />
                    {
                        this.state.repasswordError != '' ? <View><Text style={{color:'red'}}>{this.state.repasswordError}</Text></View> : <View/>
                    }
                    
                    <View
                        style={[{flexDirection:'row', justifyContent:'space-between'}, styles.formInput]}    
                    >
                        <Button
                            onPress={()=>{
                               this.selectImage() 
                            }} title='Select Image'
                            style={{width:100}}
                            >
                            
                        </Button>

                    </View>

                    {
                        this.state.imageError != '' ? <View><Text style={{color:'red'}}>{this.state.imageError}</Text></View> : <View/>
                    }

                    {
                        this.state.image !== '' ?
                        <Image source={{uri : this.state.image}} style={{width:100, height:100}} /> :
                        null
                    }

                    <View style={styles.formInput}>
                        <Button
                            onPress={
                                ()=>{this.updateProfile()}
                            }
                            title="Save"
                            color="#841584"
                        />
                    </View>

                </View>

                {this.state.showDate && (
                    <RNDateTimePicker 
                        mode="date" 
                        value={this.state.selectedDate != '' ? this.state.selectedDate : new Date()} 
                        onChange={this.onChangeDate}
                        maximumDate={Moment(new Date()).subtract(1, 'day').toDate()}
                    />
                )}
                
                
            </ScrollView>
        )
    }

}

export default FormProfile;

const styles = StyleSheet.create({
    inputText : {
        borderColor : 'gray',
        borderWidth : 1,
        borderRadius : 8,
        padding : 8,
    },

    formInput : {
        marginTop : 8,
        marginBottom : 8
    }
})