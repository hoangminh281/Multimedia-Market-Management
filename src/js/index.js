import React from "react";
import { render } from "react-dom";
import App from "./components/App";
import { Provider } from 'react-redux';
import store from './store';
require('../css/main.scss');

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("app")
);