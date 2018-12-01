import { compose } from 'recompose';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { withStyles, Typography } from '@material-ui/core';

import CardMediaImage from '../common/CardMediaImage';
import { storage } from '../../firebase';

const styles = theme => ({
    root: {
        marginLeft: 'auto',
        display: 'flex',
        alignItems: 'center',
    },
    userAvatar: {
        borderRadius: '100%',
        width: '40px',
        margin: '0 16px'
    },
    height40: {
        height: '40px'
    }
});

class Breadcrumb extends Component {
    constructor(props) {
        super(props);

        this.state = {
            avatarUrl: 'null'
        }
    }

    componentDidMount() {
        storage.doGetUserDownloadURL(this.props.authUser.image).then(url => this.setState({ avatarUrl: url }));
    }

    componentWillReceiveProps(nextProps) {
        storage.doGetUserDownloadURL(nextProps.authUser.image).then(url => this.setState({ avatarUrl: url }));
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Typography
                    variant="h6"
                    color="inherit"
                    align='right'
                >
                    Hi, {this.props.authUser.name || this.props.authUser.email}
                </Typography>
                <CardMediaImage
                    className={classes.userAvatar}
                    height={classes.height40}
                    image={this.state.avatarUrl}
                />
            </div>
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
