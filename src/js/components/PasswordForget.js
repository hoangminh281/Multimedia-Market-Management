import classnames from 'classnames';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Paper, Typography, Button, withStyles } from '@material-ui/core'

import { auth } from '../firebase';
import * as routes from '../constants/routes';
import FormTitle from './common/FormTitle';
import FormInput from './common/FormInput';
import LinkText from './common/LinkText';

const PasswordForgetPage = ({ history, classes }) => <PasswordForgetForm history={history} classes={classes} />

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
    email: '',
    error: null,
}

class PasswordForgetForm extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };

        this.handleChangeEmail = this.handleChangeEmail.bind(this);
    }

    handleChangeEmail(email) {
        this.setState({ email });
    }

    onSubmit = (event) => {
        event.preventDefault();

        const { email } = this.state;
        const { history } = this.props;

        auth.doPasswordReset(email)
            .then(() => {
                this.setState({ ...INITIAL_STATE });
                history.push(routes.SIGN_IN);
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
                        <FormTitle title="Forgot password" />
                        <FormInput
                            label="Email Address"
                            id="email"
                            autoFocus
                            onChange={this.handleChangeEmail}
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
                            SEND PASSWORD
                        </Button>
                        <Typography className={classes.inlineText} variant="body2">Already remember your password?</Typography>
                        <LinkText
                            text="Sign in"
                            className={classnames(classes.marginTop16, classes.inlineText)}
                            route={routes.SIGN_IN}
                        />
                        {error && <Typography className={classes.marginTop16} color="error">{error.message}</Typography>}
                    </form >
                </Paper>
            </div>
        );
    }
}

export { PasswordForgetForm }

export default withRouter(withStyles(styles)(PasswordForgetPage));