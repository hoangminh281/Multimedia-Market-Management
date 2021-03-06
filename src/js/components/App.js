import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Redirect,
} from 'react-router-dom';
import { withStyles } from '@material-ui/core'

import UserPage from './User';
import SignUpPage from './SignUp';
import SignInPage from './SignIn';
import ProductPage from './Product';
import DashboardPage from './Dashboard';
import CardPage from './Card';
import Navigation from './Navigation';
import PasswordForgetPage from './PasswordForget';
import withAuthentication from './withAuthentication';

import * as routes from '../constants/routes';

const styles = theme => ({
    layout: {
        display: 'flex'
    },
});

const App = ({ classes }) =>
    <Router>
        <React.Fragment>
            <div className={classes.layout}>
                <Navigation />

                <Route exact path={routes.LANDING} render={() => {
                    return (
                        <Redirect to={routes.DASHBOARD} />
                    )
                }} />

                <Route exact path={routes.DASHBOARD} component={DashboardPage} />
                <Route exact path={routes.USER} component={UserPage} />
                <Route exact path={routes.PRODUCT} component={ProductPage} />
                <Route exact path={routes.CARD} component={CardPage} />
            </div>

            <Route exact path={routes.SIGN_IN} component={SignInPage} />
            <Route exact path={routes.SIGN_UP} component={SignUpPage} />
            <Route exact path={routes.PASSWORD_FORGET} component={PasswordForgetPage} />
        </React.Fragment>
    </Router >

export default withAuthentication(withStyles(styles)(App));