
import { navigate } from '../../../navigation/navigationService';
import { toggleLoading } from '../../../../../App';
import { _sleep } from '../../../common';
import { ServiceAsync } from '../../../library/networking';
import { FIELD_DATA_TYPE, FIELD_TYPE, I_Field, I_Request, REQUEST_TYPE } from '../../../library/utils/BotAssistant';
import { respHandler } from './apiHandler';
import audioJson from './audio.json';
import { apiCapNhatHoTroNavSubmit, apiCapNhatHoTroSavedSubmit, respCapNhatHoTroNav } from './CapNhatHoTro';
import { apiDangKyCapNhatNavSubmit, apiDangKyCapNhatSaved, apiDangKyCapNhatFormStepSubmit, respDangKyCapNhatNav, apiDangKyCapNhatFormErrorContinueSubmit } from './DangKyCapNhat';
import { CAPGIAY_XNKT } from '../../../navigation/screenTypes';
import {Log} from "./utils";

export const callAPI = ({ method = '', url = '', data, userId = 0 }) => {
    Log.y('H.1 callAPI method,url,data,userId',method,url,data,userId)
    toggleLoading(true)
    return new Promise(async (resolve, reject) => {
        await _sleep(200);
        if (url == 'apiNavHome')
            resolve(apiNavHome(data, userId));
        else if (url == 'apiNavHomeSubmit')
            resolve(apiNavHomeSubmit(data, userId));

        else if (url == 'apiDangKyCapNhatNavSubmit')
            resolve(apiDangKyCapNhatNavSubmit(data, userId));
        else if (url == 'apiDangKyCapNhatFormStepSubmit')
            resolve(await apiDangKyCapNhatFormStepSubmit(data, userId));
        else if (url == 'apiDangKyCapNhatFormErrorContinueSubmit')
            resolve(await apiDangKyCapNhatFormErrorContinueSubmit(data, userId));
        else if (url == 'apiDangKyCapNhatSaved')
            resolve(apiDangKyCapNhatSaved(data, userId));

        else if (url == 'apiCapNhatHoTroNavSubmit')
            resolve(apiCapNhatHoTroNavSubmit(data, userId));
        else if (url == 'apiCapNhatHoTroSavedSubmit')
            resolve(apiCapNhatHoTroSavedSubmit(data, userId));

        else {
            url = !url.startsWith('http') ? `https://apinkt.dttt.vn/${url}` : url;
            let { url: _url, params: _params } = extractUrl(url)
            const params = { ..._params, userId }
            url = `${_url}?${data2Query(params)}`;
            const res = await ServiceAsync[method.toLowerCase() == 'get'.toLowerCase() ? 'Get' : 'Post'](url, data);
            let { data: dataResp, domain } = res || {};

            if (dataResp != null && dataResp.type != null && dataResp.type.constructor == String) {
                dataResp = convertResponseToObj(dataResp, domain);
                dataResp = await respHandler(url, dataResp, data);
                console.log(JSON.stringify(dataResp))
            }
            resolve(dataResp != null ? { ...dataResp, domain } : res);
        }

        toggleLoading(false)
    })
}

export const queryParams: any = (path?: string) => {
    return (
        (path || window.location.search).match(new RegExp('([^?=&]+)(=([^&]*))', 'g')) || []
    ).reduce(function (result, each, n, every) {
        let [key, value] = each.split('=');
        result[key] = decodeURIComponent(value);
        return result;
    }, {});
};

export const data2Query = (data: object) => Object.keys(data).map(k => `${k}=${encodeURIComponent(data[k])}`).join('&')

export const extractUrl = (url) => {
    if (!/(.+)\?(.+)/.test(url))
        return {
            url: url,
            params: {}
        }
    const _url = /(.+)\?(.+)/.exec(url)[1];
    const query = /(.+)\?(.+)/.exec(url)[2];
    return {
        url: _url,
        params: queryParams(query)
    }
}

