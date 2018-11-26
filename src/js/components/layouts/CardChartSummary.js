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

var Chartist = require("chartist");

const dailySalesChart = {
    data: {
        labels: ["M", "T", "W", "T", "F", "S", "S"],
        series: [[12, 17, 7, 17, 23, 18, 38]]
    },
    options: {
        lineSmooth: Chartist.Interpolation.cardinal({
            tension: 0
        }),
        low: 0,
        high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
        chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        }
    },
    // for animation
    animation: {
        draw: function (data) {
            if (data.type === "line" || data.type === "area") {
                data.element.animate({
                    d: {
                        begin: 600,
                        dur: 700,
                        from: data.path
                            .clone()
                            .scale(1, 0)
                            .translate(0, data.chartRect.height())
                            .stringify(),
                        to: data.path.clone().stringify(),
                        easing: Chartist.Svg.Easing.easeOutQuint
                    }
                });
            } else if (data.type === "point") {
                data.element.animate({
                    opacity: {
                        begin: (data.index + 1) * delays,
                        dur: durations,
                        from: 0,
                        to: 1,
                        easing: "ease"
                    }
                });
            }
        }
    }
};

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
            <Grid container>
                <Grid className={classes.root} item xs={12} sm={12} md={4}>
                    <Paper>
                        <div className={classes.component}>
                            <CardIcon
                                className={classes.cardIconClasses}
                                color='warning'
                            >
                                <ChartistGraph
                                    className="ct-chart"
                                    data={dailySalesChart.data}
                                    type="Line"
                                    options={dailySalesChart.options}
                                    listener={dailySalesChart.animation}
                                />
                            </CardIcon>
                            <div className={classes.cardContentClasses}>
                                <CardHeader className={classes.cardHeaderClasses} title='Used Space' />
                                <CardBody content={this.props.productCapacity} subContent='GB' />
                            </div>
                        </div>
                        <CardFooter
                            className={classes.cardFooterClasses}
                            // content={}
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