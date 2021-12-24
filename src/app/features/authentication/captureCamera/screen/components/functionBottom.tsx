import React, { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { useSafeArea } from 'react-native-safe-area-context'
import { ButtonHandle } from './buttonHandle'
import { ButtonCapture } from './buttonCapture'
import { IconTypes } from '../../../../../assets/icon'
const styles = StyleSheet.create({
    wrap: {
        backgroundColor: 'rgba(0,0,0,.2)',
        paddingVertical: 15,
        width: '100%',
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 1,
        paddingHorizontal: 10
    },
    flex1: {
        flex: 1
    },
    row: {
        flexDirection: 'row'
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    between: {
        justifyContent: 'space-between'
    }
})
interface FunctionBottomProps {
    onCapture: () => void;
    onViewLibrary: () => void;
    onSetFlashMode: (val: number) => void;
    onSetCamType: (isFront: boolean) => void;
    uriFirstImage?: string;
}
export const FunctionBottom = ({ onCapture, onViewLibrary, onSetCamType, onSetFlashMode, uriFirstImage }: FunctionBottomProps) => {
    const [typeFlash, setTypeFlash] = useState(0)
    const [isUseFront, setIsUseFront] = useState(true)
    const inset = useSafeArea()
    const onChangeFlash = () => {
        if (typeFlash < 2) {
            setTypeFlash(typeFlash + 1)
        } else {
            setTypeFlash(0)
        }
    }
    const onChangeCamPosition = () => {
        setIsUseFront(!isUseFront)
    }
    const convertToIconFlash = (): IconTypes => {
        switch (typeFlash) {
            case 0:
                return 'ic_flash_off'
            case 1:
                return 'ic_flash_auto'
            case 2:
                return 'ic_flash_on'
            default:
                return 'ic_flash_off'
        }
    }
    useEffect(() => {
        onSetFlashMode && onSetFlashMode(typeFlash)
    }, [typeFlash])
    useEffect(() => {
        onSetCamType && onSetCamType(isUseFront)
    }, [isUseFront])
    return (
        <View style={[styles.wrap, { bottom: inset.bottom }]}>
            <View style={[styles.flex1, styles.row, styles.between]}>
                <ButtonHandle source={uriFirstImage ? { uri: uriFirstImage } : null} onPress={onViewLibrary} />
                <ButtonHandle onPress={onChangeFlash} icon={convertToIconFlash()} />
            </View>
            <View style={[styles.flex1]}>
                <ButtonCapture onPress={onCapture} />
            </View>
            <View style={[styles.flex1]}>
                <ButtonHandle onPress={onChangeCamPosition} icon={'ic_rotate_cam'} />
            </View>
        </View>
    )
}
