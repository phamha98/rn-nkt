import * as Action from './actionType'
export const onGetDataXNKT = (url: string) => ({
    type: Action.GET_DATA_CAPGIAYXNKT,
    url
});

export const onResetDataXNKT = () => ({
    type: Action.RESET_DATA_CAPGIAYXNKT});

export const onGePostDataXNKT = (url: string, data: any) => ({
    type: Action.POST_CAPGIAYXNKT,
    url,
    data
});
