import * as Action from './actionType';
export const onUpdateAvatar = (url:string, payload:any) => ({
    type: Action.UPDATE_AVATAR,
    url,
    payload
});

export const ResetState = () => ({
    type: Action.RESET_STATE_UPDATE_AVATAR,
});
