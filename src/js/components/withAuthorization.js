import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { firebase } from '../firebase';
import * as routes from '../constants/routes';

const withAuthorization = (authCondition) => (Component) => {
    class WithAuthorization extends React.Component {
        constructor(props) {
            super(props);
        }

        async componentDidMount() {
            firebase.auth.onAuthStateChanged(async authUser => {
                if (!authCondition(authUser)) {
                    this.props.history.push(routes.SIGN_IN);
                } else {
                    await setTimeout(() => {
                        if (!authCondition(this.props.authUser)) {
                            this.props.history.push(routes.SIGN_IN);
                        }
                    }, 2000);

                }
            });
        }

        componentWillReceiveProps(nextProps) {
            if (!nextProps.authUser) {
                this.props.history.push(routes.SIGN_IN);
            }
        }

        render() {
            return this.props.authUser ? <Component{...this.props} /> : null;
        }

    }
    const mapStateToProps = (state) => ({
        authUser: state.sessionState.authUser,
    });

    return compose(
        withRouter,
        connect(mapStateToProps, null),
    )(WithAuthorization);
}

export default withAuthorization;