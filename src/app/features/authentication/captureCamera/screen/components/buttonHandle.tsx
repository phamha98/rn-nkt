import React from 'react'
import { StyleSheet, View, Image, ImageSourcePropType } from 'react-native'
import { Button, Icon } from '../../../../../library/components'
import { IconTypes } from '../../../../../assets/icon'

export const IMG_SIZE = 60;

const styles = StyleSheet.create({
    wrap: {
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    wrapImg: {
        height: IMG_SIZE,
        width: IMG_SIZE,
        borderRadius: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff'
    },
    img: {
        resizeMode: 'cover',
        width:'100%',
        height:'100%'
    },
    icon: {
        transform: [{ scale: 1.6 }]
    }
})

interface ButtonHandleProps {
    onPress: () => void;
    icon?: IconTypes;
    source?: ImageSourcePropType;
}

export const ButtonHandle = ({ onPress, icon, source }: ButtonHandleProps) => {
    return (
        <Button onPress={onPress} style={styles.wrap} preset={'link'} activeOpacity={0.7}>
            {
                icon ? <Icon style={styles.icon} icon={icon} /> : <View style={styles.wrapImg}><Image style={styles.img} source={source} /></View>
            }
        </Button>
    )
}
