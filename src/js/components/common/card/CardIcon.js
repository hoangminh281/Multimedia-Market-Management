import classNames from 'classnames';
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import { Paper } from '@material-ui/core';
import FileCopyIcon from "@material-ui/icons/FileCopy";

const styles = theme => ({
    root: {
        background: 'linear-gradient(to right bottom, #ffa726, #fb8c00)',
        borderRadius: '3px',
        padding: '15px',
        display: 'inline-block'
    },
    iconStyle: {
        width: '56px',
        height: '56px',
        color: '#fff'
    }
});

class CardIcon extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes, className } = this.props;

        return (
            <Paper className={classNames(classes.root, className)} >
                <FileCopyIcon className={classes.iconStyle} />
            </Paper >
        );
    }
}

export default withStyles(styles)(CardIcon);