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
        fontSize: '12px',
        color: '#999999'
    },
    warningTextClasses: {
        color: '#9c27b0'
    }
});

class CardFooter extends Component {
    constructor(props) {
        super(props);
    }

    textInlineClasses = () => {
        const { classes, color } = this.props;

        return classnames(
            classes.textInline,
            {
                [classes[color + "TextClasses"]]: color
            }
        );
    }

    render() {
        const { classes, className, children } = this.props;
        
        return (
            <div className={classnames(classes.root, className)}>
                {children}
                <Typography
                    className={this.textInlineClasses()}
                    noWrap
                >
                    {this.props.content}
                </Typography>
            </div>
        );
    }
}

CardFooter.propTypes = {
    content: PropTypes.oneOfType([PropTypes.element.isRequired, PropTypes.string.isRequired])
};

export default withStyles(styles)(CardFooter);