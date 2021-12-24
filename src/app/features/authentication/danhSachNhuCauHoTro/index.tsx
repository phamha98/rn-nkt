
import React, { useEffect, useRef, useState } from 'react';
import { Platform, RefreshControl, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import { useSelector } from 'react-redux';
import { ConfigProps, InjectedFormProps } from 'redux-form';
import { toggleLoading } from '../../../../../App';
import { isAndroid } from '../../../common';
import { Button, FontAwesomeFont, Header, IoniconsFont, Screen, Wallpaper } from '../../../library/components';
import ModalOptions from '../../../library/components/modalOptions/ModalOptions';
import ViewCus from '../../../library/components/ViewCus/ViewCus';
import { navigate } from '../../../navigation/navigationService';
import { CHITIETNGUOIDUNGYEUCAUHOTRO, TAB_USER } from '../../../navigation/screenTypes';
import RestAPI from '../../../RestAPI';
import { FONT_14, typography } from '../../../themes';
import { palette as appColors } from '../../../themes/palette';
import ModalSearchList from './components/ModalSearchList';


var defaultParams = {
    search: '',
    maTinh: -1,
    maHuyen: -1,
    maXa: -1,
    trangThai: -1,
}
var currentParams = {
    ...defaultParams
}
export const DanhSachNguoiDungYeuCauHoTro = (props: ConfigProps & InjectedFormProps) => {
    const tabView = useRef(null)
    const [indexTab, setIndexTab] = useState(0)
    const dataDetailUser = useSelector(state => state.AppReducer.profile.user);
    const refModalOptions = useRef();
    const refModalSearch = useRef();
    const [isSearch, setIsSearch] = useState(false)
    const [data, setData] = useState({
        isLoading: false,
        isNew: false,
        index: 1,
        length: 10,
        total: 0,
        list:
        {
            dangKy: [
                {
                    id: 0,
                    trangThai: 0,
                    lyDoKhongDuyet: null,
                    thuTuBanGhi: 1,
                    a4_HoTen: "",
                    dangKhuyetTat: "",
                    mucDoKhuyetTat: "",
                    ngayDuyet: null,
                    noiDungHoTro: ""
                }
            ],
            hoTro: [
                {
                    id: 0,
                    trangThai: 0,
                    lyDoKhongDuyet: null,
                    thuTuBanGhi: 1,
                    a4_HoTen: "",
                    dangKhuyetTat: "",
                    mucDoKhuyetTat: "",
                    ngayDuyet: null,
                    noiDungHoTro: ""
                }
            ]

        },


    })
    useEffect(() => {
        loadData();
    }, []);
    const loadData = async (page) => {
        page = page == null ? 1 : page
        toggleLoading(true);
        var resp = await RestAPI.API_Get_DanhSachNguoiDungNhuCauHoTro({
            start: page,
            length: data.length,
            userId: dataDetailUser.userID,
            ...currentParams
        });
        toggleLoading();
      
        setData({
            ...data,
            isLoading: false,
            isNew: resp.haveTTC,
            index: page + 1,
            length: 10,
            total: resp.total,
            list: page == 1 ? resp : [...data.list, ...resp]
        })
    }
    const AlerOffline = ()=>{
        ViewCus.Alert.Alert('Chức năng không được hỗ trợ khi Offline!');
    }
 

    const _onGoDangKyMoi = async () => {
        navigate(CHITIETNGUOIDUNGYEUCAUHOTRO);
    }
    const onSubmitFilter = (params) => {
        console.log(params)
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
    const _onGoDetailNhuCauHoTro = (e) => {
        navigate(CHITIETNGUOIDUNGYEUCAUHOTRO, { 'VALUE': e });
    }
    return (
        <>
            <ModalOptions ref={refModalOptions} />
            <ModalSearchList ref={refModalSearch} onSubmit={onSubmitFilter} />
            <>
                <Screen>
                    <Wallpaper useWrap={true} />
                    <Header
                        isBack={true}
                        headerTx={'Danh sách thông tin nhu cầu cần hỗ trợ (Phiếu 03) của NKT/NNBM'}
                    />
                    {
                        (data.isNew == true || data.isNew == 'true') &&
                        <Button
                            onPress={_onGoDangKyMoi}
                        >
                            {'Cập nhật thông tin nhu cầu hỗ trợ (Phiếu 3)'}
                        </Button>
                    }
                    
                    <ScrollableTabView
                        ref={tabView}
                        onChangeTab={page => setIndexTab(page.i)}
                        tabBarBackgroundColor='#fff'
                        tabBarUnderlineStyle={{
                            height: 2,
                            backgroundColor: 'rgba(0,190,212,1)',
                        }}
                        tabBarActiveTextColor='rgba(0,190,212,1)'
                        renderTabBar={() => <ScrollableTabBar
                            renderTab1={(name, page, isTabActive, onPressHandler, onLayoutHandler) => {
                                return (
                                    <TouchableOpacity onLayout={onLayoutHandler}>
                                        <Text>
                                            {name}
                                        </Text>
                                    </TouchableOpacity>
                                )
                            }}
                        />}
                    >
                        <View tabLabel="Nhu cầu ký ban đầu" style={{ flex: 1 }}>
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
                                    data.list?.dangKy?.map((e, index) => (
                                        <Button key={index} style={{ backgroundColor: 'transparent' }}
                                            onPress={() => RestAPI.isConnected == true ? _onGoDetailNhuCauHoTro(e.id) : AlerOffline()}
                                        >
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


                                                        <ViewCus.Ionicons size={26} icon={IoniconsFont.checkmarkCircleOutline} color={e.trangThai == 0 ? '#ffb822' : 'rgb(76, 175, 80)'} />
                                                        <Text
                                                            style={{
                                                                fontSize: 16,
                                                                fontWeight: 'bold',
                                                                flex: 1,
                                                                paddingHorizontal: 5
                                                            }}
                                                        >
                                                            {
                                                                '{0}'.format(new Date(e.ngayTao).format('DD/MM/YYYY'))
                                                            }
                                                        </Text>
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
                                                     <ViewCus.ViewIcon
                                                        key={index}
                                                        iconLeft={React.cloneElement(<ViewCus.FontAwesome icon={FontAwesomeFont.calendar} />, {
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
                                                        >{`Ngày duyệt : ` + e.ngayDuyet}</Text>
                                                    </ViewCus.ViewIcon>
                                                    <Text
                                                        numberOfLines={2}
                                                        style={{
                                                            marginLeft: 5,
                                                            marginTop: 20,
                                                            fontWeight: '400',

                                                        }}
                                                    >{e.noiDungHoTro}</Text>
                                                </ViewCus.ViewHorizontal>
                                            </ViewCus.Card>
                                        </Button>
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
                        </View>
                        <View tabLabel="Nhu cầu cần hỗ trợ" style={{ flex: 1 }}>
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
                                    data.list?.hoTro?.map((e, index) => (
                                        <Button key={index} style={{ backgroundColor: 'transparent' }}
                                            // onPress={() => _onGoDetailNhuCauHoTro(e.id)}
                                            onPress={() => RestAPI.isConnected == true ? _onGoDetailNhuCauHoTro(e.id) : AlerOffline()}
                                        >
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
                                                        <ViewCus.Ionicons size={26} icon={IoniconsFont.checkmarkCircleOutline} color={e.trangThai == 0 ? '#ffb822' : 'rgb(76, 175, 80)'} />
                                                        <Text
                                                            style={{
                                                                fontSize: 16,
                                                                fontWeight: 'bold',
                                                                flex: 1,
                                                                paddingHorizontal: 5
                                                            }}
                                                        >
                                                            {
                                                                '{0}'.format(new Date(e.ngayTao).format('DD/MM/YYYY'))
                                                            }
                                                        </Text>
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
                                                    <ViewCus.ViewIcon
                                                        key={index}
                                                        iconLeft={React.cloneElement(<ViewCus.FontAwesome icon={FontAwesomeFont.calendar} />, {
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
                                                        >{`Ngày duyệt : ` + e.ngayDuyet}</Text>
                                                    </ViewCus.ViewIcon>
                                                    <Text
                                                        numberOfLines={2}
                                                        style={{
                                                            marginLeft: 5,
                                                            marginTop: 20,
                                                            fontWeight: '400',

                                                        }}
                                                    >{e.noiDungHoTro}</Text>
                                                </ViewCus.ViewHorizontal>
                                            </ViewCus.Card>
                                        </Button>
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
                        </View>
                    </ScrollableTabView>
                </Screen>
            </>
        </>
    );
};
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
    },
    background: {
        paddingTop:
            Platform.OS === 'android'
                ? StatusBar.currentHeight
                    ? StatusBar.currentHeight - 10
                    : StatusBar.currentHeight
                : 0,
    },
})