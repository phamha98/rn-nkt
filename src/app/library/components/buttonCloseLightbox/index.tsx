import React from 'react'
import { StyleSheet } from 'react-native'
import { Button, Icon } from '../'
import { useSafeArea } from 'react-native-safe-area-context'
import { ButtonCloseProps } from './buttonClose.props'
const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 5,
        paddingVertical: 5
    },
    icon: {
        transform: [{ scale: 1.5 }],
        tintColor:'#FFFFFF'
    }
})

export const ButtonClose = ({ onPress }: ButtonCloseProps) => {
    const inset = useSafeArea()
    const _onPress = () => {
        onPress && onPress()
    }
    return (
        <Button preset={'link'} onPress={_onPress} style={[styles.button, { marginTop: inset.top + 5, marginLeft: inset.left + 15 }]}>
            <Icon style={styles.icon} icon={'close'} />
        </Button>
    )
}



