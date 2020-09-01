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

class Profile extends React.Component{

    constructor(props) {
        super(props)
    
        this.state = {
        
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

                    <View
                        style={{
                            flexDirection : 'row',
                            justifyContent :'center'
                        }}
                    >

                        <Image  
                            source={{
                                uri: 'https://reactnative.dev/img/tiny_logo.png',
                            }}
                            style={
                                {
                                    width: 100,
                                    height: 100,
                                }
                            }
                        />

                    </View>

                    <View
                        style={[styles.fieldContainer]}
                    >
                        <Text>
                            Name
                        </Text>
                        <Text>
                            Mohammad Fajar Ainul
                        </Text>
                    </View>

                    <View
                        style={[styles.fieldContainer]}
                    >
                        <Text>
                            Email
                        </Text>
                        <Text>
                            fajarainul14@gmail.com
                        </Text>
                    </View>

                    <View
                        style={[styles.fieldContainer]}
                    >
                        <Text>
                            Tanggal Lahir
                        </Text>
                        <Text>
                            14 Juli 2994
                        </Text>
                    </View>

                    <View
                        style={[styles.fieldContainer]}
                    >
                        <Text>
                            Jenis Kelamin
                        </Text>
                        <Text>
                            Laki - Laki
                        </Text>
                    </View>

                    <View style={styles.formInput}>
                        <Button
                            onPress={
                                ()=>{
                                    this.props.navigation.navigate('FormProfile')
                                }
                            }
                            title="Edit"
                            color="#841584"
                        />
                    </View>

                </View>
                
            </ScrollView>
        )
    }

}

export default Profile;

const styles = StyleSheet.create({

    fieldContainer : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        marginTop : 8,
        marginBottom : 8
    },

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