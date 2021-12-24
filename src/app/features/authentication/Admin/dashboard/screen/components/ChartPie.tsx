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
        name: "NKT từ 16-60",
        population: 2,
        color: "#be18c0",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    },
    {
        name: "NKT TE",
        population: 2,
        color: "#09a75b",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    },
    {
        name: "NKT nặng 16-60",
        population: 1,
        color: "#069bb6",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    },
    {
        name: "NKT nặng NCT",
        population: 1,
        color: "#fe9207",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    },
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
