import {FIELD_DATA_TYPE, FIELD_TYPE, I_Request, REQUEST_TYPE} from '../../../library/utils/BotAssistant';
import {apiNavHome, callAPI, genericAudio, resapiNavHome} from "./data";
import {Log, logfix} from "./utils";

export const respDangKyCapNhatNav = (userId) => {
    logfix("1.8 respDangKyCapNhatNav")
    return {
        type: REQUEST_TYPE.NAVIGATE,
        intro: {
            title: 'Bạn đang ở màn hình chức năng đăng ký, cập nhật thông tin người khuyết tật.',
            audioFile: genericAudio('Bạn đang ở màn hình chức năng đăng ký, cập nhật thông tin người khuyết tật.')
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
            url: 'apiDangKyCapNhatNavSubmit',
        }
    }
}

export const apiDangKyCapNhatNavSubmit = async ({confirm}, userId) => {
    Log.w("I.0 apiDangKyCapNhatNavSubmit")
    Log.g("I.1 error",confirm)
    Log.g("I.3 confirm2 (failed)",confirm)
    if (['đồng ý', 'Đồng ý'].includes(confirm))//fix this
    {
        Log.b('case dong y')
        return await respDangKyCapNhatForm(userId);
    } else if (['Huy', 'Hủy', 'hủy', 'huy'].includes(confirm))//fix this
    {
        Log.g("I.2 case Huy")
        return apiNavHome(userId);
    } else return apiNavHome(userId)
}

export const respDangKyCapNhatForm = async (userId) => {
    logfix("2.1 respDangKyCapNhatForm")
    // userId = 0;
    const data = await callAPI({method: 'get', url: 'api/v1/AI_Voice/DangKyThongTin', data: {}, userId});
    return data;
}

export const apiDangKyCapNhatSaved = ({confirm}) => {
    logfix("2.2 apiDangKyCapNhatSaved")
    return apiNavHome();
    if (['đồng ý', 'Đồng ý'].includes(confirm))
        return apiNavHome();
    else
        return respDangKyCapNhatNav()
}

export const apiDangKyCapNhatFormStepSubmit = async (data, userId) => {//fix this
    logfix("2.3 apiDangKyCapNhatFormStepSubmit")
    const {confirm} = data;
    console.log('fix 1.1', confirm)
    if (["Quay lại", "hủy"].findIndex(e => e.toLowerCase() == String(confirm).toLowerCase()) >= 0) {
        return apiNavHome();
    }
    const resp: I_Request = await callAPI({
        method: "POST",
        data,
        userId,
        url: 'https://apinkt.dttt.vn/api/v1/NNBM_ThongTinChung/UpdateByVoice'
    });
    return resp;
}

export const apiDangKyCapNhatFormErrorContinueSubmit = async (data, userId) => {
    logfix("2.4 apiDangKyCapNhatFormErrorContinueSubmit")
    const {confirm, request} = data;
    if (["tạo mới"].findIndex(e => e.toLowerCase() == String(confirm).toLowerCase()) >= 0) {
        await DangKyCapNhatSaveFormInvalid_Remove();
        return await respDangKyCapNhatForm(userId);
    } else {
        return {...request, isAutoContinue: true};
    }
}

