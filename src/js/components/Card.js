import _ from 'lodash';
import md5 from 'md5';
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
import DropdownDataCell from './layouts/DropdownDataCell'
import EditableTableCell from './layouts/EditableTableCell';
import { CARDS_SET, CARD_SET, CARD_REMOVE, CURRENT_PAGE_SET } from '../constants/action-types';
import { CRUD, CARD_HEADER, CARD_KEY, STATUS, CARD_BRAND, CARD_VALUE, DRAWER_HEADER } from '../constants/common';

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

class CardPage extends Component {
    constructor() {
        super();

        this.state = {
            isEdit: {},
        };
        this.tempCards = {};

        this.handleNew = this.handleNew.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleEditOrSave = this.handleEditOrSave.bind(this);
        this.handleDeleteOrCancel = this.handleDeleteOrCancel.bind(this);
    }

    componentDidMount() {
        const { onSetCards, onSetCurrentPage } = this.props;

        onSetCurrentPage(DRAWER_HEADER.Card);

        db.card.onGetCards(snapshot => {
            const preparedCards = this.prepareCards(snapshot.val());

            onSetCards(preparedCards);
        });
    }

    prepareCards(cards) {
        const categoryCards = Object.values(cards);
        const cardItems = categoryCards.reduce(function (resultCards, categoryCard) {
            const valueCards = Object.values(categoryCard).reduce(function (resultCategoryCards, value) {
                resultCategoryCards = {
                    ...resultCategoryCards,
                    ...value
                }
            });
            resultCards = {
                ...resultCards,
                ...valueCards
            }

            return resultCards;
        }, {});

        return cardItems;
    }

    createOrUpdateCard(cardId, editedCard) {
        db.card.doCreateOrUpdateCard(
            cardId ? cardId : editedCard.cardId,
            parseInt(editedCard.category),
            parseInt(editedCard.value),
            editedCard.number,
            editedCard.seri,
            parseInt(editedCard.status)
        ).then(snapshot => {
            alert("Created/Updated successfully")
        }, (err) => {
            alert(err);
        });

        this.setState((state) => ({
            isEdit: { ...state.isEdit, [editedCard.cardId]: CRUD.NONE }
        }));
        delete this.tempCards[editedCard.cardId];
    }

    handleNew() {
        const { onSetCard } = this.props;

        const cardKey = db.card.onCreateCardKey(0, 0);

        const emptyCard = {
            [cardKey]: {
                cardId: cardKey,
                category: 0,
                value: 0,
                number: "",
                seri: "",
                status: 1
            }
        };

        onSetCard(emptyCard);

        this.setState((state) => ({
            isEdit: { ...state.isEdit, [cardKey]: CRUD.CREATE }
        }));
    }

    handleEditOrSave(rowId, category, value) {
        const isEdit = this.state.isEdit[rowId];

        const formatedCategory = parseInt(category);
        const formatedValue = parseInt(value);

        if (isEdit === CRUD.UPDATE || isEdit === CRUD.CREATE) {
            const editedCard = {
                ...this.props.cards[rowId],
                ...this.tempCards[rowId],
                number: this.tempCards[rowId] && this.tempCards[rowId].number ? md5(this.tempCards[rowId].number) : this.props.cards[rowId].number
            }
            let validate = editedCard.number && editedCard.seri;

            if (!validate) return;

            let cardId = "";
            let task = Promise.resolve();

            if (isEdit === CRUD.CREATE) {
                const editedCategory = parseInt(editedCard.category);
                const editedValue = parseInt(editedCard.value);

                cardId = db.card.onCreateCardKey(editedCategory, editedValue);
            } else if (isEdit === CRUD.UPDATE) {
                task = db.card.doDeleteCard(rowId, formatedCategory, formatedValue);
            }

            task.then(() => {
                this.createOrUpdateCard(cardId, editedCard);
            }).catch(err => {
                alert(err);
            });
        } else if (isEdit === CRUD.DELETE) {
            db.card.doDeleteCard(rowId, formatedCategory, formatedValue)
                .catch(err => {
                    alert(err);
                });

            this.setState((state) => ({
                isEdit: { ...state.isEdit, [rowId]: CRUD.NONE }
            }));
            delete this.tempCards[rowId];
        } else if (_.isUndefined(isEdit) || isEdit === CRUD.NONE) {
            this.setState((state) => ({
                isEdit: { ...state.isEdit, [rowId]: CRUD.UPDATE }
            }));
        }
    }

