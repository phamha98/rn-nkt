import React from 'react'
import { View, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    wrap: {
        height: 18,
        width: 18,
        borderRadius: 9,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.7,
        borderColor: '#000000'
    },
    dot: {
        height: 8,
        width: 8,
        borderRadius: 4,
        alignSelf: 'center',
        backgroundColor: '#000000'
    }
})


interface RadioButtonProps {
    isActive: boolean;
}

export const RadioButton = ({ isActive }: RadioButtonProps) => {
    return (
        <View style={styles.wrap}>
            {isActive && <View style={styles.dot} />}
        </View>
    )
}