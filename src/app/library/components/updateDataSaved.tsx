import React, { useEffect } from 'react'
import { updateDataPostSaved } from '../../RestAPI';
import { _sleep } from '../../common';
import ViewCus from './ViewCus/ViewCus'
import { palette as appColors } from '../../themes/palette'
import { BASE_API, ServiceAsync } from "../../library/networking"

export const UpdateDataSaved = (props) => {
    const { data, onSuccess = () => { } } = props;
    useEffect(() => {
        uploadData();
    }, [])
    const uploadData = async () => {
        for (let i = 0; i < data.length; i++) { 
            var url = data[i].request.url;
            var params = data[i].request.params;
            var res = await ServiceAsync.Post(url, params)
            if (res.status == true || res != null && res.result > 0) {
                await _sleep(2000);
                updateDataPostSaved([]);
                onSuccess();
            }
        }
    }
    return (
        <ViewCus.ViewCenter>
            <ViewCus.ViewIcon
                styleContainer={{ alignItems: 'center', }}
                iconTop={<ViewCus.MaterialCommunityIcons icon={'cloud-upload-outline'} color={appColors.metronicSuccess} size={150} />}
            >
            </ViewCus.ViewIcon>
            <ViewCus.Text style={{ color: 'red', fontSize: 16, fontWeight: '400' }}>
                {'Hệ thống đang cập nhật dữ liệu. Vui lòng đợi!'}
            </ViewCus.Text>
        </ViewCus.ViewCenter>
    )
}
