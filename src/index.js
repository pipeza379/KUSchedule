import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import { createStore, applyMiddleware } from 'redux';
import { createStore } from 'redux';
// import logger from 'redux-logger'
import { Provider } from 'react-redux';
import reducer from './reducers';
import App from './App';
import * as serviceWorker from './serviceWorker';
const store = createStore(reducer)
// const store = createStore(reducer,applyMiddleware(logger))

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();