import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { toggleLoading } from '../../../../../../../App';
import { Header, Screen, Text as TextCus, Wallpaper, Button, ButtonPrimary } from '../../../../../library/components';
import ViewCus from '../../../../../library/components/ViewCus/ViewCus';
import RestAPI from '../../../../../RestAPI/index';
import Form from '../../../danhSachNhuCauHoTro/components/form';
import { View } from 'react-native';
import DropDownHolder from '../../../../../library/utils/dropDownHolder';
import { palette as appColors } from '../../../../../themes/palette';
const Text = (props) => <TextCus {...props} style={[{ color: 'black' }, props.style]} />

const FirstRegister_UpdateSupport = (props) => {
    const { navigation } = props

    var dataParam = navigation.state.params.data;

    const user = useSelector(state => state.AppReducer.profile.user);

    const refContent = useRef();
    const refPromptReject = useRef();

    useEffect(() => {
        loadData(dataParam.id || 0, -1);
        // loadData(dataParam.id || 0, 137503);
    }, []);

    const loadData = async (ttcId, hoTroId) => {
        hoTroId = hoTroId == null ? -1 : hoTroId;
        toggleLoading(true);
        var resp = await RestAPI.FirstRegister_GetUpdateSupportByTTC_Id(ttcId);

        var { ttc, hoTro, loaiHinhThucHoTro, hinhThucHoTro, noiDungHoTro } = resp;

        var initData = noiDungHoTro.map((noiDungHoTroObj, index) => {
            var hinhThucHoTroObj = hinhThucHoTro.filter(e => e.id == noiDungHoTroObj.idHinhThucHoTro)[0]
            var loaiHinhHoTroObj = loaiHinhThucHoTro.filter(e => e.id == hinhThucHoTroObj?.idLoaiHinhThucHoTro)[0]
            var _return = {
                "Id": 0,
                "IdHoTro": hinhThucHoTroObj.id,
                "IdNoiDungHoTro": noiDungHoTroObj.id,
                "DaNhan": false,
                "UuTien": 0,
                "NoiDungHoTro": '',
                "GhiChu": '',
                isEditNoiDung: false,

                loaiHinhThucHoTro: loaiHinhHoTroObj.ten,
                hinhThucHoTro: hinhThucHoTroObj.ten,
                noiDungHoTro: noiDungHoTroObj.ten
            };

            if (noiDungHoTro[index + 1] != null && noiDungHoTroObj.idHinhThucHoTro != noiDungHoTro[index + 1].idHinhThucHoTro) {
                _return.isEditNoiDung = true;
            }
            return _return
        })

        if (hoTroId > 0) {
            var resp = await RestAPI.FirstRegister_GetUpdateSupportById(hoTroId);
            resp.hoTro_ChiTiet.map(chiTiet => {
                var indexOf = initData.findIndex(e => e.IdNoiDungHoTro == chiTiet.idNoiDungHoTro);
                if (indexOf >= 0) {
                    initData[indexOf] = {
                        ...initData[indexOf],
                        "DaNhan": chiTiet.daNhan,
                        "UuTien": chiTiet.uuTien,
                        "NoiDungHoTro": chiTiet.noiDungHoTro,
                        "GhiChu": chiTiet.ghiChu,
                    }
                }
            });

            hoTro = {
                ...hoTro,
                ...resp.hoTro
            }
        }

        console.log(initData)

        var status = '';

        toggleLoading(false);

        refContent.current?.setData({
            data: initData,
            status: status,
            isLock: status != '' && status != null,
            ttc: ttc,
            ttcId, hoTroId,
            hoTro
        });
    }

    const onSubmit = async (data, payload) => {
        var request = {
            "HoTro": {
                "Id": 0,
                "UserId": user.userID,
                "NgayTao": new Date(),
                "NguoiTao": user.userID,
                "NgayCapNhat": new Date(),
                "NguoiCapNhat": user.userID,
                "NgayDuyet": null,
                "NguoiDuyet": null,
                "DaCapQuyetDinhHoTro": null,
                "NguoiCap": null,
                "NgayCap": null,
                "TrangThai": 1,
                "DeNghiGQTCXH": false,
                "TiepNhanVaoTGXH": false,
                "QuanLyCa": false,
                "TT_MaTinh": 0,
                "TT_MaHuyen": 0,
                "TT_MaXa": 0,
                "TT_Ten": null,
                "TT_Id": null,
                "LyDoKhongDuyet": null,
                "NgayHuyenDuyet": null,
                "NguoiHuyenDuyet": null,
                ...payload
            },
            "HoTro_ChiTiet": data
        }
        var resp = await RestAPI.FirstRegister_UpdateSupport(request)

        if (resp.status == true) {
            DropDownHolder.showSuccess(('Cập nhập thành công!'));
            loadData(payload.UserId, resp.result);
        }
        else {
            DropDownHolder.showError(('Cập nhật thất bại!'));
        }
    }
    const ApproveInfo = async (id, ttcId) => {
        toggleLoading(true);
        var resp = await RestAPI.FirstRegister_UpdateSupportApprove({
            Id: id,
            TrangThai: 2,
            NguoiDuyet: user.userID,
            NgayDuyet: new Date()
        });
        loadData(ttcId, id);
        toggleLoading(false);
    }
    const RejectInfo = (id, ttcId) => {
        refPromptReject.current?.toggle(true, '', async (t) => {
            toggleLoading(true);
            var resp = await RestAPI.FirstRegister_UpdateSupportReject({
                Id: id,
                LyDoKhongDuyet: t,
                TrangThai: 0,
                NguoiCapNhat: user.userID,
                NgayCapNhat: new Date(),
            });
            loadData(ttcId, id);
            toggleLoading(false);
        });
    }
    return (
        <>
            <ViewCus.Prompt
                ref={refPromptReject}
                title='Lý do không duyệt'
                buttonText='Không duyệt'
                placeholder='Lý do không duyệt'
                multiline={true}
                numberOfLines={10}
                validate={{
                    required: true,
                }}
                styleInput={[
                    {
                        maxHeight: 200,
                    },
                    Platform.OS == 'ios' && { height: 200 }
                ]}
            />
            <Screen>
                <Wallpaper useWrap={true} />
                <Header
                    isBack={true}
                    headerTx={'Cập nhật thông tin nhu cầu hỗ trợ'}
                />
                <ViewCus.ComponentDynamic
                    ref={refContent}
                    styleContainer={{
                        backgroundColor: 'white',
                        flex: 1
                    }}
                    render={({ data = [], status, isLock = false, ttc, ttcId, hoTroId, hoTro } = {}) => {
                        return (data.length <= 0) ? null :
                            <>
                                {
                                    hoTroId <= 0 ? null :
                                        hoTro?.trangThai == 2 ?
                                            <ViewCus.Text
                                                style={{
                                                    textAlign: 'center',
                                                    paddingVertical: 10,
                                                    backgroundColor: appColors.metronicWarning,
                                                    color: 'white'
                                                }}
                                            >
                                                {'Phiếu này xã đã duyệt.'}
                                            </ViewCus.Text>
                                            : hoTro?.trangThai == 0 ?
                                                <ViewCus.Text
                                                    style={{
                                                        textAlign: 'center',
                                                        paddingVertical: 10,
                                                        backgroundColor: appColors.metronicWarning,
                                                        color: 'white'
                                                    }}
                                                >
                                                    {'Phiếu này đã bị xã trả lại.'}
                                                </ViewCus.Text>
                                                : null
                                }
                                <Form
                                    data={data}
                                    onRefresh={() => loadData(ttcId, hoTroId)}
                                    isRefresh={new Date().getTime()}
                                    onSubmit={(data, payload) => onSubmit(data, payload)}
                                    // isLock={isLock}
                                    topView={
                                        <Text
                                            style={{
                                                paddingVertical: 15,
                                                fontWeight: 'bold',
                                                fontSize: 17,
                                                textAlign: 'center',
                                                color: '#a94442'
                                            }}
                                        >
                                            {'Phiếu thông tin: {0}'.format(ttc.a4_HoTen)}
                                        </Text>
                                    }
                                    submitView={(handleSubmit) => (
                                        hoTroId <= 0 ?
                                            <View style={{ flex: 1, flexDirection: 'row', marginTop: 10, justifyContent: 'space-around' }}>
                                                <View style={{ flex: 0.5, padding: 5 }}>
                                                    <ButtonPrimary
                                                        onPress={() => handleSubmit({ TrangThai: 1, UserId: ttcId })}
                                                    >
                                                        {'Gửi xã duyệt'}
                                                    </ButtonPrimary>
                                                </View>
                                            </View>
                                            :
                                            hoTro?.trangThai == 1 &&
                                            <View style={{ flex: 1, flexDirection: 'row', marginTop: 10, justifyContent: 'space-around' }}>
                                                {
                                                    [
                                                        {
                                                            label: 'Duyệt',
                                                            color: appColors.metronicSuccess,
                                                            onPress: ApproveInfo
                                                        },
                                                        {
                                                            label: 'Không duyệt',
                                                            color: appColors.materialRed,
                                                            onPress: RejectInfo
                                                        },
                                                    ].filter(e => e != null && e !== false).map((e, index) => (
                                                        <ButtonPrimary Button
                                                            key={index}
                                                            style={{
                                                                backgroundColor: e.color,
                                                                width: null,
                                                                paddingHorizontal: 40
                                                            }}
                                                            onPress={() => e.onPress(hoTroId, ttcId)}
                                                        >
                                                            {e.label}
                                                        </ButtonPrimary>
                                                    ))
                                                }
                                            </View>
                                    )}
                                />
                            </>
                    }}
                />
            </Screen>
        </>
    )
}

export { FirstRegister_UpdateSupport };
export default FirstRegister_UpdateSupport;

