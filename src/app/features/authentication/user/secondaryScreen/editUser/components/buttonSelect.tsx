import React, { useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { Button, Text, Icon, ImageRemote } from '../../../../../../library/components'
import { typography, FONT_14 } from '../../../../../../themes'
import { WrappedFieldInputProps, WrappedFieldMetaProps } from 'redux-form';

const styles = StyleSheet.create({
    wrap: {
        flexDirection: 'row',
        paddingLeft: 10,
        backgroundColor: '#F3F3F3',
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#DCDCDC',
        borderRadius: 0,
        marginBottom: 10
    },
    border:{
        borderBottomWidth: 1,
        borderBottomColor: '#DCDCDC',
    },
    borderError:{
        borderBottomWidth: 1,
        borderBottomColor: '#BA1B24',
    },
    text: {
        paddingHorizontal: 5,
        paddingLeft: 10,
        fontFamily: typography.helveticaNeue_bold,
        fontWeight: 'bold',
        fontSize: FONT_14,
        flex: 1,
        color: '#565656'
    }
})

interface ButtonSelectProps {
    text: string;
    url: string;
    onPress: () => void;
    input: WrappedFieldInputProps;
    meta: WrappedFieldMetaProps;
}

export const ButtonSelect = ({ text, url, onPress, input: { onChange, value },
    meta: { touched, error } }: ButtonSelectProps) => {
    useEffect(() => {
        onChange(text)
    }, [text])
    return (
        <Button onPress={onPress} style={[styles.wrap,touched&&error && styles.borderError]} preset={'link'}>
            <ImageRemote source={url} />
            <Text style={styles.text} numberOfLines={1} text={text} />
            <Icon icon={'drop_down'} />
        </Button>
    )
}

