import React, { useEffect, useState } from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';
import { Field, FieldArray, reduxForm, FormSection } from 'redux-form';
import ViewCus from '../../../../library/components/ViewCus/ViewCus';
import { Text as TextRN } from '../../../../library/components';
import { palette as appColors } from '../../../../themes/palette';
import DropDownHolder from '../../../../library/utils/dropDownHolder';
const Text = (props) => <TextRN {...props} style={[{ color: 'black', }, props.style]} />

var countCheck = 0;
var uuTien = 1;
const ItemComponent = ({ changeField, isLockField, fields, meta: { error } }) => {
    var allData = fields.getAll();
    var hinhThucHoTro = '';
    var loaiHinhThucHoTro = '';
    countCheck = 0;
    return (
        fields.map((nameObject, index) => {
            var obj = allData[index];
            var isHinhThucHoTro = false;
            if (hinhThucHoTro != obj.hinhThucHoTro) {
                hinhThucHoTro = obj.hinhThucHoTro;
                isHinhThucHoTro = true
            }

            var isLoaiHinhThucHoTro = false;
            if (loaiHinhThucHoTro != obj.loaiHinhThucHoTro) {
                loaiHinhThucHoTro = obj.loaiHinhThucHoTro;
                isLoaiHinhThucHoTro = true
            }

            countCheck += obj.DaNhan == true ? 1 : 0;
            return (
                <View
                    key={index}
                >
                    {isLoaiHinhThucHoTro &&

                        <Text
                            style={{
                                marginTop: index == 0 ? 0 : 10,
                                fontWeight: 'bold'
                            }}
                        >
                            {obj.loaiHinhThucHoTro}
                        </Text>
                    }
                    {(isHinhThucHoTro && (obj.hinhThucHoTro || '') != '') &&

                        <Text
                            style={{
                                marginTop: 10,
                                paddingLeft: 5
                            }}
                        >
                            {obj.hinhThucHoTro}
                        </Text>
                    }
                    <Field
                        name={'{0}.DaNhan'.format(nameObject)}
                        component={ViewCus.Checkbox}
                        onChange={(event, value, previousValue, name) => {
                            countCheck += value ? 1 : -1;
                            if (countCheck > 5) {
                                countCheck--;
                                ViewCus.Alert.Alert(('Chỉ lựa chọn tối đa 5 nhu cầu'));
                                setTimeout(() => {
                                    changeField(name, 0)
                                }, 100);
                            }
                            else {
                                if (value) {
                                    uuTien++;
                                    changeField('{0}.UuTien'.format(nameObject), uuTien)
                                }
                            }
                            countCheck = countCheck < 0 ? 0 : countCheck > 5 ? 5 : countCheck
                        }}
                        disabled={isLockField}
                        styleContainer={{
                            paddingLeft: 10
                        }}
                        children={
                            !obj.isEditNoiDung ? obj.noiDungHoTro :
                                <Field
                                    name={'{0}.NoiDungHoTro'.format(nameObject)}
                                    component={ViewCus.TextInput}
                                    editable={!isLockField}
                                    placeholder='Khác (ghi rõ)'
                                    styleContainer={{
                                        flex: 1
                                    }}
                                />
                        }
                    />
                </View>
            )
        })
    )
}
const Form = reduxForm({
    form: 'YeuCauHoTro', validate: data => {
        var errors = {}
        var listDataError = [];
        (data.listData || []).forEach((hoTro, index) => {
            if (hoTro.isEditNoiDung && hoTro.DaNhan == true && (hoTro.NoiDungHoTro || '') == '')
                listDataError[index] = {
                    NoiDungHoTro: 'Yêu cầu bắt buộc nhập.'
                };
        })
        errors.listData = listDataError;
        return errors
    }
})((props) => {
    const {
        initialize: loadForm,
        handleSubmit,
        submitView,
        topView,
        onSubmit = () => { },
        onRefresh = () => { },
        data = [],
        isLock = false,
        change: changeField,
        isRefresh: _isRefresh = false,
        anyTouched,
        invalid,
    } = props;

    const [isRefresh, setIsRefresh] = useState(false)

    useEffect(() => {
        uuTien = Math.max(...data.map(e => e.UuTien))
        loadForm({
            listData: data
        });
        setIsRefresh(false)
    }, [_isRefresh])

    const _onSubmit = (data, payload) => {
        var listHoTro = data.listData.map((item) => {
            const { loaiHinhThucHoTro, hinhThucHoTro, noiDungHoTro, ..._item } = item;
            _item.DaNhan = _item.DaNhan == true ? true : false;
            _item.UuTien = _item.DaNhan == true ? _item.UuTien : 0;
            return _item;
        });
        listHoTro.sort((a, b) => a.UuTien < b.UuTien ? -1 : a.UuTien > b.UuTien ? 1 : 0)
        var _uuTien = 1;
        listHoTro.map(e => {
            if (e.UuTien > 0) {
                e.UuTien = _uuTien;
                _uuTien++;
            }
        })
        listHoTro.sort((a, b) => a.IdNoiDungHoTro < b.IdNoiDungHoTro ? -1 : a.IdNoiDungHoTro > b.IdNoiDungHoTro ? 1 : 0)
        onSubmit(listHoTro, payload);
    }

    return (
        <ScrollView
            contentContainerStyle={{
                padding: 10
            }}
            refreshControl={<RefreshControl onRefresh={() => onRefresh()} refreshing={isRefresh} />}
        >
            {topView}
            <FieldArray
                name='listData'
                component={ItemComponent}
                changeField={changeField}
                isLockField={isLock}
            />
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
            {
                submitView != null && submitView((payload) => {
                    handleSubmit((data) => {
                        _onSubmit(data, payload)
                    })()
                })
            }
        </ScrollView>
    );
})

export { Form }
export default Form