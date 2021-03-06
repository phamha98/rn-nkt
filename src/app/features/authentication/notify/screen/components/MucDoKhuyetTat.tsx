import React, { useEffect, useState } from 'react';
import { StyleSheet, View, RefreshControl } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ConfigProps, Field, InjectedFormProps, reduxForm } from 'redux-form';
import { Button, Text } from '../../../../../library/components';
import ViewCus from '../../../../../library/components/ViewCus/ViewCus';
import Utils from '../../../../../library/utils/Utils';
import { GlobalStyle, palette as appColors } from '../../../../../themes';
import ButtonNextTab from './ButtonNextTab';

const defaultData = {
  MDKT_21: 0,
  MDKT_22: 0,
  MDKT_23: 0,
  MDKT_24: 0,
  MDKT_25: 0,
  MDKT_26: 0,
  MDKT_27: 0,
  MDKT_28: 0,
  MDKT_29: 0,
  MDKT_210: 0
}

const validateForm = (data: any) => {
  var valids = Utils.objectValid.valid({
    ...defaultData,
    ...data,
  }, {
  }, { lan: 'redux-form' })
  return valids.toObject(e => e.field, e => e.message);
}
const styles = StyleSheet.create({
  title: {
    fontSize: 15,
    letterSpacing: 0.16,
    paddingVertical: 5,
    color: 'black',
  },
});
export const MucDoKhuyetTat = reduxForm({ form: 'MucDoKhuyetTat' })(
  (props: InfoFormProps & ConfigProps & InjectedFormProps) => {
    const {
      handleSubmit,
      reset: resetForm,
      initialize: loadForm,
      anyTouched,
      invalid,
      refOut,
      onReady,
      onRefresh,
      lockTab,
      isRefresh: _isRefresh,
    } = props;
    const [isRefresh, setIsRefresh] = useState(false)

    useEffect(() => {
      setIsRefresh(false);
      init()
    }, [_isRefresh])

    var init = async () => {
      var { master: masterAll, dataSaved } = onReady() || {};
      // const {
      //   ethnics,
      //   provinces,
      //   districts,
      //   wards,
      // } = masterAll;
      var data = Utils.mapDataWithCase(defaultData, dataSaved.gxN_01)
      setFormData(data)
    }

    const setFormData = (data) => {
      loadForm(data)
    }

    const onResetFrom = () => {
      loadForm(defaultData)
    }
    var _onSubmit = (obj) => {
      props.onSubmitNext('GXN_01', obj, false)
    }
    return (
      <ScrollView
        contentContainerStyle={{
          width: '100%',
          backgroundColor: 'white',
          padding: 10,
        }}
        refreshControl={<RefreshControl refreshing={isRefresh} onRefresh={() => (setIsRefresh(true), onRefresh())} />}
      >
        <View>
          <ViewCus.ViewBoxShadown>
            <Text style={styles.title}>{'??i l???i'}</Text>
            <Field
              name={'MDKT_21'}
              component={ViewCus.RadioGroup}
              options={[
                {
                  value: 1,
                  label: 'Th???c hi???n ???????c',
                  name: 'THD'
                },
                {
                  value: 2,
                  label: 'Th???c hi???n ???????c nh??ng c???n tr??? gi??p',
                  name: 'THDNCTG'
                },
                {
                  value: 3,
                  label: 'Kh??ng th???c hi???n ???????c',
                  name: 'KTHD'
                },
                {
                  value: 4,
                  label: 'Kh??ng x??c ?????nh ???????c',
                  name: 'KXDD'
                },
              ]}
            />
          </ViewCus.ViewBoxShadown>
          <ViewCus.ViewBoxShadown>
            <Text style={styles.title}>{'??n U???ng'}</Text>
            <Field
              name={'MDKT_22'}
              component={ViewCus.RadioGroup}
              options={[
                {
                  value: 1,
                  label: 'Th???c hi???n ???????c',
                  name: 'THD'
                },
                {
                  value: 2,
                  label: 'Th???c hi???n ???????c nh??ng c???n tr??? gi??p',
                  name: 'THDNCTG'
                },
                {
                  value: 3,
                  label: 'Kh??ng th???c hi???n ???????c',
                  name: 'KTHD'
                },
                {
                  value: 4,
                  label: 'Kh??ng x??c ?????nh ???????c',
                  name: 'KXDD'
                },
              ]}
            />
          </ViewCus.ViewBoxShadown>
          <ViewCus.ViewBoxShadown>
            <Text style={styles.title}>{'Ti???u ti???n, ?????i ti???n'}</Text>
            <Field
              name={'MDKT_23'}
              component={ViewCus.RadioGroup}
              options={[
                {
                  value: 1,
                  label: 'Th???c hi???n ???????c',
                  name: 'THD'
                },
                {
                  value: 2,
                  label: 'Th???c hi???n ???????c nh??ng c???n tr??? gi??p',
                  name: 'THDNCTG'
                },
                {
                  value: 3,
                  label: 'Kh??ng th???c hi???n ???????c',
                  name: 'KTHD'
                },
                {
                  value: 4,
                  label: 'Kh??ng x??c ?????nh ???????c',
                  name: 'KXDD'
                },
              ]}
            />
          </ViewCus.ViewBoxShadown>
          <ViewCus.ViewBoxShadown>
            <Text style={styles.title}>{'V??? sinh c?? nh??n nh?? ????nh r??ng, r???a m???t, t???m r???a...'}</Text>
            <Field
              name={'MDKT_24'}
              component={ViewCus.RadioGroup}
              options={[
                {
                  value: 1,
                  label: 'Th???c hi???n ???????c',
                  name: 'THD'
                },
                {
                  value: 2,
                  label: 'Th???c hi???n ???????c nh??ng c???n tr??? gi??p',
                  name: 'THDNCTG'
                },
                {
                  value: 3,
                  label: 'Kh??ng th???c hi???n ???????c',
                  name: 'KTHD'
                },
                {
                  value: 4,
                  label: 'Kh??ng x??c ?????nh ???????c',
                  name: 'KXDD'
                },
              ]}
            />
          </ViewCus.ViewBoxShadown>
          <ViewCus.ViewBoxShadown>
            <Text style={styles.title}>{'M???c, c???i qu???n ??o, gi???y d??p'}</Text>
            <Field
              name={'MDKT_25'}
              component={ViewCus.RadioGroup}
              options={[
                {
                  value: 1,
                  label: 'Th???c hi???n ???????c',
                  name: 'THD'
                },
                {
                  value: 2,
                  label: 'Th???c hi???n ???????c nh??ng c???n tr??? gi??p',
                  name: 'THDNCTG'
                },
                {
                  value: 3,
                  label: 'Kh??ng th???c hi???n ???????c',
                  name: 'KTHD'
                },
                {
                  value: 4,
                  label: 'Kh??ng x??c ?????nh ???????c',
                  name: 'KXDD'
                },
              ]}
            />
          </ViewCus.ViewBoxShadown>
          <ViewCus.ViewBoxShadown>
            <Text style={styles.title}>{'Nghe v?? hi???u ng?????i kh??c n??i g??'}</Text>
            <Field
              name={'MDKT_26'}
              component={ViewCus.RadioGroup}
              options={[
                {
                  value: 1,
                  label: 'Th???c hi???n ???????c',
                  name: 'THD'
                },
                {
                  value: 2,
                  label: 'Th???c hi???n ???????c nh??ng c???n tr??? gi??p',
                  name: 'THDNCTG'
                },
                {
                  value: 3,
                  label: 'Kh??ng th???c hi???n ???????c',
                  name: 'KTHD'
                },
                {
                  value: 4,
                  label: 'Kh??ng x??c ?????nh ???????c',
                  name: 'KXDD'
                },
              ]}
            />
          </ViewCus.ViewBoxShadown>
          <ViewCus.ViewBoxShadown>
            <Text style={styles.title}>{'Di???n ?????t ???????c ?? mu???n v?? suy ngh?? c???a b???n th??n qua l???i n??i'}</Text>
            <Field
              name={'MDKT_27'}
              component={ViewCus.RadioGroup}
              options={[
                {
                  value: 1,
                  label: 'Th???c hi???n ???????c',
                  name: 'THD'
                },
                {
                  value: 2,
                  label: 'Th???c hi???n ???????c nh??ng c???n tr??? gi??p',
                  name: 'THDNCTG'
                },
                {
                  value: 3,
                  label: 'Kh??ng th???c hi???n ???????c',
                  name: 'KTHD'
                },
                {
                  value: 4,
                  label: 'Kh??ng x??c ?????nh ???????c',
                  name: 'KXDD'
                },
              ]}
            />
          </ViewCus.ViewBoxShadown>
          <ViewCus.ViewBoxShadown>
            <Text style={styles.title}>{'L??m c??c vi???c gia ????nh nh?? g???p qu???n ??o, qu??t nh??, r???a b??t, n???u c??m ph?? h???p v???i ????? tu???i; lao ?????ng, s???n xu???t t???o thu nh???p'}</Text>
            <Field
              name={'MDKT_28'}
              component={ViewCus.RadioGroup}
              options={[
                {
                  value: 1,
                  label: 'Th???c hi???n ???????c',
                  name: 'THD'
                },
                {
                  value: 2,
                  label: 'Th???c hi???n ???????c nh??ng c???n tr??? gi??p',
                  name: 'THDNCTG'
                },
                {
                  value: 3,
                  label: 'Kh??ng th???c hi???n ???????c',
                  name: 'KTHD'
                },
                {
                  value: 4,
                  label: 'Kh??ng x??c ?????nh ???????c',
                  name: 'KXDD'
                },
              ]}
            />
          </ViewCus.ViewBoxShadown>
          <ViewCus.ViewBoxShadown>
            <Text style={styles.title}>{'Giao ti???p x?? h???i, h??a nh???p c???ng ?????ng ph?? h???p v???i ????? tu???i'}</Text>
            <Field
              name={'MDKT_29'}
              component={ViewCus.RadioGroup}
              options={[
                {
                  value: 1,
                  label: 'Th???c hi???n ???????c',
                  name: 'THD'
                },
                {
                  value: 2,
                  label: 'Th???c hi???n ???????c nh??ng c???n tr??? gi??p',
                  name: 'THDNCTG'
                },
                {
                  value: 3,
                  label: 'Kh??ng th???c hi???n ???????c',
                  name: 'KTHD'
                },
                {
                  value: 4,
                  label: 'Kh??ng x??c ?????nh ???????c',
                  name: 'KXDD'
                },
              ]}
            />
          </ViewCus.ViewBoxShadown>
          <ViewCus.ViewBoxShadown>
            <Text style={styles.title}>{'?????c, vi???t, t??nh to??n v?? k??? n??ng h???c t???p kh??c'}</Text>
            <Field
              name={'MDKT_210'}
              component={ViewCus.RadioGroup}
              options={[
                {
                  value: 1,
                  label: 'Th???c hi???n ???????c',
                  name: 'THD'
                },
                {
                  value: 2,
                  label: 'Th???c hi???n ???????c nh??ng c???n tr??? gi??p',
                  name: 'THDNCTG'
                },
                {
                  value: 3,
                  label: 'Kh??ng th???c hi???n ???????c',
                  name: 'KTHD'
                },
                {
                  value: 4,
                  label: 'Kh??ng x??c ?????nh ???????c',
                  name: 'KXDD'
                },
              ]}
            />
          </ViewCus.ViewBoxShadown>
          {
            (anyTouched && invalid) && <View>
              <Text
                style={{
                  color: appColors.materialRed,
                  paddingVertical: 20,
                  paddingHorizontal: 10
                }}
              >
                {'H??y ki???m tra l???i d??? li???u'}
              </Text>
            </View>
          }
          {__DEV__ &&
            <Button
              onPress={() => onResetFrom()}
            >
              {'Reset'}
            </Button>
          }
          {
            lockTab &&
            <ButtonNextTab
              onPress={handleSubmit(_onSubmit)}
            >
              {'Ti???p t???c'}
            </ButtonNextTab>
          }
        </View>
      </ScrollView>
    );
  },
);
