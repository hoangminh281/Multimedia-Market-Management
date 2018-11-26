import React from 'react';
import { connect } from 'react-redux';

import { firebase, db } from '../firebase';
import { AUTH_USER_SET } from '../constants/action-types';

const withAuthentication = (Component) => {
    class WithAuthentication extends React.Component {
        async componentDidMount() {
            const { onSetAuthUser } = this.props;

            firebase.auth.onAuthStateChanged(authUser => {
                if (authUser) {
                    db.user.onGetUser(authUser.uid, async (snapshot) => {
                        const user = snapshot.val();

                        if (user.role === 0 && user.status === 1) {
                            onSetAuthUser(authUser);
                        } else {
                            onSetAuthUser(null);
                        }
                    });
                } else {
                    onSetAuthUser(null);
                }
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