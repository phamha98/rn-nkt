import React, { useMemo } from 'react'
import { View, StyleSheet, Dimensions } from 'react-native';
import {Button, ImageRemote, Text} from '../../../../../library/components'
import Animated from 'react-native-reanimated'
import { useValues, spring, timing, delay } from 'react-native-redash'
import {FONT_12, typography} from "../../../../../themes";
const { set, useCode } = Animated;

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    wrapButton: {
        width: width / 2 - 16,
        height: (width / 2 - 16) * 0.75,
        borderRadius: 0,

    },
    wrap: {
        flex: 1,
        borderRadius: 0,
        backgroundColor: '#D8D8D8',
        paddingHorizontal: 0,
        paddingVertical: 0,
        overflow:'hidden'
    },
    img: {
        resizeMode: 'cover',

        width: '100%',
        height: '100%',
    },
    textCC: {
        color: '#3D3D3D',
        fontFamily: typography.helveticaNeue_regular,
        fontSize: FONT_12,
        letterSpacing: 0.16,
        paddingLeft: 3,
        paddingTop:4,
        height: 42,
    }
})

export interface ItemProps {
    id: number;
    guid: string;
    title: string;
    ownerName: string;
    phone: string;
    email: string;
    address: string;
    dateEdited: string;
    userEdited: number,
    dateCreated: string;
    userCreated: string;
    isDel: boolean;
    lat: number;
    lng: number;
    rate: number
    image: string;
}
interface ItemFlatProps {
    index: number;
    item: ItemProps;
    onPress: () => void;
}
export const ItemFlat = ({ onPress, item, index = 1 }: ItemFlatProps) => {
    const [scale, opacity] = useValues([0, 0], [])
    useCode(() => [
        delay(set(scale, spring({ from: 0.6, to: 1, config: { damping: 8 } })), index * 12)
    ], [])
    useCode(() => [
        delay(set(opacity, timing({ from: 0, to: 1, duration: 1000 })), index * 12)
    ], [])
    return useMemo(() => {
        return (
            <Animated.View style={[styles.wrapButton, { transform: [{ scale }], opacity }]}>
                <Button activeOpacity={0.6} onPress={onPress} style={[styles.wrap]}>
                    <ImageRemote style={[styles.img]} sourceDefault={'default_vpcc'} source={item.image} />
                </Button>
                <Text numberOfLines={2} style={styles.textCC} text={item.title && item.title} />
            </Animated.View>
        )
    }, [])
}
