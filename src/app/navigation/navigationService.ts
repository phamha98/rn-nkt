import {NavigationActions, StackActions} from 'react-navigation';
export let _navigator: {
  dispatch: (
    arg0:
      | import('react-navigation').NavigationNavigateAction
      | import('react-navigation').NavigationBackAction
      | import('react-navigation').NavigationReplaceAction
      | import('react-navigation').NavigationToggleDrawerAction
  ) => void;
};

export function setTopLevelNavigator(navigatorRef: {
  dispatch: (
    arg0:
      | import('react-navigation').NavigationNavigateAction
      | import('react-navigation').NavigationBackAction
      | import('react-navigation').NavigationReplaceAction,
  ) => void;
}) {
  _navigator = navigatorRef;
}

export function navigate(routeName: string, params?: object) {
  _navigator?.dispatch(NavigationActions.navigate({routeName, params}));
}

export function goBack(key: string) {
  _navigator?.dispatch(NavigationActions.back({key: key}));
}

export function replaceScreen(routeName: string, params?: object) {
  _navigator?.dispatch(StackActions.replace({routeName, params}));
}
