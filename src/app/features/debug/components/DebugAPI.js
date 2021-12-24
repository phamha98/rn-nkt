import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { FlatList, View, ScrollView, Clipboard as ClipboardRN } from 'react-native';
import { useSelector } from 'react-redux';
import { palette as appColors } from '../../../themes/palette';
import ViewCus from '../../../library/components/ViewCus/ViewCus';
import { consoleLog } from '../../../../../index';
import { dispatch } from '../../../store/store';
import { debugForceUpdate } from '../redux/debugAction';
import logger from 'react-native-network-logger/src/loggerSingleton'
import NetworkLogger, { getRequests, clearRequests } from 'react-native-network-logger'

const Clipboard = {
    setString: (data) => {
        ClipboardRN.setString(data);
        consoleLog(data)
    }
}

const ModalComponent = forwardRef((props, ref) => {
    const refModal = useRef(null);
    const [item, setItem] = useState(null);

    const toggle = (flag, data) => {
        data != null && setItem(data);
        refModal.current?.toggle(flag);
    }
    useImperativeHandle(ref, () => ({
        toggle
    }))
    return (
        <ViewCus.Modal
            ref={refModal}
            title={item?.url}
            titleComponent={
                <ViewCus.Text
                    style={{
                        paddingHorizontal: 10,
                        paddingVertical: 10
                    }}
                    numberOfLines={1}
                >
                    {item?.url}
                </ViewCus.Text>
            }
            styleContent={{
                paddingHorizontal: 0,
                paddingVertical: 0
            }}
        >
            {(() => {
                return item != null &&
                    <>
                        <ScrollView
                            contentContainerStyle={{
                                paddingHorizontal: 15
                            }}
                        >
                            <ViewCus.Text>
                                {item.error}
                            </ViewCus.Text>
                            <ViewCus.ViewHorizontal>
                                <View style={{ justifyContent: "center", alignItems: "center", paddingHorizontal: 8 }}>
                                    <ViewCus.Text
                                        style={{
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        {'{0}'.format(
                                            item.method
                                        )}
                                    </ViewCus.Text>
                                    <View
                                        style={{
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            backgroundColor:
                                                item.status == 500 ? 'red'
                                                    : item.status == 404 ? appColors.metronicWarning
                                                        : item.status == 200 ? appColors.metronicSuccess
                                                            : appColors.metronicDark,
                                            // width: 40,
                                            // height: 40,
                                            padding: 8,
                                            borderRadius: 1000,
                                            margin: 10
                                        }}
                                    >
                                        <ViewCus.Text
                                            style={{
                                                fontSize: 16,
                                                textAlign: 'center',
                                                color: appColors.white,
                                                fontWeight: 'bold'
                                            }}
                                        >
                                            {item.status}
                                        </ViewCus.Text>
                                    </View>
                                    <ViewCus.Text>
                                        {'{0}s'.format((item.endTime == null || item.endTime <= 0 ? 0 : (item.endTime - item.startTime) / 1000).toFixed(2))}
                                    </ViewCus.Text>
                                </View>
                                <View
                                    style={{
                                        justifyContent: 'center',
                                        flex: 1
                                    }}
                                >
                                    <ViewCus.Text>
                                        {'{0}'.format(
                                            item.url
                                        )}
                                    </ViewCus.Text>
                                    <ViewCus.Text
                                        style={{
                                            marginTop: 10
                                        }}
                                    >
                                        {'Start: {0}\nEnd: {1}'.format(
                                            new Date(item.startTime).format('hh:mm:ss a DD/MM/YYYY'),
                                            item.endTime == null ? '' : new Date(item.endTime).format('hh:mm:ss a DD/MM/YYYY'),
                                        )}
                                    </ViewCus.Text>
                                </View>
                            </ViewCus.ViewHorizontal>
                            <ViewCus.Collapsible
                                title='Header'
                                initValue={true}
                                styleContainer={{
                                    backgroundColor: '#f9f9f9',
                                    marginTop: 10,
                                }}
                                styleContent={{
                                    backgroundColor: '#f9f9f9',
                                    padding: 5
                                }}
                            >
                                <ViewCus.Text
                                    style={{
                                    }}
                                >
                                    {'{0}'.format(JSON.stringify(item.requestHeaders, null, '\t'))}
                                </ViewCus.Text>
                            </ViewCus.Collapsible>
                            <ViewCus.Collapsible
                                title='Body'
                                initValue={true}
                                styleContainer={{
                                    backgroundColor: '#f2f2f2',
                                    marginTop: 10,
                                }}
                                styleContent={{
                                    backgroundColor: '#f9f9f9',
                                    padding: 5
                                }}
                            >
                                <ViewCus.Text
                                    style={{
                                    }}>
                                    {'{0}'.format(JSON.stringify(item.dataSent, null, '\t'))}
                                </ViewCus.Text>
                            </ViewCus.Collapsible>
                            <ViewCus.Collapsible
                                title='Response Header'
                                initValue={true}
                                styleContainer={{
                                    backgroundColor: '#f2f2f2',
                                    marginTop: 10,
                                }}
                                styleContent={{
                                    backgroundColor: '#f9f9f9',
                                    padding: 5
                                }}
                            >
                                <ViewCus.Text
                                    style={{
                                    }}
                                >
                                    {'{0}'.format(JSON.stringify(item.responseHeaders, null, '\t'))}
                                </ViewCus.Text>
                            </ViewCus.Collapsible>
                            <ViewCus.ToggleView
                                title='Response'
                                initValue={false}
                                styleContainer={{
                                    backgroundColor: '#f2f2f2',
                                    marginTop: 10,
                                }}
                                styleContent={{
                                    backgroundColor: '#f9f9f9',
                                    padding: 5
                                }}
                            >
                                <ViewCus.Text
                                    style={{
                                    }}>
                                    {'{0}'.format(JSON.stringify(item.response, null, '\t') || '')}
                                </ViewCus.Text>
                            </ViewCus.ToggleView>
                        </ScrollView>
                        <ViewCus.Button
                            style={{
                                marginTop: 5,
                                backgroundColor: appColors.materialBlue
                            }}
                            styleText={{
                                color: appColors.white
                            }}
                            onPress={() => Clipboard.setString(JSON.stringify(item, null, '\t') || '')}
                        >
                            {'Copy'}
                        </ViewCus.Button>
                    </>
            })()}
        </ViewCus.Modal>
    )
})

logger.setCallback((updatedRequests) => {
    var jsonConvert = (key, data) => {
        var _return = {};
        try {
            _return = JSON.parse(data)
        } catch (error) {
            _return = {
                [key]: data
            }
        }
        return _return
    }
    // console.table(updatedRequests)
    dispatch(debugForceUpdate({
        apis: updatedRequests.map(e => ({
            ...e,
            response: e.response != '' && e.response != null && e.response != undefined ? jsonConvert('response', e.response) : e.response,
            dataSent: e.dataSent != '' && e.dataSent != null && e.dataSent != undefined ? jsonConvert('dataSent', e.dataSent) : e.dataSent,
        }))
    }))
});
export function DebugAPI1() {
    const [requests, setRequests] = useState([]);
    useEffect(() => {
    }, [])
    return (
        <View
            style={{
                flex: 1,
            }}
        >
            {/* <NetworkLogger /> */}
        </View>
    )
}
export default function DebugAPI() {
    const refModal = useRef(null)
    const apis = useSelector(state => state.debug.apis);

    useEffect(() => {
    }, [])

    const renderItem = ({ item: e, index }) => {
        return (
            <ViewCus.Button
                style={[
                    {
                        paddingVertical: 5,
                        paddingHorizontal: 3,
                        alignItems: 'flex-start',
                        backgroundColor: index % 2 == 0 ? appColors.transparent : '#f2f2f2'
                    },
                ]}
                styleText={[
                    {},
                    e.status == -1 ? {
                        color: 'blue'
                    }
                        : e.status == 404 ? {
                            color: 'orange'
                        }
                            : e.status != 200 ? {
                                color: 'red'
                            }
                                : {
                                    color: 'black'
                                }
                ]}
                onPress={() => refModal.current?.toggle(true, e)}
            >
                {'{0}\n{1} - {2}s'.format(
                    e.url.replace('https://apinkt.dttt.vn/', ''),
                    e.method,
                    (e.endTime == null || e.endTime <= 0 ? 0 : (e.endTime - e.startTime) / 1000).toFixed(2),
                    e.status
                )}
            </ViewCus.Button>
        )
    }
    return (
        <View
            style={{
                flex: 1,
            }}
        >
            <ModalComponent ref={refModal} />
            {
                apis.length <= 0 ?
                    <ViewCus.Text
                        style={{
                            color: '#888888',
                            textAlign: 'center',
                            padding: 10
                        }}
                    >
                        {'No request.'}
                    </ViewCus.Text>
                    :
                    <>
                        <FlatList
                            data={apis}
                            contentContainerStyle={{
                                padding: 5
                            }}
                            keyExtractor={(item, index) => item.id}
                            renderItem={renderItem}
                        />
                        <ViewCus.Button
                            style={{
                                paddingVertical: 3,
                                backgroundColor: appColors.metronicWarning
                            }}
                            onPress={() => ViewCus.Alert.Confirm(() => (clearRequests(), dispatch(debugForceUpdate({ apis: [] }))))}
                        >
                            {'Clear'}
                        </ViewCus.Button>
                    </>
            }
        </View>
    );
}
