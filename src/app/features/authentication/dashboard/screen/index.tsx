import React from 'react';
import { Dimensions, View } from 'react-native';
import { Header, Screen, Icon } from '../../../../library/components';
import { Button, Text } from '../../../../library/components/index';
import { FONT_12, FONT_14, FONT_23, GlobalStyle } from '../../../../themes';
import { styles } from './style';
import ChartBar from './components/ChartBar'
import ChartPie from './components/ChartPie'
import { ScrollView } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get("window")

export interface Props {
    name: string;
    enthusiasmLevel?: number;
}

interface State {
    enthusiasmLevel: number;
}

export class Dashboard extends React.Component<Props, State> {

    render() {
        return (
            <View style={[
                GlobalStyle.fullScreen,
                {
                    backgroundColor: 'rgba(0,190,212,1)'
                }
            ]}>
                <Screen>
                    <Header
                        rightIconStyle={styles.styleIconRight}
                        titleStyle={styles.titleHeader}
                        headerTx={'Dashboard'}
                    />
                    <ScrollView>
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
                                            label: 'Số NKT/NNBM đã đăng ký',
                                            value: '125',
                                            textColor: '#be18c0',
                                            backgroundColor: '#fff3ff'
                                        },
                                        {
                                            label: 'Số NKT/NNBM đang quản lý',
                                            value: '246',
                                            textColor: '#09a75b',
                                            backgroundColor: '#f4fffa'
                                        },
                                        {
                                            label: 'Nhu cầu hỗ trợ',
                                            value: '683',
                                            textColor: '#069bb6',
                                            backgroundColor: '#edfcff'
                                        },
                                        {
                                            label: 'Đơn xin xác nhận khuyết tật',
                                            value: '901',
                                            textColor: '#fe9207',
                                            backgroundColor: '#fffcef'
                                        },
                                    ].map((e, index) => {
                                        return (
                                            <View
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
                                        flexDirection: 'row',
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
                                        {'Biểu đồ số lượng NKT/NNBM theo phân loại'}
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
                                <ChartBar />
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
                                <ChartPie />
                            </View>
                        </View>
                    </ScrollView>
                </Screen>
            </View>
        );
    }
}