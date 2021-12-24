import React, { useEffect } from 'react';
import { Image, StyleSheet } from 'react-native';
const FIXED_WIDTH = 88;
const FIXED_HEIGHT = 124;
const styles = StyleSheet.create({
    wrap: {
        width: FIXED_WIDTH,
        height: FIXED_HEIGHT,
        backgroundColor: '#ffffff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
        marginRight: 5,
    },
    img: {
        flex: 1,
        resizeMode: 'cover'
    },
    wrapTick: {
        position: 'absolute',
        right: 3,
        top: 3,
        zIndex: 10
    }
})

interface ImageItemProps {
    uri: string;
}

export const ImageItem = (props: ImageItemProps) => {
    var { uri } = props;
    useEffect(() => {
        if (uri.constructor == String)
            if (props.input != null) {
                props.input.onChange(uri)
            }
    }, [uri])
    return (
        <Image
            resizeMode={'cover'}
            style={{
                width: FIXED_WIDTH,
                height: FIXED_HEIGHT
            }} source={uri.constructor == String ? { uri: uri } : uri}
        />
    )
}
