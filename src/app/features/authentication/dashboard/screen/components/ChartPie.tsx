import React, { Component } from 'react'
import { Dimensions, Text, View } from 'react-native'
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
const data = [
    {
        name: "Chưa phân loại",
        population: 1,
        color: "rgba(131, 167, 234, 1)",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    },
    {
        name: "NKT Đặc biệt từ 16-60",
        population: 2,
        color: "#F00",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    },
    {
        name: "NKT Đặc biệt nặng là NCT",
        population: 3,
        color: "green",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    },
    {
        name: "NKT nặng từ 16-60",
        population: 4,
        color: "#ffffff",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    },
    {
        name: "NKT nặng là NCT",
        population: 5,
        color: "rgb(0, 0, 255)",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    }
];
class ChartPie extends Component {
    render() {
        var screenWidth = width - 40
        return (
            <PieChart
                data={data}
                width={screenWidth}
                height={220}
                chartConfig={chartConfig}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="15"
                absolute
            />
        )
    }
}

export default ChartPie
