import React from 'react'
import { StyleSheet, View } from 'react-native'
import { color } from '../../../themes/color'
import { FONT_14 } from '../../../themes/fontSize'
import { typography } from '../../../themes/typography'
import { Button } from '../button/button'
import Icon from '../iconVector/index'
import IoniconsFont from '../iconVector/IoniconsFont'
import { Text } from '../text/text'
const styles = StyleSheet.create({
    wrap: {
        paddingVertical: 5,
        paddingHorizontal: 5,
        // justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    text: {
        fontSize: FONT_14,
        paddingVertical: 10,
        fontFamily: typography.helveticaNeue_regular,
        color: '#3d3d3d',
        flex: 1,
        flexWrap: 'wrap',
        flexShrink: 1
    },
})

interface CheckBoxProps {
    onPress: (value: number) => void;
    index: number;
    selected: number;
    tx: string;
    value: number;
    isNum: boolean,
    styleContainer: ViewPropTypes
}
export const Checkbox: React.FC<CheckBoxProps> = (props) => {
    const { tx, onPress, selected, index, value, styleContainer, isNum } = props;
    const _onPress = () => {
        var flag = !props.input.value;
        onPress && onPress(flag);
        props.input != null && props.input.onChange(isNum == true ? flag == true ? 1 : 0 : flag)
    }

    return (
        <Button
            activeOpacity={0.7}
            style={[
                styles.wrap,
                styleContainer
            ]}
            onPress={() => {
                _onPress(value);
            }} preset={'link'}>
            <View
                style={{
                    width: 30,
                }}
            >
                {
                    selected ? <Icon
                        type={'Ionicons'}
                        color={color.palette.black}
                        icon={selected == index ? IoniconsFont.checkboxOutline : IoniconsFont.squareOutline}
                    /> :
                        <Icon
                            type={'Ionicons'}
                            color={color.palette.black}
                            icon={props.input.value ? IoniconsFont.checkboxOutline : IoniconsFont.squareOutline}
                        />
                }

            </View>
            <Text style={styles.text} tx={tx} />
        </Button>
    )
}
