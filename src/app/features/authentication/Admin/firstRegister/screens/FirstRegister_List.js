import React, { useEffect, useRef, useState } from 'react';
import { Linking, RefreshControl, ScrollView, View, StatusBar, Platform } from 'react-native';
import { useSelector } from 'react-redux';
import { toggleLoading } from '../../../../../../../App';
import { Button, FontAwesomeFont, Header, IoniconsFont, MaterialCommunityIconsFont, Screen, Text as TextCus, Wallpaper } from '../../../../../library/components';
import ModalOptions from '../../../../../library/components/modalOptions/ModalOptions';
import ViewCus from '../../../../../library/components/ViewCus/ViewCus';
import { navigate } from '../../../../../navigation/navigationService';
import RestAPI from '../../../../../RestAPI/index';
import StylesCus from '../../../../../themes/StylesCus';
import { palette as appColors } from '../../../../../themes/palette';
import ModalSearchList, { defaultParams } from '../components/ModalSearchList';
import { isAndroid } from '../../../../../common';
import API from '../../../../../RestAPI/index';
const Text = (props) => <TextCus {...props} style={[props.style, { color: 'black' }]} />

var currentParams = {
    ...defaultParams
}
var focusListener;
export default function FirstRegister_List(props) {
    const refPromptCancelRequest = useRef();
    const refPromptUpdateStatus = useRef();
    const refModalOptions = useRef();
    const refModalSearch = useRef();
    const user = useSelector(state => state.AppReducer.profile.user);
    const isPerAccess = user.maXa > 0

    const [isSearch, setIsSearch] = useState(false)
    const [data, setData] = useState({
        isLoading: false,
        index: 1,
        length: 10,
        total: 0,
        list: []
    })

    useEffect(() => {
        runInit();
        focusListener = props.navigation.addListener('didFocus', (event) => {
            event.action.type == "Navigation/NAVIGATE" && runInit()
        });
        return (() => {
            this != null && this.focusListener != null && this.focusListener();
        }).bind({ focusListener })
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
        }
    }
    const runInit = () => {
        currentParams = {
            ...defaultParams,
            maTinh: user.maTinh > 0 ? user.maTinh : 0,
            maHuyen: user.maHuyen > 0 ? user.maHuyen : 0,
            maXa: user.maXa > 0 ? user.maXa : 0,
        }
        setIsSearch(false)
        loadData();
    }
    const loadData = async (page) => {
        page = page == null ? 1 : page
        toggleLoading(true);

        setData({
            ...data,
            isLoading: true,
        })
        var params = getParams();
        var resp = await RestAPI.FirstRegister_GetList({
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
        var resp = await RestAPI.FirstRegister_ExportExcel(params);
        toggleLoading(false);
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

    const ApproveInfo = ({ item: e, index }) => {
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
                var dataTemp = { ...data };
                dataTemp.list[index].daCapGiayChungNhan = 1;
                setData(dataTemp);
            }
            toggleLoading();
            ViewCus.Alert.Alert(resp.messeger)
        }, null, 'Bạn có muốn tiếp nhận?')
    }

    const RejectInfo = ({ item: e, index }) => {
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
                var dataTemp = { ...data };
                dataTemp.list[index].daCapGiayChungNhan = -1;
                setData(dataTemp);
            }
            toggleLoading();
            ViewCus.Alert.Alert(resp.messeger)
        });
    }

    const UpdateRequestSupport = async ({ item: e, index }) => {
        navigate('FirstRegister_UpdateSupport', {
            data: e,
        })
    }
    const UpdateDetails = async ({ item: e, index }) => {
        navigate('FirstRegister_UpdateDetails', {
            data: e,
            callBackUpdate: navigateUpdate
        })
    }

    const CancelRequestInfo = async ({ item: e, index }) => {
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
                var dataTemp = { ...data };
                dataTemp.list[index].daCapGiayChungNhan = 0;
                setData(dataTemp);
            }
            ViewCus.Alert.Alert(resp.messeger)
            toggleLoading();
        }, null, 'Bạn có muốn Hủy tiếp nhận?')
    }

    const UpdateStatus = ({ item: e, index }) => {
        refPromptUpdateStatus.current?.toggle(true, -10, async (id) => {
            toggleLoading();
            var resp = await RestAPI.FirstRegister_UpdateStatus({
                "Id": e.id,
                "TrangThai": 1,
                "DaCapGiayChungNhan": id,
                type: 1

            })
            if (resp.status) {
                var dataTemp = { ...data };
                dataTemp.list[index].daCapGiayChungNhan = id;
                setData(dataTemp);
            }
            ViewCus.Alert.Alert(resp.messeger)
            toggleLoading();
        });
    }

    const navigateUpdate = ({ item: e, index }) => {
        var dataTemp = { ...data };
        dataTemp.list[index] = {
            ...dataTemp.list[index],
            ...e
        }
        setData(dataTemp);
    }

    const AlerOffline = () => {
        ViewCus.Alert.Alert('Chức năng không được hỗ trợ khi Offline!');
      }

    return (
        <>
            <ViewCus.Prompt
                ref={refPromptUpdateStatus}
                title='Cập nhật trạng thái'
                label='Chuyển đổi trạng thái'
                buttonText='Chấp nhận đổi trạng thái'
                validate={{
                    // required: true
                }}
                render={(onChange, value) => {
                    return <ViewCus.Selector
                        options={[
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
                        ]}
                        value={value}
                        optionLabel={e => e.label}
                        optionKey={e => e.id}
                        onSelected={(e, index) => onChange(e.id)}
                    />
                }}
            />
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
            <ModalOptions ref={refModalOptions} />
            <ModalSearchList ref={refModalSearch} onSubmit={onSubmitFilter} />
            <Screen>
                <Wallpaper useWrap />
                <Header
                    isBack={true}
                    headerTx={'Danh sách đăng ký thông tin lần đầu'}
                    childrenRight={
                        API.isConnected != false ?
                            <ViewCus.ViewHorizontal>
                                <Button
                                    style={{
                                        paddingVertical: 0,
                                        paddingHorizontal: 5,
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
                            : null
                    }
                />
                <View
                    style={{
                        flex: 1,
                    }}
                >
                    {
                        data.isLoading == false && isSearch &&
                        <Button
                            onPress={clickClearSearch}
                        >
                            {'Xóa tìm kiếm'}
                        </Button>
                    }
                    {
                        data.isLoading == false && (data.list || []).length <= 0 ?
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
                            <>
                                <ScrollView
                                    style={{
                                        height: '100%',
                                    }}
                                    contentContainerStyle={{
                                        paddingVertical: 20,
                                        paddingHorizontal: 10
                                    }}
                                    refreshControl={<RefreshControl onRefresh={() => loadData()} refreshing={data.isLoading} />}
                                >
                                    {
                                        (data.list || []).map((e, index) => {
                                            return (
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
                                                            {__DEV__ &&
                                                                <Text>
                                                                    {e.daCapGiayChungNhan}
                                                                </Text>
                                                            }
                                                            {
                                                                API.isConnected != false ?

                                                                    <Button
                                                                        style={{
                                                                            backgroundColor: 'transparent'
                                                                        }}
                                                                        onPress={() => refModalOptions.current?.toggle(true, { item: e, index },
                                                                            [
                                                                                {
                                                                                    label: 'Xem chi tiết',
                                                                                    onPress: (e, index) => navigate('FirstRegister_Details', {
                                                                                        data: e,
                                                                                        callBackUpdate: navigateUpdate
                                                                                    }),
                                                                                },

                                                                                // ((user.maXa || 0) > 0) &&
                                                                                // {
                                                                                //     label: 'Đăng ký yêu cầu hỗ trợ',
                                                                                //     onPress: (e, index) => UpdateInfo({ item: { id: 0 } }),
                                                                                // },

                                                                                (
                                                                                    user.maXa > 0 && (
                                                                                        e.daCapGiayChungNhan == null || e.daCapGiayChungNhan == 0 || e.daCapGiayChungNhan == -1
                                                                                    )
                                                                                ) &&
                                                                                {
                                                                                    label: 'Tiếp nhận',
                                                                                    onPress: ApproveInfo,
                                                                                },

                                                                                (
                                                                                    user.maXa > 0 && (
                                                                                        e.daCapGiayChungNhan == 0 || e.daCapGiayChungNhan == null
                                                                                    )
                                                                                ) &&
                                                                                {
                                                                                    label: 'Từ chối tiếp nhận',
                                                                                    onPress: RejectInfo,
                                                                                },

                                                                                (
                                                                                    user.maXa > 0 && (
                                                                                        e.daCapGiayChungNhan == 1
                                                                                    )
                                                                                ) &&
                                                                                {
                                                                                    label: 'Hủy tiếp nhận thông tin',
                                                                                    onPress: CancelRequestInfo,
                                                                                },

                                                                                (
                                                                                    isPerAccess && (
                                                                                        e.daCapGiayChungNhan == 0 || e.daCapGiayChungNhan == null || e.daCapGiayChungNhan == 1
                                                                                    )
                                                                                ) &&
                                                                                {
                                                                                    label: 'Cập nhật yêu cầu hỗ trợ',
                                                                                    onPress: UpdateRequestSupport,
                                                                                },

                                                                                (
                                                                                    __DEV__
                                                                                ) &&
                                                                                {
                                                                                    label: 'Cập nhật thông tin',
                                                                                    onPress: UpdateDetails,
                                                                                },

                                                                                (
                                                                                    user.maXa > 0 && (
                                                                                        e.daCapGiayChungNhan == 0 || e.daCapGiayChungNhan == null || e.daCapGiayChungNhan == 1
                                                                                    )
                                                                                ) &&
                                                                                {
                                                                                    label: 'Cập nhật trạng thái của đối tượng',
                                                                                    onPress: UpdateStatus,
                                                                                },
                                                                            ].filter(e => e != null && e !== false)
                                                                        )}
                                                                    >
                                                                        <ViewCus.MaterialCommunityIcons icon={MaterialCommunityIconsFont.dotsHorizontal} />
                                                                    </Button>


                                                                    : null
                                                            }

                                                        </ViewCus.ViewHorizontal>
                                                    }
                                                    styleContainer={{
                                                        marginTop: index == 0 ? 0 : 20,
                                                        marginHorizontal: 0,
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
                                            )
                                        })
                                    }
                                    {data.total > (data.list || []).length &&
                                        <Button
                                            onPress={() =>  RestAPI.isConnected ? loadData(data.index) : AlerOffline()}
                                            style={{
                                                backgroundColor: appColors.metronicInfo,
                                                marginTop: 10,
                                                paddingVertical: 10,
                                            }}
                                            textStyle={{
                                                color: appColors.white
                                            }}
                                        >
                                            {'Xem thêm'}
                                        </Button>
                                    }
                                </ScrollView>
                                {
                                    isPerAccess &&
                                    <Button
                                        style={{
                                            backgroundColor: appColors.primary,
                                            width: 50,
                                            height: 50,
                                            position: 'absolute',
                                            right: 8,
                                            bottom: 8,
                                            borderRadius: 10000,
                                            ...StylesCus.boxShadow
                                        }}
                                        onPress={() => UpdateDetails({ item: { id: 0 } })}
                                    >
                                        <ViewCus.Ionicons icon={IoniconsFont.add} color='white' />
                                    </Button>
                                }
                            </>
                    }
                </View>
            </Screen>
        </>
    );
}
