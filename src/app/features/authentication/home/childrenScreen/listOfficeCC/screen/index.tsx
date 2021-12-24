import Axios from "axios";
import React, { useEffect, useState } from 'react';
import { Platform, TextInput, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { CODE_SUCCESS, LOCATION_DEFAULT, PAGE_SIZE_DEFAULT } from '../../../../../../config';
import { Header, Icon, Screen, Wallpaper } from '../../../../../../library/components';
import { List_Address_City, List_District, List_Office_Notary_API } from '../../../../../../library/networking';
import DropDownHolder from '../../../../../../library/utils//dropDownHolder';
import { change_alias, translate } from '../../../../../../library/utils/i18n/translate';
import ProgressHolder from '../../../../../../library/utils/progressHolder';
import { onGetListAddressCity, onGetListDistrict, onGetListNotaryOffice, onLoadMoreListNotaryOffice, onRefreshListNotaryOffice, onResetState } from '../redux/action';
import { ListNotaryOfficeState } from '../redux/reducer';
import { ModalSelectAddress } from '../screen/components/modalSelect';
import { ModalSelectDistrict } from '../screen/components/modalSelectDistrict';
import { ButtonSelect, HeaderRightButton, ListItem } from './components';
import { styles } from './style';

export const ListOfficeCC = ({ navigation }) => {
    const locationParam = navigation.getParam("LOCATION", LOCATION_DEFAULT)
    const searchParam = navigation.getParam("SEARCH", "")
    const [visibleModal, setVisibleModal] = useState(false)
    const [itemToScroll, setItemToScroll] = useState()
    const [visibleModalDistrict, setVisibleModalDistrict] = useState(false)
    const [selectItem, setSelectItem] = useState("")
    const [selectDistrict, setSelectDistrict] = useState("")
    const [region, setRegion] = useState({ latitude: parseFloat(locationParam.split(',')[0]), longitude: parseFloat(locationParam.split(',')[1]) })
    const [param, setParam] = useState({ start: 0, length: PAGE_SIZE_DEFAULT, search: searchParam, latlng: `(${region.latitude},${region.longitude})` })
    const dispatch = useDispatch();
    const { listNotaryOffice, loadMore, loading, error, codeLoadMore, codeRefresh, refresh, isLoadEnd, listAddressCity, datalistDistrict }: ListNotaryOfficeState = useSelector((x: any) => x.ListNotaryOffice)
    const [isShow, setIsShow] = useState(false);
    const [parentid, setParentid] = useState(-1);
    const [selectNameCity, setSelectNameCity] = useState("Chọn thành phố")
    const [selectNameDistrict, setSelectNameDistrict] = useState("Chọn Huyện")
    const [parentIdDistrict, setParentIdDistrict] = useState(-1)
    const onToggle = () => {
        setIsShow(!isShow)
    }
    const onBack = () => {
        navigation.goBack();
    }
    const onLoadMore = () => {
        if (loadMore || refresh || isLoadEnd || (listNotaryOffice && listNotaryOffice.length < PAGE_SIZE_DEFAULT)) {
            return;
        }
        dispatch(onLoadMoreListNotaryOffice(List_Office_Notary_API, { ...param, start: param.start + param.length }))
    }
    const onHideModal = () => {
        setVisibleModal(false)
    }
    const onHideModalDistrict = () => {
        setVisibleModalDistrict(false)
    }
    const onClickItem = (item: any) => {
        setParentIdDistrict('');
        setSelectItem(item);
        onHideModal();
    }
    const onClickDistrict = (item: any) => {
        setSelectDistrict(item);
        onHideModalDistrict();
    }
    const onShowModal = () => {
        setVisibleModal(true)
    }
    const onShowModalDistrict = () => {
        if (parentid === -1) {
            DropDownHolder.showWarning(translate('dialog:warning'), translate('dialog:nullCity'));
        } else {
            setVisibleModalDistrict(true);
        }
    }
    const onSelectMarkerVPCC = (item: any) => {
        setItemToScroll(item);
    }
    const onRefresh = () => {
        if (!loadMore) {
            dispatch(onRefreshListNotaryOffice(List_Office_Notary_API + '?province=' + parentid + '&district=' + parentIdDistrict, param))
        }
        // dispatch(onGetListNotaryOffice(List_Office_Notary_API + '?province=' + parentid + '&district=' + parentIdDistrict , param))
    }
    const findLatLong = (value: string) => {
        Axios.get(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${value}&inputtype=textquery&fields=formatted_address,name,geometry&key=AIzaSyA4g930QkgOc0QSKEB1Kq9OmLqDiqU-_w4`,
            {
            }).then(function (response) {
                const { data } = response;
                if (data.candidates[0]) {
                    const { lat, lng } = data.candidates[0].geometry.location;
                    setParam({
                        ...param,
                        // latlng: `${lat},${lng}`
                    })
                }

            }).catch(function (error) {
                //console.log(error)
            })

    };
    useEffect(() => {
        if (loading) {
            ProgressHolder.visible(translate('dialog:loading'));
            // setTimeout(()=>ProgressHolder.hidden(),1000)
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
            setParam({ start: 1, length: PAGE_SIZE_DEFAULT })
        }
    }, [codeLoadMore, codeRefresh])

    useEffect(() => {
        dispatch(onGetListAddressCity(List_Address_City + 'parentid=0&typeid=1'));
        return () => {
            dispatch(onResetState())
        };
    }, []);

    const getListOfficeAndAddress = () => {
        dispatch(onGetListAddressCity(List_Address_City + 'parentid=0&typeid=1'));
        dispatch(onGetListNotaryOffice(List_Office_Notary_API + '?province=' + parentid + (parentIdDistrict && `&district=${parentIdDistrict}`), param));
    };
    useEffect(() => {
        if (parentid !== -1) {
            setSelectNameDistrict("Chọn huyện");
            dispatch(onGetListNotaryOffice(List_Office_Notary_API + '?province=' + parentid, param))
            dispatch(onGetListDistrict(List_District + 'parentid=' + parentid + '&typeid=2'));
        }
    }, [selectNameCity]);

    useEffect(() => {
        if (parentIdDistrict !== -1) {
            findLatLong(selectNameDistrict);
            if (parentIdDistrict) {
                dispatch(onGetListNotaryOffice(List_Office_Notary_API + '?province=' + parentid + '&district=' + parentIdDistrict, param))
            } else {
                dispatch(onGetListNotaryOffice(List_Office_Notary_API + '?province=' + parentid, param))
            }
        }
    }, [selectNameDistrict]);


    useEffect(() => {
        dispatch(onGetListNotaryOffice(List_Office_Notary_API, param))
    }, []);

    const _onChangeText = (text: string) => {

        setParam({
            ...param, search: change_alias(text)
        })
        if (text === '') {
            dispatch(onGetListNotaryOffice(List_Office_Notary_API +
                '?province=' + parentid + (parentIdDistrict && `&district=${parentIdDistrict}`)
                , { ...param, search: text }))
        }

    };
    const onSearch = () => {
        dispatch(onGetListNotaryOffice(List_Office_Notary_API +
            '?province=' + parentid + (parentIdDistrict && `&district=${parentIdDistrict}`), param))
    };

    return (
        <>
            <Screen>
                <Wallpaper useWrap={true} />
                <Header
                    isBack={true}
                    childrenRight={<HeaderRightButton
                        onPress={onToggle}
                        icon={isShow ? 'location_2' : 'show_list'} />
                    }
                    headerTx={'main:home:lstOfficeCC:tvHeader'}
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
                                        placeholder={translate('Tìm kiếm văn phòng công chứng')}
                                        style={styles.viewInputSearch}
                                        onChangeText={_onChangeText}
                                    />
                                </View>
                                <TouchableOpacity onPress={onSearch} style={styles.viewLeft}>
                                    <Icon style={styles.iconSearch} icon={'search'} />
                                </TouchableOpacity>
                            </View>
                            <View style={[styles.rowSelect]}>


                                <ModalSelectAddress
                                    setSelectNameCity={setSelectNameCity}
                                    itemAddress={listAddressCity}
                                    setParentid={setParentid}
                                    selectItem={selectItem}
                                    onPress={onClickItem}
                                    onHideModal={onHideModal}
                                    visible={visibleModal}
                                />
                                <ModalSelectDistrict
                                    setParentIdDistrict={setParentIdDistrict}
                                    setSelectNameDistrict={setSelectNameDistrict}
                                    itemDistrict={datalistDistrict}
                                    selectItem={selectDistrict}
                                    onPress={onClickDistrict}
                                    onHideModal={onHideModalDistrict}
                                    visible={visibleModalDistrict}
                                />

                                <View style={[styles.row]}>
                                    <View style={styles.flex3}><ButtonSelect onPress={onShowModal} text={selectNameCity} /></View>
                                    <View style={{ width: 10 }}></View>
                                    <View style={styles.flex3}><ButtonSelect onPress={onShowModalDistrict} text={selectNameDistrict} /></View>
                                </View>
                            </View>
                        </View>
                        <ListItem itemToScroll={itemToScroll} refresh={refresh} onRefresh={onRefresh} onLoadMore={onLoadMore} data={listNotaryOffice} getListOfficeAndAddress={getListOfficeAndAddress} />
                    </View>

                </View>
            </Screen>
        </ >
    )
}

