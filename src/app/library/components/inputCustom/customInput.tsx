import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { TextField } from '../../../library/components'
import { FONT_12,FONT_18,FONT_16 ,typography, FONT_14 } from '../../../themes'
import { WrappedFieldInputProps, WrappedFieldMetaProps } from 'redux-form';
const styles = StyleSheet.create({
    label: {
        color: '#565656',
        fontSize: FONT_12,
        fontFamily: typography.helveticaNeue_regular,
        letterSpacing: 0.32,
        paddingBottom: 10,
        fontWeight:'bold'
    },
    input: {
        color: '#333333',
        fontSize: FONT_14,
        fontFamily: typography.helveticaNeue_regular,
        letterSpacing: 0.32,
        paddingLeft: 10,
        backgroundColor: '#ffffff',
        borderBottomColor: '#DCDCDC',
        borderBottomWidth: 0.5,
    },
    inputError:{
        color: '#333333',
        fontSize: FONT_14,
        fontFamily: typography.helveticaNeue_regular,
        letterSpacing: 0.32,
        paddingLeft: 10,
        backgroundColor: '#ffffff',
        borderBottomColor: '#BA1B24',
        borderBottomWidth: 1,
    }
})


interface CustomInputProps {
    titleTx: string;
    isPhone:boolean;
    editable: boolean;
    placeHolder: string;
    defaultValue?: string;
    input: WrappedFieldInputProps;
    meta: WrappedFieldMetaProps;
    maxLength: any;
}

export const CustomInput = ({ titleTx, placeHolder, defaultValue,isPhone,maxLength,editable,
    input: { onChange,value, ...restInput },
    meta: { touched, error } }: CustomInputProps) => {
const _onChangeText = (text:string) =>{
    onChange(text)
}
    useEffect(() => {
        if (defaultValue) {
            onChange(defaultValue)
        }
    }, [defaultValue])

    return (
    <TextField
      keyboardType={isPhone === true ? 'phone-pad' : 'default'}
      value={defaultValue}
      onChangeText={_onChangeText}
      labelStyle={styles.label}
      inputStyle={touched && error ? styles.inputError : styles.input}
      placeholderTextColor={'#8C8C8C'}
      labelTx={titleTx}
      placeholder={placeHolder}
      useTitle={true}
      maxLength={maxLength}
      editable={editable}
    />
    )
}
