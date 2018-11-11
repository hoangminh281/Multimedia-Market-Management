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

import { db } from '../firebase';
import withAuthorization from './withAuthorization';
import { PRODUCTS_SET, CATEGORIES_SET, PRODUCT_SET, PRODUCT_REMOVE } from '../constants/action-types';
import { CRUD, STATUS, PRODUCT_HEADER } from '../constants/common';
import ProductDetailDialog from './layouts/ProductDetailDialog';

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
});

class ProductPage extends Component {
    constructor() {
        super();

        this.state = {
            isEdit: {},
            editProduct: {},
            editProductDetail: {},
        };

        this.handleEditOrSave = this.handleEditOrSave.bind(this);
        this.handleDeleteOrCancel = this.handleDeleteOrCancel.bind(this);

        this.productDetailDialogRef = React.createRef();
    }

    componentDidMount() {
        const { onSetProducts, onSetCategories } = this.props;

        db.product.onGetProducts(snapshot => {
            onSetProducts(snapshot.val());
        });

        db.category.onceGetCategories().then(snapshot => (
            onSetCategories(snapshot.val())
        ));
    }

    handleEditOrSave(rowId, event) {
        event.preventDefault();

        const isEdit = this.state.isEdit[rowId];

        if (isEdit === CRUD.DELETE) {
            console.log('deleted')

            db.product.doDeleteProduct(rowId).then(() => {
                db.productDetail.doDeleteProductDetail(rowId).then();
            }).catch(err => {
                alert(err);
            });
            this.setState((state) => ({
                isEdit: { ...state.isEdit, [rowId]: CRUD.NONE }
            }));
        } else if (_.isUndefined(isEdit) || isEdit === CRUD.NONE) {
            console.log('edit')

            this.setState(state => ({
                ...state,
                editProduct: this.props.products[rowId]
            }));

            db.productDetail.onceGetProductDetail(rowId)
                .then(snapshot => {
                    this.setState(state => ({
                        ...state,
                        editProduct: this.props.products[rowId],
                        editProductDetail: snapshot.val()
                    }));
                    this.productDetailDialogRef.show();
                }).catch(err => {
                    alert(err);
                });
        }
    }

    handleDeleteOrCancel(rowId, event) {
        event.preventDefault();

        const { onDeleteProduct } = this.props;
        const isDelete = this.state.isEdit[rowId];

        if (isDelete === CRUD.DELETE) {
            console.log('cancel')

            onDeleteProduct(rowId)

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

        return (
            <React.Fragment>
                <Paper className={classes.root}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <Button
                                        color="primary"
                                        className={classes.button}
                                        onClick={this.handleEdit}
                                    >
                                        NEW
                                </Button>
                                </TableCell>
                                <GetTableHeader headers={PRODUCT_HEADER} />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <GetTableBody
                                classes={classes}
                                products={products}
                                categories={categories}
                                isEdit={this.state.isEdit}
                                handleDeleteOrCancel={this.handleDeleteOrCancel}
                                handleEditOrSave={this.handleEditOrSave}
                            />
                        </TableBody>
                    </Table>
                </Paper>
                <ProductDetailDialog
                    title="Product Detail"
                    product={this.state.editProduct}
                    productDetail={this.state.editProductDetail}
                    innerRef={node => this.productDetailDialogRef = node}
                />
            </React.Fragment>
        );
    }
}

const GetTableHeader = ({ headers }) => (
    headers.map((header, key) =>
        <TableCell key={key}>{header}</TableCell>
    )
)

const GetTableBody = ({
    classes,
    products,
    categories,
    isEdit,
    handleDeleteOrCancel,
    handleEditOrSave,
}) => (
        Object.keys(products).map(key =>
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
                <TableCell id={key}>
                    {products[key].title}
                </TableCell>
                <TableCell id={key}>
                    {products[key].price}
                </TableCell>
                <TableCell id={key}>
                    {!!categories && !!categories[products[key].cateId] && categories[products[key].cateId].name}
                </TableCell>
                <TableCell id={key}>
                    {products[key].photoId}
                </TableCell>
                <TableCell id={key}>
                    {products[key].rating}
                </TableCell>
                <TableCell id={key}>
                    {STATUS[products[key].status]}
                </TableCell>
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
    onDeleteProduct: (productId) => dispatch({ type: PRODUCT_REMOVE, productId }),
});

const authCondition = (authUser) => !!authUser;

export default compose(
    withAuthorization(authCondition),
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
)(ProductPage);