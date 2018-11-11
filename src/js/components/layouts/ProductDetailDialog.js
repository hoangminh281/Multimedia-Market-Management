import classnames from 'classnames';
import React, { Component } from 'react';
import { withStyles, Dialog, DialogTitle, Typography, FormLabel, FormControl, Button } from '@material-ui/core';

import FormInput from '../common/FormInput';
import CardMediaImage from '../common/CardMediaImage';

import { db } from '../../firebase';

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
    },
    clear: {
        clear: 'both'
    }
});

class ProductDetailDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
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
        const { classes, product, productDetail } = this.props;

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
                            required
                            id="title"
                            label="Title"
                            defaultValue={product.title}
                            rootClass={classes.leftContent}
                            inputClass={classes.inputClass}
                        />
                        <FormInput
                            required
                            id="price"
                            label="Price"
                            defaultValue={product.price}
                            rootClass={classes.rightContent}
                            inputClass={classes.inputClass}
                        />
                    </div>
                    <div>
                        <FormInput
                            required
                            id="status"
                            label="Status"
                            defaultValue={product.status}
                            rootClass={classes.leftContent}
                            inputClass={classes.inputClass}
                        />
                        <FormInput
                            required
                            id="category"
                            label="Category"
                            defaultValue={product.cateId}
                            rootClass={classes.rightContent}
                            inputClass={classes.inputClass}
                        />
                    </div>
                    <div>
                        <FormInput
                            required
                            id="intro"
                            label="Intro"
                            defaultValue={productDetail.intro}
                            rootClass={classes.leftContent}
                            inputClass={classes.inputClass}
                            multiline
                        />
                        <FormInput
                            required
                            id="description"
                            label="Description"
                            defaultValue={productDetail.description}
                            rootClass={classes.rightContent}
                            inputClass={classes.inputClass}
                            multiline
                        />
                    </div>
                    <div>
                        <FormInput
                            required
                            id="age"
                            label="Age"
                            defaultValue={productDetail.ageLimit}
                            rootClass={classes.leftContent}
                            inputClass={classes.inputClass}
                        />
                        <FormControl className={classnames(classes.rightContent, classes.marginTop16)}>
                            <FormLabel className={classes.readonlyTitle}>Rating</FormLabel>
                            <Typography>{product.rating}</Typography>
                        </FormControl>
                    </div>
                    <div className={classes.marginTop16}>
                        <FormControl className={classes.leftContent}>
                            <FormLabel className={classes.readonlyTitle}>Capacity</FormLabel>
                            <Typography>{productDetail.capacity}</Typography>
                        </FormControl>
                        <FormControl className={classes.rightContent}>
                            <FormLabel className={classes.readonlyTitle}>Downloaded</FormLabel>
                            <Typography>{productDetail.downloaded}</Typography>
                        </FormControl>
                    </div>
                    <div className={classes.marginTop16}>
                        <CardMediaImage image="src/img/angry-birds-2.png" />
                        <CardMediaImage image="src/img/cashknight.png" />
                        <CardMediaImage image="src/img/dont-starve.png" />
                        <CardMediaImage image="src/img/ice-crush-2018.png" />
                    </div>
                    <div className={classes.buttonGroup}>
                        <Button type="submit" variant="contained" color="primary" className={classes.button}>
                            Save
                        </Button>
                        <Button variant="contained" color="primary" className={classes.button} onClick={() => this.close()}>
                            Cancel
                        </Button>
                    </div>
                    <div className={classes.clear}/>
                </form>
            </Dialog>
        )
    }
}

export default withStyles(styles)(ProductDetailDialog);