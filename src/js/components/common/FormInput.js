import classnames from 'classnames';
import React, { Component } from 'react';
import { FormControl, InputLabel, Input, withStyles } from '@material-ui/core';

const styles = theme => ({
});

class FormInput extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        e.preventDefault();

        if (this.props.onChange) {
            this.props.onChange(e.target.value, this.props.id);
        }
    }

    render() {
        const { classes } = this.props;

        return (
            <FormControl
                margin="normal"
                required={this.props.required}
                fullWidth={this.props.fullWidth}
                className={this.props.rootClass}
            >
                <InputLabel htmlFor={this.props.id}>{this.props.label}</InputLabel>
                <Input
                    id={this.props.id}
                    defaultValue={this.props.defaultValue}
                    autoFocus={this.props.autoFocus}
                    type={this.props.type}
                    onChange={this.handleChange}
                    onKeyPress={this.props.onKeyPress}
                    multiline={this.props.multiline}
                    rowsMax={this.props.multiline ? "4" : "1"}
                    className={this.props.inputClass}
                />
            </FormControl>
        );
    }
}

export default withStyles(styles)(FormInput);