import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Modal,
  ActivityIndicator,
  Platform,
  Dimensions,
  StatusBar,
} from 'react-native';
import { ProcessProps } from './progress.props';
import { FONT_14 } from '../../../themes';
import ViewCus from '../ViewCus/ViewCus';
const { width, height } = Dimensions.get('window');
export const ProgressDialog = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState(null);
  useImperativeHandle(ref, () => ({
    toggle: (status: boolean, msg?: string) => {
      toggle(status, msg);
    },
  }));
  const toggle = (status: boolean, msg?: string) => {
    if (status) {
      if (msg) {
        setMessage(msg);
      } else {
        setVisible(true);
      }
    } else {
      setMessage(null);
      setVisible(false);
    }
  };
  useEffect(() => {
    if (message) {
      setVisible(true);
    }
  }, [message]);
  useEffect(() => {
    return () => {
      setMessage(null);
    };
  }, []);
  return visible ? (
    <View style={[styles.contentModal]}>
      <View
        style={[
          Platform.OS === 'android'
            ? styles.wrapDialogRow
            : styles.wrapDialogColumn,
        ]}>
        <ActivityIndicator
          color={Platform.OS === 'android' ? null : '#ffffff'}
        />
        <Text
          style={[
            Platform.OS === 'android' ? styles.textMsg : styles.textMsgIOS,
          ]}>
          {message ? message : 'Loading'}
        </Text>
      </View>
      {
        __DEV__ &&
        <ViewCus.Button
          onPress={() => setVisible(false)}
        >
          {'Hide'}
        </ViewCus.Button>
      }
    </View>
  ) : null;
});
const styles = StyleSheet.create({
  contentModal: {
    top: 0,
    position: 'absolute',
    width: '100%',
    height: '100%',
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0,0,0,.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textMsg: {
    color: '#333333',
    fontSize: FONT_14,
    marginLeft: 10,
    textAlign: 'center',
    fontStyle: 'normal',
    fontWeight: 'normal',
  },
  textMsgIOS: {
    color: '#FFFFFF',
    fontSize: FONT_14,
    paddingHorizontal: 0,
    alignSelf: 'center',
    paddingTop: 10,
    textAlign: 'center',
    fontStyle: 'normal',
    fontWeight: 'normal',
  },
  row: { flexDirection: 'row' },
  column: {
    flexDirection: 'column',
  },
  wrapDialogRow: {
    width: '100%',
    flexDirection: 'row',
    overflow: 'hidden',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
  },
  wrapDialogColumn: {
    paddingVertical: 20,
    paddingHorizontal: 35,
    overflow: 'hidden',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,.78)',
  },
});
