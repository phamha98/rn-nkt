import React, { useEffect, useRef } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Field, reduxForm } from 'redux-form';
import { toggleLoading } from '../../../../../../../App';
import { isAndroid } from '../../../../../common';
import { Header, Screen, Text, Wallpaper } from '../../../../../library/components';
import ButtonNextTab from '../../../../../library/components/buttonNext/ButtonNextTab';
import ViewCus from '../../../../../library/components/ViewCus/ViewCus';
import DropDownHolder from '../../../../../library/utils/dropDownHolder';
import Utils from '../../../../../library/utils/Utils';
import RestAPI from '../../../../../RestAPI';
let UserIdCapHoTro: any;
const defaultData = {
  NgayCapHoTro: null,
  NoiDungDuyet: '',
  DonViDuyet: '',
}
const validateForm = data => {
  var valids = Utils.objectValid.valid({
    ...data,
  }, {
    NgayCapHoTro: {
      required: true,
      greaterDateOrEqual: {
        valid: true,
        compareWith: new Date(),
        compareFormat: 'DD/MM/YYYY'
      },
    },
    NoiDungDuyet: {
      required: true,
      maxlength: 100,
    },
    DonViDuyet: {
      required: true,
      maxlength: 100,
    },
  }, { lan: 'redux-form' })
  return valids.toObject(e => e.field, e => e.message);
}
const Item = (config: any) => {
  return reduxForm({
    form: config.name,
    initialValues: {
      ...config.data
    },
    validate: validateForm
  })((props: any) => {
    const { handleSubmit, navigation, initialize: loadForm, reset: resetForm } = props;

    const onUpdateCapNhatHoTro = async (obj) => {
      var resp = await RestAPI.API_CapNhatHoTro(obj);
      DropDownHolder.showSuccess((resp.messeger));
    }
    const onDeleteHoTroNhuCau = (obj) => {
      var value = {
        IdChiTietHoTro: obj.IdChiTietHoTro,
        IdHoTro: obj.IdHoTro
      }
      var resp = RestAPI.API_CapNhatHoTro(value);
      DropDownHolder.showSuccess((resp.messeger));
      loadForm()

    }
    return (
      <ViewCus.ViewBoxShadown>
        <ViewCus.Checkbox
          selected={true}
          disabled={true}
        >
          {config.data.ten}
        </ViewCus.Checkbox>
        <Field
          name={'NgayCapHoTro'}
          component={ViewCus.DatePicker}
          label={'Ng??y nh???n h??? tr???'}
        />
        <Field
          name={'NoiDungDuyet'}
          component={ViewCus.TextInput}
          label={'N???i dung h??? tr???'}
        />
        <Field
          name={'DonViDuyet'}
          component={ViewCus.TextInput}
          label={'????n v??? h??? tr???'}
        />
        <View style={{ flex: 1, flexDirection: 'row', padding: 10, justifyContent: 'space-around' }}>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ flex: 0.5, padding: 5 }}>
              <ButtonNextTab
               onPress={handleSubmit(onUpdateCapNhatHoTro)}
              >
                {'C???p nh???t'}
              </ButtonNextTab>
            </View>
            <View style={{ flex: 0.5, padding: 5 }}>
              <ButtonNextTab
               onPress={handleSubmit(onDeleteHoTroNhuCau)}>
                {'X??a'}
              </ButtonNextTab>
            </View>
          </View>
        </View>
      </ViewCus.ViewBoxShadown>
    )
  })
}

export const NhanHoTro = ({ navigation }) => {
  const User = navigation.getParam('VALUE_USER', {});
  const refContent = useRef()
  UserIdCapHoTro = User.id
  useEffect(() => {
    loadData();
  }, [])

  const loadData = async () => {
    toggleLoading(true);
    var resp = await RestAPI.API_NhanHoTro(User.id);
    toggleLoading();
    var arr = [];
    var index = 0;
    resp.dM_LoaiHinhThucHoTro_ChiTiet.map((list_HinhThucHoTro_ChiTiet, indexCate) =>
      list_HinhThucHoTro_ChiTiet.list_HinhThucHoTro_ChiTiet.map((hinhThucHoTro, indexGroup) =>
        hinhThucHoTro.list_NoiDungHoTro.filter(e => e.hoTro_ChiTiet !== null)
          .map((noiDungHoTro, indexItem) => {
            let obj = {
              'UserIdCapHoTro': UserIdCapHoTro,
              'IdChiTietHoTro': noiDungHoTro.hoTro_ChiTiet.id,
              'IdHoTro': noiDungHoTro.hoTro_ChiTiet.idHoTro,
              'IdNoiDungHoTro': noiDungHoTro.hoTro_ChiTiet.idNoiDungHoTro,
              'NgayCapHoTro': noiDungHoTro.hoTro_ChiTiet.ngayCapHoTro,
              'NoiDungDuyet': noiDungHoTro.hoTro_ChiTiet.noiDungDuyet,
              'DonViDuyet': noiDungHoTro.hoTro_ChiTiet.donViDuyet,
              'ten': noiDungHoTro.noiDungHoTro.ten,
              'TrangThai': 3,
            }
            var ItemHoTro = Item({
              name: 'HoTro-{0}'.format(noiDungHoTro.hoTro_ChiTiet.id),
              data: obj
            });

            index++;
            arr.push(<ItemHoTro key={index} />)
          })
      )
    )
    refContent.current?.setData(arr)
  }

  return (
    <>
      <Screen>
        <Wallpaper useWrap={true} />
        <Header
          isBack={true}
          headerTx={'Chi ti???t n???i dung h??? tr???'}
        />
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            backgroundColor: 'white'
          }}
        >
          <Text
            style={{
              paddingVertical: 15,
              color: 'black',
              fontWeight: 'bold',
              fontSize: 17,
              textAlign: 'center'
            }}
          >
            {'N???I DUNG H??? TR???: ' + User.a4_HoTen}
          </Text>
          <ViewCus.ComponentDynamic
            ref={refContent}
            styleContainer={{
              paddingHorizontal: 10
            }}
            render={component => component}
          />
        </ScrollView>
      </Screen>
    </>
  )
}
const styles = StyleSheet.create({
  header: {
    paddingTop: isAndroid ? StatusBar.currentHeight ? StatusBar.currentHeight + 10 : 20 : 15,
    paddingBottom: isAndroid ? 19 : 15,
  },
})