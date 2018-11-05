import React from "react";
import { render } from "react-dom";
import { Provider } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import store from './store';
import App from "./components/App";
require('../css/main.scss');

const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
    },
});

render(
    <MuiThemeProvider theme={theme}>
        <Provider store={store}>
            <App />
        </Provider>
    </MuiThemeProvider>,
    document.getElementById("app")
);