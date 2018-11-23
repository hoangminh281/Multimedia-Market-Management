import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    contentClasses: {
        color: '#3C4858',
        display: 'inline-block'
    },
    subContentClasses: {
        color: '#777',
        display: 'inline-block'
    }
});

class CardBody extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                <Typography
                    className={classes.contentClasses}
                    variant='h4'
                    noWrap
                >
                    {this.props.content}
                </Typography>
                <Typography
                    className={classes.subContentClasses}
                    variant='h6'
                    noWrap
                >
                    {this.props.subContent}
                </Typography>
            </React.Fragment>
        );
    }
}

CardBody.propTypes = {
    content: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.number.isRequired]),
    subContent: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.number.isRequired])
};


export default withStyles(styles)(CardBody);