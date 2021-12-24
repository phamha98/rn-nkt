import React, { useEffect, useRef, useState } from 'react';
import { Linking, RefreshControl, ScrollView, View } from 'react-native';
import { useSelector } from 'react-redux';
import { toggleLoading } from '../../../../../../../App';
import { Button, FontAwesomeFont, Header, IoniconsFont, MaterialCommunityIconsFont, Screen, Text as TextCus } from '../../../../../library/components';
import ModalOptions from '../../../../../library/components/modalOptions/ModalOptions';
import ViewCus from '../../../../../library/components/ViewCus/ViewCus';
import { navigate } from '../../../../../navigation/navigationService';
import RestAPI from '../../../../../RestAPI/index';
import { palette as appColors } from '../../../../../themes/palette';
import ModalSearchList, { defaultParams } from '../components/ModalSearchList';
const Text = (props) => <TextCus {...props} style={[props.style, { color: 'black' }]} />


var currentParams = {
    ...defaultParams
}
export default function UpdateRegister_List(props) {
    const refModalOptions = useRef();
    const refModalSearch = useRef();
    const user = useSelector(state => state.AppReducer.profile.user);

    const [isSearch, setIsSearch] = useState(false)
    const [data, setData] = useState({
        isLoading: false,
        index: 1,
        length: 10,
        total: 0,
        list: []
    })

    useEffect(() => {
        currentParams = {
            ...defaultParams,
            maTinh: user.maTinh > 0 ? user.maTinh : 0,
            maHuyen: user.maHuyen > 0 ? user.maHuyen : 0,
            maXa: user.maXa > 0 ? user.maXa : 0,
        }
        loadData();
    }, [])

    const convertDateToInt = date => {
        if (date != null && date.constructor == Date) {
            var y = new Date(date).getFullYear();
            var m = new Date(date).getMonth() + 1;
            var d = new Date(date).getDate();
            return y * 10000 + m * 100 + d;
        }
        return '';
    }
    const getParams = () => {
        var params = currentParams.isAdvanced ? { ...currentParams } : {
            search: currentParams.search,
            maTinh: currentParams.maTinh,
            maHuyen: currentParams.maHuyen,
            maXa: currentParams.maXa,
            gioiTinh: currentParams.gioiTinh,
            danToc: currentParams.danToc,
            trangThai: currentParams.trangThai,
        }

        if (params.hasOwnProperty('thang')) {
            params.thang = params.thang != null && params.thang.constructor == Date ? params.thang.format('MMYYYY') : params.thang;
            params.tuNgay = convertDateToInt(params.tuNgay);
            params.denNgay = convertDateToInt(params.denNgay);
        }
        return {
            ...params,
            token: user.token,
            typeid: 1
        }
    }
    const loadData = async (page) => {
        page = page == null ? 1 : page
        toggleLoading(true);

        var params = getParams();
        var resp = await RestAPI.UpdateRegister_GetList({
            start: page,
            length: data.length,
            ...params,
            // ...{
            //     draw: 2,
            //     start: 0,
            //     length: 10,
            //     search: '',
            //     maTinh: 1,
            //     maHuyen: 1,
            //     maXa: 0,
            //     gioiTinh: -1,
            //     danToc: -1,
            //     thang: -1,
            //     trangThai: -1,
            //     mucDoKhuyetTat: -1,
            //     dangTat: -1,
            //     nguyenNhan: -1,
            //     tn: '',
            //     dn: '',
            //     tuNgay: '',
            //     denNgay: '',
            //     sapXep: 1,
            // }
        });
        setData({
            ...data,
            isLoading: false,
            index: page + 1,
            length: 10,
            total: resp.total,
            list: page == 1 ? resp.data : [...data.list, ...resp.data]
        })
        toggleLoading();
    }

    const onSubmitFilter = (params) => {
        setData({
            isLoading: false,
            index: 1,
            length: 10,
            total: 0,
            list: []
        })
        setIsSearch(true);
        currentParams = params;
        loadData();
    }

    const clickDownloadExcel = async () => {
        toggleLoading(true);
        var params = getParams();
        var resp = await RestAPI.UpdateRegister_ExportExcel(params);
        toggleLoading(false);
        console.log(resp)
        if (resp.status == false)
            ViewCus.Alert.Alert('Có lỗi xẩy ra')
        if (resp != null && resp.result) {
            var url = resp.result;
            if (!url.startsWith('http'))
                url = 'http://' + url
            Linking.openURL(url);
        }
    }
    const clickClearSearch = () => {
        // ViewCus.Alert.Confirm(() => {
        setIsSearch(false);
        setData({
            isLoading: false,
            index: 1,
            length: 10,
            total: 0,
            list: []
        })
        currentParams = {
            ...defaultParams,
            maTinh: user.maTinh > 0 ? user.maTinh : 0,
            maHuyen: user.maHuyen > 0 ? user.maHuyen : 0,
            maXa: user.maXa > 0 ? user.maXa : 0,
        }
        loadData();
        // }, null, 'Bạn muốn xóa kết quả tìm kiếm?')
    }
    const ApproveInfo = (e, index) => {
        ViewCus.Alert.Confirm(async () => {
            toggleLoading();
            var resp = await RestAPI.UpdateRegister_ApproveInfo({
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
                type: 2
            })
            toggleLoading();
            ViewCus.Alert.Alert(resp.messeger)
        }, null, 'Bạn có muốn tiếp nhận?')
    }

    const RejectInfo = (e, index) => {
        ViewCus.Alert.Confirm(async () => {
            toggleLoading();
            var resp = await RestAPI.UpdateRegister_RejectInfo({
                "Id": 111963,
                "LyDoKhongDuyet": "LyDoKhongDuyet",
                "TrangThai": 0,
                "DaCapGiayChungNhan": -1,
                "NguoiDuyet": user.userID,
                "NguoiCapNhat": user.userID,
                "NgayCapNhat": new Date(),
                "NgayCap": null,
                "NgayDuyet": new Date(),
                type: 2
            })
            toggleLoading();
            ViewCus.Alert.Alert(resp.messeger)
        }, null, 'Bạn có muốn từ chối tiếp nhận?')
    }

    const CancelRequestInfo = (e, index) => {
        ViewCus.Alert.Confirm(async () => {
            toggleLoading();
            var resp = await RestAPI.FistRegister_CancelRequestInfo({
                "Id": 111975,
                "LyDoKhongDuyet": null,
                "TrangThai": 1,
                "DaCapGiayChungNhan": 0,
                "NguoiCapNhat": user.userID,
                "NgayCapNhat": new Date(),
                type: 2
            })
            toggleLoading();
            ViewCus.Alert.Alert(resp.messeger)
        }, null, 'Bạn có muốn hủy tiếp nhận thông tin');
    }

    const MoveBHXH = (e, index) => {
        var listChoose = [
            {
                id: 0,
                label: 'Cộng đồng'
            },
            {
                id: 1,
                label: 'Vào trung tâm BTXH'
            },
        ]
        const onPressChoose = async (e, index) => {
            toggleLoading();
            var resp = await RestAPI.FistRegister_MoveBHXH({
                "Id": e.id,
                "TrangThai": 1,
                "DaCapGiayChungNhan": 1,
                "IsTrungTamBTXH": listChoose[index].id,
                type: 2
            })
            toggleLoading();
            ViewCus.Alert.Alert(resp.messeger)
        }
        ViewCus.Alert.Confirm(async () => {
            refModalOptions.current?.toggle(true, e, listChoose.map(e => ({ label: e.label, onPress: onPressChoose })))
        }, null, 'Bạn có muốn chuyển vào trung tâm BHXH?');
    }

    const UpdateStatus = (e, index) => {
        var listChoose = [
            {
                id: -10,
                label: 'Chết'
            },
            {
                id: -11,
                label: 'Thôi hưởng chính sách'
            },
            {
                id: -12,
                label: 'Chuyển đi nơi khác'
            },
            {
                id: -13,
                label: 'Khác'
            },
        ]
        const onPressChoose = async (e, index) => {
            toggleLoading();
            var resp = await RestAPI.FistRegister_UpdateStatus({
                "Id": e.id,
                "TrangThai": 1,
                "DaCapGiayChungNhan": listChoose[index].id,
                type: 2

            })
            toggleLoading();
            ViewCus.Alert.Alert(resp.messeger)
        }
        ViewCus.Alert.Confirm(async () => {
            refModalOptions.current?.toggle(true, e, listChoose.map(e => ({ label: e.label, onPress: onPressChoose })))
        }, null, 'Bạn có muốn cập nhật trạng thái?');
    }

    return (
        <>
            <ModalOptions ref={refModalOptions} />
            <ModalSearchList ref={refModalSearch} onSubmit={onSubmitFilter} />
            <Screen>
                <Header
                    isBack={true}
                    headerTx={'Danh sách tài khoản NKT/NNBM tự đăng ký'}
                    childrenRight={
                        <ViewCus.ViewHorizontal>
                            <Button
                                style={{
                                    paddingVertical: 0,
                                    paddingHorizontal: 2,
                                    backgroundColor: 'transparent'
                                }}
                                onPress={clickDownloadExcel}
                            >
                                <ViewCus.Ionicons icon={IoniconsFont.downloadOutline} color={'white'} />
                            </Button>
                            <Button
                                style={{
                                    paddingVertical: 0,
                                    paddingHorizontal: 2,
                                    backgroundColor: 'transparent'
                                }}
                                onPress={() => refModalSearch.current?.toggle(true, currentParams)}
                            >
                                <ViewCus.Ionicons icon={IoniconsFont.search} color={'white'} />
                            </Button>
                        </ViewCus.ViewHorizontal>
                    }
                />
                <View
                    style={{
                        flex: 1,
                        backgroundColor: '#f2f2f2'
                    }}
                >
                    {
                        isSearch && data.list.length > 0 &&
                        <Button Button
                            onPress={clickClearSearch}
                        >
                            {'Xóa tìm kiếm'}
                        </Button>
                    }
                    {
                        data.isLoading == false && data.list.length <= 0 ?
                            <Text
                                style={{
                                    textAlign: 'center',
                                    paddingVertical: 20,
                                    fontSize: 20
                                }}
                            >
                                {'Không có kết quả'}
                            </Text>
                            :

                            <ScrollView
                                style={{
                                    height: '100%',
                                }}
                                contentContainerStyle={{
                                    paddingVertical: 20
                                }}
                                refreshControl={<RefreshControl onRefresh={() => loadData()} refreshing={data.isLoading} />}
                            >
                                {
                                    data.list.map((e, index) => (
                                        <ViewCus.Card
                                            key={e.id}
                                            title={
                                                <ViewCus.ViewHorizontal
                                                    style={{
                                                        padding: 15,
                                                        backgroundColor: '#cdf3f8',
                                                        alignItems: 'center'
                                                    }}
                                                >
                                                    {
                                                        /* đã duyệt */ e.daCapGiayChungNhan == 1 ? <ViewCus.Ionicons size={26} icon={IoniconsFont.checkmarkCircleOutline} color={appColors.materialGreen} />
                                                        /* lần đầu đk hoặc chờ duyệt */ : e.daCapGiayChungNhan == 0 || e.daCapGiayChungNhan == null ? <ViewCus.Ionicons size={26} icon={IoniconsFont.alertCircleOutline} color={appColors.metronicWarning} />
                                                        /* từ chối */ : e.daCapGiayChungNhan == -1 ? <ViewCus.Ionicons size={26} icon={IoniconsFont.closeCircleOutline} color={appColors.materialRed} />
                                                        /* update trạng thái */ : null
                                                    }
                                                    <Text
                                                        style={{
                                                            fontSize: 16,
                                                            fontWeight: 'bold',
                                                            flex: 1,
                                                            paddingHorizontal: 5
                                                        }}
                                                    >
                                                        {'#{0} {1}'.format(index + 1, e.a4_HoTen)}
                                                    </Text>
                                                    <Button
                                                        style={{
                                                            backgroundColor: 'transparent'
                                                        }}
                                                        onPress={() => refModalOptions.current?.toggle(true, e,
                                                            [
                                                                {
                                                                    label: 'Xem chi tiết',
                                                                    onPress: (e, index) => navigate('UpdateRegister_Details', e),
                                                                },
                                                                {
                                                                    label: 'Lịch sử thay đổi thông tin',
                                                                    onPress: () => navigate('UpdateRegister_History', e),
                                                                },
                                                            ].filter(e => e != null && e !== false)
                                                        )}
                                                    >
                                                        <ViewCus.MaterialCommunityIcons icon={MaterialCommunityIconsFont.dotsHorizontal} />
                                                    </Button>
                                                </ViewCus.ViewHorizontal>
                                            }
                                            styleContainer={{
                                                marginTop: index == 0 ? 0 : 20
                                            }}
                                            styleContent={{
                                                paddingVertical: 20,
                                                paddingHorizontal: 20,
                                            }}
                                        >
                                            <ViewCus.ViewHorizontal
                                                style={{
                                                    flexWrap: 'wrap'
                                                }}
                                            >
                                                {
                                                    [
                                                        {
                                                            icon: <ViewCus.FontAwesome icon={FontAwesomeFont.birthdayCake} />,
                                                            value: new Date(e.a5_NgaySinh).format('DD/MM/YYYY')
                                                        },
                                                        {
                                                            icon: <ViewCus.FontAwesome icon={FontAwesomeFont.male} />,
                                                            value: e.a6_GioiTinh
                                                        },
                                                        {
                                                            icon: <ViewCus.FontAwesome icon={FontAwesomeFont.phone} />,
                                                            value: e.phone
                                                        },
                                                        {
                                                            icon: <ViewCus.FontAwesome icon={FontAwesomeFont.user} />,
                                                            value: e.a4_HoTen
                                                        },
                                                        {
                                                            icon: <ViewCus.FontAwesome icon={FontAwesomeFont.hashtag} />,
                                                            value: [e.dangKhuyetTat, e.mucDoKhuyetTat].filter(e => (e || '') != '').join(' ')
                                                        },
                                                        {
                                                            icon: <ViewCus.FontAwesome icon={FontAwesomeFont.users} />,
                                                            value: e.a7_DanToc
                                                        },
                                                    ].map((e, index) => (
                                                        <ViewCus.ViewIcon
                                                            key={index}
                                                            iconLeft={React.cloneElement(e.icon, {
                                                                size: 18,
                                                                style: {
                                                                    width: 25,
                                                                    // backgroundColor: 'red'
                                                                },
                                                            })}
                                                            styleContainer={{
                                                                width: '50%',
                                                                marginTop: 10
                                                            }}
                                                        >
                                                            <Text
                                                                style={{
                                                                    flex: 1,
                                                                    flexWrap: 'wrap',
                                                                }}
                                                            >{e.value}</Text>
                                                        </ViewCus.ViewIcon>
                                                    ))
                                                }
                                            </ViewCus.ViewHorizontal>
                                        </ViewCus.Card>
                                    ))
                                }
                                {data.total > data.list.length &&
                                    <Button
                                        onPress={() => loadData(data.index)}
                                        style={{
                                            backgroundColor: 'transparent',
                                            paddingVertical: 0,
                                            paddingTop: 10
                                        }}
                                        textStyle={{
                                            color: appColors.materialBlue
                                        }}
                                    >
                                        {'Xem thêm'}
                                    </Button>
                                }
                            </ScrollView>
                    }
                </View>
            </Screen>
        </>
    );
}
