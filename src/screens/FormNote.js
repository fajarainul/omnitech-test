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
import CheckBox from '@react-native-community/checkbox';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment'
import ImagePicker from 'react-native-image-picker';
import validationWrapper from '../validation/validation';

class FormNote extends React.Component{

    constructor(props) {
        super(props)
    
        this.state = {
            title : '',
            description : '',
            titleError : '',
            descriptionError : '',
            isUsingReminder: true,
            showDate : false,
            selectedDate : new Date(),
            mode : 'date',
            minDate : Moment(new Date()).add(1, 'days').toDate(),

            intervals : {
                '1hour' : false,
                '3hours' : false,
                '1day' : false,
            },
            image : ''
        }
    }

    onChangeDate = (event, date) =>{

        this.setState({
            selectedDate : date,
            showDate : false
        })
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

    saveNote(){
        let titleError = validationWrapper('title', this.state.title);
        let descriptionError = validationWrapper('description', this.state.description);
        this.setState({
          titleError: titleError,
          descriptionError: descriptionError,
        })
    
        if(titleError=='' && descriptionError == ''){
            alert('sukses')
        }
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
                        placeholder="Title"
                        onChangeText={
                            text=>this.setState({
                                title : text,
                                titleError : ''
                            })
                        }
                    />

                     {
                        this.state.titleError != '' ? <View><Text style={{color:'red'}}>{this.state.titleError}</Text></View> : <View/>
                    }

                    <TextInput
                        style={[styles.inputText, styles.formInput]}
                        placeholder="Description"
                        multiline={true}
                        onChangeText={
                            text=>this.setState({
                                description : text,
                                descriptionError : ''
                            })
                        }
                    />

                    {
                        this.state.descriptionError != '' ? <View><Text style={{color:'red'}}>{this.state.descriptionError}</Text></View> : <View/>
                    }

                    <View style={[{flexDirection:'row', justifyContent:'space-between', marginBottom:8, marginTop:8}, styles.formInput]}>
                        <Text>Reminder?</Text>
                        <Switch
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={"#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={(value)=>this.setState({isUsingReminder:value})}
                            value={this.state.isUsingReminder}
                        />
                    </View>

                    {
                        this.state.isUsingReminder ?
                        <View>
                            

                            <View
                                style={[{flexDirection:'row', justifyContent:'space-between'}, styles.formInput]}    
                            >

                                <Button
                                    onPress={()=>{
                                        this.setState({
                                            showDate : true,
                                            mode : 'date'
                                        })
                                    }} title='Select Date'>
                                    
                                </Button>

                                <Text>
                                    {Moment(this.state.selectedDate).format('dddd, DD MMMM yyyy')}
                                </Text>
                            </View>

                            <View
                                style={[{flexDirection:'row', justifyContent:'space-between'}, styles.formInput]}    
                            >

                                <Button
                                    onPress={()=>{
                                        this.setState({
                                            showDate : true,
                                            mode : 'time'
                                        })
                                    }} title='Select Time'>
                                    
                                </Button>

                                <Text>
                                    {Moment(this.state.selectedDate).format('HH:mm')}
                                </Text>
                            </View>

                            <Text>Interval Time</Text>
                            <View
                                style={{marginLeft:8, marginRight:8}}
                            >
                                <View
                                    style={{flexDirection:'row', alignItems : 'center', justifyContent:'space-between'}}
                                >
                                    <Text style={{color:'#565656'}}>1 Hour Before</Text>
                                    <CheckBox
                                        tintColors={{ false: "#767577", true: "#81b0ff" }}
                                        disabled={false}
                                        value={this.state.intervals['1hour']}
                                        onValueChange={(newValue) => this.setState((prevState)=>(
                                            {
                                                intervals : {
                                                    ...prevState.intervals,
                                                    '1hour' : newValue
                                                }
                                            }
                                        ))}
                                    />    
                                </View>

                                <View
                                    style={{flexDirection:'row', alignItems : 'center', justifyContent:'space-between'}}
                                >
                                    <Text style={{color:'#565656'}}>3 Hours Before</Text>
                                    <CheckBox
                                        tintColors={{ false: "#767577", true: "#81b0ff" }}
                                        disabled={false}
                                        value={this.state.intervals['3hours']}
                                        onValueChange={(newValue) => this.setState((prevState)=>(
                                            {
                                                intervals : {
                                                    ...prevState.intervals,
                                                    '3hours' : newValue
                                                }
                                            }
                                        ))}
                                    />    
                                </View>

                                <View
                                    style={{flexDirection:'row', alignItems : 'center', justifyContent:'space-between'}}
                                >
                                    <Text style={{color:'#565656'}}>1 Day Before</Text>
                                    <CheckBox
                                        tintColors={{ false: "#767577", true: "#81b0ff" }}
                                        disabled={false}
                                        value={this.state.intervals['1day']}
                                        onValueChange={(newValue) => this.setState((prevState)=>(
                                            {
                                                intervals : {
                                                    ...prevState.intervals,
                                                    '1day' : newValue
                                                }
                                            }
                                        ))}
                                    />    
                                </View>
                            </View>

                        </View> : null
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
                        mode={this.state.mode} 
                        value={this.state.selectedDate} 
                        onChange={this.onChangeDate}
                        minimumDate={this.state.minDate}
                    />
                )}

                
            </ScrollView>
        )
    }

}

export default FormNote;

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