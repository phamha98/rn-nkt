import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useRef, useState } from 'react';
import { View, Text } from 'react-native';
import 'react-native-gesture-handler';
import { _sleep } from '../common';
import ViewCus from '../library/components/ViewCus/ViewCus';
import { NavigationContainer } from '@react-navigation/native';
// import { AuthenticationStack } from './Authentication/AuthenticationStack';
import { UnAuthenticationStack } from './UnAuthentication/UnAuthenticationStack';
import Debug from '../features/debug/components/Debug';
import LocalStorage from '../common/LocalStorage';
import { dispatch } from '../store/store';
import { setHomeUserDetails } from '../features/authentication/home/redux/action';
import { onSetUser, onSetToken } from '../store/app_redux/action';
import RestAPI from '../RestAPI';
import { UserStackNavigation } from './Authentication/User/UserStackNavigation';
import { AdminStackNavigation } from './Authentication/Admin/AdminStackNavigation';

var Stack = createStackNavigator();

export const navigationRef = React.createRef();
export function getNavigationSteps(navigationState, steps) {
    steps = steps == null ? [] : steps;
    if (!navigationState) {
        return steps;
    }
    const route = navigationState.routes[navigationState.index];
    steps.push(route);
    if (route.routes || route.state) {
        return (getNavigationSteps(route.routes != null ? route : route.state, steps));
    }
    return steps;
}

export function navigate(name, params) {
    navigationRef.current?.navigate(name, params);
}

const AuthenticationStack = (props) => {
    return (
        <Stack.Navigator headerMode={null}>
            {props.isAdmin ?
                <Stack.Screen name="AdminStackNavigation" component={AdminStackNavigation} />
                : <Stack.Screen name="UserStackNavigation" component={UserStackNavigation} />
            }
        </Stack.Navigator>
    )
}

const AppNavigation = () => {
    const refLoading = useRef();
    const refRootNavigation = useRef();
    useEffect(() => {
        _run();
    }, []);

    const _run = async () => {
        var config = {
            isReady: true,
            isAuthentication: false,
            isAdmin: false,
            init: null
        }
        var debug = await LocalStorage.getDebug();
        var token = (await LocalStorage.getToken() || '');
        var userSaved = await LocalStorage.getUserSaved();

        if (token == '' || userSaved == null) {
        }
        else {
            var userProfile = await RestAPI.GetUserDetails(userSaved.user.userID);
            if (userProfile == null || [401, 400, 500].indexOf(userProfile.code) >= 0) {
                config.isAuthentication = true;
            }
            else {
                userSaved = {
                    ...userSaved,
                    user: {
                        ...userSaved.user,
                        ...userProfile
                    }
                }
                LocalStorage.setUserSaved(userSaved)
                dispatch(setHomeUserDetails(userProfile))
                dispatch(onSetUser(userSaved))
                dispatch(onSetToken(token));

                config.isAuthentication = true;
                config.isAdmin = true;
            }
        }

        refLoading.current?.toggle(false);
        refRootNavigation.current?.setData(config);
    }

    const onStateChange = (state) => {
        var states = navigationRef.current?.getRootState();
        var steps = getNavigationSteps(states);
        console.log('onStateChange', JSON.stringify(states))
    }

    return (
        <>
            <View style={{ flex: 1 }}>
                <ViewCus.ComponentDynamic ref={refRootNavigation}
                    render={(data) => {
                        const { isReady, isAuthentication, init, isAdmin } = data || {};
                        return isReady === true &&
                            <NavigationContainer
                                ref={navigationRef}
                                initialState={init}
                                onReady={onStateChange}
                                onStateChange={onStateChange}
                            >
                                <Stack.Navigator headerMode={null}>
                                    {isAuthentication ?
                                        <Stack.Screen name="AuthenticationStack" component={AuthenticationStack} isAdmin={isAdmin} />
                                        : <Stack.Screen name="UnAuthenticationStack" component={UnAuthenticationStack} />
                                    }
                                </Stack.Navigator>
                            </NavigationContainer>
                    }}
                />
            </View>
            <Debug />
            <ViewCus.Loading initValue={true} ref={refLoading} />
        </>
    );
}
export default AppNavigation