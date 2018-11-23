import classnames from 'classnames'
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Grid from "@material-ui/core/Grid";
import Paper from '@material-ui/core/Paper';
import Update from "@material-ui/icons/Update";
import Warning from "@material-ui/icons/Warning";
import Payment from "@material-ui/icons/Payment";
import RateReview from "@material-ui/icons/RateReview";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import LocalOffer from "@material-ui/icons/LocalOffer";
import PhoneIphone from "@material-ui/icons/PhoneIphone";
import Accessibility from "@material-ui/icons/Accessibility";

import CardHeader from '../common/card/CardHeader';
import CardIcon from '../common/card/CardIcon'
import CardBody from '../common/card/CardBody';
import CardFooter from '../common/card/CardFooter'

const styles = theme => ({
    root: {
        marginTop: theme.spacing.unit * 12,
        display: 'flex',
        flexDirection: 'column',
        padding: '0 15px',
        flexGrow: 1
    },
    component: {
        display: 'flex',
        padding: '0 15px'
    },
    cardIconClasses: {
        marginTop: '-20px',
        marginRight: '15px',
        padding: '15px'
    },
    iconStyle: {
        width: '56px',
        height: '56px',
        color: '#fff'
    },
    cardContentClasses: {
        width: '100%',
        textAlign: 'right'
    },
    cardHeaderClasses: {
        paddingTop: '10px'
    },
    cardFooterClasses: {
        margin: '20px 15px 10px 15px',
        paddingTop: '10px',
        borderTop: '1px solid #eee'
    },
    stateIconClasses: {
        width: '16px',
        height: '16px',
        margin: '0 3px'
    },
    nomalColorClasses: {
        color: '#999999'
    },
    dangerColorClasses: {
        color: '#f44336'
    }
});

class CardSummary extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        const { classes } = this.props;

        return (
            <Grid container spacing={24}>
                <Grid className={classes.root} item xs={12} sm={6} md={3}>
                    <Paper>
                        <div className={classes.component}>
                            <CardIcon
                                className={classes.cardIconClasses}
                                color='warning'>
                                <FileCopyIcon className={classes.iconStyle} />
                            </CardIcon>
                            <div className={classes.cardContentClasses}>
                                <CardHeader className={classes.cardHeaderClasses} title='Used Space' />
                                <CardBody content={this.props.productCapacity} subContent='GB' />
                            </div>
                        </div>
                        <CardFooter
                            className={classes.cardFooterClasses}
                            content={
                                <a
                                    target="_blank"
                                    href='https://console.firebase.google.com/u/0/project/fir-2-3605b/storage/fir-2-3605b.appspot.com/files'
                                    style={{ textDecoration: 'none' }}
                                >
                                    Get more space
                                </a>
                            }
                            color='warning'
                        >
                            <Warning className={classnames(classes.stateIconClasses, classes.dangerColorClasses)} />
                        </CardFooter>
                    </Paper>
                </Grid>
                <Grid className={classes.root} item xs={12} sm={6} md={3}>
                    <Paper>
                        <div className={classes.component}>
                            <CardIcon
                                className={classes.cardIconClasses}
                                color='success'>
                                <RateReview className={classes.iconStyle} />
                            </CardIcon>
                            <div className={classes.cardContentClasses}>
                                <CardHeader className={classes.cardHeaderClasses} title='Rating' />
                                <CardBody content={'~' + this.props.productRating} />
                            </div>
                        </div>
                        <CardFooter className={classes.cardFooterClasses} content={<span>Tracked from Firebase</span>} >
                            <LocalOffer className={classnames(classes.stateIconClasses, classes.nomalColorClasses)} />
                        </CardFooter>
                    </Paper>
                </Grid>
                <Grid className={classes.root} item xs={12} sm={6} md={3}>
                    <Paper>
                        <div className={classes.component}>
                            <CardIcon
                                className={classes.cardIconClasses}
                                color='danger'>
                                <Payment className={classes.iconStyle} />
                            </CardIcon>
                            <div className={classes.cardContentClasses}>
                                <CardHeader className={classes.cardHeaderClasses} title='Payment' />
                                <CardBody content={this.props.downloaded} subContent={this.props.subDownloaded} />
                            </div>
                        </div>
                        <CardFooter className={classes.cardFooterClasses} content={<span>Count on All users</span>} >
                            <PhoneIphone className={classnames(classes.stateIconClasses, classes.nomalColorClasses)} />
                        </CardFooter>
                    </Paper>
                </Grid>
                <Grid className={classes.root} item xs={12} sm={6} md={3}>
                    <Paper>
                        <div className={classes.component}>
                            <CardIcon
                                className={classes.cardIconClasses}
                                color='info'>
                                <Accessibility className={classes.iconStyle} />
                            </CardIcon>
                            <div className={classes.cardContentClasses}>
                                <CardHeader className={classes.cardHeaderClasses} title='Accounts' />
                                <CardBody content={this.props.activeAccount + '/' + this.props.totalAccount} subContent='Total' />
                            </div>
                        </div>
                        <CardFooter className={classes.cardFooterClasses} content={<span>Just Updated</span>} >
                            <Update className={classnames(classes.stateIconClasses, classes.nomalColorClasses)} />
                        </CardFooter>
                    </Paper>
                </Grid>
            </Grid >
        );
    }
}

CardSummary.propTypes = {
    productCapacity: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.number.isRequired]),
    productRating: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.number.isRequired]),
    downloaded: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.number.isRequired]),
    activeAccount: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.number.isRequired]),
    totalAccount: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.number.isRequired])
}

export default withStyles(styles)(CardSummary);