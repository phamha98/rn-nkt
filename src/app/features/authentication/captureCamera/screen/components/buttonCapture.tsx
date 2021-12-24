import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Button } from '../../../../../library/components'

const SIZE_BUTTON = 70

const styles = StyleSheet.create({
    wrap: {
        width: SIZE_BUTTON,
        height: SIZE_BUTTON,
        borderRadius: SIZE_BUTTON / 2,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        borderWidth:5,
        borderColor:'#ffffff',
        alignItems: 'center',
        alignSelf: 'center',
        paddingHorizontal: 5,
        paddingVertical: 5
    },
    viewInside: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        width: SIZE_BUTTON - 10,
        height: SIZE_BUTTON - 10,
        borderRadius: (SIZE_BUTTON - 10) / 2,
        justifyContent:'center',
        alignItems:'center'
    },
    viewButton: {
        width: SIZE_BUTTON - 12,
        height: SIZE_BUTTON - 12,
        borderRadius: (SIZE_BUTTON - 12) / 2,
        backgroundColor: '#ffffff'
    }
})
interface ButtonCaptureProps {
    onPress: () => void;
}
export const ButtonCapture = ({ onPress }: ButtonCaptureProps) => {
    return (
        <View style={styles.wrap}>

            <View style={styles.viewInside} >
                <Button onPress={onPress} preset={'link'}>
                    <View style={styles.viewButton} />
                </Button>
            </View>

        </View>
    )
}
