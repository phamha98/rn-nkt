import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { toggleLoading } from '../../../../../../../App';
import { ButtonPrimary, Header, Screen, Text as TextCus, Wallpaper } from '../../../../../library/components';
import ViewCus from '../../../../../library/components/ViewCus/ViewCus';
import RestAPI from '../../../../../RestAPI';
import { GlobalStyle } from '../../../../../themes';
import { palette as appColors } from '../../../../../themes/palette';
import Form from '../../../../authentication/chat/screen/components/form';
import { Platform } from 'react-native';
const Text = (props) => <TextCus {...props} style={[{ color: 'black' }, props.style]} />

export default function FirstRegister_UpdateDetails(props) {
    const { navigation } = props

    var dataParam = navigation.state.params.data;

    const user = useSelector(state => state.AppReducer.profile.user);
    const refPromptCancelRequest = useRef();

    const refTabViewContainer = useRef()

    useEffect(() => {
        loadData(dataParam.id || 0);
        // loadData(159961);
    }, []);

    const loadData = async (id) => {
        toggleLoading(true);
        var provinces = (await RestAPI.Master_Province()).data;
        var districts = (await RestAPI.Master_District()).data;
        var wards = (await RestAPI.Master_Ward()).data;
        var ethnics = (await RestAPI.Master_Ethnic()).data;
        var dataSaved = (await RestAPI.FirstRegister_GetUpdateDetails(id));
        var isUpdate = id > 0;
        var isUpdateStatus = isUpdate && (dataSaved.ttc.daCapGiayChungNhan == null || dataSaved.ttc.daCapGiayChungNhan == 0);

        toggleLoading(false);

        refTabViewContainer.current?.setData({
            isReady: true,
            master: {
                provinces,
                districts,
                wards,
                ethnics,
            },
            dataSaved,
            isUpdate,
            isUpdateStatus,
            Id: id,
        });
    }

    const ApproveInfo = async (id) => {
        toggleLoading(true);
        var resp = await RestAPI.FirstRegister_ApproveInfo({
            "Id": id,
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
        })
        if (resp.status) {
            loadData(id)
        }
        toggleLoading();
    }

    const RejectInfo = (id) => {
        refPromptCancelRequest.current?.toggle(true, '', async (t) => {
            toggleLoading();
            var resp = await RestAPI.FirstRegister_RejectInfo({
                "Id": id,
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
                loadData(id)
            }
            toggleLoading();
            ViewCus.Alert.Alert(resp.messeger)
        });
    }

    const onSubmit = async (data, payload) => {
        toggleLoading(true);
        data.TTC = {
            ...data.TTC,
            ...payload,
            ...(payload.Id > 0 ? {
                "NgayCapNhat": new Date(),
                "NguoiCapNhat": user.userID,
            } : {
                    Id: 0,
                    "NgayTao": new Date(),
                    "NguoiTao": user.userID,
                }
            ),
            "UserId": user.userID
        }
        var resp = await RestAPI.FirstRegister_SaveUpdateDetails(data);
        console.log(resp)
        toggleLoading()
        if (resp != null && resp.result > 0) {
            ViewCus.Alert.Alert(payload.isUpdate ? 'Cập nhật thành công' : 'Tạo thành công', null, () => {
                loadData(resp.result)
            })
        }
        else {
            ViewCus.Alert.Alert('Có lỗi xẩy ra');
        }
    }
    return (
        <>
            <ViewCus.Prompt
                ref={refPromptCancelRequest}
                title='Từ chối tiếp nhận thông tin'
                buttonText='Từ chối'
                placeholder='Từ chối tiếp nhận thông tin'
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
                    headerTx={'Đăng ký, cập nhật thông tin'}
                />
                <ViewCus.ComponentDynamic
                    ref={refTabViewContainer}
                    render={({
                        isReady = false,
                        dataSaved,
                        master,
                        isUpdate,
                        isUpdateStatus,
                        Id
                    } = {}) => {
                        return (isReady &&
                            <>
                                <Form
                                    master={master}
                                    dataSaved={dataSaved}
                                    onSubmit={(data: object, payload: object) => onSubmit(data, payload)}
                                    onRefresh={() => loadData(Id)}
                                    isRefresh={new Date().getTime()}
                                    lockTab={!isUpdate}
                                    submitLastView={(handleSubmit: Function) => {
                                        return (
                                            !isUpdate &&
                                            <ViewCus.ViewHorizontalCenter
                                                styleContainer={{
                                                    paddingVertical: 10
                                                }}
                                            >
                                                <ButtonPrimary
                                                    style={{
                                                        marginTop: 10
                                                    }}
                                                    onPress={() => handleSubmit({
                                                        Id,
                                                        TrangThai: 1, isUpdate
                                                    })}
                                                >
                                                    {'Lưu'}
                                                </ButtonPrimary>
                                            </ViewCus.ViewHorizontalCenter>
                                        )
                                    }}
                                />
                                <ViewCus.ViewHorizontal
                                    style={{
                                        justifyContent: 'space-around',
                                        paddingVertical: 10,
                                        backgroundColor: 'white',
                                        ...GlobalStyle.boxShadow
                                    }}
                                >
                                    {
                                        isUpdateStatus &&
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
                                                onPress={() => e.onPress(Id)}
                                            >
                                                {e.label}
                                            </ButtonPrimary>
                                        ))
                                    }
                                </ViewCus.ViewHorizontal>
                            </>
                        )
                    }}
                />
            </Screen>
        </>
    );
}
