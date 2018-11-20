import classnames from 'classnames';
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import { Paper } from '@material-ui/core';

import CardHeader from './CardHeader';
import CardIcon from './CardIcon'
import CardBody from './CardBody';
import CardFooter from './CardFooter'

const styles = theme => ({
    root: {
        marginTop: theme.spacing.unit * 12,
        display: 'flex',
        flexDirection: 'column'
    },
    wrapper: {
        padding: '0 15px'
    },
    component: {
        display: 'flex',
    },
    cardIconClasses: {
        marginTop: '-20px',
        marginRight: '15px'
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
            <div className={classes.root}>
                <Paper className={classes.wrapper}>
                    <div className={classes.component}>
                        <CardIcon className={classes.cardIconClasses} />
                        <div>
                            <CardHeader className={classes.cardHeaderClasses} />
                            <CardBody />
                        </div>
                    </div>
                    <CardFooter className={classes.cardFooterClasses} />
                </Paper>
            </div>
        );
    }
}

export default withStyles(styles)(CardSummary);