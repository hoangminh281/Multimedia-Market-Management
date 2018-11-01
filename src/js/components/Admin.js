import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import withAuthorization from './withAuthorization';

const AdminPage = (authUser) =>
    <div>
        <h1>Admin</h1>
        <p>Restricted area! Only users with the admin rule are authorized.</p>
    </div>

const mapStateToProps = (state) => ({
    authUser: state.sessionState.authUser,
})

const authCondition = (authUser) => !!authUser && authUser === 'ADMIN';

export default compose(
    withAuthorization(authCondition),
    connect(mapStateToProps, null),
)(AdminPage);