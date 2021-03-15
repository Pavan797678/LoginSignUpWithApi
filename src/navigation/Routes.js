import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import { UserContext } from '../context/context';

const Stack = createStackNavigator();



export default function Routes() {

   const userContextData = useContext(UserContext);
   console.log("Routes=> ",userContextData.isLoggedIn );
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {userContextData.isLoggedIn ? <>{MainStack()}</>:<>{AuthStack()}</>}
         
      </Stack.Navigator>
    </NavigationContainer>
  );
}
