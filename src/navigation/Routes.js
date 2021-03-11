import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AuthStack from './AuthStack';
import MainStack from './MainStack';

const Stack = createStackNavigator();

export default function Routes({isLoggedIn}){
    console.log(!isLoggedIn && AuthStack())
    return (
        <NavigationContainer>
            <Stack.Navigator>
               {!isLoggedIn && AuthStack()}
                {MainStack()}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

