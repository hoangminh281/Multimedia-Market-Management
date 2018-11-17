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

import { db, storage } from '../firebase';
import withAuthorization from './withAuthorization';
import { PRODUCTS_SET, CATEGORIES_SET, PRODUCT_REMOVE } from '../constants/action-types';
import { CRUD, STATUS_OBJECT, PRODUCT_HEADER, PRODUCT_KEY, PRODUCTDETAIL_KEY } from '../constants/common';
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
            imageUrls: [],
        };
        this.tempProduct = {};
        this.tempProductDetail = {};

        this.handleNew = this.handleNew.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleDeleteOrCancel = this.handleDeleteOrCancel.bind(this);
        this.prepareProductDetailImages = this.prepareProductDetailImages.bind(this);

        this.productDetailDialogRef = React.createRef();
    }

    componentDidMount() {
        const { onSetProducts, onSetCategories } = this.props;

        db.product.onGetProducts(snapshot => {
            onSetProducts(snapshot.val());
        });

        db.category.onceGetCategories().then(snapshot => {
            onSetCategories(this.prepareCategory(snapshot.val()));
        });
    }

    handleEdit(rowId, event) {
        event.preventDefault();

        const isEdit = this.state.isEdit[rowId];

        if (isEdit === CRUD.DELETE) {
            this.deleteProduct(rowId);

            this.setState((state) => ({
                isEdit: { ...state.isEdit, [rowId]: CRUD.NONE }
            }));
        } else if (_.isUndefined(isEdit) || isEdit === CRUD.NONE) {
            db.productDetail.onceGetProductDetail(rowId)
                .then(snapshot => {
                    this.prepareProductDetailImages(snapshot.val().imageIdList)
                        .then(imageUrls => {
                            this.setState(state => ({
                                ...state,
                                imageUrls,
                            }));
                        });

                    this.setState(state => ({
                        ...state,
                        editProduct: this.props.products[rowId],
                        editProductDetail: snapshot.val(),
                    }));

                    this.tempProduct = {};
                    this.tempProductDetail = {};

                    this.productDetailDialogRef.show();
                }).catch(err => {
                    alert(err);
                });
        }
    }

    handleSave(event) {
        event.preventDefault();

        this.tempProduct = {
            ...this.state.editProduct,
            ...this.tempProduct,
        }
        this.tempProductDetail = {
            ...this.state.editProductDetail,
            ...this.tempProductDetail,
        }

        this.createOrUpdateProduct(this.tempProduct, this.tempProductDetail)
            .then(() => {
                this.productDetailDialogRef.close();
            })
            .catch(error => {
                alert(error);
            });
    }

    handleDeleteOrCancel(rowId, event) {
        event.preventDefault();

        const { onDeleteProduct } = this.props;
        const isDelete = this.state.isEdit[rowId];

        if (isDelete === CRUD.DELETE) {
            onDeleteProduct(rowId)

            this.setState((state) => ({
                isEdit: { ...state.isEdit, [rowId]: CRUD.NONE }
            }));
        } else if (_.isUndefined(isDelete) || isDelete === CRUD.NONE) {
            this.setState((state) => ({
                isEdit: { ...state.isEdit, [rowId]: CRUD.DELETE }
            }));
        }
    }

    handleOnChange(value, key) {
        if (PRODUCT_KEY.includes(key)) {
            this.tempProduct = {
                ...this.tempProduct,
                [key]: value,
            }
        } else if (PRODUCTDETAIL_KEY.includes(key)) {
            this.tempProductDetail = {
                ...this.tempProductDetail,
                [key]: value,
            }
        }
    }

    handleNew() {
        const defaultCateId = Object.keys(this.props.categories)[0];
        const newProductId = db.product.onCreateProductKey();

        this.tempProduct = {
            productId: newProductId,
            cateId: defaultCateId,
            status: 1,
            price: 0,
            rating: 5,
            photoId: "",
        };
        this.tempProductDetail = {
            id: newProductId,
            capacity: 0,
            downloaded: 0,
            imageIdList: [],
            ownerId: this.props.authUser.uid,
            ageLimit: 0,
            videoId: "",
        };

        this.setState(state => ({
            ...state,
            editProduct: this.tempProduct,
            editProductDetail: this.tempProductDetail,
            imageUrls: []
        }));
        this.productDetailDialogRef.show();
    }

    prepareCategory(categories) {
        let preparedCategories = {};
        Object.values(categories).forEach(value => {
            preparedCategories[value.cateId] = value.name;
        });

        return preparedCategories;
    }

    async prepareProductDetailImages(imageIdList) {
        if (!imageIdList) return Promise.resolve([]);

        const downloadUrlPromises = Object.values(imageIdList).map(value =>
            storage.doGetProductDownloadURL(value)
        );
        try {
            const urls = await Promise.all(downloadUrlPromises);

            return urls;
        }
        catch (error) {
            alert(error);
        }
    }

    deleteProduct(rowId) {
        db.product.doDeleteProduct(rowId).then(() => {
            db.productDetail.doDeleteProductDetail(rowId).then();
        }).catch(err => {
            alert(err);
        });
    }

    createOrUpdateProduct(editedProduct, editedProductDetail) {
        return db.product.doCreateOrUpdateProduct(
            editedProduct.productId,
            editedProduct.title,
            parseFloat(editedProduct.price),
            editedProduct.cateId,
            editedProduct.photoId,
            editedProduct.rating,
            parseInt(editedProduct.status)
        ).then(() => {
            return db.productDetail.doCreateOrUpdateProductDetail(
                editedProductDetail.id,
                parseInt(editedProductDetail.ageLimit),
                editedProductDetail.capacity,
                editedProductDetail.downloaded,
                editedProductDetail.intro,
                editedProductDetail.description,
                editedProductDetail.imageIdList,
                editedProductDetail.ownerId,
                editedProductDetail.videoId
            )
        });
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
                                classes={classes}
                                products={products}
                                categories={categories}
                                isEdit={this.state.isEdit}
                                handleDeleteOrCancel={this.handleDeleteOrCancel}
                                handleEdit={this.handleEdit}
                            />
                        </TableBody>
                    </Table>
                </Paper>
                <ProductDetailDialog
                    title="Product Detail"
                    product={this.state.editProduct}
                    productDetail={this.state.editProductDetail}
                    imageUrls={this.state.imageUrls}
                    category={categories}
                    handleSave={this.handleSave}
                    onChange={this.handleOnChange}
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
    handleEdit,
}) => (
        Object.keys(products).map(key =>
            <TableRow key={key}>
                <TableCell>
                    <div className={classes.cellButton}>
                        <IconButton
                            className={classes.button}
                            onClick={handleEdit.bind(this, key)}
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
                    {STATUS_OBJECT[products[key].status]}
                </TableCell>
            </TableRow >
        )
    )

const mapStateToProps = (state) => ({
    products: state.productState.products,
    categories: state.categoryState.categories,
    authUser: state.sessionState.authUser,
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