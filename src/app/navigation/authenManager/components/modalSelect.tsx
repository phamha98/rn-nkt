import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import {typography, FONT_12, FONT_14} from '../../../themes';
import {ButtonOption} from './buttonOption';
import {ButtonNext} from './buttonNext';
import {Text} from '../../../library/components';

const styles = StyleSheet.create({
  wrap: {
    width: '25%',
    borderWidth: 5,
    borderColor: 'transparent',
  },
  wrapButtonRender: {
    flexDirection: 'row',
  },
  wrapContent: {
    backgroundColor: '#ffffff',
    width: '100%',
    marginBottom: -20,
    alignSelf: 'flex-end',
    paddingVertical: 15,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  paddingV10: {
    paddingVertical: 10,
  },
  paddingH3: {
    paddingHorizontal: 3,
  },
  modal: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    justifyContent: 'flex-end',
  },
  text: {
    color: '#3D3D3D',
    letterSpacing: 0.32,
    fontSize: FONT_12,
    height: FONT_12 * 2 + 6,
    fontFamily: typography.helveticaNeue_regular,
    marginTop: 5,
    textAlign: 'center',
    paddingHorizontal: 5,
  },
  title: {
    color: '#3D3D3D',
    fontFamily: typography.helveticaNeue_bold,
    fontWeight: 'bold',
    fontSize: FONT_14,
    textAlign: 'center',
    marginBottom: 10,
  },
});

interface ModalSelectProps {
  visible: boolean;
  onPressNext: (value: number) => void;
  onHideModal: () => void;
}
export const ModalSelect = ({
  visible,
  onPressNext,
  onHideModal,
}: ModalSelectProps) => {
  const [isVisible, setVisible] = useState(false);
  const [selected, setSelected] = useState(1);
  const onShowModal = () => {
    setSelected(1);
  };
  const onClickButton = (value: number) => {
    setSelected(value);
  };
  const onNextPress = ()=>{
    onPressNext && onPressNext(selected)
  }
  const onModalHide = () => {
    setSelected(-1);
  };
  useEffect(() => {
    setVisible(visible);
  }, [visible]);
  return (
    <Modal
      propagateSwipe={true}
      style={[styles.modal]}
      isVisible={isVisible}
      onModalHide={onModalHide}
      onModalWillShow={onShowModal}
      useNativeDriver={true}
      backdropOpacity={0.6}
      hideModalContentWhileAnimating={true}
      onSwipeComplete={onHideModal}
      onBackButtonPress={onHideModal}
      onBackdropPress={onHideModal}>
      <View style={styles.wrapContent}>
        <Text style={styles.title} tx={'main:home:tvSelect'} />
        <View style={styles.wrapButtonRender}>
          <ButtonOption
            source={'personal'}
            selected={selected === 1}
            onPress={onClickButton}
            value={1}
            tx={'main:home:tvPersonal'}
          />
          <ButtonOption
            source={'business'}
            selected={selected === 2}
            onPress={onClickButton}
            value={2}
            tx={'main:home:tvBusiness'}
          />
        </View>
        <ButtonNext onPress={onNextPress}/>
      </View>
    </Modal>
  );
};
