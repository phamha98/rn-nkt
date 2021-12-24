import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Login } from '../../features/unAuthentication/login/screens/index';
import { Register } from '../../features/unAuthentication/register/screens';

var Stack = createStackNavigator();


export const UnAuthenticationStack = (props) => {
    return (
        <Stack.Navigator initialRouteName="Login" headerMode={null}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
    )
}

