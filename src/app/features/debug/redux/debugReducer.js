import LocalStorage from "../../../common/LocalStorage";

const initialState = {
    isActive: __DEV__,
    isShow: false,
    isShowTouchable: false,
    apis: [],
    navigationSteps: [],
    currentNavigation: null,
    initNavigation: {
        navigation: null,
    },
    userLogin: {},
}

export { initialState }

export default (state = initialState, action) => {
    switch (action.type) {
        case 'debugForceUpdate': {
            var _state = {
                ...state,
                ...action.obj
            }
            if (action.isSaveLocal) {
                var saved = {};
                [
                    'isActive',
                    'isShow',
                    'isShowTouchable',
                    'initNavigation',
                    'userLogin',
                    // 'apis',
                ].map(e => saved[e] = _state[e]);
                LocalStorage.setDebug(saved);
            }
            return _state
        }
        case 'debugAddApi': {
            return {
                ...state,
                apis: [
                    action.obj,
                    ...state.apis,
                ]
            }
        }
        case 'debugEditApi': {
            var apis = [...state.apis];
            var findIndex = apis.map((e, index) => e.id == action.obj.id ? index : null).filter(e => e != null)[0];

            apis[findIndex] = {
                ...apis[findIndex],
                ...action.obj
            }
            return {
                ...state,
                apis
            }
        }
        default:
            return state
    }
}