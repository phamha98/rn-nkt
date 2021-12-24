import React, { useEffect, useRef } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { toggleLoading } from '../../../../../../../App';
import { Header, Screen, Text as TextCus } from '../../../../../library/components';
import ViewCus from '../../../../../library/components/ViewCus/ViewCus';
import RestAPI from '../../../../../RestAPI';
const Text = (props) => <TextCus {...props} style={[{ color: 'black' }, props.style]} />

export default function UpdateRegister_History(props) {
    const { navigation } = props;
    let params = navigation.state.params;

    const refLogs = useRef();
    const user = useSelector(state => state.AppReducer.profile.user);
    useEffect(() => {
        _run()
    }, []);

    const _run = async () => {
        toggleLoading(true)
        var resp = await RestAPI.UpdateRegister_History(params.id, user.token);
        refLogs.current?.setData(resp);
        toggleLoading(false)
    }
    return (
        <Screen>
            <Header
                isBack={true}
                headerTx={'Lịch sử thay đổi thông tin'}
            />
            <View
                style={{
                    flex: 1,
                    backgroundColor: 'white'
                }}
            >
                <ViewCus.ComponentDynamic
                    ref={refLogs}
                    render={(data) => (
                        data != null &&
                        <View
                            style={{
                                paddingHorizontal: 10
                            }}
                        >
                            <Text
                                style={{
                                    paddingVertical: 10,
                                    fontWeight: 'bold',
                                    fontSize: 20
                                }}
                            >
                                {'{0}'.format(data.ttc.a4_HoTen)}
                            </Text>
                            <ViewCus.Card
                                title={'Lịch sử thay đổi'}
                                styleContainer={{
                                    marginHorizontal: 0
                                }}
                            >
                                <Text
                                    style={{
                                        fontWeight: 'bold'
                                    }}
                                >
                                    {'Mã số: {0}'.format(data.ttc.a2_MaSo)}
                                </Text>
                                {
                                    data.log.map((e, index) => (
                                        <View key={index}
                                            style={{
                                                marginTop: 10
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    marginTop: index == 0 ? 0 : 8
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        fontWeight: 'bold'
                                                    }}
                                                >
                                                    {'{0} '.format(new Date(e.logDate).format())}
                                                </Text>
                                                {'{0}'.format(e.logContent)}
                                            </Text>
                                        </View>
                                    ))
                                }
                            </ViewCus.Card>
                        </View>
                    )}
                />
            </View>
        </Screen>
    );
}
