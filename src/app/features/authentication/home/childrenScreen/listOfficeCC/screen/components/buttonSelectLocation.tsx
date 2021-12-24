import React from 'react'
import { StyleSheet } from 'react-native'
import { Button, Icon, Text } from '../../../../../../../library/components';
import { FONT_14, typography } from '../../../../../../../themes';

const styles = StyleSheet.create({
    wrap: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        width: 40,
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    text: {
        color: '#3D3D3D',
        fontSize: FONT_14,
        fontFamily: typography.helveticaNeue_regular,
        textAlign: 'left',
        flex: 1,
        paddingHorizontal: 5,
    }
})


interface ButtonSelectLocationProps {
    text: string;
    onPress: () => void;
}

export const ButtonSelectLocation = ({ onPress, text }: ButtonSelectLocationProps) => {
    return (
        <Button activeOpacity={0.8} style={styles.wrap} onPress={onPress}>
            <Icon icon={'location_2'} />
            {/*<Text style={styles.text}>{text}</Text>*/}
            {/*<Icon icon={'drop_down'} />*/}
        </Button>
    )
}

