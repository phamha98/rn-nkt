import React, { useState, useCallback, useEffect, useRef } from 'react'
import { View, Text, StyleSheet, Button, Platform, TouchableHighlight, Image } from 'react-native';
import { useSelector } from 'react-redux';
import RestAPI from '../../../../RestAPI';
import { ConfigProps, Field, InjectedFormProps, reduxForm } from 'redux-form';
import { Header, Screen, } from '../../../../library/components';
import DeviceInfo from 'react-native-device-info';
import ViewCus from '../../../../library/components/ViewCus/ViewCus';
import { ServiceAsync } from '../../../../library/networking/async';
import AudioRecord from 'react-native-audio-record';
import Permissions from 'react-native-permissions';
import { Buffer } from 'buffer';
import { ButtonSubmit } from '../components/buttonSubmit'
import { toggleLoading } from '../../../../../../App'
export const Voice = reduxForm({ form: 'Voice' })(
    (props: InfoFormProps & ConfigProps & InjectedFormProps) => {
        const { initialize: loadForm, isRefresh: _isRefresh, handleSubmit, } = props;
        const refRecording = useRef()
        var audioFile: string;
        const [state, setState] = useState({
            audioFile: '',
            recording: false,
            paused: true,
            loaded: false
        })
        const user = useSelector(state => state.AppReducer);
        const refFingerPrint = useRef()
        var DeviceId: any;
        const [flag, setFlag] = useState(false)
        useEffect(() => {
            var isLoginByVoice = user?.profile?.user?.isLoginByVoice
            refRecording.current?.setData(isLoginByVoice)
            GetIdDevice()
            setFormData(isLoginByVoice)
            checkPermission();
            const options = {
                sampleRate: 16000,
                channels: 1,
                bitsPerSample: 16,
                wavFile: 'voice.wav'
            };
            AudioRecord.init(options);
            AudioRecord.on('data', data => {
                const chunk = Buffer.from(data, 'base64');
                console.log('chunk size', chunk.byteLength);
                // do something with audio chunk
            });
        }, [])

        const setFormData = (data) => {
            refFingerPrint.current?.setData(data == false);
            loadForm({
                isLoginByVoice: data
            })
        }

        const GetIdDevice = async () => {
            let uniqueId = await DeviceInfo.getUniqueId();
            DeviceId = uniqueId.toString()
        }
        // Audio Voice
        const checkPermission = async () => {
            const p = await Permissions.check('microphone');
            console.log('permission check', p);
            if (p === 'authorized') return;
            return requestPermission();
        };
        const requestPermission = async () => {
            const p = await Permissions.request('microphone');
            console.log('permission request', p);
        };
        const start = () => {
            console.log('start record');
            setFlag(true)
            setState({
                audioFile: '',
                recording: true,
                paused: true,
                loaded: false
            });
            AudioRecord.start();
        };
        const stop = async () => {
            setFlag(false)
            if (!state.recording) return;
            audioFile = await AudioRecord.stop();
            console.log('audioFile', audioFile);
            setTimeout(() => {
                setState({
                    audioFile: audioFile,
                    recording: false,
                    paused: true,
                    loaded: false
                });
            }, 1000);
        };

        const updateLoginVoice = async (value) => {
            toggleLoading(true)
            var audioFile = state.audioFile
            var formData = new FormData();
            if (audioFile == null || audioFile == "" || audioFile == undefined) {

            }
            else {
                Platform.OS === 'android' ?
                    formData.append("file", {
                        uri: 'file://' + audioFile,
                        name: 'voice.wav',
                        type: 'audio/x-mp4'

                    })
                    :
                    formData.append("file", {
                        uri: audioFile,
                        name: 'voice.wav',
                        type: 'audio/x-mp4'

                    });
            }
            formData.append('userId', user?.profile?.user?.userID);
            formData.append('isLoginByVoice', value?.isLoginByVoice);
            try {
                var resp = await ServiceAsync.UploadFile('https://apinkt.dttt.vn/api/v1/User/UpdateLoginbyVoice?tocken=83258920-700a-4aba-9225-c22e1e77a464', formData);
                if (resp?.result?.isSuccess == true) {
                    toggleLoading(false)
                    ViewCus.Alert.Alert('Cập nhật giọng nói thành công!');
                }
                else {
                    ViewCus.Alert.Alert('Cập nhật giọng nói thất bại');
                }

            } catch (error) {
                console.log(error)
                ViewCus.Alert.Alert('Lỗi trong quá trình tải.');
            }
        }

        return (
            <Screen>
                <Header
                    isBack={true}
                    headerTx={'Cài đặt giọng nói'}
                />
                <View style={{ padding: 10 }}>
                    <ViewCus.ViewBoxShadown>
                        <View>
                            <Text style={{ fontSize: 16, fontWeight: '400' }}>{'Cài đặt giọng nói của bạn để đăng nhập:'}</Text>
                        </View>
                        <View style={{ margin: 10 }}>
                            <Field
                                name={'isLoginByVoice'}
                                component={ViewCus.RadioGroup}
                                options={[
                                    {
                                        value: false,
                                        label: 'Không',
                                        name: 'Khong'
                                    },
                                    {
                                        value: true,
                                        label: 'Có',
                                        name: 'Co'
                                    },
                                ]}
                                onChange={(event, newValue, preValue, name) => {
                                    refRecording.current?.setData(newValue == true)
                                }}
                                render={({ RadioComponent }) => (
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                        <RadioComponent.Khong />
                                        <RadioComponent.Co />
                                    </View>
                                )}
                            />
                        </View>
                        <ViewCus.ComponentDynamic
                            ref={refRecording}
                            render={(isShow) => {
                                return isShow == true &&
                                    <>
                                        <View style={styles.row}>
                                            {
                                                state.recording == false ?
                                                    <TouchableHighlight onPress={start} disabled={state.recording}>
                                                        <Image style={styles.button} source={require('../../../../assets/icon/voice.png')} />
                                                    </TouchableHighlight>
                                                    :
                                                    <View>
                                                        <TouchableHighlight onPress={stop} disabled={!state.recording}>
                                                            <Image style={styles.button} source={require('../../../../assets/icon/offVoice.png')} />
                                                        </TouchableHighlight>
                                                    </View>
                                            }
                                        </View>

                                    </>
                            }}
                        />
                        {/* {
                            flag == true ?
                                <View>
                                    <Text style={{ fontSize: 16, fontWeight: '400', color: 'red', textAlign: 'center' }}>{'Đang ghi âm giọng nói của bạn.'}</Text>
                                </View>
                                : null
                        } */}
                        {
                            state.recording == true ?
                                <View style={{ width: '100%', height: 60, alignItems: 'center', backgroundColor: 'transparent', color: 'gray' }}>
                                    <Text style={{ fontSize: 16, fontWeight: '400', textAlign: 'center', color: 'red' }}>{'Đang ghi âm giọng nói của bạn. Vui lòng nói'}</Text>
                                    <Image
                                        source={require('../../../../assets/image/loadingPitch.gif')}
                                        style={{ width: 50, height: 40, position: 'absolute', bottom: 0 }}
                                    />
                                </View>
                                :
                                null
                        }

                        <ButtonSubmit onPress={handleSubmit(updateLoginVoice)} />
                    </ViewCus.ViewBoxShadown>
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
    button: {
        width: 50,
        height: 50
    }
});