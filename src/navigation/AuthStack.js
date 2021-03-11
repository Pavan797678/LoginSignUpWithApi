import React from 'react';
import {Button, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import navigationStrings from '../constants/navigationStrings';
import { SignUp,Login } from '../Screens';


const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <React.Fragment>
       <Stack.Screen
        name={navigationStrings.LOGIN}
        component={Login}
        options={{headerShown: false}}
      />
       <Stack.Screen
        name={navigationStrings.SIGNUP}
        component={SignUp}
        options={{headerShown: false}}
      /> 
    </React.Fragment>
  )
}
