import React, { Component } from 'react';
import { TableCell, Select, MenuItem } from '@material-ui/core';

import { CRUD } from '../../constants/common';

class DropdownDataCell extends Component {
    constructor(props) {
        super(props);

        this.state = { selectedKey: this.props.value };

        this.handleOnChange = this.handleOnChange.bind(this);
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
        const { isEdit, values } = this.props;

        return (
            <TableCell>
                {!!values && isEdit === CRUD.UPDATE &&
                    <Select
                        value={values[this.state.selectedKey]}
                        onChange={this.handleOnChange}
                        className="font-size-small"
                    >
                        {values.map((value, index) => (
                            <MenuItem
                                value={value}
                                key={index}
                                disabled={values[this.state.selectedKey] === value}
                            >
                                {value}
                            </MenuItem>
                        ))};
                    </Select>}

                {!!values && isEdit !== CRUD.UPDATE && values[this.state.selectedKey]}
            </TableCell >
        );
    }
}

export default DropdownDataCell;