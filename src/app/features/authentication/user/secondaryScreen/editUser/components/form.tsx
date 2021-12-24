import React, { useEffect, useRef, useState } from 'react';
import { Field, reduxForm, ConfigProps, InjectedFormProps } from 'redux-form';
import { useDispatch, useSelector } from 'react-redux'
import { View, StyleSheet } from 'react-native';
import { Text } from '../../../../../../library/components';
import { Radio } from '../../../../../../library/components/radio';
import { DatePicker } from '../../../../../../library/components/date';
import { translate } from '../../../../../../library/utils/i18n/translate';
import { Divider, TextField } from '../../../../../../library/components';
import { FONT_14, FONT_18, FONT_22 } from '../../../../../../themes/fontSize';
import { Title } from './title';
import Selector from '../../../../../../library/components/selector';
import { ButtonNext } from './buttonNext';
import { ServiceAsync } from '../../../../../../library/networking/async';
// import { onGetListEthnic } from '../redux/action';
// import { CreateNotaryState } from '../redux/reducer';
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        width: '100%',

    },
    inputFlex2: { flex: 2 },
    inputFlex3: { flex: 3 },
    viewSpace: {
        width: 20,
    },
    wrap: {
        justifyContent: 'space-between',
        flex: 1,
        paddingBottom: 20,
    },
    textGioiTinh: {
        flex: 0.7,
        color: '#000000',
        fontSize: FONT_14,
        opacity: 0.8,
        fontStyle: 'normal',
        flexDirection: 'row',
        marginTop: 7
    },
})

const phone = value =>
    (value && !/^\(?([0-9]{3})\)?[-.]?([0-9]{3})[-.]?([0-9]{4})$/i.test(value))
        ? translate('validate:required')
        : undefined;
const cmnd = value =>
    value ? ((value.length == 8) || (value.length == 11) || (value.length == 7)
        ? undefined : translate('CMND/CCCD/Hộ chiếu phải 8, 9 hoặc 12 ký tự')) : undefined;
const required = (value: any) =>
    value && value.toString().trim().length > 0
        ? undefined
        : translate('validate:required');
const email = (value: any) =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
        'Invalid email address' : undefined
