import React, { Suspense } from 'react';
import { useTranslation, withTranslation } from 'react-i18next';
import { StatusBar, View, YellowBox } from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { ProgressDialog } from './src/app/library/components';
import DropDownHolder from './src/app/library/utils/dropDownHolder';
import ProgressHolder from './src/app/library/utils/progressHolder/index';
import AppContainer from './src/app/navigation/index';
import { store } from './src/app/store/store';

let processDialog = null;
let loadingCount = 0;
export const toggleLoading = (_flag?: boolean, msg?: string) => {
  var flag;
  if (_flag == null) {
    flag = loadingCount > 0 ? false : true;
  }
  else {
    flag = _flag
  }

  loadingCount += flag ? 1 : -1;

  if (loadingCount == 1)
    processDialog?.toggle(true, msg);
  else if (loadingCount == 0)
    processDialog?.toggle(false);
}
const WrappedStack = () => {
  const { t } = useTranslation();
  YellowBox.ignoreWarnings(['Warning: ...']);

  return (
    <SafeAreaProvider>
      <AppContainer screenProps={{ t: t }} />
    </SafeAreaProvider>
  );
};
const ReloadAppOnLanguageChange = withTranslation('common', {
  bindI18n: 'languageChanged',
  bindStore: false,
  wait: true,
})(WrappedStack);

export const MyApp = (props: any) => {
  return (
    <>
      <StatusBar hidden={false} translucent={false}/>
      <Provider store={store}>
        <Suspense fallback={<View />}>
          <ReloadAppOnLanguageChange />
          <DropdownAlert
            updateStatusBar={false}
            ref={ref => DropDownHolder.setDropDown(ref)}
            closeInterval={2000}
          />
          <ProgressDialog ref={ref => (processDialog = ref, ProgressHolder.setProgress(ref))} />
        </Suspense>
      </Provider>
    </>
  );
};
