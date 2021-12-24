import Voice, {
    SpeechErrorEvent, SpeechRecognizedEvent,
    SpeechResultsEvent
} from '@react-native-voice/voice';
import React, {useEffect, useRef, useState} from 'react';
import {AppState, FlatList, Platform, View} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import SoundPlayer from 'react-native-sound-player';
import {useSelector} from 'react-redux';
import LocalStorage from '../../common/LocalStorage';
import {asyncFunc, _sleep} from '../../common';
import {callAPI, convertResponseToObj} from '../../features/authentication/khiemThi/data';
import {palette as appColors} from '../../themes/palette';
import {AntDesignFont, FontAwesomeFont, IoniconsFont, MaterialCommunityIconsFont} from '../components';
import ViewCus from '../components/ViewCus/ViewCus';
import {Log, logfix} from "../../features/authentication/khiemThi/utils";

function t<V extends string, T extends { [key in string]: V }>(o: T): T {
    return o
}

const SKIP_AUDIO = false;

export const genericAudio = (content) => {
    // const content = `Nói hủy để quay lại`;
    return `https://texttospeech.responsivevoice.org/v1/text:synthesize?text=${encodeURIComponent(content)}&lang=vi&engine=g1&name=&pitch=0.5&rate=0.5&volume=1&key=0POmS5Y2&gender=female`
}

export enum REQUEST_TYPE {
    FORM = 1,
    NAVIGATE = 2
}

export enum FIELD_TYPE {
    CHOICE = 1,
    TEXT = 2,
    ARRAY = 3,
    UNSAVE = 4,
}

export enum FIELD_DATA_TYPE {
    NUMBER = 1,
    TEXT = 2,
    ARRAY = 3,
    DATETIME = 4,
}

export interface I_Field {
    field: string,
    fieldName: string,
    type: FIELD_TYPE,
    choiceList?: Array<number | string>,
    tempFieldArray?: I_Request,
    mappingValue?: Array<{ dataType: FIELD_DATA_TYPE | -1, value: string, options: String[] }>,
    dataType?: FIELD_DATA_TYPE,
    errorRecognized?: { title: string, audioFile: string },
    skipNext: string,
    validate: Array<{ rule: 'required' | 'choice_in' | 'remote', title: string, audioFile: string, remoteUrl?: string, remoteMethod?: 'POST' | 'GET', remoteFields?: Array<string> }>,
    title: string,
    audioFile: string,
    join: Array<{ field: string, value: Array<string | number> }>,
    skipJoin: Array<{ field: string, value: Array<string | number> }>,
    withField: Array<{ field: string, value: string | number, operator: 'eq' | 'gt' | 'ge' | 'lt' | 'le' | 'not' | 'in' | 'like' }>,
    group?: string | number,
    isSavePartial: boolean
}

export interface I_Request {
    id?: string,
    type: REQUEST_TYPE,
    intro: { title: string, audioFile: string },
    errorRecognized: { title: string, audioFile: string },
    fields?: Array<I_Field>,
    submit: {
        url: string, method: 'POST' | 'GET',
        urlContinue?: string,
        submitHandler?: Array<{
            rule: "counter",
            fields: Array<string>,
            valueMap: Array<string>,
            value: number | string | Array<number | string>
        }>
    },
    confirm?: I_Field,
    confirmContinue?: I_Field,
    domain?: string,
    voiceSubmit?: string,
    saved?: {
        id: string | number
    },
    mappingValue?: Array<{ dataType: FIELD_DATA_TYPE | -1, value: string, options: String[] }>,
    isForwardData?: boolean,
    curFild?: string,
    isSaveLocal?: boolean,
    isAutoContinue?: boolean,
}

const isUrlExists = (URL) => {
    return new Promise((resolve, reject) => {
        fetch(URL).then((res) => {
            if (res.status == 404) {
                resolve(false)
            } else {
                resolve(true)
            }
        }).catch((err) => {
            resolve(false)
        });
    })
}

const LocalFormSave = async (params: { id: string, userId: string, field: string, value?: string, paths?: string[] }) => {
    const {id, field, value = '', userId, paths = []} = params;
    const key = `FormVoice-${userId}-${id}`;
    const saved = (await LocalStorage.get(key, [])) as Array<{ path: string, field: string, fields: Array<{ field: string, value: string, }> }>;

    const path = paths.join('.');
    const indexPath = saved.findIndex(e => e.path == path);
    if (indexPath < 0)
        saved.push({path, field, fields: [{field, value}]});
    else {
        const indexField = saved[indexPath].fields.findIndex(e => e.field == field);
        if (indexField < 0)
            saved[indexPath].fields.push({field, value});
        else
            saved[indexPath].fields[indexField] = {
                ...saved[indexPath].fields[indexField],
                field,
                value
            }

        saved[indexPath].field = field
    }
    await LocalStorage.set(key, saved);
}

const LocalFormRemove = async (id: string, userId: string, paths?: string[]) => {
    const key = `FormVoice-${userId}-${id}`;
    if (paths == null || paths?.length <= 0) {
        console.log('LocalFormRemove')
        await LocalStorage.remove(key);
    } else {
        const path = (paths || []).join('.');
        const saved = (await LocalStorage.get(key, [])) as Array<{ path: string, field: string, fields: Array<{ field: string, value: string, }> }>;
        const indexPath = saved.findIndex(e => e.path === path);
        if (indexPath >= 0)
            saved.splice(indexPath, 1);

        await LocalStorage.set(key, saved);
    }
}

const LocalFormGet = async (id: string, userId: string, paths?: string[]) => {
    const key = `FormVoice-${userId}-${id}`;
    const saved = (await LocalStorage.get(key, [])) as Array<{ path: string, field: string, fields: Array<{ field: string, value: string, }> }>;
    const path = (paths || []).join('.');
    console.log('LocalFormGet', key, saved)
    return saved.find(e => e.path == path)

}

const MAPPING_VALUE = [
    {dataType: FIELD_DATA_TYPE.NUMBER, value: '0', options: ['0', 'ko', 'không']},
    {
        dataType: FIELD_DATA_TYPE.NUMBER,
        value: '1',
        options: ['1', 'một', 'môt', 'mốt', 'mot', 'môt', 'mốt', 'mot', 'ốt', 'ót', 'ột']
    },
    {
        dataType: FIELD_DATA_TYPE.NUMBER,
        value: '2',
        options: ['2', 'hai', 'hi', 'hài', 'hay', 'hài', 'hại', 'hái', 'hải', 'hài', 'hại', 'hái', 'hải', 'hi', 'hi', 'hay', 'hạy', 'hảy', 'hãy', 'hày', 'háy', 'hay', 'hạy', 'hảy', 'hãy', 'hày', 'háy']
    },
    {
        dataType: FIELD_DATA_TYPE.NUMBER,
        value: '3',
        options: ['3', 'ba', 'pa', 'pa', 'pà', 'bà', 'bạ', 'bá', 'bả', 'bà', 'bạ', 'bá', 'bả', 'pa', 'pà']
    },
    {dataType: FIELD_DATA_TYPE.NUMBER, value: '4', options: ['4', 'bốn']},
    {dataType: FIELD_DATA_TYPE.NUMBER, value: '5', options: ['5', 'năm']},
    {dataType: FIELD_DATA_TYPE.NUMBER, value: '6', options: ['6', 'sáu']},
    {dataType: FIELD_DATA_TYPE.NUMBER, value: '7', options: ['7', 'bảy', 'bẩy']},
    {dataType: FIELD_DATA_TYPE.NUMBER, value: '8', options: ['8', 'tám']},
    {dataType: FIELD_DATA_TYPE.NUMBER, value: '9', options: ['9', 'chín', 'trín']},
    {dataType: FIELD_DATA_TYPE.NUMBER, value: '10', options: ['10', 'mười']},
]

const SUGGEST_INPUT = [
    {
        dataType: FIELD_DATA_TYPE.TEXT,
        options: [
            'hà nội', 'hai bà trưng', 'lê đại hành', 'tổ 1',
            'có', 'không',
            'abc', 'def',
            'nguyễn văn a', 'pha thị phê',
            'kinh', 'tày', 'mường',
            '123', '456', '789', '0123456789',
        ]
    },
    {
        dataType: FIELD_DATA_TYPE.DATETIME,
        options: new Array(9).fill(1).map((e, index) => `0${index + 1}/0${index + 1}/${1990 + index}`)
    },
    {
        dataType: FIELD_DATA_TYPE.NUMBER,
        options: new Array(9).fill(1).map((e, index) => `${index + 1}`)
    }
]

