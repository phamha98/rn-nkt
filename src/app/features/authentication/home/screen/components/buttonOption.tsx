import React from 'react'
import { StyleSheet } from 'react-native'
import { Button, Img, Text } from '../../../../../library/components'
import { ImageTypes } from '../../../../../assets/image'
import { RadioButton } from './radioButton'
import { FONT_14, typography } from '../../../../../themes'
const styles = StyleSheet.create({
    wrap: {
        paddingVertical: 5,
        paddingHorizontal: 5,
        justifyContent:'center',
        alignItems:'center',
        flex: 1,
    },
    text: {
        fontSize: FONT_14,
        paddingVertical:10,
        fontFamily: typography.helveticaNeue_regular,
        color: '#3d3d3d'
    },
})

interface ButtonOptionProps {
    onPress: (value: number) => void;
    selected: boolean;
    source: ImageTypes;
    tx: string;
    value: number;
}
export const ButtonOption = ({ tx, source, onPress, selected, value }: ButtonOptionProps) => {
    const _onPress = () => {
        onPress && value && onPress(value);
    }
    return (
        <Button activeOpacity={0.7} style={styles.wrap} onPress={_onPress} preset={'link'}>
            <Img source={source} />
            <Text style={styles.text} numberOfLines={1} tx={tx} />
            <RadioButton isActive={selected} />
        </Button>
    )
}
