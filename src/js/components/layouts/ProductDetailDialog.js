import classnames from 'classnames';
import React, { Component } from 'react';
import { withStyles, Dialog, DialogTitle, Typography, FormLabel, FormControl, Button } from '@material-ui/core';

import FormInput from '../common/FormInput';
import CardMediaImage from '../common/CardMediaImage';
import DropdownSelection from '../common/DropdownSelection';

import { STATUS_OBJECT } from '../../constants/common';

const styles = theme => ({
    dialogPaper: {
        width: '600px',
        padding: theme.spacing.unit * 3
    },
    avatar: {
        margin: '0 auto',
        borderRadius: '100%'
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
    },
    center: {
        textAlign: 'center'
    },
    height100: {
        height: 100
    }
});

class ProductDetailDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
        };

        this.show = this.show.bind(this);
        this.close = this.close.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onAgeKeyPress = this.onAgeKeyPress.bind(this);
        this.onNumberKeyPress = this.onNumberKeyPress.bind(this);
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

    onChange(value, key) {
        if (this.props.onChange) {
            this.props.onChange(value, key);
        }
    }

    onNumberKeyPress(event) {
        const keyCode = event.keyCode || event.which;
        if ((keyCode < 48 || keyCode > 57 || keyCode === 101) && keyCode !== 46) {
            event.preventDefault();
        }
    }

    onAgeKeyPress(event) {
        const keyCode = event.keyCode || event.which;
        if (keyCode < 48 || keyCode > 57 || keyCode === 101) {
            event.preventDefault();
        }
    }

    render() {
        const { classes, product, productDetail, category, imageUrls } = this.props;

        return (
            <Dialog
                classes={{ paper: classes.dialogPaper }}
                open={this.state.open}
                onClose={this.close}
            >
                <div className={classes.center}>
                    <CardMediaImage className={classnames(classes.avatar, classes.height100)} image={this.props.avatarUrl || "null"} />
                </div>
                <form onSubmit={this.props.handleSave}>
                    <div>
                        <FormInput
                            required
                            id="title"
                            label="Title"
                            defaultValue={product.title}
                            rootClass={classes.leftContent}
                            inputClass={classes.inputClass}
                            onChange={this.onChange}
                        />
                        <FormInput
                            required
                            id="price"
                            label="Price"
                            onKeyPress={this.onNumberKeyPress}
                            defaultValue={product.price}
                            rootClass={classes.rightContent}
                            inputClass={classes.inputClass}
                            onChange={this.onChange}
                        />
                    </div>
                    <div>
                        <DropdownSelection
                            required
                            id="status"
                            label="Status"
                            rootClass={classes.leftContent}
                            inputClass={classes.inputClass}
                            selections={STATUS_OBJECT}
                            defaultValue={product.status}
                            onChange={this.onChange}
                        />
                        <DropdownSelection
                            required
                            id="cateId"
                            label="Category"
                            rootClass={classes.rightContent}
                            inputClass={classes.inputClass}
                            selections={category}
                            defaultValue={product.cateId}
                            onChange={this.onChange}
                        />
                    </div>
                    <div>
                        <FormInput
                            required
                            multiline
                            id="intro"
                            label="Intro"
                            defaultValue={productDetail.intro}
                            rootClass={classes.leftContent}
                            inputClass={classes.inputClass}
                            onChange={this.onChange}
                        />
                        <FormInput
                            required
                            multiline
                            id="description"
                            label="Description"
                            defaultValue={productDetail.description}
                            rootClass={classes.rightContent}
                            inputClass={classes.inputClass}
                            onChange={this.onChange}
                        />
                    </div>
                    <div>
                        <FormInput
                            id="ageLimit"
                            label="AgeLimit"
                            onKeyPress={this.onAgeKeyPress}
                            defaultValue={productDetail.ageLimit}
                            rootClass={classes.leftContent}
                            inputClass={classes.inputClass}
                            onChange={this.onChange}
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
                        {imageUrls.map((url, index) => (
                            <CardMediaImage className={classes.height100} key={index} image={url || "null"} />
                        ))}
                    </div>
                    <div className={classes.buttonGroup}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.button}
                        >
                            Save
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            onClick={this.close}
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </Dialog>
        )
    }
}

export default withStyles(styles)(ProductDetailDialog);