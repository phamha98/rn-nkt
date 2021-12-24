import React from 'react'
import { View, ViewStyle } from 'react-native'
import { DividerProps } from './divider.props'
import { mergeAll, flatten } from 'ramda';
const BASE: ViewStyle = {
    width:'100%'
}
export function Divider({ color = '#F3F3F3', height = 1, style: styleOverride }: DividerProps) {
    const decoration: ViewStyle = { height: height, backgroundColor: color }
    const viewStyle = mergeAll(flatten([styleOverride, BASE, decoration]));

    return (
        <View style={viewStyle} />
    )
}

