import React, { useRef, useState } from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ConfigProps, Field, InjectedFormProps, reduxForm } from 'redux-form';
import { isAndroid } from '../../../../../common';
import { Button, Header, Screen, Text, TextField, Wallpaper } from '../../../../../library/components';
import { Ionicons } from '../../../../../library/components/iconVector';
import { default as IoniconsFont } from '../../../../../library/components/iconVector/IoniconsFont';
import ModalOptions from '../../../../../library/components/modalOptions/ModalOptions';
import { navigate } from '../../../../../navigation/navigationService';
import { DETAILNKT } from '../../../../../navigation/screenTypes';
import { FONT_14, GlobalStyle, typography } from '../../../../../themes';
// export const QLDanhSachNKT = (props: any, navigation) => {
export const QLDanhSachNKT = reduxForm({ form: 'QLDanhSachYeuCauHoTro' })(
    (props: ConfigProps & InjectedFormProps) => {
        const {
            handleSubmit,
            onSubmit,
        } = props;
        const [visible, setVisible] = useState(false)
        const tabView = useRef(null)
        const [indexTab, setIndexTab] = useState(0)
        const onShowModal = () => {
            setVisible(true);
        }
        const onHideModal = () => {
            setVisible(false);
        }
        const onGoDetail = () => {
            onHideModal();
            navigate(DETAILNKT);
        }
        const _onSeach = (keyseach) => {

        }
        return (
            <>
                <Screen>
                    <Wallpaper useWrap={true} />
                    <Header
                        isBack={true}
                        rightIcon={'move_left'}
                        headerTx={'Danh sách người khuyết tật'}
                    />
                    <ScrollView>
                        <View style={{ flex: 1, width: '100%', flexDirection: 'row', paddingLeft: 20, paddingRight: 20 }}>
                            <Field style={{ width: '90%', }}
                                name={'seach'}
                                placeholder={'Tìm kiếm tên người người khuyết tật'}
                                titleTx={'Tìm kiếm'}
                                component={TextField}
                                inputStyle={{
                                    color: '#fff',
                                }}
                            />
                            <Button style={{ flex: 1, backgroundColor: 'rgba(0,190,212,1)', width: '10%', marginTop: 23 }} onPress={handleSubmit(_onSeach)}>
                                <Ionicons icon={IoniconsFont.searchOutline} color='#fff' size={25} />
                            </Button>
                        </View>
                        <View style={styles.body}>

                            <View
                                style={{
                                    backgroundColor: '#f7f7f7',
                                    ...GlobalStyle.boxShadow,
                                    borderLeftColor: 'rgba(0,190,212,1)',
                                    marginBottom: 15
                                }}
                            >
                                <View style={{ flex: 1, flexDirection: 'row', backgroundColor: '#b8e9ef', width: '100%', height: 50 }}>
                                    <View style={{ flex: 0.1, padding: 10, }}>
                                        <Ionicons icon={IoniconsFont.checkmarkCircle} color='#fff' size={32} />
                                    </View>
                                    <View style={{ flex: 0.7 }}>
                                        <Text style={styles.txname}>
                                            {'Nguyễn Văn Hậu'}
                                        </Text>
                                    </View>
                                    <View style={{ flex: 0.2 }}>
                                        <Button style={{ backgroundColor: '#b8e9ef', marginTop: 10 }} onPress={() => refModal.current?.toggle(true, e)}>
                                            <Ionicons icon={IoniconsFont.ellipsisHorizontal} color='#333' size={20} />
                                        </Button>
                                    </View>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', width: '100%', height: 150 }}>
                                    <View style={{ flex: 0.5, flexDirection: 'column' }}>

                                        <Text style={styles.txtitle}>
                                            {'Loại: '}
                                        </Text>
                                        <Text style={styles.txtitle}>
                                            {'Mức độ: '}
                                        </Text>

                                    </View>
                                    <View style={{ flex: 0.5, flexDirection: 'column' }}>
                                        <Text numberOfLines={1} style={styles.txtitle}>
                                            {"Ngày: "}
                                        </Text>
                                        <Text numberOfLines={2} style={styles.txtitle}>
                                            {"Yêu cầu: "}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </Screen>
                <ModalOptions
                // ref={refModal}
                // options={[
                //     {
                //         label: 'Xem chi tiết',
                //         onPress: (e, index) => onGoDetail(e, index)
                //     },
                //     {
                //         label: 'Hủy duyệt yêu cầu',
                //         onPress: (e, index) => onHuyDuyet(e, index)
                //     },
                //     {
                //         label: 'Không duyệt tiếp nhận yêu cầu',
                //         onPress: (e, index) => onKhongDuyetYeuCau(e, index)
                //     },
                //     {
                //         label: 'Nhận hỗ trợ',
                //         onPress: (e, index) => onNhanHoTro(e, index)
                //     },
                //     {
                //         label: 'Lịch sử nhận hỗ trợ',
                //         onPress: (e, index) => onGoDetail(e, index)
                //     },
                //     {
                //         label: 'In quyết định TCXH',
                //         onPress: (e, index) => onGoDetail(e, index)
                //     },
                // ]}
                />
            </ >
        );
    },
);
const styles = StyleSheet.create({
    body: {
        overflow: 'hidden',
        flex: 1,
        backgroundColor: '#ddd',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        padding: 20
    },
    titleHeader: {
        fontSize: FONT_14,
        alignSelf: 'center',
        fontFamily: typography.helveticaNeue_bold,
        fontWeight: 'bold'
    },
    iconRightHeader: {
        tintColor: '#ffffff'
    },
    header: {
        paddingTop: isAndroid ? StatusBar.currentHeight ? StatusBar.currentHeight + 10 : 20 : 15,
        paddingBottom: isAndroid ? 19 : 15,
    },
    containerStyle: {
        flexGrow: 1,
    },
    wrapContent: {
        flex: 1,
        overflow: 'hidden',
        width: '100%'
    },
    txname: {
        fontSize: 18,
        color: '#333',
        marginLeft: 10,
        marginTop: 10,
        paddingVertical: 7,
        fontWeight: 'bold',
        textAlign: 'center'

    },
    txtitle: {
        fontSize: 18,
        color: '#333',
        marginLeft: 10,
        marginTop: 10,
        paddingVertical: 7,
        fontWeight: '400',

    },
    modal: {
        paddingHorizontal: 0,
        paddingVertical: 0,
        width: '90%',
        height: 50,
        maxHeight: 310,
        alignSelf: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor: '#fff',
        marginTop: 250,
        alignItems: 'flex-start',
        textAlign: 'left'

    },
    buttonText: {
        backgroundColor: '#fff',
        alignItems: 'flex-start',
        borderBottomWidth: 1,
        borderBottomColor: "#ccc"
    }
})
