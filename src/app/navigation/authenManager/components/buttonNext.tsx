import React from 'react'
import { StyleSheet } from 'react-native'
import { Button, Text } from '../../../library/components'
import { FONT_14, typography } from '../../../themes'

const styles = StyleSheet.create({
    wrap: {
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
        marginTop: 15,
        paddingVertical: 15,
        backgroundColor: 'rgba(0,190,212,1)'
    },
    text: {
        fontSize: FONT_14,
        fontFamily: typography.helveticaNeue_medium,
        color: '#FFFFFF',
        letterSpacing: 0.16,
    }
})


interface ButtonNextProps {
    onPress: () => void;
}

export const ButtonNext = ({ onPress }: ButtonNextProps) => {
    return (
        <Button onPress={onPress} activeOpacity={0.7} style={styles.wrap}>
            <Text style={styles.text} tx={'main:home:tvNext'} />
        </Button>
    )
}