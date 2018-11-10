import React from 'react';
import { connect } from 'react-redux';

import TemporaryDrawer from './layouts/Drawer';

const Navigation = ({ authUser }) =>
    <React.Fragment>
        {authUser
            ? <TemporaryDrawer />
            : null
        }
    </React.Fragment>

const mapStateToProps = (state) => ({
    authUser: state.sessionState.authUser,
});

export default connect(mapStateToProps, null)(Navigation);