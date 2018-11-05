import _ from 'lodash';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Table, TableHead, TableRow, TableCell, TableBody, Button, IconButton } from '@material-ui/core';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import Save from '@material-ui/icons/Save';
import Cancel from '@material-ui/icons/Cancel';

import { db } from '../firebase';
import { CRUD } from '../constants/common';
import { USER_HEADER, USER_KEY, GENDER, STATUS, VALIDATE_TYPE } from '../constants/common';
import { USERS_SET, ROLES_SET } from '../constants/action-types';
import withAuthorization from './withAuthorization';
import DropdownDataCell from './layouts/DropdownDataCell'
import EditableTableCell from './layouts/EditableTableCell';
import DatePickerDataCell from './layouts/DatePickerDataCell';

const styles = theme => ({
    root: {
        overflowX: 'auto',
        marginTop: '64px'
    }
});

class UserPage extends Component {
    constructor() {
        super();

        this.state = {
            isEdit: {},
        };
        this.tempUsers = {};

        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleEditOrSave = this.handleEditOrSave.bind(this);
        this.handleDeleteOrCancel = this.handleDeleteOrCancel.bind(this);
    }

    componentDidMount() {
        const { onSetUsers, onSetRoles } = this.props;

        db.user.onGetUsers(snapshot => {
            onSetUsers(snapshot.val());

            db.role.onceGetRoles().then(snapshot => (
                onSetRoles(snapshot.val())
            ));
        });
    }

    handleEditOrSave(rowId) {
        const isEdit = this.state.isEdit[rowId];

        if (isEdit === CRUD.UPDATE) {
            const editedUser = {
                ...this.props.users[rowId],
                ...this.tempUsers[rowId],
            }
            console.log('edited');
            db.user.doCreateOrUpdateUser(
                editedUser.id,
                editedUser.name,
                editedUser.email,
                parseFloat(editedUser.balance),
                editedUser.birthday,
                editedUser.image,
                editedUser.phone,
                editedUser.role,
                editedUser.sex,
                editedUser.status,
            ).then(snapshot => {
            }).catch(err => {
                alert(err);
            });
            this.setState((state) => ({
                isEdit: { ...state.isEdit, [rowId]: CRUD.NONE }
            }));
            delete this.tempUsers[rowId];
        }
        else if (isEdit === CRUD.DELETE) {
            console.log('deleted')
            db.user.doDeleteUser(rowId).then(snapshot => {

            }).catch(err => {
                alert(err);
            });
            this.setState((state) => ({
                isEdit: { ...state.isEdit, [rowId]: CRUD.NONE }
            }));
        } else if (_.isUndefined(isEdit) || isEdit === CRUD.NONE) {
            console.log('edit')
            this.setState((state) => ({
                isEdit: { ...state.isEdit, [rowId]: CRUD.UPDATE }
            }));
        }
    }

    handleDeleteOrCancel(rowId) {
        const isDelete = this.state.isEdit[rowId];

        if (isDelete === CRUD.UPDATE || isDelete === CRUD.DELETE) {
            console.log('cancel')
            this.setState((state) => ({
                isEdit: { ...state.isEdit, [rowId]: CRUD.NONE }
            }));
        } else if (_.isUndefined(isDelete) || isDelete === CRUD.NONE) {
            console.log('delete')
            this.setState((state) => ({
                isEdit: { ...state.isEdit, [rowId]: CRUD.DELETE }
            }));
        }
    }

    handleOnChange(id, header, value) {
        this.tempUsers = {
            ...this.tempUsers,
            [id]: {
                ...this.tempUsers[id],
                [header]: value,
            }
        }
    }

