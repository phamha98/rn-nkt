import React from 'react'
import { StyleSheet } from 'react-native'
import { Button, Icon, Text } from '../../../../../library/components';
import { IconTypes } from '../../../../../assets/icon';
import { FONT_12, typography } from '../../../../../themes';
const styles = StyleSheet.create({
    wrap: {
        flexDirection: 'column',
        flex: 1,
        backgroundColor: '#ffffff',
        borderRadius: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: FONT_12,
        fontFamily: typography.helveticaNeue_regular,
        color: '#6F6F6F',
        letterSpacing: 0.3,
        marginTop: 2
    },
    icon: {
        tintColor: 'rgba(0,190,212,1)'
    }
})
interface ButtonTopProps {
    onPress: () => void;
    tx: string;
    icon: IconTypes
}
export const ButtonTop = ({ icon, onPress, tx }: ButtonTopProps) => {
    return (
        <Button style={styles.wrap} preset={'link'} onPress={onPress}>
            <Icon style={styles.icon} icon={icon} />
            <Text style={styles.text} tx={tx} />
        </Button>
    )
}
