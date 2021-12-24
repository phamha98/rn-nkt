import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from '../../../features/authentication/home/screen/index'
import FirstRegister_List from '../../../features/authentication/Admin/firstRegister/screens/FirstRegister_List';
import Test from './Test';

var Stack = createStackNavigator();
var Drawer = createDrawerNavigator();
var Tab = createBottomTabNavigator();

const ButtomTabNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Home1" component={Home} />
            <Tab.Screen name="Home2" component={Home} />
        </Tab.Navigator>
    )
}

const WithDrawer = () => {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Test" component={Test} />
            <Drawer.Screen name="FirstRegister_List" component={FirstRegister_List} />
            <Drawer.Screen name="ButtomTabNavigator" component={ButtomTabNavigator} />
        </Drawer.Navigator>
    )
}

export const UserStackNavigation = () => {
    return (
        <Stack.Navigator headerMode={null}>
            <Stack.Screen name="WithDrawer" component={WithDrawer} />

            {/* Screen without drawer */}
            {/* <Stack.Screen name="UserStackNavigation" component={UserStackNavigation} /> */}
        </Stack.Navigator>
    )
}