import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    textInline: {
        fontSize: '14px',
        color: '#999999'
    }
});

class CardHeader extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes, className } = this.props;

        return (
            <div className={className}>
                <Typography
                    className={classes.textInline}
                    noWrap
                >
                    {this.props.title}
                </Typography>
            </div>
        );
    }
}

CardHeader.propTypes = {
    title: PropTypes.string.isRequired,
};

export default withStyles(styles)(CardHeader);