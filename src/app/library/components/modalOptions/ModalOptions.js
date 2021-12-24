import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import ViewCus from '../ViewCus/ViewCus';
import { Button, Text as TextCus, IoniconsFont } from '../index';
const Text = (props) => <TextCus {...props} style={[props.style, { color: 'black' }]} />

const styles = StyleSheet.create({
    buttonText: {
        backgroundColor: '#fff',
        alignItems: 'flex-start',
        borderTopWidth: 1,
        borderColor: "#ccc"
    },
    txtitle: {
        fontSize: 18,
        color: '#333',
        // marginLeft: 10,
        // marginTop: 10,
        paddingVertical: 10,
        fontWeight: '400',

    },
});
let ModalOptions = forwardRef((props, ref) => {
    const {
        options: optionsProps = []
    } = props;
    const refModal = useRef();
    const refData = useRef(null);
    const [options, setOptions] = useState(optionsProps)

    useImperativeHandle(
        ref,
        () => ({
            toggle
        }),
    )

    const toggle = (flag, data, options) => {
        refData.current = data;
        refModal.current?.toggle(flag);
        options != null && setOptions(options);
    }

    let callBackHiden = null;
    const onModalHide = () => {
        callBackHiden != null && setTimeout(() => {
            callBackHiden()
            callBackHiden = null;
        }, 100);
    }

    return (
        <ViewCus.Modal
            ref={refModal}
            onModalHide={onModalHide}
        >
            <ScrollView>
                {
                    options.map((e, index) => (
                        <Button
                            key={index}
                            style={[
                                styles.buttonText,
                                {
                                    borderTopWidth: index == 0 ? 0 : 1
                                }
                            ]}
                            onPress={() => (refModal.current.toggle(false), callBackHiden = () => e.onPress(refData.current, index))}
                        >
                            <ViewCus.ViewIcon
                                iconLeft={<ViewCus.Ionicons icon={IoniconsFont.chevronForward} />}
                                styleIconLeftContainer={{
                                }}
                            >
                                <Text
                                    style={styles.txtitle}
                                    numberOfLines={1}
                                >
                                    {e.label}
                                </Text>
                            </ViewCus.ViewIcon>
                        </Button>
                    ))
                }
            </ScrollView>
        </ViewCus.Modal>
    )
});
export {
    ModalOptions
}
export default ModalOptions