const usePlayer = (onTime = () => {
}) => {
    const refCallback = useRef(null)
    const refOnPlaying = useRef(null)
    const refReject = useRef(null)
    const refInfoTimer = useRef()
    const refHanlderStop = useRef(false)
    const refUrl = useRef('')
    const isDebugActive = useSelector(state => state.debug.isActive)
    useEffect(() => {
        const FinishedPlaying = SoundPlayer.addEventListener('FinishedPlaying', async ({success}) => {
            console.log('done finished playing', success);
            if (!success)
                ViewCus.Alert(`Error play audio.(${refUrl.current})`)
            // SoundPlayer.stop();
            refInfoTimer.current != null && clearInterval(refInfoTimer.current)
            if (refCallback.current != null) {
                refCallback.current()
                refCallback.current = null
            }
        })
        const FinishedLoading = SoundPlayer.addEventListener('FinishedLoading', ({success}) => {
            if (!success) {
                ViewCus.Alert(`Error load audio.(${refUrl.current})`)
                refInfoTimer.current != null && clearInterval(refInfoTimer.current)
                if (refCallback.current != null) {
                    refCallback.current()
                    refCallback.current = null
                }
            }
            // console.log('finished loading', success)
        })
        const FinishedLoadingFile = SoundPlayer.addEventListener('FinishedLoadingFile', ({success, name, type}) => {
            // console.log('finished loading file', success, name, type);
        })
        const FinishedLoadingURL = SoundPlayer.addEventListener('FinishedLoadingURL', async ({success, url}) => {
            // console.log('finished loading url', success, url)
            if (refOnPlaying.current != null) {
                refOnPlaying.current();
                refOnPlaying.current = null;
            }
            if (refHanlderStop.current) {
                refHanlderStop.current = false;
                return;
            }
            if (success) {
                SoundPlayer.play();
                refInfoTimer.current = setInterval(async () => {
                    const info = await SoundPlayer.getInfo() // Also, you need to await this because it is async
                    onTime(info)
                }, 200)
            }
        });
        return () => {
            refInfoTimer.current != null && clearInterval(refInfoTimer.current)
            FinishedPlaying != null && FinishedPlaying.remove();
            FinishedLoading != null && FinishedLoading.remove();
            FinishedLoadingFile != null && FinishedLoadingFile.remove();
            FinishedLoadingURL != null && FinishedLoadingURL.remove();
        };
    }, [])
    return {
        playerPlay: async (
            {
                text = '', url, callback: _callback,
                onPlaying = (e) => {
                },
                reject = () => {
                }
            }
        ) => {
            logfix('2.5 playerPlay')
            url = refUrl.current = url.split('\\',).join('/').split('\\\\',).join('/')
            console.log(url)
            refCallback.current = _callback;
            refReject.current = reject;
            refOnPlaying.current = onPlaying;
            refHanlderStop.current = false;
            const isExists = await isUrlExists(url);
            SoundPlayer.loadUrl(isExists ? url : genericAudio(isDebugActive && text != '' ? text : 'Url audio không tồn tại.'))
        },
        playerStop: function (isForce = false) {
            logfix('2.6 playerStop')
            refInfoTimer.current != null && clearInterval(refInfoTimer.current)
            refHanlderStop.current = isForce;
            SoundPlayer.stop();
            if (isForce) {
                refCallback.current = null
                refReject.current != null && refReject.current();
            } else if (refCallback.current != null) {
                refCallback.current()
                refCallback.current = null
            }
        }
    }
}

const useVoice = (
    onPitch = () => {
    },
) => {
    const LISTEN = {
        START: 1,
        STOP: 0,
        RECOGNIZING: 2,
        DESTROY: 4,
    }
    const refStatus = useRef(LISTEN.DESTROY)
    const refOnResults = useRef()
    const refOnError = useRef()
    const refOnSpeechStart = useRef()
    const refReject = useRef()
    const refTimer = useRef({
        count: 0,
        timer: 0
    })

    const refIosDetectVoice = useRef(null);

    useEffect(() => {
        Voice.onSpeechStart = onSpeechStart;
        Voice.onSpeechRecognized = onSpeechRecognized;
        Voice.onSpeechEnd = onSpeechEnd;
        Voice.onSpeechError = onSpeechError;
        Voice.onSpeechResults = onSpeechResults;
        Voice.onSpeechPartialResults = onSpeechPartialResults;
        Voice.onSpeechVolumeChanged = onSpeechVolumeChanged;
        return () => {
            refIosDetectVoice.current != null && clearTimeout(refIosDetectVoice.current);
            Voice.destroy().then(Voice.removeAllListeners);
        };
    }, [])

    const onSpeechStart = (e: any) => {
        refStatus.current = LISTEN.START
        if (refOnSpeechStart.current != null) {
            refOnSpeechStart.current(e)
            refOnSpeechStart.current = null;
        }

        console.log('onSpeechStart: ', e);
    };

    const onSpeechRecognized = (e: SpeechRecognizedEvent) => {
        if (Platform.OS == 'android') {
            refStatus.current = LISTEN.STOP
        }
        console.log('onSpeechRecognized: ', e);
    };

    const onSpeechEnd = (e: any) => {
        refStatus.current = LISTEN.STOP
        console.log('onSpeechEnd: ', e);
    };

    const onSpeechError = async (e: SpeechErrorEvent) => {
        if ([5, 7, '5', '7'].includes(e.error?.code)) {
            if (refTimer.current.count < 1 && new Date().getTime() < refTimer.current.timer) {
                await _sleep(200)
                Voice.start();
                return;
            }
        }
        refStatus.current = LISTEN.STOP
        if (refOnError.current != null) {
            refOnError.current(e)
            refOnError.current = null;
        }
        console.log('onSpeechError: ', e);
    };

    const onSpeechResults = (e: SpeechResultsEvent) => {
        const _callback = () => {
            refStatus.current = LISTEN.STOP
            if (refOnResults.current != null) {
                refOnResults.current(e)
                refOnResults.current = null;
            }
        }
        if (Platform.OS == 'android')
            _callback();
        else {
            refIosDetectVoice.current != null && clearTimeout(refIosDetectVoice.current);
            refIosDetectVoice.current = setTimeout(() => {
                _callback();
                Voice.stop();
            }, 1600);
        }
        console.log('onSpeechResults: ', e);
    };

    const onSpeechPartialResults = (e: SpeechResultsEvent) => {
        console.log('onSpeechPartialResults: ', e);
    };

    const onSpeechVolumeChanged = (e: any) => {
        onPitch(e)
        // console.log('onSpeechVolumeChanged: ', e);
    };

    const onStart = () => {
        refTimer.current = {
            count: 0,
            timer: new Date().getTime() + 8888
        }
    }
    return {
        voiceStart: async ({
                               locate = 'vi-VN',
                               onResults: _onResults,
                               onError: _onError,
                               onSpeechStart: _onSpeechStart,
                               reject: _onReject = () => {
                               }
                           }) => {
            logfix('2.7 voiceStart')
            console.log('aaaa', await Voice.getSpeechRecognitionServices())
            if (!Voice.isAvailable())
                return;
            const isRecognizing = await Voice.isRecognizing();
            if (isRecognizing) {
                await Voice.stop();
            }
            if ([LISTEN.DESTROY, LISTEN.STOP].includes(refStatus.current))
                await Voice.start(locate, Platform.select({
                    android: {
                        EXTRA_SPEECH_INPUT_MINIMUM_LENGTH_MILLIS: 30000,
                        EXTRA_SPEECH_INPUT_COMPLETE_SILENCE_LENGTH_MILLIS: 30000,
                        EXTRA_SPEECH_INPUT_POSSIBLY_COMPLETE_SILENCE_LENGTH_MILLIS: 30000,
                    }, ios: undefined
                }));

            onStart();
            refOnResults.current = _onResults;
            refOnError.current = _onError;
            refOnSpeechStart.current = _onSpeechStart;
            refReject.current = _onReject;
        },
        voiceStop: async (isForce = false) => {
            logfix('2.8 voiceStop')
            refTimer.current.timer = 0;
            refIosDetectVoice.current != null && clearTimeout(refIosDetectVoice.current);
            const isRecognizing = await Voice.isRecognizing();
            if (isForce) {
                refOnResults.current = null;
                refOnError.current = null;
                refOnSpeechStart.current = null;
                refReject.current != null && refReject.current();
            }
            if (![LISTEN.DESTROY, LISTEN.STOP].includes(refStatus.current) || isRecognizing || Platform.OS == 'ios') {
                refStatus.current = LISTEN.DESTROY;
                await Voice.stop();
            }
        }
    }
}

