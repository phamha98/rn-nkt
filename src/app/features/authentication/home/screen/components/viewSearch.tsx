import React, { useState, useEffect,useRef } from 'react'
import { View, StyleSheet, Keyboard, Dimensions } from 'react-native'
import { TextField, Button, Icon } from '../../../../../library/components'
import { useSafeArea } from 'react-native-safe-area-context'
import { FONT_14, typography } from '../../../../../themes'
import Animated from 'react-native-reanimated';
import { timing, useValues } from 'react-native-redash'

const { useCode, set, interpolate } = Animated;
const { width } = Dimensions.get('window')
const styles = StyleSheet.create({
    wrap: {
        width: width - 32,
        height: 40,
        alignSelf: 'center',
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        position: 'absolute',
        overflow: 'hidden',
    },
    containerInput: {
        backgroundColor: 'transparent',
        paddingVertical: 0,
        paddingHorizontal: 0,
        flex: 1,
    },
    input: {
        fontSize: FONT_14,
        paddingVertical: 0,
        fontFamily: typography.helveticaNeue_regular,
        padding: 0,
        paddingLeft: 5,
        paddingRight: 5,
        flex: 1,
        backgroundColor: 'transparent',
        minHeight: FONT_14 + 2
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,.3)',
    },
    icon: {
        tintColor: '#ffffff',
        resizeMode: 'contain',
    }
})
interface ViewSearchProps {
    onSearch: boolean;
    toggle: () => void;
    onChange:(value:string)=>void
}
export const ViewSearch = ({ onSearch, toggle,onChange }: ViewSearchProps) => {
    const _input = useRef(null)
    const [isShow, setIsShow] = useState(onSearch)
    const [value, setValue] = useState('')
    const inset = useSafeArea();
    const [widthX] = useValues([0], [])
    const _onChangeText = (text:any) =>{
        setValue(text)
        onChange && onChange(text);
    }
    useCode(() => [set(widthX, timing({ from: isShow === true ? 0 : width - 32, to: isShow === true ? width - 32 : 0, duration: 100 }))], [isShow])
    // useEffect(() => {
    //     setIsShow(onSearch)
    //     setValue('')
    //     if(!onSearch){
    //         Keyboard.dismiss();
    //     }else{
    //         _input.current.focus();
    //     }
    // }, [onSearch])
    return (
        <View style={[styles.wrap]}>
            <View style={styles.row}>
                <TextField forwardedRef={_input} value={value} onChangeText={_onChangeText} placeholderTx={"main:home:tvPlaceholder"} selectionColor={'#ffffff'} inputStyle={styles.input} useTitle={false} style={styles.containerInput} />
                {/* <Button onPress={toggle} preset={'link'}>
                    <Icon style={styles.icon} icon={'close'} />
                </Button> */}
            </View>
        </View>
    )
}
