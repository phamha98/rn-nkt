import React, { useState } from 'react'
import { View, StyleSheet, Platform } from 'react-native'
import { Button, Icon, Text } from '../../../../../library/components'
import { FONT_12, typography } from '../../../../../themes'
import Modal from 'react-native-modal'
import { ButtonCreate } from './buttonCreate'
import { FlatList } from 'react-native-gesture-handler'
import Animated from 'react-native-reanimated'
import { useValues,spring,timing,delay } from 'react-native-redash'
const {set,useCode} = Animated;
const styles = StyleSheet.create({
    wrap: {
        width: '25%',
        borderWidth: 5,
        borderColor: 'transparent',
    },
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


interface ButtonMoreProps {
    onPress: (value: number) => void;
    listNotaryService: Array<any>;
    param: any;
}
export const ButtonMore = ({ onPress, listNotaryService, param }: ButtonMoreProps) => {
    const [visible, setVisible] = useState(false)
    const onShowModal = () => {
        setVisible(true);
    }
    const onHideModal = () => {
        setVisible(false);
    }
    const onClickButton = (item: any) => {
        setVisible(false);
        setTimeout(() => {
            onPress && onPress(item.id);
        }, 350);

    }
    const _renderItem = ({ item, index }: { item: any, index: number }) => {
        return <ButtonCreate isActive={false} item={item} onPress={onClickButton} />
    }
    const _keyExtractor = (item: any, index: number): string => item.id ? item.id.toString() : index.toString();
    const [scale,opacity] = useValues([0,0],[])
    const _onPress = () => {
        onPress && item && onPress(item)
    }
    useCode(()=>[
       delay(set(scale,spring({from:0.6,to:1,config:{damping:7}})),12*12) 
    ],[])
    useCode(()=>[
        delay(set(opacity,timing({from:0,to:1,duration:1000})),12*12) 
     ],[])
    return (
        <View style={[styles.wrap]}>
            <Modal propagateSwipe={true}
                swipeDirection={['up']}
                style={[styles.modal]}
                isVisible={visible}
                useNativeDriver={true}
                backdropOpacity={0.6}
                onSwipeComplete={onHideModal}
                onBackButtonPress={onHideModal}
                onBackdropPress={onHideModal}>
                 <FlatList numColumns={4} style={[styles.wrapContent]}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                data={listNotaryService}
                renderItem={_renderItem}
                keyExtractor={_keyExtractor}
                contentContainerStyle={[styles.paddingV10, styles.paddingH3]} />
            </Modal>
            <Animated.View style={[{transform:[{scale}],opacity}]}>
            <Button onPress={onShowModal} style={[styles.button]} preset={'link'}>
                <Icon icon={'more_horizontal'} />
                <Text numberOfLines={2} style={[styles.text]} tx={'main:home:tvMore'} />
            </Button>
            </Animated.View>
        </View>
    )
}
