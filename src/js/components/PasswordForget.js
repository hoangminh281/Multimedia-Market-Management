import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Paper, Typography, TextField, Button } from '@material-ui/core'


import { auth } from '../firebase';
import * as routes from '../constants/routes';
import { PWFORGET_LINK, PWFORGET_TEXTFIELD, PWFORGET_BUTTON } from '../common/InlineCSS';

const PasswordForgetPage = ({ history }) =>
    <div className="pw-forget-page">
        <PasswordForgetForm history={history} />
    </div>

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
})

const INITIAL_STATE = {
    email: '',
    error: null,
}

class PasswordForgetForm extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    onSubmit = (event) => {
        event.preventDefault();

        const { email } = this.state;
        const { history, } = this.props;

        auth.doPasswordReset(email)
            .then(() => {
                this.setState({ ...INITIAL_STATE });
                history.push(routes.SIGN_IN);
            })
            .catch(error => {
                this.setState(byPropKey('error', error));
            });
    }

    render() {
        const {
            email,
            error,
        } = this.state;

        const isInvalid = email === '';

        return (
            <Paper className="pw-forget-paper">
                <form onSubmit={this.onSubmit}>
                    <Typography variant='display1' gutterBottom>
                        Password Forget
                    </Typography>
                    <div>
                        <TextField
                            name='email'
                            label='Email Address'
                            value={email}
                            onChange={event => this.setState(byPropKey('email', event.target.value))}
                            margin='normal'
                            style={PWFORGET_TEXTFIELD}
                        />
                    </div>
                    <div>
                        <Button
                            type='submit'
                            variant='contained'
                            style={PWFORGET_BUTTON}
                            disabled={isInvalid}
                        >
                            Reset my password
                        </Button>
                    </div>

                    {error && <p className="pw-forget-error">{error.message}</p>}
                </form >
            </Paper >
        );
    }
}

const PasswordForgetLink = () =>
    <div style={PWFORGET_LINK}>
        <Link to={routes.PASSWORD_FORGET}>Forgot Password?</Link>
    </div>

export default withRouter(PasswordForgetPage);

export {
    PasswordForgetForm,
    PasswordForgetLink,
}