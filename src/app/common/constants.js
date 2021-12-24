import { Dimensions, Platform, StatusBar } from "react-native";

const { width, height } = Dimensions.get('window');
const standard = {
    width: 375,
    height: 812
}
export default {
    window: {
        width: width,
        height: height,
    },
    ratio: {
        max: Math.max(width / standard.width, height / standard.height),
        min: Math.min(width / standard.width, height / standard.height),
        height: height / standard.height,
        width: width / standard.width
    },
    statusbarHeight: StatusBar.currentHeight,
    screenPaddingTop: Platform.OS == 'android' ? 10 : 0
}
