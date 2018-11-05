import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import SignOutButton from './SignOut';
import * as routes from '../constants/routes';
import TemporaryDrawer from './layouts/Drawer';

const Navigation = ({ authUser }) =>
    < div>
        {authUser
            ? <TemporaryDrawer />
            : null
        }
    </div >

const NavigationAuth = () =>
    <ul>
        <li><Link to={routes.LANDING}>Landing</Link></li>
        <li><Link to={routes.USER}>User</Link></li>
        <li><Link to={routes.ACCOUNT}>Account</Link></li>
        <li><SignOutButton /></li>
    </ul>

const mapStateToProps = (state) => ({
    authUser: state.sessionState.authUser,
});

export default connect(mapStateToProps, null)(Navigation);