export const convertResponseToObj: I_Request = (data: I_Request, domain) => {
    data.domain = domain;
    data.type = data.type.trim().toLowerCase() == 'REQUEST_TYPE.FORM'.toLowerCase() ? REQUEST_TYPE.FORM : REQUEST_TYPE.NAVIGATE
    data.fields = (data.fields || []).map(e => ({ ...e, field: e.field.trim() }))
    data.fields = data.fields.map((e: I_Field, index) => {
        const prevField: I_Field = index <= 0 ? null : data.fields[index - 1]
        const nextField: I_Field = index >= data.fields?.length ? null : data.fields[index + 1]
        e.type = e.type.trim().toLowerCase() == 'CHOICE'.toLowerCase() ? FIELD_TYPE.CHOICE
            : e.type.trim().toLowerCase() == 'TEXT'.toLowerCase() ? FIELD_TYPE.TEXT
                : e.type.trim().toLowerCase() == 'UNSAVE'.toLowerCase() ? FIELD_TYPE.UNSAVE
                    : e.type.trim().toLowerCase() == 'ARRAY'.toLowerCase() ? FIELD_TYPE.ARRAY
                        : FIELD_TYPE.TEXT;

        e.dataType = e.dataType.trim().toLowerCase() == 'NUMBER'.toLowerCase() ? FIELD_DATA_TYPE.NUMBER
            : e.dataType.trim().toLowerCase() == 'TEXT'.toLowerCase() ? FIELD_DATA_TYPE.TEXT
                : e.dataType.trim().toLowerCase() == 'DATETIME'.toLowerCase() ? FIELD_DATA_TYPE.DATETIME
                    : FIELD_DATA_TYPE.TEXT;

        const refJoin = e.refJoin = e.refJoin || [];
        e.join = e.join || [];
        if (e.refJoin.length > 0) {
            const field = e.field;
            refJoin.map(({ field: fieldRef = '', value = [] } = {}) => {
                fieldRef = fieldRef?.trim();
                // const index = data.fields.findIndex(e1 => e1.field == fieldRef);
                // if (index >= 0) {
                //     var join = data.fields[index].join = data.fields[index].join || [];
                //     const joinIndex = join.findIndex(e1 => e1.field == field)
                //     if (joinIndex >= 0) {
                //         data.fields[index].join[joinIndex].value = [...data.fields[index].join[joinIndex].value, ...value]
                //     }
                //     else {
                //         data.fields[index].join.push({ field: field, value })
                //     }
                // }

                for (let i = index + 1; i < data.fields.length; i++) {
                    const e = data.fields[i];
                    if (e.field == fieldRef)
                        break;

                    var skipJoin = data.fields[i].skipJoin = e.skipJoin || [];
                    const indexSkip = skipJoin.findIndex(e1 => e1.field == field)

                    if (indexSkip >= 0) {
                        data.fields[i].skipJoin[indexSkip].value = [...data.fields[i].skipJoin[indexSkip].value, ...value]
                    }
                    else {
                        data.fields[i].skipJoin.push({ field: field, value })
                    }
                }
            })
        }
        delete e.refJoin;

        e.isSavePartial = nextField?.group == null ? false : nextField?.group != e.group;
        return e;
    });
    return data;
}

export const genericAudio = (content) => {
    return audioJson.find(e => e.text == content)?.fileAudio || genericAudio('Lỗi file audio')
}

export const responseComingsoon = (submit: { method: string, url: string }) => {
    return {
        type: REQUEST_TYPE.NAVIGATE,
        intro: {
            title: 'Chức năng chưa có.',
            audioFile: genericAudio('Chức năng chưa có.')
        },
        errorRecognized: {
            title: 'Hệ thống chưa nhận được phản hồi của bạn',
            audioFile: genericAudio('Hệ thống chưa nhận được phản hồi của bạn')
        },
        fields: [
            {
                field: 'Confirm',
                fieldName: 'Xác nhận',
                type: FIELD_TYPE.CHOICE,
                choiceList: ['Đồng ý'],
                isValueInclude: true,
                dataType: FIELD_DATA_TYPE.NUMBER,
                errorRecognized: {
                    title: 'Hệ thống chưa nhận được phản hồi của bạn',
                    audioFile: genericAudio('Hệ thống chưa nhận được phản hồi của bạn')
                },
                skipNext: 'Bỏ qua',
                validate: [
                    {
                        rule: 'required',
                        title: 'Nội dung không chính xác.',
                        audioFile: genericAudio('Nội dung không chính xác.')
                    }
                ],
                title: `Nói đồng ý để quay lại.`,
                audioFile: genericAudio('Nói đồng ý để quay lại.'),
            },
        ],
        submit: submit
    }
}

