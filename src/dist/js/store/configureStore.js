/**
 * @author happyhaha
 * Created on 2016-09-08 15:58
 */
import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import reducer from '../reducers'


export default (initialState = {}) => {
    let middleware = applyMiddleware(thunk);

    // if (__DEBUG__) {
        const devToolsExtension = window.devToolsExtension;

        if (typeof devToolsExtension === 'function') {
            middleware = compose(middleware, devToolsExtension());
        }
    // }

    const store = createStore(reducer,initialState, middleware);

    //热替换选项
    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextReducer = require('../reducers');
            store.replaceReducer(nextReducer)
        })
    }

    return store
};
