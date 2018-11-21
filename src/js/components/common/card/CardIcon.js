import PropTypes from "prop-types";
import classNames from 'classnames';
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';


import Paper from '@material-ui/core/Paper';

const styles = theme => ({
    root: {
        borderRadius: '3px',
        display: 'inline-block',
    },
    warningCardIcon: {
        background: "linear-gradient(to right bottom, #ffa726, #fb8c00)"
    },
    successCardIcon: {
        background: "linear-gradient(to right bottom, #66bb6a, #43a047)"
    },
    dangerCardIcon: {
        background: "linear-gradient(to right bottom, #ef5350, #e53935)"
    },
    infoCardIcon: {
        background: "linear-gradient(to right bottom, #26c6da, #00acc1)"
    },
    primaryCardIcon: {
        background: "linear-gradient(to right bottom, #ab47bc, #8e24aa)"
    },
    roseCardIcon: {
        background: "linear-gradient(to right bottom, #ec407a, #d81b60)"
    }
});


class CardIcon extends Component {
    constructor(props) {
        super(props);
    }

    cardIconClasses = () => {
        const { classes, className, color } = this.props;

        return classNames(
            classes.root,
            className,
            {
                [classes[color + "CardIcon"]]: color,
            }
        );
    }

    render() {
        const { children } = this.props;

        return (
            <Paper className={this.cardIconClasses()} elevation={2}>
                {children}
            </Paper >
        );
    }
}

CardIcon.propTypes = {
    color: PropTypes.oneOf([
        "warning",
        "success",
        "danger",
        "info",
        "primary",
        "rose"
    ])
};

export default withStyles(styles)(CardIcon);