
import React from 'react'
import { StyleSheet } from 'react-native'
import { WrappedFieldInputProps } from 'redux-form'
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
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'row',

    },
    text: {
        fontSize: FONT_14,
        paddingVertical: 2,
        fontFamily: typography.helveticaNeue_regular,
        color: '#3d3d3d'
    },
})

interface RadioProps {
    input: WrappedFieldInputProps;
    onPress: (value: number) => void;
    selected: boolean;
    tx: string;
    valueRadio: number;
    styleContainer: ViewPropTypes
}
export const Radio: React.FC<RadioProps> = (props) => {
    const { tx, onPress, selected, valueRadio, styleContainer, input: { onChange } } = props;
    const _onPress = () => {
        onPress && valueRadio && onPress(valueRadio);
        onChange(valueRadio);
    }
    // useEffect(() => {
        // onChange(valueRadio);
    // }, [valueRadio])
    return (
        <Button
            activeOpacity={0.7}
            style={[
                styles.wrap,
                styleContainer
            ]}
            onPress={() => {
                _onPress(valueRadio);
            }} preset={'link'}>
            <Icon type={'Ionicons'} icon={selected ? IoniconsFont.radioButtonOnOutline : IoniconsFont.radioButtonOffOutline} />
            <Text style={styles.text} tx={tx} />
        </Button>
    )
}
