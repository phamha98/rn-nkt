import React, { useEffect, useRef } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import BotAssistant, { FIELD_DATA_TYPE, FIELD_TYPE, REQUEST_TYPE } from '../../../library/utils/BotAssistant'
import { Header, Screen, Button, AntDesignFont, FontAwesomeFont, IoniconsFont, MaterialCommunityIconsFont } from '../../../library/components';
import * as ScreenTypes from '../../../navigation/screenTypes';
import { ConfigProps, Field, InjectedFormProps, reduxForm } from 'redux-form';
import ViewCus from '../../../library/components/ViewCus/ViewCus';
import { AUTHORIZE, AUTHORIZE_MANAGER, FORGOT, UN_AUTHORIZE } from '../../../navigation/screenTypes';
import { navigate } from '../../../navigation/navigationService';
import { palette as appColors } from '../../../themes/palette';
import { _sleep } from '../../../common';
import RNFetchBlob from 'rn-fetch-blob';
import { filePath as filePathBundle } from '../../downloadBundle';
import constants from '../../../common/constants';
import Icon from '../../../library/components/iconVector/index';


export const ChooseFunction = reduxForm({ form: 'ChooseFunction' })(
    (props: InfoFormProps & ConfigProps & InjectedFormProps) => {
        const { initialize: loadForm, isRefresh: _isRefresh, handleSubmit, } = props;
        const itemWidth = constants.window.width * (constants.window.width < 400 ? .7 : constants.window.width > 800 ? .45 : .6);
        const scaleWidth = (itemWidth / 614.4);
        const refChooseFunction = useRef()
        useEffect(() => {
            init()
        }, []);

        const init = async () => {
            RNFetchBlob.fs.readFile(filePathBundle, 'utf8').then(data => {
            })
        }
        const enterText = async () => {
            navigate(AUTHORIZE);
        }
        const enterVoice = async () => {
            navigate("NGUOI_KHIEM_THI");
        }

        return (
            <Screen>
                <Header
                    // isBack={true}
                    onGoBack={() => navigate(UN_AUTHORIZE)}
                    headerTx={'Lựa chọn phương thức nhập'}
                />

                <View style={{ padding: 10 }}>
                    <View style={{ marginTop: itemWidth / 1.8, width: '100%', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <View
                                style={{
                                    width: itemWidth / 1.6,
                                    height: itemWidth / 1.6,
                                    padding: 10 * scaleWidth,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    position: 'relative',

                                }}
                            >
                                <View
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        backgroundColor: 'white',
                                        position: 'absolute',
                                        borderWidth: 1,
                                        borderRadius: 5,
                                        borderColor: '#ddd',
                                        borderBottomWidth: 1,
                                        shadowColor: '#ccc',
                                        shadowOffset: { width: 0, height: 2 },
                                        shadowOpacity: 0.8,
                                        shadowRadius: 5,
                                        marginLeft: 5,
                                        marginRight: 5,
                                        marginTop: 10,
                                    }}
                                />
                                <TouchableOpacity
                                    accessible={true}
                                    accessibilityLabel="Nhập văn bản"
                                    accessibilityHint="Bạn vừa thao tác vào màn hình nhập văn bản"
                                    activeOpacity={.9}
                                    style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        width: '100%',
                                        height: '100%',
                                        transform: [{ rotate: "0deg" }],
                                        padding: itemWidth / 2 * .05,
                                    }}
                                    onPress={enterText}
                                >
                                    <Image
                                        style={{
                                            width: itemWidth / 2 * .35,
                                            height: itemWidth / 2 * .35,
                                        }}
                                        source={require("../../../assets/icon/text-1.png")}
                                        resizeMode='contain'
                                    />
                                    <Text
                                        style={{
                                            marginVertical: 10 * scaleWidth,
                                            textAlign: 'center',
                                            color: '#484848',
                                            fontWeight: "500",
                                            fontSize: 40 * scaleWidth,
                                            marginTop: 20
                                        }}>
                                        {"Nhập Văn bản"}
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            <View
                                style={{
                                    width: itemWidth / 1.6,
                                    height: itemWidth / 1.6,
                                    padding: 10 * scaleWidth,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    position: 'relative',

                                }}
                            >
                                <View
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        backgroundColor: 'white',
                                        position: 'absolute',
                                        borderWidth: 1,
                                        borderRadius: 5,
                                        borderColor: '#ddd',
                                        borderBottomWidth: 1,
                                        shadowColor: '#ccc',
                                        shadowOffset: { width: 0, height: 2 },
                                        shadowOpacity: 0.8,
                                        shadowRadius: 5,
                                        marginLeft: 5,
                                        marginRight: 5,
                                        marginTop: 10,
                                    }}
                                />
                                <TouchableOpacity
                                    accessible={true}
                                    accessibilityLabel="Nhập giọng nói"
                                    accessibilityHint="Bạn vừa thao tác vào màn hình nhập giọng nói"
                                    activeOpacity={.9}
                                    style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        width: '100%',
                                        height: '100%',
                                        transform: [{ rotate: "0deg" }],
                                        padding: itemWidth / 2 * .05,
                                    }}
                                    onPress={enterVoice}
                                >
                                    <Image
                                        style={{
                                            width: itemWidth / 2 * .35,
                                            height: itemWidth / 2 * .35,
                                        }}
                                        source={require("../../../assets/icon/voice-1.png")}
                                        resizeMode='contain'
                                    />
                                    <Text
                                        style={{
                                            marginVertical: 10 * scaleWidth,
                                            textAlign: 'center',
                                            color: '#484848',
                                            fontWeight: "500",
                                            fontSize: 40 * scaleWidth,
                                            marginTop: 10
                                        }}>
                                        {"Nhập giọng nói"}
                                    </Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
                </View>
            </Screen>
        );
    },
);
const styles = StyleSheet.create({
    btn: {
        backgroundColor: 'transparent',
    },
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginBottom: 20
    },
    wrapText: {
        backgroundColor: 'rgba(0,190,212,1)',
        borderRadius: 50,
        marginTop: 20,
        width: '45%',
        height: 50,
        marginHorizontal: 10
    },
    wrapVoice: {
        backgroundColor: '#c53535',
        borderRadius: 50,
        marginTop: 20,
        width: '45%',
        height: 50,
        marginHorizontal: 10
    },
    text: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,

    },
});

export default ChooseFunction
