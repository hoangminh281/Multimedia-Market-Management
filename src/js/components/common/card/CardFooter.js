import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import { Typography } from '@material-ui/core';

const styles = theme => ({
    textInline: {
        color: '#9c27b0',
        fontSize: '12px'
    }
});

class CardFooter extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes, className } = this.props;

        return (
            <div className={className}>
                <Typography
                    className={classes.textInline}
                    noWrap
                >
                    Get more space
                </Typography>
            </div>
        );
    }
}

export default withStyles(styles)(CardFooter);