const apiFake = () => {
    return {
        "type": "REQUEST_TYPE.FORM",
        "intro": {
            "title": "Bạn đang ở màn hình chức năng đăng ký, cập nhật thông tin người khuyết tật. vui lòng làm theo hướng dẫn sau để cập nhật thông tin.\nVới những trường cần nhập thông tin, bạn nói rõ thông tin cần trả lời, để hệ thống lưu lại thông tin của bạn. Với những trường chọn câu trả lời tương ứng, bạn nghe và làm theo hướng dẫn. Với những trường bạn không có thông tin hãy nói Bỏ qua",
            "audioFile": "\\UserData\\AudioDieuHuong\\1\\1.mp3"
        },
        "errorRecognized": {
            "title": "hệ thống chưa nhận được phản hồi của bạn",
            "audioFile": "\\UserData\\AudioDieuHuong\\1\\13.mp3"
        },
        "fields": [
            {
                "field": "A1_GiayXacNhanKhuyetTat",
                "fieldName": "A1. Giấy xác nhận khuyết tật",
                "type": "CHOICE",
                "dataType": "NUMBER ",
                "choiceList": [
                    "1",
                    "2"
                ],
                "errorRecognized": {
                    "title": "hệ thống chưa nhận được phản hồi của bạn",
                    "audioFile": "\\UserData\\AudioDieuHuong\\1\\4.mp3"
                },
                "skipNext": "Bỏ qua",
                "validate": [
                    {
                        "rule": "required",
                        "title": "Nội dung không chính xác.  Nói 1 nếu có giấy xác nhận khuyết tật, nói 2 nếu không có ",
                        "audioFile": "\\UserData\\AudioDieuHuong\\1\\3.mp3"
                    }
                ],
                "title": "Giấy xác nhận khuyết tật.  đây là trường bắt buộc nhập thông tin. Nói 1 nếu có giấy xác nhận khuyết tật. nói 2 nếu không có.",
                "audioFile": "\\UserData\\AudioDieuHuong\\1\\2.mp3",
                "tempFieldArray": null,
                "refJoin": [
                    {
                        "value": [
                            "1"
                        ],
                        "field": "A2_MaSo"
                    },
                    {
                        "value": [
                            "2"
                        ],
                        "field": "A4_HoTen"
                    }
                ],
                "group": 1
            },
            {
                "field": "A2_MaSo",
                "fieldName": "A2. Mã số giấy xác nhận khuyết tật",
                "type": "TEXT",
                "dataType": "TEXT",
                "choiceList": null,
                "errorRecognized": {
                    "title": "hệ thống chưa nhận được phản hồi của bạn",
                    "audioFile": "\\UserData\\AudioDieuHuong\\1\\4.mp3"
                },
                "skipNext": "Bỏ qua",
                "validate": [
                    {
                        "rule": "required",
                        "title": "hệ thống chưa nhận được phản hồi của bạn",
                        "audioFile": "\\UserData\\AudioDieuHuong\\1\\13.mp3"
                    },
                    {
                        "rule": "remote",
                        remoteUrl: 'tesstt',
                        remoteFields: ['A3_NgayCap', 'A1_GiayXacNhanKhuyetTat']
                    },
                ],
                "title": "Mã số giấy xác nhận khuyết tật. Đây là trường bắt buộc nhập thông tin",
                "audioFile": "\\UserData\\AudioDieuHuong\\1\\5.mp3",
                "tempFieldArray": null,
                "refJoin": [],
                "group": 1
            },
            {
                "field": "A3_NgayCap",
                "fieldName": "A3. Ngày cấp giấy xác nhận",
                "type": "TEXT",
                "dataType": "DATETIME",
                "choiceList": null,
                "errorRecognized": {
                    "title": "hệ thống chưa nhận được phản hồi của bạn",
                    "audioFile": "\\UserData\\AudioDieuHuong\\1\\4.mp3"
                },
                "skipNext": "Bỏ qua",
                "validate": [
                    {
                        "rule": "required",
                        "title": "hệ thống chưa nhận được phản hồi của bạn",
                        "audioFile": "\\UserData\\AudioDieuHuong\\1\\13.mp3"
                    }
                ],
                "title": "Ngày cấp giấy xác nhận khuyết tật. Đây là trường bắt buộc nhập thông tin",
                "audioFile": "\\UserData\\AudioDieuHuong\\1\\6.mp3",
                "tempFieldArray": null,
                "refJoin": [],
                "group": 1
            },
            {
                "field": "HoiDongXacNhan",
                "fieldName": "Hội đồng xác nhận",
                "type": "TEXT",
                "dataType": "TEXT",
                "choiceList": null,
                "errorRecognized": {
                    "title": "hệ thống chưa nhận được phản hồi của bạn. Nói bỏ qua nếu không có thông tin",
                    "audioFile": "\\UserData\\AudioDieuHuong\\1\\8.mp3"
                },
                "skipNext": "Bỏ qua",
                "validate": [],
                "title": " Hội đồng xác nhận khuyết tật",
                "audioFile": "\\UserData\\AudioDieuHuong\\1\\7.mp3",
                "tempFieldArray": null,
                "refJoin": [],
                "group": 1
            },
            {
                "field": "A4_HoTen",
                "fieldName": "A4. Họ và tên",
                "type": "TEXT",
                "dataType": "TEXT",
                "choiceList": null,
                "errorRecognized": {
                    "title": "hệ thống chưa nhận được phản hồi của bạn",
                    "audioFile": "\\UserData\\AudioDieuHuong\\1\\4.mp3"
                },
                "skipNext": "Bỏ qua",
                "validate": [
                    {
                        "rule": "required",
                        "title": "hệ thống chưa nhận được phản hồi của bạn",
                        "audioFile": "\\UserData\\AudioDieuHuong\\1\\13.mp3"
                    }
                ],
                "title": "Họ và tên người khuyết tật, đây là trường bắt buộc nhập thông tin. ",
                "audioFile": "\\UserData\\AudioDieuHuong\\1\\9.mp3",
                "tempFieldArray": null,
                "refJoin": [],
                "group": 1
            },
            {
                "field": "A5_NgaySinh",
                "fieldName": "A5. Ngày tháng năm sinh",
                "type": "TEXT",
                "dataType": "DATETIME",
                "choiceList": null,
                "errorRecognized": {
                    "title": "hệ thống chưa nhận được phản hồi của bạn",
                    "audioFile": "\\UserData\\AudioDieuHuong\\1\\4.mp3"
                },
                "skipNext": "Bỏ qua",
                "validate": [
                    {
                        "rule": "required",
                        "title": "hệ thống chưa nhận được phản hồi của bạn",
                        "audioFile": "\\UserData\\AudioDieuHuong\\1\\13.mp3"
                    }
                ],
                "title": "Ngày sinh. Đây là trường bắt buộc nhập thông tin",
                "audioFile": "\\UserData\\AudioDieuHuong\\1\\10.mp3",
                "tempFieldArray": null,
                "refJoin": [],
                "group": 1
            },
            {
                "field": "A6_GioiTinh",
                "fieldName": "A6. Giới tính",
                "type": "CHOICE",
                "dataType": "NUMBER ",
                "choiceList": [
                    "1",
                    "2"
                ],
                "errorRecognized": {
                    "title": "hệ thống chưa nhận được phản hồi của bạn",
                    "audioFile": "\\UserData\\AudioDieuHuong\\1\\13.mp3"
                },
                "skipNext": "Bỏ qua",
                "validate": [
                    {
                        "rule": "choice_in",
                        "title": "o   Nội dung không chính xác. Nói 1 nếu là Nam, nói 2 nếu là nữ",
                        "audioFile": "\\UserData\\AudioDieuHuong\\1\\12.mp3"
                    }
                ],
                "title": "Giới tính. Nói 1 nếu là Nam. Nói 2 nếu là nữ",
                "audioFile": "\\UserData\\AudioDieuHuong\\1\\11.mp3",
                "tempFieldArray": null,
                "refJoin": [],
                "group": 1
            },
            {
                "field": "A7_DanToc",
                "fieldName": "A7. Dân tộc",
                "type": "TEXT",
                "dataType": "TEXT",
                "choiceList": null,
                "errorRecognized": {
                    "title": "hệ thống chưa nhận được phản hồi của bạn",
                    "audioFile": "\\UserData\\AudioDieuHuong\\1\\13.mp3"
                },
                "skipNext": "Bỏ qua",
                "validate": [],
                "title": " Dân tộc: Vui lòng đọc rõ dân tộc của bạn",
                "audioFile": "\\UserData\\AudioDieuHuong\\1\\14.mp3",
                "tempFieldArray": null,
                "refJoin": [],
                "group": 1
            },
            {
                "field": "B1_MaHo",
                "fieldName": "B1. Mã hộ",
                "type": "TEXT",
                "dataType": "TEXT",
                "choiceList": null,
                "errorRecognized": {
                    "title": "hệ thống chưa nhận được phản hồi của bạn",
                    "audioFile": "\\UserData\\AudioDieuHuong\\1\\13.mp3"
                },
                "skipNext": "Bỏ qua",
                "validate": [],
                "title": "TIẾP THEO LÀ NỘI DUNG THÔNG TIN HỘ GIA ĐÌNH\n\n  Mã hộ",
                "audioFile": "\\UserData\\AudioDieuHuong\\1\\85.mp3",
                "tempFieldArray": null,
                "refJoin": [],
                "group": 2
            },
            {
                "field": "B2_ChuHo_HoTen",
                "fieldName": "B2.1. Họ và tên chủ hộ",
                "type": "TEXT",
                "dataType": "TEXT",
                "choiceList": null,
                "errorRecognized": {
                    "title": "hệ thống chưa nhận được phản hồi của bạn",
                    "audioFile": "\\UserData\\AudioDieuHuong\\1\\13.mp3"
                },
                "skipNext": "Bỏ qua",
                "validate": [
                    {
                        "rule": "required",
                        "title": "hệ thống chưa nhận được phản hồi của bạn",
                        "audioFile": "\\UserData\\AudioDieuHuong\\1\\13.mp3"
                    }
                ],
                "title": "+       Họ và tên chủ hộ",
                "audioFile": "\\UserData\\AudioDieuHuong\\1\\87.mp3",
                "tempFieldArray": null,
                "refJoin": [],
                "group": 2
            },
            {
                "field": "B2_NgaySinhChuHo",
                "fieldName": "B2.2. Ngày sinh",
                "type": "TEXT",
                "dataType": "DATETIME",
                "choiceList": null,
                "errorRecognized": {
                    "title": "hệ thống chưa nhận được phản hồi của bạn",
                    "audioFile": "\\UserData\\AudioDieuHuong\\1\\13.mp3"
                },
                "skipNext": "Bỏ qua",
                "validate": [],
                "title": "+       Ngày sinh chủ hộ",
                "audioFile": "\\UserData\\AudioDieuHuong\\1\\89.mp3",
                "tempFieldArray": null,
                "refJoin": [],
                "group": 2
            },
            {
                "field": "B2_SoCMNDChuHo",
                "fieldName": "B2.3. Số CMND/CCCD hoặc mã số đinh danh cá nhân:",
                "type": "TEXT",
                "dataType": "TEXT",
                "choiceList": null,
                "errorRecognized": {
                    "title": "hệ thống chưa nhận được phản hồi của bạn",
                    "audioFile": "\\UserData\\AudioDieuHuong\\1\\13.mp3"
                },
                "skipNext": "Bỏ qua",
                "validate": [],
                "title": "+       Số chứng minh nhân dân/ căn cước công dân hoặc mã số định danh của chủ hộ",
                "audioFile": "\\UserData\\AudioDieuHuong\\1\\91.mp3",
                "tempFieldArray": null,
                "refJoin": [],
                "group": 2
            },
            {
                "field": "B2_NgayCap",
                "fieldName": "Ngày cấp:",
                "type": "TEXT",
                "dataType": "DATETIME",
                "choiceList": null,
                "errorRecognized": {
                    "title": "hệ thống chưa nhận được phản hồi của bạn",
                    "audioFile": "\\UserData\\AudioDieuHuong\\1\\13.mp3"
                },
                "skipNext": "Bỏ qua",
                "validate": [],
                "title": "+       Ngày cấp",
                "audioFile": "\\UserData\\AudioDieuHuong\\1\\93.mp3",
                "tempFieldArray": null,
                "refJoin": [],
                "group": 2
            },
            {
                "field": "B2_NoiCap",
                "fieldName": "Nơi cấp:",
                "type": "TEXT",
                "dataType": "TEXT",
                "choiceList": null,
                "errorRecognized": {
                    "title": "hệ thống chưa nhận được phản hồi của bạn",
                    "audioFile": "\\UserData\\AudioDieuHuong\\1\\13.mp3"
                },
                "skipNext": "Bỏ qua",
                "validate": [],
                "title": "+       Nơi cấp",
                "audioFile": "\\UserData\\AudioDieuHuong\\1\\95.mp3",
                "tempFieldArray": null,
                "refJoin": [],
                "group": 2
            },
            {
                "field": "B2_SoDienThoai",
                "fieldName": "B2.4. Số điện thoại chủ hộ:",
                "type": "TEXT",
                "dataType": "TEXT",
                "choiceList": null,
                "errorRecognized": {
                    "title": "hệ thống chưa nhận được phản hồi của bạn",
                    "audioFile": "\\UserData\\AudioDieuHuong\\1\\13.mp3"
                },
                "skipNext": "Bỏ qua",
                "validate": [],
                "title": "Số điện thoại chủ hộ",
                "audioFile": "\\UserData\\AudioDieuHuong\\1\\97.mp3",
                "tempFieldArray": null,
                "refJoin": [],
                "group": 2
            },
            {
                "field": "B7_SoNhanKhau_NguoiCaoTuoi",
                "fieldName": "5. Số người cao tuổi (từ 60 tuổi trở lên):",
                "type": "CHOICE",
                "dataType": "NUMBER ",
                "choiceList": null,
                "errorRecognized": {
                    "title": "hệ thống chưa nhận được phản hồi của bạn",
                    "audioFile": "\\UserData\\AudioDieuHuong\\1\\13.mp3"
                },
                "skipNext": "Bỏ qua",
                "validate": [
                    {
                        "rule": "choice_in",
                        "title": "hệ thống chưa nhận được phản hồi của bạn",
                        "audioFile": "\\UserData\\AudioDieuHuong\\1\\13.mp3"
                    }
                ],
                "title": "Số người cao tuổi từ 60 tuổi trở lên",
                "audioFile": "\\UserData\\AudioDieuHuong\\1\\121.mp3",
                "tempFieldArray": null,
                "refJoin": [],
                "group": 2
            },
            {
                "field": "ThanhVien",
                "fieldName": null,
                "type": "ARRAY",
                "dataType": "",
                "choiceList": [
                    "có",
                    "không"
                ],
                "errorRecognized": {
                    "title": "hệ thống chưa nhận được phản hồi của bạn",
                    "audioFile": "\\UserData\\AudioDieuHuong\\1\\13.mp3"
                },
                "skipNext": "Bỏ qua",
                "validate": [],
                "title": "Thành viên trong gia đình. Nếu muốn thêm thành viên hãy nói Có, không muốn thêm thành viên hãy nói Không",
                "audioFile": "\\UserData\\AudioDieuHuong\\1\\123.mp3",
                "tempFieldArray": [
                    {
                        "field": "HoTen",
                        "fieldName": "Chi tiết thành viên trong gia đình: Họ và tên",
                        "type": "TEXT",
                        "dataType": "TEXT",
                        "choiceList": null,
                        "errorRecognized": {
                            "title": "hệ thống chưa nhận được phản hồi của bạn",
                            "audioFile": "\\UserData\\AudioDieuHuong\\1\\13.mp3"
                        },
                        "skipNext": "Bỏ qua",
                        "validate": [],
                        "title": "o   Họ và tên",
                        "audioFile": "\\UserData\\AudioDieuHuong\\1\\125.mp3",
                        "tempFieldArray": null,
                        "refJoin": null,
                        "group": 0
                    },
                    {
                        "field": "NgaySinh",
                        "fieldName": "Ngày sinh",
                        "type": "TEXT",
                        "dataType": "DATETIME",
                        "choiceList": null,
                        "errorRecognized": {
                            "title": "hệ thống chưa nhận được phản hồi của bạn",
                            "audioFile": "\\UserData\\AudioDieuHuong\\1\\13.mp3"
                        },
                        "skipNext": "Bỏ qua",
                        "validate": [],
                        "title": "o   Ngày sinh",
                        "audioFile": "\\UserData\\AudioDieuHuong\\1\\126.mp3",
                        "tempFieldArray": null,
                        "refJoin": null,
                        "group": 0
                    },
                    {
                        "field": "CMND",
                        "fieldName": "CMND/CCCD",
                        "type": "TEXT",
                        "dataType": "TEXT",
                        "choiceList": null,
                        "errorRecognized": {
                            "title": "hệ thống chưa nhận được phản hồi của bạn",
                            "audioFile": "\\UserData\\AudioDieuHuong\\1\\13.mp3"
                        },
                        "skipNext": "Bỏ qua",
                        "validate": [],
                        "title": "o   Chứng minh nhân dân hoặc căn cước công dân",
                        "audioFile": "\\UserData\\AudioDieuHuong\\1\\127.mp3",
                        "tempFieldArray": null,
                        "refJoin": null,
                        "group": 0
                    },
                ],
                "refJoin": [],
                "group": 2
            },
            {
                "field": "B8_NguonThuNhap_TCBTXH\n",
                "fieldName": "B8. Nguồn thu nhập hiện nay:\n1. Trợ cấp bảo trợ xã hội",
                "type": "",
                "dataType": "",
                "choiceList": [
                    "có",
                    "không"
                ],
                "errorRecognized": {
                    "title": "hệ thống chưa nhận được phản hồi của bạn",
                    "audioFile": "\\UserData\\AudioDieuHuong\\1\\13.mp3"
                },
                "skipNext": "Bỏ qua",
                "validate": [],
                "title": "Nguồn thu nhập hiện nay:  Nói Có với nguồn thu nhập tương ứng của gia đình. Nói Không với nguồn thu nhập không tương ứng\n\n1. Trợ cấp bảo trợ xã hội",
                "audioFile": "\\UserData\\AudioDieuHuong\\1\\137.1.mp3",
                "tempFieldArray": null,
                "refJoin": [],
                "group": 2
            }
        ],
        "confirm": {
            "field": null,
            "fieldName": null,
            "type": null,
            "dataType": null,
            "choiceList": [
                "Lưu",
                "Gửi đơn"
            ],
            "errorRecognized": null,
            "skipNext": null,
            "validate": null,
            "title": "Bạn đã hoàn thành nhập thông tin chung và thông tin thực trạng, vui lòng nói Lưu để lưu lại thông tin. Sau đó nói Gửi đơn để gửi đơn lên xã duyệt",
            "audioFile": "\\UserData\\AudioDieuHuong\\1\\536.mp3",
            "tempFieldArray": null,
            "refJoin": null,
            "group": 0
        },
        "submit": {
            "url": "https://apinkt.dttt.vn/api/v1/NNBM_ThongTinChung/UpdateByVoice",
            "method": "POST"
        },
        "saved": {
            "id": 0,
            "userId": -999,
            "a1_GiayXacNhanKhuyetTat": null,
            "a2_MaSo": null,
            "a3_NgayCap": null,
            "a4_HoTen": null,
            "a5_NgaySinh": null,
            "a6_GioiTinh": null,
            "a7_DanToc": null,
            "a7_DanToc_KhacText": null,
            "a8_CMND": null,
            "a9_MaDinhDanh": null,
            "a10_MaASXH": null,
            "a11_SoDienThoai": null,
            "a12_HKTT_Tinh": null,
            "a12_HKTT_Huyen": null,
            "a12_HKTT_Xa": null,
            "a12_HKTT_Thon": null,
            "a13_NOHT_Tinh": null,
            "a13_NOHT_Huyen": null,
            "a13_NOHT_Xa": null,
            "a13_NOHT_Thon": null,
            "a14_TinhTrangHonNhan": null,
            "b1_MaHo": null,
            "b2_ChuHo_HoTen": null,
            "b3_ChuHo_GioiTinh": null,
            "b4_ChuHo_QuanHeVoiNKT": null,
            "b4_ChuHo_QuanHeVoiNKT_KhacText": null,
            "b5_NgheNghiep_KVL": null,
            "b5_NgheNghiep_TSXKD": null,
            "b5_NgheNghiep_LTM": null,
            "b5_NgheNghiep_LNN": null,
            "b5_NgheNghiep_CVC": null,
            "b5_NgheNghiep_CN": null,
            "b5_NgheNghiep_HT": null,
            "b5_NgheNghiep_Khac": null,
            "b5_NgheNghiep_KhacText": null,
            "b6_HoanCanhKinhTe": null,
            "b7_SoNhanKhau_Tong": null,
            "b7_SoNhanKhau_NKT": null,
            "b7_SoNhanKhau_TreDuoi16": null,
            "b7_SoNhanKhau_NguoiLaoDong": null,
            "b7_SoNhanKhau_NguoiCaoTuoi": null,
            "b8_NguonThuNhap_TCBTXH": null,
            "b8_NguonThuNhap_Luong": null,
            "b8_NguonThuNhap_HTGD": null,
            "b8_NguonThuNhap_KTH": null,
            "b8_NguonThuNhap_Khac": null,
            "b8_NguonThuNhap_KhacText": null,
            "b9_ThuNhapHo": null,
            "b10_ThuNhapBinhQuan": null,
            "c1_DangKhuyetTat_VD": null,
            "c1_DangKhuyetTat_Nhin": null,
            "c1_DangKhuyetTat_NgheNoi": null,
            "c1_DangKhuyetTat_TK": null,
            "c1_DangKhuyetTat_TT": null,
            "c1_DangKhuyetTat_CXD": null,
            "c1_DangKhuyetTat_Khac": null,
            "c1_DangKhuyetTat_KhacText": null,
            "c2_MucDoKhuyetTat": null,
            "c3_NguyenNhanKhuyetTat_BS": null,
            "c3_NguyenNhanKhuyetTat_BT": null,
            "c3_NguyenNhanKhuyetTat_TNLD": null,
            "c3_NguyenNhanKhuyetTat_TNSH": null,
            "c3_NguyenNhanKhuyetTat_TNGT": null,
            "c3_NguyenNhanKhuyetTat_TNBM": null,
            "c3_NguyenNhanKhuyetTat_CT": null,
            "c3_NguyenNhanKhuyetTat_Khac": null,
            "c3_NguyenNhanKhuyetTat_KhacText": null,
            "c4_ThoiDiemXayRaTaiNan": null,
            "c4_ThoiDiemXayRaTaiNan_Ngay": null,
            "c4_DiaDiemXayRaTaiNan_Tinh": null,
            "c4_DiaDiemXayRaTaiNan_Huyen": null,
            "c4_DiaDiemXayRaTaiNan_Xa": null,
            "c4_DiaDiemXayRaTaiNan_Thon": null,
            "c4_DiaDiemXayRaTaiNan_KhacText": null,
            "c4_KhuVucXayRaTaiNan_KDC": null,
            "c4_KhuVucXayRaTaiNan_TH": null,
            "c4_KhuVucXayRaTaiNan_CCQS": null,
            "c4_KhuVucXayRaTaiNan_NTMPL": null,
            "c4_KhuVucXayRaTaiNan_CSSX": null,
            "c4_KhuVucXayRaTaiNan_Ruong": null,
            "c4_KhuVucXayRaTaiNan_Duong": null,
            "c4_KhuVucXayRaTaiNan_BS": null,
            "c4_KhuVucXayRaTaiNan_Rung": null,
            "c4_KhuVucXayRaTaiNan_Khac": null,
            "c4_KhuVucXayRaTaiNan_KhacText": null,
            "c4_LoaiVuKhiGayTaiNan_Bom": null,
            "c4_LoaiVuKhiGayTaiNan_Min": null,
            "c4_LoaiVuKhiGayTaiNan_Dan": null,
            "c4_LoaiVuKhiGayTaiNan_Kip": null,
            "c4_LoaiVuKhiGayTaiNan_VKTC": null,
            "c4_LoaiVuKhiGayTaiNan_KXD": null,
            "c4_LoaiVuKhiGayTaiNan_Khac": null,
            "c4_LoaiVuKhiGayTaiNan_KhacText": null,
            "c4_HoanCanhGayRaTaiNan_SX": null,
            "c4_HoanCanhGayRaTaiNan_KH": null,
            "c4_HoanCanhGayRaTaiNan_SXGD": null,
            "c4_HoanCanhGayRaTaiNan_CTGS": null,
            "c4_HoanCanhGayRaTaiNan_XD": null,
            "c4_HoanCanhGayRaTaiNan_RTPL": null,
            "c4_HoanCanhGayRaTaiNan_CDVLN": null,
            "c4_HoanCanhGayRaTaiNan_CD": null,
            "c4_HoanCanhGayRaTaiNan_DungGan": null,
            "c4_HoanCanhGayRaTaiNan_CT": null,
            "c4_HoanCanhGayRaTaiNan_Khac": null,
            "c4_HoanCanhGayRaTaiNan_KhacText": null,
            "c5_KhoKhanVanDong_MNCCTT": null,
            "c5_KhoKhanVanDong_DTCS": null,
            "c5_KhoKhanVanDong_MMPC": null,
            "c5_KhoKhanVanDong_NXL": null,
            "c5_KhoKhanVanDong_KTDL": null,
            "c5_KhoKhanVanDong_Khac": null,
            "c5_KhoKhanVanDong_KhacText": null,
            "c5_KhoKhanNgheNoi_Diec": null,
            "c5_KhoKhanNgheNoi_TT": null,
            "c5_KhoKhanNgheNoi_KND": null,
            "c5_KhoKhanNgheNoi_DBS": null,
            "c5_KhoKhanNgheNoi_DD": null,
            "c5_KhoKhanNgheNoi_KH": null,
            "c5_KhoKhanNgheNoi_Khac": null,
            "c5_KhoKhanNgheNoi_KhacText": null,
            "c5_KhoKhanThiLuc_KCM": null,
            "c5_KhoKhanThiLuc_NKR": null,
            "c5_KhoKhanThiLuc_DT": null,
            "c5_KhoKhanThiLuc_Khac": null,
            "c5_KhoKhanThiLuc_KhacText": null,
            "c5_VanDeThanKinh_TTPL": null,
            "c5_VanDeThanKinh_BDK": null,
            "c5_VanDeThanKinh_RLCX": null,
            "c5_VanDeThanKinh_Khac": null,
            "c5_VanDeThanKinh_KhacText": null,
            "c5_VanDeTriTue_Down": null,
            "c5_VanDeTriTue_CC": null,
            "c5_VanDeTriTue_KK": null,
            "c5_VanDeTriTue_Khac": null,
            "c5_VanDeTriTue_KhacText": null,
            "c5_VanDeDangKhuyetTatKhac_DD": null,
            "c5_VanDeDangKhuyetTatKhac_DC": null,
            "c5_VanDeDangKhuyetTatKhac_TL": null,
            "c5_VanDeDangKhuyetTatKhac_TK": null,
            "c5_VanDeDangKhuyetTatKhac_Khac": null,
            "c5_VanDeDangKhuyetTatKhac_KhacText": null,
            "c6_KhaNangTuPhucVu": null,
            "d1_ThucTrangGiaoDuc": null,
            "d2_ThucTrangDayNghe": null,
            "d2_ThucTrangDayNghe_KhacText": null,
            "d2_ThoiGianHocNghe": null,
            "d3_ThucTrangViecLam": null,
            "d3_ThuNhapBinhQuan": null,
            "d3_NguonThuNhap_SXKD": null,
            "d3_NguonThuNhap_NN": null,
            "d3_NguonThuNhap_CVC": null,
            "d3_NguonThuNhap_CN": null,
            "d3_NguonThuNhap_HT": null,
            "d3_NguonThuNhap_TCXH": null,
            "d3_NguonThuNhap_Khac": null,
            "d3_NguonThuNhap_KhacText": null,
            "d3_LyDoKhongCoViec": null,
            "d3_LyDoKhongCoViec_KhacText": null,
            "d4_TroCapBTXH": null,
            "d4_TroCapBTXH_SoTien": null,
            "d4_TroCapChamSocNKT": null,
            "d4_TroCapChamSocNKT_SoTien": null,
            "d5_TongSoConCuaNKT": null,
            "d5_TongSoConDuoi16": null,
            "d5_NamSinhCon1": null,
            "d5_NamSinhCon2": null,
            "d5_NamSinhCon3": null,
            "d5_NamSinhCon4": null,
            "d6_NKTMangThaiHoacNuoiConNho": null,
            "d7_NoiChamSocNKT": null,
            "dD1_NhaO": null,
            "dD1_NuocSinhHoat": null,
            "dD1_NhaVeSinh": null,
            "dD2_CoTheDiChuyenTrongNha": null,
            "dD2_CoTheSuDungNhaVeSinh": null,
            "dD2_Khac": null,
            "e1_TamLy": null,
            "e1_TamLy_KhacText": null,
            "e2_ThamGiaHoatDongCongDong": null,
            "e2_ThamGiaHoatDongTapThe": null,
            "e2_ThamGiaHoatDongGiaDinh": null,
            "e2_ThamGiaHoatDongKhac": null,
            "e3_NangLucKyNangSong_SDL": null,
            "e3_NangLucKyNangSong_GT": null,
            "e3_NangLucKyNangSong_HDTT": null,
            "e3_NangLucKyNangSong_Khac": null,
            "e3_NangLucKyNangSong_KhacText": null,
            "e4_TiepCanGiaoThongVaCongTrinh": null,
            "e5_TiepCanVanHoa": null,
            "e5_TiepCanTheThao": null,
            "e6_TroGiupPhapLy": null,
            "e6_TroGiupPhapLy_KhacText": null,
            "ngayTao": null,
            "nguoiTao": -999,
            "ngayCapNhat": null,
            "nguoiCapNhat": null,
            "daCapGiayChungNhan": null,
            "nguoiCap": null,
            "ngayCap": null,
            "loaiDoiTuong": null,
            "maQuyetDinh": null,
            "ngayQuyetDinh": null,
            "trangThai": 0,
            "xnkT_QueQuanMaTinh": null,
            "xnkT_QueQuanMaHuyen": null,
            "xnkT_HoanCanhCaNhan": null,
            "xnkT_TrangThai": null,
            "xnkT_NgayDuyet": null,
            "xnkT_NguoiDuyet": null,
            "xnkT_GiayToKhac": null,
            "hoiDongXacNhan": null,
            "ngayDuyet": null,
            "nguoiDuyet": null,
            "lyDoKhongDuyet": null,
            "isTangLen1Con": null,
            "isTangLen2Con": null,
            "isAnCBVuot36Thang": null,
            "isAnCBDuoi16Len1659": null,
            "isAnCBTu1659Len60": null,
            "isTrungTamBTXH": null,
            "a8_CMND_NgayCap": null,
            "a8_CMND_NoiCap": null,
            "a9_MSDD_NgayCap": null,
            "a9_MSDD_NoiCap": null,
            "a11_Email": null,
            "a17_TenTruongDangDiHoc": null,
            "a18_ViTheTrongGiaDinh": null,
            "b2_NgaySinhChuHo": null,
            "b2_SoCMNDChuHo": null,
            "b2_NgayCap": null,
            "b2_NoiCap": null,
            "b2_SoDienThoai": null,
            "b11_ChiPhi_LuongThuc": null,
            "b11_ChiPhi_QuanAo": null,
            "b11_ChiPhi_KhamChuaBenh": null,
            "b11_ChiPhi_DongHocPhi": null,
            "b11_ChiPhi_UongThuoc": null,
            "b11_ChiPhi_Khac": null,
            "b12_SuQuanTamChamSoc": null,
            "b12_MoiTruongChamSoc": null,
            "b12_NangLucChamSoc": null,
            "d4_ChuongTrinhTGXHKhac": null,
            "d4_ChuongTrinhTGXHKhac_SoTien": null,
            "d4_DichVuXaHoiCoBan": null,
            "h1_HoTenNguoiGiamHo": null,
            "h2_NgaySinhNguoiGiamHo": null,
            "h3_SoCMNDNguoiGiamHo": null,
            "h4_SoDienThoaiNguoiGiamHo": null,
            "h5_QuanHeVoiNKT": null,
            "h5_QuanHeVoiNKT_Khac": null,
            "h6_DiaChiNguoiGiamHo": null,
            "h6_DiaChi_TinhTP": null,
            "h6_DiaChi_QuanHuyen": null,
            "h6_DiaChi_PhuongXa": null,
            "h6_DiaChi_ThonTo": null,
            "i1_HoTenNguoiKeKhai": null,
            "i2_NgaySinhNguoiKeKhai": null,
            "i3_SoCMNDNguoiKeKhai": null,
            "i4_SoDienThoaiNguoiKeKhai": null,
            "i5_QuanHeVoiNKT": null,
            "i5_QuanHeVoiNKT_Khac": null,
            "i6_DiaChiNguoiKhaiThay": null,
            "i6_DiaChi_TinhTP": null,
            "i6_DiaChi_QuanHuyen": null,
            "i6_DiaChi_PhuongXa": null,
            "i6_DiaChi_ThonTo": null,
            "d4_DichVuXaHoiCoBan_GiaoDuc": null,
            "d4_DichVuXaHoiCoBan_NhaO": null,
            "d4_DichVuXaHoiCoBan_NuocVeSinh": null,
            "d4_DichVuXaHoiCoBan_ThongTin": null,
            "h2_GioiTinhNguoiGiamHo": null,
            "i2_GioiTinhNguoiGiamHo": null,
            "curFild": ""
        },
        "curFild": "",
        "confirmContinue": {
            "audioFile": "\\UserData\\AudioDieuHuong\\1\\540.mp3",
            "title": "Bạn chưa hoàn thành nhập dữ liệu. Nói tạo mới để làm lại, nói tiếp tục để tiếp tục nhập dữ liệu",
            "choiceList": [
                "Tạo mới",
                "Tiếp tục"
            ]
        },
        "domain": "http://nkt.btxh.gov.vn"
    }
}

export const responseDangKyCapNhatSaveData = () => {
    return {
        type: REQUEST_TYPE.NAVIGATE,
        intro: {
            title: 'Đơn của bạn đã được gửi thành công và chờ xã duyệt.',
            audioFile: genericAudio('Đơn của bạn đã được gửi thành công và chờ xã duyệt.')
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
                choiceList: ['Đồng ý'],
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
                title: 'Nói đồng ý để quay lại màn hình chính.',
                audioFile: genericAudio('Nói đồng ý để quay lại màn hình chính.'),
            },
        ],
        submit: {
            method: 'POST',
            url: 'apiDangKyCapNhatSaved',
        }
    }
}