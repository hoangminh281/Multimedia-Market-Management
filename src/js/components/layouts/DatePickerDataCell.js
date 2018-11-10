import React, { Component } from 'react';
import { TableCell, TextField } from '@material-ui/core';
import moment from 'moment';

import { CRUD } from '../../constants/common';

const styles = theme => ({
    fontSize13: {
        fontSize: '13px'
    }
});

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

        const isEditable = isEdit === CRUD.UPDATE || isEdit === CRUD.CREATE;

        const { classes } = this.props;

        return (
            <TableCell>
                {isEditable &&
                    <TextField
                        type="date"
                        onChange={this.handleOnChange}
                        defaultValue={moment(this.state.selectedDate, ['DD/MM/YYYY', 'YYYY-MM-DD']).format('YYYY-MM-DD')}
                    />}
                {isEditable && this.props.value}
            </TableCell>
        );
    }
}

export default DatePickerDataCell;