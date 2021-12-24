import React, {useState, useRef, useEffect} from 'react';
import {Text, Image, View, Animated, TextInput, StyleSheet} from 'react-native';
import R from '../../../../../assets/value';
import I18n from '../../../../../library/utils/i18n/i18n';
import {Button} from '../../../../../library/components';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {FONT_16, FONT_14, FONT_18} from '../../../../../themes/fontSize';
export const SelectDate = props => {
  const {
    placeholder,
    secureTextEntry,
    isNumber,
    disabled,
    onChangeText,
    meta: {touched, error},
    input: {onChange, value},
  } = props;
  const [isShowDate, setShowDate] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const _showDateTimePicker = () => {
    setShowDate(true);
  };

  const _hideDateTimePicker = () => {
    setShowDate(false);
  };

  const _handleDatePicked = date => {
    setSelectedDate(date);
    _hideDateTimePicker();
  };
  useEffect(() => {
    if(selectedDate!==""){
      onChange(moment(selectedDate).format('YYYY-MM-DD'));
    }

  }, [selectedDate]);
  return (
    <Button
      onPress={disabled === true ? null : _showDateTimePicker}
      activeOpacity={disabled ? 1 : 0.87}
      style={styles.wrapInput}>
      <Text
        allowFontScaling={false}
        style={[
          styles.labelStyle,
          {
            color: touched && error ? '#F3534A' : '#005ec5',
            // opacity: touched && error ? 1 : 0.56,
          },
        ]}>
        {placeholder && placeholder}
      </Text>
      <View style={[styles.rowDate]}>
        <Text allowFontScaling={false} style={styles.textDate}>
          {selectedDate===""?'DD/MM/YYYY':moment(new Date(selectedDate)).format('DD/MM/YYYY')}
        </Text>
        <Image style={[styles.icCalendar]} source={R.images.CALENDAR} />
      </View>
      <DateTimePicker
          date={selectedDate ?  new Date(selectedDate) : new Date(1960, 5, 5) }
        maximumDate={new Date()}
        minimumDate={new Date(1960, 5, 5)}
        isVisible={isShowDate}
        onConfirm={_handleDatePicked}
        onCancel={_hideDateTimePicker}
      />

      {touched && error ? (
        <View style={[styles.lineError]} />
      ) : (
        <View style={[styles.line]} />
      )}
    </Button>
  );
};
const styles = StyleSheet.create({
  wrapInput: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    paddingHorizontal: 0,
    borderRadius: 0,
    paddingVertical: 18,
    backgroundColor: 'transparent',
  },
  textDate: {
    //fontFamily: R.fonts.HELVETICA_MEDIUM,
    fontSize: FONT_16,
    fontWeight: '500',
    fontStyle: 'normal',
    color: '#323643',
  },
  rowDate: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icCalendar: {
    resizeMode: 'contain',
    width: 25,
    height: 25
  },
  labelStyle: {
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
    //fontFamily: R.fonts.HELVETICA_REGULAR,
    textAlign: 'left',
    marginBottom: 35,
    top: 18,
    color: '#333333',
    fontSize: FONT_18,
    fontWeight: 'bold',
    zIndex: -1,
  },
  textError: {
    color: '#F3534A',
    //sfontFamily: R.fonts.HELVETICA_REGULAR,
    fontSize: FONT_14,
    position: 'absolute',
    bottom: -19,
    width: '100%',
    textAlign: 'right',
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#a4a4ac',
    marginTop: 5,
  },
  lineError: {
    width: '100%',
    height: 1,
    backgroundColor: '#F3534A',
    marginTop: 5,
  },
});
