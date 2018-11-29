import PropTypes from 'prop-types';
import classnames from 'classnames';
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';

const styles = {
    card: {
        display: 'inline-block'
    }
};

class MediaCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props;

        return (
            <Card
                className={classnames(this.props.className, classes.card, this.props.height)}
                key={this.props.id}
            >
                <CardActionArea>
                    <CardMedia
                        className={this.props.height}
                        image={this.props.image}
                    />
                </CardActionArea>
            </Card>
        );
    }
}

MediaCard.propTypes = {
    image: PropTypes.string.isRequired
}

export default withStyles(styles)(MediaCard);
