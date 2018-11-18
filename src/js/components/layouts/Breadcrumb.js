import { compose } from 'recompose';
import { connect } from 'react-redux';
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
                    {this.props.currentPage}
                </Typography>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    currentPage: state.sessionState.currentPage
});

export default compose(
    withStyles(styles),
    connect(mapStateToProps)
)(Breadcrumb);
