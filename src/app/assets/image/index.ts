export const images = {
  logo: require('./source/logo.png'),
  tick_success: require('./source/tick_success.png'),
  default: require('./source/default.png'),
  default_ccv: require('./source/im_default_ccv.png'),
  default_vpcc: require('./source/im_default_vpcc.png'),
  personal: require('./source/personal.png'),
  business: require('./source/business.png'),
  shadow: require('./source/shadow.png'),
  bg_dotted: require('./source/background_dotted.png'),
  logo_login_white:require('./source/logo_login_white.png'),
};

export type ImageTypes = keyof typeof images;
