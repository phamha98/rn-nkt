import React, { useEffect, useRef, useState } from 'react';
import { GiftedChat, LoadEarlier as LoadEarlierRN } from 'react-native-gifted-chat';
import { _sleep } from '../../../common/index';
import { Header, Screen } from '../../../library/components';
import RestAPI from '../../../RestAPI';
import { Platform,Dimensions } from 'react-native';
const LoadEarlier = React.forwardRef((props, ref) => {
    const [isLoading, setIsLoading] = useState(false);

    React.useImperativeHandle(ref, () => ({
        setIsLoading
    }))
    // return (<LoadEarlierRN {...props} isLoadingEarlier={isLoading} label='Tin nhắn cũ' />)
})
export const ChatBot = (props: any,) => {
    const refPrevious = useRef();
    const [listMessages, setMessages] = useState([]);
    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'Xin chào! Tôi có thể giúp gì cho bạn?',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'Chat Bot',
                },
            }
        ])
    }, [])

    const loadMessageChatBot = async (mess) => {
        var resp = await RestAPI.API_ChatBot({
            id: 0,
            text: mess.text,
        });
        let text = resp[0].text.replace(/(&nbsp;|<([^>]+)>)/ig, "\r\n").replace(/\./g, "\r\n");
        var mess =
        {
            _id: new Date().getTime(),
            text: text,
            createdAt: new Date(),
            user: {
                _id: 2,
                name: 'Chat Bot',
            },
        }
        setMessages(prev => [
            ...prev,
            mess,
        ])
    }
    const onSend = (messages) => {
        var text = messages[0].text
        var mess =
        {
            _id: new Date().getTime(),
            text: text,
            createdAt: new Date(),
            user: {
                _id: 1,
                name: 'Chat Bot',
            },
        }
        setMessages(p => [
            ...p,
            mess,
        ])
        loadMessageChatBot(mess);
    }
    const isIphoneX = () => {
        const {width, height} = Dimensions.get('window');
        return (
            Platform.OS === 'ios' &&
            !Platform.isPad &&
            !Platform.isTVOS &&
            ((height === 812 || width === 812) ||(height === 896 || width === 896))
        );
    }

    return (
        <Screen>
            <Header
                isBack={true}
                headerTx={'Hỗ trợ trực tuyến'}
            />
                <GiftedChat
                    multiline={false}
                    messages={listMessages}
                    inverted={false}
                    bottomOffset={Platform.OS === 'ios' ? (isIphoneX() ? 300  : 200)  : 0}
                    placeholder={"Nhập câu hỏi?"}
                    onSend={messages => onSend(messages)}
                    user={{
                        _id: 1,
                    }}
                    loadEarlier={true}
                    isLoadingEarlier={true}
                    renderLoadEarlier={props => {
                        return <LoadEarlier ref={refPrevious} {...props} />
                    }}
                    onLoadEarlier={() => {
                        refPrevious.current?.setIsLoading(true)
                        setMessages(p => [
                            ...p,
                        ])
                        refPrevious.current?.setIsLoading(false)
                    }}
                />
        </Screen>
    )
}

