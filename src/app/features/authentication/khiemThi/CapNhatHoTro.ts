import {FIELD_DATA_TYPE, FIELD_TYPE, REQUEST_TYPE} from '../../../library/utils/BotAssistant';
import {apiNavHome, callAPI, convertResponseToObj, genericAudio} from "./data";
import {Log, logfix} from "./utils";

export const respCapNhatHoTroNav = (userId) => {
    logfix(1.1, 'respCapNhatHoTroNav')
    Log.g('J.1 respCapNhatHoTroNav')
    return {
        type: REQUEST_TYPE.NAVIGATE,
        intro: {
            title: 'Bạn đang ở màn hình chức năng cập nhật nhu cầu hỗ trợ.',
            audioFile: genericAudio('Bạn đang ở màn hình chức năng cập nhật nhu cầu hỗ trợ.')
        },
        errorRecognized: {
            title: 'Hệ thống chưa nhận được phản hồi của bạn',
            audioFile: genericAudio('Hệ thống chưa nhận được phản hồi của bạn')
        },
        fields: [
            {
                field: 'confirm',
                fieldName: 'Xác nhận',
                type: FIELD_TYPE.CHOICE,
                choiceList: ['Đồng ý', 'Hủy'],
                isValueInclude: true,
                dataType: FIELD_DATA_TYPE.NUMBER,
                errorRecognized: {
                    title: 'Hệ thống chưa nhận được phản hồi của bạn',
                    audioFile: genericAudio('Hệ thống chưa nhận được phản hồi của bạn')
                },
                skipNext: 'Bỏ qua',
                validate: [
                    {
                        rule: 'required', title: 'Nội dung không chính xác.',
                        audioFile: genericAudio('Nội dung không chính xác.')
                    }
                ],
                title: 'Nói đồng ý để tiếp tục. Nói hủy để quay lại.',
                audioFile: genericAudio('Nói đồng ý để tiếp tục. Nói hủy để quay lại.'),
            },
        ],
        submit: {
            method: 'POST',
            url: 'apiCapNhatHoTroNavSubmit',
        }
    }
}

export const apiCapNhatHoTroNavSubmit = async ({confirm}, userId) => {
    Log.g('J.0 apiCapNhatHoTroNavSubmit')
    Log.g("J.2 apiCapNhatHoTroNavSubmit")
    Log.g("J.3 confirm1 (success)", confirm)
    if (['đồng ý', 'Đồng ý'].includes(confirm))
        return await respCapNhatHoTroForm(userId);
    else if (['Hủy', 'Huy', 'hủy', 'huy', 'qủy', "Quỷ"].includes(confirm))//fix this
    {
        Log.g("J.3 case Huy2 ")
        return apiNavHome()
    } else
        return apiNavHome(userId)
}
export const respCapNhatHoTroForm = async (userId) => {
    logfix(1.5, 'respCapNhatHoTroForm')
    const res = await callAPI({method: 'get', url: 'api/v1/AI_Voice/DangKyHoTro', data: {}, userId});
    return res;
}

export const apiCapNhatHoTroSavedSubmit = async (data, userId) => {
    logfix(1.6, 'apiCapNhatHoTroSavedSubmit')
    const {confirm} = data;
    console.log('fix 1.2', confirm)
    if (["Quay lại", "hủy"].findIndex(e => e.toLowerCase() == String(confirm).toLowerCase()) >= 0) {//fix this
        return apiNavHome();
    } else if (["tiếp tục"].findIndex(e => e.toLowerCase() == String(confirm).toLowerCase()) >= 0) {
        return respCapNhatHoTroForm(userId);
    } else if (["đồng ý", 'gửi đơn'].findIndex(e => e.toLowerCase() == String(confirm).toLowerCase()) >= 0) {
        const fields = new Array(71).fill(1).map((e, index) => `hinhThucHoTro_${index + 1}`);
        const valueMap = ['có'];
        const isValid = fields.filter(f => {
            const _v = Object.entries(data.data).map(([k, v]) => ({
                field: k,
                value: v
            })).find(e => e.field.toLowerCase() == f.toLowerCase())?.value || '';
            return valueMap.findIndex(t => t.toLowerCase() == String(_v).toLowerCase()) >= 0;
        }).length < 1;

        if (isValid)
            return respCapNhatHoTroInvalidForm();
    }
    const resp: I_Request = await callAPI({
        method: "POST",
        data,
        userId,
        url: 'https://apinkt.dttt.vn/api/v1/NNBM_HoTro/UpdateByVoice'
    });
    return resp;
}

const respCapNhatHoTroInvalidForm = () => {
    logfix('1.7 respCapNhatHoTroInvalidForm')
    return {
        type: REQUEST_TYPE.NAVIGATE,
        intro: {
            title: 'Yêu cầu hỗ trợ của bạn không hợp lệ. Bạn chọn tối thiểu 1 nhu cầu để gửi lên cấp xã.',
            audioFile: genericAudio('Yêu cầu hỗ trợ của bạn không hợp lệ. Bạn chọn tối thiểu 1 nhu cầu để gửi lên cấp xã.')
        },
        errorRecognized: {
            title: 'Hệ thống chưa nhận được phản hồi của bạn',
            audioFile: genericAudio('Hệ thống chưa nhận được phản hồi của bạn')
        },
        fields: [
            {
                field: 'confirm',
                fieldName: 'Xác nhận',
                type: FIELD_TYPE.CHOICE,
                choiceList: ['tiếp tục', 'hủy'],
                isValueInclude: true,
                dataType: FIELD_DATA_TYPE.TEXT,
                errorRecognized: {
                    title: 'Hệ thống chưa nhận được phản hồi của bạn',
                    audioFile: genericAudio('Hệ thống chưa nhận được phản hồi của bạn')
                },
                skipNext: 'Bỏ qua',
                validate: [
                    {
                        rule: 'required', title: 'Nội dung không chính xác.',
                        audioFile: genericAudio('Nội dung không chính xác.')
                    }
                ],
                title: 'Nói tiếp tục để nhập lại yêu cầu hỗ trợ, nói hủy để quay lại màn hình chính.',
                audioFile: genericAudio('Nói tiếp tục để nhập lại yêu cầu hỗ trợ, nói hủy để quay lại màn hình chính.'),
            },
        ],
        submit: {
            method: 'POST',
            url: 'apiCapNhatHoTroSavedSubmit',
        }
    }
}