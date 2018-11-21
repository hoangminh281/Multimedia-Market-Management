import PropTypes from 'prop-types';
import classnames from 'classnames';
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root: {
        display: 'flex'
    },
    textInline: {
        color: '#9c27b0',
        fontSize: '12px'
    }
});

class CardFooter extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes, className, children } = this.props;

        return (
            <div className={classnames(classes.root, className)}>
                {children}
                <Typography
                    className={classes.textInline}
                    noWrap
                >
                    {this.props.content}
                </Typography>
            </div>
        );
    }
}

CardFooter.propTypes = {
    content: PropTypes.element.isRequired,
};

export default withStyles(styles)(CardFooter);