    handleDeleteOrCancel(rowId) {
        const { onDeleteCard } = this.props;
        const isDelete = this.state.isEdit[rowId];

        if (isDelete === CRUD.UPDATE || isDelete === CRUD.DELETE) {
            this.setState((state) => ({
                isEdit: { ...state.isEdit, [rowId]: CRUD.NONE }
            }));
            delete this.tempCards[rowId];
        } else if (_.isUndefined(isDelete) || isDelete === CRUD.NONE) {
            this.setState((state) => ({
                isEdit: { ...state.isEdit, [rowId]: CRUD.DELETE }
            }));
        } else if (isDelete === CRUD.CREATE) {
            onDeleteCard(rowId);

            delete this.tempCards[rowId];
            this.setState((state) => ({
                isEdit: { ...state.isEdit, [rowId]: undefined }
            }));
        }
    }

    handleOnChange(id, header, value) {
        this.tempCards = {
            ...this.tempCards,
            [id]: {
                ...this.tempCards[id],
                [header]: value,
            }
        }
    }

    render() {
        const { classes, cards } = this.props;

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
                            <GetTableHeader headers={CARD_HEADER} />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <GetTableBody
                            cards={cards}
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
    cards,
    isEdit,
    handleEditOrSave,
    handleDeleteOrCancel,
    handleOnChange,
    classes
}) => (
        Object.keys(cards).map(key =>
            <TableRow key={key}>
                <TableCell>
                    <div className={classes.cellButton}>
                        <IconButton
                            className={classes.button}
                            onClick={handleEditOrSave.bind(this, key, cards[key].category, cards[key].value)}
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
                <DropdownDataCell
                    id={key}
                    header={CARD_KEY[0]}
                    value={cards[key].category}
                    values={CARD_BRAND}
                    isEdit={isEdit[key]}
                    handleOnChange={handleOnChange}
                    widthClass={classes.width100}
                />
                <DropdownDataCell
                    id={key}
                    header={CARD_KEY[1]}
                    value={cards[key].value}
                    values={CARD_VALUE}
                    isEdit={isEdit[key]}
                    handleOnChange={handleOnChange}
                    widthClass={classes.width100}
                />
                <EditableTableCell
                    required={isEdit[key] === CRUD.CREATE ? true : false}
                    id={key}
                    header={CARD_KEY[2]}
                    value=""
                    isEdit={isEdit[key]}
                    handleOnChange={handleOnChange}
                    widthClass={classes.width200}
                />
                <EditableTableCell
                    required
                    id={key}
                    header={CARD_KEY[3]}
                    value={cards[key].seri}
                    isEdit={isEdit[key]}
                    handleOnChange={handleOnChange}
                    widthClass={classes.width200}
                />
                <DropdownDataCell
                    id={key}
                    values={STATUS}
                    header={CARD_KEY[4]}
                    value={cards[key].status}
                    isEdit={isEdit[key]}
                    handleOnChange={handleOnChange}
                    widthClass={classes.width60}
                />
            </TableRow >
        )
    )

const mapStateToProps = (state) => ({
    cards: state.cardState.cards,
});

const mapDispatchToProps = (dispatch) => ({
    onSetCards: (cards) => dispatch({ type: CARDS_SET, cards }),
    onSetCard: (card) => dispatch({ type: CARD_SET, card }),
    onDeleteCard: (cardId) => dispatch({ type: CARD_REMOVE, cardId }),
    onSetCurrentPage: (currentPage) => dispatch({ type: CURRENT_PAGE_SET, currentPage }),
});

const authCondition = (authUser) => !!authUser;

export default compose(
    withAuthorization(authCondition),
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
)(CardPage);