import React from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  Switch,
  Button,
  Image
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CheckBox from '@react-native-community/checkbox';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment'
import ImagePicker from 'react-native-image-picker';
import validationWrapper from '../validation/validation';
import { TouchableOpacity } from 'react-native-gesture-handler';
import RadioGroup from 'react-native-radio-buttons-group';

class FormProfile extends React.Component{

    constructor(props) {
        super(props)
    
        this.state = {
            selectedDate : new Date(),
            showDate : false,
            data: [
                {
                    label: 'Male',
                    value: 'Male',
                    color :"#81b0ff"
                },
                {
                    label: 'Female',
                    value: 'Female',
                    color :"#81b0ff"
                },
            ],
        }
    }

    selectImage = () =>{
        const options = {
            'title'  : 'Select Image'
        }
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
          
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            } else {
              const source = { uri: response.uri };
          
              // You can also display the image using data:
              // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                console.log(source);
              this.setState({
                image: source,
              });
            }
          });
    }

    onChangeDate = (event, date) =>{

        this.setState({
            selectedDate : date,
            showDate : false
        })
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

                            })
                        }
                    />

                    <TextInput
                        style={[styles.inputText, styles.formInput]}
                        placeholder="Last Name"
                        onChangeText={
                            text=>this.setState({
                                
                            })
                        }
                    />

                    <TextInput
                        style={[styles.inputText, styles.formInput]}
                        placeholder="Email"
                        onChangeText={
                            text=>this.setState({
                                
                            })
                        }
                    />

                    <View style={[{flexDirection:"row", justifyContent:"space-between", alignItems:"center"}, styles.formInput]}>

                        <TextInput
                            style={[{flex:1},styles.inputText, styles.formInput]}
                            placeholder="Birth Date"
                            onChangeText={
                                text=>this.setState({
                                    
                                })
                            }
                            editable={false}
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
                                
                            })
                        }
                        secureTextEntry ={true}
                    />

                    <TextInput
                        style={[styles.inputText, styles.formInput]}
                        placeholder="Confirm Password"
                        onChangeText={
                            text=>this.setState({
                                
                            })
                        }
                        secureTextEntry ={true}
                    />

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
                        this.state.image !== '' ?
                        <Image source={this.state.image} style={{width:100, height:100}} /> :
                        null
                    }

                    <View style={styles.formInput}>
                        <Button
                            onPress={
                                ()=>{this.saveNote()}
                            }
                            title="Save"
                            color="#841584"
                        />
                    </View>

                </View>

                {this.state.showDate && (
                    <RNDateTimePicker 
                        mode="date" 
                        value={this.state.selectedDate} 
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