import React from 'react'
import { StyleSheet } from 'react-native'
import { IconTypes } from '../../../../../../assets/icon';
import { Button, Icon, Text } from '../../../../../../library/components'
import { typography, FONT_14 } from '../../../../../../themes';
const styles = StyleSheet.create({
    wrap: {
        paddingVertical: 10,
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingTop: 15,
        paddingBottom: 15
    },
    text: {
        color: '#565656',
        fontFamily: typography.helveticaNeue_regular,
        fontSize: FONT_14,
        paddingLeft: 10,
        paddingRight: 10,
        textAlign: 'left',
        flex: 1,
    },
    icon: {
        tintColor: '#565656'
    }
})

interface ButtonRowProps {
    onPress: () => void;
    tx: string,
    txOption?:any;
    icon: IconTypes;
}

export const ButtonRow = ({ icon, onPress, tx,txOption }: ButtonRowProps) => {
    return (
        <>
            <Button style={styles.wrap} preset={'link'} onPress={onPress}>
                <Icon icon={icon} style={{width: 20,height: 20}}/>
                <Text numberOfLines={1} txOptions={txOption} style={styles.text} tx={tx} />
                <Icon style={styles.icon} icon={'chevron_right'} />
            </Button>
        </>
    )
}