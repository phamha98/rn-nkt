import React from 'react'
import { StyleSheet } from 'react-native'
import { Button, Text } from '../../../../../library/components'
import { FONT_14, typography } from '../../../../../themes'
const styles = StyleSheet.create({
    wrap: {
        flex: 1,
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingHorizontal: 10,
        borderBottomWidth: 2,
        borderBottomColor: '#DCDCDC',
        marginHorizontal: 0.3,
        borderRadius: 0,

    },
    wrapActive: {
        flex: 1,
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingHorizontal: 10,
        borderBottomWidth: 2,
        borderBottomColor: 'rgba(0,190,212,1)',
        marginHorizontal: 0.3,
        borderRadius: 0,
    },
    text: {
        color: '#565656',
        fontSize: FONT_14,
        fontFamily: typography.helveticaNeue_regular,
        textAlign:'center',
        width:'100%',
    },
    textActive: {
        color: '#171717',
        fontSize: FONT_14,
        fontFamily: typography.helveticaNeue_bold,
        fontWeight: 'bold',
        textAlign:'center',
        width:'100%',
    }
})

interface ButtonTabProps {
    tx: string;
    isActive: boolean;
    value: number;
    onPress: (value: number) => void
}
export const ButtonTab = ({ tx, isActive, onPress, value }: ButtonTabProps) => {
    const _onPress = () => {
        onPress && value && onPress(value)
    }
    return (
        <Button activeOpacity={0.7} onPress={_onPress} style={[isActive ? styles.wrapActive : styles.wrap]} preset={'link'}>
            <Text style={[isActive ? styles.textActive : styles.text]} tx={tx} />
        </Button>
    )
}
