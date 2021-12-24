import React, { forwardRef, useImperativeHandle, useRef, useEffect, useState } from 'react';
import { ScrollView, View, Linking } from 'react-native';
import { Button, Text as TextCus } from '../../../../library/components';
import ViewCus from '../../../../library/components/ViewCus/ViewCus';
import { toggleLoading } from '../../../../../../App';
import RestAPI from '../../../../RestAPI/index';
import { palette as appColors } from '../../../../themes/palette';
import Utils from '../../../../library/utils/Utils';
import moment from 'moment';
import RNFetchBlob from 'rn-fetch-blob'
import WebView from 'react-native-webview';
import DropDownHolder from '../../../../library/utils/dropDownHolder';
import { DOWNLOADEXCEL } from '../../../../navigation/screenTypes';
import { navigate } from "../../../../navigation/navigationService";
const Text = (props) => <TextCus {...props} style={[props.style, { color: 'black' }, props.style]} />

let defaultParams = {
    search: '',
    maTinh: -1,
    maHuyen: -1,
    maXa: -1,
    kyBaoCao: 10 / 2020,
    loaiKhuyetTat: -1,
    trangThai: -1,
    mucDoKhuyetTat: -1,
    sapXep: 1,
}
let ModalSearchList = (props) => {
    const {
        onSubmit = () => { },
        refOut
    } = props;


    const [pathFile, setPathFile] = useState(null)
    const [downloaded, setDownloaded] = useState(false)
    const [onDownloading, setOnDownloading] = useState(false)
    const refModal = useRef();
    const refDistrict = useRef();
    const refWard = useRef();
    const [isAdvanced, setIsAdvanced] = useState(false)
    const [master, setMaster] = useState({
        ethnics: [],
        provinces: [],
        districtsAll: [],
        districts: [],
        wardsAll: [],
        wards: [],
    })

    useImperativeHandle(
        refOut,
        () => ({
            toggle
        })
    )

    useEffect(() => {
        loadData();
    }, [])

    let params = {
        ...defaultParams
    }


    const extention = (filename) => {
        return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename) : undefined;
    }

    const setParams = (key, value) => params[key] = value;

    const toggle = (flag) => {
        refModal.current?.toggle(flag)
    }

    const loadData = async () => {
        refModal.current?.toggleLoading(true);
        var ethnics = (await RestAPI.Master_Ethnic()).data;
        var provinces = (await RestAPI.Master_Province()).data;
        var districtsAll = (await RestAPI.Master_District()).data;
        var wardsAll = (await RestAPI.Master_Ward()).data;
        refModal.current?.toggleLoading(false);
        setMaster({
            ethnics: [{ id: -1, ten: 'Tất cả' }, ...ethnics],
            provinces,
            districtsAll,
            wardsAll,
        });
    }

    const onValidate = async () => {
        var _params = !isAdvanced ? {
            search: params.search,
            maTinh: params.maTinh,
            maHuyen: params.maHuyen,
            maXa: params.maXa,
            trangThai: params.trangThai,
        } : params
        var valids = Utils.objectValid.valid(_params, {
            search: {
                display: 'Từ khóa'
            },
            maTinh: {
                display: 'Tỉnh/Thành phố'
            },
            maHuyen: {
                display: 'Quận/Huyện'
            },
            maXa: {
                display: 'Xã/Phường'
            },
            trangThai: {
                display: 'Trạng thái'
            },
            mucDoKhuyetTat: {
                display: 'Mức độ khuyết tật'
            },
            sapXep: {
                display: 'Sắp xếp'
            },
        })
        if (valids.length > 0) {
            ViewCus.Alert.Alert(valids.map(e => e.message).join('\n'));
            return;
        }
        toggle();
        onSubmit(_params);
    }

    const onExportExcel = async () => {
        var resp = await RestAPI.API_ExportExcel_NhuCauHoTro({
            start: 0,
            length: 10,
            search: params.search,
            maTinh: params.maTinh,
            maHuyen: params.maHuyen,
            maXa: params.maXa,
            kyBaoCao: params.kyBaoCao,
            loaiKhuyetTat: params.loaiKhuyetTat,
            trangThai: params.trangThai,
            mucDoKhuyetTat: params.mucDoKhuyetTat,
            sapXep: params.sapXep,
        });
        Linking.openURL('http://' + resp.result);
        toggle();
    }

    return (
        <ViewCus.Modal
            ref={refModal}
            title='Tìm kiếm11'
        >
            <ScrollView>
                <ViewCus.Form>
                    <ViewCus.TextInput
                        nameField='search'
                        label='Từ khóa'
                        onChangeText={t => setParams('search', t)}
                    />
                    <ViewCus.Selector
                        label='Tỉnh/Thành phố'
                        options={master.provinces}
                        optionLabel={e => e.ten}
                        optionKey={e => e.id}
                        onSelected={e => {
                            setParams('maTinh', e.id)
                            refDistrict.current?.updateOptions(master.districtsAll.filter(e1 => e1.maTinh == e.id));
                            refDistrict.current?.trigger();
                            refWard.current?.updateOptions([]);
                            refWard.current?.trigger();
                        }}
                    />
                    <ViewCus.ViewHorizontal>
                        <ViewCus.Selector
                            label='Quận/Huyện'
                            ref={refDistrict}
                            styleContainer={{
                                flex: 1
                            }}
                            options={master.districts}
                            optionLabel={e => e.ten}
                            optionKey={e => e.id}
                            onSelected={e => {
                                setParams('maHuyen', e?.id);
                                refWard.current?.updateOptions(master.wardsAll.filter(e1 => e1.maHuyen == e?.id));
                                refWard.current?.trigger();
                            }}
                        />
                        <View style={{ paddingHorizontal: 10 }} />
                        <ViewCus.Selector
                            label='Xã/Phường'
                            ref={refWard}
                            styleContainer={{
                                flex: 1
                            }}
                            options={master.wards}
                            optionLabel={e => e.ten}
                            optionKey={e => e.id}
                            onSelected={e => setParams('maXa', e?.id)}
                        />
                    </ViewCus.ViewHorizontal>
                    <ViewCus.Selector
                        label='Chọn trạng thái'
                        value={-1}
                        options={[
                            { id: -1, label: 'Tất cả' },
                            { id: 0, label: 'Chưa duyệt' },
                            { id: 1, label: 'Đã duyệt' },
                        ]}
                        optionLabel={e => e.label}
                        optionKey={e => e.id}
                        onSelected={e => setParams('trangThai', e.id)}
                    />
                    {
                        isAdvanced == true &&
                        <View>
                            <ViewCus.Selector
                                label='Chọn mức độ khuyết tật'
                                value={-1}
                                options={[
                                    { id: -1, label: 'Tất cả' },
                                    { id: 1, label: 'Đặc biệt nặng' },
                                    { id: 2, label: 'Nặng' },
                                    { id: 3, label: 'Nhẹ' },
                                    { id: 4, label: 'Không xác định' },
                                ]}
                                optionLabel={e => e.label}
                                optionKey={e => e.id}
                                onSelected={e => setParams('mucDoKhuyetTat', e.id)}
                            />
                            <ViewCus.DatePicker
                                label='Chọn tháng'
                                format='MM/YYYY'
                                onSelected={e => setParams('thang', e)}
                            />
                            <ViewCus.ViewHorizontal>
                                <ViewCus.Selector
                                    label='Chọn dạng khuyết tật'
                                    styleContainer={{
                                        flex: 1
                                    }}
                                    value={-1}
                                    options={[
                                        { id: -1, label: 'Tất cả' },
                                        { id: 1, label: 'Vận động' },
                                        { id: 2, label: 'Nhìn' },
                                        { id: 3, label: 'Nghe, nói' },
                                        { id: 4, label: 'Thần kinh, tâm thần' },
                                        { id: 5, label: 'Trí tuệ' },
                                        { id: 6, label: 'Chưa xác định' },
                                        { id: 7, label: 'Khác' },
                                    ]}
                                    optionLabel={e => e.label}
                                    optionKey={e => e.id}
                                    onSelected={e => setParams('dangTat', e.id)}
                                />
                                <View style={{ paddingHorizontal: 10 }} />
                            </ViewCus.ViewHorizontal>
                            <ViewCus.Selector
                                label='Sắp xếp'
                                value={1}
                                options={[
                                    { id: 1, label: 'Sắp xếp theo họ tên' },
                                    { id: 2, label: 'Sắp xếp theo thời gian' },
                                    { id: 3, label: 'Sắp xếp theo mức độ khuyết tật' },
                                ]}
                                optionLabel={e => e.label}
                                optionKey={e => e.id}
                                onSelected={e => setParams('sapXep', e.id)}
                            />
                        </View>
                    }
                    <ViewCus.Checkbox
                        typeCheckNumber={false}
                        value={isAdvanced}
                        onPress={() => setIsAdvanced(!isAdvanced)}
                    >
                        {'Tìm kiếm nâng cao'}
                    </ViewCus.Checkbox>
                    <ViewCus.ViewHorizontal
                        style={{
                            marginTop: 20,
                            justifyContent: 'space-around'
                        }}
                    >
                        <Button
                            onPress={() => setIsAdvanced(!isAdvanced)}
                            style={{
                                backgroundColor: appColors.metronicInfo
                            }}
                        >
                            {'{0} tìm kiếm nâng cao'.format(isAdvanced ? 'Ẩn' : 'Hiện')}
                        </Button>
                        <Button
                            style={{
                                backgroundColor: appColors.primary
                            }}
                            onPress={() => onValidate()}
                        >
                            {'Tìm kiếm'}
                        </Button>
                        <Button
                            style={{
                                backgroundColor: appColors["materialDeep Orange"]
                            }}
                            onPress={() => onExportExcel()}
                        >
                            {'Xuất Excel'}
                        </Button>

                    </ViewCus.ViewHorizontal>
                </ViewCus.Form>
            </ScrollView>
        </ViewCus.Modal>
    );
}
export default forwardRef((props, ref) => <ModalSearchList {...props} refOut={ref} />)