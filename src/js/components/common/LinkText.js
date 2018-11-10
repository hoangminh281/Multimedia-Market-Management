import classnames from 'classnames';
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Typography, withStyles } from '@material-ui/core';

const styles = theme => ({
    text: {
        fontWeight: 'bold',
        '&:hover': {
            color: theme.palette.primary.dark
        }
    },
});

class FormTitle extends Component {
    constructor() {
        super();
    }

    render() {
        const { classes } = this.props;
        return (
            <Link to={this.props.route}>
                <Typography
                    className={classnames(this.props.className, classes.text)}
                    variant="body2"
                    color="primary"
                >
                    {_.startCase(this.props.text)}
                </Typography>
            </Link>
        );
    }
}

export default withRouter(withStyles(styles)(FormTitle));