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
                                label: 'Khuyết tật vận động',
                                list: [
                                    {
                                        key: 'TTKT_VD_11',
                                        label: 'Mềm nhẽo hoặc co cứng toàn thân',
                                    },
                                    {
                                        key: 'TTKT_VD_12',
                                        label: 'Thiếu tay hoặc không cử động được tay',
                                    },
                                    {
                                        key: 'TTKT_VD_13',
                                        label: 'Thiếu chân hoặc không cử động được chân',
                                    },
                                    {
                                        key: 'TTKT_VD_14',
                                        label: 'Yếu, liệt, teo cơ hoặc hạn chế vận động tay, chân, lưng, cổ',
                                    },
                                    {
                                        key: 'TTKT_VD_15',
                                        label: 'Cong, vẹo chân tay, lưng, cổ; gù cột sống lưng hoặc dị dạng, biến dạng khác trên cơ thể ở đầu, cổ, lưng, tay, chân',
                                    }, {
                                        key: 'TTKT_VD_16',
                                        label: 'Có kết luận của cơ sở y tế cấp tỉnh trở lên về suy giảm chức năng vận động',
                                    },
                                ]
                            },
                            {
                                label: 'Khuyết tật nghe, nói',
                                list: [
                                    {
                                        key: 'TTKT_NN_21',
                                        label: 'Không phát ra âm thanh, lời nói',
                                    },
                                    {
                                        key: 'TTKT_NN_22',
                                        label: 'Phát ra âm thanh lời nói nhưng không rõ tiếng, rõ câu',
                                    },
                                    {
                                        key: 'TTKT_NN_23',
                                        label: 'Không nghe được',
                                    },
                                    {
                                        key: 'TTKT_NN_24',
                                        label: 'Khiếm khuyết hoặc dị dạng cơ quan phát âm, ảnh hưởng đến việc phát âm',
                                    },
                                    {
                                        key: 'TTKT_NN_25',
                                        label: 'Khiếm khuyết hoặc dị dạng vành tai hoặc ống tai ngoài ảnh hưởng đến nghe',
                                    },
                                    {
                                        key: 'TTKT_NN_26',
                                        label: 'Có kết luận của cơ sở y tế cấp tỉnh trở lên về suy giảm chức năng nghe nói',
                                    },
                                ]
                            }, {
                                label: 'Khuyết tật nhìn',
                                list: [
                                    {
                                        key: 'TTKT_N_31',
                                        label: 'Mù một hoặc hai mắt',
                                    },
                                    {
                                        key: 'TTKT_N_32',
                                        label: 'Thiếu một hoặc hai mắt',
                                    },
                                    {
                                        key: 'TTKT_N_33',
                                        label: 'Khó khăn khi nhìn hoặc không nhìn thấy các đồ vật',
                                    },
                                    {
                                        key: 'TTKT_N_34',
                                        label: 'Khó khăn khi phân biệt màu sắc hoặc không phân biệt được các màu sắc',
                                    },
                                    {
                                        key: 'TTKT_N_35',
                                        label: 'Rung, giật nhạn thị, đục nhân mắt hoặc sẹo loét giác mạc',
                                    },
                                    {
                                        key: 'TTKT_N_36',
                                        label: 'Bị dị tật, biến dạng ở vùng mắt',
                                    },
                                    {
                                        key: 'TTKT_N_37',
                                        label: 'Có kết luận của cơ sở y tế cấp tỉnh trở lên về suy giảm chức năng nhìn',
                                    },
                                ]
                            }, {
                                label: 'Khuyết tật thần kinh, tâm thần',
                                list: [
                                    {
                                        key: 'TTKT_TK_41',
                                        label: 'Thường ngồi một mình, chơi một mình, không bao giờ nói chuyện hoặc quan tâm tới bất kỳ ai',
                                    },
                                    {
                                        key: 'TTKT_TK_42',
                                        label: 'Có những hành vi bất thường như kích động, cáu giận hoặc sợ hãi vô cớ gây ảnh hưởng đến sức khỏe, sự an toàn của bản thân và người khác',
                                    },
                                    {
                                        key: 'TTKT_TK_43',
                                        label: 'Bất ngờ dừng mọi hoạt động, mắt mở trừng trừng không chớp, co giật chân tay, môi, mặt hoặc bất thình lình ngã xuống, co giật, sùi bọt mép, gọi hỏi không biết',
                                    },
                                    {
                                        key: 'TTKT_TK_44',
                                        label: 'Bị mất trí nhớ, bỏ nhà đi lang thang',
                                    },
                                    {
                                        key: 'TTKT_TK_45',
                                        label: 'Có kết luận của cơ sở y tế cấp tỉnh trở lên về suy giảm chức năng thần kinh, tâm thần',
                                    },
                                ]
                            },
                            {
                                label: 'Khuyết tật trí tuệ',
                                list: [
                                    {
                                        key: 'TTKT_TT_51',
                                        label: 'Khó khăn trong việc nhận biết người thân trong gia đình hoặc khó khăn trong giao tiếp với những người xung quanh so với người cùng lứa tuổi',
                                    },
                                    {
                                        key: 'TTKT_TT_52',
                                        label: 'Chậm chạp, ngờ nghệch hoặc không thể làm được một việc đơn giản (so với tuổi) dù đã được hướng dẫn',
                                    },
                                    {
                                        key: 'TTKT_TT_53',
                                        label: 'Khó khăn trong việc đọc, viết, tính toán và kỹ năng học tập khác so với người cùng tuổi do chậm phát triển trí tuệ',
                                    },
                                    {
                                        key: 'TTKT_TT_54',
                                        label: 'Có kết luận cơ sở ý tế cấp tỉnh trở lên về chậm phát triển trí tuệ',
                                    },

                                ]
                            },
                            {
                                label: 'Khuyết tật khác',
                                list: [
                                    {
                                        key: 'TTKT_Khac_61',
                                        label: 'Có kết luận của cơ sở y tế cấp tỉnh trở lên về bệnh tê bì, mất cảm giác ở tay, chân hoặc sự bất thường của cơ thể làm giảm khả năng thực hiện các hoạt động; lao động; đọc, viết, tính toán và kỹ năng học tập khác; sinh hoạt hoặc giao tiếp',
                                    },
                                    {
                                        key: 'TTKT_Khac_62',
                                        label: 'Có kết luận của cơ sở y tế cấp tỉnh trở lên về bệnh hô hấp hoặc do bệnh tim mạch hoặc do rối loạn đại, tiểu tiện mặc dù đã được điều trị liên tục trên 3 tháng, làm giảm khả năng thực hiện các hoạt động; lao động; đọc, viết, tính toán và kỹ năng học tập khác; sinh hoạt hoặc giao tiếp',
                                    },
                                    {
                                        key: 'TTKT_Khac_63',
                                        label: 'Có kết luận cơ sở ý tế cấp tỉnh trở lên về rối loạn phổ tự kỷ hoặc các loại bệnh hiếm',
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
                                {'Hãy kiểm tra lại dữ liệu'}
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
                            {'Tiếp tục'}
                        </ButtonNextTab>
                    }
                </View>
            </ScrollView >
        );
    },
);
