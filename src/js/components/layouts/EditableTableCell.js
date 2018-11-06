import _ from 'lodash';
import React, { Component } from 'react';
import { TableCell, TextField } from '@material-ui/core';

import { CRUD, VALIDATE_TYPE } from '../../constants/common';

class EditableTableCell extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: this.props.value,
        };

        this.handleOnChange = this.handleOnChange.bind(this);
    }

    componentWillReceiveProps() {
        this.setState({ value: this.props.value });
    }

    onKeyPress(event) {
        const keyCode = event.keyCode || event.which;
        switch (this.props.type) {
            case VALIDATE_TYPE.NUMBER:
                if ((keyCode < 48 || keyCode > 57 || keyCode === 101) && keyCode !== 46) {
                    event.preventDefault();
                }
                break;
            case VALIDATE_TYPE.PHONE:
                if (keyCode <= 47 || keyCode >= 57 || keyCode === 101) {
                    event.preventDefault();
                }
                break;
        }
    }

    handleOnChange(event) {
        this.setState({
            ...this.state,
            'value': event.target.value
        });
        this.props.handleOnChange(this.props.id, this.props.header, event.target.value);
    }

    render() {
        const { isEdit } = this.props;
        const validate = !this.state.value
            && this.props.type !== VALIDATE_TYPE.PHONE
            && this.props.type !== VALIDATE_TYPE.IMAGE;

        const isEditable = isEdit === CRUD.UPDATE || isEdit === CRUD.CREATE;

        return (
            <TableCell>
                {isEditable &&
                    <TextField
                        error={validate}
                        onChange={this.handleOnChange}
                        value={this.state.value}
                        type={this.props.type}
                        onKeyPress={event => this.onKeyPress(event)}
                    />}

                {!isEditable && this.props.value}
            </TableCell>
        );
    }
}

export default EditableTableCell;