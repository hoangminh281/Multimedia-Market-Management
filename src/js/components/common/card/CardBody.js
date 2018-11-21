import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    textInline: {
        color: '#3C4858'
    }
});

class CardBody extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props;

        return (
            <Typography
                className={classes.textInline}
                variant="h4"
                noWrap
            >{this.props.content}
            </Typography>
        );
    }
}

CardBody.propTypes = {
    content: PropTypes.element.isRequired,
};


export default withStyles(styles)(CardBody);