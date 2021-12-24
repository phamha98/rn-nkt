import React, { useState, useRef, useEffect } from 'react'
import Animated, { Extrapolate } from 'react-native-reanimated';
import { timing, useValues, spring } from 'react-native-redash';
import { View, StyleSheet, Dimensions, Keyboard } from 'react-native'
import { Button, Icon, Text, TextField } from '../../../../../library/components'
import { FONT_14, typography } from '../../../../../themes';
const { width } = Dimensions.get('window');
const { interpolate, set } = Animated;
import { SEARCH_DVCC} from '../../../../../navigation/screenTypes';
import { navigate } from '../../../../../navigation/navigationService';
interface ButtonSearchProps {
    onToggle: (value:boolean) => void;
    onChange: (value: string) => void;
    onSearch:boolean;
}
export const ButtonSearch = ({ onToggle,onSearch}: ButtonSearchProps) => {
    const [ scale] = useValues([0, 0], []);
    const onToggleSearch = () => {
        navigate(SEARCH_DVCC)
        // onToggle && onToggle(true);
    }
    Animated.useCode(() => [
        set(scale, spring({  from: 0,to: 1, config: { damping: 1100 } }))
    ], [])
    return (
        <Animated.View style={[styles.wrap, { transform: [{ scale }] }]}>
            <View >
                <Button onPress={onToggleSearch} style={[styles.button]} preset='link'>
                    <Text style={styles.text} tx={'main:home:tvSearch'} />
                    <Icon icon={'search'} />
                </Button>
            </View>
        </Animated.View>
    )
}
const styles = StyleSheet.create({
    icon: {
        tintColor: '#ffffff',
        resizeMode: 'contain',
    },
    wrap: {
        flexDirection: 'row'
    },
    button: {
        flexDirection: 'row'
    },
    row: {
        flexDirection: 'row'
    },
    text: {
        fontSize: FONT_14,
        fontFamily: typography.helveticaNeue_regular,
        paddingRight: 7,
    },
    wrapInput: {
        paddingVertical: 0,
        flex: 1
    },
    animInput: {
        position: 'absolute',
        zIndex: 1,
        bottom: 0,
        overflow: 'hidden',
        right: 0,
        paddingVertical: 5,
        minHeight: FONT_14 + 2,
        backgroundColor: 'rgba(255,255,255,.3)',

    },
    input: {
        fontSize: FONT_14,
        paddingVertical: 0,
        fontFamily: typography.helveticaNeue_regular,
        padding: 0,
        paddingLeft: 5,
        flex: 1,
        backgroundColor: 'red',
        minHeight: FONT_14 + 2
    }
})
