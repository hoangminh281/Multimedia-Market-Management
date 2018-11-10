import React, { Component } from 'react';
import { Typography, withStyles } from '@material-ui/core';

const styles = theme => ({
    title: {
        textAlign: 'center',
    },
});

class FormTitle extends Component {
    constructor() {
        super();
    }

    render() {
        const { classes } = this.props;
        return (
            <Typography className={classes.title} variant="h4" color="primary">
                {_.startCase(this.props.title)}
            </Typography>
        )
    }
}

export default withStyles(styles)(FormTitle);