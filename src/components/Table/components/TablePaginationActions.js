import { IconButton, makeStyles, useTheme } from '@material-ui/core';
import { IconsMaterial } from 'assets/icons/IconsMaterial';
import React from 'react';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
    root: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
    },
}));

const TablePaginationActions = ({ count, page, rowsPerPage, onChangePage }) => {

    const classes = useStyles();
    const theme = useTheme();

    const handleFirstPageButtonClick = event => onChangePage(event, 0)

    const handleBackButtonClick = event => onChangePage(event, page - 1);

    const handleNextButtonClick = event => onChangePage(event, page + 1);

    const handleLastPageButtonClick = event => onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));

    return (
        <div className={classes.root}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? IconsMaterial.LastPage : IconsMaterial.FirstPage}
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                {theme.direction === 'rtl' ? IconsMaterial.ArrowRight : IconsMaterial.ArrowLeft}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? IconsMaterial.ArrowLeft : IconsMaterial.ArrowRight}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? IconsMaterial.FirstPage : IconsMaterial.LastPage}
            </IconButton>
        </div>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

export default TablePaginationActions;