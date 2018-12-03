import _ from 'lodash';
import classnames from 'classnames';
import React, { Component } from 'react';
import { TableCell, Input, withStyles, FormControl, Typography } from '@material-ui/core';

import { CRUD, VALIDATE_TYPE } from '../../constants/common';

const styles = theme => ({
    root: {
        padding: '4px 16px 4px 8px'
    },
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

    componentWillReceiveProps(nextProps) {
        const { isEdit } = nextProps;

        const isEditable = isEdit === CRUD.UPDATE || isEdit === CRUD.CREATE;

        if (!isEditable) {
            this.setState(state => ({
                value: nextProps.value || ''
            }));
        }
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
        const { isEdit, classes } = this.props;

        const isEditable = isEdit === CRUD.UPDATE || isEdit === CRUD.CREATE;

        return (
            <TableCell className={classes.root}>
                <div className={this.props.widthClass}>
                    {isEditable &&
                        <FormControl fullWidth>
                            <Input
                                error={!this.state.value && this.props.required}
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