// export const BASE_API = __DEV__
//   ? 'https://api.congchungtructuyen.vn'
//   : 'https://api.congchungtructuyen.vn/';
export const BASE_API = __DEV__
  ? 'https://apinkt.dttt.vn'
  : 'https://apinkt.dttt.vn';


export const Login_APIs = '/api/v1/Account/login';
export const API_CHANGE_PASSWORD = '/api/v1/Account/ChangePassword';
export const EDIT_USER_API = '/api/v1/Account/UpdateInfo';
export const Register_APIs = '/api/v1/Account/Register';
export const Get_Detail_User = '/api/v1/User/GetDetail/';
export const API_Xac_Dinh_Muc_Do = '/api/v1/NNBM_GiayXacNhanKhuyetTat/UpdateFull';
// API mới

// export const ChangePassword = '/api/v1/Account/ChangePassword';
export const Check_Token_Expire_API = '/api/v1/Account/GetByToken/'
export const Login_Social_APIs = '/api/v1/Account/LoginSocial';
export const Send_OTP_APIs = '/api/v1/Account/Active';
export const Log_Out_APIs = '/api/app/log_out';
export const Forgot_Password_APIs = 'api/v1/Account/forgotPass';
// homeTab --> start
export const List_Office_Notary_API = '/api/v1/vpcc';
export const List_Office_Notary_By_ServiceId_API = '/api/v1/tbl_VPCC_Service/ListByServiceID';

// export const List_Office_Notary_By_ServiceId_API = (serviceId: any) => {
//   return `/api/v1/tbl_VPCC_Service/ListByServiceID?serviceid=${serviceId}`;
// };
export const List_Staff_Notary_API = '/api/v1/staff';
export const List_Service_Notary_API = '/api/v1/specializations';
export const List_Service_Notary_2 = 'api/v1/getservicesbyspecid';
export const ListSpecializationByVPCCID = '/api/v1/VPCC_Service/ListSpecializationByVPCCID';

export const Get_Url_Payment = '/api/v1/Transaction/NapTien';
export const Get_History_CC = '/api/v1/DocumentaryLog/GetByUserID';
export const Get_List_DVCC_API = '/api/v1/getservicesbyspecid'
export const Get_Detail_Notary = (id: any) => { return `/api/v1/documentary/detail/${id}` };
export const Get_Detail_VPCC = (vpccid: any) => { return `/api/v1/vpcc/detail/${vpccid}` };
// flow create Notary ==> start
export const Info_User_By_Id_API = '/api/v1/customer/getdetailbyuserid/'
export const Create_Initial_Notary_API = '/api/v1/documentary/create'
export const Upload_Image_API = '/api/v1/Documentary_File/Add'
export const Delete_file = (idImage: number) => { return `/api/v1/file/delete/${idImage}` };
export const Update_Office = '/api/v1/documentary/update_vpcc_staff'
export const Confirm_Date_Booking = (id: any) => `/api/v1/order/confirm/${id}`;
export const Get_Price = (vpccid: any, serviceid: any) => { return `/api/v1/fee_dervice/getbyvpccservice?vpccid=${vpccid}&serviceid=${serviceid}` };
export const Confirm_Additional = '/api/v1/documentary/updateinfo';
export const UPDATE_TYPE_PAYMENT_API = '/api/v1/order/update_type_payment';
// flow create Notary <== end
// homeTab <--- end

// dashboard --> start
export const UPLOAD_FILE_IMG = '/api/v1/file/upload'
export const GET_DATA_DASH_BOARD = '/api/app/restaurant/get_list_order';
export const GET_PROFILE_NOTARY = '/api/v1/services/listFileByVPCC';
// export const GET_PROFILE_NOTARY = (id: any) => { return `/api/v1/services/list_file/${id}` };

export const HISTORY_NOTARY_API = '/api/v1/document/getbyuserid';
export const List_Address_City = '/api/v1/Region/GetRegionByParentIdAndTypeid?'
export const List_District = '/api/v1/Region/GetRegionByParentIdAndTypeid?'
export const Rating_Ccv = '/api/v1/staff/rate'
export const Rating_Vpcc = '/api/v1/VPCC/rate'
// dashboard <--- end

// chat --> start
export const CREATE_ROOM = (token: string) => {
  return `/api/v1/Room/Create?token=${token}`;
};
export const JOIN_ROOM_API = (token: string) => {
  return `/api/v1/Room/Join?token=${token}`;
};
export const SEND_MESSAGE_API = (token: string) => {
  return `/api/v1/Messenger/SendMessenger?token=${token}`;
};
export const GET_LIST_ROOM = '/api/v1/Room/GetListRoom';

export const GET_MESSAGE = '/api/v1/Messenger/GetList';

// notification
export const Get_list_notification = (userid: any) => {
  return `/api/v1/Notification/getbyuserid/${userid}`;
};
export const GET_LIST_NOTIFY = '/api/v1/Notification/getbyuser';

export const CLICK_NOTIFY = '/api/v1/Notification/click';



export const Get_list_new_notification = '/api/v1/new/list';

//privacy 
export const DIEU_KHOAN = '/api/v1/tbl_StaticContent/GetByKey/DIEU_KHOAN_SU_DUNG_DICH_VU';
export const CHINH_SACH = '/api/v1/tbl_StaticContent/GetByKey/CHINH_SACH_BAO_MAT';

export const GET_VIP_API = '/api/v1/tbl_StaticContent/GetByKey/KHACH_HANG_VIP';


//personal papers
export const  GET_LIST_PERSONAL_PAPERS = (userid: string) => {
  return `/api/v1/customer/getfile?customerid=${userid}` + '&typeid=0';
}

export const UPDATE_NOTARY_PROFILE = '/api/v1/documentary/added';
export const CANCEL_NOTARY_PROFILE = '/api/v1/documentary/cancel';
export const UPDATE_AVATAR = '/api/v1/Account/Update_Avatar';


export const UPDATE_READ_MESSAGE = '/api/v1/Messenger/ClickRead';


export const PAYOO_PAYMENT = '/api/v1/Payoo/CheckOut';

export const DELETE_USER_PAPER = (paperID: any) => {
  return `/api/v1/customer/delfile/${paperID}`;
};


export const RESEND_OTP = '/api/v1/Account/ReSendOTP';


//manager
export const LOAD_THONG_BAO = '/api/v1/ThongKe/LoadThongBao';
export const SearchAdvance = '/api/v1/NNBM_GiayXacNhanKhuyetTat/SearchAdvance';
export const DuyetTiepNhan = '/api/v1/NNBM_GiayXacNhanKhuyetTat/DuyetTiepNhan';
export const DuyetKhongTiepNhan = '/api/v1/NNBM_GiayXacNhanKhuyetTat/DuyetKhongTiepNhan';
export const DISABILITY_DETAIL = '/api/v1/NNBM_GiayXacNhanKhuyetTat/GetEdit/';
export const LichHen = '/api/v1/NNBM_GiayHenGap/GetBySearch';
export const ChiTietLichHen = '/api/v1/NNBM_GiayHenGap/GetViewDetail/';
export const GiayHenGapUpdate = '/api/v1/NNBM_GiayHenGap/Update';
export const CapNhatNoiDung = '/api/v1/NNBM_ThongTinChung/GetCapNhatNoiDung/';
export const XacNhanKT = '/api/v1/NNBM_ThongTinChung/XacNhanKT';