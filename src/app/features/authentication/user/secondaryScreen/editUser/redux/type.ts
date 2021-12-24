
export interface EditUserState {
  code: number;
  loading: boolean;
  msg: string;
  status: boolean,
  error: boolean,

}

export type EditUserActionTypes =
  | EditUserState;
