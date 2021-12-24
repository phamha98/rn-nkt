import React, { useEffect, useRef } from 'react'
import { View, Text } from 'react-native'
import RNFetchBlob from 'rn-fetch-blob';
import { _sleep } from '../../common';
import ViewCus from '../../library/components/ViewCus/ViewCus';
import { palette as appColors } from '../../themes/palette';

export const filePath = `${RNFetchBlob.fs.dirs.DocumentDir}/Script.json`;

const DownloadBundle = ({ callback = () => { } }) => {
    const refPercent = useRef()
    useEffect(() => {
        init();
    }, []);


    const init = async () => {
        // if ((await RNFetchBlob.fs.exists(filePath))) {
        //     await _sleep(200)
        //     callback();
        //     return
        // }
        RNFetchBlob.fetch('GET', 'http://nkt.btxh.gov.vn/FileTraining/Script/Script.json', {})
            .progress(async (received, total) => {
                refPercent.current?.setData({ counter: received, total })
            })
            .then(async (resp) => {
                resp.flush();
                RNFetchBlob.fs.createFile(filePath, resp.data, 'utf8')
                callback()
            })
            .catch((err) => {
            })
    }
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
            <Text style={{ color: '#333', fontSize: 16, textAlign: 'center', marginVertical: 30, paddingHorizontal: 20, color: 'red' }}>
                {"Hệ thống đang lưu dữ liệu để sử dụng cho chức năng Offline. xin vui lòng đợi!"}
            </Text>
            <ViewCus.ComponentDynamic
                ref={refPercent}
                render={({ counter = 50, total = 0 } = {}) => (
                    <View style={{ height: 5, width: '80%', backgroundColor: '#f2f2f2', marginTop: 30 }}>
                        <View style={{ backgroundColor: appColors.metroCyan, height: '100%', width: `${Math.round(total == 0 ? 0 : counter / total * 100)}` + '%' }} />
                        <View style={{ marginVertical: 10, position: 'absolute', alignSelf: 'center' }}>
                            <Text style={{ color: appColors.materialGreen, fontSize: 16 }}>
                                {"Đang tải : " + `${Math.round(total == 0 ? 0 : counter / total * 100)}` + '%'}
                            </Text>
                        </View>
                    </View>
                )}
            />
        </View>
    )
}

export default DownloadBundle
