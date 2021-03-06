import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import PersonIcon from '@material-ui/icons/Person';
import TheatersIcon from '@material-ui/icons/Theaters';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import DashboardIcon from "@material-ui/icons/Dashboard";

import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';

import { auth } from '../../firebase';
import Breadcrumb from '../layouts/Breadcrumb';
import AccountHeader from '../layouts/AccountHeader';
import * as routes from '../../constants/routes';
import { DRAWER_HEADER } from '../../constants/common';
import { AUTH_USER_SET, ANIMATION_SET } from '../../constants/action-types';

const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawerPaper: {
        position: 'fixed',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing.unit * 7,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing.unit * 9,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
    }
});

class MiniDrawer extends React.Component {
    constructor() {
        super();

        this.state = {
            open: false,
        };

        this.doSignOut = this.doSignOut.bind(this);
    }

    componentWillUpdate(nextProps, nextState) {
        if (this.state.open !== nextState.open) {
            nextProps.onSetAnimation();
        }
    }

    componentWillUnmount() {
        if (this.state.open) {
            this.props.onSetAnimation();
        }
    }

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    doSignOut() {
        this.props.onSetAuthUser(null);
        auth.doSignOut();
    }

    render() {
        const { classes, theme } = this.props;

        return (
            <div>
                <AppBar
                    position="fixed"
                    className={classNames(classes.appBar, {
                        [classes.appBarShift]: this.state.open,
                    })}
                >
                    <Toolbar disableGutters={!this.state.open}>
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={this.handleDrawerOpen}
                            className={classNames(classes.menuButton, {
                                [classes.hide]: this.state.open,
                            })}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            variant="h6"
                            color="inherit"
                            noWrap
                        >
                            Multimedia Market Management
                        </Typography>
                        <Breadcrumb />
                        <AccountHeader />
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
                    }}
                    open={this.state.open}
                >
                    <div className={classes.toolbar}>
                        <IconButton onClick={this.handleDrawerClose}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        <ListItem
                            button
                            onClick={(event) => (this.props.history.push(routes.DASHBOARD))}
                        >
                            <ListItemIcon><DashboardIcon /></ListItemIcon>
                            <ListItemText primary={DRAWER_HEADER.Dashboard} />
                        </ListItem>
                        <ListItem
                            button
                            onClick={(event) => (this.props.history.push(routes.USER))}
                        >
                            <ListItemIcon><PersonIcon /></ListItemIcon>
                            <ListItemText primary={DRAWER_HEADER.User} />
                        </ListItem>
                        <ListItem
                            button
                            onClick={(event) => (this.props.history.push(routes.PRODUCT))}
                        >
                            <ListItemIcon><TheatersIcon /></ListItemIcon>
                            <ListItemText primary={DRAWER_HEADER.Product} />
                        </ListItem>
                        <ListItem
                            button
                            onClick={(event) => (this.props.history.push(routes.CARD))}
                        >
                            <ListItemIcon><CreditCardIcon /></ListItemIcon>
                            <ListItemText primary={DRAWER_HEADER.Card} />
                        </ListItem>
                        <ListItem
                            button
                            onClick={(event) => (this.doSignOut())}
                        >
                            <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                            <ListItemText primary={DRAWER_HEADER.Sign_out} />
                        </ListItem>
                    </List>
                </Drawer>
            </div >
        );
    }
}

MiniDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
    onSetAuthUser: (authUser) => dispatch({ type: AUTH_USER_SET, authUser }),
    onSetAnimation: () => dispatch({ type: ANIMATION_SET })
});

export default compose(
    withRouter,
    withStyles(styles, { withTheme: true }),
    connect(null, mapDispatchToProps)
)(MiniDrawer);
