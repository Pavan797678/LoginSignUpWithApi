import React from 'react';
import {Button, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import navigationStrings from '../constants/navigationStrings';
import {Home} from '../Screens';


const Stack = createStackNavigator();

export default function MainStack() {
  return (
    <React.Fragment>
       <Stack.Screen
        name={navigationStrings.HOME}
        component={Home}
        options={{headerShown: false}}
      />
      
    </React.Fragment>
  )
}
