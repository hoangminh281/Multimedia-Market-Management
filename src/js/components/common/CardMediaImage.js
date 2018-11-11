import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';

const styles = {
    card: {
        width: '25%',
        display: 'inline-block'
    },
    media: {
        height: 100,
    },
};

class MediaCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props;
        return (
            <Card className={classes.card}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={this.props.image}
                    />
                </CardActionArea>
            </Card>
        );
    }
}

export default withStyles(styles)(MediaCard);