/**
 * @author happyhaha
 * Created on 2016-09-08 16:51
 */
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './components/Counter'
import configureStore from './store/configureStore'

const store = configureStore();

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('demo')
);
