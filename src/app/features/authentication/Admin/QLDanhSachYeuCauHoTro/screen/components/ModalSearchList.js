import React, { forwardRef, useImperativeHandle, useRef, useEffect, useState } from 'react';
import { ScrollView, View ,Linking} from 'react-native';
import { Button, Text as TextCus } from '../../../../../../library/components';
import ViewCus from '../../../../../../library/components/ViewCus/ViewCus';
import { toggleLoading } from '../../../../../../../../App';
import RestAPI from '../../../../../../RestAPI/index';
import { palette as appColors } from '../../../../../../themes/palette';
import Utils from '../../../../../../library/utils/Utils';
import moment from 'moment';
import { reduxForm, Field, reset, formValueSelector } from 'redux-form';
import { useSelector } from 'react-redux';
const Text = (props) => <TextCus {...props} style={[props.style, { color: 'black' }, props.style]} />

export let defaultParams = {
    search: '',
    maTinh: -1,
    maTinh: -1,
    maHuyen: -1,
    maXa: 0,
    trangThai: -1,
    thang: null,
    mucDoKhuyetTat: -1,
    dangTat: -1,
    sapXep: 1,
    isAdvanced: false
}
const formValidate = data => {
    var error = {};

    var valids = Utils.objectValid.valid({
        ...data,
    }, {
        search: {
            maxlength: 20
        },
        maHuyen: {
        },
        thang: {
            lessDateOrEqual: {
                valid: true,
                compareWith: new Date(),
                compareFormat: 'MMMM/YYYY',
                compareType: 'month',
            }
        },
        isAdvanced: {
        },
    }, { lan: 'redux-form' })
    error = valids.toObject(e => e.field, e => e.message);
    return error;
}

