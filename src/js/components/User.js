import _ from 'lodash';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import React, { Component } from 'react';

import Edit from '@material-ui/icons/Edit';
import Save from '@material-ui/icons/Save';
import Delete from '@material-ui/icons/Delete';
import Cancel from '@material-ui/icons/Cancel';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Table, TableHead, TableRow, TableCell, TableBody, Button, IconButton } from '@material-ui/core';

import { db, auth } from '../firebase';
import withAuthorization from './withAuthorization';
import DropdownDataCell from './layouts/DropdownDataCell'
import EditableTableCell from './layouts/EditableTableCell';
import DatePickerDataCell from './layouts/DatePickerDataCell';
import { USERS_SET, ROLES_SET, USER_SET, USER_REMOVE } from '../constants/action-types';
import { CRUD, USER_HEADER, USER_KEY, GENDER, STATUS, VALIDATE_TYPE, PASSWORD_DEFAULT } from '../constants/common';

const styles = theme => ({
    root: {
        overflowX: 'auto',
        marginTop: theme.spacing.unit * 8
    },
    cellButton: {
        width: '100px'
    },
    button: {
        display: 'inline-block'
    },
    width200: {
        width: '200px'
    },
    width150: {
        width: '150px'
    },
    width125: {
        width: '125px'
    },
    width100: {
        width: '100px'
    },
    width75: {
        width: '75px'
    },
    width60: {
        width: '60px'
    },
});

