import classnames from 'classnames';
import { compose } from 'recompose';
import { connect } from 'react-redux'
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Paper, Typography, Button, withStyles } from '@material-ui/core'

import { auth, db } from '../firebase';
import * as routes from '../constants/routes';
import FormTitle from './common/FormTitle';
import FormInput from './common/FormInput';
import LinkText from './common/LinkText';

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

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
}

class SignUpPage extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.authUser) {
            nextProps.history.push(routes.USER);
        }
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
                db.user.doCreateOrUpdateUser(authUser.user.uid, username, email, 0, "", "", "", 2, 2, 1)
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
        const { error } = this.state;

        const { classes } = this.props;

        return (
            <div className={classes.layout}>
                <Paper className={classes.main}>
                    <form className={classes.form} onSubmit={this.onSubmit}>
                        <FormTitle title="Sign up" />
                        <FormInput
                            label="Email Address"
                            id="email"
                            autoFocus
                            fullWidth
                            required
                        // onchange to do
                        />
                        <FormInput
                            label="Password"
                            id="password"
                            type="password"
                            fullWidth
                            required
                        // onchange to do
                        />
                        <FormInput
                            label="Confirm Password"
                            id="confirmPassword"
                            type="password"
                            fullWidth
                            required
                        // onchange to do
                        />
                        <Button
                            type='submit'
                            fullWidth
                            color="primary"
                            variant='contained'
                            className={classes.button}
                        >
                            SIGN UP
                    </Button>
                        <Typography className={classes.inlineText} variant="body2">Already have an account?</Typography>
                        <LinkText
                            text="Sign in"
                            className={classnames(classes.marginTop16, classes.inlineText)}
                            route={routes.SIGN_IN}
                        />
                        {error && <Typography className={classes.marginTop16} color="error">{error.message}</Typography>}
                    </form >
                </Paper >
            </div>
        )
    }
}

const mapStateToProps = state => ({
    authUser: state.sessionState.authUser,
});

export default compose(
    withRouter,
    withStyles(styles),
    connect(mapStateToProps)
)(SignUpPage);