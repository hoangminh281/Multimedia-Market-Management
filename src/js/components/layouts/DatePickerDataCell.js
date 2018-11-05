import React, { Component } from 'react';
import { TableCell, TextField } from '@material-ui/core';
import moment from 'moment';

import { CRUD } from '../../constants/common';

class DatePickerDataCell extends Component {
    constructor(props) {
        super(props);

        this.state = { selectedDate: this.props.value };

        this.handleOnChange = this.handleOnChange.bind(this);
    }

    handleOnChange = event => {
        const selectedDate = event.target.value;
        this.setState({
            ...this.state,
            'selectedDate': selectedDate
        });
        this.props.handleOnChange(this.props.id, this.props.header, moment(selectedDate, 'YYYY-MM-DD').format('DD/MM/YYYY'));
    };

    render() {
        const { isEdit } = this.props;

        return (
            <TableCell>
                {isEdit === CRUD.UPDATE &&
                    <TextField
                        type="date"
                        onChange={this.handleOnChange}
                        defaultValue={moment(this.state.selectedDate, ['DD/MM/YYYY', 'YYYY-MM-DD']).format('YYYY-MM-DD')}
                    />}
                {isEdit !== CRUD.UPDATE && this.props.value}
            </TableCell>
        );
    }
}

export default DatePickerDataCell;