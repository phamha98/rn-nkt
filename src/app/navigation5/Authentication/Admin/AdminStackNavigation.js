import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Dashboard } from '../../../features/authentication/Admin/dashboard/screen/index';

var Stack = createStackNavigator();
var Drawer = createDrawerNavigator();

const WithDrawer = () => {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name='Dashboard' component={Dashboard} />
            <Drawer.Screen name='Dashboard1' component={Dashboard} />
            <Drawer.Screen name='Dashboard2' component={Dashboard} />
        </Drawer.Navigator>
    )
}
export const AdminStackNavigation = (props) => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="WithDrawer" component={WithDrawer} />
            {/* <Stack.Screen name="UserStackNavigation" component={UserStackNavigation} /> */}
        </Stack.Navigator>
    )
}

