import { AppRegistry } from 'react-native';
import { MyApp } from './App';
// import { Demo as MyApp } from './Demo';
import { name as appName } from './app.json';
import 'react-native-gesture-handler';
import moment from 'moment'
import Utils from './src/app/library/utils/Utils';
import { startNetworkLogging } from 'react-native-network-logger';

var consoleLog = console.log;
// console.log = () => {

// }
Number.prototype.formatVND = function () {
    return (this + '').formatVND();
}
String.prototype.formatVND = function () {
    return this.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
}
String.prototype.format = function () {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function (match, number) {
        return typeof args[number] != 'undefined' ?
            args[number] :
            match;
    });
};

String.prototype.toDate = function (format) {
    format = format || 'DD/MM/YYYY';
    return moment(this, format).toDate();
}

Date.prototype.format = function (format) {
    format = format || 'DD/MM/YYYY';
    return moment(new Date(this)).format(format)
}

Array.prototype.toObject = function (getKey, getValue) {
    var obj = {};
    this.map((e, index) =>
        obj[getKey == null ? index : (getKey(e, index) || index)] = getValue == null ? e : getValue(e, index)
    )
    return obj;
}

Utils.objectValid.addRule('CMTND', (value, obj, rule) => {
    if (value != null && value.length != 9 && value.length != 12)
        return {
            valid: true,
            message: 'Nhập 9 đến 12 số CMND'
        }

    return false;
})

export {
    consoleLog
}
console.disableYellowBox = true;
startNetworkLogging();
AppRegistry.registerComponent(appName, () => MyApp);
