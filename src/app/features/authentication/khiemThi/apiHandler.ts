import LocalStorage from "../../../common/LocalStorage";
import { FIELD_DATA_TYPE, FIELD_TYPE, I_Request, REQUEST_TYPE } from "../../../library/utils/BotAssistant";
import { responseDangKyCapNhatSaveData } from "./DangKyCapNhat";
import { genericAudio } from "./data";

const DANGKYTHONGTIN_INVALID = 'DANGKYTHONGTIN_INVALID';
const DANGKYTHONGTIN_VALID = 'DANGKYTHONGTIN_VALID';
LocalStorage
export const respHandler = async (url: string, resp: I_Request, data) => {
    //#region DANG KY THONG TIN
    if (url.toLowerCase().indexOf('api/v1/AI_Voice/DangKyThongTin'.toLowerCase()) >= 0) {
        const formValid = await LocalStorage.get(DANGKYTHONGTIN_VALID, null);
        const formInvalid = await LocalStorage.get(DANGKYTHONGTIN_INVALID, null);
        if (formInvalid != null)
            return formInvalid;
        if (formValid != null)
            return formValid;

        if (resp.statusId == 1) {
            resp.type = REQUEST_TYPE.NAVIGATE;
            resp.fields = [];
            resp.submit.url = 'apiNavHome';
        }
        else {
            resp.isSaveLocal = true;
            // resp.isForwardData = false;
            resp.confirm = resp.confirm || {};
            resp.confirm.title = "Bạn đã hoàn thành nhập thông tin chung và thông tin thực trạng, vui lòng nói Lưu để lưu lại thông tin hoặc nói quay lại để quay lại màn hình chính.";
            resp.confirm.audioFile = genericAudio('Bạn đã hoàn thành nhập thông tin chung và thông tin thực trạng, vui lòng nói Lưu để lưu lại thông tin hoặc nói quay lại để quay lại màn hình chính.');
            resp.confirm.choiceList = ["Lưu", "Quay lại"]
            resp.submit.url = 'apiDangKyCapNhatFormStepSubmit';
            resp.curFild = '';
            resp.confirmContinue = {
                title: 'Bạn chưa hoàn thành việc nhập dữ liệu, nói tạo mới để tạo mới, nói tiếp tục để tiếp tục nhập dữ liệu.',
                audioFile: genericAudio('Bạn chưa hoàn thành việc nhập dữ liệu, nói tạo mới để tạo mới, nói tiếp tục để tiếp tục nhập dữ liệu.'),
                type: FIELD_TYPE.CHOICE,
                dataType: FIELD_DATA_TYPE.TEXT,
                choiceList: ['tạo mới', 'tiếp tục'],
                ...resp.confirmContinue,
            }
        }
    }
    else if (url.toLowerCase().indexOf('NNBM_ThongTinChung/UpdateByVoice'.toLowerCase()) >= 0) {
        const { confirm } = data;
        if (["lưu"].findIndex(e => e.toLowerCase() == String(confirm).toLowerCase()) >= 0) {
            resp.type = REQUEST_TYPE.FORM;
            resp.isForwardData = true;

            if (resp.intro.title.toLowerCase().indexOf('Có lỗi xảy ra'.toLowerCase()) >= 0) {
                resp.id = 'NNBM_ThongTinChung/UpdateByVoice/Invalid';
                resp.type = REQUEST_TYPE.FORM;
                resp.isForwardData = true;
                resp.isSaveLocal = true;
                resp.intro.title = "Có lỗi xảy ra trong quá trình nhập. Vui lòng kiểm tra lại trường thông tin sau.";
                resp.intro.audioFile = genericAudio('Có lỗi xảy ra trong quá trình nhập. Vui lòng kiểm tra lại trường thông tin sau.');
                resp.confirm = resp.confirm || {};
                resp.confirm.title = "Bạn đã hoàn thành nhập thông tin chung và thông tin thực trạng, vui lòng nói Lưu để lưu lại thông tin hoặc nói quay lại để quay lại màn hình chính.";
                resp.confirm.audioFile = genericAudio('Bạn đã hoàn thành nhập thông tin chung và thông tin thực trạng, vui lòng nói Lưu để lưu lại thông tin hoặc nói quay lại để quay lại màn hình chính.');
                resp.confirm.choiceList = ["Lưu", "Quay lại"]
                resp.confirm.isValueInclude = true;
                resp.submit.url = 'apiDangKyCapNhatFormStepSubmit';
                // resp.submit.urlContinue = 'apiDangKyCapNhatFormErrorContinueSubmit';
                // resp.isAutoContinue = true;
                resp.confirmContinue = {
                    title: 'Bạn chưa hoàn thành việc nhập dữ liệu các thông tin chưa chính xác, nói làm lại để nhập lại, nói tiếp tục để tiếp tục nhập dữ liệu.',
                    audioFile: genericAudio('Bạn chưa hoàn thành việc nhập dữ liệu các thông tin chưa chính xác, nói làm lại để nhập lại, nói tiếp tục để tiếp tục nhập dữ liệu.'),
                    type: FIELD_TYPE.CHOICE,
                    dataType: FIELD_DATA_TYPE.TEXT,
                    choiceList: ['làm lại', 'tiếp tục'],
                    isValueInclude: true,
                }
                resp.fields = resp.fields?.map(e => {
                    e.isSavePartial = false;
                    return e;
                });

                await LocalStorage.set(DANGKYTHONGTIN_INVALID, resp);
            }
            else {
                await LocalStorage.remove(DANGKYTHONGTIN_INVALID);
                resp.id = 'NNBM_ThongTinChung/UpdateByVoice/Valid'
                resp.intro.title = "Bạn đã lưu thành công.";
                resp.intro.audioFile = genericAudio('Bạn đã lưu thành công.');
                resp.fields = [];
                resp.confirm = resp.confirm || {};
                resp.confirm.title = "Nói Gửi đơn để gửi đơn lên xã duyệt, nói quay lại để quay lại màn hình chính.";
                resp.confirm.audioFile = genericAudio('Nói Gửi đơn để gửi đơn lên xã duyệt, nói quay lại để quay lại màn hình chính.');
                resp.confirm.choiceList = ["Gửi đơn", "Quay lại"];
                resp.submit.url = "apiDangKyCapNhatFormStepSubmit";
                await LocalStorage.set(DANGKYTHONGTIN_VALID, resp);
            }
        }
        else if (["gửi đơn"].findIndex(e => e.toLowerCase() == String(confirm).toLowerCase()) >= 0) {
            await LocalStorage.remove(DANGKYTHONGTIN_INVALID);
            await LocalStorage.remove(DANGKYTHONGTIN_VALID);
            return responseDangKyCapNhatSaveData();
        }
    }
    //#endregion

    //#region CAP NHAT HO TRO
    else if (url.toLowerCase().indexOf('api/v1/AI_Voice/DangKyHoTro'.toLowerCase()) >= 0) {
        if (resp.submit.url == 'apiDangKyCapNhatNavSubmit') {

        }
        else {
            resp.isSaveLocal = true;
            // resp.isForwardData = false;
            resp.confirm = resp.confirm || {};
            resp.confirm.title = "Bạn đã hoàn thành việc nhập cập nhật các yêu cầu hỗ trợ. Nói đồng ý để gửi đơn lên cấp xã. Nói hủy, để quay lại màn hình chính.";
            resp.confirm.audioFile = genericAudio('Bạn đã hoàn thành việc nhập cập nhật các yêu cầu hỗ trợ. Nói đồng ý để gửi đơn lên cấp xã. Nói hủy, để quay lại màn hình chính.');
            resp.confirm.choiceList = ["Đồng ý", "Hủy"]
            resp.confirm.isValueInclude = true;
            resp.submit.url = 'apiCapNhatHoTroSavedSubmit';
            resp.voiceSubmit = resp.voiceSubmit || 'Gửi đơn';
            resp.submit.submitHandler = [
                {
                    rule: "counter",
                    fields: new Array(71).fill(1).map((e, index) => `hinhThucHoTro_${index + 1}`),
                    valueMap: ['có'],
                    value: 5
                }
            ];
            resp.confirmContinue = {
                title: 'Bạn chưa hoàn thành việc nhập dữ liệu, nói tạo mới để tạo mới, nói tiếp tục để tiếp tục nhập dữ liệu.',
                audioFile: genericAudio('Bạn chưa hoàn thành việc nhập dữ liệu, nói tạo mới để tạo mới, nói tiếp tục để tiếp tục nhập dữ liệu.'),
                type: FIELD_TYPE.CHOICE,
                dataType: FIELD_DATA_TYPE.TEXT,
                choiceList: ['tạo mới', 'tiếp tục'],
                isValueInclude: true,
                ...resp.confirmContinue,
            }
        }
    }
    else if (url.toLowerCase().indexOf('api/v1/NNBM_HoTro/UpdateByVoice'.toLowerCase()) >= 0) {
        resp.type = REQUEST_TYPE.NAVIGATE;
        resp.fields = [{
            ...resp.fields[0],
            title: 'Nói quay lại để quay lại màn hình chính. Nói tiếp tục để tạo đơn yêu cầu mới.',
            audioFile: genericAudio('Nói quay lại để quay lại màn hình chính. Nói tiếp tục để tạo đơn yêu cầu mới.'),
            choiceList: ["quay lại", "tiếp tục"],
            isValueInclude: true,
        }]
        resp.confirm = null;
        resp.submit.url = 'apiCapNhatHoTroSavedSubmit'
    }
    //#endregion
    return resp;
}