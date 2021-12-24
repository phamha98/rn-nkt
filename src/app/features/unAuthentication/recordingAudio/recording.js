import React, { Component, useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Platform, TouchableHighlight, Image } from 'react-native';
import { Buffer } from 'buffer';
import AudioRecord from 'react-native-audio-record';
import Permissions from 'react-native-permissions';
import { ServiceAsync } from '../../../library/networking/async';
import ViewCus from '../../../library/components/ViewCus/ViewCus';
import { AUTHORIZE, AUTHORIZE_MANAGER, FORGOT } from '../../../navigation/screenTypes';
import LocalStorage from '../../../common/LocalStorage';
import { setHomeUserDetails } from '../../authentication/home/redux/action';
import { useDispatch } from 'react-redux';
import { onSetToken, onSetUser } from '../../../store/app_redux/action';
import { navigate } from '../../../navigation/navigationService';
import { _sleep } from '../../../common/index';
import { checkAndRequest, PERMISSIONS } from '../../../library/utils/Permission';
import { ConfigProps, Field, InjectedFormProps, reduxForm } from 'redux-form';
import { useSelector } from 'react-redux';
import { Header, Screen, } from '../../../library/components';
import ModalLoadPitch from '../../../library/components/modalLoadPitch/ModalLoadPitch';
import { toggleLoading } from '../../../../../App';
export const AudioRecording = reduxForm({ form: 'AudioRecording' })(
    (props: InfoFormProps & ConfigProps & InjectedFormProps) => {
        const { initialize: loadForm, isRefresh: _isRefresh, handleSubmit, } = props;
        const refRecording = useRef()
        const refModal = useRef();
        var audioFile: string;
        const dispatch = useDispatch();
        const [state, setState] = useState({
            audioFile: '',
            recording: false,
            paused: true,
            loaded: false
        })
        const user = useSelector(state => state.AppReducer);
        const refFingerPrint = useRef()
        var DeviceId: any;
        useEffect(() => {
            checkPermission();
            checkPermissPlatform();
        }, [])

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

        // Check permission Android - IOS
        const checkPermissPlatform = async () => {
            // Check permission Android - IOS
            await _sleep(500)
            var PermissionConfigs = [
                {
                    permission: PERMISSIONS.AUDIO,
                    name: 'Recording',
                    description: 'Used to open recording',
                },
            ]
            var permissionMiss = await checkAndRequest(PermissionConfigs);
            if (permissionMiss.length > 0) {
                ViewCus.Alert.Confirm(
                    () => openSettings(),
                    null,
                    permissionMiss.map(e => '{0} - {1}'.format(e.name, e.description)).join('\n'),
                    null,
                    null,
                    'Mở cài đặt'
                )
                return;
            }
            await _sleep(500);
            const options = {
                sampleRate: 16000,
                channels: 1,
                bitsPerSample: 16,
                wavFile: 'voice.wav'
            };
            await AudioRecord.init(options);
            AudioRecord.on('data', data => {
                const chunk = Buffer.from(data, 'base64');
                console.log('chunk size', chunk.byteLength);
                // do something with audio chunk
            });
        }

        const start = async () => {
            // ViewCus.Alert.Alert('Hệ thống đang lắng nghe. Vui lòng nói để đăng nhập!');
            toggleLoading(true);
            setState({
                audioFile: '',
                recording: true,
                paused: true,
                loaded: false
            });
            await AudioRecord.start();
            setTimeout(async () => {
                await stop();
            }, 7000);
            // await _sleep(5000);
            // stop();
        };
        const stop = async () => {
            toggleLoading(false);
            // if (!state.recording) return;
            if (state.recording) return;
            let audioFile = await AudioRecord.stop();
            // setState({ recording: false });
            // wait till file is saved, else react-native-video will load incomplete file
            setTimeout(() => {
                setState({
                    audioFile: audioFile,
                    recording: false,
                    paused: true,
                    loaded: false
                });
            }, 1000);
            uploadAudio(audioFile)
        };
        const uploadAudio = async (audioFile) => {
            var formData = new FormData();
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
                })
            try {
                var resp = await ServiceAsync.UploadFile('https://cameraai-api.dttt.vn:5028/predict_speaker', formData);
                let data = JSON.parse(resp.speaker)
                if (data.status == 0) {

                    dispatch(setHomeUserDetails(data.user))
                    dispatch(onSetToken(data.token));
                    dispatch(onSetUser(data));
                    LocalStorage.setToken(data.token);
                    LocalStorage.setUserSaved(data);
                    if (data.user?.capQuanLy == 7)
                        navigate('CHOOSE_FUNCTION');
                    else
                        navigate(AUTHORIZE_MANAGER);
                }
                else {
                    ViewCus.Alert.Alert('Không thể xác nhận giọng nói của bạn, xin vui lòng thử lại!');
                }

            } catch (error) {
                console.log(error)
                setTimeout(() => {
                    ViewCus.Alert.Alert('Dịch vụ chưa sẵn sàng, vui lòng bật dịch vụ phía máy chủ.');
                  }, 2000);
               
            }
        }

        return (<>
            <ModalLoadPitch ref={refModal} options={[]} />
            <View >
                <View>
                    {
                        state.recording == false ?
                            <TouchableHighlight onPress={start} disabled={state.recording}>
                                <Image style={styles.button} source={require('../../../assets/icon/voice.png')} />
                            </TouchableHighlight>
                            :
                            <View>
                                <TouchableHighlight onPress={stop} disabled={!state.recording}>
                                    <Image style={styles.button} source={require('../../../assets/icon/offVoice.png')} />
                                </TouchableHighlight>
                            </View>
                    }
                </View>
                <Text style={{ fontSize: 16, color: '#333', marginVertical: 10 }}>{'Giọng nói'}</Text>
                <View style={{ flex: 1, alignItems: 'flex-start', marginHorizontal: 25 }}>
                </View>
                {
                    state.recording == true ?
                        refModal.current?.toggle(true)
                        :
                        refModal.current?.toggle(false)
                }

            </View>


        </>);
    },
);

const styles = StyleSheet.create({
    button: {
        width: 40,
        height: 40
    }
});