import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ConfigProps, Field, InjectedFormProps, reduxForm } from 'redux-form';
import { Text } from '../../../../../library/components';
import { Radio } from '../../../../../library/components/radio';
import Selector from '../../../../../library/components/selector';
import ViewCus from '../../../../../library/components/ViewCus/ViewCus';
import { FONT_14, FONT_18, FONT_22 } from '../../../../../themes/fontSize';
import Utils from '../../../../../library/utils/Utils';
import { onGetListAddressCity, onResetState } from '../../../../authentication/home//childrenScreen/listOfficeCC/redux/action';
import { ListNotaryOfficeState } from '../../../../authentication/home/childrenScreen/historyCC/redux/reducer';
import { onGetListDistrict, onGetListWard } from '../../../../authentication/home/childrenScreen/listOfficeCC/redux/action';

export const Form = reduxForm({ form: 'Register' })(
  (props: ConfigProps & InjectedFormProps) => {
    const { handleSubmit, onSubmit } = props;
    const {
      listAddressCity, datalistDistrict, datalistWard
    }: ListNotaryOfficeState = useSelector((x: any) => x.ListNotaryOffice)

    const dispatch = useDispatch();
    const refDistrict = useRef(null);
    const refWard = useRef(null);

    const [cityId, setCityId] = useState(-1)
    const [districId, setDistricId] = useState(-1)
    const [wardId, setWardId] = useState(-1)
    const [passwordLevel, setPasswordLevel] = useState(0);
    const [strLevel, setStrLevel] = useState('');
    const [colorLevel, setColorLevel] = useState('');

    const formObj = useSelector(s => s.form.Register)?.values || {};

    useEffect(() => {
      props.initialize(
        __DEV__ ? {
        }
          : {});
      dispatch(onGetListAddressCity('https://apinkt.dttt.vn/api/v1/DM_TinhTP/DM_TinhTP_GetAll?suDung=0'));
      return () => {
        dispatch(onResetState())
      };
    }, []);

    useEffect(() => {
      if (cityId > 0)
        dispatch(onGetListDistrict('https://apinkt.dttt.vn/api/v1/DM_QuanHuyen/DM_QuanHuyen_GetAll?maTinh=' + cityId + ' &suDung=0'))
    }, [cityId])

    useEffect(() => {
      if (districId > 0)
        dispatch(onGetListWard('https://apinkt.dttt.vn/api/v1/DM_PhuongXa/DM_PhuongXa_GetAll?maTinh=' + cityId + '&maHuyen=' + districId + '&suDung=0'))
    }, [districId])

    return (
      <View>
        <Field
          name={'Username'}
          component={ViewCus.TextInput}
          placeholder='Tên đăng Nhập'
          label='Tên đăng Nhập'
        />
        <Field
          name={'Password'}
          component={ViewCus.TextInput}
          placeholder='Mật khẩu'
          label='Mật khẩu'
          secureTextEntry={true}
        />
        <Field
          name={'repeatpassword'}
          component={ViewCus.TextInput}
          placeholder='Nhập lại Mật khẩu'
          label='Nhập lại Mật khẩu'
          secureTextEntry={true}
        />
        {passwordLevel > 0 ? <Text text={strLevel} style={{ color: colorLevel, width: '100%', textAlign: 'center', marginTop: 8, marginLeft: 5, fontStyle: 'italic' }} /> : null}

        <Field
          name={'LastName'}
          component={ViewCus.TextInput}
          placeholder='Họ và Tên đệm'
          label='Họ và Tên đệm'
        />
        <Field
          name={'FirstName'}
          component={ViewCus.TextInput}
          placeholder='Tên'
          label='Tên'
        />
        <Field
          name={'NgaySinh'}
          component={ViewCus.TextDate}
          validate={[Utils.objectValid.isValidDate]}
          label='Ngày Sinh'
        />
        <Field
          name={'CMND'}
          component={ViewCus.TextInput}
          placeholder='CMND'
          label='CMND'
        />
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
            selected={formObj.GioiTinh == '2'}
            valueRadio={2}
            tx={'Nữ'}
          />
        </View>
        <Field
          name={'Email'}
          component={ViewCus.TextInput}
          placeholder='Email'
          label='Email'
        />
        <Field
          name={'SoDienThoai'}
          component={ViewCus.TextInput}
          placeholder='Số điện thoại'
          label='Số điện thoại'
        />
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            marginTop: 20,

          }}
        >
          <View style={{ flex: 0.35, flexDirection: 'row', }}>
            <Field
              name={'MaTinh'}
              component={Selector}
              options={listAddressCity}
              itemLabel={(e, index) => e.ten}
              itemKey={(e, index) => e.id}
              onSelected={(e, index) => {
                setCityId(e.id);
                refDistrict.current.select(-1)
              }}
              placeholder='Chọn tỉnh'
              styleButton={{
                flex: 1
              }}
            />
          </View>
          <View style={{ flex: 0.35, flexDirection: 'row', }}>
            <Field
              name={'MaHuyen'}
              component={Selector}
              options={datalistDistrict}
              itemLabel={(e, index) => e.ten}
              itemKey={(e, index) => e.id}
              onSelected={(e, index) => {
                setDistricId(e.id);
              }}
              onRef={e => refDistrict.current = e}
              placeholder='Chọn huyện'
              styleButton={{
                flex: 1
              }}
            />

          </View>
          <View style={{ flex: 0.35, flexDirection: 'row', }}>
            <Field
              name={'MaXa'}
              component={Selector}
              options={datalistWard}
              itemLabel={(e, index) => e.ten}
              itemKey={(e, index) => e.id}
              onSelected={(e, index) => {
                setWardId(e.id);
              }}
              // onRef={e => refWard.current = e}
              placeholder='Chọn xã'
              styleButton={{
                flex: 1
              }}
            />
          </View>
        </View>
        <Field
          name={'DiaChi'}
          component={ViewCus.TextInput}
          placeholder='Địa chỉ'
          label='Địa chỉ'
        />
      </View>
    );
  },
);
const styles = StyleSheet.create({
  contentModal: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },

  viewBottom: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  viewLeft: {
    backgroundColor: '#f3f3f3',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    height: 50,
    elevation: 5,
    overflow: 'visible',
    width: '100%',
    flex: 1,
    flexDirection: 'row'
  },
  viewcity: {
    backgroundColor: '#f3f3f3',
    alignItems: 'center',
    height: 50,
    elevation: 5,
    marginTop: 10,
    width: '100%',
  },
  textDate: {
    color: '#333333',
    fontSize: FONT_18,
    fontStyle: 'normal',
    flex: 0.5,
    flexDirection: 'row'
  },

  textStartDate: {
    flex: 0.5,
    color: '#000000',
    fontSize: FONT_14,
    opacity: 0.8,
    fontStyle: 'normal',
    flexDirection: 'row'

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
  textNameStation: {
    color: '#000000',
    fontSize: FONT_22,
    opacity: 0.8,
    fontStyle: 'normal',
    fontWeight: 'bold',

  },
  rowSelect: {
    flexDirection: 'row',
    overflow: 'hidden',
    width: '100%',
    backgroundColor: '#F3F3F3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center'
  },
  flex3: {
    flex: 3,
    paddingHorizontal: 0
  },

});