interface InfoFormProps {
    onChangeInfo: (name: string, value: string) => void;
    selectItem: any;
}
export const Form = reduxForm({ form: 'Update_Info' })(
    (props: ConfigProps & InjectedFormProps & InfoFormProps) => {
        const { handleSubmit, onSubmit, defaultValue } = props;
        const [cityId, setCityId] = useState(-1)
        const [districtId, setDistrictId] = useState(-1)
        const dispatch = useDispatch();
        const formObj = useSelector(s => s.form.Update_Info)?.values || {};
        const dataDetailUser = useSelector(state => state.AppReducer.profile.user);
        const [master, setMaster] = useState({
            listCities: [],
            listEthnic: [],
            listQualification: [],
            listEducationLevel: [],
            listDistrict: [],
            listWard: [],
        })
        useEffect(() => {
            var effect = async () => {
                loadData()
                var listCities = (await ServiceAsync.Get('https://apinkt.dttt.vn/api/v1/DM_TinhTP/DM_TinhTP_GetAll?suDung=0')).data
                var listDistrict = (await ServiceAsync.Get('https://apinkt.dttt.vn/api/v1/DM_QuanHuyen/DM_QuanHuyen_GetAll?maTinh=' + dataDetailUser.MaTinh + ' &suDung=0')).data
                var listWard = (await ServiceAsync.Get('https://apinkt.dttt.vn/api/v1/DM_PhuongXa/DM_PhuongXa_GetAll?maTinh=' + dataDetailUser.MaTinh + '&maHuyen=' + dataDetailUser.MaHuyen + '&suDung=0')).data
                var listEthnic = (await ServiceAsync.Get('https://apinkt.dttt.vn/api/v1/DM_DanToc/List?length=99')).data
                var listQualification = (await ServiceAsync.Get('https://apinkt.dttt.vn/api/v1/DM_TrinhDoChuyenMon/List?length=99')).data
                var listEducationLevel = (await ServiceAsync.Get('https://apinkt.dttt.vn/api/v1/DM_TrinhDoChuyenMon/List?length=99')).data
                setMaster({
                    ...master,
                    listCities,
                    listDistrict,
                    listWard,
                    listEthnic,
                    listQualification,
                    listEducationLevel,
                })

                props.initialize({
                    DisplayName: dataDetailUser.displayName,
                    username: dataDetailUser.username,
                    fullname: dataDetailUser.firstName,
                    CMND: dataDetailUser.cmnd,
                    TrinhDoHocVan: dataDetailUser.trinhDoHocVan,
                    TrinhDoChuyeMon: dataDetailUser.trinhDoChuyenMon,
                    DanToc: dataDetailUser.danToc,
                    GioiTinh: dataDetailUser.gioiTinh,
                    NgaySinh: dataDetailUser.ngaySinh,
                    Email: dataDetailUser.email,
                    SoDienThoai: dataDetailUser.soDienThoai,
                    MaTinh: dataDetailUser.maTinh,
                    MaHuyen: dataDetailUser.maHuyen,
                    MaXa: dataDetailUser.maXa,
                    DiaChi: dataDetailUser.diaChi,
                });
            }
            effect();
        }, [])

        useEffect(() => {
            var effect = async () => {
                if (cityId > 0) {
                    var listDistrict = (await ServiceAsync.Get('https://apinkt.dttt.vn/api/v1/DM_QuanHuyen/DM_QuanHuyen_GetAll?maTinh=' + cityId + ' &suDung=0')).data;
                    setMaster({
                        ...master,
                        listDistrict,
                    })
                }
            }
            effect();
        }, [cityId])

        useEffect(() => {
            var effect = async () => {
                if (districtId > 0) {
                    var listWard = (await ServiceAsync.Get('https://apinkt.dttt.vn/api/v1/DM_PhuongXa/DM_PhuongXa_GetAll?maTinh=' + cityId + '&maHuyen=' + districtId + '&suDung=0')).data;
                    setMaster({
                        ...master,
                        listWard,
                    })
                }
            }
            effect();
        }, [districtId])
        var loadData = () => {
            props.initialize({
              trinhDoHocVan: dataDetailUser.trinhDoChuyenMon,
              TrinhDoChuyeMon: dataDetailUser.trinhDoChuyenMon,
              DanToc: dataDetailUser.DanToc,
              NgaySinh: dataDetailUser.NgaySinh,
              MaTinh: dataDetailUser.MaTinh,
              MaHuyen: dataDetailUser.MaHuyen,
              MaXa: dataDetailUser.MaXa,
              HKTT_Tinh: 2,
            })
          }

        return (
            <View style={styles.wrap}>
                <View>
                    <Title textTx={'main:user:editUser:txtTitle'} />
                    <Divider color={'#DCDCDC'} />
                    <Field
                        name={'username'}
                        useTitle={true}
                        // validate={[required]}
                        placeHolder={"Tên đăng nhập"}
                        labelTx={'Tên đăng nhập'}
                        placeholderTx={'login:tvEmail'}
                        placeholderColor={'#F3F3F3'}
                        component={TextField}
                        editable={false} 
                    />
                    <Field
                        name={'DisplayName'}
                        // validate={[required]}
                        useTitle={true}
                        placeHolder={"Họ và tên"}
                        labelTx={'main:user:editUser:txtName'}
                        placeholderTx={'login:tvEmail'}
                        placeholderColor={'#F3F3F3'}
                        component={TextField}
                    />
                    <Field
                        name={'CMND'}
                        // validate={[cmnd]}
                        useTitle={true}
                        placeHolder={translate('Số CMND')}
                        labelTx={'main:home:infoNotary:tvIdentityCard'}
                        component={TextField}
                    />
                    <View style={{ flex: 1, flexDirection: 'row', }}>
                        <Field
                            name={'TrinhDoHocVan'}
                            component={Selector}
                            options={master.listEducationLevel}
                            itemLabel={(e, index) => e.ten}
                            itemKey={(e, index) => e.id}
                            placeholder='Trình độ học vấn'
                            styleButton={{
                                flex: 1
                            }}
                        />
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', marginTop: 15 }}>
                        <Field
                            name={'TrinhDoChuyeMon'}
                            component={Selector}
                            options={master.listQualification}
                            itemLabel={(e, index) => e.ten}
                            itemKey={(e, index) => e.id}
                            placeholder='Trình độ chuyên môn'
                            styleButton={{
                                flex: 1
                            }}
                        />
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', marginTop: 15 }}>
                        <Field
                            name={'DanToc'}
                            component={Selector}
                            options={master.listEthnic}
                            itemLabel={(e, index) => e.ten}
                            itemKey={(e, index) => e.id}
                            placeholder='Dân Tộc'
                            styleButton={{
                                flex: 1
                            }}
                        />

                    </View>

                    <View style={{ flex: 1, flexDirection: 'row', marginTop: 20, marginLeft: 0 }}>
                        <Text style={styles.textGioiTinh}>{"Giới tính :"}</Text>
                        <Field
                            name={'GioiTinh'}
                            component={Radio}
                            styleContainer={{
                                flex: 1
                            }}
                            selected={formObj.GioiTinh == 1}
                            valueRadio={1}
                            tx={'Nam'}
                        />
                        <Field
                            name={'GioiTinh'}
                            component={Radio}
                            styleContainer={{
                                flex: 1
                            }}
                            selected={formObj.GioiTinh == 2}
                            valueRadio={2}
                            tx={'Nữ'}

                        />
                    </View>
                    <Field
                        name={'NgaySinh'}
                        component={DatePicker}
                        placeholder='Lựa chọn Ngày sinh'
                        mode="date"
                        locale="vi_VN"
                    />

                    <Field
                        name={'Email'}
                        // validate={[required, email]}
                        placeHolder={"Email"}
                        useTitle={true}
                        labelTx={'Địa chỉ email'}
                        placeholderTx={'login:tvEmail'}
                        placeholderColor={'#F3F3F3'}
                        component={TextField}
                    />
                    <Field
                        name={'SoDienThoai'}
                        // validate={[required, phone]}
                        placeHolder={"Số điện thoại"}
                        useTitle={true}
                        labelTx={'main:user:editUser:txtPhone'}
                        placeholderTx={'login:tvEmail'}
                        isPhone={true}
                        placeholderColor={'#F3F3F3'}
                        component={TextField}
                    />

                    <View style={{ flex: 1, flexDirection: 'row', }} pointerEvents="none">
                        <Field
                            name={'MaTinh'}
                            component={Selector}
                            options={master.listCities}
                            itemLabel={(e, index) => e.ten}
                            itemKey={(e, index) => e.id}
                            onSelected={(e, index) => {
                                setCityId(e.id);
                            }}
                            placeholder='Chọn tỉnh'
                            styleButton={{
                                flex: 1
                            }}

                        />
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', marginTop: 15 }} pointerEvents="none">
                        <Field
                            name={'MaHuyen'}
                            component={Selector}
                            options={master.listDistrict}
                            itemLabel={(e, index) => e.ten}
                            itemKey={(e, index) => e.id}
                            onSelected={(e, index) => {
                                setDistrictId(e.id);
                            }}
                            placeholder='Chọn huyện'
                            styleButton={{
                                flex: 1
                            }}
                        />

                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', marginTop: 15 }} pointerEvents="none">
                        <Field
                            name={'MaXa'}
                            component={Selector}
                            options={master.listWard}
                            itemLabel={(e, index) => e.ten}
                            itemKey={(e, index) => e.id}
                            placeholder='Chọn xã'
                            styleButton={{
                                flex: 1
                            }}
                        />
                    </View>

                    <Field
                        name={'DiaChi'}
                        placeHolder={"Địa chỉ"}
                        labelTx={'Địa chỉ'}
                        useTitle={true}
                        placeholderTx={'login:tvEmail'}
                        placeholderColor={'#F3F3F3'}
                        component={TextField}
                    />
                </View>
                <ButtonNext onPress={handleSubmit(onSubmit)} />
            </View>
        );
    },
);
