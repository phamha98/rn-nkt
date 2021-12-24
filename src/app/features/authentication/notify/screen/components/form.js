import React, { useEffect, useRef } from 'react';
import { TouchableOpacity } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import ScrollableTabBar from 'react-native-scrollable-tab-view/ScrollableTabBar';
import { Text } from '../../../../../library/components';
import { DaiDienHopPhap } from './DaiDienHopPhap';
import { GiayToDinhKem } from './GiayToDinhKem';
import { MucDoKhuyetTat } from './MucDoKhuyetTat';
import { ThongTinDoiTuong } from './ThongTinDoiTuong';
import { TinhTrangKhuyetTat } from './TinhTrangKhuyetTat';

var dataSubmit: any = {};
export default function Form(props) {
    const {
        master,
        dataSaved = null,
        onSubmit = () => { },
        onRefresh = () => { },
        submitLastView = null,
        isRefresh,
        lockTab = false
    } = props;

    let indexTab = 0;

    const tabView = useRef(null);
    const refTabViewContainer = useRef()

    useEffect(() => {
        dataSubmit = {};
        indexTab = 0;
        tabView.current?.goToPage(0);
    }, [isRefresh])


    var submitAndNextTab = (name: string, dataForm: any, isSubmit: boolean, payload: object, options: object) => {
        isSubmit = isSubmit == null ? false : isSubmit;
        options = {
            override: false,
            ...(options == null ? {} : options)
        }
        dataSubmit[name] = (options.override || dataSubmit[name] == null) ? dataForm : (
            dataForm.constructor == Object ? { ...dataSubmit[name], ...dataForm } : dataForm.constructor == Array ? [...dataSubmit[name], ...dataForm] : null
        )

        if (!isSubmit) {
            tabView != null && tabView.current != null && tabView.current.goToPage(indexTab + 1);
        }
        else {
            onSubmit(dataSubmit, payload);
        }
    }
    return (
        <ScrollableTabView
            // locked={lockTab}
            ref={tabView}
            initialPage={indexTab}
            tabBarBackgroundColor='#fff'
            onChangeTab={(page: any) => indexTab = (page.i)}
            tabBarUnderlineStyle={{
                height: 2,
                backgroundColor: 'rgba(0,190,212,1)',
            }}
            tabBarActiveTextColor='rgba(0,190,212,1)'
            renderTabBar={() => <ScrollableTabBar
                renderTab={(name, page, isTabActive, onPressHandler, onLayoutHandler) => {
                    return (
                        <TouchableOpacity
                            key={page}
                            onLayout={onLayoutHandler}
                            style={{
                                height: '100%',
                                justifyContent: "center",
                                alignItems: 'center',
                                paddingVertical: 5,
                            }}
                            // onPress={() => !lockTab && onPressHandler(page)}
                            onPress={() =>  onPressHandler(page)}
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
            <ThongTinDoiTuong
                tabLabel="Thông tin đối tượng"
                onReady={() => ({ master, dataSaved })}
                onRefresh={() => onRefresh()}
                isRefresh={new Date().getTime()}
                lockTab={lockTab}
                onSubmitNext={(name, obj) => submitAndNextTab(name, obj)}
            />
            <DaiDienHopPhap
                tabLabel="Đại diện hợp pháp"
                onReady={() => ({ master, dataSaved })}
                onRefresh={() => onRefresh()}
                isRefresh={new Date().getTime()}
                lockTab={lockTab}
                onSubmitNext={(name, obj) => submitAndNextTab(name, obj)}
            />
            <TinhTrangKhuyetTat
                tabLabel="Tình trạng khuyết tật"
                onReady={() => ({ master, dataSaved })}
                onRefresh={() => onRefresh()}
                isRefresh={new Date().getTime()}
                lockTab={lockTab}
                onSubmitNext={(name, obj) => submitAndNextTab(name, obj)}
            />
            <MucDoKhuyetTat
                tabLabel="Mức độ khuyết tật"
                onReady={() => ({ master, dataSaved })}
                onRefresh={() => onRefresh()}
                isRefresh={new Date().getTime()}
                lockTab={lockTab}
                onSubmitNext={(name, obj) => submitAndNextTab(name, obj)}
            />
            <GiayToDinhKem
                tabLabel="Giấy tờ đính kèm"
                onReady={() => ({ master, dataSaved })}
                onRefresh={() => onRefresh()}
                isRefresh={new Date().getTime()}
                onSubmitNext={(name, obj, payload) => submitAndNextTab(name, obj, true, payload, { override: true })}
                lockTab={lockTab}
                submitView={submitLastView}
            />
        </ScrollableTabView>
    );
}
