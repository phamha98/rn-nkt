import FirstRegister_List from "../screens/FirstRegister_List";
import FirstRegister_Details from "../screens/FirstRegister_Details";
import FirstRegister_UpdateDetails from "../screens/FirstRegister_UpdateDetails";
import FirstRegister_UpdateSupport from "../screens/FirstRegister_UpdateSupport";

const { createStackNavigator } = require("react-navigation-stack");
const StackNavigation = createStackNavigator(
    {
        'FirstRegister_List': FirstRegister_List,
        'FirstRegister_Details': FirstRegister_Details,
        'FirstRegister_UpdateDetails': FirstRegister_UpdateDetails,
        'FirstRegister_UpdateSupport': FirstRegister_UpdateSupport,
    },
    {
        headerMode: 'none',
        initialRouteName: 'FirstRegister_List'
    })
export default StackNavigation