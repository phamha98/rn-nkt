import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Button, Icon, Text } from '../../../../../../../library/components';
import { typography, FONT_14, FONT_12, FONT_13 } from '../../../../../../../themes';
const styles = StyleSheet.create({
    wrap: {
        flexDirection: 'row',
        paddingHorizontal: 5,
        backgroundColor: '#ffffff',
        borderRadius: 0,
        borderBottomWidth: 0.5,
        borderBottomColor: '#DCDCDC',
        paddingVertical: 8,
    },
    text: {
        flex: 1,
        textAlign: 'left',
        paddingRight: 5,
        color: '#171717',
        fontFamily: typography.helveticaNeue_regular,
        fontSize: FONT_13,
    }
})


interface ButtonSelectProps {
    text: string;
    onPress: () => void;
}

export const ButtonSelect = ({ text, onPress }: ButtonSelectProps) => {
    return (
        <Button style={styles.wrap} onPress={onPress}>
            <Text numberOfLines={1} style={styles.text}>{text}</Text>
            <Icon icon={'drop_line'} />
        </Button>
    )
}
