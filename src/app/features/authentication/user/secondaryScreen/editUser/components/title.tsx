import React from 'react'
import { View,StyleSheet } from 'react-native'
import { Text } from '../../../../../../library/components'
import { FONT_14,FONT_16, typography } from '../../../../../../themes'

const styles = StyleSheet.create({
    title:{
        color:'#3D3D3D',
        fontSize:FONT_16,
        fontFamily:typography.helveticaNeue_bold,
        letterSpacing:0.16,
        fontWeight:'bold',
        paddingTop:15,
        paddingBottom:15,
        textAlign:'center',
    }
})


interface TitleProps{
textTx:string
}

export const Title = ({textTx}:TitleProps) => {
    return (
        <View>
            <Text style={styles.title} tx={textTx}/>
        </View>
    )
}

