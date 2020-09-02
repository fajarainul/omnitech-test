import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Button,
  Image
} from 'react-native';
import Moment from 'moment'
import { getUserData } from '../session/LoginSession';

class Profile extends React.Component{

    constructor(props) {
        super(props)
    
        this.state = {
            userData : {}
        }

    } 

    async componentDidMount(){
        await this.getProfile()
    }

    async getProfile(){
        console.log('getProfile')
        let userData = await getUserData()
        this.setState({
            userData : {...userData}
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

                    <View
                        style={{
                            flexDirection : 'row',
                            justifyContent :'center'
                        }}
                    >

                        <Image  
                            source={{
                                uri: this.state.userData.imageprofile == null || this.state.userData.imageprofile == '' ?
                                'https://i.pinimg.com/originals/0c/3b/3a/0c3b3adb1a7530892e55ef36d3be6cb8.png' : this.state.userData.imageprofile,
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
                            {this.state.userData.firstname} {this.state.userData.lastname}
                        </Text>
                    </View>

                    <View
                        style={[styles.fieldContainer]}
                    >
                        <Text>
                            Email
                        </Text>
                        <Text>
                            {this.state.userData.email}
                        </Text>
                    </View>

                    <View
                        style={[styles.fieldContainer]}
                    >
                        <Text>
                            Tanggal Lahir
                        </Text>
                        <Text>
                            {Moment(this.state.userData.birthdate).format("DD MMMM YYYY")}
                        </Text>
                    </View>

                    <View
                        style={[styles.fieldContainer]}
                    >
                        <Text>
                            Jenis Kelamin
                        </Text>
                        <Text>
                            {this.state.userData.sex == 1 ? 'Male' : 'Female'}
                        </Text>
                    </View>

                    <View style={styles.formInput}>
                        <Button
                            onPress={
                                ()=>{
                                    this.props.navigation.navigate('FormProfile',
                                        {onNavigateBack: async () => this.getProfile()}
                                    )
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