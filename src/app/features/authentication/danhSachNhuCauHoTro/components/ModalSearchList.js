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
            ethnics: [{ id: -1, ten: 'T???t c???' }, ...ethnics],
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
                display: 'T??? kh??a'
            },
            maTinh: {
                display: 'T???nh/Th??nh ph???'
            },
            maHuyen: {
                display: 'Qu???n/Huy???n'
            },
            maXa: {
                display: 'X??/Ph?????ng'
            },
            trangThai: {
                display: 'Tr???ng th??i'
            },
            mucDoKhuyetTat: {
                display: 'M???c ????? khuy???t t???t'
            },
            sapXep: {
                display: 'S???p x???p'
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
            title='T??m ki???m11'
        >
            <ScrollView>
                <ViewCus.Form>
                    <ViewCus.TextInput
                        nameField='search'
                        label='T??? kh??a'
                        onChangeText={t => setParams('search', t)}
                    />
                    <ViewCus.Selector
                        label='T???nh/Th??nh ph???'
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
                            label='Qu???n/Huy???n'
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
                            label='X??/Ph?????ng'
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
                        label='Ch???n tr???ng th??i'
                        value={-1}
                        options={[
                            { id: -1, label: 'T???t c???' },
                            { id: 0, label: 'Ch??a duy???t' },
                            { id: 1, label: '???? duy???t' },
                        ]}
                        optionLabel={e => e.label}
                        optionKey={e => e.id}
                        onSelected={e => setParams('trangThai', e.id)}
                    />
                    {
                        isAdvanced == true &&
                        <View>
                            <ViewCus.Selector
                                label='Ch???n m???c ????? khuy???t t???t'
                                value={-1}
                                options={[
                                    { id: -1, label: 'T???t c???' },
                                    { id: 1, label: '?????c bi???t n???ng' },
                                    { id: 2, label: 'N???ng' },
                                    { id: 3, label: 'Nh???' },
                                    { id: 4, label: 'Kh??ng x??c ?????nh' },
                                ]}
                                optionLabel={e => e.label}
                                optionKey={e => e.id}
                                onSelected={e => setParams('mucDoKhuyetTat', e.id)}
                            />
                            <ViewCus.DatePicker
                                label='Ch???n th??ng'
                                format='MM/YYYY'
                                onSelected={e => setParams('thang', e)}
                            />
                            <ViewCus.ViewHorizontal>
                                <ViewCus.Selector
                                    label='Ch???n d???ng khuy???t t???t'
                                    styleContainer={{
                                        flex: 1
                                    }}
                                    value={-1}
                                    options={[
                                        { id: -1, label: 'T???t c???' },
                                        { id: 1, label: 'V???n ?????ng' },
                                        { id: 2, label: 'Nh??n' },
                                        { id: 3, label: 'Nghe, n??i' },
                                        { id: 4, label: 'Th???n kinh, t??m th???n' },
                                        { id: 5, label: 'Tr?? tu???' },
                                        { id: 6, label: 'Ch??a x??c ?????nh' },
                                        { id: 7, label: 'Kh??c' },
                                    ]}
                                    optionLabel={e => e.label}
                                    optionKey={e => e.id}
                                    onSelected={e => setParams('dangTat', e.id)}
                                />
                                <View style={{ paddingHorizontal: 10 }} />
                            </ViewCus.ViewHorizontal>
                            <ViewCus.Selector
                                label='S???p x???p'
                                value={1}
                                options={[
                                    { id: 1, label: 'S???p x???p theo h??? t??n' },
                                    { id: 2, label: 'S???p x???p theo th???i gian' },
                                    { id: 3, label: 'S???p x???p theo m???c ????? khuy???t t???t' },
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
                        {'T??m ki???m n??ng cao'}
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
                            {'{0} t??m ki???m n??ng cao'.format(isAdvanced ? '???n' : 'Hi???n')}
                        </Button>
                        <Button
                            style={{
                                backgroundColor: appColors.primary
                            }}
                            onPress={() => onValidate()}
                        >
                            {'T??m ki???m'}
                        </Button>
                        <Button
                            style={{
                                backgroundColor: appColors["materialDeep Orange"]
                            }}
                            onPress={() => onExportExcel()}
                        >
                            {'Xu???t Excel'}
                        </Button>

                    </ViewCus.ViewHorizontal>
                </ViewCus.Form>
            </ScrollView>
        </ViewCus.Modal>
    );
}
export default forwardRef((props, ref) => <ModalSearchList {...props} refOut={ref} />)