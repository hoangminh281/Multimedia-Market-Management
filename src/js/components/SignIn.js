import classnames from 'classnames';
import { compose } from 'recompose';
import { connect } from 'react-redux'
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Paper, Button, Typography, withStyles } from '@material-ui/core'

import { firebase, auth } from '../firebase';
import LinkText from './common/LinkText';
import FormTitle from './common/FormTitle';
import FormInput from './common/FormInput';
import * as routes from '../constants/routes';

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
};

const styles = theme => ({
    layout: {
        height: '100%',
        backgroundColor: theme.palette.primary.main
    },
    main: {
        width: '400px',
        margin: '0 auto',
        padding: theme.spacing.unit * 3,
        position: 'relative',
        top: '50%',
        transform: 'translate(0, -50%)',
        alignItems: 'center'
    },
    form: {
        width: '100%'
    },
    button: {
        marginTop: theme.spacing.unit * 2
    },
    inlineText: {
        display: 'inline-block',
        marginRight: '3px'
    },
    marginTop16: {
        marginTop: theme.spacing.unit * 2
    }
});

class SignInPage extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };

        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.authUser) {
            nextProps.history.push(routes.USER);
        }
    }

    handleChangeEmail(email) {
        this.setState({ email });
    }

    handleChangePassword(password) {
        this.setState({ password });
    }

    onSubmit = (event) => {
        event.preventDefault();

        const {
            email,
            password,
        } = this.state;

        const { history } = this.props;

        auth.doSignInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({ ...INITIAL_STATE });
                history.push(routes.USER);
            })
            .catch(error => {
                this.setState({ error });
            });
    }

    render() {
        const {
            error,
        } = this.state;

        const { classes } = this.props;

        return (
            <div className={classes.layout}>
                <Paper className={classes.main}>
                    <form className={classes.form} onSubmit={this.onSubmit}>
                        <FormTitle title="Sign in" />
                        <FormInput
                            label="Email Address"
                            id="email"
                            autoFocus
                            onChange={this.handleChangeEmail}
                            fullWidth
                            required
                        />
                        <FormInput
                            label="Password"
                            id="password"
                            type="password"
                            onChange={this.handleChangePassword}
                            fullWidth
                            required
                        />
                        <Button
                            type='submit'
                            fullWidth
                            color="primary"
                            variant='contained'
                            className={classes.button}
                        >
                            SIGN IN
                    </Button>
                        <LinkText
                            text="Forgot password"
                            className={classes.marginTop16}
                            route={routes.PASSWORD_FORGET}
                        />
                        <Typography className={classes.inlineText} variant="body2">Don't have an account?</Typography>
                        <LinkText
                            text="Sign up"
                            className={classnames(classes.marginTop16, classes.inlineText)}
                            route={routes.SIGN_UP}
                        />
                        {error && <Typography className={classes.marginTop16} color="error">{error.message}</Typography>}
                    </form >
                </Paper>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    authUser: state.sessionState.authUser
});

export default compose(
    withRouter,
    withStyles(styles),
    connect(mapStateToProps)
)(SignInPage);