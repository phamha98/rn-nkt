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
            <Text style={styles.title}>{'Đi lại'}</Text>
            <Field
              name={'MDKT_21'}
              component={ViewCus.RadioGroup}
              options={[
                {
                  value: 1,
                  label: 'Thực hiện được',
                  name: 'THD'
                },
                {
                  value: 2,
                  label: 'Thực hiện được nhưng cần trợ giúp',
                  name: 'THDNCTG'
                },
                {
                  value: 3,
                  label: 'Không thực hiện được',
                  name: 'KTHD'
                },
                {
                  value: 4,
                  label: 'Không xác định được',
                  name: 'KXDD'
                },
              ]}
            />
          </ViewCus.ViewBoxShadown>
          <ViewCus.ViewBoxShadown>
            <Text style={styles.title}>{'Ăn Uống'}</Text>
            <Field
              name={'MDKT_22'}
              component={ViewCus.RadioGroup}
              options={[
                {
                  value: 1,
                  label: 'Thực hiện được',
                  name: 'THD'
                },
                {
                  value: 2,
                  label: 'Thực hiện được nhưng cần trợ giúp',
                  name: 'THDNCTG'
                },
                {
                  value: 3,
                  label: 'Không thực hiện được',
                  name: 'KTHD'
                },
                {
                  value: 4,
                  label: 'Không xác định được',
                  name: 'KXDD'
                },
              ]}
            />
          </ViewCus.ViewBoxShadown>
          <ViewCus.ViewBoxShadown>
            <Text style={styles.title}>{'Tiểu tiện, đại tiện'}</Text>
            <Field
              name={'MDKT_23'}
              component={ViewCus.RadioGroup}
              options={[
                {
                  value: 1,
                  label: 'Thực hiện được',
                  name: 'THD'
                },
                {
                  value: 2,
                  label: 'Thực hiện được nhưng cần trợ giúp',
                  name: 'THDNCTG'
                },
                {
                  value: 3,
                  label: 'Không thực hiện được',
                  name: 'KTHD'
                },
                {
                  value: 4,
                  label: 'Không xác định được',
                  name: 'KXDD'
                },
              ]}
            />
          </ViewCus.ViewBoxShadown>
          <ViewCus.ViewBoxShadown>
            <Text style={styles.title}>{'Vệ sinh cá nhân như đánh răng, rửa mặt, tắm rửa...'}</Text>
            <Field
              name={'MDKT_24'}
              component={ViewCus.RadioGroup}
              options={[
                {
                  value: 1,
                  label: 'Thực hiện được',
                  name: 'THD'
                },
                {
                  value: 2,
                  label: 'Thực hiện được nhưng cần trợ giúp',
                  name: 'THDNCTG'
                },
                {
                  value: 3,
                  label: 'Không thực hiện được',
                  name: 'KTHD'
                },
                {
                  value: 4,
                  label: 'Không xác định được',
                  name: 'KXDD'
                },
              ]}
            />
          </ViewCus.ViewBoxShadown>
          <ViewCus.ViewBoxShadown>
            <Text style={styles.title}>{'Mặc, cởi quần áo, giầy dép'}</Text>
            <Field
              name={'MDKT_25'}
              component={ViewCus.RadioGroup}
              options={[
                {
                  value: 1,
                  label: 'Thực hiện được',
                  name: 'THD'
                },
                {
                  value: 2,
                  label: 'Thực hiện được nhưng cần trợ giúp',
                  name: 'THDNCTG'
                },
                {
                  value: 3,
                  label: 'Không thực hiện được',
                  name: 'KTHD'
                },
                {
                  value: 4,
                  label: 'Không xác định được',
                  name: 'KXDD'
                },
              ]}
            />
          </ViewCus.ViewBoxShadown>
          <ViewCus.ViewBoxShadown>
            <Text style={styles.title}>{'Nghe và hiểu người khác nói gì'}</Text>
            <Field
              name={'MDKT_26'}
              component={ViewCus.RadioGroup}
              options={[
                {
                  value: 1,
                  label: 'Thực hiện được',
                  name: 'THD'
                },
                {
                  value: 2,
                  label: 'Thực hiện được nhưng cần trợ giúp',
                  name: 'THDNCTG'
                },
                {
                  value: 3,
                  label: 'Không thực hiện được',
                  name: 'KTHD'
                },
                {
                  value: 4,
                  label: 'Không xác định được',
                  name: 'KXDD'
                },
              ]}
            />
          </ViewCus.ViewBoxShadown>
          <ViewCus.ViewBoxShadown>
            <Text style={styles.title}>{'Diễn đạt được ý muốn và suy nghĩ của bản thân qua lời nói'}</Text>
            <Field
              name={'MDKT_27'}
              component={ViewCus.RadioGroup}
              options={[
                {
                  value: 1,
                  label: 'Thực hiện được',
                  name: 'THD'
                },
                {
                  value: 2,
                  label: 'Thực hiện được nhưng cần trợ giúp',
                  name: 'THDNCTG'
                },
                {
                  value: 3,
                  label: 'Không thực hiện được',
                  name: 'KTHD'
                },
                {
                  value: 4,
                  label: 'Không xác định được',
                  name: 'KXDD'
                },
              ]}
            />
          </ViewCus.ViewBoxShadown>
          <ViewCus.ViewBoxShadown>
            <Text style={styles.title}>{'Làm các việc gia đình như gấp quần áo, quét nhà, rửa bát, nấu cơm phù hợp với độ tuổi; lao động, sản xuất tạo thu nhập'}</Text>
            <Field
              name={'MDKT_28'}
              component={ViewCus.RadioGroup}
              options={[
                {
                  value: 1,
                  label: 'Thực hiện được',
                  name: 'THD'
                },
                {
                  value: 2,
                  label: 'Thực hiện được nhưng cần trợ giúp',
                  name: 'THDNCTG'
                },
                {
                  value: 3,
                  label: 'Không thực hiện được',
                  name: 'KTHD'
                },
                {
                  value: 4,
                  label: 'Không xác định được',
                  name: 'KXDD'
                },
              ]}
            />
          </ViewCus.ViewBoxShadown>
          <ViewCus.ViewBoxShadown>
            <Text style={styles.title}>{'Giao tiếp xã hội, hòa nhập cộng đồng phù hợp với độ tuổi'}</Text>
            <Field
              name={'MDKT_29'}
              component={ViewCus.RadioGroup}
              options={[
                {
                  value: 1,
                  label: 'Thực hiện được',
                  name: 'THD'
                },
                {
                  value: 2,
                  label: 'Thực hiện được nhưng cần trợ giúp',
                  name: 'THDNCTG'
                },
                {
                  value: 3,
                  label: 'Không thực hiện được',
                  name: 'KTHD'
                },
                {
                  value: 4,
                  label: 'Không xác định được',
                  name: 'KXDD'
                },
              ]}
            />
          </ViewCus.ViewBoxShadown>
          <ViewCus.ViewBoxShadown>
            <Text style={styles.title}>{'Đọc, viết, tính toán và kỹ năng học tập khác'}</Text>
            <Field
              name={'MDKT_210'}
              component={ViewCus.RadioGroup}
              options={[
                {
                  value: 1,
                  label: 'Thực hiện được',
                  name: 'THD'
                },
                {
                  value: 2,
                  label: 'Thực hiện được nhưng cần trợ giúp',
                  name: 'THDNCTG'
                },
                {
                  value: 3,
                  label: 'Không thực hiện được',
                  name: 'KTHD'
                },
                {
                  value: 4,
                  label: 'Không xác định được',
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
                {'Hãy kiểm tra lại dữ liệu'}
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
              {'Tiếp tục'}
            </ButtonNextTab>
          }
        </View>
      </ScrollView>
    );
  },
);
