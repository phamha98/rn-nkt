import React, { useEffect, useState } from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';
import { Field, FieldArray, reduxForm } from 'redux-form';
import ViewCus from '../../../../../library/components/ViewCus/ViewCus';
import { Text as TextRN } from '../../../../../library/components';
import DropDownHolder from '../../../../../library/utils/dropDownHolder';
const Text = (props) => <TextRN {...props} style={[{ color: 'black', }, props.style]} />

var countCheck = 0;
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
                                marginTop: 10,
                                marginBottom: 10,
                                fontWeight: 'bold'
                            }}
                        >
                            {obj.loaiHinhThucHoTro}
                        </Text>
                    }
                    {isHinhThucHoTro &&

                        <Text
                            style={{
                                paddingLeft: 5,
                                marginBottom: 10,
                            }}
                        >
                            {obj.hinhThucHoTro}
                        </Text>
                    }
                    {
                        obj.type == 'checkbox' ?
                            <Field
                                name={'{0}.DaNhan'.format(nameObject)}
                                component={ViewCus.Checkbox}
                                children={obj.noiDungHoTro}
                                onChange={(event, value, previousValue, name) => {
                                    countCheck += value ? 1 : -1;
                                    if (countCheck > 5) {
                                        countCheck--;
                                        ViewCus.Alert.Alert(('Chỉ lựa chọn tối đa 5 nhu cầu'));
                                        setTimeout(() => {
                                            changeField(name, 0)
                                        }, 100);
                                    }
                                    countCheck = countCheck < 0 ? 0 : countCheck > 5 ? 5 : countCheck
                                    __DEV__ && console.log(countCheck)
                                }}
                                disabled={isLockField}
                                styleContainer={{
                                    paddingLeft: 10
                                }}
                            />
                            :
                            <Field
                                name={'{0}.NoiDungHoTro'.format(nameObject)}
                                component={ViewCus.TextInput}
                                editable={!isLockField}
                                placeholder='Khác'
                                styleContainer={{
                                    paddingLeft: 10,
                                    paddingBottom: 20
                                }}
                            />
                    }
                </View>
            )
        })
    )
}
const Form = reduxForm({
    form: 'YeuCauHoTro', validate: data => {
        return {}
    }
})((props) => {
    const {
        initialize: loadForm,
        handleSubmit,
        submitView,
        onSubmit = () => { },
        onRefresh = () => { },
        data = [],
        isLock = false,
        change: changeField,
        isRefresh: _isRefresh = false
    } = props;

    const [isRefresh, setIsRefresh] = useState(false)

    useEffect(() => {
        loadForm({
            listData: data
        });
        setIsRefresh(false)
    }, [_isRefresh])

    const _onSubmit = (data, payload) => {
        var listHoTro = data.listData.map((item) => {
            const { loaiHinhThucHoTro, hinhThucHoTro, noiDungHoTro, ..._item } = item;
            return _item;
        })
        onSubmit(listHoTro, payload);
    }

    return (
        <ScrollView
            contentContainerStyle={{
                padding: 10
            }}
            refreshControl={<RefreshControl onRefresh={() => onRefresh()} refreshing={isRefresh} />}
        >
            <FieldArray
                name='listData'
                component={ItemComponent}
                changeField={changeField}
                isLockField={isLock}
            />
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