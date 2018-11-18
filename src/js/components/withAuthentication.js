import React from 'react';
import { connect } from 'react-redux';

import { firebase } from '../firebase';
import { AUTH_USER_SET } from '../constants/action-types';

const withAuthentication = (Component) => {
    class WithAuthentication extends React.Component {
        componentDidMount() {
            const { onSetAuthUser } = this.props;

            firebase.auth.onAuthStateChanged(authUser => {
                authUser
                    ? onSetAuthUser(authUser)
                    : onSetAuthUser(null);
            });
        }

        render() {
            return (
                <Component {...this.props} />
            );
        }
    }

    const mapDispatchToProps = (dispatch) => ({
        onSetAuthUser: (authUser) => dispatch({ type: AUTH_USER_SET, authUser }),
    });

    return connect(null, mapDispatchToProps)(WithAuthentication);
}

export default withAuthentication;