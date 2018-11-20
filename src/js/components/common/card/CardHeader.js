import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import { Typography } from '@material-ui/core';

const styles = theme => ({
    textInline: {
        fontSize: '14px',
        color: '#999999',
        textAlign: 'right'
    }
});

class CardHeader extends Component {
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
                    Used Space
                </Typography>
            </div>
        );
    }
}

export default withStyles(styles)(CardHeader);