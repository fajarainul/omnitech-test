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
import CheckBox from '@react-native-community/checkbox';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment'
import ImagePicker from 'react-native-image-picker';
import validationWrapper from '../validation/validation';
import App from '../../App';
import { getIntervals, addNote, getNote, updateNote } from '../database/NoteDB';
import { setAlarm } from '../alarm/alarm';

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
            selectedDate : Moment(new Date()).add(1, 'days').toDate(),
            mode : 'date',
            minDate : Moment(new Date()).add(1, 'days').toDate(),

            intervals : [
                {
                    label : '1 Hour',
                    value : 1,
                    selected : false
                },
                {
                    label : '3 Hours',
                    value : 2,
                    selected : false
                },
                {
                    label : '1 Day',
                    value : 3,
                    selected : false
                }
            ],
            image : '',
            imageError : '',
            isUpdate : false,
            idNote : null,
            alarmIds : []
        }
    }

    async componentDidMount(){
        let intervals = await getIntervals();
        
        //get id
        const {id} = this.props.route.params;
        if(id!=null){
            //get note
            let note = await getNote(id);
        
            if(note!=null){
                var length = intervals.length;
                var length2 = note.intervals.length;
                for(var i = 0; i < length ; i++){
                    for(var j=0;j<length2;j++){
                        if(intervals[i].value == note.intervals[j].id){
                            intervals[i] = {
                                ...intervals[i],
                                selected : true
                            }
                        }
                    }
                }

                var alarms = [];
                var alarm_id = ''
                if(note.alarm_id){
                    if(note.alarm_id.charAt(note.alarm_id.length-1)== ','){
                        alarm_id = note.alarm_id.slice(0, -1);
                    }else{
                        alarm_id = note.alarm_id;
                    }

                    if(alarm_id!=''){
                        alarms = alarm_id.split(',').map(function(item) {
                            return parseInt(item, 10);
                        });
                    }
                }

                this.setState({
                    image : note.attachment,
                    title : note.title,
                    description : note.desc,
                    isUsingReminder : note.time !== null,
                    selectedDate : note.time === null ? Moment(new Date()).add(1, 'days').toDate() : Moment(note.time).toDate(),
                    intervals : [...intervals],
                    isUpdate : true,
                    idNote : id,
                    alarmIds : [...alarms]
                })
            }
        }else{
            //id not set
        }
        
        
    }

    onChangeDate = (event, date) =>{
        if(date!==undefined){
            this.setState({
                selectedDate : date,
                showDate : false
            })
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
              const source = response.uri;
          
              // You can also display the image using data:
              // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                console.log(source);
              this.setState({
                image: source,
              });
            }
          });
    }

    async saveNote(){
        let titleError = validationWrapper('title', this.state.title);
        let descriptionError = validationWrapper('description', this.state.description);
        let imageError = validationWrapper('imagenote', this.state.image);
        this.setState({
          titleError: titleError,
          descriptionError: descriptionError,
          imageError: imageError,
        })
    
        if(titleError=='' && descriptionError == '' && imageError == ''){
            var note = {
                title : this.state.title,
                desc : this.state.description,
                time : this.state.isUsingReminder ? Moment(this.state.selectedDate).format('YYYY-MM-DD HH:mm:ss') : null,
                attachment : this.state.image,
                intervals : this.state.isUsingReminder ? this.state.intervals : [],
                id : this.state.idNote,
                alarm_id : this.state.alarmIds
            }
            //set alarm
            let alarmIds = await setAlarm(note)
            note = {...note, alarm_id : alarmIds}
            this.setState({
                alarmIds : [...alarmIds]
            })

            var result = false

            if(this.state.isUpdate){
                result = await updateNote(note)
            }else{
                result = await addNote(note)
            }

            if(result){
                Alert.alert(
                    "Success",
                    "Note saved!",
                    [
                        { text: "OK", onPress: () => {
                                this.goback();
                            } 
                        },
                        
                    ],
                    { cancelable: false }
                );
            }else{
                alert('Save note failed')
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
                        placeholder="Title"
                        onChangeText={
                            text=>this.setState({
                                title : text,
                                titleError : ''
                            })
                        }
                        defaultValue={this.state.title}
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
                        defaultValue={this.state.description}
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
                                {
                                    this.state.intervals.map((prop, key)=>{
                                        
                                        return <View
                                                    key={prop.value}
                                                    style={{flexDirection:'row', alignItems : 'center', justifyContent:'space-between'}}
                                                >
                                                    <Text style={{color:'#565656'}}>{ prop.label }</Text>
                                                    <CheckBox
                                                        tintColors={{ false: "#767577", true: "#81b0ff" }}
                                                        disabled={false}
                                                        value={prop.selected}
                                                        onValueChange={(newValue) => 
                                                            {
                                                                let newIntervals = [...this.state.intervals];
                                                                newIntervals[key] = {
                                                                    ...prop,
                                                                    selected : newValue
                                                                }
                                                                this.setState((prevState)=>(
                                                                    {
                                                                        intervals : newIntervals                                                          
                                                                    }
                                                                ))
                                                            }
                                                        }
                                                    />    
                                                </View>
                                    })
                                }
                            

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
                        <Image source={{uri : this.state.image}} style={{width:100, height:100}} /> :
                        null
                    }

                    {
                        this.state.imageError != '' ? <View><Text style={{color:'red'}}>{this.state.imageError}</Text></View> : <View/>
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