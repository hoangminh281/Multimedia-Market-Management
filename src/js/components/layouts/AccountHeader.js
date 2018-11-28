import { compose } from 'recompose';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { withStyles, Typography } from '@material-ui/core';

import CardMediaImage from '../common/CardMediaImage';

const styles = theme => ({
    root: {
        width: '100%',
        marginLeft: '16px'
    },
    userAvatar: {
        borderRadius: '100%',
        width: '50px',
        height: '37px',
        margin: '0 16px'
    },
    height50: {
        height: 37
    }
});

class Breadcrumb extends Component {
    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <Typography
                    variant="h6"
                    color="inherit"
                    align='right'
                    className={classes.root}
                >
                    {this.props.authUser.name || this.props.authUser.email}
                </Typography>
                <CardMediaImage className={classes.userAvatar} image={"null"}/>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    authUser: state.sessionState.authUser,
});

export default compose(
    withStyles(styles),
    connect(mapStateToProps)
)(Breadcrumb);
