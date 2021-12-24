import React, { forwardRef, useImperativeHandle, useRef, useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Button, Text as TextCus } from '../../../../../library/components';
import ViewCus from '../../../../../library/components/ViewCus/ViewCus';
import { toggleLoading } from '../../../../../../../App';
import RestAPI from '../../../../../RestAPI/index';
import { palette as appColors } from '../../../../../themes/palette';
import Utils from '../../../../../library/utils/Utils';
import moment from 'moment';
import { reduxForm, Field, reset, formValueSelector } from 'redux-form';
import { useSelector } from 'react-redux';
const Text = (props) => <TextCus {...props} style={[props.style, { color: 'black' }, props.style]} />

export let defaultParams = {
    search: '',
    maTinh: -1,
    maTinh: -1,
    maHuyen: -1,
    maXa: -1,
    gioiTinh: -1,
    danToc: -1,
    trangThai: -1,
    thang: null,
    mucDoKhuyetTat: -1,
    dangTat: -1,
    nguyenNhan: -1,
    tn: '',
    dn: '',
    tuNgay: '',
    denNgay: '',
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
        tn: {
            displayName: 'Tuổi từ',
            number: true,
            min: 1,
            max: 100,
            lessThanOrEqual: 'dn'
        },
        dn: {
            displayName: 'tuổi đến',
            number: true,
            min: 1,
            max: 100,
            greaterThanOrEqual: 'tn',
        },
        tuNgay: {
            displayName: 'Từ ngày',
            lessDateOrEqual: true,
            lessDateOrEqualWith: 'denNgay',
        },
        denNgay: {
            displayName: 'đến ngày',
            lessDateOrEqual: true,
            greaterDateOrEqualWith: 'tuNgay',
        },
    }, { lan: 'redux-form' })
    error = valids.toObject(e => e.field, e => e.message);
    return error;
}

