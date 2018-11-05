import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Redirect,
} from 'react-router-dom';

import UserPage from './User';
import SignUpPage from './SignUp';
import SignInPage from './SignIn';
import LandingPage from './Landing';
import AccountPage from './Account';
import Navigation from './Navigation';
import PasswordForgetPage from './PasswordForget';

import * as routes from '../constants/routes';
import withAuthentication from './withAuthentication';

const App = () =>
    <Router>
        <div className="app-root">
            <Navigation />
            
            <Route exact path="/" render={(authUser) => (
                authUser ?
                    (
                        <Redirect to={routes.USER} />
                    ) : (
                        <Redirect to={routes.SIGN_IN} />
                    )
            )} />
            <Route exact path={routes.SIGN_UP} component={SignUpPage} />
            <Route exact path={routes.SIGN_IN} component={SignInPage} />
            <Route exact path={routes.PASSWORD_FORGET} component={PasswordForgetPage} />
            <Route exact path={routes.USER} component={UserPage} />
            <Route exact path={routes.ACCOUNT} component={AccountPage} />
        </div>
    </Router>

export default withAuthentication(App);