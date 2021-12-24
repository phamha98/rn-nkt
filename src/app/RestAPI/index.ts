import { BASE_API, ServiceAsync } from "../library/networking"
import NetInfo from "@react-native-community/netinfo";
import LocalStorage from "../common/LocalStorage";
import DropDownHolder from "../library/utils/dropDownHolder";
import Alert from "../library/components/Alert";
import { toggleLoading } from '../../../App'
import RNFetchBlob from 'rn-fetch-blob'
import { filePath as filePathBundle } from "../features/downloadBundle";

export var dataPostSaved = [];
export const updateDataPostSaved = data => {
    dataPostSaved = data;
    LocalStorage.set("DATAPOSTSAVED", [])
}
const fs = RNFetchBlob.fs;
const { fs: { dirs } } = RNFetchBlob
const PATH_TO_LIST = dirs.DocumentDir
const dest = `${PATH_TO_LIST}/Script.json`
const url = 'http://nkt.btxh.gov.vn/FileTraining/Script/Script.json'
const tmpPath = `${dest}.download`
export const apiUpdateStatusFunc = flag => API.isConnected = flag;

const DownloadDataOffline = () => {
    RNFetchBlob.fs.ls(PATH_TO_LIST).then(files => {
    })
    const fs = RNFetchBlob.fs;
    fs.exists(tmpPath)
        .then(ext => {
            if (ext) {
                if (this.isAndroid) {
                    this.startTime = new Date().valueOf()
                    return fs.stat(dest)
                }
                return fs.appendFile(dest, tmpPath, 'uri').then(() => {
                    this.startTime = new Date().valueOf()
                    return fs.stat(tmpPath)
                })
            }
            this.startTime = new Date().valueOf()
            return Promise.resolve({ size: 0 })
        })
        .then(stat => {
            this.downtask = RNFetchBlob.config({
                IOSBackgroundTask: true, // required for both upload
                IOSDownloadTask: true, // Use instead of IOSDownloadTask if uploading
                path: this.isAndroid ? tmpPath : dest,
                fileCache: true
            })
                .fetch('GET', url, {
                    Range: this.isAndroid ? `bytes=${stat.size}-` : ''
                })
                .progress((receivedStr, totalStr) => {
                    // Do any things

                })
            this.downtask.catch(async err => {
                // Check error
            })
        })
        .then(file => {
            if (Platform.OS === 'android') {
                return fs.appendFile(dest, file.path(), 'uri')
            }
        })

        // remove tmp file ( file at ${dest}.download )
        .then(() => {
            if (Platform.OS === 'android') {
                return fs.unlink(tmpPath)
            }
            return null
        })
        // stat dest to get info downloaded of a video
        .then(() => {
            return fs.stat(dest)
        })
        .then(async stat => {
        })
}

