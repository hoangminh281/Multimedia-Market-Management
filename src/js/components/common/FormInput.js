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
            this.props.onChange(e.target.value);
        }
    }

    render() {
        return (
            <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor={this.props.id}>{this.props.label}</InputLabel>
                <Input
                    id={this.props.id}
                    autoFocus={this.props.autoFocus}
                    type={this.props.type}
                    onChange={this.handleChange}
                />
            </FormControl>
        );
    }
}

export default withStyles(styles)(FormInput);