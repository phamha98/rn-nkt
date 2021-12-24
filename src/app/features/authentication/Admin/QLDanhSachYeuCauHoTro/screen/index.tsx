import React, { useEffect, useRef, useState } from 'react';
import { RefreshControl, StatusBar, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { ConfigProps, InjectedFormProps } from 'redux-form';
import { toggleLoading } from '../../../../../../../App';
import { isAndroid } from '../../../../../common';
import { Button, FontAwesomeFont, Header, IoniconsFont, MaterialCommunityIconsFont, Screen, Wallpaper } from '../../../../../library/components';
import ModalOptions from '../../../../../library/components/modalOptions/ModalOptions';
import ViewCus from '../../../../../library/components/ViewCus/ViewCus';
import DropDownHolder from '../../../../../library/utils/dropDownHolder';
import { navigate } from '../../../../../navigation/navigationService';
import { DANHSACHLICHSUHOTRO, DETAILYEUCAUHOTRO, NHANHOTRO, QLLICHSUNHANHOTRO } from '../../../../../navigation/screenTypes';
import RestAPI from '../../../../../RestAPI';
import { FONT_14, typography } from '../../../../../themes';
import { palette as appColors } from '../../../../../themes/palette';
import ModalSearchList from './components/ModalSearchList';

const styles = StyleSheet.create({
    body: {
        overflow: 'hidden',
        flex: 1,
        backgroundColor: '#ddd',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    titleHeader: {
        fontSize: FONT_14,
        alignSelf: 'center',
        fontFamily: typography.helveticaNeue_bold,
        fontWeight: 'bold'
    },
    iconRightHeader: {
        tintColor: '#ffffff'
    },
    header: {
        paddingTop: isAndroid ? StatusBar.currentHeight ? StatusBar.currentHeight + 10 : 20 : 15,
        paddingBottom: isAndroid ? 19 : 15,
    },
    containerStyle: {
        flexGrow: 1,
    },
    wrapContent: {
        flex: 1,
        overflow: 'hidden',
        width: '100%'
    },
    txname: {
        fontSize: 18,
        color: '#333',
        marginLeft: 10,
        marginTop: 10,
        paddingVertical: 7,
        fontWeight: 'bold',
        textAlign: 'center'

    },
    txtitle: {
        fontSize: 18,
        color: '#333',
        marginLeft: 10,
        marginTop: 10,
        paddingVertical: 7,
        fontWeight: '400',

    },
    modal: {
        paddingHorizontal: 0,
        paddingVertical: 0,
        width: '90%',
        height: 50,
        maxHeight: 310,
        alignSelf: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor: '#fff',
        marginTop: 250,
        alignItems: 'flex-start',
        textAlign: 'left'

    },
    buttonText: {
        backgroundColor: '#fff',
        alignItems: 'flex-start',
        borderBottomWidth: 1,
        borderBottomColor: "#ccc"
    }
})

export const QLDanhSachYeuCauHoTro = (props: ConfigProps & InjectedFormProps) => {
    const refModal = useRef();
    const dataDetailUser = useSelector(state => state.AppReducer.profile.user);
    var defaultParams = {
        search: '',
        maTinh: dataDetailUser.maTinh,
        maHuyen: dataDetailUser.maHuyen,
        maXa: dataDetailUser.maXa,
        trangThai: -1,
        kyBaoCao: -1,
        loaiKhuyetTat: -1,
        mucDoKhuyetTat: -1,
        sapXep: 1,
        draw: 1,
    }
    var currentParams = {
        ...defaultParams
    }
    const refPromptCancelRequest = useRef();
    const refModalOptions = useRef();
    const refModalSearch = useRef();
    const [isSearch, setIsSearch] = useState(false)
    const [data, setData] = useState({
        isLoading: false,
        index: 1,
        length: 10,
        total: 0,
        list: []
    })
    useEffect(() => {
        loadData();
    }, []);

    const loadData = async (page) => {
        page = page == null ? 1 : page
        toggleLoading(true);
        var resp = await RestAPI.API_Get_List_Info_User_NhuCauHoTro({
            start: page,
            length: data.length,
            search: "",
            maTinh: dataDetailUser.maTinh,
            maHuyen: dataDetailUser.maHuyen,
            maXa: dataDetailUser.maXa,
            ...currentParams
        });
        console.log(resp)
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

    const callbackUpdateList = (obj, index) => {
        var dataTemp = { ...data };
        dataTemp.list[index] = {
            ...dataTemp.list[index],
            ...obj
        }
        setData(dataTemp);
    }

    const onGoDetail = (e, index) => {
        navigate(DETAILYEUCAUHOTRO, {
            'VALUE_USER': e,
            index,
            callBackUpdate: callbackUpdateList
        });
    }
    const onGoLichSuNhanHoTro = (e, index) => {
        navigate(QLLICHSUNHANHOTRO, {
            'VALUE_USER': e,
        });
    }
    const onNhanHoTro = (e, index) => {
        navigate(NHANHOTRO, {
            'VALUE_USER': e,
        });
    }
    const onDuyetYeuCauTiepNhan = (e, index) => {
        ViewCus.Alert.Confirm(async () => {
            toggleLoading();
            var resp = await RestAPI.API_DuyetYeuCauTiepNhan({
                Id: e.id,
                TrangThai: 2,
                NguoiDuyet: dataDetailUser.userID,
                NgayDuyet: new Date()
            })
            toggleLoading();
            if (resp.status == true) {
                DropDownHolder.showSuccess((resp.messeger));
                loadData();
            }
            else {
                DropDownHolder.showError((resp.messeger));
            }
            setTimeout(() => {
            }, 1000)
        }, null, 'Bạn có muốn nhận hỗ trợ?')
    }
    const onKhongDuyetYeuCau = (e, index) => {
        refPromptCancelRequest.current?.toggle(true, '', async (t) => {
            toggleLoading();
            var resp = await RestAPI.API_KhongDuyetYeuCauTiepNhan({
                Id: e.id,
                LyDoKhongDuyet: t,
                TrangThai: 0,
                NguoiCapNhat: dataDetailUser.userID,
                NgayCapNhat: new Date(),
            })
            toggleLoading();
            if (resp.status == true) {
                DropDownHolder.showSuccess((resp.messeger));
                loadData();
            }
            else {
                DropDownHolder.showError((resp.messeger));
            }
            setTimeout(() => {
            }, 1000)
        });
    }
    const onHuyDuyet = (e, index) => {
        ViewCus.Alert.Confirm(async () => {
            toggleLoading();
            var resp = await RestAPI.API_HuyDuyetYeuCauTiepNhan({
                Id: e.id,
                TrangThai: 1,
                NguoiDuyet: dataDetailUser.userID,
                NgayDuyet: new Date()
            })
            toggleLoading();
            if (resp.status == true) {
                DropDownHolder.showSuccess((resp.messeger));
                loadData();

            }
            else {
                DropDownHolder.showError((resp.messeger));
            }
            setTimeout(() => {
            }, 1000)
        }, null, 'Bạn có muốn huỷ duyệt yêu cầu?')
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
    const clickClearSearch = () => {
        setIsSearch(false);
        setData({
            isLoading: false,
            index: 1,
            length: 10,
            total: 0,
            list: []
        })
        currentParams = defaultParams;
        loadData();
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
                styleInput={[
                    {
                        maxHeight: 200,
                    },
                    Platform.OS == 'ios' && { height: 200 }
                ]}
            />
            <ModalOptions ref={refModalOptions} />
            <ModalSearchList ref={refModalSearch} onSubmit={onSubmitFilter} />
            <>
                <Screen>
                    <Wallpaper useWrap={true} />
                    <Header
                        isBack={true}
                        headerTx={'Danh sách NKT/NNBM có nhu cầu hỗ trợ'}
                        childrenRight={
                            <Button
                                style={{
                                    paddingVertical: 0,
                                    backgroundColor: 'transparent'
                                }}
                                onPress={() => refModalSearch.current?.toggle(true, currentParams)}
                            >
                                <ViewCus.Ionicons icon={IoniconsFont.search} color={'white'} />
                            </Button>
                        }
                    />

                    <View style={styles.body}>
                        {
                            isSearch &&
                            <Button
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
                                        paddingVertical: 10
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
                                                            e.trangThai == 2 ? <ViewCus.Ionicons size={26} icon={IoniconsFont.checkmarkCircleOutline} color={appColors.materialGreen} />
                                                                : e.trangThai == 1 ? <ViewCus.Ionicons size={26} icon={IoniconsFont.alertCircleOutline} color={appColors.metronicWarning} />
                                                                    : <ViewCus.Ionicons size={26} icon={IoniconsFont.closeCircleOutline} color={appColors.materialRed} />
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
                                                        {
                                                            e.trangThai == 1 ?
                                                                <>{}
                                                                    <Button
                                                                        style={{
                                                                            backgroundColor: 'transparent'
                                                                        }}
                                                                        onPress={() => refModal.current?.toggle(true, e,
                                                                            [
                                                                                {
                                                                                    label: 'Xem chi tiết',
                                                                                    onPress: (e) => onGoDetail(e, index)
                                                                                },
                                                                                {
                                                                                    label: 'Duyệt tiếp nhận yêu cầu',
                                                                                    onPress: (e) => onDuyetYeuCauTiepNhan(e, index)
                                                                                },

                                                                                {
                                                                                    label: 'Không duyệt tiếp nhận yêu cầu',
                                                                                    onPress: (e) => onKhongDuyetYeuCau(e, index)
                                                                                },
                                                                                {
                                                                                    label: 'Lịch sử nhận hỗ trợ',
                                                                                    onPress: (e) => onGoLichSuNhanHoTro(e, index)
                                                                                },
                                                                            ].filter(e => e != null && e !== false)
                                                                        )
                                                                        }
                                                                    >
                                                                        <ViewCus.MaterialCommunityIcons icon={MaterialCommunityIconsFont.dotsHorizontal} />
                                                                    </Button>
                                                                </>
                                                                :
                                                                <Button
                                                                    style={{
                                                                        backgroundColor: 'transparent'
                                                                    }}
                                                                    onPress={() => refModal.current?.toggle(true, e,
                                                                        [

                                                                            {
                                                                                label: 'Xem chi tiết',
                                                                                onPress: (e) => onGoDetail(e, index)
                                                                            },
                                                                            {
                                                                                label: 'Hủy duyệt yêu cầu',
                                                                                onPress: (e) => onHuyDuyet(e, index)
                                                                            },
                                                                            {
                                                                                label: 'Nhận hỗ trợ',
                                                                                onPress: (e) => onNhanHoTro(e, index)
                                                                            },
                                                                            {
                                                                                label: 'Lịch sử nhận hỗ trợ',
                                                                                onPress: (e) => onGoLichSuNhanHoTro(e, index)
                                                                            },
                                                                        ].filter(e => e != null && e !== false)
                                                                    )
                                                                    }
                                                                >
                                                                    <ViewCus.MaterialCommunityIcons icon={MaterialCommunityIconsFont.dotsHorizontal} />
                                                                </Button>
                                                        }
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
                                                                icon: <ViewCus.FontAwesome icon={FontAwesomeFont.calendar} />,
                                                                value: e.ngayDuyet == null ? "Chưa duyệt" : new Date(e.ngayDuyet).format('DD/MM/YYYY')
                                                            },
                                                            {
                                                                icon: <ViewCus.FontAwesome icon={FontAwesomeFont.user} />,
                                                                value: e.a4_HoTen
                                                            },
                                                            {
                                                                icon: <ViewCus.FontAwesome icon={FontAwesomeFont.wheelchair} />,
                                                                value: e.mucDoKhuyetTat
                                                            },
                                                            {
                                                                icon: <ViewCus.FontAwesome icon={FontAwesomeFont.users} />,
                                                                value: e.dangKhuyetTat
                                                            },
                                                        ].map((e, index) => (
                                                            <ViewCus.ViewIcon
                                                                key={index}
                                                                iconLeft={React.cloneElement(e.icon, {
                                                                    size: 18,
                                                                    style: {
                                                                        width: 25,
                                                                    },
                                                                })}
                                                                styleContainer={{
                                                                    width: '50%',
                                                                    marginTop: 20
                                                                }}
                                                            >
                                                                <Text
                                                                    numberOfLines={1}
                                                                    style={{
                                                                        flex: 1,
                                                                        flexWrap: 'wrap',
                                                                    }}
                                                                >{e.value}</Text>
                                                            </ViewCus.ViewIcon>
                                                        ))
                                                    }
                                                    {/* <ViewCus.FontAwesome icon={FontAwesomeFont.newspaperO} style={{marginTop:20}} /> */}
                                                    <Text
                                                        numberOfLines={2}
                                                        style={{
                                                            flex: 1,
                                                            flexWrap: 'wrap',
                                                            marginLeft: 5,
                                                            marginTop: 20,
                                                            fontWeight: '400',

                                                        }}
                                                    >{e.noiDungHoTro}</Text>
                                                </ViewCus.ViewHorizontal>
                                            </ViewCus.Card>
                                        ))
                                    }
                                    {data.total > data.list.length &&
                                        <Button
                                            onPress={() => loadData(data.index)}
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
                        }
                    </View>

                </Screen>

                <ModalOptions
                    ref={refModal}
                    options={[
                        {
                            label: 'Xem chi tiết',
                            onPress: (e, index) => onGoDetail(e, index)
                        },
                        {
                            label: 'Hủy duyệt yêu cầu',
                            onPress: (e, index) => onHuyDuyet(e, index)
                        },
                        {
                            label: 'Không duyệt tiếp nhận yêu cầu',
                            onPress: (e, index) => onKhongDuyetYeuCau(e, index)
                        },
                        {
                            label: 'Nhận hỗ trợ',
                            onPress: (e, index) => onNhanHoTro(e, index)
                        },
                        {
                            label: 'Lịch sử nhận hỗ trợ',
                            onPress: (e, index) => onGoLichSuNhanHoTro(e, index)
                        },
                        {
                            label: 'In quyết định TCXH',
                            onPress: (e, index) => onGoDetail(e, index)
                        },
                    ]}
                />
            </>
        </>
    );
};
