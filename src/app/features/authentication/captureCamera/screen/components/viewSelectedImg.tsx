import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, Button } from '../../../../../library/components'

const styles = StyleSheet.create({
    wrap: {
        marginTop: 25,
        flexDirection: 'row',
        backgroundColor:'gray',
        height: 40,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center'
    }
})


interface ViewSelectedImgProps {
    text: string;
    onPress: () => void;
}

export const ViewSelectedImg = ({ text, onPress }: ViewSelectedImgProps) => {
    return (
        <Button preset={'link'} onPress={onPress} style={styles.wrap}>
            <Text tx={'main:captureImage:captureImage'} txOptions={{ count: text }} />
        </Button>
    )
}