const VoiceTextInputComponent = React.forwardRef((props, ref) => {
    const refInput = useRef();
    const refOnSubmit = useRef();
    const [placeholder, setPlaceholder] = useState('')
    React.useImperativeHandle(ref, () => ({
        prompt: ({
                     placeholder: _placeholder = '', onSubmit = () => {
            }
                 }) => {
            refInput.current?.setText('')
            setPlaceholder(_placeholder);
            refOnSubmit.current = onSubmit;
        },
        focus: () => {
            refInput.current?.focus()
        },
        handSubmit: text => {
            onSubmit(text);
        }
    }));

    const onSubmit = text => {
        if (refOnSubmit.current != null) {
            refOnSubmit.current(text);
            refOnSubmit.current = null;
        }
        refInput.current?.setText('')
    }
    return (
        <ViewCus.TextInput ref={refInput}
                           placeholder={placeholder}
                           onSubmitEditing={({nativeEvent: {text, eventCount, target}}) => onSubmit(text)}
                           rightComponent={<ViewCus.Button style={{backgroundColor: appColors.metroCyan}}
                                                           onPress={() => onSubmit(refInput.current?.getText())}>
                               <ViewCus.Ionicons icon={IoniconsFont.send} size={18} color='white'/>
                           </ViewCus.Button>}
        />
    )
})

const VoicePitchComponent = React.forwardRef((props, ref) => {
    const [pitch, setPitch] = useState([]);
    const length = 30;
    const height = 3;
    const refPitch = useRef([]);
    React.useImperativeHandle(ref, () => ({
        push: (value) => {
            // console.log('push-data',pitch)
            if (value === null || value === undefined)
                setPitch([])
            else {
                let _pitch = [...pitch, value];
                _pitch = _pitch.length > length ? pitch.slice(_pitch.length - length, _pitch.length) : _pitch;
                setPitch(_pitch)
            }
        }
    }))
    return (
        <ViewCus.ViewHorizontal
            style={{justifyContent: 'center', alignItems: 'center', height: height * 10, marginVertical: 5}}>
            {pitch.map((e, index) => (
                <View key={index} style={{
                    width: 2.5,
                    marginLeft: index == 0 ? 0 : 3,
                    borderRadius: 10,
                    backgroundColor: appColors.metroCyan,
                    height: e * height
                }}/>
            ))}
        </ViewCus.ViewHorizontal>
    )
})

const SpeakTrackComponent = React.forwardRef((props, ref) => {
    const refContent = useRef()
    React.useImperativeHandle(ref, () => ({
        setInfo: (info) => {
            refContent.current?.setData(info)
        }
    }))
    const toTime = (seconds) => {
        var sec_num = parseInt(seconds, 10); // don't forget the second param
        var hours = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);

        if (hours < 10) {
            hours = "0" + hours;
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        // return `${seconds > 60 * 60 ? (hours + ':') : ''}${seconds > 60 ? (minutes + ':') : ''}${seconds}`;
        return `${seconds > 60 * 60 ? (hours + ':') : ''}${minutes}:${seconds}`;
    }
    return (
        <ViewCus.ComponentDynamic
            ref={refContent}
            render={({currentTime = 0, duration = 0} = {}) => (
                <ViewCus.ViewHorizontal style={{alignItems: 'center', marginVertical: 3}}>
                    <ViewCus.Text>{`${toTime(currentTime)} - ${toTime(duration)}`}</ViewCus.Text>
                    {/* <ViewCus.Text>{`${toTime(currentTime)}`}</ViewCus.Text> */}
                    <View style={{
                        height: 5,
                        flex: 1,
                        backgroundColor: appColors.offWhite,
                        marginLeft: 5,
                        borderRadius: 10
                    }}>
                        <View style={{
                            backgroundColor: appColors.metroCyan,
                            borderRadius: 10,
                            height: '100%',
                            width: `${duration == 0 ? 0 : currentTime == duration ? 100 : (currentTime / duration * 100)}%`
                        }}/>
                    </View>
                    {/* <ViewCus.Text>{`${toTime(duration)}`}</ViewCus.Text> */}
                </ViewCus.ViewHorizontal>
            )}
        />
    )
})

const ObjViewerComponent = (props: {
    indexField?: number,
    fields?: Array<{ fieldName: string, type: FIELD_TYPE, group: string | number, field: string, value: number | string, step: number }>,
    onChangeStep: (step: number) => void
}) => {
    const isDebugActive = useSelector(state => state.debug.isActive)
    const {indexField = -1, fields = [], onChangeStep} = props;
    const refModal = useRef()
    const show = 5;
    let start = 0, end = show;
    if (indexField < show)
        start = 0;
    else if (indexField > fields.length - show)
        start = fields.length - show;
    else
        start = indexField - Math.round(show / 2) - 1
    end = start + show;
    return (fields.length > 0 && __DEV__ &&
        <View style={{padding: 5}}>
            {fields.map((e, index) => (index < start || index >= end ? null :
                    <ViewCus.ViewIcon key={index}
                                      iconLeft={indexField == index &&
                                      <ViewCus.AntDesign icon={AntDesignFont.caretright} size={16}
                                                         color={appColors.metronicSuccess}/>}
                    >
                        <ViewCus.Text style={{
                            fontWeight: 'bold',
                            color: e.type == FIELD_TYPE.UNSAVE ? appColors.metroCobalt : 'black'
                        }}>
                            {`${e.fieldName}: ${e.value == null ? '' : e.value.constructor == Object || e.value.constructor == Array ? JSON.stringify(e.value) : e.value}`}
                        </ViewCus.Text>
                    </ViewCus.ViewIcon>
            ))}
            {fields.length > 0 && <ViewCus.ViewHorizontal>
                <ViewCus.Button
                    style={{backgroundColor: appColors.metroCyan, flex: 1}} styleText={{color: 'white'}}
                    onPress={() => refModal.current?.toggle(true)}
                >
                    {'Xem'}
                </ViewCus.Button>
                {isDebugActive && <ViewCus.Button
                    style={{backgroundColor: appColors.metroCyan, flex: 1}} styleText={{color: 'white'}}
                    onPress={() => {
                        const find = [...fields].reverse().find(e => e.type != FIELD_TYPE.UNSAVE);
                        find != null && onChangeStep(find.step)
                    }}
                >
                    {'End'}
                </ViewCus.Button>}
            </ViewCus.ViewHorizontal>
            }
            <ViewCus.Modal
                ref={refModal}
                isScroll
                title='Xem trước'
            >
                <FlatList
                    data={fields}
                    keyExtractor={(e, index) => index + ''}
                    renderItem={({item: e, index}) => (
                        <ViewCus.ViewHorizontal style={{marginTop: index == 0 ? 0 : 3}}>
                            <ViewCus.ViewIcon
                                styleContainer={{flex: 1}}
                                iconLeft={indexField == index &&
                                <ViewCus.AntDesign icon={AntDesignFont.caretright} size={16}
                                                   color={appColors.metronicSuccess}/>}
                            >
                                <ViewCus.Text style={{
                                    fontWeight: 'bold',
                                    color: e.type == FIELD_TYPE.UNSAVE ? appColors.metroCobalt : 'black'
                                }}>
                                    {`${e.fieldName}: ${e.value == null ? '' : e.value.constructor == Object || e.value.constructor == Array ? JSON.stringify(e.value) : e.value}`}
                                </ViewCus.Text>
                            </ViewCus.ViewIcon>
                            {e.type != FIELD_TYPE.UNSAVE &&
                            <ViewCus.Button style={{paddingHorizontal: 3, paddingVertical: 3}}
                                            onPress={() => onChangeStep(e.step)}>
                                <ViewCus.Icon type='Entypo' icon={'align-right'} size={20}/>
                            </ViewCus.Button>}
                        </ViewCus.ViewHorizontal>
                    )}
                />
            </ViewCus.Modal>
        </View>
    )
}

