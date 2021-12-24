import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Button, ImageRemote, Text } from '../../../../../../../library/components'
import { FONT_12, typography, FONT_16, FONT_18 } from '../../../../../../../themes'
import {Divider } from '../../../../../../../library/components'
const styles = StyleSheet.create({
    wrap: {
        width: '100%',
        borderWidth: 5,
        borderColor: 'transparent',
    },
    buttonAddress: {
        flex: 1,
        paddingBottom:5,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#3D3D3D',
        fontSize: FONT_18,
        height: FONT_12 * 2 + 6,
        fontFamily: typography.helveticaNeue_regular,
        marginTop: 5,
        textAlign: 'center',
        paddingHorizontal: 5
    }
})

interface ItemProps {
    id: number;
    guid: string;
    title:  string;
    description:  string;
    note:  string;
    category: number;
    isdel: boolean,
    category_title:  string;
    imageurl:  string;
}

interface ButtonItemProps {
    onPress: (item: ItemProps) => void;
    isActive: boolean;
    item: ItemProps;
}

export const ButtonItem = ({ isActive, onPress, item }: ButtonItemProps) => {
    const _onPress = () => {
        onPress && item && onPress(item)
    }
    return (
        <View style={[styles.wrap]}>
            <Button onPress={_onPress} style={styles.buttonAddress} preset={'link'}>
                {/* <ImageRemote source={item.imageurl} /> */}
                <Text numberOfLines={1} style={[styles.text]} text={item.title && item.title} />
            </Button>
            <Divider color={'#DCDCDC'} />

        </View>
    )
}
