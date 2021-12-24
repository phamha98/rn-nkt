import {AlertDataType, DropdownAlertType} from 'react-native-dropdownalert';
export default class DropDownHolder {
  static dropDown;

  static setDropDown(dropDown) {
    this.dropDown = dropDown;
  }
  static alert(
    type: DropdownAlertType,
    title: string,
    message: string,
    callBack: () => void = null,
  ) {
    this.dropDown.alertWithType(type, title, message);
    callBack && callBack();
  }
  static showError(
    title: string,
    message: string,
    callBack: () => void = null,
  ) {
    this.dropDown.alertWithType('error', title, message);
    callBack && callBack();
  }
  static showSuccess(
    title: string,
    message: string,
    callBack: () => void = null,
  ) {
    this.dropDown.alertWithType('success', title, message);
    callBack && callBack();
  }
  static showWarning(
    title: string,
    message: string,
    callBack: () => void = null,
  ) {
    this.dropDown.alertWithType('warn', title, message);
    callBack && callBack();
  }
  static showInfo(title: string, message: string, callBack: () => void = null) {
    this.dropDown.alertWithType('info', title, message);
    callBack && callBack();
  }
}
