import React, { forwardRef, useImperativeHandle, useRef, useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Button, Text as TextCus } from '../../../../../../library/components';
import ViewCus from '../../../../../../library/components/ViewCus/ViewCus';
import { toggleLoading } from '../../../../../../../../App';
import RestAPI from '../../../../../../RestAPI/index';
import { palette as appColors } from '../../../../../../themes/palette';
import Utils from '../../../../../../library/utils/Utils';
import moment from 'moment';
import { reduxForm, Field, reset, formValueSelector } from 'redux-form';
import { useSelector } from 'react-redux';
import { debug } from 'react-native-reanimated';
const Text = (props) => <TextCus {...props} style={[props.style, { color: 'black' }, props.style]} />

export let defaultParams = {
    search: '',
    draw: 3,
    maTinh: -1,
    maHuyen: -1,
    maXa: -1,
    trangThai: -1,
    thang: null,
    gioiTinh: -1,
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

let ModalSearchList = (props) => {
    const {
        handleSubmit,
        reset: resetForm,
        initialize: loadForm,
        onSubmit = () => { },
        refOut
    } = props;

    const user = useSelector(state => state.AppReducer.profile.user);

    const refContentAdvanced = useRef();
    const refModal = useRef();
    const refProvince = useRef();
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
            setTinhHuyen(dataParams)
            setFormData(dataParams);
        }
    }

    const setTinhHuyen = (data) => {
        refProvince.current?.getRenderedComponent().updateDisable(user.maTinh != null && user.maTinh != '' && user.maTinh > 0);
        refDistrict.current?.getRenderedComponent()
            .updateOptions(master.districtsAll.filter(e1 => e1.maTinh == data.maTinh)).select(-1).updateDisable(user.maHuyen != null && user.maHuyen != '' && user.maHuyen > 0);
        refWard.current?.getRenderedComponent()
            .updateOptions(master.wardsAll.filter(e1 => e1.maHuyen == data.maHuyen)).select(-1).updateDisable(user.maXa != null && user.maXa != '' && user.maXa > 0)
    }

    const clickResetForm = () => {
        var params = {
            ...defaultParams,
            maTinh: user.maTinh > 0 ? user.maTinh : 0,
            maHuyen: user.maHuyen > 0 ? user.maHuyen : 0,
            maXa: user.maXa > 0 ? user.maXa : 0,
        }
        setTinhHuyen(params);
        setFormData(params);
    }

    const setFormData = (data) => {
        refContentAdvanced.current?.setData(data.isAdvanced == 1)
        loadForm(data);
    }

    const loadData = async () => {
        refModal.current?.toggleLoading(true);
        var provinces = (await RestAPI.Master_Province()).data;
        var districtsAll = (await RestAPI.Master_District()).data;
        var wardsAll = (await RestAPI.Master_Ward()).data;
        refModal.current?.toggleLoading(false);
        setMaster({
            provinces,
            districtsAll,
            wardsAll,
        });
    }

    const onSubmitForm = async (values, dispatch, props) => {
        toggle();
        onSubmit(values);
    }

    return (
        <ViewCus.Modal
            ref={refModal}
            title='T??m ki???m'
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
                    label='T??? kh??a'
                />
                <Field
                    name='maTinh'
                    component={ViewCus.Selector}
                    label='T???nh/Th??nh ph???'
                    ref={refProvince}
                    forwardRef={true}
                    options={master.provinces}
                    optionLabel={e => e?.ten}
                    optionKey={e => e?.id}
                    onSelected={e => {
                        refDistrict.current?.getRenderedComponent()
                            .updateOptions(master.districtsAll.filter(e1 => e1.maTinh == e?.id)).select(-1)

                        refWard.current?.getRenderedComponent()
                            .updateOptions([]).select(-1)
                    }}
                />
                <ViewCus.ViewHorizontal>
                    <Field
                        name='maHuyen'
                        component={ViewCus.Selector}
                        forwardRef={true}
                        label='Qu???n/Huy???n'
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
                    />
                    <View style={{ paddingHorizontal: 10 }} />
                    <Field
                        name='maXa'
                        component={ViewCus.Selector}
                        forwardRef={true}
                        label='X??/Ph?????ng'
                        ref={refWard}
                        styleContainer={{
                            flex: 1
                        }}
                        optionLabel={e => e?.ten}
                        optionKey={e => e?.id}
                    />
                </ViewCus.ViewHorizontal>

                <ViewCus.ComponentDynamic
                    ref={refContentAdvanced}
                    render={(isActive = false) => (
                        isActive && <>
                            <Field
                                name='gioiTinh'
                                component={ViewCus.Selector}
                                label='Gi???i t??nh'
                                styleContainer={{
                                    flex: 1
                                }}
                                value={-1}
                                options={[
                                    { id: -1, label: 'T???t c???' },
                                    { id: 1, label: 'Nam' },
                                    { id: 2, label: 'N???' },
                                ]}
                                optionLabel={e => e.label}
                                optionKey={e => e.id}
                            />
                            <Field
                                name='trangThai'
                                component={ViewCus.Selector}
                                label='Ch???n tr???ng th??i'
                                value={-1}
                                options={[
                                    { id: -1, label: 'T???t c???' },
                                    { id: 1, label: 'Ch??a duy???t' },
                                    { id: 2, label: '???? duy???t' },
                                ]}
                                optionLabel={e => e.label}
                                optionKey={e => e.id}
                            />
                            <Field
                                name='mucDoKhuyetTat'
                                component={ViewCus.Selector}
                                label='M???c ????? khuy???t t???t'
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
                            />
                            <Field
                                name='thang'
                                component={ViewCus.DatePicker}
                                label='Th??ng ????ng k??'
                                formatDate='MM/YYYY'
                            />
                        </>
                    )}
                />
                <Field
                    name='isAdvanced'
                    component={ViewCus.Checkbox}
                    onChange={(event, value, preValue, name) => refContentAdvanced.current?.setData(value == 1)}
                    children='T??m ki???m n??ng cao'
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
                        {'?????t l???i'}
                    </Button>
                    <View style={{ paddingHorizontal: 10 }} />
                    <Button
                        style={{
                            backgroundColor: appColors.metronicSuccess,
                            flex: 1
                        }}
                        onPress={handleSubmit(onSubmitForm)}
                    >
                        {'T??m ki???m'}
                    </Button>
                </ViewCus.ViewHorizontal>
            </ScrollView>
        </ViewCus.Modal>
    );
}

ModalSearchList = reduxForm({
    form: 'SearchDisability',
    initialValues: defaultParams,
    validate: formValidate,
})(ModalSearchList)
export default forwardRef((props, ref) => <ModalSearchList {...props} refOut={ref} />)