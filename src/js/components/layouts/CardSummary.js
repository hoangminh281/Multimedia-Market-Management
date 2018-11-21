import classnames from 'classnames';
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Grid from "@material-ui/core/Grid";
import Paper from '@material-ui/core/Paper';
import FileCopyIcon from "@material-ui/icons/FileCopy";

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
    wrapper: {
        padding: '0 15px'
    },
    component: {
        display: 'flex'
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
                    <Paper className={classes.wrapper}>
                        <div className={classes.component}>
                            <CardIcon
                                className={classes.cardIconClasses}
                                color='warning'>
                                <FileCopyIcon className={classes.iconStyle} />
                            </CardIcon>
                            <div className={classes.cardContentClasses}>
                                <CardHeader className={classes.cardHeaderClasses} title='Used Space' />
                                <CardBody content={<div>49/50<small>GB</small></div>} />
                            </div>
                        </div>
                        <CardFooter className={classes.cardFooterClasses} content={<span>Get more space</span>} >
                            <FileCopyIcon />
                        </CardFooter>
                    </Paper>
                </Grid>
                <Grid className={classes.root} item xs={12} sm={6} md={3}>
                    <Paper className={classes.wrapper}>
                        <div className={classes.component}>
                            <CardIcon
                                className={classes.cardIconClasses}
                                color='success'>
                                <FileCopyIcon className={classes.iconStyle} />
                            </CardIcon>
                            <div className={classes.cardContentClasses}>
                                <CardHeader className={classes.cardHeaderClasses} title='Used Space' />
                                <CardBody content={<div>49/50<small>GB</small></div>} />
                            </div>
                        </div>
                        <CardFooter className={classes.cardFooterClasses} content={<span>Get more space</span>} >
                            <FileCopyIcon />
                        </CardFooter>
                    </Paper>
                </Grid>
                <Grid className={classes.root} item xs={12} sm={6} md={3}>
                    <Paper className={classes.wrapper}>
                        <div className={classes.component}>
                            <CardIcon
                                className={classes.cardIconClasses}
                                color='danger'>
                                <FileCopyIcon className={classes.iconStyle} />
                            </CardIcon>
                            <div className={classes.cardContentClasses}>
                                <CardHeader className={classes.cardHeaderClasses} title='Used Space' />
                                <CardBody content={<div>49/50<small>GB</small></div>} />
                            </div>
                        </div>
                        <CardFooter className={classes.cardFooterClasses} content={<span>Get more space</span>} >
                            <FileCopyIcon />
                        </CardFooter>
                    </Paper>
                </Grid>
                <Grid className={classes.root} item xs={12} sm={6} md={3}>
                    <Paper className={classes.wrapper}>
                        <div className={classes.component}>
                            <CardIcon
                                className={classes.cardIconClasses}
                                color='info'>
                                <FileCopyIcon className={classes.iconStyle} />
                            </CardIcon>
                            <div className={classes.cardContentClasses}>
                                <CardHeader className={classes.cardHeaderClasses} title='Used Space' />
                                <CardBody content={<div>49/50<small>GB</small></div>} />
                            </div>
                        </div>
                        <CardFooter className={classes.cardFooterClasses} content={<span>Get more space</span>} >
                            <FileCopyIcon />
                        </CardFooter>
                    </Paper>
                </Grid>
            </Grid >
        );
    }
}

export default withStyles(styles)(CardSummary);