import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import ViewCus from '../ViewCus/ViewCus';
import { Button, Text as TextCus, IoniconsFont } from '../index';
const Text = (props) => <TextCus {...props} style={[props.style, { color: 'gray' }]} />

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
let ModalLoadPitch = forwardRef((props, ref) => {
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
                <View style={{ width: '100%', height: 60, alignItems: 'center', backgroundColor: 'transparent' }}>
                    <Text style={{fontSize: 16, fontWeight: '400',textAlign: 'center' }}>{'Đang ghi âm giọng nói để đăng nhập. Vui lòng nói'}</Text>
                    <Image
                        source={ require( '../../../assets/image/loadingPitch.gif' )}
                        style={{ width: 50, height: 40, position: 'absolute', bottom: 0 }}
                    />
                </View>
            </ScrollView>
        </ViewCus.Modal>
    )
});
export {
    ModalLoadPitch
}
export default ModalLoadPitch
