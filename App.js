/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import {
  Button,
  View,
  TouchableOpacity,
  Alert
} from 'react-native';

import LoginPage from './src/screens/LoginPage';
import MainPage from './src/screens/MainPage';
import FormNote from './src/screens/FormNote';
import FormProfile from './src/screens/FormProfile';
import Profile from './src/screens/Profile';

import Icon from 'react-native-vector-icons/FontAwesome';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SQLite from 'react-native-sqlite-storage';
import NodeDB from './src/database/NoteDB'
import NoteItem from './src/components/item/note_item';
import {createTable} from './src/database/NoteDB';
import { clearUserSession } from './src/session/LoginSession';

global.db = SQLite.openDatabase(
  {
    name: 'omintect_test',
    location: 'default',
    createFromLocation: '~omintect_test.db',
  },
  () => { },
  error => {
    console.log("ERRORss: " + error);
  }
);

const Stack = createStackNavigator();

class App extends React.Component {

  async componentDidMount(){
    await createTable();
  }

  render(){
    return (
      <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Login"
              component={LoginPage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Main"
              component={MainPage}
              options={({ navigation, route }) => (
                {
                  headerLeft : null,
                  title : "Main Page",
                  headerRight: () => (
                    <View
                      style={{padding : 16}}
                    >
                      <TouchableOpacity
                        onPress={()=> navigation.navigate('Profile')}
                      >
                        <Icon name="user" size={16} color="gray" />
                      </TouchableOpacity>
    
                    </View>
                  ),
                }
              )}
            />
            <Stack.Screen
              name="Form"
              component={FormNote}
              options={{
                title : "Form Note"
              }}
            />
            <Stack.Screen
              name="Profile"
              component={Profile}
              options={({ navigation, route }) => (
                {
                  title : "Profile",
                  headerRight: () => (
                    <View
                      style={{padding : 16}}
                    >
                      <TouchableOpacity
                        onPress={
                          () => Alert.alert(
                            "Logout",
                            "Are you sure you want to logout?",
                            [
                                { text: "Yes", onPress: async () => {
                                        await clearUserSession()
                                        navigation.navigate('Login')
                                    } 
                                },
                                {
                                    text: "Cancel",
                                    onPress: () => console.log("Cancel Pressed"),
                                },
                                
                            ],
                            { cancelable: true }
                          )
                        }
                      >
                        <Icon name="sign-out" size={16} color="gray" />
                      </TouchableOpacity>
    
                    </View>
                  ),
                }
              )}
            />
            <Stack.Screen
              name="FormProfile"
              component={FormProfile}
              options={{
                title : "Edit Profile"
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
    )
  }
};

export default App;
