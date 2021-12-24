export interface LoginResponse {
  id: string;

  username: number;

  token?: string;

  error?: string;

  status?: number;
}
export interface ForgotResponse {
  data: any;
}
export interface RegisterResponse {
  userid?: number;

  messager?: string;

  error?: string;

  status?: number;
}
export interface SendOtpResponse {
  error?: string;

  status?: number;
}
export interface ReSendOtpResponse {
  error?: string;

  status?: number;
}
