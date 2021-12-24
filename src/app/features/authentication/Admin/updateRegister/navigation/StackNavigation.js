import UpdateRegister_List from "../screens/UpdateRegister_List";
import UpdateRegister_Details from "../screens/UpdateRegister_Details";
import UpdateRegister_History from "../screens/UpdateRegister_History";

const { createStackNavigator } = require("react-navigation-stack");
const StackNavigation = createStackNavigator(
    {
        'UpdateRegister_List': UpdateRegister_List,
        'UpdateRegister_Details': UpdateRegister_Details,
        'UpdateRegister_History': UpdateRegister_History,
    },
    {
        headerMode: 'none',
        initialRouteName: 'UpdateRegister_List'
    })
export default StackNavigation