const API = {
    isConnected: true,
    get: (name, url) => {
        return new Promise(async (resolve, reject) => {
            if (API.isConnected) {
                const data = await ServiceAsync.Get(url);
                LocalStorage.set(name, data)
                resolve(data);
            }
            else {
                if (/^TinhTP|QuanHuyen|XaPhuong|ThonTo/.test(name)) {
                    const dataStr = await RNFetchBlob.fs.readFile(filePathBundle, 'utf8').catch(e => null)
                    if (dataStr == null) {
                        resolve({})
                        return;
                    }
                    const saved = JSON.parse(dataStr);
                    const parentIds = (name.match(new RegExp(/-(\d+)/, 'g')) || []).map(e => e.replace('-', ''));
                    const param = name.match(new RegExp(/^TinhTP|QuanHuyen|XaPhuong|ThonTo/, 'g'))[0];

                    // if (param == 'QuanHuyen')
                    //     resolve(saved[param].filter(e => e.MaTinh == parentIds[0]))
                    // else if (param == 'XaPhuong')
                    //     resolve(saved[param].filter(e => e.MaTinh == parentIds[0] && e.MaHuyen == parentIds[1]))
                    // else 
                    let data = [];
                    if (param == 'ThonTo')
                        data = saved[param].filter(e => e.MaTinh == parentIds[0] && e.MaHuyen == parentIds[1] && e.MaXa == parentIds[2])
                    else
                        data = saved[param]
                    const keys = Object.keys(data[0]);
                    data = data.map(e => (Object.fromEntries(keys.map(k => [k.substr(0, 1).toLowerCase() + k.substr(1, k.length), e[k]]))))
                    resolve({ data })
                    return
                }

                const data = await LocalStorage.get(name, -1)
                if (data == -1) {
                    DropDownHolder.alert('warn', 'Thông báo', 'Chưa có dữ liệu, cập nhật khi có internet')
                    resolve({})
                }
                resolve(data);
            }
        })
    },
    post: (name, url, params) => {
        return new Promise(async (resolve, reject) => {
            const key = `${name}`;
            if (API.isConnected) {
                const data = await ServiceAsync.Post(url, params);
                LocalStorage.set(name, data)
                resolve(data);
            }
            else {
                const data = await LocalStorage.get(name, -1)
                console.log(data)
                if (data == -1) {
                    DropDownHolder.alert('warn', 'Thông báo', 'Chưa có dữ liệu, cập nhật khi có internet.')
                    resolve({})
                }
                resolve(data);
            }
        })
    },
    postData: (key, url, params): Object => {
        return new Promise(async (resolve, reject) => {
            if (API.isConnected) {
                const data = await ServiceAsync.Post(url, params);
                resolve(data);
            }
            else {
                dataPostSaved.push({
                    key,
                    request: { url, params }
                });
                LocalStorage.set("DATAPOSTSAVED", dataPostSaved)
                DropDownHolder.alert('success', 'Thông báo', 'Dữ liệu sẽ tự động gửi đi khi có kết nối internet.');
                toggleLoading();
            }
        })

    },
    Master_Ethnic: () =>
        API.get('ListEthnics', BASE_API + '/api/v1/DM_DanToc/List'),
    Master_Province: () =>
        API.get('TinhTP', BASE_API + '/api/v1/DM_TinhTP/DM_TinhTP_GetAll?suDung=0'),
    Master_District: (params?: object) =>
        // API.get(`QuanHuyen-${params.maTinh}-${params.maHuyen}`, BASE_API + '/api/v1/DM_QuanHuyen/DM_QuanHuyen_GetAll?{0}'.format(params == null ? '' : encodeURI(Object.keys(params).map(key => '{0}={1}'.format(key, params[key])).join('&')))),
        API.get(`QuanHuyen`, BASE_API + '/api/v1/DM_QuanHuyen/DM_QuanHuyen_GetAll?{0}'.format(params == null ? '' : encodeURI(Object.keys(params).map(key => '{0}={1}'.format(key, params[key])).join('&')))),
    Master_Ward: (params?: object) =>
        // API.get(`XaPhuong-${params.maTinh}-${params.maHuyen}`, BASE_API + '/api/v1/DM_PhuongXa/DM_PhuongXa_GetAll?{0}'.format(params == null ? '' : encodeURI(Object.keys(params).map(key => '{0}={1}'.format(key, params[key])).join('&')))),
        API.get(`XaPhuong`, BASE_API + '/api/v1/DM_PhuongXa/DM_PhuongXa_GetAll?{0}'.format(params == null ? '' : encodeURI(Object.keys(params).map(key => '{0}={1}'.format(key, params[key])).join('&')))),
    Master_Village: (params?: object) =>
        API.get(`ThonTo-${params.maTinh}-${params.maHuyen}-${params.maXa}`, BASE_API + '/api/v1/DM_ThonTo/DM_ThonTo_GetAll?{0}'.format(params == null ? '' : encodeURI(Object.keys(params).map(key => '{0}={1}'.format(key, params[key])).join('&')))),

    Master_GetFilter: (params: object) =>
        ServiceAsync.Post(BASE_API + '/api/v1/User/GetFilter?{0}'.format(encodeURI(Object.keys(params).map(key => '{0}={1}'.format(key, params[key])).join('&')))),
    Login: (params: Object) => {
        return ServiceAsync.Post(BASE_API + '/api/v1/Account/login', params)
    },
    LoginFingerPrint: (params: Object) => {
        return ServiceAsync.Post(BASE_API + '/api/v1/User/LoginByFinger', params)
    },
    ForgotPassword: (params: Object) => {
        return ServiceAsync.Post(BASE_API + '/api/v1/User/ForgetPassMobile', params)
    },
    Login_Social: (params: Object) => {
        return ServiceAsync.Post(BASE_API + '/api/v1/Account/LoginSocial', params)
    },
    GetUserDetails: (userId: number) => {
        return ServiceAsync.Get(BASE_API + '/api/v1/User/GetDetail/' + (userId || 0))
    },
    EDIT_USER_API: (params: Object) => {
        return ServiceAsync.Post(BASE_API + '/api/v1/Account/UpdateInfo', params)
    },
    API_Change_PassWord: (params: Object) => {
        return ServiceAsync.Post(BASE_API + '/api/v1/Account/ChangePassword', params)
    },
    API_Xac_Dinh_Muc_Do: (params: Object) => {
        return API.postData('XacDinhMucDo', BASE_API + '/api/v1/NNBM_GiayXacNhanKhuyetTat/UpdateFull', params)
    },
    API_Xac_Dinh_Muc_Do_Gui_Xa: (params: Object) => {
        return API.postData('XacDinhMucDoGuiXa', BASE_API + '/api/v1/NNBM_GiayXacNhanKhuyetTat/UpdateTrangThaiFull', params)
    },
    API_Cap_Nhat_Thong_Tin: (params: Object) => {
        return API.postData('CapNhatThongTin', BASE_API + '/api/v1/NNBM_ThongTinChung/UpdateFull', params)
    },
    API_Cap_Nhat_Thong_Tin_Gui_Xa: (params: Object) => {
        return API.postData('CapNhatThongTinGuiXa', BASE_API + '/api/v1/NNBM_ThongTinChung/UpdateTrangThaiFull', params)
    },

    API_Update_NhuCauHoTro: (params: Object) => {
        return API.postData('UpdateNhuCauHoTro', BASE_API + '/api/v1/NNBM_HoTro/UpdateFull', params)
    },

    API_Get_Info_NhuCauHoTro: (params: Object) => {
        return API.get('InfoNhuCauHoTro', BASE_API + '/api/v1/NNBM_HoTro/LoaiHinhHoTro/' + params)
    },

    API_Get_DanhSachThongBaoND: (params: Object) => {
        return API.get('LoadThongBaoND',BASE_API + '/api/v1/ThongKe/LoadThongBaoND?userId=' + params)
        // return ServiceAsync.Get(BASE_API + '/api/v1/ThongKe/LoadThongBaoND?userId=' + params)
    },
    API_Get_DanhSachThongBao: (params: Object) => {
        return API.get('DanhSachThongBao', BASE_API + '/api/v1/ThongKe/LoadThongBao?{0}'.format(encodeURI(Object.keys(params).map(key => '{0}={1}'.format(key, params[key])).join('&'))))
        
    },

    API_Get_LichSuHoTro: (params: Object) => {
        return ServiceAsync.Get(BASE_API + '/api/v1/NNBM_HoTro/LichSuData/' + params)
    },

    API_Get_Info_ThongTinChung: (params: Object) => {
        return API.get('ListThongTinChung', BASE_API + '/api/v1/NNBM_ThongTinChung/MGetEdit/' + params)
    },
    API_Get_Info_GiayXacNhanKT: (params: Object) => {
        return API.get('ListGiayXacNhanKT', BASE_API + '/api/v1/NNBM_GiayXacNhanKhuyetTat/MGetEdit/' + params)
    },

    API_Get_List_Info_User_NhuCauHoTro: (params: object) => ServiceAsync.Get(BASE_API + '/api/v1/HoTro/GetBySearch?{0}'.format(encodeURI(Object.keys(params).map(key => '{0}={1}'.format(key, params[key])).join('&')))),

    API_Get_DanhSachNguoiDungNhuCauHoTro: (params?: object) =>
        API.get('UserDanhSachNhuCauHoTro', BASE_API + '/api/v1/NNBM_HoTro/MListHoTro?{0}'.format(encodeURI(Object.keys(params).map(key => '{0}={1}'.format(key, params[key])).join('&')))),

    API_Seach_Info_User_NhuCauHoTro: (params: Object) => {
        return ServiceAsync.Get(BASE_API + '/api/v1/HoTro/GetBySearch?', params)
    },
    API_DuyetYeuCauTiepNhan: (params: Object) => {
        return ServiceAsync.Post(BASE_API + '/api/v1/NNBM_HoTro/DuyetTiepNhan', params)
    },
    API_KhongDuyetYeuCauTiepNhan: (params: Object) => {
        return ServiceAsync.Post(BASE_API + '/api/v1/NNBM_HoTro/HuyYeuCau', params)
    },
    API_HuyDuyetYeuCauTiepNhan: (params: Object) => {
        return ServiceAsync.Post(BASE_API + '/api/v1/NNBM_HoTro/HuyDuyet', params)
    },
    // API_ExportExcel_NhuCauHoTro: (params: Object) => {
    //     return ServiceAsync.Get('http://nkt.btxh.gov.vn/NNBM_HoTro/ExportExcel?' + params)
    // },
    // API_AdminDashBroad: (params: Object) => {
    //     return ServiceAsync.Get(BASE_API + '/api/v1/ThongKe/LoadDashBoard?', params)
    // },
    API_AdminDashBroad: (params?: object) =>
        API.get('AdminDashBroad', BASE_API + '/api/v1/ThongKe/LoadDashBoard?{0}'.format(encodeURI(Object.keys(params).map(key => '{0}={1}'.format(key, params[key])).join('&')))),
    API_ExportExcel_NhuCauHoTro: (params: object) => ServiceAsync.Get('http://nkt.btxh.gov.vn/NNBM_HoTro/ExportExcel?{0}'.format(encodeURI(Object.keys(params).map(key => '{0}={1}'.format(key, params[key])).join('&')))),
    API_ChiTietHoTro: (params: Object) => {
        return ServiceAsync.Get(BASE_API + '/api/v1/NNBM_HoTro/MHoTroChiTiet?id=' + params)
    },
    API_NhanHoTro: (params: Object) => {
        return ServiceAsync.Get(BASE_API + '/api/v1/NNBM_HoTro/MNhanHoTro/' + params)
    },
    API_CapNhatHoTro: (params: Object) => {
        return ServiceAsync.Post(BASE_API + '/api/v1/NNBM_HoTro_Duyet/Update', params)
    },
    API_Get_QuanLyLichSuHoTro: (params: Object) => {
        return ServiceAsync.Get(BASE_API + '/api/v1/NNBM_HoTro/MLichSu/' + params)
    },
    API_QuanLyChiTietHoTro: (params: object) => ServiceAsync.Get(BASE_API + '/api/v1/NNBM_HoTro/HoTroChiTiet?{0}'.format(encodeURI(Object.keys(params).map(key => '{0}={1}'.format(key, params[key])).join('&')))),

    FirstRegister_GetList: (params?: object) => API.get('FirstRegister_GetList', BASE_API + '/api/v1/ThongTinChung/GetBySearch?{0}'.format(encodeURI(Object.keys(params).map(key => '{0}={1}'.format(key, params[key])).join('&')))),
    // FirstRegister_GetList: (params: object) => ServiceAsync.Get(BASE_API + '/api/v1/ThongTinChung/GetBySearch?{0}'.format(encodeURI(Object.keys(params).map(key => '{0}={1}'.format(key, params[key])).join('&')))),
    FirstRegister_ExportExcel: (params: object) => ServiceAsync.Get('http://nkt.btxh.gov.vn/NNBM_ThongTinChung/ExportExcel?{0}'.format(encodeURI(Object.keys(params).map(key => '{0}={1}'.format(key, params[key])).join('&')))),
    // FirstRegister_GetDetails: (id: object) => ServiceAsync.Get(BASE_API + '/api/v1/NNBM_ThongTinChung/GetDetailMobile/{0}'.format(id)),
    FirstRegister_GetDetails: (id: object) => API.get('FirstRegister_GetDetails',BASE_API + '/api/v1/NNBM_ThongTinChung/GetDetailMobile/{0}'.format(id)),
    FirstRegister_ApproveInfo: (params: object) => ServiceAsync.Post(BASE_API + '/api/v1/NNBM_ThongTinChung/DongYDuyetTiepNhan?type=1', params),
    FirstRegister_RejectInfo: (params: object) => ServiceAsync.Post(BASE_API + '/api/v1/NNBM_ThongTinChung/DuyetKhongTiepNhan?type=1', params),
    FirstRegister_CancelRequestInfo: (params: object) => ServiceAsync.Post(BASE_API + '/api/v1/NNBM_ThongTinChung/HuyTiepNhanNKT?type=1', params),
    FirstRegister_MoveBHXH: (params: object) => ServiceAsync.Post(BASE_API + '/api/v1/NNBM_ThongTinChung/CapNhatTrungTam?type=1', params),
    FirstRegister_UpdateStatus: (params: object) => ServiceAsync.Post(BASE_API + '/api/v1/NNBM_ThongTinChung/CapNhatTrangThai?type=1', params),
    // FirstRegister_GetUpdateDetails: (id: number) => ServiceAsync.Get(BASE_API + '/api/v1/NNBM_ThongTinChung/GetEdit/{0}'.format(id)),
    FirstRegister_GetUpdateDetails: (id: number) => API.get('FirstRegister_GetUpdateDetails', BASE_API + '/api/v1/NNBM_ThongTinChung/GetEdit/{0}'.format(id)),
    // FirstRegister_SaveUpdateDetails: (params: object) => ServiceAsync.Post(BASE_API + '/api/v1/NNBM_ThongTinChung/MUpdateAllRegistered', params),
    FirstRegister_SaveUpdateDetails: (params: Object) => {
        return API.postData('FirstRegister_SaveUpdateDetails', BASE_API + '/api/v1/NNBM_ThongTinChung/MUpdateAllRegistered', params)
    },
    FirstRegister_GetUpdateSupportByTTC_Id: (id: number) => ServiceAsync.Get(BASE_API + '/api/v1/NNBM_HoTro/MGetEdit?ttcid={0}'.format(id)),
    FirstRegister_GetUpdateSupportById: (id: number) => ServiceAsync.Get(BASE_API + '/api/v1/NNBM_HoTro/MHoTroChiTiet/{0}'.format(id)),
    FirstRegister_UpdateSupport: (params: object) => ServiceAsync.Post(BASE_API + '/api/v1/NNBM_HoTro/MUpdateFullQuanLy', params),
    FirstRegister_UpdateSupportApprove: (params: object) => ServiceAsync.Post(BASE_API + '/api/v1/NNBM_HoTro/DuyetTiepNhan', params),
    FirstRegister_UpdateSupportReject: (params: object) => ServiceAsync.Post(BASE_API + '/api/v1/NNBM_HoTro/HuyYeuCau', params),

    UpdateRegister_GetList: (params: object) => ServiceAsync.Get(BASE_API + '/api/v1/ThongTinChung/GetBySearch?{0}'.format(encodeURI(Object.keys(params).map(key => '{0}={1}'.format(key, params[key])).join('&')))),
    UpdateRegister_ExportExcel: (params: object) => ServiceAsync.Get(BASE_API + '/NNBM_ThongTinChung/ExportExcel?{0}'.format(encodeURI(Object.keys(params).map(key => '{0}={1}'.format(key, params[key])).join('&')))),
    UpdateRegister_GetDetails: (id: object) => ServiceAsync.Get(BASE_API + '/api/v1/NNBM_ThongTinChung/GetDetailMobile/{0}'.format(id)),
    UpdateRegister_ApproveInfo: (params: object) => ServiceAsync.Post(BASE_API + '/api/v1/NNBM_ThongTinChung/DongYDuyetTiepNhan?type=2', params),
    UpdateRegister_RejectInfo: (params: object) => ServiceAsync.Post(BASE_API + '/api/v1/NNBM_ThongTinChung/DuyetKhongTiepNhan?type=2', params),
    UpdateRegister_History: (id: number, token: string) => ServiceAsync.Get(BASE_API + '/api/v1/NNBM_ThongTinChung/MLichSuChiTiet/{0}?token={1}'.format(id, token)),


    RenewXNKT_List: (params: object) => ServiceAsync.Get(BASE_API + '/api/v1/NNBM_GiayXacNhanKhuyetTat/SearchAdvance?{0}'.format(encodeURI(Object.keys(params).map(key => '{0}={1}'.format(key, params[key])).join('&')))),
    RenewXNKT_Details: (id: number) => ServiceAsync.Get(BASE_API + '/api/v1/NNBM_GiayXacNhanKhuyetTat/GetEdit/{0}'.format(id)),
    RenewXNKT_GetInfo: (id: number) => ServiceAsync.Get(BASE_API + '/api/v1/NNBM_ThongTinChung/GetCapNhatXNKT/{0}'.format(id)),
    RenewXNKT_UpdateInfo: (params: object) => ServiceAsync.Post(BASE_API + '/api/v1/NNBM_ThongTinChung/XacNhanKT', params),
    RenewXNKT_AcceptRequest: (params: object) => ServiceAsync.Post(BASE_API + '/api/v1/NNBM_GiayXacNhanKhuyetTat/DuyetTiepNhan', params),
    RenewXNKT_RejectRequest: (params: object) => ServiceAsync.Post(BASE_API + '/api/v1/NNBM_GiayXacNhanKhuyetTat/DuyetKhongTiepNhan', params),
    RenewXNKT_AppointmentList: (params: object) => ServiceAsync.Get(BASE_API + '/api/v1/NNBM_GiayHenGap/GetBySearch', params),
    RenewXNKT_AppointmentDetails: (id: number) => ServiceAsync.Get(BASE_API + '/api/v1/NNBM_GiayHenGap/GetViewDetail/{0}'.format(id)),
    RenewXNKT_AppointmentUpdate: (params: object) => ServiceAsync.Post(BASE_API + '/api/v1/NNBM_GiayHenGap/Update', params),
    API_ChatBot: (params: object) => ServiceAsync.Post('https://cameraai-api.dttt.vn:5028/api/processing_chatbot', params),
    // API_ChatBot: (params: object) => ServiceAsync.Post('http://192.168.1.250:5022/api/processing_chatbot', params),
    SettingLoginbyFinger: (params: object) => ServiceAsync.Post(BASE_API + '/api/v1/User/UpdateLoginbyFinger', params),
    SettingLoginbyVoice: (params: object) => ServiceAsync.Post(BASE_API + '/api/v1/User/UpdateLoginbyVoice', params),
    RegisterByVoice: (params: object) => ServiceAsync.Post(BASE_API + '/api/v1/User_Data/UploadFile', params),

     API_CAPGIAYXNHT: (url: string, params: Object) => {
        return ServiceAsync.Post(url, params)
    },
}
export default API
