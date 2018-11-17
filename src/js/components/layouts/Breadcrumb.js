import React, { Component } from 'react';
import { withStyles, Typography } from '@material-ui/core';

const styles = theme => ({
    arrowRight: {
        width: 0,
        height: 0,
        margin: '0 16px',
        borderTop: '8px solid transparent',
        borderBottom: '8px solid transparent',
        borderLeft: '8px solid #66A5AD'
    }
});

class Breadcrumb extends Component {
    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <div className={classes.arrowRight} />
                <Typography variant="h6" color="inherit" >
                    Product
                </Typography>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(Breadcrumb);
