import classnames from 'classnames'
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Grid from "@material-ui/core/Grid";
import ChartistGraph from "react-chartist";
import Paper from '@material-ui/core/Paper';
import Warning from "@material-ui/icons/Warning";

import CardIcon from '../common/card/CardIcon'
import CardBody from '../common/card/CardBody';
import CardFooter from '../common/card/CardFooter';
import CardHeader from '../common/card/CardHeader';

let Chartist = require("chartist");

var lineChartData = {
    labels: [1, 2, 3, 4, 5, 6, 7, 8],
    series: [
        [5, 9, 7, 8, 5, 3, 5, 4]
    ]
}
var lineChartOptions = {
    low: 0,
    showArea: true
}

const styles = theme => ({
    root: {
        marginTop: theme.spacing.unit * 12,
        display: 'flex',
        flexDirection: 'column',
        padding: '0 15px',
        flexGrow: 1
    },
    component: {
        //display: 'flex',
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
        textAlign: 'left'
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
            <Grid container>
                <Grid className={classes.root} item xs={12} sm={12} md={4}>
                    <Paper>
                        <div className={classes.component}>
                            <CardIcon
                                className={classes.cardIconClasses}
                                color='success'
                            >
                                <ChartistGraph
                                    type="Line"
                                    data={lineChartData}
                                    options={lineChartOptions}
                                />
                            </CardIcon>
                            <div className={classes.cardContentClasses}>
                                <CardHeader className={classes.cardHeaderClasses} title='Used Space' />
                                <CardBody content={this.props.productCapacity} subContent='GB' />
                            </div>
                        </div>
                        <CardFooter
                            className={classes.cardFooterClasses}
                            content={<span>updated 4 minutes ago</span>}
                            color='warning'
                        >
                            <Warning className={classnames(classes.stateIconClasses, classes.dangerColorClasses)} />
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