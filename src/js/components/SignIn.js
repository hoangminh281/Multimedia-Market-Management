import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Paper, Typography, TextField, Button } from '@material-ui/core'

import { auth } from '../firebase';
import { SignUpLink } from './SignUp';
import * as routes from '../constants/routes';
import { PasswordForgetLink } from './PasswordForget';
import { SIGNIN_TEXTFIELD, SIGNIN_BUTTON } from '../common/InlineCSS';

const SignInPage = ({ history }) =>
    <div className="sign-in-page">
        <SignInForm history={history} />
    </div>

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
};

class SignInForm extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    onSubmit = (event) => {
        event.preventDefault();

        const {
            email,
            password,
        } = this.state;

        const { history, } = this.props;

        auth.doSignInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({ ...INITIAL_STATE });
                history.push(routes.HOME);
            })
            .catch(error => {
                this.setState(byPropKey('error', error));
            });
    }

    render() {
        const {
            email,
            password,
            error, } = this.state;

        const isInvalid =
            email === '' ||
            password === '';

        return (
            <Paper className="sign-in-paper">
                <form onSubmit={this.onSubmit}>
                    <Typography variant='display1' gutterBottom>
                        Login
                    </Typography>
                    <div>
                        <TextField
                            name='email'
                            label='Email Address'
                            value={email}
                            onChange={event => this.setState(byPropKey('email', event.target.value))}
                            margin='normal'
                            style={SIGNIN_TEXTFIELD}
                        />
                    </div>
                    <div>
                        <TextField
                            name='password'
                            label='Password'
                            type='password'
                            value={password}
                            onChange={event => this.setState(byPropKey('password', event.target.value))}
                            margin='normal'
                            style={SIGNIN_TEXTFIELD}
                        />
                    </div>
                    <div>
                        <Button
                            type='submit'
                            variant='contained'
                            style={SIGNIN_BUTTON}
                            disabled={isInvalid}
                        >
                            Sign In
                        </Button>
                    </div>
                    <PasswordForgetLink />
                    <SignUpLink />

                    {error && <p className="sign-in-error">{error.message}</p>}
                </form >
            </Paper >
        );
    }
}

export default withRouter(SignInPage);

export {
    SignInForm,
};