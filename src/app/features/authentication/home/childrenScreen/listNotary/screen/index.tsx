import React, { useEffect, useState } from 'react';
import { BackHandler, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { CODE_SUCCESS, LOCATION_DEFAULT, PAGE_SIZE_DEFAULT } from '../../../../../../config';
import { Header, Icon, Screen, Wallpaper } from '../../../../../../library/components';
import { List_Address_City, List_District, List_Staff_Notary_API } from '../../../../../../library/networking';
import DropDownHolder from '../../../../../../library/utils//dropDownHolder';
import { change_alias, translate } from '../../../../../../library/utils/i18n/translate';
import ProgressHolder from '../../../../../../library/utils/progressHolder';
import { onGetListAddressNotaryCity, onGetListDistrictNotary, onGetListNotaryStaff, onLoadMoreListNotaryStaff, onRefreshListNotaryStaff, onResetState } from '../redux/action';
import { ListNotaryStaffState } from '../redux/reducer';
import { ModalSelectAddress } from '../screen/components/modalSelect';
import { ModalSelectDistricts } from '../screen/components/modalSelectDistrict';
import { ButtonSelect, HeaderRightButton, ListItem } from './components';
import { styles } from './style';

export const ListNotary = ({ navigation }) => {
    const locationParam = navigation.getParam("LOCATION", LOCATION_DEFAULT)
    const searchParam = navigation.getParam("SEARCH", "")
    const [region, setRegion] = useState({ latitude: parseFloat(locationParam.split(',')[0]), longitude: parseFloat(locationParam.split(',')[1]) })
    const [param, setParam] = useState({ start: 0, length: PAGE_SIZE_DEFAULT, latlng: `(${region.latitude},${region.longitude})` })
    const dispatch = useDispatch();
    const { listMarkers, listNotaryStaff, loadMore, loading, error, codeLoadMore, codeRefresh, refresh, isLoadEnd, listAddressCity, datalistDistrict }: ListNotaryStaffState = useSelector((x: any) => x.ListNotaryStaff)
    const [visibleModal, setVisibleModal] = useState(false)
    const [visibleModalDistrict, setVisibleModalDistrict] = useState(false)
    const [selectItem, setSelectItem] = useState("")
    const [selectDistrict, setSelectDistrict] = useState("")
    const [selectNameCity, setSelectNameCity] = useState("Chọn thành phố")
    const [selectNameDistrict, setSelectNameDistrict] = useState("Chọn Huyện")
    const [isShow, setIsShow] = useState(false);
    const [parentid, setParentid] = useState(-1);
    const [parentIdDistrict, setParentIdDistrict] = useState(-1);
    const [itemToScroll, setItemToScroll] = useState()
    const [listNewMarker, setListNewMarker] = useState()
    const onToggle = () => {
        setIsShow(!isShow)
    }
    const onBack = () => {
        navigation.goBack();
    }
    const onHideModalNotary = () => {
        setVisibleModal(false)
    }
    const onHideModalNotaryDistrict = () => {
        setVisibleModalDistrict(false)
    }
    const onShowModal = () => {
        setVisibleModal(true)
    }
    const onShowModalDistrict = () => {
        if (parentid === -1) {
            DropDownHolder.showWarning(translate('dialog:warning'), translate('dialog:nullCity'));
        } else {
            setVisibleModalDistrict(true)
        }
    }
    const onClickItem = (item: any) => {
        setParentIdDistrict('');
        setSelectItem(item);
        onHideModalNotary();
    }
    const onClickDistrict = (item: any) => {
        setSelectDistrict(item)
        setVisibleModalDistrict(false)
    }
    const onLoadMore = () => {
        if (loadMore || refresh || isLoadEnd || (listNotaryStaff && listNotaryStaff.length < 21)) {
            return;
        }
        dispatch(onLoadMoreListNotaryStaff(List_Staff_Notary_API, { ...param, start: param.start + param.length }))
    }
    const onRefresh = () => {
        if (parentid !== -1 || parentIdDistrict !== -1) {
            dispatch(onGetListNotaryStaff(List_Staff_Notary_API + '?province=' + parentid + '&district=' + parentIdDistrict, { start: 0, length: PAGE_SIZE_DEFAULT }))
        } else {
            dispatch(onRefreshListNotaryStaff(List_Staff_Notary_API, { start: 0, length: PAGE_SIZE_DEFAULT }))
        }
    }

    useEffect(() => {
        if (loading) {
            ProgressHolder.visible(translate('dialog:loading'))
        } else {
            ProgressHolder.hidden()
        }
    }, [loading])
    useEffect(() => {
        if (error !== null) {
            DropDownHolder.showError(translate('dialog:error'), error)
        }
    }, [error])
    useEffect(() => {
        if (codeLoadMore === CODE_SUCCESS) {
            setParam({ ...param, start: param.start + param.length })
        }
        if (codeRefresh === CODE_SUCCESS) {
            setParam({ start: 0, length: PAGE_SIZE_DEFAULT, search: "" })
        }
    }, [codeLoadMore, codeRefresh])
    useEffect(() => {
        getListStaffAndAddress();
        return () => {
            dispatch(onResetState())
        };
    }, []);
    const getListStaffAndAddress = () => {
        dispatch(onGetListAddressNotaryCity(List_Address_City + 'parentid=0&typeid=1'))
        dispatch(onGetListNotaryStaff(List_Staff_Notary_API + '?province=' + parentid + '&district=' + parentIdDistrict, param));
    }
    useEffect(() => {
        setSelectNameDistrict("Chọn huyện");
        if (parentid !== -1) {
            dispatch(onGetListDistrictNotary(List_District + 'parentid=' + parentid + '&typeid=2'));
            dispatch(onGetListNotaryStaff(List_Staff_Notary_API + '?province=' + parentid, { ...param, start: 0, length: PAGE_SIZE_DEFAULT }))
        }
    }, [selectNameCity])
    // useEffect(() => {
    //     //console.log("PARRAMM",param)
    // },[param])
    useEffect(() => {
        if (parentid !== -1 || parentIdDistrict !== -1) {
            dispatch(onGetListNotaryStaff(List_Staff_Notary_API + '?province=' + parentid + '&district=' + parentIdDistrict, { ...param, start: 0, length: PAGE_SIZE_DEFAULT }))
        }
    }, [selectNameDistrict]);

    const onSelectMarkerVPCC = (item: any) => {
        setItemToScroll(item);
    }

    useEffect(() => {
        const backAction = () => {
            navigation.goBack();
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, []);

    // useEffect(() => {
    //     listNotaryStaff.map((item: any) => {
    //         if (!Array.isArray(listNotaryStaff)) {
    //             return null;
    //         }
    //         let listNewMarker = [];
    //         if (listNewMarker.length > 0) {
    //             if (item.lat && item.lng && item.lat.length > 0 && item.lng.length > 0) {
    //                 let isAdd = true;
    //                 for (let i = 0; i < listNewMarker.length; i++) {
    //                     if (listNewMarker[i].lat === item.lat && listNewMarker[i].lng === item.lng) {
    //                         isAdd = false;
    //                     }
    //                 }
    //                 if (isAdd) {
    //                     listNewMarker.push(item);
    //                 }
    //             }
    //         } else {
    //             if (item.lat && item.lng && item.lat.length > 0 && item.lng.length > 0) {
    //                 listNewMarker.push(item);
    //             }
    //         }
    //         setListNewMarker(listNewMarker)
    //     });

    // }, [listNotaryStaff])


    const _onChangeText = (text: string) => {

        setParam({
            ...param, search: change_alias(text)
        })
        if (text === '') {
            dispatch(onGetListNotaryStaff(List_Staff_Notary_API + '?province=' + parentid + (parentIdDistrict && `&district=${parentIdDistrict}`), { ...param, search: text }))
        }

    };
    const onSearch = () => {
        dispatch(onGetListNotaryStaff(List_Staff_Notary_API + '?province=' + parentid + (parentIdDistrict && `&district=${parentIdDistrict}`), param))
    };

    return (
        <>
            <Screen>
                <Wallpaper useWrap={true} />
                <Header
                    isBack={true}
                    childrenRight={
                        <HeaderRightButton
                            onPress={onToggle}
                            icon={isShow ? 'location_2' : 'show_list'} />
                    }
                    headerTx={'main:home:lstNotary:tvHeader'}
                />
                <View style={styles.body}>
                    <View style={[styles.viewMap, { flex: isShow ? 0 : 3 }]}>
                    </View>
                    <View style={styles.wrapMap}>
                        <View style={styles.height60}>
                        </View>
                        <View style={styles.height40} />
                    </View>
                    <View style={styles.viewList}>

                        <View style={[styles.viewSearchData, { height: isShow ? 130 : 0 }]}>
                            <View style={styles.styleInput}>

                                <View style={styles.viewRight}>
                                    <TextInput
                                        placeholder={translate('Tìm kiếm công chứng viên')}
                                        style={styles.viewInputSearch}
                                        onChangeText={_onChangeText}
                                    />
                                </View>
                                <TouchableOpacity onPress={onSearch} style={styles.viewLeft}>
                                    <Icon style={styles.iconSearch} icon={'search'} />
                                </TouchableOpacity>
                            </View>
                            <View style={[styles.rowSelect]}>


                                <ModalSelectAddress setSelectNameCity={setSelectNameCity} itemAddress={listAddressCity} setParentid={setParentid} selectItem={selectItem} onPress={onClickItem} onHideModal={onHideModalNotary} visible={visibleModal} />
                                <ModalSelectDistricts setParentIdDistrict={setParentIdDistrict} setSelectNameDistrict={setSelectNameDistrict} itemDistrict={datalistDistrict} selectItem={selectDistrict} onPress={onClickDistrict} onHideModal={onHideModalNotaryDistrict} visible={visibleModalDistrict} />

                                <View style={[styles.row]}>
                                    <View style={styles.flex3}><ButtonSelect onPress={onShowModal} text={selectNameCity} /></View>
                                    <View style={{ width: 10 }}></View>
                                    <View style={styles.flex3}><ButtonSelect onPress={onShowModalDistrict} text={selectNameDistrict} /></View>

                                </View>
                            </View>
                        </View>

                        <ListItem
                            refresh={refresh}
                            onRefresh={onRefresh}
                            onLoadMore={onLoadMore}
                            data={listNotaryStaff}
                            itemToScroll={itemToScroll}
                            getListStaffAndAddress={getListStaffAndAddress} />
                    </View>

                </View>
            </Screen>
        </ >
    )
}

