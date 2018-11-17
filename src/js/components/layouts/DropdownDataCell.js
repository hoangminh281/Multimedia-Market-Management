import React, { Component } from 'react';
import { TableCell, Select, MenuItem, withStyles } from '@material-ui/core';

import { CRUD } from '../../constants/common';

const styles = theme => ({
    fontSize13: {
        fontSize: '13px'
    }
});

class DropdownDataCell extends Component {
    constructor(props) {
        super(props);

        this.state = { selectedKey: this.props.value };

        this.handleOnChange = this.handleOnChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const { isEdit } = nextProps;

        const isEditable = isEdit === CRUD.UPDATE || isEdit === CRUD.CREATE;

        if (!isEditable) {
            this.setState(state => ({
                ...state,
                selectedKey: nextProps.value
            }));
        }
    }

    handleOnChange = event => {
        const key = Object.keys(this.props.values).find(key => (this.props.values[key] === event.target.value));
        this.setState({
            ...this.state,
            'selectedKey': key
        });
        this.props.handleOnChange(this.props.id, this.props.header, key);
    };

    render() {
        const { isEdit, values, classes } = this.props;

        const isEditable = isEdit === CRUD.UPDATE || isEdit === CRUD.CREATE;

        return (
            <TableCell>
                <div className={this.props.widthClass}>
                    {!!values && isEditable &&
                        <Select
                            value={values[this.state.selectedKey]}
                            onChange={this.handleOnChange}
                            className={classes.fontSize13}
                        >
                            {values.map((value, index) => (
                                <MenuItem
                                    value={value}
                                    key={index}
                                    disabled={values[this.state.selectedKey] === value}
                                    className={classes.fontSize13}
                                >
                                    {value}
                                </MenuItem>
                            ))}
                        </Select>}

                    {!!values && !isEditable && values[this.state.selectedKey]}
                </div>
            </TableCell >
        );
    }
}

export default withStyles(styles)(DropdownDataCell);