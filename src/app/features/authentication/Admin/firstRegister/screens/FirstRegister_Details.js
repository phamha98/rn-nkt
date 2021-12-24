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
        }, null, 'Bạn có muốn tiếp nhận?')
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
        }, null, 'Bạn có muốn từ chối tiếp nhận?')
    }
    return (
        <>
            <ViewCus.Prompt
                ref={refPromptCancelRequest}
                title='Hủy tiếp nhận thông tin'
                buttonText='Từ chối'
                placeholder='Lý do từ chối'
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
                    headerTx={'Chi tiết đăng ký lần đầu'}
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
                                            title: 'THÔNG TIN CHUNG',
                                            fields: [
                                                {
                                                    label: 'A1. Giấy xác nhận khuyết tật',
                                                    field: 'a1_GiayXacNhanKhuyetTat',
                                                },
                                                {
                                                    label: 'A2. Mã số giấy xác nhận khuyết tật',
                                                    field: 'a2_MaSo',
                                                },
                                                {
                                                    label: 'A3. Ngày cấp giấy xác nhận',
                                                    fields: [
                                                        {
                                                            label: 'Ngày cấp',
                                                            type: 'date',
                                                            format: 'DD/MM/YYYY',
                                                            field: 'a3_NgayCap',
                                                        },
                                                        {
                                                            label: 'Hội đồng xác nhận',
                                                            field: 'hoiDongXacNhan',
                                                        },
                                                    ]
                                                },
                                                {
                                                    label: 'A4. Họ và tên',
                                                    field: 'a4_HoTen',
                                                },
                                                {
                                                    label: 'A5. Ngày tháng năm sinh',
                                                    type: 'date',
                                                    format: 'DD/MM/YYYY',
                                                    field: 'a5_NgaySinh',
                                                },
                                                {
                                                    label: 'A6. Giới tính',
                                                    field: 'a6_GioiTinh',
                                                },
                                                {
                                                    label: 'A7. Dân tộc',
                                                    groups: {
                                                        label: null,
                                                        fields: [
                                                            'a7_DanToc',
                                                            'a7_DanToc_KhacText',
                                                        ]
                                                    }
                                                },
                                                {
                                                    label: 'A8. Số CMND/CCCD',
                                                    field: 'a8_CMND',
                                                    fields: [
                                                        {
                                                            label: 'Ngày cấp',
                                                            type: 'date',
                                                            format: 'DD/MM/YYYY',
                                                            field: 'a8_CMND_NgayCap',
                                                        },
                                                        {
                                                            label: 'Nơi cấp',
                                                            field: 'a8_CMND_NoiCap',
                                                        },
                                                    ]
                                                },
                                                {
                                                    label: 'A9. Mã số định danh (nếu có)',
                                                    field: 'a9_MaDinhDanh',
                                                    fields: [
                                                        {
                                                            label: 'Ngày cấp',
                                                            type: 'date',
                                                            format: 'DD/MM/YYYY',
                                                            field: 'a9_MSDD_NgayCap',
                                                        },
                                                        {
                                                            label: 'Nơi cấp',
                                                            field: 'a9_MSDD_NoiCap',
                                                        },
                                                    ]
                                                },
                                                {
                                                    label: 'A10. Mã an sinh xã hội (nếu có)',
                                                    field: 'a10_MaASXH',
                                                },
                                                {
                                                    label: 'A11. SĐT liên hệ, Email',
                                                    groups: {
                                                        label: null,
                                                        fields: [
                                                            'a11_SoDienThoai',
                                                            'a11_Email',
                                                        ]
                                                    }
                                                },
                                                {
                                                    label: 'A12. Hộ khẩu thường trú',
                                                    fields: [
                                                        {
                                                            label: 'Tỉnh/Thành phố ',
                                                            field: 'a12_HKTT_Tinh',
                                                        },
                                                        {
                                                            label: 'Huyện/Quận',
                                                            field: 'a12_HKTT_Huyen',
                                                        },
                                                        {
                                                            label: 'Xã/Phường',
                                                            field: 'a12_HKTT_Xa',
                                                        },
                                                        {
                                                            label: 'Thôn/Tổ dân phố',
                                                            field: 'a12_HKTT_Thon',
                                                        },
                                                    ]
                                                },
                                                {
                                                    label: 'A13. Nơi ở hiện tại',
                                                    field: 'd7_NoiChamSocNKT',
                                                    fields: [
                                                        {
                                                            label: 'Tỉnh/Thành phố',
                                                            field: 'a13_NOHT_Tinh',
                                                        },
                                                        {
                                                            label: 'Huyện/Quận',
                                                            field: 'a13_NOHT_Huyen',
                                                        },
                                                        {
                                                            label: 'Xã/Phường',
                                                            field: 'a13_NOHT_Xa',
                                                        },
                                                        {
                                                            label: 'Thôn/Tổ dân phố',
                                                            field: 'a13_NOHT_Thon',
                                                        },
                                                    ]
                                                },
                                                {
                                                    label: 'A14. Tình trạng hôn nhân hiện nay',
                                                    field: 'a14_TinhTrangHonNhan'
                                                },
                                                {
                                                    label: 'A15. Tổng số con của NKT',
                                                    fields: [
                                                        {
                                                            label: 'Tổng số con của NKT',
                                                            field: 'd5_TongSoConCuaNKT'
                                                        },
                                                        {
                                                            label: 'Trong đó, tổng số con dưới 16 tuổi (người)',
                                                            field: 'd5_TongSoConDuoi16'
                                                        },
                                                        {
                                                            label: 'Con số 1: năm sinh',
                                                            type: 'date',
                                                            format: 'DD/MM/YYYY',
                                                            field: 'd5_NamSinhCon1'
                                                        },
                                                        {
                                                            label: 'Con số 2: năm sinh',
                                                            type: 'date',
                                                            format: 'DD/MM/YYYY',
                                                            field: 'd5_NamSinhCon2'
                                                        },
                                                        {
                                                            label: 'Con số 3: năm sinh',
                                                            type: 'date',
                                                            format: 'DD/MM/YYYY',
                                                            field: 'd5_NamSinhCon3'
                                                        },
                                                        {
                                                            label: 'Con số 4: năm sinh',
                                                            type: 'date',
                                                            format: 'DD/MM/YYYY',
                                                            field: 'd5_NamSinhCon4'
                                                        },
                                                    ]
                                                },
                                                {
                                                    label: 'A16. NKT đang mang thai tháng thứ',
                                                    field: 'd6_NKTMangThaiHoacNuoiConNho'
                                                },
                                                {
                                                    label: 'A17. Tên trường học(nếu đang đi học):',
                                                    field: 'a17_TenTruongDangDiHoc'
                                                },
                                                {
                                                    label: 'A18. Vị thế NKT trong gia đình',
                                                    field: 'a18_ViTheTrongGiaDinh'
                                                },
                                            ]
                                        },
                                        {
                                            title: 'THÔNG TIN VỀ HỘ GIA ĐÌNH',
                                            fields: [
                                                {
                                                    label: 'B1. Mã hộ',
                                                    field: 'b1_MaHo',
                                                },
                                                {
                                                    label: 'B2.1. Họ và tên chủ hộ',
                                                    field: 'b2_ChuHo_HoTen',
                                                },
                                                {
                                                    label: 'B2.2. Ngày sinh',
                                                    type: 'date',
                                                    format: 'DD/MM/YYYY',
                                                    field: 'b2_NgaySinhChuHo',
                                                },
                                                {
                                                    label: 'B2.3. Số CMND/CCCD hoặc mã số đinh danh cá nhân',
                                                    field: 'b2_SoCMNDChuHo',
                                                    fields: [
                                                        {
                                                            label: 'Ngày cấp',
                                                            type: 'date',
                                                            format: 'DD/MM/YYYY',
                                                            field: 'b2_NgayCap',
                                                        },
                                                        {
                                                            label: 'Nơi cấp',
                                                            field: 'b2_NoiCap',
                                                        },
                                                    ]
                                                },
                                                {
                                                    label: 'B2.4. Số điện thoại chủ hộ',
                                                    field: 'b2_SoDienThoai',
                                                },
                                                {
                                                    label: 'B3. Giới tính chủ hộ',
                                                    field: 'b3_ChuHo_GioiTinh',
                                                },
                                                {
                                                    label: 'B4. Quan hệ với NKT',
                                                    field: 'b4_ChuHo_QuanHeVoiNKT',
                                                    fields: [
                                                        {
                                                            label: 'Quan hệ với NKT (Khác)',
                                                            fields: 'b4_ChuHo_QuanHeVoiNKT_KhacText'
                                                        }
                                                    ]
                                                },
                                                {
                                                    label: 'B5. Nghề nghiệp hiện nay',
                                                    field: 'b5_NgheNghiep',
                                                },
                                                {
                                                    label: 'B6. Hoàn cảnh kinh tế gia đình',
                                                    field: 'b6_HoanCanhKinhTe',
                                                },
                                                {
                                                    label: 'B7. Số người trong gia đình',
                                                    fields: [
                                                        {
                                                            label: '1. Tổng số nhân khẩu (người)',
                                                            field: 'b7_SoNhanKhau_Tong'
                                                        },
                                                        {
                                                            label: '2. Số NKT',
                                                            field: 'b7_SoNhanKhau_NKT'
                                                        },
                                                        {
                                                            label: '3. Số trẻ dưới 16 tuổi',
                                                            field: 'b7_SoNhanKhau_TreDuoi16',
                                                        },
                                                        {
                                                            label: '4. Số người lao động, tạo ra thu nhập',
                                                            field: 'b7_SoNhanKhau_NguoiLaoDong',
                                                        },
                                                        {
                                                            label: '5. Số người cao tuổi (từ 60 tuổi trở lên)',
                                                            field: 'b7_SoNhanKhau_NguoiCaoTuoi',
                                                        },
                                                    ]
                                                },
                                                (data.thanhvien || []).length > 0 &&
                                                {
                                                    label: 'Chi tiết thành viên trong gia đình',
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
                                                                    (e.hoTen || '') != '' && <Text>{'Họ và tên: {0}'.format(e.hoTen)}</Text>
                                                                }
                                                                {
                                                                    (e.ngaySinh || '') != '' && <Text>{'Ngày tháng năm sinh: {0}'.format(new Date(e.ngaySinh).format('DD/MM/YYYY'))}</Text>
                                                                }
                                                                {
                                                                    (e.cmnd || '') != '' && <Text>{'CMTND: {0}'.format(e.cmnd)}</Text>
                                                                }
                                                                {
                                                                    (e.quanHeChuHo || '') != '' && <Text>{'Quan hệ với chủ hộ: {0}'.format(e.quanHeChuHo)}</Text>
                                                                }
                                                            </View>
                                                        )
                                                    }),
                                                },
                                                {
                                                    label: 'B8. Nguồn thu nhập hiện nay',
                                                    field: 'b8_NguonThuNhap',
                                                },
                                                {
                                                    label: 'B9. Tổng thu nhập của hộ gia đình/tháng (đồng)',
                                                    field: 'b9_ThuNhapHo',
                                                },
                                                {
                                                    label: 'B10. Thu nhập bình quân người/tháng (đồng)',
                                                    field: 'b10_ThuNhapBinhQuan',
                                                },
                                                {
                                                    label: 'B11. Các khoản chi phí và khả năng chi trả từ gia đình',
                                                    fields: [
                                                        {
                                                            label: 'B11.1. Lương thực/thức ăn',
                                                            field: 'b11_ChiPhi_LuongThuc'
                                                        },
                                                        {
                                                            label: 'B11.2. Quần áo',
                                                            field: 'b11_ChiPhi_QuanAo'
                                                        },
                                                        {
                                                            label: 'B11.3. Khám và chữa bệnh',
                                                            field: 'b11_ChiPhi_KhamChuaBenh'
                                                        },
                                                        {
                                                            label: 'B11.4. Đóng học phí',
                                                            field: 'b11_ChiPhi_DongHocPhi'
                                                        },
                                                        {
                                                            label: 'B11.5. Uống thuốc',
                                                            field: 'b11_ChiPhi_UongThuoc'
                                                        },
                                                        {
                                                            label: 'B11.6. Chi phí khác',
                                                            field: 'b11_ChiPhi_Khac'
                                                        },
                                                    ]
                                                },
                                                {
                                                    label: 'B12. Khả năng chăm sóc đối tượng của gia đình',
                                                    fields: [
                                                        {
                                                            label: 'Sự quan tâm chăm sóc',
                                                            field: 'b12_SuQuanTamChamSoc'
                                                        },
                                                        {
                                                            label: 'Môi trường chăm sóc',
                                                            field: 'b12_MoiTruongChamSoc'
                                                        },
                                                        {
                                                            label: 'Năng lực chăm sóc (có kiến thức và kỹ năng)',
                                                            field: 'b12_NangLucChamSoc'
                                                        },
                                                    ]
                                                },
                                            ]
                                        },
                                        {
                                            title: 'THÔNG TIN HIỆN TRẠNG',
                                            fields: [
                                                {
                                                    label: 'C1. Dạng khuyết tật',
                                                    field: 'c1_DangKhuyetTat',
                                                    fields: [
                                                        {
                                                            label: 'Dạng khuyết tật khác',
                                                            field: 'c1_DangKhuyetTat_KhacText'
                                                        },
                                                    ]
                                                },
                                                {
                                                    label: 'C2. Mức độ khuyết tật',
                                                    field: 'c2_MucDoKhuyetTat',
                                                },
                                                {
                                                    label: 'C3_NguyenNhanKhuyetTat_BS',
                                                    field: 'c3_NguyenNhanKhuyetTat',
                                                    fields: [{
                                                        label: 'Nguyên nhân bị khuyết tật khác',
                                                        field: 'c3_NguyenNhanKhuyetTat_KhacText'
                                                    }]
                                                },
                                                {
                                                    label: 'C5. Hiện trạng sức khoẻ liên quan đến khuyết tật',
                                                    fields: [
                                                        {
                                                            label: 'C5.1. Khó khăn vận động, di chuyển',
                                                            field: 'c5_KhoKhanVanDong'
                                                        },
                                                        {
                                                            label: 'Khó khăn vận động, di chuyển khác',
                                                            field: 'c5_KhoKhanVanDong_KhacText'
                                                        },
                                                        {
                                                            label: 'C5.2. Khó khăn nghe nói',
                                                            field: 'c5_KhoKhanNgheNoi'
                                                        },
                                                        {
                                                            label: 'Khó khăn nghe nói khác',
                                                            field: 'c5_KhoKhanNgheNoi_KhacText'
                                                        },
                                                        {
                                                            label: 'C5.3. Khó khăn về thị lực',
                                                            field: 'c5_KhoKhanThiLuc'
                                                        },
                                                        {
                                                            label: 'Khó khăn khác khi nhìn',
                                                            field: 'c5_KhoKhanThiLuc_KhacText'
                                                        },
                                                        {
                                                            label: 'C5.4. Vấn đề thần kinh, tâm thần',
                                                            field: 'c5_VanDeThanKinh_BDK'
                                                        },
                                                        {
                                                            label: 'Vấn đề thần kinh, tâm thần khác',
                                                            field: 'c5_VanDeThanKinh_KhacText'
                                                        },
                                                        {
                                                            label: 'C5.5. Vấn đề về trí tuệ',
                                                            field: 'c5_VanDeTriTue'
                                                        },
                                                        {
                                                            label: 'Vấn đề trí tuệ khác',
                                                            field: 'c5_VanDeTriTue_KhacText'
                                                        },
                                                        {
                                                            label: 'C5.6. Vấn đề về dạng khuyết tật khác',
                                                            field: 'c5_VanDeDangKhuyetTatKhac_DD'
                                                        },
                                                        {
                                                            label: 'Vấn đề về dạng khuyết tật khác',
                                                            field: 'c5_VanDeDangKhuyetTatKhac_KhacText'
                                                        },
                                                    ]
                                                },
                                                {
                                                    label: 'C6. Khả năng tự phục vụ nhu cầu sinh hoạt hàng ngày',
                                                    field: 'c6_KhaNangTuPhucVu',
                                                },
                                            ]
                                        },
                                        {
                                            title: 'GIÁO DỤC, DẠY NGHỀ, VIỆC LÀM VÀ THU NHẬP',
                                            fields: [
                                                {
                                                    label: 'D1. Hiện trạng giáo dục',
                                                    field: 'd1_ThucTrangGiaoDuc',
                                                },
                                                {
                                                    label: 'D2. Hiện trạng dạy nghề',
                                                    fields: [
                                                        {
                                                            label: 'D2.1 Thời gian học nghề',
                                                            field: 'd2_ThucTrangDayNghe'
                                                        },
                                                        {
                                                            label: 'Hiện trạng dạy nghề khác',
                                                            field: 'd2_ThucTrangDayNghe_KhacText'
                                                        },
                                                    ]
                                                },
                                                {
                                                    label: 'D3. Hiện trạng việc làm',
                                                    field: 'd3_ThucTrangViecLam',
                                                    fields: [
                                                        {
                                                            label: 'D3.1. Thu nhập bình quân hàng tháng của NKT (đồng)',
                                                            field: 'd3_ThuNhapBinhQuan'
                                                        },
                                                        {
                                                            label: 'D3.2. Nguồn thu nhập',
                                                            field: 'd3_NguonThuNhap'
                                                        },
                                                        {
                                                            label: 'Nguồn thu nhập khác',
                                                            field: 'd3_NguonThuNhap_KhacText'
                                                        },
                                                        {
                                                            label: 'D3.3. Lý do không có việc làm',
                                                            field: 'd3_LyDoKhongCoViec'
                                                        },
                                                        {
                                                            label: 'Lý do không có việc làm khác',
                                                            field: 'd3_LyDoKhongCoViec_KhacText'
                                                        },
                                                    ]
                                                },
                                                {
                                                    label: 'D4. Các loại hình trợ cấp xã hộ',
                                                    fields: [
                                                        {
                                                            label: 'D4.1. Trợ cấp BTXH hàng tháng',
                                                            field: 'd4_TroCapBTXH'
                                                        },
                                                        {
                                                            label: 'Số tiền hưởng hàng tháng',
                                                            field: 'd4_TroCapBTXH_SoTien'
                                                        },
                                                        {
                                                            label: 'D4.2. Trợ cấp hỗ trợ hộ gia đình đang trực tiếp nuôi dưỡng chăm sóc NKTĐBN',
                                                            field: 'd4_TroCapChamSocNKT'
                                                        },
                                                        {
                                                            label: 'Số tiền hưởng hàng tháng',
                                                            field: 'd4_TroCapChamSocNKT_SoTien'
                                                        },
                                                        {
                                                            label: 'D4.3. Các chương trình trợ giúp xã hội khác',
                                                            field: 'd4_ChuongTrinhTGXHKhac'
                                                        },
                                                        {
                                                            label: 'Số tiền hưởng hàng tháng',
                                                            field: 'd4_ChuongTrinhTGXHKhac_SoTien'
                                                        },
                                                        {
                                                            label: 'D4.4. Các dịch vụ xã hội cơ bản khác được hưởng',
                                                            field: 'd4_DichVuXaHoiCoBan'
                                                        },
                                                    ]
                                                },
                                            ]
                                        },
                                        {
                                            title: 'ĐIỀU KIỆN NHÀ Ở VÀ SINH HOẠT',
                                            fields: [
                                                {
                                                    label: 'Đ1. Điều kiện về nhà ở, nước sinh hoạt, nhà vệ sinh',
                                                    fields: [
                                                        {
                                                            label: 'Đ1.1. Nhà ở',
                                                            field: 'dD1_NhaO',
                                                        },
                                                        {
                                                            label: 'Đ1.2. Nước sinh hoạt',
                                                            field: 'dD1_NuocSinhHoat',
                                                        },
                                                        {
                                                            label: 'Đ1.3. Nhà vệ sinh',
                                                            field: 'dD1_NhaVeSinh',
                                                        },
                                                    ],
                                                },
                                                {
                                                    label: 'Đ2. Hiện trạng tiếp cận trong gia đình',
                                                    fields: [
                                                        {
                                                            label: 'Đ2.1. Có thể di chuyển đến mọi nơi trong nhà',
                                                            field: 'dD2_CoTheDiChuyenTrongNha',
                                                        },
                                                        {
                                                            label: 'Đ2.2. Có thể sử dụng nhà vệ sinh',
                                                            field: 'dD2_CoTheSuDungNhaVeSinh',
                                                        },
                                                        {
                                                            label: 'Hiện trạng tiếp cận trong gia đình khác',
                                                            field: 'dD2_Khac',
                                                        },
                                                    ],
                                                },
                                            ]
                                        },
                                        {
                                            title: 'TÂM LÝ, XÃ HỘI VÀ HOÀ NHẬP CỘNG ĐỒNG',
                                            fields: [
                                                {
                                                    label: 'E1. Tâm lý',
                                                    field: 'e1_TamLy',
                                                    fields: [
                                                        {
                                                            label: 'Tâm lý khác',
                                                            field: 'e1_TamLy_KhacText',
                                                        },
                                                    ],
                                                },
                                                {
                                                    label: 'E2. Hoà nhập xã hội',
                                                    fields: [
                                                        {
                                                            label: 'E2.1. Tham gia gia các hoạt động ở cộng đồng',
                                                            field: 'e2_ThamGiaHoatDongCongDong',
                                                        },
                                                        {
                                                            label: 'E2.2. Tham gia hoạt động nhóm, tập thể',
                                                            field: 'e2_ThamGiaHoatDongTapThe',
                                                        },
                                                        {
                                                            label: 'E2.3. Tham gia các hoạt động gia đình',
                                                            field: 'e2_ThamGiaHoatDongGiaDinh',
                                                        },
                                                        {
                                                            label: 'E2.4. Khác',
                                                            field: 'e2_ThamGiaHoatDongKhac',
                                                        },
                                                    ],
                                                },
                                                {
                                                    label: 'E3. Năng lực kỹ năng sống',
                                                    field: 'e3_NangLucKyNangSong_SDL',
                                                    fields: [
                                                        {
                                                            label: 'Năng lực kỹ năng sống khác',
                                                            field: 'e3_NangLucKyNangSong_KhacText',
                                                        },
                                                    ]
                                                },
                                                {
                                                    label: 'E4. Tiếp cận giao thông và công trình xây dựng',
                                                    field: 'e4_TiepCanGiaoThongVaCongTrinh',
                                                },
                                                {
                                                    label: 'E5. Tiếp cận văn hóa, thể thao',
                                                    fields: [
                                                        {
                                                            label: 'E5.1. Văn hóa',
                                                            field: 'e5_TiepCanVanHoa',
                                                        },
                                                        {
                                                            label: 'E5.2. Thể thao',
                                                            field: 'e5_TiepCanTheThao',
                                                        },
                                                    ],
                                                },
                                                {
                                                    label: 'E6. Trợ giúp pháp lý',
                                                    field: 'e6_TroGiupPhapLy',
                                                    fields: [
                                                        {
                                                            label: 'Trợ giúp pháp lý khác',
                                                            field: 'e6_TroGiupPhapLy_KhacText',
                                                        },
                                                    ],
                                                },
                                            ]
                                        },
                                        {
                                            title: 'THÔNG TIN VỀ NGƯỜI GIÁM HỘ HOẶC CHĂM SÓC',
                                            fields: [
                                                {
                                                    label: 'H1. Họ và tên',
                                                    field: 'h1_HoTenNguoiGiamHo',
                                                },
                                                {
                                                    label: 'H2. Ngày sinh, giới tính',
                                                    fields: [
                                                        {
                                                            label: 'Ngày sinh',
                                                            type: 'date',
                                                            format: 'DD/MM/YYYY',
                                                            field: 'h2_NgaySinhNguoiGiamHo',
                                                        },
                                                        {
                                                            label: 'Giới tính',
                                                            field: 'h2_GioiTinhNguoiGiamHo',
                                                        },
                                                    ]
                                                },
                                                {
                                                    label: 'H3. Số CMND người giám hộ',
                                                    field: 'h3_SoCMNDNguoiGiamHo',
                                                },
                                                {
                                                    label: 'H4. Số điện thoại người giám hộ',
                                                    field: 'h4_SoDienThoaiNguoiGiamHo',
                                                },
                                                {
                                                    label: 'H5. Quan hệ với NKT',
                                                    field: 'h5_QuanHeVoiNKT',
                                                    fields: [
                                                        {
                                                            label: 'Quan hệ với NKT (Khác)',
                                                            field: 'h5_QuanHeVoiNKT_Khac',
                                                        },
                                                    ],
                                                },
                                                {
                                                    label: 'H6. Địa chỉ người giám hộ',
                                                    field: 'h6_DiaChiNguoiGiamHo',
                                                    fields: [
                                                        {
                                                            label: 'Tỉnh/Thành phố',
                                                            field: 'h6_DiaChi_TinhTP',
                                                        },
                                                        {
                                                            label: 'Huyện/Quận',
                                                            field: 'h6_DiaChi_QuanHuyen',
                                                        },
                                                        {
                                                            label: 'Xã/Phường ',
                                                            field: 'h6_DiaChi_PhuongXa',
                                                        },
                                                        {
                                                            label: 'Thôn/Tổ dân phố',
                                                            field: 'h6_DiaChi_ThonTo',
                                                        },
                                                    ]
                                                },
                                            ]
                                        },
                                        {
                                            title: 'THÔNG TIN VỀ NGƯỜI KHAI THAY',
                                            fields: [
                                                {
                                                    label: 'I1. Họ và tên',
                                                    field: 'i1_HoTenNguoiKeKhai',
                                                }, {
                                                    label: 'I2. Ngày sinh, giới tính',
                                                    fields: [
                                                        {
                                                            label: 'Ngày sinh',
                                                            type: "date",
                                                            field: 'i2_NgaySinhNguoiKeKhai'
                                                        },
                                                        {
                                                            label: 'Giới tính',
                                                            field: 'i2_GioiTinhNguoiGiamHo'
                                                        },
                                                    ]
                                                },
                                                {
                                                    label: 'I3. Số CMND người khai thay',
                                                    field: 'i3_SoCMNDNguoiKeKhai',
                                                },
                                                {
                                                    label: 'I4. Số điện thoại người khai thay',
                                                    field: 'i4_SoDienThoaiNguoiKeKhai',
                                                },
                                                {
                                                    label: 'H5. Quan hệ với NKT',
                                                    field: 'i5_QuanHeVoiNKT',
                                                    fields: [
                                                        {
                                                            label: 'Quan hệ với NKT (Khác)',
                                                            field: 'i5_QuanHeVoiNKT_Khac',
                                                        },
                                                    ],
                                                },
                                                {
                                                    label: 'I6. Địa chỉ người khai thay',
                                                    field: 'i6_DiaChiNguoiKhaiThay',
                                                    fields: [
                                                        {
                                                            label: 'Tỉnh/Thành phố',
                                                            field: 'i6_DiaChi_TinhTP',
                                                        },
                                                        {
                                                            label: 'Huyện/Quận',
                                                            field: 'i6_DiaChi_QuanHuyen',
                                                        },
                                                        {
                                                            label: 'Xã/Phường',
                                                            field: 'i6_DiaChi_PhuongXa',
                                                        },
                                                        {
                                                            label: 'Thôn/Tổ dân phố',
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
                                                label: 'Tiếp nhận',
                                                color: appColors.metronicSuccess,
                                                onPress: ApproveInfo
                                            },
                                            (
                                                data.data.daCapGiayChungNhan == null || data.data.daCapGiayChungNhan == 0
                                            ) &&
                                            {
                                                label: 'Từ chối tiếp nhận',
                                                color: appColors.materialRed,
                                                onPress: RejectInfo
                                            },
                                            (
                                                data.data.daCapGiayChungNhan == 1
                                            ) &&
                                            {
                                                label: 'Hủy tiếp nhận thông tin',
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
