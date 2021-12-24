import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Button, ImageRemote, Text } from '../../../../../library/components'
import { FONT_12, typography } from '../../../../../themes'
import Animated from 'react-native-reanimated'
import { useValues,spring,timing,delay } from 'react-native-redash'
const {set,useCode} = Animated;
const styles = StyleSheet.create({
    wrap: {
        width: '25%',
        borderWidth: 5,
        borderColor: 'transparent',
    },
    button: {
        flex: 1,
        borderRadius: 5,
        backgroundColor: '#ffffff',
        paddingVertical: 10,
        borderColor: '#DCDCDC',
        borderWidth: 0.5,
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
    buttonActive: {
        flex: 1,
        borderRadius: 5,
        backgroundColor: '#FAF5D7',
        paddingVertical: 10,
        borderColor: '#DCDCDC',
        borderWidth: 0.5,
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
        // letterSpacing: 0.32,
        fontSize: FONT_12,
        height: FONT_12 * 2 + 6,
        fontFamily: typography.helveticaNeue_regular,
        marginTop: 5,
        textAlign: 'center',
        paddingHorizontal: 5
    }
})

interface ItemProps {
    id: number;
    guid: string;
    title:  string;
    description:  string;
    note:  string;
    category: number;
    isdel: boolean,
    category_title:  string;
    imageurl:  string;
}

interface ButtonCreateProps {
    onPress: (item: ItemProps) => void;
    isActive: boolean;
    item: ItemProps;
    index:number;
}

export const ButtonCreate = ({ isActive, onPress, item,index=0 }: ButtonCreateProps) => {
    const [scale,opacity] = useValues([0,0],[])
    const _onPress = () => {
        onPress && item && onPress(item)
    }
    useCode(()=>[
       delay(set(scale,spring({from:0.6,to:1,config:{damping:8}})),index*12) 
    ],[])
    useCode(()=>[
        delay(set(opacity,timing({from:0,to:1,duration:1000})),index*12) 
     ],[])
    return (
        <Animated.View style={[styles.wrap,{transform:[{scale}],opacity}]}>
            <Button onPress={_onPress} style={[isActive ? styles.buttonActive : styles.button]} preset={'link'}>
                <ImageRemote source={item.imageurl} />
                <Text numberOfLines={2} style={[styles.text]} text={item.title && item.title} />
            </Button>
        </Animated.View>
    )
}
