import React, { Component } from 'react'
import { Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit'

const { width, height } = Dimensions.get("window")
const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
        {
            data: [20, 45, 28, 80, 99, 43]
        }
    ]
};
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
class ChartBar extends Component {
    render() {
        var screenWidth = width - 40
        return (
            <BarChart
                // style={graphStyle}
                data={data}
                width={screenWidth}
                height={220}
                yAxisLabel="$"
                chartConfig={chartConfig}
                verticalLabelRotation={30}
            />
        )
    }
}

export default ChartBar