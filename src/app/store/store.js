import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducer';
import saga from './saga';
import { createLogger } from 'redux-logger'

const sagaMiddleware = createSagaMiddleware();
let store = createStore(reducer, applyMiddleware(
    sagaMiddleware,
    // createLogger()
));

var dispatch = (action: Function) => {
    store.dispatch(action);
}

sagaMiddleware.run(saga);
export {
    store,
    dispatch
};

