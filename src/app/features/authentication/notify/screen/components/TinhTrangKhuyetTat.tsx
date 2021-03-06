import React, { useEffect, useState } from 'react';
import { StyleSheet, View, RefreshControl } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ConfigProps, Field, InjectedFormProps, reduxForm } from 'redux-form';
import { Text, Button } from '../../../../../library/components';
import ViewCus from '../../../../../library/components/ViewCus/ViewCus';
import Utils from '../../../../../library/utils/Utils';
import { GlobalStyle, palette as appColors } from '../../../../../themes';
import ButtonNextTab from './ButtonNextTab';

const defaultData = {
    TTKT_VD_11: 0,
    TTKT_VD_12: 0,
    TTKT_VD_13: 0,
    TTKT_VD_14: 0,
    TTKT_VD_15: 0,
    TTKT_VD_16: 0,
    TTKT_NN_21: 0,
    TTKT_NN_22: 0,
    TTKT_NN_23: 0,
    TTKT_NN_24: 0,
    TTKT_NN_25: 0,
    TTKT_NN_26: 0,
    TTKT_N_31: 0,
    TTKT_N_32: 0,
    TTKT_N_33: 0,
    TTKT_N_34: 0,
    TTKT_N_35: 0,
    TTKT_N_36: 0,
    TTKT_N_37: 0,
    TTKT_TK_41: 0,
    TTKT_TK_42: 0,
    TTKT_TK_43: 0,
    TTKT_TK_44: 0,
    TTKT_TK_45: 0,
    TTKT_TT_51: 0,
    TTKT_TT_52: 0,
    TTKT_TT_53: 0,
    TTKT_TT_54: 0,
    TTKT_Khac_61: 0,
    TTKT_Khac_62: 0,
    TTKT_Khac_63: 0,
}
const validateForm = (data: any) => {
    var valids = Utils.objectValid.valid({
        ...defaultData,
        ...data,
    }, {
    }, { lan: 'redux-form' })
    return valids.toObject(e => e.field, e => e.message);
}
const styles = StyleSheet.create({
    title: {
        fontSize: 15,
        letterSpacing: 0.16,
        paddingVertical: 5,
        color: 'black',
    },
})

