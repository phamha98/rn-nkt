import React, { useState } from 'react';
import { NativeModules, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSafeArea } from "react-native-safe-area-context";
import ScrollableTabView from "react-native-scrollable-tab-view";
import DefaultTabBar from "react-native-scrollable-tab-view/DefaultTabBar";
import { useSelector } from "react-redux";
import IoniconsFont from "../../../library/components/iconVector/IoniconsFont";
import ViewCus from "../../../library/components/ViewCus/ViewCus";
import { openSettings } from '../../../library/utils/Permission';
import { navigate } from '../../../navigation/navigationService';
import * as ScreenTypes from '../../../navigation/screenTypes';
import { dispatch } from "../../../store/store";
import { palette as appColors } from '../../../themes/palette';
import { debugForceUpdate } from "../redux/debugAction";
import DebugAPI from "./DebugAPI";
import DebugScreen from "./DebugScreen";

export const DebugButtonActive = (props) => {
    const { children } = props;
    const isActive = useSelector(state => state.debug.isActive);

    var count = 0;
    var timerOut = null;
    const click = () => {
        count++;
        clearTimeout(timerOut);
        timerOut = setTimeout(() => {
            console.log(count)
            if (count == 8) {
                dispatch(debugForceUpdate({ isActive: !isActive }, true));
            }
            count = 0;
        }, 300);
    }
    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={() => click()}
        >
            {children}
        </TouchableOpacity>
    )
}
export const StatusDebug = () => {
    const navigationSteps = useSelector(state => state.debug.navigationSteps);
    const currentAPI = useSelector(state => state.debug.apis.length > 0 ? state.debug.apis[0] : null);
    var currentStep = navigationSteps.length > 0 ? navigationSteps[navigationSteps.length - 1] : null;
    return (
        <ViewCus.ViewHorizontal
            style={{
                backgroundColor: '#f2f2f2',
                justifyContent: 'space-between',
                paddingHorizontal: 5
            }}
        >
            {
                currentStep != null &&
                <ViewCus.Text
                    style={{
                        fontSize: 12
                    }}
                >
                    {currentStep.routeName}
                </ViewCus.Text>
            }
            {
                currentAPI != null && currentAPI.status != 'END' &&
                <ViewCus.Text
                    style={{
                        fontSize: 12,
                        paddingLeft: 10,
                        color: currentAPI.status == -1 ? appColors.green : 'black'
                    }}
                    numberOfLines={1}
                >
                    {currentAPI.url}
                </ViewCus.Text>
            }
        </ViewCus.ViewHorizontal>
    )
}

export const DebugButton = () => {
    const isShow = useSelector(state => state.debug.isShow);
    const [isUserManager, setIsUserManager] = useState(false)
    const token = useSelector(state => state.AppReducer.token)
    return (
        <>
            <ViewCus.ViewHorizontal
                style={{
                    backgroundColor: appColors.materialBlue,
                }}
            >
                <ViewCus.Button
                    style={{
                        flex: 1,
                        paddingVertical: 3,
                        padding: 0,
                        backgroundColor: appColors.transparent,
                    }}
                    onPress={() => dispatch(debugForceUpdate({ isShow: !isShow }, true))}
                >
                    <Text
                        style={{
                            textAlign: 'center'
                        }}
                    >
                        <ViewCus.Ionicons icon={!isShow ? IoniconsFont.chevronUp : IoniconsFont.chevronDown} size={16} color={appColors.white} />
                    </Text>
                </ViewCus.Button>
                {
                    [
                        (token || '') != '' && {
                            icon: <ViewCus.Ionicons icon={isUserManager ? IoniconsFont.personCircleOutline : IoniconsFont.peopleCircleOutline} size={16} color={appColors.white} />,
                            onPress: () => {
                                var flag = !isUserManager;
                                setIsUserManager(flag);
                                navigate(flag ? ScreenTypes.AUTHORIZE_MANAGER : ScreenTypes.AUTHORIZE);

                            }
                        },
                        {
                            icon: <ViewCus.Ionicons icon={IoniconsFont.settings} size={16} color={appColors.white} />,
                            onPress: () => openSettings()
                        },
                        __DEV__ && {
                            icon: <ViewCus.Ionicons icon={IoniconsFont.reload} size={16} color={appColors.white} />,
                            onPress: () => NativeModules.DevSettings.reload()
                        },
                    ].filter(e => e !== false).map((e, index) => (
                        <ViewCus.Button
                            key={index}
                            onPress={e.onPress}
                            style={{
                                borderColor: appColors.white,
                                borderLeftWidth: 1,
                                paddingVertical: 3,
                                backgroundColor: appColors.transparent,
                            }}
                        >
                            {e.icon}
                        </ViewCus.Button>
                    ))
                }
            </ViewCus.ViewHorizontal>
        </>
    )
}

export default function Debug() {
    const isShow = useSelector(state => state.debug.isShow)
    const isActive = useSelector(state => state.debug.isActive)
    var insets = useSafeArea();
    return (
        isActive &&
        <View
            style={{
                flex: isShow ? 1 : 0,
                paddingBottom: insets.bottom
            }}
        >
            <StatusDebug />
            <DebugButton />
            {isShow &&
                <View
                    style={{
                        flex: 1,
                        backgroundColor: '',
                    }}
                >
                    <ScrollableTabView
                        tabBarUnderlineStyle={{
                            // backgroundColor: 'blue',
                            height: 1
                        }}
                        renderTabBar={() => <DefaultTabBar
                            style={{
                                height: null,
                                borderBottomWidth: 1
                            }}
                            tabStyle={{
                                paddingBottom: 0
                            }}
                            renderTab={(label, index, isTabActive, goToPage, onLayoutHandler, f) => {
                                return ([
                                    index != 0 &&
                                    <View key={index + 's'} style={{ height: '100%', borderColor: '#ccc', borderLeftWidth: 1 }} />
                                    ,
                                    <ViewCus.Button
                                        key={index}
                                        style={{
                                            flex: 1,
                                            padding: 0,
                                            backgroundColor: appColors.transparent,
                                            paddingVertical: 0,
                                            paddingHorizontal: 0
                                        }}
                                        styleText={{
                                            color: isTabActive ? appColors.materialBlue : 'grey'
                                        }}
                                        onPress={() => goToPage(index)}
                                    >
                                        {label}
                                    </ViewCus.Button>
                                ])
                            }}
                        />}
                    >
                        <DebugAPI tabLabel='Network' />
                        <DebugScreen tabLabel='Screen' />
                    </ScrollableTabView>
                </View>
            }
            <View
                style={{
                    // height: insets.bottom,
                    backgroundColor: appColors.materialBlue
                }}
            />
        </View>
    );
}