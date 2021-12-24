export interface LoginRequest {
  username: string;

  password: string;
}

export interface LoginSocialRequest {
  email: string;
  fullname: any;
  username: string;
  socialid: string;
  avatar: any;
  type_social: number;
  setDeviceID: string;
}

export interface ForgotRequest {
  email: string;
}
export interface RegisterRequest {
  phone: string;

  fullname: string;

  email: string;

  password: string;
}
export interface SendOTPRequest {
  userid: string;
  otp: string;
}
export interface ReSendOTPRequest {
  phone: string;
}
