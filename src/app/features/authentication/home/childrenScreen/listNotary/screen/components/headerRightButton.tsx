import React from 'react'
import { StyleSheet } from 'react-native'
import { Button, Icon } from '../../../../../../../library/components'
import { IconTypes } from '../../../../../../../assets/icon'

const styles = StyleSheet.create({
    wrap: {
        paddingVertical: 0,
        paddingHorizontal: 5
    },
    icon: {
        tintColor: '#ffffff'
    }
})


interface HeaderRightButtonProps {
    onPress: () => void;
    icon: IconTypes;
}

export const HeaderRightButton = ({ onPress, icon }: HeaderRightButtonProps) => {
    return (
        <Button style={styles.wrap} preset={'link'} onPress={onPress}>
            <Icon style={styles.icon} icon={icon} />
        </Button>
    )
}

