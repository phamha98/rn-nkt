
import React, { useRef, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import { Text } from '../../../../../library/components';
import { DieuKienSinhHoat } from './DieuKienSinhHoat';
import { GiamHoKhaiThay } from './GiamHoKhaiThay';
import { GiaoDucDayNghe } from './GiaoDucDayNghe';
import { HoaNhapCongDong } from './HoaNhapCongDong';
import { ThongTinCaNhan } from './ThongTinCaNhan';
import { ThongTinHo } from './ThongTinHo';
import { TinhTrang } from './TinhTrang';

var dataSubmit = {};

export default function Form(props) {
    const {
        master,
        dataSaved = null,
        onSubmit = () => { },
        onRefresh = () => { },
        submitLastView = null,
        isRefresh,
        lockTab = false,
    } = props

    const tabView = useRef(null);

    useEffect(() => {
        dataSubmit = {};
        indexTab = 0;
        tabView.current?.goToPage(0);
    }, [isRefresh])

    let indexTab = 0
    const onChangeTab = (page, ref) => {
        indexTab = page;
    }

    var nextTabOrSubmitData = async (name, dataForm, isSubmit, payload, options) => {
        isSubmit = isSubmit == null ? false : isSubmit;
        options = {
            override: false,
            ...(options == null ? {} : options)
        }

        dataSubmit[name] = (options.override || dataSubmit[name] == null) ? dataForm : (
            dataForm.constructor == Object ? { ...dataSubmit[name], ...dataForm } : dataForm.constructor == Array ? [...dataSubmit[name], ...dataForm] : null
        )
        if (!isSubmit) {
            tabView.current?.goToPage(indexTab + 1);
        }
        else {//call api
            onSubmit(dataSubmit, payload);
        }
    }
    return (dataSaved == null ? null :
        <ScrollableTabView
            // locked={lockTab}
            ref={tabView}
            onChangeTab={page => onChangeTab(page.i, page.ref)}
            tabBarBackgroundColor='#fff'
            tabBarUnderlineStyle={{
                height: 2,
                backgroundColor: 'rgba(0,190,212,1)'
            }}
            tabBarActiveTextColor='rgba(0,190,212,1)'
            renderTabBar={() =>
                <ScrollableTabBar
                    renderTab={(name, page, isTabActive, onPressHandler, onLayoutHandler) => {
                        return (
                            <TouchableOpacity
                                key={page}
                                onLayout={onLayoutHandler}
                                // onPress={() => !lockTab && onPressHandler(page)}
                                onPress={() => onPressHandler(page)}
                                style={{
                                    height: '100%',
                                    justifyContent: "center",
                                    alignItems: 'center',
                                    paddingVertical: 5,
                                }}
                            >
                                <Text
                                    style={{
                                        color: 'black',
                                        paddingHorizontal: 10,
                                    }}
                                >
                                    {name}
                                </Text>
                            </TouchableOpacity>
                        )
                    }}
                />}
        >
            <ThongTinCaNhan
                tabLabel="Th??ng tin c?? nh??n"
                onReady={() => ({ master, dataSaved })}
                onRefresh={() => onRefresh()}
                isRefresh={new Date().getTime()}
                lockTab={lockTab}
                onSubmitNext={(name, obj) => nextTabOrSubmitData(name, obj)}
            />
            <ThongTinHo
                tabLabel="Th??ng tin h???"
                onReady={() => ({ master, dataSaved })}
                onRefresh={() => onRefresh()}
                isRefresh={new Date().getTime()}
                lockTab={lockTab}
                onSubmitNext={(name, obj, options) => nextTabOrSubmitData(name, obj, false, {}, options)}
            />
            <TinhTrang
                tabLabel="T??nh tr???ng"
                onReady={() => ({ master, dataSaved })}
                onRefresh={() => onRefresh()}
                isRefresh={new Date().getTime()}
                lockTab={lockTab}
                onSubmitNext={(name, obj) => nextTabOrSubmitData(name, obj)}
            />
            <GiaoDucDayNghe
                tabLabel="Gi??o d???c d???y ngh???"
                onReady={() => ({ master, dataSaved })}
                onRefresh={() => onRefresh()}
                isRefresh={new Date().getTime()}
                lockTab={lockTab}
                onSubmitNext={(name, obj) => nextTabOrSubmitData(name, obj)}
            />
            <DieuKienSinhHoat
                tabLabel="??i???u ki???n sinh ho???t"
                onReady={() => ({ master, dataSaved })}
                onRefresh={() => onRefresh()}
                isRefresh={new Date().getTime()}
                lockTab={lockTab}
                onSubmitNext={(name, obj) => nextTabOrSubmitData(name, obj)}
            />
            <HoaNhapCongDong
                tabLabel="Ho?? Nh???p c???ng ?????ng"
                onReady={() => ({ master, dataSaved })}
                onRefresh={() => onRefresh()}
                isRefresh={new Date().getTime()}
                lockTab={lockTab}
                onSubmitNext={(name, obj) => nextTabOrSubmitData(name, obj)}
            />
            <GiamHoKhaiThay
                tabLabel="Gi??m H??? & khai thay"
                onReady={() => ({ master, dataSaved })}
                onRefresh={() => onRefresh()}
                isRefresh={new Date().getTime()}
                lockTab={lockTab}
                onSubmitNext={(name, obj, payload) => nextTabOrSubmitData(name, obj, true, payload)}
                submitView={submitLastView}
            />
        </ScrollableTabView>
    );
}
