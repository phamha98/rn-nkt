import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, View } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import ScrollableTabBar from 'react-native-scrollable-tab-view/ScrollableTabBar';
import { useSelector } from 'react-redux';
import { toggleLoading } from '../../../../../../../App';
import { Button, Header, Screen, Text as TextCus, Wallpaper, ButtonPrimary } from '../../../../../library/components';
import ViewCus from '../../../../../library/components/ViewCus/ViewCus';
import RestAPI from '../../../../../RestAPI/index';
import { palette as appColors } from '../../../../../themes/palette';
const Text = (props) => <TextCus numberOfLines={8} {...props} style={[{ color: 'black', paddingVertical: 8 }, props.style,]} />

export default function FirstRegister_Details(props) {
    const { navigation } = props;
    let params = navigation.state.params;

    const { data: { item: paramItem, index: paramIndex }, callBackUpdate } = params;

    const refPromptCancelRequest = useRef();
    const user = useSelector(state => state.AppReducer.profile.user);
    const [data, setData] = useState(null)

    useEffect(() => {
        _run();
    }, []);

    var _run = async () => {
        toggleLoading(true);
        var details = await RestAPI.FirstRegister_GetDetails(paramItem.id)
        toggleLoading(false);
        setData(details);
    }

    const ApproveInfo = (e) => {
        ViewCus.Alert.Confirm(async () => {
            toggleLoading();
            var resp = await RestAPI.FirstRegister_ApproveInfo({
                "Id": e.id,
                "TrangThai": 1,
                "DaCapGiayChungNhan": 1,
                "NguoiCap": user.userID,
                "NgayCap": new Date(),
                "NgayDuyet": new Date(),
                "NguoiDuyet": user.userID,
                "LyDoKhongDuyet": null,
                "IsAnCBTu1659Len60": true,
                "IsAnCBDuoi16Len1659": true,
                "IsAnCBVuot36Thang": true,
                "IsTangLen2Con": true,
                type: 1
            })
            if (resp.status) {
                setData({
                    ...data,
                    data: {
                        ...data.data,
                        daCapGiayChungNhan: 1
                    }
                })
                callBackUpdate({
                    item: {
                        daCapGiayChungNhan: 1
                    },
                    index: paramIndex
                })
            }
            toggleLoading();
            ViewCus.Alert.Alert(resp.messeger)
        }, null, 'B???n c?? mu???n ti???p nh???n?')
    }

    const RejectInfo = (e) => {
        refPromptCancelRequest.current?.toggle(true, '', async (t) => {
            toggleLoading();
            var resp = await RestAPI.FirstRegister_RejectInfo({
                "Id": e.id,
                "LyDoKhongDuyet": t,
                "TrangThai": 0,
                "DaCapGiayChungNhan": -1,
                "NguoiDuyet": user.userID,
                "NguoiCapNhat": user.userID,
                "NgayCapNhat": new Date(),
                "NgayCap": null,
                "NgayDuyet": new Date(),
                type: 1
            })
            if (resp.status) {
                setData({
                    ...data,
                    data: {
                        ...data.data,
                        daCapGiayChungNhan: -1
                    }
                })
                callBackUpdate({
                    item: {
                        daCapGiayChungNhan: -1
                    },
                    index: paramIndex
                })
            }
            toggleLoading();
            ViewCus.Alert.Alert(resp.messeger)
        });
    }
    const CancelRequestInfo = async (e) => {
        ViewCus.Alert.Confirm(async () => {
            toggleLoading();
            var resp = await RestAPI.FirstRegister_CancelRequestInfo({
                "Id": e.id,
                "LyDoKhongDuyet": 'LyDoKhongDuyet',
                "TrangThai": 1,
                "DaCapGiayChungNhan": 0,
                "NguoiCapNhat": user.userID,
                "NgayCapNhat": new Date(),
                type: 1
            });
            if (resp.status) {
                setData({
                    ...data,
                    data: {
                        ...data.data,
                        daCapGiayChungNhan: 0
                    }
                })
                callBackUpdate({
                    item: {
                        daCapGiayChungNhan: 0
                    },
                    index: paramIndex
                })
            }
            ViewCus.Alert.Alert(resp.messeger)
            toggleLoading();
        }, null, 'B???n c?? mu???n t??? ch???i ti???p nh???n?')
    }
    return (
        <>
            <ViewCus.Prompt
                ref={refPromptCancelRequest}
                title='H???y ti???p nh???n th??ng tin'
                buttonText='T??? ch???i'
                placeholder='L?? do t??? ch???i'
                multiline={true}
                numberOfLines={10}
                validate={{
                    required: true,
                }}
                styleInput={{
                    maxHeight: 200
                }}
            />
            <Screen>
                <Wallpaper useWrap={true} />
                <Header
                    isBack={true}
                    headerTx={'Chi ti???t ????ng k?? l???n ?????u'}
                />
                <View
                    style={{
                        flex: 1,
                        backgroundColor: '#fff',
                    }}
                >
                    {(data != null && data.data != null) &&
                        <>
                            <ScrollableTabView
                                renderTabBar={() => <ScrollableTabBar />}
                            >
                                {
                                    [
                                        {
                                            title: 'TH??NG TIN CHUNG',
                                            fields: [
                                                {
                                                    label: 'A1. Gi???y x??c nh???n khuy???t t???t',
                                                    field: 'a1_GiayXacNhanKhuyetTat',
                                                },
                                                {
                                                    label: 'A2. M?? s??? gi???y x??c nh???n khuy???t t???t',
                                                    field: 'a2_MaSo',
                                                },
                                                {
                                                    label: 'A3. Ng??y c???p gi???y x??c nh???n',
                                                    fields: [
                                                        {
                                                            label: 'Ng??y c???p',
                                                            type: 'date',
                                                            format: 'DD/MM/YYYY',
                                                            field: 'a3_NgayCap',
                                                        },
                                                        {
                                                            label: 'H???i ?????ng x??c nh???n',
                                                            field: 'hoiDongXacNhan',
                                                        },
                                                    ]
                                                },
                                                {
                                                    label: 'A4. H??? v?? t??n',
                                                    field: 'a4_HoTen',
                                                },
                                                {
                                                    label: 'A5. Ng??y th??ng n??m sinh',
                                                    type: 'date',
                                                    format: 'DD/MM/YYYY',
                                                    field: 'a5_NgaySinh',
                                                },
                                                {
                                                    label: 'A6. Gi???i t??nh',
                                                    field: 'a6_GioiTinh',
                                                },
                                                {
                                                    label: 'A7. D??n t???c',
                                                    groups: {
                                                        label: null,
                                                        fields: [
                                                            'a7_DanToc',
                                                            'a7_DanToc_KhacText',
                                                        ]
                                                    }
                                                },
                                                {
                                                    label: 'A8. S??? CMND/CCCD',
                                                    field: 'a8_CMND',
                                                    fields: [
                                                        {
                                                            label: 'Ng??y c???p',
                                                            type: 'date',
                                                            format: 'DD/MM/YYYY',
                                                            field: 'a8_CMND_NgayCap',
                                                        },
                                                        {
                                                            label: 'N??i c???p',
                                                            field: 'a8_CMND_NoiCap',
                                                        },
                                                    ]
                                                },
                                                {
                                                    label: 'A9. M?? s??? ?????nh danh (n???u c??)',
                                                    field: 'a9_MaDinhDanh',
                                                    fields: [
                                                        {
                                                            label: 'Ng??y c???p',
                                                            type: 'date',
                                                            format: 'DD/MM/YYYY',
                                                            field: 'a9_MSDD_NgayCap',
                                                        },
                                                        {
                                                            label: 'N??i c???p',
                                                            field: 'a9_MSDD_NoiCap',
                                                        },
                                                    ]
                                                },
                                                {
                                                    label: 'A10. M?? an sinh x?? h???i (n???u c??)',
                                                    field: 'a10_MaASXH',
                                                },
                                                {
                                                    label: 'A11. S??T li??n h???, Email',
                                                    groups: {
                                                        label: null,
                                                        fields: [
                                                            'a11_SoDienThoai',
                                                            'a11_Email',
                                                        ]
                                                    }
                                                },
                                                {
                                                    label: 'A12. H??? kh???u th?????ng tr??',
                                                    fields: [
                                                        {
                                                            label: 'T???nh/Th??nh ph??? ',
                                                            field: 'a12_HKTT_Tinh',
                                                        },
                                                        {
                                                            label: 'Huy???n/Qu???n',
                                                            field: 'a12_HKTT_Huyen',
                                                        },
                                                        {
                                                            label: 'X??/Ph?????ng',
                                                            field: 'a12_HKTT_Xa',
                                                        },
                                                        {
                                                            label: 'Th??n/T??? d??n ph???',
                                                            field: 'a12_HKTT_Thon',
                                                        },
                                                    ]
                                                },
                                                {
                                                    label: 'A13. N??i ??? hi???n t???i',
                                                    field: 'd7_NoiChamSocNKT',
                                                    fields: [
                                                        {
                                                            label: 'T???nh/Th??nh ph???',
                                                            field: 'a13_NOHT_Tinh',
                                                        },
                                                        {
                                                            label: 'Huy???n/Qu???n',
                                                            field: 'a13_NOHT_Huyen',
                                                        },
                                                        {
                                                            label: 'X??/Ph?????ng',
                                                            field: 'a13_NOHT_Xa',
                                                        },
                                                        {
                                                            label: 'Th??n/T??? d??n ph???',
                                                            field: 'a13_NOHT_Thon',
                                                        },
                                                    ]
                                                },
                                                {
                                                    label: 'A14. T??nh tr???ng h??n nh??n hi???n nay',
                                                    field: 'a14_TinhTrangHonNhan'
                                                },
                                                {
                                                    label: 'A15. T???ng s??? con c???a NKT',
                                                    fields: [
                                                        {
                                                            label: 'T???ng s??? con c???a NKT',
                                                            field: 'd5_TongSoConCuaNKT'
                                                        },
                                                        {
                                                            label: 'Trong ????, t???ng s??? con d?????i 16 tu???i (ng?????i)',
                                                            field: 'd5_TongSoConDuoi16'
                                                        },
                                                        {
                                                            label: 'Con s??? 1: n??m sinh',
                                                            type: 'date',
                                                            format: 'DD/MM/YYYY',
                                                            field: 'd5_NamSinhCon1'
                                                        },
                                                        {
                                                            label: 'Con s??? 2: n??m sinh',
                                                            type: 'date',
                                                            format: 'DD/MM/YYYY',
                                                            field: 'd5_NamSinhCon2'
                                                        },
                                                        {
                                                            label: 'Con s??? 3: n??m sinh',
                                                            type: 'date',
                                                            format: 'DD/MM/YYYY',
                                                            field: 'd5_NamSinhCon3'
                                                        },
                                                        {
                                                            label: 'Con s??? 4: n??m sinh',
                                                            type: 'date',
                                                            format: 'DD/MM/YYYY',
                                                            field: 'd5_NamSinhCon4'
                                                        },
                                                    ]
                                                },
                                                {
                                                    label: 'A16. NKT ??ang mang thai th??ng th???',
                                                    field: 'd6_NKTMangThaiHoacNuoiConNho'
                                                },
                                                {
                                                    label: 'A17. T??n tr?????ng h???c(n???u ??ang ??i h???c):',
                                                    field: 'a17_TenTruongDangDiHoc'
                                                },
                                                {
                                                    label: 'A18. V??? th??? NKT trong gia ????nh',
                                                    field: 'a18_ViTheTrongGiaDinh'
                                                },
                                            ]
                                        },
                                        {
                                            title: 'TH??NG TIN V??? H??? GIA ????NH',
                                            fields: [
                                                {
                                                    label: 'B1. M?? h???',
                                                    field: 'b1_MaHo',
                                                },
                                                {
                                                    label: 'B2.1. H??? v?? t??n ch??? h???',
                                                    field: 'b2_ChuHo_HoTen',
                                                },
                                                {
                                                    label: 'B2.2. Ng??y sinh',
                                                    type: 'date',
                                                    format: 'DD/MM/YYYY',
                                                    field: 'b2_NgaySinhChuHo',
                                                },
                                                {
                                                    label: 'B2.3. S??? CMND/CCCD ho???c m?? s??? ??inh danh c?? nh??n',
                                                    field: 'b2_SoCMNDChuHo',
                                                    fields: [
                                                        {
                                                            label: 'Ng??y c???p',
                                                            type: 'date',
                                                            format: 'DD/MM/YYYY',
                                                            field: 'b2_NgayCap',
                                                        },
                                                        {
                                                            label: 'N??i c???p',
                                                            field: 'b2_NoiCap',
                                                        },
                                                    ]
                                                },
                                                {
                                                    label: 'B2.4. S??? ??i???n tho???i ch??? h???',
                                                    field: 'b2_SoDienThoai',
                                                },
                                                {
                                                    label: 'B3. Gi???i t??nh ch??? h???',
                                                    field: 'b3_ChuHo_GioiTinh',
                                                },
                                                {
                                                    label: 'B4. Quan h??? v???i NKT',
                                                    field: 'b4_ChuHo_QuanHeVoiNKT',
                                                    fields: [
                                                        {
                                                            label: 'Quan h??? v???i NKT (Kh??c)',
                                                            fields: 'b4_ChuHo_QuanHeVoiNKT_KhacText'
                                                        }
                                                    ]
                                                },
                                                {
                                                    label: 'B5. Ngh??? nghi???p hi???n nay',
                                                    field: 'b5_NgheNghiep',
                                                },
                                                {
                                                    label: 'B6. Ho??n c???nh kinh t??? gia ????nh',
                                                    field: 'b6_HoanCanhKinhTe',
                                                },
                                                {
                                                    label: 'B7. S??? ng?????i trong gia ????nh',
                                                    fields: [
                                                        {
                                                            label: '1. T???ng s??? nh??n kh???u (ng?????i)',
                                                            field: 'b7_SoNhanKhau_Tong'
                                                        },
                                                        {
                                                            label: '2. S??? NKT',
                                                            field: 'b7_SoNhanKhau_NKT'
                                                        },
                                                        {
                                                            label: '3. S??? tr??? d?????i 16 tu???i',
                                                            field: 'b7_SoNhanKhau_TreDuoi16',
                                                        },
                                                        {
                                                            label: '4. S??? ng?????i lao ?????ng, t???o ra thu nh???p',
                                                            field: 'b7_SoNhanKhau_NguoiLaoDong',
                                                        },
                                                        {
                                                            label: '5. S??? ng?????i cao tu???i (t??? 60 tu???i tr??? l??n)',
                                                            field: 'b7_SoNhanKhau_NguoiCaoTuoi',
                                                        },
                                                    ]
                                                },
                                                (data.thanhvien || []).length > 0 &&
                                                {
                                                    label: 'Chi ti???t th??nh vi??n trong gia ????nh',
                                                    view: data.thanhvien.map((e, index) => {
                                                        return (
                                                            <View key={index}
                                                                style={{
                                                                    backgroundColor: index % 2 ? '#f9f9f9' : 'white',
                                                                    borderWidth: 1,
                                                                    borderColor: '#f2f2f2',
                                                                    padding: 10,
                                                                    marginTop: 10
                                                                }}
                                                            >
                                                                {
                                                                    (e.hoTen || '') != '' && <Text>{'H??? v?? t??n: {0}'.format(e.hoTen)}</Text>
                                                                }
                                                                {
                                                                    (e.ngaySinh || '') != '' && <Text>{'Ng??y th??ng n??m sinh: {0}'.format(new Date(e.ngaySinh).format('DD/MM/YYYY'))}</Text>
                                                                }
                                                                {
                                                                    (e.cmnd || '') != '' && <Text>{'CMTND: {0}'.format(e.cmnd)}</Text>
                                                                }
                                                                {
                                                                    (e.quanHeChuHo || '') != '' && <Text>{'Quan h??? v???i ch??? h???: {0}'.format(e.quanHeChuHo)}</Text>
                                                                }
                                                            </View>
                                                        )
                                                    }),
                                                },
                                                {
                                                    label: 'B8. Ngu???n thu nh???p hi???n nay',
                                                    field: 'b8_NguonThuNhap',
                                                },
                                                {
                                                    label: 'B9. T???ng thu nh???p c???a h??? gia ????nh/th??ng (?????ng)',
                                                    field: 'b9_ThuNhapHo',
                                                },
                                                {
                                                    label: 'B10. Thu nh???p b??nh qu??n ng?????i/th??ng (?????ng)',
                                                    field: 'b10_ThuNhapBinhQuan',
                                                },
                                                {
                                                    label: 'B11. C??c kho???n chi ph?? v?? kh??? n??ng chi tr??? t??? gia ????nh',
                                                    fields: [
                                                        {
                                                            label: 'B11.1. L????ng th???c/th???c ??n',
                                                            field: 'b11_ChiPhi_LuongThuc'
                                                        },
                                                        {
                                                            label: 'B11.2. Qu???n ??o',
                                                            field: 'b11_ChiPhi_QuanAo'
                                                        },
                                                        {
                                                            label: 'B11.3. Kh??m v?? ch???a b???nh',
                                                            field: 'b11_ChiPhi_KhamChuaBenh'
                                                        },
                                                        {
                                                            label: 'B11.4. ????ng h???c ph??',
                                                            field: 'b11_ChiPhi_DongHocPhi'
                                                        },
                                                        {
                                                            label: 'B11.5. U???ng thu???c',
                                                            field: 'b11_ChiPhi_UongThuoc'
                                                        },
                                                        {
                                                            label: 'B11.6. Chi ph?? kh??c',
                                                            field: 'b11_ChiPhi_Khac'
                                                        },
                                                    ]
                                                },
                                                {
                                                    label: 'B12. Kh??? n??ng ch??m s??c ?????i t?????ng c???a gia ????nh',
                                                    fields: [
                                                        {
                                                            label: 'S??? quan t??m ch??m s??c',
                                                            field: 'b12_SuQuanTamChamSoc'
                                                        },
                                                        {
                                                            label: 'M??i tr?????ng ch??m s??c',
                                                            field: 'b12_MoiTruongChamSoc'
                                                        },
                                                        {
                                                            label: 'N??ng l???c ch??m s??c (c?? ki???n th???c v?? k??? n??ng)',
                                                            field: 'b12_NangLucChamSoc'
                                                        },
                                                    ]
                                                },
                                            ]
                                        },
                                        {
                                            title: 'TH??NG TIN HI???N TR???NG',
                                            fields: [
                                                {
                                                    label: 'C1. D???ng khuy???t t???t',
                                                    field: 'c1_DangKhuyetTat',
                                                    fields: [
                                                        {
                                                            label: 'D???ng khuy???t t???t kh??c',
                                                            field: 'c1_DangKhuyetTat_KhacText'
                                                        },
                                                    ]
                                                },
                                                {
                                                    label: 'C2. M???c ????? khuy???t t???t',
                                                    field: 'c2_MucDoKhuyetTat',
                                                },
                                                {
                                                    label: 'C3_NguyenNhanKhuyetTat_BS',
                                                    field: 'c3_NguyenNhanKhuyetTat',
                                                    fields: [{
                                                        label: 'Nguy??n nh??n b??? khuy???t t???t kh??c',
                                                        field: 'c3_NguyenNhanKhuyetTat_KhacText'
                                                    }]
                                                },
                                                {
                                                    label: 'C5. Hi???n tr???ng s???c kho??? li??n quan ?????n khuy???t t???t',
                                                    fields: [
                                                        {
                                                            label: 'C5.1. Kh?? kh??n v???n ?????ng, di chuy???n',
                                                            field: 'c5_KhoKhanVanDong'
                                                        },
                                                        {
                                                            label: 'Kh?? kh??n v???n ?????ng, di chuy???n kh??c',
                                                            field: 'c5_KhoKhanVanDong_KhacText'
                                                        },
                                                        {
                                                            label: 'C5.2. Kh?? kh??n nghe n??i',
                                                            field: 'c5_KhoKhanNgheNoi'
                                                        },
                                                        {
                                                            label: 'Kh?? kh??n nghe n??i kh??c',
                                                            field: 'c5_KhoKhanNgheNoi_KhacText'
                                                        },
                                                        {
                                                            label: 'C5.3. Kh?? kh??n v??? th??? l???c',
                                                            field: 'c5_KhoKhanThiLuc'
                                                        },
                                                        {
                                                            label: 'Kh?? kh??n kh??c khi nh??n',
                                                            field: 'c5_KhoKhanThiLuc_KhacText'
                                                        },
                                                        {
                                                            label: 'C5.4. V???n ????? th???n kinh, t??m th???n',
                                                            field: 'c5_VanDeThanKinh_BDK'
                                                        },
                                                        {
                                                            label: 'V???n ????? th???n kinh, t??m th???n kh??c',
                                                            field: 'c5_VanDeThanKinh_KhacText'
                                                        },
                                                        {
                                                            label: 'C5.5. V???n ????? v??? tr?? tu???',
                                                            field: 'c5_VanDeTriTue'
                                                        },
                                                        {
                                                            label: 'V???n ????? tr?? tu??? kh??c',
                                                            field: 'c5_VanDeTriTue_KhacText'
                                                        },
                                                        {
                                                            label: 'C5.6. V???n ????? v??? d???ng khuy???t t???t kh??c',
                                                            field: 'c5_VanDeDangKhuyetTatKhac_DD'
                                                        },
                                                        {
                                                            label: 'V???n ????? v??? d???ng khuy???t t???t kh??c',
                                                            field: 'c5_VanDeDangKhuyetTatKhac_KhacText'
                                                        },
                                                    ]
                                                },
                                                {
                                                    label: 'C6. Kh??? n??ng t??? ph???c v??? nhu c???u sinh ho???t h??ng ng??y',
                                                    field: 'c6_KhaNangTuPhucVu',
                                                },
                                            ]
                                        },
                                        {
                                            title: 'GI??O D???C, D???Y NGH???, VI???C L??M V?? THU NH???P',
                                            fields: [
                                                {
                                                    label: 'D1. Hi???n tr???ng gi??o d???c',
                                                    field: 'd1_ThucTrangGiaoDuc',
                                                },
                                                {
                                                    label: 'D2. Hi???n tr???ng d???y ngh???',
                                                    fields: [
                                                        {
                                                            label: 'D2.1 Th???i gian h???c ngh???',
                                                            field: 'd2_ThucTrangDayNghe'
                                                        },
                                                        {
                                                            label: 'Hi???n tr???ng d???y ngh??? kh??c',
                                                            field: 'd2_ThucTrangDayNghe_KhacText'
                                                        },
                                                    ]
                                                },
                                                {
                                                    label: 'D3. Hi???n tr???ng vi???c l??m',
                                                    field: 'd3_ThucTrangViecLam',
                                                    fields: [
                                                        {
                                                            label: 'D3.1. Thu nh???p b??nh qu??n h??ng th??ng c???a NKT (?????ng)',
                                                            field: 'd3_ThuNhapBinhQuan'
                                                        },
                                                        {
                                                            label: 'D3.2. Ngu???n thu nh???p',
                                                            field: 'd3_NguonThuNhap'
                                                        },
                                                        {
                                                            label: 'Ngu???n thu nh???p kh??c',
                                                            field: 'd3_NguonThuNhap_KhacText'
                                                        },
                                                        {
                                                            label: 'D3.3. L?? do kh??ng c?? vi???c l??m',
                                                            field: 'd3_LyDoKhongCoViec'
                                                        },
                                                        {
                                                            label: 'L?? do kh??ng c?? vi???c l??m kh??c',
                                                            field: 'd3_LyDoKhongCoViec_KhacText'
                                                        },
                                                    ]
                                                },
                                                {
                                                    label: 'D4. C??c lo???i h??nh tr??? c???p x?? h???',
                                                    fields: [
                                                        {
                                                            label: 'D4.1. Tr??? c???p BTXH h??ng th??ng',
                                                            field: 'd4_TroCapBTXH'
                                                        },
                                                        {
                                                            label: 'S??? ti???n h?????ng h??ng th??ng',
                                                            field: 'd4_TroCapBTXH_SoTien'
                                                        },
                                                        {
                                                            label: 'D4.2. Tr??? c???p h??? tr??? h??? gia ????nh ??ang tr???c ti???p nu??i d?????ng ch??m s??c NKT??BN',
                                                            field: 'd4_TroCapChamSocNKT'
                                                        },
                                                        {
                                                            label: 'S??? ti???n h?????ng h??ng th??ng',
                                                            field: 'd4_TroCapChamSocNKT_SoTien'
                                                        },
                                                        {
                                                            label: 'D4.3. C??c ch????ng tr??nh tr??? gi??p x?? h???i kh??c',
                                                            field: 'd4_ChuongTrinhTGXHKhac'
                                                        },
                                                        {
                                                            label: 'S??? ti???n h?????ng h??ng th??ng',
                                                            field: 'd4_ChuongTrinhTGXHKhac_SoTien'
                                                        },
                                                        {
                                                            label: 'D4.4. C??c d???ch v??? x?? h???i c?? b???n kh??c ???????c h?????ng',
                                                            field: 'd4_DichVuXaHoiCoBan'
                                                        },
                                                    ]
                                                },
                                            ]
                                        },
                                        {
                                            title: '??I???U KI???N NH?? ??? V?? SINH HO???T',
                                            fields: [
                                                {
                                                    label: '??1. ??i???u ki???n v??? nh?? ???, n?????c sinh ho???t, nh?? v??? sinh',
                                                    fields: [
                                                        {
                                                            label: '??1.1. Nh?? ???',
                                                            field: 'dD1_NhaO',
                                                        },
                                                        {
                                                            label: '??1.2. N?????c sinh ho???t',
                                                            field: 'dD1_NuocSinhHoat',
                                                        },
                                                        {
                                                            label: '??1.3. Nh?? v??? sinh',
                                                            field: 'dD1_NhaVeSinh',
                                                        },
                                                    ],
                                                },
                                                {
                                                    label: '??2. Hi???n tr???ng ti???p c???n trong gia ????nh',
                                                    fields: [
                                                        {
                                                            label: '??2.1. C?? th??? di chuy???n ?????n m???i n??i trong nh??',
                                                            field: 'dD2_CoTheDiChuyenTrongNha',
                                                        },
                                                        {
                                                            label: '??2.2. C?? th??? s??? d???ng nh?? v??? sinh',
                                                            field: 'dD2_CoTheSuDungNhaVeSinh',
                                                        },
                                                        {
                                                            label: 'Hi???n tr???ng ti???p c???n trong gia ????nh kh??c',
                                                            field: 'dD2_Khac',
                                                        },
                                                    ],
                                                },
                                            ]
                                        },
                                        {
                                            title: 'T??M L??, X?? H???I V?? HO?? NH???P C???NG ?????NG',
                                            fields: [
                                                {
                                                    label: 'E1. T??m l??',
                                                    field: 'e1_TamLy',
                                                    fields: [
                                                        {
                                                            label: 'T??m l?? kh??c',
                                                            field: 'e1_TamLy_KhacText',
                                                        },
                                                    ],
                                                },
                                                {
                                                    label: 'E2. Ho?? nh???p x?? h???i',
                                                    fields: [
                                                        {
                                                            label: 'E2.1. Tham gia gia c??c ho???t ?????ng ??? c???ng ?????ng',
                                                            field: 'e2_ThamGiaHoatDongCongDong',
                                                        },
                                                        {
                                                            label: 'E2.2. Tham gia ho???t ?????ng nh??m, t???p th???',
                                                            field: 'e2_ThamGiaHoatDongTapThe',
                                                        },
                                                        {
                                                            label: 'E2.3. Tham gia c??c ho???t ?????ng gia ????nh',
                                                            field: 'e2_ThamGiaHoatDongGiaDinh',
                                                        },
                                                        {
                                                            label: 'E2.4. Kh??c',
                                                            field: 'e2_ThamGiaHoatDongKhac',
                                                        },
                                                    ],
                                                },
                                                {
                                                    label: 'E3. N??ng l???c k??? n??ng s???ng',
                                                    field: 'e3_NangLucKyNangSong_SDL',
                                                    fields: [
                                                        {
                                                            label: 'N??ng l???c k??? n??ng s???ng kh??c',
                                                            field: 'e3_NangLucKyNangSong_KhacText',
                                                        },
                                                    ]
                                                },
                                                {
                                                    label: 'E4. Ti???p c???n giao th??ng v?? c??ng tr??nh x??y d???ng',
                                                    field: 'e4_TiepCanGiaoThongVaCongTrinh',
                                                },
                                                {
                                                    label: 'E5. Ti???p c???n v??n h??a, th??? thao',
                                                    fields: [
                                                        {
                                                            label: 'E5.1. V??n h??a',
                                                            field: 'e5_TiepCanVanHoa',
                                                        },
                                                        {
                                                            label: 'E5.2. Th??? thao',
                                                            field: 'e5_TiepCanTheThao',
                                                        },
                                                    ],
                                                },
                                                {
                                                    label: 'E6. Tr??? gi??p ph??p l??',
                                                    field: 'e6_TroGiupPhapLy',
                                                    fields: [
                                                        {
                                                            label: 'Tr??? gi??p ph??p l?? kh??c',
                                                            field: 'e6_TroGiupPhapLy_KhacText',
                                                        },
                                                    ],
                                                },
                                            ]
                                        },
                                        {
                                            title: 'TH??NG TIN V??? NG?????I GI??M H??? HO???C CH??M S??C',
                                            fields: [
                                                {
                                                    label: 'H1. H??? v?? t??n',
                                                    field: 'h1_HoTenNguoiGiamHo',
                                                },
                                                {
                                                    label: 'H2. Ng??y sinh, gi???i t??nh',
                                                    fields: [
                                                        {
                                                            label: 'Ng??y sinh',
                                                            type: 'date',
                                                            format: 'DD/MM/YYYY',
                                                            field: 'h2_NgaySinhNguoiGiamHo',
                                                        },
                                                        {
                                                            label: 'Gi???i t??nh',
                                                            field: 'h2_GioiTinhNguoiGiamHo',
                                                        },
                                                    ]
                                                },
                                                {
                                                    label: 'H3. S??? CMND ng?????i gi??m h???',
                                                    field: 'h3_SoCMNDNguoiGiamHo',
                                                },
                                                {
                                                    label: 'H4. S??? ??i???n tho???i ng?????i gi??m h???',
                                                    field: 'h4_SoDienThoaiNguoiGiamHo',
                                                },
                                                {
                                                    label: 'H5. Quan h??? v???i NKT',
                                                    field: 'h5_QuanHeVoiNKT',
                                                    fields: [
                                                        {
                                                            label: 'Quan h??? v???i NKT (Kh??c)',
                                                            field: 'h5_QuanHeVoiNKT_Khac',
                                                        },
                                                    ],
                                                },
                                                {
                                                    label: 'H6. ?????a ch??? ng?????i gi??m h???',
                                                    field: 'h6_DiaChiNguoiGiamHo',
                                                    fields: [
                                                        {
                                                            label: 'T???nh/Th??nh ph???',
                                                            field: 'h6_DiaChi_TinhTP',
                                                        },
                                                        {
                                                            label: 'Huy???n/Qu???n',
                                                            field: 'h6_DiaChi_QuanHuyen',
                                                        },
                                                        {
                                                            label: 'X??/Ph?????ng ',
                                                            field: 'h6_DiaChi_PhuongXa',
                                                        },
                                                        {
                                                            label: 'Th??n/T??? d??n ph???',
                                                            field: 'h6_DiaChi_ThonTo',
                                                        },
                                                    ]
                                                },
                                            ]
                                        },
                                        {
                                            title: 'TH??NG TIN V??? NG?????I KHAI THAY',
                                            fields: [
                                                {
                                                    label: 'I1. H??? v?? t??n',
                                                    field: 'i1_HoTenNguoiKeKhai',
                                                }, {
                                                    label: 'I2. Ng??y sinh, gi???i t??nh',
                                                    fields: [
                                                        {
                                                            label: 'Ng??y sinh',
                                                            type: "date",
                                                            field: 'i2_NgaySinhNguoiKeKhai'
                                                        },
                                                        {
                                                            label: 'Gi???i t??nh',
                                                            field: 'i2_GioiTinhNguoiGiamHo'
                                                        },
                                                    ]
                                                },
                                                {
                                                    label: 'I3. S??? CMND ng?????i khai thay',
                                                    field: 'i3_SoCMNDNguoiKeKhai',
                                                },
                                                {
                                                    label: 'I4. S??? ??i???n tho???i ng?????i khai thay',
                                                    field: 'i4_SoDienThoaiNguoiKeKhai',
                                                },
                                                {
                                                    label: 'H5. Quan h??? v???i NKT',
                                                    field: 'i5_QuanHeVoiNKT',
                                                    fields: [
                                                        {
                                                            label: 'Quan h??? v???i NKT (Kh??c)',
                                                            field: 'i5_QuanHeVoiNKT_Khac',
                                                        },
                                                    ],
                                                },
                                                {
                                                    label: 'I6. ?????a ch??? ng?????i khai thay',
                                                    field: 'i6_DiaChiNguoiKhaiThay',
                                                    fields: [
                                                        {
                                                            label: 'T???nh/Th??nh ph???',
                                                            field: 'i6_DiaChi_TinhTP',
                                                        },
                                                        {
                                                            label: 'Huy???n/Qu???n',
                                                            field: 'i6_DiaChi_QuanHuyen',
                                                        },
                                                        {
                                                            label: 'X??/Ph?????ng',
                                                            field: 'i6_DiaChi_PhuongXa',
                                                        },
                                                        {
                                                            label: 'Th??n/T??? d??n ph???',
                                                            field: 'i6_DiaChi_ThonTo',
                                                        }
                                                    ]
                                                },
                                            ],
                                        },
                                    ].map((e, index) => (
                                        <ScrollView
                                            key={index}
                                            tabLabel={e.title}
                                            contentContainerStyle={{
                                                paddingHorizontal: 10
                                            }}
                                        >
                                            {
                                                e.fields.filter(e => e != null && e != false).map((e, index) => (
                                                    <View
                                                        key={index}
                                                        style={{
                                                            marginTop: index == 0 ? 0 : 10,
                                                            borderColor: '#f2f2f2',
                                                            borderTopWidth: index == 0 ? 0 : 1,
                                                            paddingVertical: 8
                                                        }}
                                                    >
                                                        <Text
                                                            style={{
                                                                fontWeight: 'bold',
                                                                paddingVertical: 5
                                                            }}
                                                        >{e.label}</Text>
                                                        {
                                                            <View style={{ paddingHorizontal: 15, }}>
                                                                {
                                                                    (() => {
                                                                        var value = data.data[e.field];
                                                                        return (value === undefined || value === null || value === '') ? null :
                                                                            <Text style={{ paddingVertical: 5 }}>
                                                                                {
                                                                                    e.type == 'date' ?
                                                                                        new Date(value).format(e.format)
                                                                                        : value
                                                                                }
                                                                            </Text>
                                                                    })()
                                                                }
                                                                {
                                                                    e.view != null && e.view
                                                                }
                                                                {e.fields != null &&
                                                                    <View>
                                                                        {e.fields.map((e, index) => {
                                                                            var value = data.data[e.field];
                                                                            return ((value === undefined || value === null || value === '') ? null :
                                                                                <View key={index}>
                                                                                    <Text>{'{0}: {1}'.format(e.label,
                                                                                        e.type == 'date' ?
                                                                                            new Date(value).format(e.format)
                                                                                            : value
                                                                                    )}</Text>
                                                                                </View>
                                                                            )
                                                                        })}
                                                                    </View>
                                                                }
                                                                {
                                                                    (() => {
                                                                        if (e.groups == null) return null;
                                                                        var label = e.groups.label || '';
                                                                        var values = e.groups.fields.map(key => data.data[key]).filter(e => e != null && e != '').join('\n');
                                                                        if (values != '') {
                                                                            return (
                                                                                <View
                                                                                    style={{
                                                                                        padding: 10,
                                                                                        paddingVertical: 5,
                                                                                        backgroundColor: '#f9f9f9'
                                                                                    }}
                                                                                >
                                                                                    {label != '' &&
                                                                                        <Text
                                                                                            style={{
                                                                                                fontWeight: 'bold',
                                                                                                paddingVertical: 5
                                                                                            }}
                                                                                        >{label}</Text>
                                                                                    }
                                                                                    {values != '' &&
                                                                                        <Text>
                                                                                            {values}
                                                                                        </Text>
                                                                                    }
                                                                                </View>
                                                                            )
                                                                        }
                                                                        return null;
                                                                    })()
                                                                }
                                                            </View>
                                                        }
                                                    </View>
                                                ))
                                            }
                                        </ScrollView>
                                    ))
                                }
                            </ScrollableTabView>
                            {__DEV__ &&
                                <Text>{data.data.daCapGiayChungNhan}</Text>
                            }
                            {
                                user.maXa > 0 && (
                                    data.data.daCapGiayChungNhan == 0 || data.data.daCapGiayChungNhan == 1 || data.data.daCapGiayChungNhan == null || data.data.daCapGiayChungNhan == -1
                                ) &&
                                <ViewCus.ViewHorizontal
                                    style={{
                                        justifyContent: 'space-around',
                                        paddingVertical: 10
                                    }}
                                >
                                    {
                                        [
                                            (
                                                data.data.daCapGiayChungNhan == 0 || data.data.daCapGiayChungNhan == -1
                                            ) &&
                                            {
                                                label: 'Ti???p nh???n',
                                                color: appColors.metronicSuccess,
                                                onPress: ApproveInfo
                                            },
                                            (
                                                data.data.daCapGiayChungNhan == null || data.data.daCapGiayChungNhan == 0
                                            ) &&
                                            {
                                                label: 'T??? ch???i ti???p nh???n',
                                                color: appColors.materialRed,
                                                onPress: RejectInfo
                                            },
                                            (
                                                data.data.daCapGiayChungNhan == 1
                                            ) &&
                                            {
                                                label: 'H???y ti???p nh???n th??ng tin',
                                                color: appColors.materialRed,
                                                onPress: CancelRequestInfo
                                            },
                                        ].filter(e => e != null && e !== false).map((e, index) => (
                                            <ButtonPrimary Button
                                                key={index}
                                                style={{
                                                    backgroundColor: e.color,
                                                    width: null,
                                                    paddingHorizontal: 40
                                                }}
                                                onPress={() => e.onPress(data.data)}
                                            >
                                                {e.label}
                                            </ButtonPrimary>
                                        ))
                                    }
                                </ViewCus.ViewHorizontal>
                            }
                        </>

                    }
                </View>
            </Screen>
        </>
    );
}
