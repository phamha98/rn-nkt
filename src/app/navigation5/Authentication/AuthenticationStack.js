import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { AdminStackNavigation } from './Admin/AdminStackNavigation';
import { UserStackNavigation } from './User/UserStackNavigation';

var Stack = createStackNavigator();
export const AuthenticationStack = (props) => {
    return (
        <Stack.Navigator headerMode={null}>
            <Stack.Screen name="UserStackNavigation" component={UserStackNavigation} />
            <Stack.Screen name="AdminStackNavigation" component={AdminStackNavigation} />
        </Stack.Navigator>
    )
}

