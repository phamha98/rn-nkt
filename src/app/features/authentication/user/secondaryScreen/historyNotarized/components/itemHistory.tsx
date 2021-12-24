import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Divider, Button, ImageRemote, Text, Icon } from '../../../../../../library/components'
import { FONT_14, FONT_12, typography } from '../../../../../../themes'

const styles = StyleSheet.create({
    wrap: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        borderRadius: 0,
        paddingVertical: 5,
    },
    wrapTime: {
        paddingHorizontal: 15,
        overflow: 'visible',
        marginTop: 10,
        alignSelf: 'flex-end',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    textTime: {
        fontSize: FONT_12,
        fontStyle: 'italic',
        fontFamily: typography.helveticaNeue_regular,
        color: '#565656',
    },
    content: {
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    textNameActive: {
        fontSize: FONT_14,
        paddingVertical: 5,
        fontFamily: typography.helveticaNeue_bold,
        fontWeight: 'bold',
        color: '#565656',
    },
    textName: {
        fontSize: FONT_14,
        paddingVertical: 5,
        color: '#565656',
    },
    textMsg: {
        fontSize: FONT_12,
        fontStyle: 'italic',
        fontFamily: typography.helveticaNeue_regular,
        color: '#565656',
    },
    icon: {
        tintColor: 'rgba(0,0,0,.3)'
    }
})

interface ItemActiveProps {
    txTime: string;
    textName: string;
    textMsg: string;
}

export const ItemHistory = ({ txTime, textMsg, textName }: ItemActiveProps) => {
    const random = getRandomInt(2);
    return (
        <>
            <Button style={styles.wrap}>
                <Icon icon={'clock'} />
                <View style={styles.content}>
                    <Text style={styles.textName} numberOfLines={2} text={textName} />
                    <Text style={styles.textMsg} numberOfLines={1} text={textMsg} />
                </View>
                <View style={styles.wrapTime}>
                    <Text style={styles.textTime} numberOfLines={1} tx={txTime} />
                </View>
                <Icon style={styles.icon} icon={'chevron_right'} />
            </Button>
            <Divider />
        </>
    )
}
function getRandomInt(max: number) {
    return Math.floor(Math.random() * Math.floor(max));
}
