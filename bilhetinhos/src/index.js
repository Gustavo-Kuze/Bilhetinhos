import './main/components/base/css/index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './main/routes/Routes'
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import { saveState } from './main/redux/localStorage/'
import store from './main/redux/store'

store.subscribe(() => {
    saveState({
        user: store.getState().user,
        cached: store.getState().cached,
        notifications: store.getState().notifications
    })
})

ReactDOM.render(
    <Provider store={store}>
        <Routes />
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
