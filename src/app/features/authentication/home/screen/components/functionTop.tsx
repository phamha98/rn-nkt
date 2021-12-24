import React, { useMemo } from 'react'
import { View, StyleSheet } from 'react-native'
import { ButtonTop } from './buttonTop'
const styles = StyleSheet.create({

    row: {
        flexDirection: 'row',
    },
    paddingV10: {
        paddingVertical: 10,
    },
    marginH8: {
        marginHorizontal: 8,
    },
    marginV8: {
        marginVertical: 8,
    },
})
interface FunctionTopProps {
    onPressLocation: () => void;
    onPressCC: () => void;
    onPressServiceCC: () => void;
}

export const FunctionTop = ({ onPressLocation, onPressCC, onPressServiceCC }: FunctionTopProps) => {
    return useMemo(() => {
        return (
            <View style={[styles.row, styles.paddingV10, styles.marginH8]}>
                <ButtonTop
                    onPress={onPressServiceCC}
                    tx={'main:home:tvServiceCC'}
                    icon={'dvcc'}
                />
                <ButtonTop
                    onPress={onPressLocation}
                    tx={'main:home:tvLocation'}
                    icon={'location'}
                />
                <ButtonTop
                    onPress={onPressCC}
                    tx={'main:home:tvUserCC'}
                    icon={'user_cc'}
                />

            </View>
        )
    }, [onPressLocation, onPressCC, onPressServiceCC])
}
