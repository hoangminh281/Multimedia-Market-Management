import classnames from 'classnames';
import React, { Component } from 'react';
import { withStyles, Dialog, DialogTitle, Typography, FormLabel, FormControl, Button } from '@material-ui/core';

import FormInput from '../common/FormInput';
import CardMediaImage from '../common/CardMediaImage';

const styles = theme => ({
    dialogPaper: {
        width: '600px',
        padding: theme.spacing.unit * 3
    },
    dialogTitle: {
        textAlign: 'center'
    },
    marginRight5percent: {
        marginRight: theme.spacing.unit * 3
    },
    marginTop16: {
        marginTop: theme.spacing.unit * 2
    },
    inline: {
        display: 'inline-block'
    },
    readonlyTitle: {
        fontSize: '12px'
    },
    inputClass: {
        fontSize: '14px'
    },
    leftContent: {
        width: '45%',
        marginRight: '5%',
    },
    rightContent: {
        width: '45%',
        marginLeft: '5%',
    },
    button: {
        minWidth: theme.spacing.unit * 10,
        padding: theme.spacing.unit,
        marginLeft: theme.spacing.unit * 2
    },
    buttonGroup: {
        float: 'right',
        marginTop: theme.spacing.unit * 3
    }
});

class ProductDetailDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false
        }

        this.show = this.show.bind(this);
        this.close = this.close.bind(this);
    }

    show() {
        this.setState({
            open: true
        });
    }

    close() {
        this.setState({
            open: false
        });
    }

    render() {
        const { classes } = this.props;
        return (
            <Dialog
                classes={{ paper: classes.dialogPaper }}
                open={this.state.open}
                onClose={this.close}
            >
                <DialogTitle classes={{ root: classes.dialogTitle }}>{this.props.title}</DialogTitle>
                <form>
                    <div>
                        <FormInput
                            id="title"
                            label="Title"
                            required
                            rootClass={classes.leftContent}
                            inputClass={classes.inputClass}
                        />
                        <FormInput
                            id="price"
                            label="Price"
                            required
                            rootClass={classes.rightContent}
                            inputClass={classes.inputClass}
                        />
                    </div>
                    <div>
                        <FormInput
                            id="status"
                            label="Status"
                            required
                            rootClass={classes.leftContent}
                            inputClass={classes.inputClass}
                        />
                        <FormInput
                            id="category"
                            label="Category"
                            required
                            rootClass={classes.rightContent}
                            inputClass={classes.inputClass}
                        />
                    </div>
                    <div>
                        <FormInput
                            id="intro"
                            label="Intro"
                            required
                            rootClass={classes.leftContent}
                            inputClass={classes.inputClass}
                            multiline
                        />
                        <FormInput
                            id="description"
                            label="Description"
                            required
                            rootClass={classes.rightContent}
                            inputClass={classes.inputClass}
                            multiline
                        />
                    </div>
                    <div>
                        <FormInput
                            id="age"
                            label="Age"
                            required
                            rootClass={classes.leftContent}
                            inputClass={classes.inputClass}
                        />
                        <FormControl className={classnames(classes.rightContent, classes.marginTop16)}>
                            <FormLabel className={classes.readonlyTitle}>Rating</FormLabel>
                            <Typography>5</Typography>
                        </FormControl>
                    </div>
                    <div className={classes.marginTop16}>
                        <FormControl className={classes.leftContent}>
                            <FormLabel className={classes.readonlyTitle}>Capacity</FormLabel>
                            <Typography>116</Typography>
                        </FormControl>
                        <FormControl className={classes.rightContent}>
                            <FormLabel className={classes.readonlyTitle}>Downloaded</FormLabel>
                            <Typography>1000000</Typography>
                        </FormControl>
                    </div>
                    <div className={classes.buttonGroup}>
                        <Button type="submit" variant="contained" color="primary" className={classes.button}>
                            Save
                        </Button>
                        <Button variant="contained" color="primary" className={classes.button}>
                            Cancel
                        </Button>
                    </div>
                    <div className={classes.marginTop16}>
                        <CardMediaImage />
                    </div>
                </form>
            </Dialog>
        )
    }
}

export default withStyles(styles)(ProductDetailDialog);