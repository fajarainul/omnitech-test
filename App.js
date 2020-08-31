/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
} from 'react-native';

import {
  Colors, Header,
} from 'react-native/Libraries/NewAppScreen';
import LoginPage from './src/screens/LoginPage';
import MainPage from './src/screens/MainPage';
import FormNote from './src/screens/FormNote';

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
            options={{
              headerLeft : null,
              title : "Main Page"
            }}
          />
          <Stack.Screen
            name="Form"
            component={FormNote}
            options={{
              title : "Form Note"
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
  );
};

export default App;