interface InfoFormProps {
    onChangeInfo: (name: string, value: string) => void;
    selectItem: any;
    onShowModal: () => void;
    defaultValue: any;
}
export const TinhTrangKhuyetTat = reduxForm({ form: 'TinhTrangKhuyetTat', validate: validateForm })(
    (props: InfoFormProps & ConfigProps & InjectedFormProps) => {
        const {
            handleSubmit,
            reset: resetForm,
            initialize: loadForm,
            anyTouched,
            invalid,
            refOut,
            onReady,
            onRefresh,
            lockTab,
            isRefresh: _isRefresh,
        } = props;
        const [isRefresh, setIsRefresh] = useState(false)

        useEffect(() => {
            setIsRefresh(false);
            init()
        }, [_isRefresh])

        var init = async () => {
            var { master: masterAll, dataSaved } = onReady() || {};
            // const {
            //     ethnics,
            //     provinces,
            //     districts,
            //     wards,
            // } = masterAll;
            var data = Utils.mapDataWithCase(defaultData, dataSaved.gxN_01)
            setFormData(data)
        }

        const setFormData = (data) => {
            loadForm(data)
        }

        const onResetFrom = () => {
            loadForm(defaultData)
        }
        var _onSubmit = (obj) => {
            props.onSubmitNext('GXN_01', obj, false)
        }

        return (
            <ScrollView
                contentContainerStyle={{
                    width: '100%',
                    backgroundColor: 'white',
                    padding: 10,
                }}
                refreshControl={<RefreshControl refreshing={isRefresh} onRefresh={() => (setIsRefresh(true), onRefresh())} />}
            >
                <View>
                    {
                        [
                            {
                                label: 'Khuy???t t???t v???n ?????ng',
                                list: [
                                    {
                                        key: 'TTKT_VD_11',
                                        label: 'M???m nh???o ho???c co c???ng to??n th??n',
                                    },
                                    {
                                        key: 'TTKT_VD_12',
                                        label: 'Thi???u tay ho???c kh??ng c??? ?????ng ???????c tay',
                                    },
                                    {
                                        key: 'TTKT_VD_13',
                                        label: 'Thi???u ch??n ho???c kh??ng c??? ?????ng ???????c ch??n',
                                    },
                                    {
                                        key: 'TTKT_VD_14',
                                        label: 'Y???u, li???t, teo c?? ho???c h???n ch??? v???n ?????ng tay, ch??n, l??ng, c???',
                                    },
                                    {
                                        key: 'TTKT_VD_15',
                                        label: 'Cong, v???o ch??n tay, l??ng, c???; g?? c???t s???ng l??ng ho???c d??? d???ng, bi???n d???ng kh??c tr??n c?? th??? ??? ?????u, c???, l??ng, tay, ch??n',
                                    }, {
                                        key: 'TTKT_VD_16',
                                        label: 'C?? k???t lu???n c???a c?? s??? y t??? c???p t???nh tr??? l??n v??? suy gi???m ch???c n??ng v???n ?????ng',
                                    },
                                ]
                            },
                            {
                                label: 'Khuy???t t???t nghe, n??i',
                                list: [
                                    {
                                        key: 'TTKT_NN_21',
                                        label: 'Kh??ng ph??t ra ??m thanh, l???i n??i',
                                    },
                                    {
                                        key: 'TTKT_NN_22',
                                        label: 'Ph??t ra ??m thanh l???i n??i nh??ng kh??ng r?? ti???ng, r?? c??u',
                                    },
                                    {
                                        key: 'TTKT_NN_23',
                                        label: 'Kh??ng nghe ???????c',
                                    },
                                    {
                                        key: 'TTKT_NN_24',
                                        label: 'Khi???m khuy???t ho???c d??? d???ng c?? quan ph??t ??m, ???nh h?????ng ?????n vi???c ph??t ??m',
                                    },
                                    {
                                        key: 'TTKT_NN_25',
                                        label: 'Khi???m khuy???t ho???c d??? d???ng v??nh tai ho???c ???ng tai ngo??i ???nh h?????ng ?????n nghe',
                                    },
                                    {
                                        key: 'TTKT_NN_26',
                                        label: 'C?? k???t lu???n c???a c?? s??? y t??? c???p t???nh tr??? l??n v??? suy gi???m ch???c n??ng nghe n??i',
                                    },
                                ]
                            }, {
                                label: 'Khuy???t t???t nh??n',
                                list: [
                                    {
                                        key: 'TTKT_N_31',
                                        label: 'M?? m???t ho???c hai m???t',
                                    },
                                    {
                                        key: 'TTKT_N_32',
                                        label: 'Thi???u m???t ho???c hai m???t',
                                    },
                                    {
                                        key: 'TTKT_N_33',
                                        label: 'Kh?? kh??n khi nh??n ho???c kh??ng nh??n th???y c??c ????? v???t',
                                    },
                                    {
                                        key: 'TTKT_N_34',
                                        label: 'Kh?? kh??n khi ph??n bi???t m??u s???c ho???c kh??ng ph??n bi???t ???????c c??c m??u s???c',
                                    },
                                    {
                                        key: 'TTKT_N_35',
                                        label: 'Rung, gi???t nh???n th???, ?????c nh??n m???t ho???c s???o lo??t gi??c m???c',
                                    },
                                    {
                                        key: 'TTKT_N_36',
                                        label: 'B??? d??? t???t, bi???n d???ng ??? v??ng m???t',
                                    },
                                    {
                                        key: 'TTKT_N_37',
                                        label: 'C?? k???t lu???n c???a c?? s??? y t??? c???p t???nh tr??? l??n v??? suy gi???m ch???c n??ng nh??n',
                                    },
                                ]
                            }, {
                                label: 'Khuy???t t???t th???n kinh, t??m th???n',
                                list: [
                                    {
                                        key: 'TTKT_TK_41',
                                        label: 'Th?????ng ng???i m???t m??nh, ch??i m???t m??nh, kh??ng bao gi??? n??i chuy???n ho???c quan t??m t???i b???t k??? ai',
                                    },
                                    {
                                        key: 'TTKT_TK_42',
                                        label: 'C?? nh???ng h??nh vi b???t th?????ng nh?? k??ch ?????ng, c??u gi???n ho???c s??? h??i v?? c??? g??y ???nh h?????ng ?????n s???c kh???e, s??? an to??n c???a b???n th??n v?? ng?????i kh??c',
                                    },
                                    {
                                        key: 'TTKT_TK_43',
                                        label: 'B???t ng??? d???ng m???i ho???t ?????ng, m???t m??? tr???ng tr???ng kh??ng ch???p, co gi???t ch??n tay, m??i, m???t ho???c b???t th??nh l??nh ng?? xu???ng, co gi???t, s??i b???t m??p, g???i h???i kh??ng bi???t',
                                    },
                                    {
                                        key: 'TTKT_TK_44',
                                        label: 'B??? m???t tr?? nh???, b??? nh?? ??i lang thang',
                                    },
                                    {
                                        key: 'TTKT_TK_45',
                                        label: 'C?? k???t lu???n c???a c?? s??? y t??? c???p t???nh tr??? l??n v??? suy gi???m ch???c n??ng th???n kinh, t??m th???n',
                                    },
                                ]
                            },
                            {
                                label: 'Khuy???t t???t tr?? tu???',
                                list: [
                                    {
                                        key: 'TTKT_TT_51',
                                        label: 'Kh?? kh??n trong vi???c nh???n bi???t ng?????i th??n trong gia ????nh ho???c kh?? kh??n trong giao ti???p v???i nh???ng ng?????i xung quanh so v???i ng?????i c??ng l???a tu???i',
                                    },
                                    {
                                        key: 'TTKT_TT_52',
                                        label: 'Ch???m ch???p, ng??? ngh???ch ho???c kh??ng th??? l??m ???????c m???t vi???c ????n gi???n (so v???i tu???i) d?? ???? ???????c h?????ng d???n',
                                    },
                                    {
                                        key: 'TTKT_TT_53',
                                        label: 'Kh?? kh??n trong vi???c ?????c, vi???t, t??nh to??n v?? k??? n??ng h???c t???p kh??c so v???i ng?????i c??ng tu???i do ch???m ph??t tri???n tr?? tu???',
                                    },
                                    {
                                        key: 'TTKT_TT_54',
                                        label: 'C?? k???t lu???n c?? s??? ?? t??? c???p t???nh tr??? l??n v??? ch???m ph??t tri???n tr?? tu???',
                                    },

                                ]
                            },
                            {
                                label: 'Khuy???t t???t kh??c',
                                list: [
                                    {
                                        key: 'TTKT_Khac_61',
                                        label: 'C?? k???t lu???n c???a c?? s??? y t??? c???p t???nh tr??? l??n v??? b???nh t?? b??, m???t c???m gi??c ??? tay, ch??n ho???c s??? b???t th?????ng c???a c?? th??? l??m gi???m kh??? n??ng th???c hi???n c??c ho???t ?????ng; lao ?????ng; ?????c, vi???t, t??nh to??n v?? k??? n??ng h???c t???p kh??c; sinh ho???t ho???c giao ti???p',
                                    },
                                    {
                                        key: 'TTKT_Khac_62',
                                        label: 'C?? k???t lu???n c???a c?? s??? y t??? c???p t???nh tr??? l??n v??? b???nh h?? h???p ho???c do b???nh tim m???ch ho???c do r???i lo???n ?????i, ti???u ti???n m???c d?? ???? ???????c ??i???u tr??? li??n t???c tr??n 3 th??ng, l??m gi???m kh??? n??ng th???c hi???n c??c ho???t ?????ng; lao ?????ng; ?????c, vi???t, t??nh to??n v?? k??? n??ng h???c t???p kh??c; sinh ho???t ho???c giao ti???p',
                                    },
                                    {
                                        key: 'TTKT_Khac_63',
                                        label: 'C?? k???t lu???n c?? s??? ?? t??? c???p t???nh tr??? l??n v??? r???i lo???n ph??? t??? k??? ho???c c??c lo???i b???nh hi???m',
                                    },
                                ]
                            }
                        ].map((group, index) => {
                            return (
                                <ViewCus.ViewBoxShadown
                                    key={index}
                                >
                                    <Text style={styles.title}>{group.label}</Text>
                                    {
                                        group.list.map((e, index) => {
                                            return (
                                                <Field
                                                    key={index}
                                                    name={e.key}
                                                    component={ViewCus.Checkbox}
                                                    children={e.label}
                                                />

                                            )
                                        })
                                    }
                                </ViewCus.ViewBoxShadown>
                            )
                        })
                    }
                    {
                        (anyTouched && invalid) && <View>
                            <Text
                                style={{
                                    color: appColors.materialRed,
                                    paddingVertical: 20,
                                    paddingHorizontal: 10
                                }}
                            >
                                {'H??y ki???m tra l???i d??? li???u'}
                            </Text>
                        </View>
                    }
                    {__DEV__ &&
                        <Button
                            onPress={() => onResetFrom()}
                        >
                            {'Reset'}
                        </Button>
                    }
                    {
                        lockTab &&
                        <ButtonNextTab ButtonNextTab
                            onPress={handleSubmit(_onSubmit)}
                        >
                            {'Ti???p t???c'}
                        </ButtonNextTab>
                    }
                </View>
            </ScrollView >
        );
    },
);