    render() {
        const { classes, users, roles } = this.props;

        return (
            <Paper className={classes.root}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <GetTableHeader headers={USER_HEADER} />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <GetTableBody
                            users={users}
                            roles={roles}
                            isEdit={this.state.isEdit}
                            handleEditOrSave={this.handleEditOrSave}
                            handleDeleteOrCancel={this.handleDeleteOrCancel}
                            handleOnChange={this.handleOnChange}
                        />
                    </TableBody>
                </Table>
            </Paper>
        )
    }
}

const GetTableHeader = ({ headers }) => (
    headers.map((header, key) =>
        <TableCell key={key}>{header}</TableCell>
    )
)

const GetTableBody = ({
    users,
    roles,
    isEdit,
    handleEditOrSave,
    handleDeleteOrCancel,
    handleOnChange
}) => (
        Object.keys(users).map(key =>
            <TableRow key={users[key].id}>
                <TableCell>
                    <div className="cell">
                        <IconButton
                            className="button"
                            onClick={handleEditOrSave.bind(this, users[key].id)}
                        >
                            {!isEdit[users[key].id] || isEdit[users[key].id] === CRUD.NONE ? <Edit /> : <Save />}
                        </IconButton>
                        <IconButton
                            className="button"
                            onClick={handleDeleteOrCancel.bind(this, users[key].id)}
                        >
                            {!isEdit[users[key].id] || isEdit[users[key].id] == CRUD.NONE ? <Delete /> : <Cancel />}
                        </IconButton>
                    </div>
                </TableCell>
                <EditableTableCell
                    id={key}
                    header={USER_KEY[0]}
                    value={users[key].email}
                    isEdit={isEdit[users[key].id]}
                    handleOnChange={handleOnChange}
                />
                <EditableTableCell
                    id={key}
                    header={USER_KEY[1]}
                    value={users[key].name}
                    isEdit={isEdit[users[key].id]}
                    handleOnChange={handleOnChange}
                />
                <EditableTableCell
                    id={key}
                    header={USER_KEY[2]}
                    type={VALIDATE_TYPE.NUMBER}
                    value={users[key].balance}
                    isEdit={isEdit[users[key].id]}
                    handleOnChange={handleOnChange}
                />
                <DatePickerDataCell
                    id={key}
                    header={USER_KEY[3]}
                    value={users[key].birthday}
                    isEdit={isEdit[users[key].id]}
                    handleOnChange={handleOnChange}
                />
                <EditableTableCell
                    id={key}
                    header={USER_KEY[4]}
                    value={users[key].image}
                    isEdit={isEdit[users[key].id]}
                    handleOnChange={handleOnChange}
                />
                <EditableTableCell
                    id={key}
                    header={USER_KEY[5]}
                    value={users[key].phone}
                    type={VALIDATE_TYPE.PHONE}
                    isEdit={isEdit[users[key].id]}
                    handleOnChange={handleOnChange}
                />
                <DropdownDataCell
                    id={key}
                    values={roles}
                    header={USER_KEY[6]}
                    value={users[key].role}
                    isEdit={isEdit[users[key].id]}
                    handleOnChange={handleOnChange}
                />
                <DropdownDataCell
                    id={key}
                    values={GENDER}
                    header={USER_KEY[7]}
                    value={users[key].sex}
                    isEdit={isEdit[users[key].id]}
                    handleOnChange={handleOnChange}
                />
                <DropdownDataCell
                    id={key}
                    values={STATUS}
                    header={USER_KEY[8]}
                    value={users[key].status}
                    isEdit={isEdit[users[key].id]}
                    handleOnChange={handleOnChange}
                />
            </TableRow >
        )
    )

const mapStateToProps = (state) => ({
    users: state.userState.users,
    roles: state.roleState.roles,
});

const mapDispatchToProps = (dispatch) => ({
    onSetUsers: (users) => dispatch({ type: USERS_SET, users }),
    onSetRoles: (roles) => dispatch({ type: ROLES_SET, roles }),
});

const authCondition = (authUser) => !!authUser;

export default compose(
    withAuthorization(authCondition),
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
)(UserPage);