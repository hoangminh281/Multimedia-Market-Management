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
import { PRODUCTS_SET, CATEGORIES_SET, PRODUCT_SET, PRODUCT_REMOVE } from '../constants/action-types';
import { CRUD, PRODUCT_HEADER, USER_KEY, GENDER, STATUS, VALIDATE_TYPE, PASSWORD_DEFAULT } from '../constants/common';

const styles = (theme) => ({
    root: {
        overflowX: 'auto',
        marginTop: '64px'
    }
});

class ProductPage extends Component {
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
        const { onSetProducts, onSetCategories } = this.props;

        db.product.onGetProducts(snapshot => {
            onSetProducts(snapshot.val());

            db.category.onceGetCategories().then(snapshot => (
                onSetCategories(snapshot.val())
            ));
        });
    }

    handleNew() {
        const { onSetProduct } = this.props;

        const productKey = db.product.onCreateProductKey();

        const emptyProduct = {
            [productKey]: {
                id: productKey,
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

        onSetProduct(productKey);

        this.setState((state) => ({
            isEdit: { ...state.isEdit, [productKey]: CRUD.CREATE }
        }));
    }

    handleEditOrSave(rowId) {
        const isEdit = this.state.isEdit[rowId];

        if (isEdit === CRUD.UPDATE || isEdit === CRUD.CREATE) {
            const editedProduct = {
                ...this.props.products[rowId],
                ...this.tempProducts[rowId],
            }

            let validate = editedProduct.title && editedProduct.price;

            console.log('edited');
            if (!validate) return;

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
                editedUser.status,
            ).then(snapshot => {
                alert("Created/Updated successfully")
            }, (err) => {
                alert(err);
            });
            this.setState((state) => ({
                isEdit: { ...state.isEdit, [rowId]: CRUD.NONE }
            }));
            delete this.tempProducts[rowId];

        } else if (isEdit === CRUD.DELETE) {
            console.log('deleted')

            db.product.doDeleteProduct(rowId).then(snapshot => {

            }).catch(err => {
                alert(err);
            });
            this.setState((state) => ({
                isEdit: { ...state.isEdit, [rowId]: CRUD.NONE }
            }));
            delete this.tempProducts[rowId];

        } else if (_.isUndefined(isEdit) || isEdit === CRUD.NONE) {
            console.log('edit')

            this.setState((state) => ({
                isEdit: { ...state.isEdit, [rowId]: CRUD.UPDATE }
            }));
        }
    }

    handleDeleteOrCancel(rowId) {
        const { onDeleteProduct } = this.props;
        const isDelete = this.state.isEdit[rowId];

        if (isDelete === CRUD.UPDATE || isDelete === CRUD.DELETE) {
            console.log('cancel')

            this.setState((state) => ({
                isEdit: { ...state.isEdit, [rowId]: CRUD.NONE }
            }));
            delete this.tempProducts[rowId];

        } else if (_.isUndefined(isDelete) || isDelete === CRUD.NONE) {
            console.log('delete')

            this.setState((state) => ({
                isEdit: { ...state.isEdit, [rowId]: CRUD.DELETE }
            }));

        } else if (isDelete === CRUD.CREATE) {
            delete this.tempProducts[rowId];
            this.setState((state) => ({
                isEdit: { ...state.isEdit, [rowId]: undefined }
            }));
            onDeleteProduct(rowId);
        }
    }

    handleOnChange(id, header, value) {
        this.tempProducts = {
            ...this.tempProducts,
            [id]: {
                ...this.tempProducts[id],
                [header]: value,
            }
        }
    }

    render() {
        const { classes, products, categories } = this.props;

        console.log(categories)

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
                            <GetTableHeader headers={PRODUCT_HEADER} />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <GetTableBody
                            products={products}
                            categories={categories}
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
    products,
    categories,
    isEdit,
    handleEditOrSave,
    handleDeleteOrCancel,
    handleOnChange
}) => (
        Object.keys(products).map(key =>
            <TableRow key={key}>
                <TableCell>
                    <div className="cell">
                        <IconButton
                            className="button"
                            onClick={handleEditOrSave.bind(this, key)}
                        >
                            {!isEdit[key] || isEdit[key] === CRUD.NONE ? <Edit /> : <Save />}
                        </IconButton>
                        <IconButton
                            className="button"
                            onClick={handleDeleteOrCancel.bind(this, products[key].id)}
                        >
                            {!isEdit[key] || isEdit[key] == CRUD.NONE ? <Delete /> : <Cancel />}
                        </IconButton>
                    </div>
                </TableCell>
                <EditableTableCell
                    id={key}
                    header={PRODUCT_HEADER[0]}
                    value={products[key].title}
                    isEdit={isEdit[key]}
                    handleOnChange={handleOnChange}
                />
                <EditableTableCell
                    id={key}
                    header={PRODUCT_HEADER[1]}
                    value={products[key].price}
                    isEdit={isEdit[key]}
                    handleOnChange={handleOnChange}
                />
                <DropdownDataCell
                    id={key}
                    values={categories}
                    header={PRODUCT_HEADER[2]}
                    value={products[key].cateId}
                    isEdit={isEdit[key]}
                    handleOnChange={handleOnChange}
                />
                <EditableTableCell
                    id={key}
                    header={PRODUCT_HEADER[3]}
                    value={products[key].photoId}
                    isEdit={isEdit[key]}
                    handleOnChange={handleOnChange}
                />
                <EditableTableCell
                    id={key}
                    header={PRODUCT_HEADER[4]}
                    value={products[key].rating}
                    isEdit={isEdit[key]}
                    handleOnChange={handleOnChange}
                />
                <DropdownDataCell
                    id={key}
                    values={STATUS}
                    header={PRODUCT_HEADER[8]}
                    value={products[key].status}
                    isEdit={isEdit[key]}
                    handleOnChange={handleOnChange}
                />
            </TableRow >
        )
    )

const mapStateToProps = (state) => ({
    products: state.productState.products,
    categories: state.categoryState.categories,
});

const mapDispatchToProps = (dispatch) => ({
    onSetProducts: (products) => dispatch({ type: PRODUCTS_SET, products }),
    onSetCategories: (categories) => dispatch({ type: CATEGORIES_SET, categories }),
    onSetProduct: (product) => dispatch({ type: PRODUCT_SET, product }),
    onDeleteProduct: (productId) => dispatch({ type: PRODUCT_REMOVE, productId }),
});

const authCondition = (authUser) => !!authUser;

export default compose(
    withAuthorization(authCondition),
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
)(ProductPage);