let isReady = false;
const selectorReduxForm = formValueSelector('SearchUpdateRegister')
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
    const refProvince = useRef();
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
        isReady = false
        loadData();
    }, [])

    const toggle = async (flag, dataParams) => {
        if (!isReady) return;
        await refModal.current?.toggle(flag);
        if (flag == true) {
            refProvince.current?.getRenderedComponent().updateDisable(user.maTinh != null && user.maTinh != '' && user.maTinh > 0);
            refDistrict.current?.getRenderedComponent()
                .updateOptions(master.districtsAll.filter(e1 => e1.maTinh == dataParams.maTinh)).select(-1).updateDisable(user.maHuyen != null && user.maHuyen != '' && user.maHuyen > 0);
            refWard.current?.getRenderedComponent()
                .updateOptions(master.wardsAll.filter(e1 => e1.maHuyen == dataParams.maHuyen)).select(-1).updateDisable(user.maXa != null && user.maXa != '' && user.maXa > 0)

            loadForm(dataParams);
        }
    }

    clickResetForm = () => {
        loadForm({
            ...defaultParams,
            maTinh: user.maTinh > 0 ? user.maTinh : 0,
            maHuyen: user.maHuyen > 0 ? user.maHuyen : 0,
            maXa: user.maXa > 0 ? user.maXa : 0,
        });
    }

    const loadData = async () => {
        toggleLoading();
        var ethnics = (await RestAPI.Master_Ethnic()).data;
        var provinces = (await RestAPI.Master_Province()).data;
        var districtsAll = (await RestAPI.Master_District()).data;
        var wardsAll = (await RestAPI.Master_Ward()).data;
        toggleLoading();
        setMaster({
            ethnics: [{ id: -1, ten: 'Tất cả' }, ...ethnics],
            provinces,
            districtsAll,
            wardsAll,
        });
        isReady = true
    }

    const onSubmitForm = (values, dispatch, props) => {
        toggle();
        onSubmit(values);
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
                    forwardRef={true}
                    ref={refProvince}
                    options={master.provinces}
                    optionLabel={e => e?.ten}
                    optionKey={e => e?.id}
                    onSelected={e => {
                        refDistrict.current?.getRenderedComponent()
                            .updateOptions(master.districtsAll.filter(e1 => e1.maTinh == e?.id)).select(-1)

                        refWard.current?.getRenderedComponent()
                            .updateOptions([]).select(-1)
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
                                .updateOptions(master.wardsAll.filter(e1 => e1.maHuyen == e?.id)).select(-1)
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

                <ViewCus.ViewHorizontal>
                    <Field
                        name='gioiTinh'
                        component={ViewCus.Selector}
                        label='Giới tính'
                        styleContainer={{
                            flex: 1
                        }}
                        value={-1}
                        options={[
                            { id: -1, label: 'Tất cả' },
                            { id: 1, label: 'Nam' },
                            { id: 2, label: 'Nữ' },
                        ]}
                        optionLabel={e => e.label}
                        optionKey={e => e.id}
                    />
                    <View style={{ paddingHorizontal: 10 }} />
                    <Field
                        name='danToc'
                        component={ViewCus.Selector}
                        label='Dân tộc'
                        styleContainer={{
                            flex: 1
                        }}
                        value={-1}
                        options={master.ethnics}
                        optionLabel={e => e.ten}
                        optionKey={e => e.id}
                    />
                </ViewCus.ViewHorizontal>
                <Field
                    name='trangThai'
                    component={ViewCus.Selector}
                    label='Trạng thái'
                    value={-1}
                    options={[
                        { id: -1, label: 'Tất cả' },
                        { id: 0, label: 'Chưa duyệt' },
                        { id: 1, label: 'Đã duyệt' },
                        { id: -10, label: 'Đã chết' },
                        { id: -11, label: 'Thôi hưởng chính sách' },
                        { id: -12, label: 'Chuyển đi nơi khác' },
                        { id: -13, label: 'Khác' },
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
                            <Field
                                name='nguyenNhan'
                                component={ViewCus.Selector}
                                label='Nguyên nhân'
                                styleContainer={{
                                    flex: 1
                                }}
                                value={-1}
                                options={[
                                    { id: -1, label: 'Tất cả' },
                                    { id: 1, label: 'Bẩm sinh' },
                                    { id: 2, label: 'Bệnh tật' },
                                    { id: 3, label: 'Tai nạn lao động' },
                                    { id: 4, label: 'Tai nạn trong sinh hoạt' },
                                    { id: 5, label: 'Tai nạn giao thông' },
                                    { id: 6, label: 'Tai nạn do bom mìn' },
                                    { id: 7, label: 'Chiến tranh' },
                                    { id: 8, label: 'Khác' },
                                ]}
                                optionLabel={e => e.label}
                                optionKey={e => e.id}
                            />
                        </ViewCus.ViewHorizontal>
                        <ViewCus.ViewHorizontal>
                            <Field
                                name='tn'
                                component={ViewCus.TextInput}
                                label='Tuổi từ'
                                styleContainer={{
                                    flex: 1
                                }}
                            />
                            <View style={{ paddingHorizontal: 10 }} />
                            <Field
                                name='dn'
                                component={ViewCus.TextInput}
                                label='đến'
                                styleContainer={{
                                    flex: 1
                                }}
                            />
                        </ViewCus.ViewHorizontal>
                        <ViewCus.ViewHorizontal>
                            <Field
                                name='tuNgay'
                                component={ViewCus.DatePicker}
                                label='Đăng ký từ ngày'
                                formatDate='DD/MM/YYYY'
                                styleContainer={{
                                    flex: 1
                                }}
                            />
                            <View style={{ paddingHorizontal: 10 }} />
                            <Field
                                name='denNgay'
                                component={ViewCus.DatePicker}
                                label='đến'
                                formatDate='DD/MM/YYYY'
                                styleContainer={{
                                    flex: 1
                                }}
                            />
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
                </ViewCus.ViewHorizontal>
            </ScrollView>
        </ViewCus.Modal>
    );
}

ModalSearchList = reduxForm({
    form: 'SearchUpdateRegister',
    initialValues: defaultParams,
    validate: formValidate,
})(ModalSearchList)
export default forwardRef((props, ref) => <ModalSearchList {...props} refOut={ref} />)