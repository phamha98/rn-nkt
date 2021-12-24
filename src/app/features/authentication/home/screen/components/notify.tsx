import React, { useMemo } from 'react'
import { StyleSheet } from 'react-native'
import { FONT_12, typography } from '../../../../../themes'
import { TouchableOpacity } from 'react-native-gesture-handler'
import HTML from 'react-native-render-html';
const styles = StyleSheet.create({
    marginV8: {
        marginVertical: 8,
    },
    wrapNotify: {
        borderRadius: 5,
        backgroundColor: '#FAF5D7',
        marginBottom: 10,
        paddingVertical: 12,
        paddingHorizontal: 12,
    },
    textNotify: {
        textAlign: 'left',
        flexWrap: 'wrap',
        fontSize: FONT_12,
        fontFamily: typography.helveticaNeue_regular,
        color: '#3D3D3D',
        letterSpacing: 0.32,
    },
    marginH8: {
        marginHorizontal: 8,
    },
})

interface NotifyProps {
    data: any;
    onPress: any
}

export const Notify = ({ data, onPress }: NotifyProps) => {
    const onPressNotify = () => {
        onPress && onPress(data)
    }
    return useMemo(() => {
        return (
            <TouchableOpacity onPress={onPressNotify} style={[styles.wrapNotify, styles.marginH8]}>
                {/* <Text
                    style={styles.textNotify}
                    tx={data.Body}
                /> */}
                <HTML html={data.Body} agsStyles={styles.textNotify}/>
            </TouchableOpacity>
        )
    }, [])
}
