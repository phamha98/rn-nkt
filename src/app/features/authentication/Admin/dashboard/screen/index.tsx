import React, { useEffect, useState } from 'react';
import { Dimensions, View } from 'react-native';
import { useSelector } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { Header, Icon, Screen } from '../../../../../library/components';
import { Button, Text } from '../../../../../library/components/index';
import { FONT_12, FONT_14, FONT_23 } from '../../../../../themes';
import ChartLine from '../screen/components/ChartLine'
import ChartPie from '../screen/components/ChartPie'
import RestAPI from '../../../../../RestAPI';
import { toggleLoading } from '../../../../../../../App';
import { PieChart } from 'react-native-chart-kit'
const { width, height } = Dimensions.get("window")
const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: "#fff",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgb(0,0,0)`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
};

export interface Props {
    name: string;
    enthusiasmLevel?: number;
}

interface State {
    enthusiasmLevel: number;
}
export const _Dashboard = (props: any) => {
    var screenWidth = width - 40
    const dataDetailUser = useSelector(state => state.AppReducer.profile.user);
    console.log(dataDetailUser)
    const [dataSoluong, setDataSoluong] = useState([])
    const [NKTDBN, setNKTDBN] = useState(Number)
    const [NKTTE, setNKTTE] = useState(Number)
    const [NKT16_60, setNKT16_60] = useState(Number)
    const [NKTNANG, setNKTNANG] = useState(Number)
    useEffect(() => {
        loadData();
    }, []);
    const loadData = async () => {
        toggleLoading(true);
        var resp = await RestAPI.API_AdminDashBroad({
            maTinh: dataDetailUser.maTinh,
            maHuyen: dataDetailUser.maHuyen,
            maXa: dataDetailUser.maXa,
            tuNgay: 0,
            denNgay: 99999999
        });
        var ethnics = (await RestAPI.Master_Ethnic()).data;
        var dataList = await RestAPI.FirstRegister_GetList({
            start: 1,
            length: 10,
            search: "",
            maTinh: dataDetailUser.maTinh,
            maHuyen: dataDetailUser.maHuyen,
            maXa: dataDetailUser.maXa,
            gioiTinh: -1,
            danToc: -1,
            trangThai: -1,
            token: dataDetailUser.token
        });
        var details = await RestAPI.FirstRegister_GetDetails(0)
        var UpdateDetails = await RestAPI.FirstRegister_GetUpdateDetails(0)
        setNKTDBN(resp.soluong[0].y)
        setNKTTE(resp.soluong[1].y)
        setNKT16_60(resp.soluong[2].y)
        setNKTNANG(resp.soluong[3].y)
        setDataSoluong(resp.soluong)
        toggleLoading();
    }

    const convertDateToInt = date => {
        if (date != null && date.constructor == Date) {
            var y = new Date(date).getFullYear();
            var m = new Date(date).getMonth() + 1;
            var d = new Date(date).getDate();
            return y * 10000 + m * 100 + d;
        }
        return '';
    }
    const data = [
        {
            name: dataSoluong[0]?.name,
            population: NKTDBN,
            color: "#be18c0",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: dataSoluong[1]?.name,
            population: NKTTE,
            color: "#09a75b",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: dataSoluong[2]?.name,
            population: NKT16_60,
            color: "#069bb6",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: dataSoluong[3]?.name,
            population: NKTNANG,
            color: "#fe9207",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
    ];
    return (
        <Screen>
            <Header
                isMenu={true}
                rightIcon={'tab_notify'}
                headerTx={'Trang chủ'}
            />
            <View
                style={{
                    backgroundColor: '#dfdfdf',
                    padding: 10
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                    }}
                >
                    {
                        [
                            {
                                label: dataSoluong[0]?.name,
                                value: dataSoluong[0]?.y,
                                textColor: '#be18c0',
                                backgroundColor: '#fff3ff'
                            },
                            {
                                label: dataSoluong[1]?.name,
                                value: dataSoluong[1]?.y,
                                textColor: '#09a75b',
                                backgroundColor: '#f4fffa'
                            },
                            {
                                label: dataSoluong[2]?.name,
                                value: dataSoluong[2]?.y,
                                textColor: '#069bb6',
                                backgroundColor: '#edfcff'
                            },
                            {
                                label: dataSoluong[3]?.name,
                                value: dataSoluong[3]?.y,
                                textColor: '#fe9207',
                                backgroundColor: '#fffcef'
                            },
                        ]

                            .map((e, index) => {
                                return (
                                    <View
                                        key={index}
                                        style={{
                                            width: (width - 20) / 2 - 5,
                                            marginTop: 10
                                        }}
                                    >
                                        <View
                                            style={{
                                                backgroundColor: e.backgroundColor,
                                                width: '100%',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                padding: 10,
                                                height: height / 5
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    color: e.textColor,
                                                    fontSize: FONT_23
                                                }}
                                            >
                                                {e.value}
                                            </Text>
                                            <Text
                                                style={{
                                                    marginTop: 20,
                                                    color: e.textColor,
                                                    fontSize: FONT_12
                                                }}>
                                                {e.label}
                                            </Text>
                                        </View>
                                    </View>
                                )
                            })
                    }
                </View>
                <View
                    style={{
                        backgroundColor: '#f2f2f2',
                        padding: 10,
                        marginTop: 20,
                    }}
                >
                    <View
                        style={{
                            padding: 10,
                            flexDirection: 'row'
                        }}
                    >
                        <Text
                            style={{
                                color: 'black',
                                fontSize: FONT_14,
                                fontWeight: 'bold',
                                flex: 1
                            }}
                        >
                            {'Biểu đồ tỷ lệ NKT/NNBM theo phân loại'}
                        </Text>
                        <Button
                            style={{
                                backgroundColor: 'transparent',
                                padding: 0,
                            }}
                        >
                            <Icon icon='more' />
                        </Button>
                    </View>
                    <PieChart
                        data={data}
                        width={screenWidth}
                        height={220}
                        chartConfig={chartConfig}
                        accessor="population"
                        backgroundColor="transparent"
                        paddingLeft="5"
                        absolute
                    />
                </View>
            </View>
        </Screen>
    );
}

export let Dashboard = withNavigation(_Dashboard)