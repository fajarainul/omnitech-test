/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  Button,
  View,
  TouchableOpacity
} from 'react-native';

import LoginPage from './src/screens/LoginPage';
import MainPage from './src/screens/MainPage';
import FormNote from './src/screens/FormNote';
import FormProfile from './src/screens/FormProfile';
import Icon from 'react-native-vector-icons/FontAwesome';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const App: () => React$Node = () => {
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
                      onPress={()=> navigation.navigate('FormProfile')}
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
            name="FormProfile"
            component={FormProfile}
            options={{
              title : "Form Profile"
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
  );
};

export default App;