export const apiNavHome = () => {
    return {
        type: REQUEST_TYPE.NAVIGATE,
        intro: {
            title: 'Bạn đang ở màn hình trang chủ, vui lòng làm theo hướng dẫn sau để truy cập chức năng mong muốn.',
            audioFile: genericAudio('Bạn đang ở màn hình trang chủ, vui lòng làm theo hướng dẫn sau để truy cập chức năng mong muốn.')
        },
        errorRecognized: {
            title: 'Hệ thống chưa nhận được phản hồi của bạn',
            audioFile: genericAudio('Hệ thống chưa nhận được phản hồi của bạn')
        },
        fields: [
            {
                field: 'Screen',
                fieldName: 'Lựa chọn màn hình',
                type: FIELD_TYPE.CHOICE,
                choiceList: ['1', '2', '3'],
                dataType: FIELD_DATA_TYPE.NUMBER,
                errorRecognized: {
                    title: 'Hệ thống chưa nhận được phản hồi của bạn',
                    audioFile: genericAudio('Hệ thống chưa nhận được phản hồi của bạn')
                },
                skipNext: 'Bỏ qua',
                validate: [
                    {
                        rule: 'required',
                        title: 'Nội dung không chính xác.',
                        audioFile: genericAudio('Nội dung không chính xác.')
                    }
                ],
                title: `Nói 1, Để truy cập chức năng đăng ký, cập nhập thông tin người khuyết tật ; Nói 2, Để truy cập chức năng cập nhật nhu cầu hỗ trợ. Nói 3, Để truy cập chức năng đăng ký Cấp, cấp lại giấy xác nhận khuyết tật;  xác định, xác định lại mức độ khuyết tật.`,
                audioFile: genericAudio('Nói 1, Để truy cập chức năng đăng ký, cập nhập thông tin người khuyết tật ; Nói 2, Để truy cập chức năng cập nhật nhu cầu hỗ trợ. Nói 3, Để truy cập chức năng đăng ký Cấp, cấp lại giấy xác nhận khuyết tật;  xác định, xác định lại mức độ khuyết tật.'),
            },
        ],
        submit: {
            method: 'POST',
            url: 'apiNavHomeSubmit',
        }
    }
}
export const resapiNavHome = () => {
    Log.y("H.2 resapiNavHome **************************************")
    return {
        type: REQUEST_TYPE.NAVIGATE,
        intro: {
            title: 'Bạn đang ở màn hình trang chủ, vui lòng làm theo hướng dẫn sau để truy cập chức năng mong muốn.',
            audioFile: genericAudio('Bạn đang ở màn hình trang chủ, vui lòng làm theo hướng dẫn sau để truy cập chức năng mong muốn.')
        },
        errorRecognized: {
            title: 'Hệ thống chưa nhận được phản hồi của bạn',
            audioFile: genericAudio('Hệ thống chưa nhận được phản hồi của bạn')
        },
        confirmContinue: {//create H.1
            title: 'Bạn đang ở màn hình trang chủ, vui lòng làm theo hướng dẫn sau để truy cập chức năng mong muốn.',
            audioFile: genericAudio('Bạn đang ở màn hình trang chủ, vui lòng làm theo hướng dẫn sau để truy cập chức năng mong muốn.')
        },
        fields: [
            {
                field: 'Screen',
                fieldName: 'Lựa chọn màn hình',
                type: FIELD_TYPE.CHOICE,
                choiceList: ['1', '2', '3'],
                dataType: FIELD_DATA_TYPE.NUMBER,
                errorRecognized: {
                    title: 'Hệ thống chưa nhận được phản hồi của bạn',
                    audioFile: genericAudio('Hệ thống chưa nhận được phản hồi của bạn')
                },
                skipNext: 'Bỏ qua',
                validate: [
                    {
                        rule: 'required',
                        title: 'Nội dung không chính xác.',
                        audioFile: genericAudio('Nội dung không chính xác.')
                    }
                ],
                title: `Nói 1, Để truy cập chức năng đăng ký, cập nhập thông tin người khuyết tật ; Nói 2, Để truy cập chức năng cập nhật nhu cầu hỗ trợ. Nói 3, Để truy cập chức năng đăng ký Cấp, cấp lại giấy xác nhận khuyết tật;  xác định, xác định lại mức độ khuyết tật.`,
                audioFile: genericAudio('Nói 1, Để truy cập chức năng đăng ký, cập nhập thông tin người khuyết tật ; Nói 2, Để truy cập chức năng cập nhật nhu cầu hỗ trợ. Nói 3, Để truy cập chức năng đăng ký Cấp, cấp lại giấy xác nhận khuyết tật;  xác định, xác định lại mức độ khuyết tật.'),
            },
        ],
        submit: {
            method: 'POST',
            url: 'apiNavHomeSubmit',
        }
    }
}
export const apiNavHomeSubmit = ({ Screen = '' }, userId) => {
    if (['1'].includes(Screen))
        return respDangKyCapNhatNav(userId);
    else if (['2'].includes(Screen))
        return respCapNhatHoTroNav(userId);
    else if (['3'].includes(Screen))
        navigate(CAPGIAY_XNKT);

    return responseComingsoon({ method: 'GET', url: 'apiNavHome' })
}
