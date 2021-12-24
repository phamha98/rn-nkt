import { Alert } from 'react-native';
export default {
    Confirm: (callback, cancelPress, mess, title, textButtonCancel, textButtonOK, textAskMe, askMePress) => {
        Alert.alert(
            title || 'Thông báo',
            mess || 'Bạn có muốn xóa?',
            (
                textAskMe != null ? [
                    {
                        text: textAskMe || 'Nhắc tôi sau',
                        onPress: () => {
                            if (askMePress) askMePress();
                        }
                    }
                ] :
                    []
            ).concat([
                {
                    text: textButtonCancel || 'Hủy',
                    onPress: () => {
                        if (cancelPress) cancelPress();
                    },
                    style: 'cancel',
                },
                {
                    text: textButtonOK || 'Đồng ý',
                    onPress: () => {
                        if (callback) callback();
                    }
                },
            ]),
            { cancelable: false },
        );
    },
    Alert: (mess, title, callback) => {
        Alert.alert(
            title || 'Thông báo',
            mess || 'Có lỗi xẩy ra, vui lòng thử lại.',
            [
                {
                    text: 'OK',
                    onPress: () => {
                        if (callback) callback();
                    }
                },
            ],
            { cancelable: false }
        );
    }
}