import React, { Component } from 'react';
import {
    Link,
    withRouter
} from 'react-router-dom';
import { Paper, Typography, TextField, Button } from '@material-ui/core'

import { auth, db } from '../firebase';
import * as routes from '../constants/routes';
import { SIGNIN_TEXTFIELD, SIGNIN_BUTTON } from '../common/InlineCSS';

const SignUpPage = ({ history }) =>
    <div>
        <h1>SignUp</h1>
        <SignUpForm history={history} />
    </div>

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
}

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

class SignUpForm extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    onSubmit = (event) => {
        const {
            username,
            email,
            passwordOne,
        } = this.state;

        const { history } = this.props;

        auth.doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
                db.user.doCreateOrUpdateUser(authUser.user.uid, username, email)
                    .then(() => {
                        this.setState({ ...INITIAL_STATE });
                        history.push(routes.USER);
                    })
                    .catch(error => {
                        this.setState(byPropKey('error', error));
                    });
            })
            .catch(error => {
                this.setState(byPropKey('error', error));
            });

        event.preventDefault();
    }

    render() {
        const {
            username,
            email,
            passwordOne,
            passwordTwo,
            error,
        } = this.state;

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            username === '';

        return (
            <Paper className="sign-in-paper">
                <form onSubmit={this.onSubmit}>
                    <Typography variant='display1' gutterBottom>
                        Sign Up
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
                            name='username'
                            label='Username'
                            value={username}
                            onChange={event => this.setState(byPropKey('username', event.target.value))}
                            margin='normal'
                            style={SIGNIN_TEXTFIELD}
                        />
                    </div>
                    <div>
                        <TextField
                            name='passwordOne'
                            label='Password'
                            type='password'
                            value={passwordOne}
                            onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
                            margin='normal'
                            style={SIGNIN_TEXTFIELD}
                        />
                    </div>
                    <div>
                        <TextField
                            name='passwordTwo'
                            label='Confirm Password'
                            type='password'
                            value={passwordTwo}
                            onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
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
                            Sign Up
                </Button>
                    </div>
                    <PasswordForgetLink />
                    <SignUpLink />

                    {error && <p className="sign-in-error">{error.message}</p>}
                </form >
            </Paper >
        )
    }
}

const SignUpLink = () =>
    <p>
        Don't have an account?
    {' '}
        <Link to={routes.SIGN_UP}>Sign Up</Link>
    </p>

export default withRouter(SignUpPage);

export {
    SignUpForm,
    SignUpLink,
}