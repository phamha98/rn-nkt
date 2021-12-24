import React, { useEffect, useRef } from 'react';
import { SwitchActions } from 'react-navigation';
import { useSelector } from 'react-redux';
import { Header, Screen } from '../../../library/components';
import BotAssistant, { I_Request } from '../../../library/utils/BotAssistant';
import { respDangKyCapNhatForm } from './DangKyCapNhat';
import { callAPI } from './data';
import VoiceTest from './VoiceTest';
// import { useKeepAwake } from '@sayem314/react-native-keep-awake';
import { activateKeepAwake, deactivateKeepAwake } from "@sayem314/react-native-keep-awake";
import {Log} from "./utils";


const BotKhiemThi = ({ navigation }) => {
    const refBot = useRef();
    const { token, userID: userId } = useSelector(state => state.AppReducer.profile.user);

    useEffect(() => {
        activateKeepAwake();
        init()
        // test()
        return () => refBot.current?.reset()
    }, []);

    const test = async () => {
        // await responseFormDangKyCapNhat()
        // return;
        const request = await respDangKyCapNhatForm(userId)
        Log.d('e.2 startRequest')
        refBot.current?.startRequest({
            request: request,
            onSuccess: (data) => {
                Log.d('E.4 loadData')
                loadData({ method: request.submit.method, url: request.submit.url, data });
            },
            onSavePartial: async (data) => {
                return await callAPI({ method: request.submit.method, url: request.submit.url, data, userId });
            },
            token,
            userId
        })
    }
    const init = async () => {
        Log.d('E.5 loadData')
        loadData({ method: 'GET', url: 'apiNavHome', data: {} });
    }

    const loadData = async ({ method = '', url = '', data }) => {
        const request: I_Request = await callAPI({ method, url, data, userId });
        const id = request.id || url;
        Log.y('G.1 request ',request)
        Log.d('E.3 startRequest loadData')
        refBot.current?.startRequest({
            id,
            request: request,
            onSuccess: (data) => {
                Log.y('G.2 onSuccess')
                // onSubmit({ method: request.submit.method, url: request.submit.url, data });
                Log.d('F.1 loadData')
                loadData({ method: request.submit.method, url: request.submit.url, data });
            },
            onConfirmContinue: (data) => {
                Log.y('G.3 onConfirmContinue')
                Log.d('F.2 loadData')
                loadData({ method: request.submit.method, url: request.submit.urlContinue, data });
            },
            onSavePartial: async (data) => {
                return await callAPI({ method: request.submit.method, url: request.submit.url, data, userId });
            },
            userId, token
        })
    }

    return (
        <Screen>
            <Header
                isBack={true}
                onGoBack={() => navigation.dispatch(SwitchActions.jumpTo({ routeName: 'CHOOSE_FUNCTION' }))}
                headerTx={'Dành cho người khiếm thị'}
            />
            <BotAssistant ref={refBot} />
            {/* <VoiceTest /> */}
        </Screen>
    )
}

export default BotKhiemThi