class UserPage extends Component {
    constructor() {
        super();

        this.state = {
            isEdit: {},
        };
        this.tempUsers = {};

        this.handleNew = this.handleNew.bind(this);
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

    handleNew() {
        const { onSetUser } = this.props;

        const userKey = db.user.onCreateUserKey();

        const emptyUser = {
            [userKey]: {
                id: userKey,
                email: "",
                name: "",
                balance: "",
                birthday: "",
                image: "",
                phone: "",
                role: 2,
                sex: 0,
                status: 1
            }
        };

        onSetUser(emptyUser);

        this.setState((state) => ({
            isEdit: { ...state.isEdit, [userKey]: CRUD.CREATE }
        }));
    }

    handleEditOrSave(rowId) {
        const isEdit = this.state.isEdit[rowId];

        if (isEdit === CRUD.UPDATE || isEdit === CRUD.CREATE) {
            const editedUser = {
                ...this.props.users[rowId],
                ...this.tempUsers[rowId],
            }

            let validate = editedUser.email && editedUser.name && editedUser.balance;

            console.log('edited');
            if (!validate) return;

            let task = Promise.resolve();

            if (isEdit === CRUD.CREATE) {
                task = auth.doCreateUserWithEmailAndPassword(editedUser.email, PASSWORD_DEFAULT)
                    .then(authUser => {
                        return authUser;
                    })
                    .catch(err => {
                        return Promise.reject(err);
                    });
            }
            task.then(authUser => {
                db.user.doCreateOrUpdateUser(
                    authUser ? authUser.user.uid : editedUser.id,
                    editedUser.name,
                    editedUser.email,
                    parseFloat(editedUser.balance),
                    editedUser.birthday,
                    editedUser.image,
                    editedUser.phone,
                    editedUser.role,
                    editedUser.sex,
                    parseInt(editedUser.status),
                ).then(snapshot => {
                    alert("Created/Updated successfully")
                }, (err) => {
                    alert(err);
                });
                this.setState((state) => ({
                    isEdit: { ...state.isEdit, [rowId]: CRUD.NONE }
                }));
                delete this.tempUsers[rowId];
            }).catch(err => {
                alert(err);
            });
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
            delete this.tempUsers[rowId];
        } else if (_.isUndefined(isEdit) || isEdit === CRUD.NONE) {
            console.log('edit')

            this.setState((state) => ({
                isEdit: { ...state.isEdit, [rowId]: CRUD.UPDATE }
            }));
        }
    }

    handleDeleteOrCancel(rowId) {
        const { onDeleteUser } = this.props;
        const isDelete = this.state.isEdit[rowId];

        if (isDelete === CRUD.UPDATE || isDelete === CRUD.DELETE) {
            console.log('cancel')

            this.setState((state) => ({
                isEdit: { ...state.isEdit, [rowId]: CRUD.NONE }
            }));
            delete this.tempUsers[rowId];
        } else if (_.isUndefined(isDelete) || isDelete === CRUD.NONE) {
            console.log('delete')

            this.setState((state) => ({
                isEdit: { ...state.isEdit, [rowId]: CRUD.DELETE }
            }));
        } else if (isDelete === CRUD.CREATE) {
            delete this.tempUsers[rowId];
            this.setState((state) => ({
                isEdit: { ...state.isEdit, [rowId]: undefined }
            }));
            onDeleteUser(rowId);
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
                            <TableCell>
                                <Button
                                    color="primary"
                                    className={classes.button}
                                    onClick={this.handleNew}
                                >
                                    NEW
                                </Button>
                            </TableCell>
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
                            classes={classes}
                        />
                    </TableBody>
                </Table>
            </Paper>
        )
    }
}

const GetTableHeader = ({ headers }) => (
    headers.map((header, index) =>
        <TableCell key={index}>{header}</TableCell>
    )
)

const GetTableBody = ({
    users,
    roles,
    isEdit,
    handleEditOrSave,
    handleDeleteOrCancel,
    handleOnChange,
    classes
}) => (
        Object.keys(users).map(key =>
            <TableRow key={key}>
                <TableCell>
                    <div className={classes.cellButton}>
                        <IconButton
                            className={classes.button}
                            onClick={handleEditOrSave.bind(this, key)}
                        >
                            {!isEdit[key] || isEdit[key] === CRUD.NONE ? <Edit /> : <Save />}
                        </IconButton>
                        <IconButton
                            className={classes.button}
                            onClick={handleDeleteOrCancel.bind(this, key)}
                        >
                            {!isEdit[key] || isEdit[key] == CRUD.NONE ? <Delete /> : <Cancel />}
                        </IconButton>
                    </div>
                </TableCell>
                <EditableTableCell
                    id={key}
                    header={USER_KEY[0]}
                    type={VALIDATE_TYPE.EMAIL}
                    value={users[key].email}
                    isEdit={isEdit[key]}
                    handleOnChange={handleOnChange}
                    widthClass={classes.width200}
                />
                <EditableTableCell
                    id={key}
                    header={USER_KEY[1]}
                    value={users[key].name}
                    isEdit={isEdit[key]}
                    handleOnChange={handleOnChange}
                    widthClass={classes.width100}
                />
                <EditableTableCell
                    id={key}
                    header={USER_KEY[2]}
                    type={VALIDATE_TYPE.NUMBER}
                    value={users[key].balance}
                    isEdit={isEdit[key]}
                    handleOnChange={handleOnChange}
                    widthClass={classes.width75}
                />
                <DatePickerDataCell
                    id={key}
                    header={USER_KEY[3]}
                    value={users[key].birthday}
                    isEdit={isEdit[key]}
                    handleOnChange={handleOnChange}
                    widthClass={classes.width125}
                />
                <EditableTableCell
                    id={key}
                    header={USER_KEY[4]}
                    value={users[key].image}
                    //type={VALIDATE_TYPE.IMAGE}
                    isEdit={isEdit[key]}
                    handleOnChange={handleOnChange}
                    widthClass={classes.width150}
                />
                <EditableTableCell
                    id={key}
                    header={USER_KEY[5]}
                    value={users[key].phone}
                    type={VALIDATE_TYPE.PHONE}
                    isEdit={isEdit[key]}
                    handleOnChange={handleOnChange}
                    widthClass={classes.width100}
                />
                <DropdownDataCell
                    id={key}
                    values={roles}
                    header={USER_KEY[6]}
                    value={users[key].role}
                    isEdit={isEdit[key]}
                    handleOnChange={handleOnChange}
                    widthClass={classes.width60}
                />
                <DropdownDataCell
                    id={key}
                    values={GENDER}
                    header={USER_KEY[7]}
                    value={users[key].sex}
                    isEdit={isEdit[key]}
                    handleOnChange={handleOnChange}
                    widthClass={classes.width60}
                />
                <DropdownDataCell
                    id={key}
                    values={STATUS}
                    header={USER_KEY[8]}
                    value={users[key].status}
                    isEdit={isEdit[key]}
                    handleOnChange={handleOnChange}
                    widthClass={classes.width60}
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
    onSetUser: (user) => dispatch({ type: USER_SET, user }),
    onDeleteUser: (userId) => dispatch({ type: USER_REMOVE, userId })
});

const authCondition = (authUser) => !!authUser;

export default compose(
    withAuthorization(authCondition),
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
)(UserPage);