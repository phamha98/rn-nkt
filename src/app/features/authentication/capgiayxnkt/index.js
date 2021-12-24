import React, { useState, useEffect, useRef } from 'react'
import {
    Avatar, Bubble, GiftedChat, Message as GiftedChatMessage, SystemMessage,
} from 'react-native-gifted-chat'
import { withNavigation } from 'react-navigation'
import { useDispatch, useSelector } from 'react-redux'
import { Header, Screen } from '../../../library/components'
import { onGePostDataXNKT, onGetDataXNKT, onResetDataXNKT } from './redux/action'
import { styles } from './style';
import Voice from '@react-native-voice/voice';
import Utils from '../../../library/utils/Utils';
import SoundPlayer from 'react-native-sound-player';
import { store as storeRedux } from '../../../store/store';
import RestAPI from '../../../RestAPI';
import DropDownHolder from '../../../library/utils/dropDownHolder';
import { _sleep } from '../../../common';
import { Image, Platform, Text, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Sound from 'react-native-sound';
import moment from 'moment'
import { HOME } from '../../../navigation/screenTypes'
import { resetUserDetails } from '../home/redux/action'
import { saveString, load, remove, loadString } from '../../../library/utils/storage'

var domain = '';
var listMessages = [];
let field = null;
let fields = null;
let submit = null;
let confirm = null;
var update = '';
var nSeconds = 0;
const SAVE_LIST = "SAVE_LIST";
const SAVE_SUCCESS = "SAVE_SUCCESS";
export const CapGiayXNKT = (props) => {

    const { navigation } = props;
    const dispatch = useDispatch();
    const { data } = useSelector((state) => state.CapGiayXNKTReducer);
    const dataDetailUser = useSelector(state => state.AppReducer.profile.user);
    const [isFirst, setIsFirst] = useState(true);
    const [pitch, setPitch] = useState('');
    const [end, setEnd] = useState('');
    const [started, setStarted] = useState('');
    const [results, setResults] = useState([]);
    const [partialResults, setPartialResults] = useState([]);

    const [listeners, setListeners] = useState([]);
    const [isRecord, setIsRecord] = useState(false);
    const [index, setIndex] = useState(0);
    const [listMessGift, setListMessages] = useState([]);
    const [isActive, setIsActive] = useState(false);
    const [num, setNum] = useState(30);

    let intervalRef = useRef();
    const decreaseNum = () => setNum((prev) => prev - 1);

    const getFieldLstSave = (listSave) => {
        let reverseLst = listSave.slice().reverse()
        const index = reverseLst.findIndex((f) => { return f.field_save })
        const i = fields?.findIndex((f) => { return f.field == reverseLst[index]?.field_save })
        if (i > -1) {
            console.log("1", fields[i]);
            field = fields[i]
        }
    }

    const getListSave = async () => {
        const lstSave = await load(SAVE_LIST);
        const success = await load(SAVE_SUCCESS);
        if (lstSave && lstSave?.length > 0) {
            if (success && success?.length > 0) {
                fields = success
                update = 'UPDATE_AGAIN'
            }
            getFieldLstSave(lstSave)
            listMessages = lstSave
            console.log("lstSave", lstSave);
            console.log("field", field);
            setListMessages(lstSave)
            setTimeout(() => {
                if (field && field?.audioFile) {
                    playAudio(convertAudio(field?.audioFile))
                } else {
                    startRecognizing()
                }
            }, 1000)
        } else {
            let mess = {
                _id: 0,
                text: data?.data?.intro?.title,
                createdAt: new Date(),
                user: {
                    _id: 2,
                }
            }
            listMessages = [mess]
            setTimeout(() => {
                setListMessages([mess])
            }, 1000)
        }
    }

    useEffect(() => {
        // remove(SAVE_LIST)
        if (data && data?.data && listMessGift?.length === 0) {
            console.log("data: ", data)
            submit = data?.data?.submit;
            confirm = data?.data?.confirm;
            domain = data?.domain
            fields = data?.data.fields

            getListSave()
        }
    }, [data, listMessGift.length]);

    useEffect(() => {
        if (listMessGift?.length === 1 && domain) {
            playAudioIntro()
        }
    }, [listMessGift, domain])

    useEffect(() => {
        if (Object.getOwnPropertyNames(data).length === 0) {
            getData()
        }
    }, [data]);

    useEffect(() => {
        Voice.onSpeechStart = onSpeechStart;
        Voice.onSpeechEnd = onSpeechEnd;
        Voice.onSpeechResults = onSpeechResults;
        Voice.onSpeechPartialResults = onSpeechPartialResults;
        Voice.onSpeechVolumeChanged = onSpeechVolumeChanged;

        return () => {
            //destroy the process after switching the screen
            Voice.destroy().then(Voice.removeAllListeners);
            // clearInterval(intervalRef?.current);
        };
    }, [])

    useEffect(() => {
        Voice.onSpeechError = onSpeechError;
    }, [started]);

    useEffect(() => {
        renderUiMessage()
    }, [results, started, end]);

    useEffect(() => {
        if (Platform.OS == 'android') {
            let interval = null;
            if (isActive) {
                interval = setInterval(() => {
                    nSeconds++
                }, 1000);
            } else if (!isActive) {
                nSeconds = 0
                clearInterval(interval);
            }
            return () => clearInterval(interval);
        }
    }, [isActive]);

    const playAudioIntro = async () => {
        let introAudio = data?.data?.intro?.audioFile?.replace(/[\\]/g, "/")
        let statusId = data?.data?.statusId

        const audio = `${domain}${introAudio}`
        const sound = new Sound(audio, undefined, (error) => {
            if (error) {
                console.log("audio", audio)
                console.log('lỗi không phát được âm thanh', error);
                return;
            }
            // Play the sound with an onEnd callback
            sound.play((success) => {
                let firstMess = fields[0]
                pushMessage(firstMess, 1)

                const audioSub = `${domain}${firstMess?.audioFile?.replace(/[\\]/g, "/")}`
                const soundSub = new Sound(audioSub, undefined, async (error) => {
                    if (error) {
                        console.log("audio", audioSub)
                        console.log('lỗi không phát được âm thanh', error);
                        soundSub.release()
                        if (statusId !== 1) {
                            startRecognizing()
                        } else {
                            setTimeout(() => {
                                navigation?.navigate(HOME)
                                remove(SAVE_LIST)
                                remove(SAVE_SUCCESS)
                            }, 1000)
                        }
                        return;
                    }
                    soundSub.play(async (success) => {
                        soundSub.release()
                        if (statusId !== 1) {
                            startRecognizing()
                        } else {
                            setTimeout(() => {
                                navigation?.navigate(HOME)
                                remove(SAVE_LIST)
                                remove(SAVE_SUCCESS)
                            }, 1000)
                        }
                    });
                });
            });
        });
    };

    const renderUiMessage = async () => {
        if (results?.length > 0) {
            Platform.OS == 'ios' && end == '' && await _sleep(5000)
            destroyRecognizer()
            if (started == '') {
                await renderMessage(results[0]?.toLowerCase())
                setResults([]);
            }
        }
    };

    const paramNumberField = (value) => {
        const result = listMessages?.find(e => e?.field == value)
        const convertNumber = formatNumberParam(result?.text)
        if (convertNumber) {
            return convertNumber
        } else {
            return ""
        }
    };

    const paramField = (value) => {
        const result = listMessages?.find(e => e?.field == value)
        if (result) {
            return result?.text
        } else {
            return ""
        }
    };

    const onSpeechStart = (e) => {
        //Invoked when .start() is called without error
        console.log('onSpeechStart: ', e);
        setStarted('√');
    };

    const onSpeechEnd = async (e) => {
        console.log("end: ")
        setEnd('√');
        setStarted('');
    };

    const onSpeechError = async (event) => {
        console.log("speech err: ", event?.error?.code)
        if (event.error.message == '203/Error' && listMessages && field) {
            playAudioErr()
        } else if (event?.error?.message !== "Speech recognition already started!") {
            if (Platform.OS == "android") {
                if (listMessages && field && nSeconds > 7) {
                    setIsActive(false)
                    playAudioErr()
                    return
                }
                if ([5, 7, '5', '7'].includes(event?.error?.code)) {
                    if (nSeconds < 8) {
                        await _sleep(200)
                        await Voice.start('vi-VN', {
                            EXTRA_SPEECH_INPUT_MINIMUM_LENGTH_MILLIS: 30000,
                            EXTRA_SPEECH_INPUT_COMPLETE_SILENCE_LENGTH_MILLIS: 30000,
                            EXTRA_SPEECH_INPUT_POSSIBLY_COMPLETE_SILENCE_LENGTH_MILLIS: 30000,
                        });
                        return;
                    }
                }
            };
            startRecognizing()
        }
    };

    const playAudioErr = () => {
        let mess = {
            _id: listMessages?.length,
            text: field?.errorRecognized?.title || data?.data?.errorRecognized?.title,
            createdAt: new Date(),
            user: {
                _id: 2,
            }
        }
        let arr = [...listMessages, ...[mess]]
        listMessages = arr
        setListMessages(arr)
        playAudio(convertAudio(field?.errorRecognized?.audioFile || data?.data?.errorRecognized?.audioFile))
    }

    const onSpeechResults = async (e) => {
        //Invoked when SpeechRecognizer is finished recognizing
        console.log('onSpeechResults: ', e);
        var value = e.value
        if (value[0] == "hi") {
            value[0] = "2"
        }
        setIsActive(false)
        setResults(value)
    };

    const onSpeechPartialResults = (e) => {
        //Invoked when any results are computed
        setPartialResults(e.value);
    };

    const onSpeechVolumeChanged = (e) => {
        //Invoked when pitch that is recognized changed
        setPitch(e.value);
    };

    const startRecognizing = async () => {
        //Starts listening for speech for a specific locale
        console.log("onStart")
        try {
            await Voice.start('vi-VN', {
                EXTRA_SPEECH_INPUT_MINIMUM_LENGTH_MILLIS: 30000,
                EXTRA_SPEECH_INPUT_COMPLETE_SILENCE_LENGTH_MILLIS: 30000,
                EXTRA_SPEECH_INPUT_POSSIBLY_COMPLETE_SILENCE_LENGTH_MILLIS: 30000,
            });
            setIsActive(true)
            setPitch('');
            setStarted('');
            setResults([]);
            setPartialResults([]);
            setEnd('');
        } catch (e) {
            //eslint-disable-next-line
            console.error(e);
        }
    };

    const stopRecognizing = async () => {
        //Stops listening for speech
        try {
            setIsActive(false)
            await Voice.stop();
        } catch (e) {
            //eslint-disable-next-line
            console.error(e);
        }
    };

    const cancelRecognizing = async () => {
        //Cancels the speech recognition
        try {
            await Voice.cancel();
        } catch (e) {
            //eslint-disable-next-line
            console.error(e);
        }
    };

    const destroyRecognizer = async () => {
        //Destroys the current SpeechRecognizer instance
        try {
            await Voice.destroy();
            setIsActive(false)
            setPitch('');
            setStarted('');
            setResults([]);
            setPartialResults([]);
            setEnd('');
        } catch (e) {
            //eslint-disable-next-line
            console.error(e);
        }
    };

    const renderMessage = async (value) => {
        const index = listMessages?.findIndex(a => a?.field === field?.field);
        let mess = null
        let arr = listMessages
        let newLst = null
        if (index > 0) {
            listMessages[index] = {
                _id: index,
                text: value,
                createdAt: new Date(),
                field: null,
                user: {
                    _id: 1
                }
            };
        }
        mess = {
            _id: listMessages?.length || 0,
            text: value,
            createdAt: new Date(),
            field: field?.field,
            // audio: field?.audioFile,
            user: {
                _id: 1
            }
        };
        arr = [...listMessages, ...[mess]]

        newLst = [...new Set(arr)]

        listMessages = newLst
        setListMessages(newLst)

        if (value == "bỏ qua" && field?.validate && field?.validate[0]?.rule == "required") {
            let mess_1 = {
                _id: newLst.length,
                text: field?.validate[0]?.title,
                createdAt: new Date(),
                user: {
                    _id: 2,
                }
            }
            const arrItem = [...newLst, ...[mess_1]]
            const newLstItem = [...new Set(arrItem)]

            listMessages = newLstItem
            setListMessages(newLstItem)
            playAudio(convertAudio(field?.validate[0]?.audioFile || data?.data?.errorRecognized?.audioFile))
            return
        }
        if (update == "UPDATE") {
            postData(false)
            return
        }
        if (update == "SAVE") {
            postData(true)
            return
        }
        if (field == "SUCCESS") {
            if (value == "lưu" || value == "lưu lại" || value == "lưu đơn") {
                update = "SAVE"
                postData(true)
                return
            }
            if (value == "gửi" || value == "gửi đơn") {
                update = "UPDATE"
                postData(false)
                return
            }
            let mess = {
                _id: listMessages?.length || 0,
                text: data?.data?.errorRecognized?.title,
                createdAt: new Date(),
                user: {
                    _id: 2,
                }
            }
            const arrItem = [...listMessages, ...[mess]]
            listMessages = arrItem
            setListMessages(arrItem)
            playAudio(convertAudio(data?.data?.errorRecognized?.audioFile))
            return
        }

        var newField = returnField(value)
        if (newField) {
            console.log("1", newField);
            if (!newField?.field) {
                if (update == 'UPDATE_AGAIN') {
                    postData(false)
                    return
                }
                // if (newField?.field.field == "CMTND") {
                let mess = {
                    _id: listMessages?.length || 0,
                    text: confirm?.title,
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                    }
                }
                field = "SUCCESS"
                const arrItem = [...listMessages, ...[mess]]
                listMessages = arrItem
                setListMessages(arrItem)
                playAudio(convertAudio(confirm?.audioFile))
                return
            } else {
                pushMessage(newField?.field, newLst.length)
                playAudio(convertAudio(newField?.field?.audioFile))
            }
        } else {
            if (field && field?.validate && field?.validate?.length > 0) {
                let mess_1 = {
                    _id: newLst.length,
                    text: field?.validate[0]?.title,
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                    }
                }
                const arrItem = [...newLst, ...[mess_1]]
                const newLstItem = [...new Set(arrItem)]

                listMessages = newLstItem
                setListMessages(newLstItem)
                playAudio(convertAudio(field?.validate[0]?.audioFile))
            } else if (field && field.errorRecognized) {
                let mess = {
                    _id: newLst?.length,
                    text: field?.errorRecognized?.title,
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                    }
                }
                const arrItem = [...newLst, ...[mess]]
                const newLstItem = [...new Set(arrItem)]
                listMessages = newLstItem
                setListMessages(newLstItem)
                playAudio(convertAudio(field?.errorRecognized?.audioFile || data?.data?.errorRecognized?.audioFile))
            } else {
                let mess = {
                    _id: newLst?.length,
                    text: data?.data?.errorRecognized?.title,
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                    }
                }
                const arrItem = [...newLst, ...[mess]]
                const newLstItem = [...new Set(arrItem)]
                listMessages = newLstItem
                setListMessages(newLstItem)
                playAudio(convertAudio(data?.data?.errorRecognized?.audioFile))
            }
        }
        const dataStr = JSON.stringify(listMessages)
        saveString(SAVE_LIST, dataStr)
    };

    const formatDate = (date) => {
        if (date == null || date == '')
            return '';
        else if (date?.includes("ngày") && date?.includes("tháng") && date?.includes("năm")) {
            return date
        }
        else {
            if (date?.includes("ngày") || date?.includes("năm")) {
                date = date.replace("ngày", "");
                date = date.replace(new RegExp("năm" + "([^" + "năm" + "]*)$"), "/" + "$1");
                date = date.replaceAll("mười một", "11");
                date = date.replaceAll("mười hai", "12");
                date = date.replaceAll("một", "1");
                date = date.replaceAll("hai", "2");
                date = date.replaceAll("ba", "3");
                date = date.replaceAll("bốn", "4");
                date = date.replaceAll("năm", "5");
                date = date.replaceAll("sáu", "6");
                date = date.replaceAll("bảy", "7");
                date = date.replaceAll("tám", "8");
                date = date.replaceAll("chín", "9");
                date = date.replaceAll("mười", "10");
                date = date.replaceAll(/\s/g, '');
                if (!date?.includes("tháng")) {
                    date = date.substring(0, 1) + "tháng" + date.substring(1, date.length);
                }
                date = date.replace("tháng", "/");
                console.log("date3", date)
                let newDate = moment(date).format()
                return newDate
            } else {
                return ""
            }
        }
    };

    const convertAudio = (audio) => {
        return `${domain}${audio?.replace(/[\\]/g, "/")}`
    };

    const playAudio = async (audio) => {
        const soundSub = new Sound(audio, undefined, async (error) => {
            if (error) {
                console.log("audio", audio)
                console.log('lỗi không phát được âm thanh', error);
                soundSub.release()
                setTimeout(() => {
                    startRecognizing()
                }, 300)
                return;
            }
            soundSub.play(async (success) => {
                console.log("audio", audio)
                if (success) {
                    soundSub.release()
                    setTimeout(() => {
                        startRecognizing()
                    }, 300)
                }
            });
        });
    };

    const formatNumberServer = (value) => {
        var newValue = ''
        switch (value) {
            case 'một':
                newValue = '1'
                break;
            case 'hai':
                newValue = '2'
                break;
            case 'ba':
                newValue = '3'
                break;
            case 'bốn':
                newValue = '4'
                break;
            case 'năm':
                newValue = '5'
                break;
            case 'sáu':
                newValue = '6'
                break;
            case 'bảy':
                newValue = '7'
                break;
            default:
                newValue = value
                break;
        }
        return newValue
    };

    const formatNumberParam = (value) => {
        var newValue = ''
        switch (value) {
            case 'một':
                newValue = "1"
                break;
            case 'hai':
                newValue = "2"
                break;
            case 'ba':
                newValue = "3"
                break;
            case 'bốn':
                newValue = "4"
                break;
            case 'năm':
                newValue = "5"
                break;
            case 'sáu':
                newValue = "6"
                break;
            case 'bảy':
                newValue = "7"
                break;
            default:
                newValue = value
                break;
        }
        return newValue
    };

    const returnField = (value) => {
        const newValue = formatNumberServer(value)
        var newField = null
        if (field?.refJoin && field?.refJoin?.length > 0) {
            const find = field?.refJoin?.find(a => a?.value[0] == newValue)
            if (fields && find) {
                for (const i in fields) {
                    if (fields[i]?.field == find.field) {
                        newField = { field: fields[i], index: parseInt(i) + 1 }
                    }
                }
            }
            return newField

        } else if (field?.choiceList && field?.choiceList?.length > 0) {
            const choiceList = field?.choiceList?.find(a => {
                if (a == newValue || a?.toUpperCase() == newValue?.toUpperCase()) {//fix this
                    return true
                }
                return false
            })
            if (choiceList) {
                let index = fields?.indexOf(field)
                newField = { field: fields[index + 1], index: index + 1 }
            }
            return newField

        } else {
            let index = fields?.indexOf(field)
            newField = { field: fields[index + 1], index: index + 1 }
            return newField

        }
    };

    const pushMessage = (value, index, isInput = false) => {
        if (value) {
            field = value
            let mess = {
                field_save: field.field,
                _id: index,
                text: field?.title,
                createdAt: new Date(),
                refJoin: field?.refJoin,
                user: {
                    _id: isInput ? 1 : 2,
                }
            }
            const arrItem = [...listMessages, ...[mess]]
            listMessages = arrItem
            setListMessages(arrItem)
            const dataStr = JSON.stringify(listMessages)
            saveString(SAVE_LIST, dataStr)
        }
    };

    const [saveDataPost, setSaveDataPost] = useState(null);

    const postData = async (isSave) => {
        if (submit && confirm) {
            stopRecognizing()
            const body = {
                "data": {
                    // "Id": saveDataPost?.id || 0,
                    "Id": 0,
                    "HoTen": paramField('HoTen'),
                    "CMTND": paramField('CMTND'),
                    "GioITinh": paramNumberField('GioITinh'),
                    "NgaySinh": formatDate(paramField('NgaySinh')),
                    "HKTT_Tinh": paramNumberField('HKTT_Tinh'),
                    "HKTT_Huyen": paramNumberField('HKTT_Huyen'),
                    "HKTT_Xa": paramNumberField('HKTT_Xa'),
                    "HKTT_Thon": paramNumberField('HKTT_Thon'),
                    "QQMaTinh": paramNumberField('QQMaTinh'),
                    "QQMaHuyen": paramNumberField('QQMaHuyen'),
                    "HoanCanhCaNhan": paramField('HoanCanhCaNhan'),
                    "NguoiTao": dataDetailUser?.userID,
                    "NgayTao": formatDate(paramField('NgayTao')),
                    "TrangThai": paramNumberField('TrangThai'),
                    "NguoiDuyet": paramNumberField('NguoiDuyet'),
                    "GiayToKhac": paramNumberField('GiayToKhac'),
                    "NgayDuyet": formatDate(paramNumberField('NgayDuyet')),
                    "MaQuyetDinh": paramField('MaQuyetDinh'),
                    "NgayQuyetDinh": formatDate(paramField('NgayQuyetDinh')),
                    "MaDinhDanh": paramField('MaDinhDanh'),
                    "LyDoKhongDuyet": paramField('LyDoKhongDuyet'),
                    "LoaiCapXNKT": paramNumberField('LoaiCapXNKT'),
                    "LyDoDoiCapLai": paramField('LyDoDoiCapLai'),
                    "NoiOHienTai": paramField('NoiOHienTai'),
                    "TTCID": paramNumberField('TTCID'),
                    "curFild": parseInt(paramNumberField('curFild')) || 1,
                    "DDHP_HoTen": paramField('DDHP_HoTen'),
                    "DDHP_QuanHe": paramNumberField('DDHP_QuanHe'),
                    "DDHP_CCCD": paramField('DDHP_CCCD'),
                    "DDHP_HKTT_Tinh": paramNumberField('DDHP_HKTT_Tinh'),
                    "DDHP_HKTT_Huyen": paramNumberField('DDHP_HKTT_Huyen'),
                    "DDHP_HKTT_Xa": paramNumberField('DDHP_HKTT_Xa'),
                    "DDHP_HKTT_Thon": paramNumberField('DDHP_HKTT_Thon'),
                    "DDHP_HKTT_DiaChi": paramField('DDHP_HKTT_DiaChi'),
                    "DDHP_NoiO_Tinh": paramNumberField('DDHP_NoiO_Tinh'),
                    "DDHP_NoiO_Huyen": paramNumberField('DDHP_NoiO_Huyen'),
                    "DDHP_NoiO_Xa": paramNumberField('DDHP_NoiO_Xa'),
                    "DDHP_NoiO_Thon": paramNumberField('DDHP_NoiO_Thon'),
                    "DDHP_NoiO_DiaChi": paramField('DDHP_NoiO_DiaChi'),
                    "DDHP_SDT": paramField('DDHP_SDT'),
                    "TTKT_VD_11": paramNumberField('TTKT_VD_11'),
                    "TTKT_VD_12": paramNumberField('TTKT_VD_12'),
                    "TTKT_VD_13": paramNumberField('TTKT_VD_13'),
                    "TTKT_VD_14": paramNumberField('TTKT_VD_14'),
                    "TTKT_VD_15": paramNumberField('TTKT_VD_15'),
                    "TTKT_VD_16": paramNumberField('TTKT_VD_16'),
                    "TTKT_NN_21": paramNumberField('TTKT_NN_21'),
                    "TTKT_NN_22": paramNumberField('TTKT_NN_22'),
                    "TTKT_NN_23": paramNumberField('TTKT_NN_23'),
                    "TTKT_NN_24": paramNumberField('TTKT_NN_24'),
                    "TTKT_NN_25": paramNumberField('TTKT_NN_25'),
                    "TTKT_NN_26": paramNumberField('TTKT_NN_26'),
                    "TTKT_N_31": paramNumberField('TTKT_N_31'),
                    "TTKT_N_32": paramNumberField('TTKT_N_32'),
                    "TTKT_N_33": paramNumberField('TTKT_N_33'),
                    "TTKT_N_34": paramNumberField('TTKT_N_34'),
                    "TTKT_N_35": paramNumberField('TTKT_N_35'),
                    "TTKT_N_36": paramNumberField('TTKT_N_36'),
                    "TTKT_N_37": paramNumberField('TTKT_N_37'),
                    "TTKT_TK_41": paramNumberField('TTKT_TK_41'),
                    "TTKT_TK_42": paramNumberField('TTKT_TK_42'),
                    "TTKT_TK_43": paramNumberField('TTKT_TK_43'),
                    "TTKT_TK_44": paramNumberField('TTKT_TK_44'),
                    "TTKT_TK_45": paramNumberField('TTKT_TK_45'),
                    "TTKT_TT_51": paramNumberField('TTKT_TK_51'),
                    "TTKT_TT_52": paramNumberField('TTKT_TK_52'),
                    "TTKT_TT_53": paramNumberField('TTKT_TK_53'),
                    "TTKT_TT_54": paramNumberField('TTKT_TK_54'),
                    "TTKT_Khac_61": paramNumberField('TTKT_Khac_61'),
                    "TTKT_Khac_62": paramNumberField('TTKT_Khac_62'),
                    "TTKT_Khac_63": paramNumberField('TTKT_Khac_63'),
                    "MDKT_21": paramNumberField('MDKT_21'),
                    "MDKT_22": paramNumberField('MDKT_22'),
                    "MDKT_23": paramNumberField('MDKT_23'),
                    "MDKT_24": paramNumberField('MDKT_24'),
                    "MDKT_25": paramNumberField('MDKT_25'),
                    "MDKT_26": paramNumberField('MDKT_26'),
                    "MDKT_27": paramNumberField('MDKT_27'),
                    "MDKT_28": paramNumberField('MDKT_28'),
                    "MDKT_29": paramNumberField('MDKT_29'),
                    "MDKT_210": paramNumberField('MDKT_210')
                },
                "confirm": isSave ? "Lưu" : "Gửi đơn"
            };
            console.log("body", JSON.stringify(body))
            // const callApi = async () => {
            const resp = await RestAPI.API_CAPGIAYXNHT(submit?.url, body);
            console.log("resp", resp)
            const nfields = resp?.data?.fields;
            if (resp?.data?.saved) {
                setSaveDataPost(resp?.data?.saved)
            };

            if (nfields && nfields[0]?.field == "confirm") {
                update = "CONFIRM"
                let mess = {
                    _id: listMessages?.length,
                    text: resp?.data?.intro?.title,
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                    }
                }
                let arr = [...listMessages, ...[mess]]
                listMessages = arr
                setListMessages(arr)
                let audio = convertAudio(resp?.data?.intro?.audioFile)
                const soundSub = new Sound(audio, undefined, async (error) => {
                    if (error) {
                        console.log("audio", audio)
                        console.log('lỗi không phát được âm thanh', error);
                        if (isSave) {
                            startRecognizing()
                            return
                        }
                        destroyRecognizer()
                        await _sleep(1000);
                        navigation?.navigate(HOME);
                        remove(SAVE_LIST)
                        remove(SAVE_SUCCESS)
                        return;
                    }
                    soundSub.play(async (success) => {
                        if (isSave) {
                            startRecognizing()
                            return
                        }
                        destroyRecognizer()
                        await _sleep(1000);
                        navigation?.navigate(HOME);
                        remove(SAVE_LIST)
                        remove(SAVE_SUCCESS)
                    });
                });
                return
            };

            if (nfields && nfields?.length == 0) {
                let mess = {
                    _id: listMessages?.length,
                    text: "Bạn đã gửi đơn thành công và đang chờ xã duyệt",
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                    }
                }
                let arr = [...listMessages, ...[mess]]
                listMessages = arr
                setListMessages(arr)
                update = "CONFIRM"
                let audio = "http://nkt.btxh.gov.vn/UserData/AudioDieuHuong/1/544.mp3"
                const soundSub = new Sound(audio, undefined, async (error) => {
                    if (error) {
                        console.log("audio", audio)
                        console.log('lỗi không phát được âm thanh', error);
                        destroyRecognizer()
                        await _sleep(1000);
                        navigation?.navigate(HOME);
                        remove(SAVE_LIST)
                        remove(SAVE_SUCCESS)
                        return;
                    }
                    soundSub.play(async (success) => {
                        destroyRecognizer()
                        await _sleep(1000);
                        navigation?.navigate(HOME);
                        remove(SAVE_LIST)
                        remove(SAVE_SUCCESS)

                    });
                });
                return
            };

            if (resp?.data?.intro && (update == "UPDATE" || update == "SAVE" || update == "UPDATE_AGAIN")) {
                // clearInterval(intervalRef?.current);
                // stopRecognizing()
                let mess = {
                    _id: listMessages?.length,
                    text: resp?.data?.intro?.title,
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                    }
                }
                let arr = [...listMessages, ...[mess]]
                listMessages = arr
                setListMessages(arr)
                let audio = convertAudio(resp?.data?.intro?.audioFile)
                const soundSub = new Sound(audio, undefined, async (error) => {
                    if (error) {
                        console.log("audio", audio)
                        console.log('lỗi không phát được âm thanh', error);
                        if (nfields && nfields?.length > 0) {
                            pushMessage(nfields[0], listMessages.length)
                            playAudio(convertAudio(nfields[0]?.audioFile))
                            return
                        }
                        return;
                    }
                    soundSub.play(async (success) => {
                        //chạy intro lỗi rồi vào đây:
                        if (nfields && nfields?.length > 0) {
                            console.log("fiedss", nfields)
                            update = "UPDATE_AGAIN"
                            fields = nfields
                            const dataStr = JSON.stringify(nfields)
                            saveString(SAVE_SUCCESS, dataStr)
                            pushMessage(nfields[0], listMessages.length)
                            playAudio(convertAudio(nfields[0]?.audioFile))
                            return
                        }
                    });
                });

            } else if (resp?.status == false) {
                DropDownHolder.showError(('Cập nhật thất bại!'));
                startRecognizing()
            }
        };
    };

    const getData = () => {
        console.log("....", dataDetailUser?.userID)
        dispatch(onGetDataXNKT(`https://apinkt.dttt.vn/api/v1/AI_Voice/CapGiayXNKT?userid=${dataDetailUser?.userID}`))
    };

    const CustomMessage = (props) => (
        <NoAvatarMessage
            {...props}
        />
    );

    const renderBubble = (props) => (
        <Bubble
            {...props}
            containerStyle={{
                left: { marginTop: 5 },
                right: { marginTop: 5 },
            }}

        />
    );

    return (
        <Screen>
            <Header
                isBack={true}
                headerTx={'Cấp giấy xác nhận khuyết tật'}
            />
            <GiftedChat
                renderBubble={renderBubble}
                renderMessage={CustomMessage}
                textInputStyle={styles.textInput}
                multiline={false}
                messages={listMessGift}
                inverted={false}
                user={{
                    _id: 1,
                }}
            />

            {started == '√' &&
                <View style={{ width: '100%', alignItems: 'center', backgroundColor: 'transparent' }}>
                    <Image
                        source={require('../../../assets/image/loadingPitch.gif')}
                        style={{ width: 40, height: 30, position: 'absolute', bottom: 10 }}
                    />
                </View>
            }
        </Screen>
    );
};

class NoAvatarMessage extends GiftedChatMessage {
    // This fixes an issue where blank avatars are rendered;
    // https://github.com/FaridSafi/react-native-gifted-chat/issues/2093
    renderAvatar() {
        return null;
    }
}