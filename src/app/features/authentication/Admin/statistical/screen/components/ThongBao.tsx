import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { ConfigProps, Field, InjectedFormProps, reduxForm } from 'redux-form';
import { Button, Text } from '../../../../../../library/components';
import { DatePicker } from '../../../../../../library/components/date';
import Icon from '../../../../../../library/components/iconVector/index';
import IoniconsFont from '../../../../../../library/components/iconVector/Ionicons';
import { Radio } from '../../../../../../library/components/radio';
import Selector from '../../../../../../library/components/selector';
import { TextField } from '../../../../../../library/components/text-field/text-field';
import { GlobalStyle } from '../../../../../../themes';
import { ServiceAsync } from '../../../../../../library/networking/async'
import { color } from '../../../../../../themes/color';
import { HomeTabState } from '../../../../home/redux/reducer';
import { CustomInput } from '../../../../../../library/components/inputCustom/customInput';
import { FONT_14, FONT_18 } from '../../../../../../themes/fontSize';
import { ListNotaryOfficeState } from '../../../../../authentication/home/childrenScreen/historyCC/redux/reducer';
import { onGetListDistrict, onGetListEthnic, onGetListWard } from '../../../../../authentication/home/childrenScreen/listOfficeCC/redux/action';
import { onGetListAddressCity, onResetState } from '../../../../home/childrenScreen/listOfficeCC/redux/action';
import ButtonNextTab from './ButtonNextTab';
import { translate } from '../../../../../../library/utils/i18n/translate';
const tickSuccess = require('../../../../../../assets/image/source/tick_success.png');
const styles = StyleSheet.create({
  
});

export const ThongBao = reduxForm({ form: 'ThongBao' })(
  (props: ConfigProps & InjectedFormProps) => {

    const { data } = props;

    const renderItem = ({ item }: any) => (
      <View style={{ margin: 10 }}>
        <View style={{ backgroundColor: '#ccf3f8', flexDirection: 'row', alignItems: 'center' }}>
          <Image style={{ width: 30, height: 30, margin: 15 }} source={tickSuccess} />
          <Text style={{color: 'black', fontWeight: 'bold', fontSize: 16, margin: 10}}>{item.hoTen}</Text>
        </View>
        <View style={{backgroundColor: 'white'}}>
          <Text style={{color: 'black', fontSize: 14, margin: 20}}>{item.tenLoai}</Text>
        </View>

      </View>
    )

    return (
      <View style={[GlobalStyle.fullScreen]}>
        <FlatList
          data={data}
          style={{ marginTop: 10, marginBottom: 10 }}
          // onEndReachedThreshold={0.01}
          // onEndReached={data}
          renderItem={renderItem}
          keyExtractor={(item: any) => item.id.toString()}
        />
      </View>
    );
  },
);