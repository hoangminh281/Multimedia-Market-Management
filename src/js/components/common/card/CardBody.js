import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import { Typography } from '@material-ui/core';

const styles = theme => ({
    textInline: {
        color: '#3C4858',
    }
});

class CardBody extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <Typography
                    className={classes.textInline}
                    variant="h4"
                    noWrap
                >49/50 <small>GB</small>
                </Typography>
            </div>
        );
    }
}

export default withStyles(styles)(CardBody);