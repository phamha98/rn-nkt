export interface ResponseError {
  data: any;

  status: number;

  header: any;
}

export interface ErrorAxios {
  response?: ResponseError;

  request?: any;

  message?: string;

  config: any;
}

export interface RequestBase<T> {
  url: string;
  data?: T;
}
export interface ActionBase<T> {
  url?: string;
  type: string;
  payload?: T;
}
export interface Action {
  type: string;
}
export interface ActionResponseBase<T> {
  type: string;
  payload: T;
}
