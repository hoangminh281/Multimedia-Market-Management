import React, { Component } from 'react';
import { Select, MenuItem, FormControl, InputLabel, withStyles } from '@material-ui/core';

const styles = theme => ({
});

class DropdownSelection extends Component {
    constructor(props) {
        super(props);

        this.state = { selection: this.props.defaultValue };

        this.handleOnChange = this.handleOnChange.bind(this);
    }

    handleOnChange(e) {
        e.preventDefault();

        const { selections } = this.props;

        const key = Object.keys(selections).find(key => (selections[key] === e.target.value));

        this.setState({
            selection: key
        });

        if (this.props.onChange) {
            this.props.onChange(key, this.props.id);
        }
    };

    render() {
        const { selections, classes } = this.props;

        return (
            <FormControl
                margin="normal"
                required={this.props.required}
                fullWidth={this.props.fullWidth}
                className={this.props.rootClass}
            >
                <InputLabel htmlFor={this.props.id}>{this.props.label}</InputLabel>
                <Select
                    id={this.props.id}
                    value={selections[this.state.selection]}
                    onChange={this.handleOnChange}
                    className={this.props.inputClass}
                >
                    {Object.keys(selections).map((key, index) => (
                        <MenuItem
                            value={selections[key]}
                            key={index}
                            disabled={selections[this.state.selection] === selections[key]}
                            className={this.props.inputClass}
                        >
                            {selections[key]}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        );
    }
}

export default withStyles(styles)(DropdownSelection);