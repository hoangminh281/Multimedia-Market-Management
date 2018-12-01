import classnames from 'classnames'
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Grid from "@material-ui/core/Grid";
import ChartistGraph from "react-chartist";
import Paper from '@material-ui/core/Paper';
import Update from "@material-ui/icons/Update";

import CardIcon from '../common/card/CardIcon'
import CardBody from '../common/card/CardBody';
import CardFooter from '../common/card/CardFooter';
import CardHeader from '../common/card/CardHeader';

let Chartist = require("chartist");

var delays = 80,
    durations = 500;
var delays2 = 80,
    durations2 = 500;

const purchasedProductChart = {
    //for option
    option: {
        lineSmooth: Chartist.Interpolation.cardinal({
            tension: 0
        }),
        low: 0,
        // high: 0,
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

const rechargedHistoryChart = {
    options: {
        axisX: {
            showGrid: false
        },
        low: 0,
        // high: 1000,
        chartPadding: {
            top: 0,
            right: 5,
            bottom: 0,
            left: 0
        }
    },
    responsiveOptions: [
        [
            "screen and (max-width: 640px)",
            {
                seriesBarDistance: 5,
                axisX: {
                    labelInterpolationFnc: function (value) {
                        return value[0];
                    }
                }
            }
        ]
    ],
    animation: {
        draw: function (data) {
            if (data.type === "bar") {
                data.element.animate({
                    opacity: {
                        begin: (data.index + 1) * delays2,
                        dur: durations2,
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
        padding: '0 15px'
    },
    cardIconClasses: {
        marginTop: '-20px',
        padding: '15px'
    },
    iconStyle: {
        width: '56px',
        height: '56px',
        color: '#fff'
    },
    cardContentClasses: {
        width: '100%',
        textAlign: 'left',
        paddingTop: '10px',
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
    },
    chart: {
        '& .ct-series-a .ct-bar, .ct-series-a .ct-line, .ct-series-a .ct-point, .ct-series-a .ct-slice-donut': {
            stroke: 'white'
        },
        '& .ct-grids line, .ct-labels span': {
            color: 'white',
            opacity: '0.5'
        },
        '& .ct-grid': {
            stroke: 'white',
            strokeWidth: '0.5px'
        }
    }
});

class CardChartSummary extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props;

        return (
            <Grid container>
                <Grid className={classes.root} item xs={12} sm={12} md={6}>
                    <Paper>
                        <div className={classes.component}>
                            <CardIcon
                                className={classes.cardIconClasses}
                                color='success'
                            >
                                <ChartistGraph
                                    type="Line"
                                    className={classes.chart}
                                    data={this.props.purchasedProductStatistics}
                                    option={purchasedProductChart.option}
                                    listener={purchasedProductChart.animation}
                                />
                            </CardIcon>
                            <div className={classes.cardContentClasses}>
                                <CardBody content='' subContent='Purchased Products' />
                                <CardHeader title='Last' />
                            </div>
                        </div>
                        <CardFooter
                            className={classes.cardFooterClasses}
                            content={<span>updated 30 days ago</span>}
                        >
                            <Update className={classnames(classes.stateIconClasses, classes.nomalColorClasses)} />
                        </CardFooter>
                    </Paper>
                </Grid>
                <Grid className={classes.root} item xs={12} sm={12} md={6}>
                    <Paper>
                        <div className={classes.component}>
                            <CardIcon
                                className={classes.cardIconClasses}
                                color='warning'
                            >
                                <ChartistGraph
                                    type="Bar"
                                    className={classes.chart}
                                    data={this.props.rechargedHistoryStatistics}
                                    options={rechargedHistoryChart.options}
                                    responsiveOptions={rechargedHistoryChart.responsiveOptions}
                                    listener={rechargedHistoryChart.animation}
                                />
                            </CardIcon>
                            <div className={classes.cardContentClasses}>
                                <CardBody content='' subContent='Recharged Total' />
                                <CardHeader title='Last' />
                            </div>
                        </div>
                        <CardFooter
                            className={classes.cardFooterClasses}
                            content={<span>updated 30 days ago</span>}
                        >
                            <Update className={classnames(classes.stateIconClasses, classes.nomalColorClasses)} />
                        </CardFooter>
                    </Paper>
                </Grid>
            </Grid >
        );
    }
}

CardChartSummary.propTypes = {
    purchasedProductStatistics: PropTypes.object.isRequired,
    rechargedHistoryStatistics: PropTypes.object.isRequired
}

export default withStyles(styles)(CardChartSummary);