const selectorReduxForm = formValueSelector('SearchFirstRegister')
let ModalSearchList = (props) => {
    const {
        handleSubmit,
        reset: resetForm,
        initialize: loadForm,
        onSubmit = () => { },
        refOut
    } = props;

    const isAdvanced = useSelector(state => selectorReduxForm(state, 'isAdvanced'))
    const user = useSelector(state => state.AppReducer.profile.user);
    defaultParams = {
        ...defaultParams,
        maTinh: user.maTinh,
        maHuyen: user.maHuyen,
        maXa: user.maXa,
    }
    const refModal = useRef();
    const refDistrict = useRef();
    const refWard = useRef();
    const [master, setMaster] = useState({
        ethnics: [],
        provinces: [],
        districtsAll: [],
        wardsAll: [],
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

    const toggle = async (flag, dataParams) => {
        await refModal.current?.toggle(flag);
        if (flag == true) {
            dataParams = {
                ...dataParams,
                maTinh: user.maTinh,
                maHuyen: user.maHuyen,
                maXa: user.maXa,
            }
            refDistrict.current?.getRenderedComponent()
                .updateOptions(master.districtsAll.filter(e1 => e1.maTinh == dataParams.maTinh))
            refWard.current?.getRenderedComponent()
                .updateOptions(master.wardsAll.filter(e1 => e1.maHuyen == dataParams.maHuyen))

            loadForm(dataParams);
        }
    }

    clickResetForm = () => {
        // refDistrict.current?.getRenderedComponent()
        //     .updateOptions([])
        // refWard.current?.getRenderedComponent()
        //     .updateOptions([])
        loadForm({
            ...defaultParams,
            maTinh: user.maTinh,
            maHuyen: user.maHuyen,
            maXa: user.maXa,
        });
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

    const onSubmitForm = async (values, dispatch, props) => {
        toggle();
        onSubmit(values);
    }

    const onExportExcel = async (params) => {
        console.log(params)
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
        console.log(resp)
        Linking.openURL('http://nkt.btxh.gov.vn/' + resp.result);
        toggle();
    }


    return (
        <ViewCus.Modal
            ref={refModal}
            title='Tìm kiếm'
            styleContent={{
                paddingHorizontal: 0
            }}
        >
            <ScrollView
                contentContainerStyle={{
                    paddingHorizontal: 15
                }}
            >
                <Field
                    name='search'
                    component={ViewCus.TextInput}
                    label='Từ khóa'
                />
                <Field
                    name='maTinh'
                    component={ViewCus.Selector}
                    label='Tỉnh'
                    options={master.provinces}
                    optionLabel={e => e?.ten}
                    optionKey={e => e?.id}
                    onSelected={e => {
                        refDistrict.current?.getRenderedComponent()
                            .updateOptions(master.districtsAll.filter(e1 => e1.maTinh == e?.id)).select(-1).trigger();

                        refWard.current?.getRenderedComponent()
                            .updateOptions([]).select(-1).trigger();
                    }}
                    disable={true}
                />
                <ViewCus.ViewHorizontal>
                    <Field
                        name='maHuyen'
                        component={ViewCus.Selector}
                        forwardRef={true}
                        label='Quận/Huyện'
                        ref={refDistrict}
                        styleContainer={{
                            flex: 1
                        }}
                        optionLabel={e => e?.ten}
                        optionKey={e => e?.id}
                        onSelected={e => {
                            refWard.current?.getRenderedComponent()
                                .updateOptions(master.wardsAll.filter(e1 => e1.maHuyen == e?.id)).select(-1).trigger();
                        }}
                        disable={true}
                    />
                    <View style={{ paddingHorizontal: 10 }} />
                    <Field
                        name='maXa'
                        component={ViewCus.Selector}
                        forwardRef={true}
                        label='Xã'
                        ref={refWard}
                        styleContainer={{
                            flex: 1
                        }}
                        optionLabel={e => e?.ten}
                        optionKey={e => e?.id}
                    />
                </ViewCus.ViewHorizontal>
                <Field
                    name='trangThai'
                    component={ViewCus.Selector}
                    label='Chọn trạng thái'
                    options={[
                        { id: -1, label: 'Tất cả' },
                        { id: 0, label: 'Từ chối' },
                        { id: 1, label: 'Chưa duyệt' },
                        { id: 2, label: 'Đã duyệt' },
                    ]}
                    optionLabel={e => e.label}
                    optionKey={e => e.id}
                />
                {
                    isAdvanced == true &&
                    <View>
                        <Field
                            name='mucDoKhuyetTat'
                            component={ViewCus.Selector}
                            label='Mức độ khuyết tật'
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
                        />
                        <Field
                            name='thang'
                            component={ViewCus.DatePicker}
                            mode="date"
                            label='Tháng đăng ký'
                            formatDate='MM/YYYY'
                        />
                        <ViewCus.ViewHorizontal>
                            <Field
                                name='dangTat'
                                component={ViewCus.Selector}
                                label='Dạng tật'
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
                            />
                            <View style={{ paddingHorizontal: 10 }} />

                        </ViewCus.ViewHorizontal>
                        <Field
                            name='sapXep'
                            component={ViewCus.Selector}
                            label='Sắp xếp'
                            value={1}
                            options={[
                                { id: 1, label: 'Sắp xếp theo họ tên' },
                                { id: 2, label: 'Sắp xếp theo thời gian' },
                                { id: 3, label: 'Sắp xếp theo mức độ khuyết tật' },
                            ]}
                            optionLabel={e => e.label}
                            optionKey={e => e.id}
                        />
                    </View>
                }
                <Field
                    name='isAdvanced'
                    component={ViewCus.Checkbox}
                    children='Tìm kiếm nâng cao'
                />
                <ViewCus.ViewHorizontal
                    style={{
                        paddingVertical: 20,
                        justifyContent: 'space-around'
                    }}
                >
                    <Button
                        style={{
                            backgroundColor: appColors.metronicInfo,
                            flex: 1
                        }}
                        onPress={() => clickResetForm()}
                    >
                        {'Đặt lại'}
                    </Button>
                    <View style={{ paddingHorizontal: 10 }} />
                    <Button
                        style={{
                            backgroundColor: appColors.metronicSuccess,
                            flex: 1
                        }}
                        onPress={handleSubmit(onSubmitForm)}
                    >
                        {'Tìm kiếm'}
                    </Button>
                    <View style={{ paddingHorizontal: 10 }} />
                    <Button
                        style={{
                            backgroundColor: appColors["materialDeep Orange"]
                        }}
                        // onPress={() => onExportExcel()}
                        onPress={handleSubmit(onExportExcel)}
                    >
                        {'Xuất Excel'}
                    </Button>

                </ViewCus.ViewHorizontal>
            </ScrollView>
        </ViewCus.Modal>
    );
}

ModalSearchList = reduxForm({
    form: 'SearchFirstRegister',
    initialValues: defaultParams,
    validate: formValidate,
})(ModalSearchList)
export default forwardRef((props, ref) => <ModalSearchList {...props} refOut={ref} />)