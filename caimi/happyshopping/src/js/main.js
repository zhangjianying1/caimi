import React from 'react'
import { render } from 'react-dom';
import {Router, browserHistory} from 'react-router';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import combineReducer from './reducers/reducer';
let store = createStore(combineReducer);
import routes from './config/routes';
render(<Provider store={store}><Router history={browserHistory} routes={routes} /></Provider>, document.getElementById('App'));

