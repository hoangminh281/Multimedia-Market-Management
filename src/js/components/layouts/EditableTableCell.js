import _ from 'lodash';
import classnames from 'classnames';
import React, { Component } from 'react';
import { TableCell, Input, withStyles, FormControl, Typography } from '@material-ui/core';

import { CRUD, VALIDATE_TYPE } from '../../constants/common';

const styles = theme => ({
    fontSize13: {
        fontSize: '13px'
    }
});

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

        const { classes } = this.props;

        return (
            <TableCell>
                <div className={this.props.widthClass}>
                    {isEditable &&
                        <FormControl fullWidth>
                            <Input
                                error={validate}
                                onChange={this.handleOnChange}
                                value={this.state.value}
                                type={this.props.type}
                                onKeyPress={event => this.onKeyPress(event)}
                                className={classes.fontSize13}
                            />
                        </FormControl>
                    }

                    <Typography className={classes.fontSize13} noWrap>{!isEditable && this.props.value}</Typography>
                </div>
            </TableCell>
        );
    }
}

export default withStyles(styles)(EditableTableCell);