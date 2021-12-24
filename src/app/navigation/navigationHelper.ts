import {navigate} from './navigationService';
import * as ScreenTypes from './screenTypes';
import { TERM_LAUNCH } from './screenTypes';

export function navigateToHome(params?: object) {
  navigate(ScreenTypes.AUTHORIZE, params);
}

export function navigateToLogin(params?: object) {
  // navigate(ScreenTypes.LOGIN, params);
  navigate(TERM_LAUNCH, {isGoToLogin: true});
}

export function navigateToSplash(params?: object) {
  navigate(ScreenTypes.SPLASH, params);
}
