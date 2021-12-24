import React from 'react'
import { StyleSheet, FlatList } from 'react-native'
import { useSelector } from 'react-redux'
import { FONT_12, typography } from '../../../../../../../themes'
import Modal from 'react-native-modal'
import { ButtonItem } from './buttonItem'
const styles = StyleSheet.create({
    wrapButtonRender: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    paddingV10: {
        paddingVertical: 10,
    },
    paddingH3: {
        paddingHorizontal: 3,
    },
    button: {
        flex: 1,
        borderRadius: 5,
        backgroundColor: '#ffffff',
        paddingVertical: 10,
        borderColor: '#DCDCDC',
        borderWidth: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    modal: {
        paddingHorizontal: 0,
        paddingVertical: 0,
        width: '100%',
        height: '100%',
        alignSelf: 'center',
        justifyContent: 'flex-end'
    },
    text: {
        color: '#3D3D3D',
        letterSpacing: 0.32,
        fontSize: FONT_12,
        height: FONT_12 * 2 + 6,
        fontFamily: typography.helveticaNeue_regular,
        marginTop: 5,
        textAlign: 'center',
        paddingHorizontal: 5
    },
    wrapContent: {
        backgroundColor: '#ffffff',
        width: '100%',
        marginBottom: -20,
        alignSelf: 'flex-end',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        maxHeight: 250
    }
})


interface ModalSelectProps {
    onPress: (value: any) => void;
    visible: boolean;
    onHideModal: () => void;
    selectItem: any;
    itemAddress: Array<any>,
    paramsDistrict:any,
    setParentid:any,
    setSelectNameCity:any
}
export const ModalSelectAddress = ({ onPress, onHideModal, visible, selectItem,itemAddress,paramsDistrict,setParentid,setSelectNameCity }: ModalSelectProps) => {
    const onClickButton = (item: any) => {
        onPress && onPress(item);
        setParentid(item.id)
        setSelectNameCity(item.title)
    }
    const _renderItem = ({ item, index }: { item: any, index: number }) => {
        return <ButtonItem item={item} onPress={onClickButton} />
    }
    const _keyExtractor = (item: any, index: number): string => item.id ? item.id.toString() : index.toString();
    return (
        
        <Modal propagateSwipe={true}
            style={[styles.modal]}
            isVisible={visible}
            useNativeDriver={true}
            backdropOpacity={0.6}
            hideModalContentWhileAnimating={true}
            onSwipeComplete={onHideModal}
            onBackButtonPress={onHideModal}
            onBackdropPress={onHideModal}>
            <FlatList style={[styles.wrapContent]}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                data={itemAddress}
                renderItem={_renderItem}
                keyExtractor={_keyExtractor}
                contentContainerStyle={[styles.paddingV10, styles.paddingH3]} />
        </Modal>
    )
}