export const BotAssistant = React.forwardRef((props, ref) => {
    const STATE = {
        NONE: 0,
        LISTEN: 1,
        SPEAK: 2
    }
    const STATE_PLAY = {
        STOP: 0,
        PLAYING: 1,
        PAUSE: 2,
        RESUME: 3,
    }

    const isDebugActive = useSelector(state => state.debug.isActive)
    const refTimerSleep = useRef()
    const refMessageViewer = useRef()
    const refObjViewer = useRef()
    const refButtonControl = useRef()
    const refPitchVoice = useRef()
    const refVoiceTextInput = useRef()
    const refVoiceResults = useRef()
    const refSpeakTrack = useRef()

    const refRequest = useRef()

    const {playerPlay, playerStop} = usePlayer((info) => {
        refSpeakTrack.current?.setInfo(info)
    });
    const {voiceStart, voiceStop} = useVoice(e => {
        refPitchVoice.current?.push(e.value)
    })

    const refNextAppState = useRef(null)
    const _handleAppStateChange = (nextAppState) => {
        if (['background', 'inactive'].indexOf(nextAppState) >= 0 && (refNextAppState.current == 'active' || refNextAppState.current == null)) {
            console.log('onDeActive')
            onStateChange(STATE_PLAY.PAUSE);
        } else if (['background', 'inactive'].indexOf(refNextAppState.current) >= 0 && nextAppState == 'active') {
            console.log('onActive')
            onStateChange(STATE_PLAY.PLAYING);
        }

        refNextAppState.current = nextAppState;
    };

    useEffect(() => {
        AppState.addEventListener('change', _handleAppStateChange);
        return () => {
            AppState.removeEventListener('change', _handleAppStateChange);
            refTimerSleep.current != null && clearTimeout(refTimerSleep.current)
            playerStop(true);
            voiceStop(true);
            refButtonControl.current?.setData({state: STATE.NONE})
            refMessageViewer.current?.setData({messages: []})
            refObjViewer.current?.setData()
        }
    }, [])

    React.useImperativeHandle(ref, () => ({
        startRequest: (params: {
            id: string,
            request: I_Request,
            onSuccess: (data) => {},
            onConfirmContinue: (data) => {},
            onSavePartial: (params: { data: Object, groupId: string | number, curFild: string }) => Promise<I_Request>,
            userId: number, token: string
        }) => {
            const {id, request, onSuccess, onConfirmContinue, onSavePartial, token = '', userId = 0} = params;

            Log.d('C.3 ObjRequest')
            Log.d('e.1 startRequest,request:', request)
            const _request = refRequest.current = new ObjRequest({
                id,
                request: request,
                userId, token,
                onObjViewer: ({fields = undefined, indexField = undefined} = {}) => {
                    // fields = fields?.filter(e => e.type != FIELD_TYPE.UNSAVE)
                    refObjViewer.current?.setDataPart({
                        ...indexField != undefined && {indexField},
                        ...fields != undefined && {fields},
                        onChangeStep: (step: number) => {
                            _request.changeStep(step);
                        }
                    });
                },
                onSavePartial: async (params: { data: Object, groupId: string | number, curFild: string }) => {
                    return await onSavePartial({
                        ...params,
                        confirm: '',
                    })
                },
                onSuccess: (data) => onSuccess(data),
                onConfirmContinue: (data) => onConfirmContinue(data)
            });
            onStateChange(STATE_PLAY.PLAYING);
        },
        reset: () => {
            onStateChange(STATE_PLAY.STOP);
            refMessageViewer.current?.setData();
            refObjViewer.current?.setData();
        }
    }))


    const onStateChange = async (statePlay) => {
        if (refRequest.current == null) return;
        if (statePlay == STATE_PLAY.STOP) {
            refTimerSleep.current != null && clearTimeout(refTimerSleep.current)
            playerStop(true);
            voiceStop(true);
            refButtonControl.current?.setData({state: STATE.NONE, statePlay: STATE_PLAY.STOP})

            refObjViewer.current?.setDataPart({indexField: -1})
            refVoiceResults.current?.setData()
        } else if (statePlay == STATE_PLAY.PAUSE) {
            refTimerSleep.current != null && clearTimeout(refTimerSleep.current)
            playerStop(true);
            voiceStop(true);
            refButtonControl.current?.setDataPart({state: STATE.NONE, statePlay: STATE_PLAY.PAUSE})

        } else if (statePlay == STATE_PLAY.PLAYING) { // start
            refButtonControl.current?.setDataPart({statePlay: STATE_PLAY.PLAYING})
            await _sleep(500, t => refTimerSleep.current = t)

            refRequest.current.start();
        } else if (statePlay == STATE_PLAY.RESUME) {
            refButtonControl.current?.setDataPart({statePlay: STATE_PLAY.PLAYING})
            await _sleep(500, t => refTimerSleep.current = t)

            refRequest.current.resume();
        }
    }

    const ObjRequest = function (options: {
        id: string,
        request: I_Request,
        onSuccess: (data: Object) => void,
        onConfirmContinue: (data: Object) => void,
        onSavePartial: (data: Object) => void,
        onObjViewer: (params: {
            indexField?: number,
            fields?: Array<{ fieldName: string, type: FIELD_TYPE, group: string | number, field: string, value: number | string, step: number }>
        }) => void,
        userId?: number,
        token?: string,
        parentsName?: string[],
    }) {
        //
        Log.d('C.1 ObjRequest-function')
        const _this = this;
        const {
            id: idForm, userId, token,
            request,
            onSuccess, onConfirmContinue, onSavePartial, onObjViewer,
            parentsName = []
        } = options;
        var dataArray: Array<{ fieldName: string, type: FIELD_TYPE, field: string, value: number | string, group: string | number, step: number }> =
            [...request.fields.map((e, index) => ({
                fieldName: e.type == FIELD_TYPE.UNSAVE ? e.title : e.fieldName,
                field: e.field,
                value: e.type == FIELD_TYPE.ARRAY ? [] : null,
                type: e.type,
                group: e.group,
                step: index
            }))]
        var C_INDEX = -1;
        var isInit = false;
        var isEndField = false;

        const isBreakField = (params: {
            join?: Array<{ field: string, value: Array<string | number> }>,
            skipJoin?: Array<{ field: string, value: Array<string | number> }>,
            withField: Array<{ field: string, value: string | number, operator: 'eq' | 'gt' | 'ge' | 'lt' | 'le' | 'not' | 'in' | 'like' }>
        }) => {
            const {join, skipJoin, withField} = params;
            if (
                dataArray?.length > 0 && join?.length > 0 &&
                join.findIndex(({field, value = []}) => {
                    const valueObj = ((dataArray.find(e => e.field == field)?.value || '') + '').trim();
                    return value.findIndex(e => (e + '').trim().toLowerCase() == valueObj.toLowerCase()) >= 0
                }) < 0
            ) {
                return true;
            }

            if (
                dataArray?.length > 0 && skipJoin?.length > 0 &&
                skipJoin.findIndex(({field, value = []}) => {
                    const valueObj = ((dataArray.find(e => e.field == field)?.value || '') + '').trim();
                    return value.findIndex(e => (e + '').trim().toLowerCase() == valueObj.toLowerCase()) >= 0
                }) >= 0
            ) {
                return true;
            }

            if (dataArray?.length > 0 && withField?.length &&
                withField.findIndex(({field, value = "", operator}) => {
                    const valueObj = ((dataArray.find(e => e.field == field)?.value || '') + '').trim();
                    if (operator == 'eq')
                        return valueObj == value;
                    else if (operator == 'gt')
                        return valueObj > value;
                    else if (operator == 'ge')
                        return valueObj >= value;
                    else if (operator == 'lt')
                        return valueObj < value;
                    else if (operator == 'le')
                        return valueObj <= value;
                    return false;
                }) < 0
            ) {
                return true;
            }
            return false;
        }

        const processArray = async (params: {
            field: I_Field, indexField: number
        }) => {
            const {field, indexField} = params;
            const pathArray = [...(parentsName || []), field.field];

            // check saved
            const isSaved = request.isSaveLocal === false ? false : (await LocalFormGet(idForm, userId, pathArray)) != null;
            Log.g('c.1 botVoiceToValue')
            const confirm: string = isSaved ? field.choiceList[0] : await botVoiceToValue({
                id: request.saved?.id,
                field: field.field,
                title: field.title,
                audioFile: field.audioFile,
                choiceList: field.choiceList,
                type: field.type,
                dataType: field.dataType,
                dataArray: dataArray,
                skipNext: field.skipNext,
                validate: field.validate,
                errorRecognized: field.errorRecognized || request.errorRecognized,
                mappingValue: field.mappingValue || request.mappingValue || MAPPING_VALUE,
                isRepeat: true,
                isSuggestInput: false,
                domain: request.domain,
                userId, token
            });
            const array = await (async () => {
                if (confirm.toLowerCase() != field.choiceList[0].toLowerCase())
                    return dataArray[indexField].value || [];

                const tempFieldArray: I_Request = convertResponseToObj({
                    ...field.tempFieldArray,
                    fields: field.tempFieldArray.fields || field.tempFieldArray.field
                }, request.domain);
                const funcReadIndex = (resolve, reject) => {
                    Log.d('C.2 ObjRequest')
                    new ObjRequest({
                        id: idForm,
                        parentsName: pathArray,
                        userId, token,
                        request: {
                            domain: request.domain,
                            isSaveLocal: request.isSaveLocal,
                            ...tempFieldArray,
                        },
                        onObjViewer: ({indexField, fields}) => {
                            refObjViewer.current?.setDataPart({
                                ...indexField != undefined && {indexField},
                                ...fields != undefined && {fields}
                            });
                        },
                        onSuccess: async (dataSuccess: { confirm: string, data: Object }) => {
                            const confirmList = tempFieldArray?.confirm?.choiceList || [];
                            const {confirm, data} = dataSuccess;
                            if (confirm.toLowerCase() == (confirmList[2] || '').toLowerCase()) {//remove
                                resolve(dataArray[indexField].value || [])
                            } else {
                                const _return = dataArray[indexField].value = [...(dataArray[indexField].value || []), data];
                                // save local

                                if (confirm.toLowerCase() == (confirmList[0] || '').toLowerCase()) { //continue
                                    request.isSaveLocal === true && await LocalFormSave({
                                        id: idForm,
                                        userId,
                                        field: field.field,
                                        value: _return,
                                        paths: parentsName || []
                                    });
                                    funcReadIndex((arr) => resolve(arr));
                                } else if (confirm.toLowerCase() == (confirmList[1] || '').toLowerCase()) //back
                                    resolve(_return);
                            }
                        }
                    }).start()
                }
                return await asyncFunc(funcReadIndex);
            })();
            dataArray[indexField].value = array;
            request.isSaveLocal === true && await LocalFormSave({
                id: idForm,
                userId,
                field: field.field,
                value: array,
                paths: parentsName || []
            });
            request.isSaveLocal === true && await LocalFormRemove(idForm, userId, pathArray);
        }
//gan co bao loi
        const init = async () => {
            Log.g('d.1 init')
            Log.g('d.1.1 request.confirmContinue', request.confirmContinue)
            Log.g('d.1.2 request', request)
            isInit = true;
            const savedLocal = request.isSaveLocal === false ? null : await LocalFormGet(idForm, userId, parentsName);
            Log.g('d.2 savedLocal', savedLocal)

            // Log.g('d.4 request',request)
            if (/* request.isForwardData === true ||  */(request.saved != null && request.saved.id > 0 && ![null, undefined, ''].includes(request.curFild))) {
                const indexCurrenField = dataArray.findIndex(e => e.field.toLowerCase() == request.curFild?.toLowerCase());
                savedLocal = savedLocal == null ? {
                    field: indexCurrenField >= 0 ? request.fields[indexCurrenField].field : '',
                    fields: []
                } : savedLocal;
                Object.keys(request.saved).map(k => {
                    const valueSaverSaved = request.saved[k] || '';
                    const index = dataArray.findIndex(e => e.field.toLowerCase() == k.toLowerCase());
                    const indexLocal = savedLocal.fields.findIndex(e => e.field.toLowerCase() == k.toLowerCase());
                    if (indexLocal < 0)
                        savedLocal?.fields.push({field: dataArray[index].field, value: valueSaverSaved});
                    else
                        savedLocal.fields[indexLocal].value = valueSaverSaved;
                });
            }
            if (savedLocal != null) {
                console.log('saved', savedLocal);
                if (![null, undefined, ''].includes(savedLocal.field)) {
                    request.curFild = savedLocal.field;
                    savedLocal.fields.map(({field, value}) => {
                        request.saved = request.saved || {};
                        request.saved[field] = value;
                    })
                }

                const isParentForm = parentsName.length <= 0;
                if (isParentForm) {
                    const confirmContinue = request.confirmContinue;
                    Log.g('c2.1.3 error request.confirmContinue,request:', request)
                    const _errorRecognized = confirmContinue?.errorRecognized || request.errorRecognized;
                    Log.g('c.2 botVoiceToValue')

                    Log.g('c.2.1 confirmContinue,isParentForm', confirmContinue, isParentForm)
                    Log.g('c.2.2 _errorRecognized', _errorRecognized)
                    const confirm = request.isAutoContinue == true ? confirmContinue?.choiceList[1] : await botVoiceToValue({
                        audioFile: confirmContinue?.audioFile,
                        title: confirmContinue?.title,
                        choiceList: confirmContinue?.choiceList || [],
                        skipNext: '',
                        validate: confirmContinue?.validate?.length > 0 ? confirmContinue?.validate : [{
                            rule: 'required',
                            title: _errorRecognized.title,
                            audioFile: _errorRecognized.audioFile,
                        }],
                        mappingValue: confirmContinue?.mappingValue || request.mappingValue || MAPPING_VALUE,
                        isRepeat: true,
                        isSuggestInput: false,
                        domain: request.domain,
                        userId, token
                    });
                    if (request.submit.urlContinue != null) {
                        onConfirmContinue({confirm: confirm, request: {...savedLocal}});
                        return false;
                    }
                    if (String(confirm).toLowerCase() == String(confirmContinue?.choiceList[0]).toLowerCase()) {// new 
                        request.isSaveLocal === true && await LocalFormRemove(idForm, userId, parentsName);
                        C_INDEX = -1;
                        return true;
                    }
                }

                savedLocal.fields.map(_f => {
                    const value = _f.value;
                    const _index = dataArray.findIndex(e => e.field.toLowerCase() == _f.field.toLowerCase());
                    if (_index >= 0)
                        dataArray[_index].value = value == null ? null : value;
                });
                C_INDEX = request.fields?.findIndex(e => e.field.toLowerCase() == savedLocal.field.toLowerCase());
                return true;
            }

            C_INDEX = -1;
            return true;
        }
//gan co bao loi
        const _start = async (index = -1) => {
            C_INDEX = index;
            refTimerSleep.current != null && clearTimeout(refTimerSleep.current)
            playerStop(true);
            voiceStop(true);
            if (!isEndField && index == -1) {

                const intro = request.intro;
                Log.w('b.3 botSpeakAudio audioFile: intro.audioFile ', intro.audioFile)
                onObjViewer({indexField: index});
                intro != null && await botSpeakAudio({
                    title: intro.title,
                    audioFile: intro.audioFile,
                    delay: 500,
                    domain: request.domain
                })
                index = 0;
            }
            C_INDEX = index;
            onObjViewer({indexField: index, fields: dataArray});
            const c_fields = (request.fields || []);
            const c_field = c_fields[index];

            const isHanderSubmit = request.submit?.submitHandler?.find(({rule, fields, value, valueMap}) => {
                if (rule.toLowerCase() == 'counter'.toLowerCase()) {
                    return fields.filter(f => {
                        const _v = dataArray.find(e => e.field.toLowerCase() == f.toLowerCase())?.value || '';
                        return valueMap.findIndex(t => t.toLowerCase() == String(_v).toLowerCase()) >= 0;
                    }).length == Number(value)
                }
                return false;
            }) != null;

            let voiceSubmit = null;
            if (!isEndField && c_field != null && c_fields.length > 0 && !isHanderSubmit && index < c_fields.length) {
                request.isSaveLocal === true && await LocalFormSave({
                    id: idForm,
                    field: c_field.field,
                    value: '',
                    userId,
                    paths: parentsName
                });

                if (isBreakField({join: c_field.join, skipJoin: c_field.skipJoin, withField: c_field.withField})) {// break field = true
                    _start(index + 1);
                    return;
                }

                const indexField = dataArray.findIndex(e => e.field == c_field.field);

                if ([FIELD_TYPE.ARRAY].includes(c_field.type)) {
                    // process array
                    await processArray({field: c_field, indexField});
                } else {
                    Log.g('c.3 botVoiceToValue')

                    const value: string = await botVoiceToValue({
                        id: request.saved?.id,
                        field: c_field.field,
                        title: c_field.title,
                        audioFile: c_field.audioFile,
                        choiceList: [FIELD_TYPE.CHOICE, FIELD_TYPE.UNSAVE].includes(c_field.type) ? (c_field.choiceList || []) : [],
                        type: c_field.type,
                        dataType: c_field.dataType,
                        dataArray: dataArray,
                        skipNext: c_field.skipNext,
                        validate: c_field.validate,
                        errorRecognized: c_field.errorRecognized || request.errorRecognized,
                        mappingValue: c_field.mappingValue || request.mappingValue || MAPPING_VALUE,
                        isRepeat: true,
                        domain: request.domain,
                        userId, token
                    });

                    const isVoiceSubmit = request.voiceSubmit != null && value.toLowerCase() == request.voiceSubmit?.toLowerCase();
                    if (isVoiceSubmit) {
                        // voice submit
                        voiceSubmit = request.voiceSubmit;
                    } else {
                        dataArray[indexField].value = value;
                        request.isSaveLocal === true && await LocalFormSave({
                            id: idForm,
                            field: dataArray[indexField].field,
                            value,
                            userId,
                            paths: parentsName
                        });
                    }
                }

                onObjViewer({indexField: index, fields: dataArray});

                if (voiceSubmit == null) {
                    if (c_field.isSavePartial == true && false) {
                        // save partial
                        const saved = request.saved || {id: 0};
                        const keys = Object.keys(saved);

                        const dataPartial = Object.fromEntries(dataArray.filter(e => e.group != FIELD_TYPE.UNSAVE/*  && e.group == c_field.group */).map(e => [e.field, e.value]));
                        Object.keys(dataPartial).map(k => {
                            const find = keys.find(e1 => e1.toLowerCase() == k.toLowerCase());
                            if (find)
                                saved[find] = dataPartial[k]
                        });

                        const res: I_Request = await onSavePartial({
                            data: {...saved, userId, token},
                            groupId: c_field.group,
                            curFild: c_field.field,
                            userId,
                            token
                        });
                    }

                    if (index + 1 < c_fields.length) {
                        _start(index + 1);
                        return;
                    }
                }
            }
            refButtonControl.current?.setDataPart({state: STATE.NONE, statePlay: STATE_PLAY.STOP,});
            refVoiceResults.current?.setData();
            C_INDEX = -1;
            isEndField = true;

            const dataFields = Object.fromEntries(dataArray.filter(e => e.type != FIELD_TYPE.UNSAVE).map(e => [e.field, e.value]));
            const dataSaved = request.isForwardData !== true ? {} : Object.fromEntries(Object.entries(request.saved || {}).map(([k, value]) => {
                const f = dataArray.find(e => e.field.toLowerCase() == k.toLowerCase());
                return [f != null ? f.field : k, f != null ? f?.value : value];
            }))

            onObjViewer({indexField: C_INDEX});

            const data = await (async () => {
                const dataSubmit = {
                    confirm: null,
                    data: {
                        ...dataFields,
                        ...dataSaved,
                        id: request.saved?.id,
                        userId, token
                    },
                    userId, token
                };
                if (request.type == REQUEST_TYPE.FORM) {
                    const confirm = request.confirm;
                    const _errorRecognized = confirm?.errorRecognized || request.errorRecognized;
                    Log.g('c.4 botVoiceToValue')

                    const valueConfirm = voiceSubmit != null ? voiceSubmit : confirm == null ? '' : await botVoiceToValue({
                        title: confirm?.title,
                        audioFile: confirm?.audioFile,
                        choiceList: confirm?.choiceList || [],
                        errorRecognized: _errorRecognized,
                        dataType: FIELD_DATA_TYPE.TEXT,
                        skipNext: '',
                        validate: confirm.validate?.length > 0 ? confirm.validate : [{
                            rule: 'required',
                            title: _errorRecognized.title,
                            audioFile: _errorRecognized.audioFile,
                        }],
                        mappingValue: confirm.mappingValue || request.mappingValue || MAPPING_VALUE,
                        isRepeat: true,
                        isSuggestInput: false,
                        domain: request.domain,
                        userId, token
                    });

                    dataSubmit.confirm = valueConfirm;

                    return dataSubmit;
                } else {
                    return dataSubmit.data
                }
            })();

            request.isSaveLocal === true && await LocalFormRemove(idForm, userId, parentsName);
            onSuccess(data);
        }
        // start();
        this.resume = function () {
            _start(C_INDEX);
        }

        this.start = async function () {
            let isOk = true;
            if (!isInit && C_INDEX != -2)
                isOk = await init();
            isOk && _start(C_INDEX);
        }

        this.stop = function (isForce = false) {
            if (isForce)
                return
            else
                onSuccess();
        }

        this.changeStep = async function (step: number) {
            this.stop(true);
            await _sleep(100, t => refTimerSleep.current = t);
            _start(step)
        }
    }

    const _botListen = ({onResults, onErrors, choiceList = []} = {}) => {
        return new Promise((resolve, reject) => {
            refVoiceResults.current?.setData({results: []});
            refButtonControl.current?.setDataPart({
                state: STATE.LISTEN, isLoadingVoice: true, statePlay: STATE_PLAY.PLAYING,
                choiceListVoice: choiceList,
                onChangeVoiceInput: async (voiceInputType) => {
                    refButtonControl.current?.setDataPart({isLoadingVoice: false})
                    if (voiceInputType == 'input') {
                        voiceStop(true);
                        await _sleep(200, t => refTimerSleep.current = t);
                    }
                    resolve(await _botListen({onResults, onErrors, choiceList}))
                }
            })

            const voiceInputType = refButtonControl.current?.getData()?.voiceInputType || (isDebugActive ? 'input' : 'voice')
            if (voiceInputType == 'input') {
                refButtonControl.current?.setDataPart({isLoadingVoice: false})
                refVoiceTextInput.current?.prompt({
                    placeholder: 'Nhập theo yêu cầu..',
                    onSubmit: text => {
                        resolve({value: [text || '']})
                    }
                });

                setTimeout(() => {
                    refVoiceTextInput.current?.focus();
                }, 300);
                return;
            }
            voiceStart({
                onSpeechStart: () => {
                    refButtonControl.current?.setDataPart({isLoadingVoice: false})
                },
                onResults: (results: SpeechResultsEvent) => {
                    logfix('2.9 voiceStart->onResults')
                    refButtonControl.current?.setDataPart({state: STATE.NONE})
                    refVoiceResults.current?.setData({results: results?.value || []})
                    refPitchVoice.current?.push();
                    onResults != null && onResults(results);
                    resolve(results);
                },
                onError: (errors: SpeechErrorEvent) => {
                    refButtonControl.current?.setDataPart({state: STATE.NONE})
                    refVoiceResults.current?.setData({errors: errors.error})
                    refPitchVoice.current?.push()
                    onErrors != null && onErrors(errors);
                    resolve(null);
                },
                // reject: () => reject()
            })
        })
    }

    const botListen = async ({
                                 mapping = (value) => {
                                     return value
                                 }, choiceList = []
                             } = {}) => {
        logfix('3.0 botListen->result')
        return new Promise(async (resolve, reject) => {
            let results: SpeechResultsEvent;
            try {
                results = await _botListen({choiceList});
            } catch (error) {
                console.warn('reject voice');
                return;
            }
            if (results != null && results.value != null) {
                logfix("3.1 results->isEmpty", results)
                const [value, ...rest] = results.value;
                results.value = [mapping(value), ...rest]
                refMessageViewer.current?.setData({
                    messages: [{
                        _id: new Date().getTime(),
                        text: results.value[0],
                        createdAt: new Date(),
                        user: {
                            _id: 0,
                        },
                    }, ...refMessageViewer.current?.getData()?.messages || []]
                })
            }

            resolve(results)
        })
    }

    const _botSpeakAudio = ({
                                text = 'Nội dung audio',
                                url = 'https://dkamphuoc.xyz/Workspace/TriNam/nkt/audio/hello.mp3',
                                callback,
                                domain = 'http://nkt.btxh.gov.vn'
                            } = {}) => {
        return new Promise((resolve, reject) => {
            if (url == null)
                (callback || resolve)();
            if (!url.startsWith('http')) {
                url = domain + url;
            }
            refButtonControl.current?.setDataPart({
                state: STATE.SPEAK,
                isLoadingSpeak: true,
                statePlay: STATE_PLAY.PLAYING
            })
            playerPlay({
                url: url,
                text: text,
                onPlaying: () => {
                    refButtonControl.current?.setDataPart({isLoadingSpeak: false})
                },
                callback: async () => {
                    refButtonControl.current?.setDataPart({state: STATE.NONE});
                    (callback || resolve)();
                },
                reject: () => reject()
            })
        })
    }

    const botSpeakAudio = async (params: {
        title: string,
        audioFile: string,
        delay: number,
        next?: void,
        domain?: string
    }) => {
        logfix('3.2 botSpeakAudio')
        const {title, audioFile, delay, next, domain} = params;
        refMessageViewer.current?.setData({
            messages: [
                {
                    _id: new Date().getTime(),
                    text: `${[null, '', undefined].includes(audioFile) ? 'Thiếu title' : title}${[null, '', undefined].includes(audioFile) ? '\nThiếu file audio.' : ''}`,
                    createdAt: new Date(),
                    user: {
                        _id: 1,
                        name: 'Bot',
                    },
                }
                , ...refMessageViewer.current?.getData()?.messages || []]
        })
        return new Promise(async (resolve, reject) => {
            try {
                !SKIP_AUDIO && await _botSpeakAudio({text: title, url: audioFile, domain})
            } catch (error) {
                console.warn('reject audio');
                return;
            }
            delay > 0 && await _sleep(!SKIP_AUDIO ? 10 : delay, t => refTimerSleep.current = t);
            (next || resolve)();
        })
    }

    const botVoiceToValue = (params: {
        id?: number, field?: string
        title: string, audioFile: string,
        errorRecognized?: { title: string, audioFile: string },
        skipNext: string, choiceList: Array<string>,
        type?: FIELD_TYPE,
        dataType?: FIELD_DATA_TYPE,
        dataArray?: Array<{ field: string, value: string | number }>,
        validate: Array<{ rule: 'required' | 'choice_in' | 'remote', title: string, audioFile: string, remoteUrl?: string, remoteMethod?: 'POST' | 'GET', remoteFields?: Array<string> }>,
        mappingValue?: Array<{ dataType: FIELD_DATA_TYPE | -1, value: string, options: String[] }>,
        isRepeat?: boolean, onSuccess?: (value: string) => void,
        domain?: string,
        isSpeakTitle?: boolean,
        isSuggestInput?: boolean,
        userId?: number, token?: string,
    }) => {
        logfix("3.3 botVoiceToValue")
        voiceStop(true);
        playerStop(true);
        const {
            userId, token, id, field, domain,
            title, audioFile, validate, errorRecognized,
            skipNext, choiceList, type, dataType, dataArray,
            mappingValue, isRepeat = true, onSuccess = null, isSpeakTitle = true, isSuggestInput = true
        } = params;
        return new Promise<string | number>(async (resolve, reject) => {
            Log.w('b.2 botSpeakAudio audioFile,title ', audioFile, title)
            Log.w('b.2 note audioFile,title', isSpeakTitle)

            isSpeakTitle && await botSpeakAudio({
                title: title,
                audioFile: audioFile,
                delay: 1000,
                domain,
            });
            logfix("3.4 call->botListen")
            const results: SpeechResultsEvent = await botListen({
                choiceList: [
                    ...choiceList,
                    ...(skipNext ? [skipNext] : []),
                    ...(!isSuggestInput || choiceList.length != 0 ? [] : SUGGEST_INPUT.find(e => e.dataType == dataType)?.options || []),
                ].filter((e, index, self) => self.findIndex(e1 => e1.toLowerCase() == e.toLowerCase()) == index),
                mapping: value => {
                    logfix('3.5 truyen vao mapping, value', value)
                    logfix('3.6 truyen vao mapping, mappingValue', mappingValue)
                    value = mappingValue.find(e =>
                        (
                            [null, undefined, '', -1].includes(e.dataType) ||
                            [null, undefined, '', -1].includes(dataType) ||
                            e.dataType == dataType
                        ) &&
                        e.options.findIndex(e1 => e1.toLowerCase() == value.toLowerCase()) >= 0
                    )?.value || value;

                    return value;
                }
            });

            if (results == null) {
                if (errorRecognized != null) {
                    Log.w('b.1 botSpeakAudio, call func botSpeakAudio, errorRecognized.audioFile:', errorRecognized.audioFile)
                    await botSpeakAudio({
                        title: errorRecognized.title,
                        audioFile: errorRecognized.audioFile,
                        delay: 300,
                        domain,
                    })
                }
                Log.g('c.5 botVoiceToValue')
                isRepeat && botVoiceToValue({
                    ...params,
                    isSpeakTitle: false,
                    onSuccess: value => (onSuccess || resolve)(value)
                });
                return;
            }

            let value: string = ((results.value != null ? results.value[0] : null) || '').trim();

            const isSkipNext = value.toLowerCase().trim() == skipNext.toLowerCase().trim();
            value = isSkipNext ? '' : value
            const valid = (await Promise.all(validate.map(async (v) => {
                if (v.rule == 'required' && (
                    ['', null, undefined].includes(value) ||
                    (choiceList?.length > 0 && choiceList?.find(e => e.toLowerCase().trim() == value.toLowerCase()) == null)
                ))
                    return v;
                else if (v.rule == 'choice_in' && !['', null, undefined].includes(value) &&
                    (choiceList?.length > 0 && choiceList?.find(e => e.toLowerCase().trim() == value.toLowerCase()) == null)
                ) {
                    return v;
                } else if (v.rule == 'remote') {
                    const {remoteUrl, remoteMethod = 'POST', remoteFields = []} = v;
                    const id = dataArray?.find(e => e.field == 'id');
                    const params = dataArray?.filter(e => remoteFields.indexOf(e.field) >= 0);
                    const _v = await callAPI({
                        url: remoteUrl,
                        method: remoteMethod,
                        userId,
                        data: {
                            params: {...Object.fromEntries(params?.map(e => [e.field, e.value]))},
                            field, value, id, userId, token
                        }
                    });
                    return _v;
                }
                return null
            }))).filter(e => e != null)[0];

            if (valid != null) {
                Log.w('b.4 botSpeakAudio, call func botSpeakAudio, valid.audioFile:', valid.audioFile)
                await botSpeakAudio({
                    title: valid.title,
                    audioFile: valid.audioFile,
                    delay: Platform.select({ios: 1000, android: 300}),
                    domain,
                })
                Log.g('c.6 botVoiceToValue')
                isRepeat && botVoiceToValue({
                    ...params,
                    isSpeakTitle: false,
                    onSuccess: value => (onSuccess || resolve)(value)
                })
                return;
            }

            (onSuccess || resolve)(value)
        })
    }

    return (
        <>
            <ViewCus.ComponentDynamic
                ref={refMessageViewer}
                styleContainer={{flex: 1}}
                render={({messages = []} = {}) => (
                    <GiftedChat
                        messages={messages}
                        user={{
                            _id: 0,
                        }}
                        alignTop={messages.length == 0}
                        renderChatEmpty={() => <View style={{transform: [{scaleY: -1}],}}><ViewCus.EmptyComponent
                            text1='Nhấn bắt đầu để chạy'/></View>}
                        isKeyboardInternallyHandled={false}
                        listViewProps={{
                            style: {flex: 1, height: null,},
                            contentContainerStyle: {flexGrow: null, justifyContent: null,}
                        }}
                        messagesContainerStyle={{flex: 1,}}
                        renderInputToolbar={() => null}
                    />
                )}
            />
            <ViewCus.ComponentDynamic
                ref={refObjViewer}
                styleContainer={{
                    padding: 5,
                    backgroundColor: '#f6f6f6'
                }}
                render={({
                             indexField = -1, fields = [], onChangeStep = () => {
                    }
                         } = {}) => {
                    return (<ObjViewerComponent indexField={indexField} fields={fields} onChangeStep={onChangeStep}/>)
                }}
            />
            <ViewCus.ComponentDynamic
                ref={refButtonControl}
                render={({
                             state = STATE.NONE,
                             statePlay = STATE_PLAY.STOP,
                             isLoadingVoice = false,
                             isLoadingSpeak = false,
                             voiceInputType = isDebugActive ? 'input' : 'voice',
                             onChangeVoiceInput = null,
                             choiceListVoice = []
                         } = {}) => {
                    const isLoading = isLoadingSpeak || isLoadingVoice;
                    return (<>
                            <View style={{paddingHorizontal: 10, paddingVertical: 0, backgroundColor: '#f9f9f9'}}>
                                <ViewCus.ActivityIndicator value={isLoading}/>
                                <ViewCus.ComponentDynamic
                                    ref={refVoiceResults}
                                    render={({
                                                 results = [],
                                                 errors = null,
                                                 errors: {code: errorCode, message: errorMessage} = {}
                                             } = {}) => (errors != null ?
                                            <ViewCus.Text style={{
                                                color: 'red',
                                                textAlign: 'center',
                                                paddingVertical: 10,
                                                paddingHorizontal: 5
                                            }}>
                                                {[5, 7, '5', '7'].includes(errorCode) ? 'Không nhận được phản hồi.' : errorMessage}
                                            </ViewCus.Text>
                                            : results.length > 0 &&
                                            <ViewCus.ViewHorizontal style={{flexWrap: 'wrap', paddingVertical: 5}}>
                                                {results.map((e, index) => (<View
                                                    key={index}
                                                    style={{
                                                        backgroundColor: appColors.metroCyan,
                                                        marginLeft: index == 0 ? 0 : 5,
                                                        paddingVertical: 3,
                                                        paddingHorizontal: 10,
                                                        borderRadius: 10,
                                                        marginTop: 5
                                                    }}
                                                >
                                                    <ViewCus.Text style={{color: appColors.white,}}>{e}</ViewCus.Text>
                                                </View>))}
                                            </ViewCus.ViewHorizontal>
                                    )}
                                />
                                {STATE.LISTEN == state ? (
                                        voiceInputType == 'input' ?
                                            __DEV__ &&
                                            <View>
                                                <VoiceTextInputComponent ref={refVoiceTextInput}/>
                                                {isDebugActive && choiceListVoice?.length > 0 &&
                                                <ViewCus.ViewHorizontal style={{flexWrap: 'wrap'}}>
                                                    {choiceListVoice.map((e, index) => (
                                                        <ViewCus.Button
                                                            key={index}
                                                            style={{
                                                                marginLeft: index == 0 ? 0 : 5,
                                                                paddingVertical: 5,
                                                                paddingHorizontal: 5,
                                                                backgroundColor: appColors.lightGrey
                                                            }}
                                                            onPress={() => refVoiceTextInput.current?.handSubmit(String(e))}>
                                                            {String(e)}
                                                        </ViewCus.Button>
                                                    ))}
                                                </ViewCus.ViewHorizontal>
                                                }
                                            </View> :
                                            <VoicePitchComponent ref={refPitchVoice}/>
                                    )
                                    : STATE.SPEAK == state ? <SpeakTrackComponent ref={refSpeakTrack}/>
                                        : null
                                }
                                {
                                    __DEV__ &&
                                    <ViewCus.ViewHorizontal style={{marginTop: 5,}}>
                                        <ViewCus.Button
                                            style={{flex: 1}}
                                            onPress={async () => {
                                                if ((isLoading || STATE.LISTEN != state)) return;
                                                voiceInputType = voiceInputType == 'input' ? 'voice' : 'input';
                                                refButtonControl.current?.setDataPart({
                                                    voiceInputType: voiceInputType,
                                                    onChangeVoiceInput: null
                                                });
                                                await _sleep(200, t => refTimerSleep.current = t);
                                                onChangeVoiceInput != null && onChangeVoiceInput(voiceInputType);
                                            }}
                                        >
                                            <ViewCus.Ionicons
                                                icon={IoniconsFont.textOutline}
                                                color={
                                                    STATE.NONE == state ? appColors.materialGrey
                                                        : STATE.LISTEN == state ? voiceInputType == 'input' ? appColors.metroCyan : appColors.materialGrey
                                                            : appColors.lighterGrey
                                                }/>
                                        </ViewCus.Button>
                                        <ViewCus.Button
                                            style={{flex: 1}}
                                            onPress={() => (!isLoading && STATE.NONE == state) && _botListen()}
                                        >
                                            <ViewCus.FontAwesome
                                                icon={FontAwesomeFont.microphone}
                                                color={
                                                    STATE.NONE == state ? appColors.materialGrey
                                                        : STATE.LISTEN == state ? voiceInputType == 'voice' ? appColors.metroCyan : appColors.lighterGrey
                                                            : appColors.lighterGrey
                                                }/>
                                        </ViewCus.Button>
                                        <ViewCus.Button
                                            style={{
                                                flex: 1,
                                                borderColor: 'white',
                                                borderLeftWidth: 2,
                                                borderRightWidth: 2,
                                            }}
                                            onPress={() => (!isLoading && STATE.NONE == state) && _botSpeakAudio()}
                                        >
                                            <ViewCus.FontAwesome
                                                icon={FontAwesomeFont.volumeUp}
                                                color={
                                                    STATE.NONE == state ? appColors.materialGrey
                                                        : STATE.SPEAK == state ? appColors.metroCyan
                                                            : appColors.lighterGrey
                                                }
                                            />
                                        </ViewCus.Button>
                                        <ViewCus.Button
                                            style={{flex: 1}}
                                            onPress={() => isLoading ? () => {
                                            } : STATE.LISTEN == state ? voiceStop() : STATE.SPEAK == state ? playerStop() : () => {
                                            }}
                                        >
                                            <ViewCus.MaterialCommunityIcons
                                                icon={MaterialCommunityIconsFont.skipForwardOutline}
                                                color={STATE.NONE == state ? appColors.lighterGrey : appColors.materialGrey}
                                            />
                                        </ViewCus.Button>
                                    </ViewCus.ViewHorizontal>
                                }

                            </View>
                            <ViewCus.ViewHorizontal style={{marginTop: 0}}>
                                <ViewCus.Button
                                    style={{flex: 1}}
                                    onPress={async () => !isLoading && onStateChange(
                                        STATE_PLAY.STOP == statePlay ? STATE_PLAY.PLAYING
                                            : STATE_PLAY.PAUSE == statePlay ? STATE_PLAY.RESUME
                                                : STATE_PLAY.PAUSE
                                    )
                                    }
                                >
                                    {
                                        __DEV__ && <ViewCus.ViewIcon
                                            iconLeft={
                                                <ViewCus.MaterialCommunityIcons
                                                    icon={
                                                        [STATE_PLAY.STOP, STATE_PLAY.PAUSE].includes(statePlay) ? MaterialCommunityIconsFont.play
                                                            : statePlay == STATE_PLAY.PLAYING ? MaterialCommunityIconsFont.pause
                                                                : null}
                                                    color={[STATE_PLAY.STOP, STATE_PLAY.PAUSE].includes(statePlay) ? appColors.metronicSuccess : appColors.metronicWarning}
                                                    size={28}
                                                />
                                            }
                                        >
                                            {statePlay == STATE_PLAY.PLAYING ? 'Tạm dừng' :
                                                statePlay == STATE_PLAY.PAUSE ? 'Tiếp tục' :
                                                    'Bắt đầu'}
                                        </ViewCus.ViewIcon>
                                    }

                                </ViewCus.Button>
                                {
                                    __DEV__ && <ViewCus.Button
                                        style={{flex: 1}}
                                        onPress={() => (!isLoading && statePlay != STATE_PLAY.STOP) && onStateChange(STATE_PLAY.STOP)}
                                    >
                                        <ViewCus.ViewIcon
                                            iconLeft={
                                                <ViewCus.MaterialCommunityIcons
                                                    icon={MaterialCommunityIconsFont.stop}
                                                    color={[STATE_PLAY.PLAYING, STATE_PLAY.PAUSE].includes(statePlay) ? appColors.metroRed : appColors.lighterGrey}
                                                    size={28}
                                                />
                                            }
                                        >
                                            {'Dừng'}
                                        </ViewCus.ViewIcon>
                                    </ViewCus.Button>
                                }

                            </ViewCus.ViewHorizontal>
                        </>
                    )
                }}
            />
        </>
    )
})

export default BotAssistant
