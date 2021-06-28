import React, { useState } from 'react';
import { makeStyles, Paper, Table, TableContainer, TableFooter, TablePagination, TableRow } from '@material-ui/core';
import TablePaginationActions from './TablePaginationActions';
import Body from './Body';
import Head from './Head';

const useStyles = makeStyles({
    table: {
        minWidth: 500,
    },
});

export const CustomPaginationActionsTable = ({ data, table, showEdit, showDelete, onClickEdit, onClickDelete }) => {

    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    const handleChangePage = (event, newPage) => setPage(newPage);

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="custom pagination table">

                <Head
                    values={table.titles}
                    showEdit={showEdit}
                    showDelete={showDelete}
                />

                <Body
                    emptyRows={emptyRows}
                    page={page}
                    rows={data}
                    rowsPerPage={rowsPerPage}
                    values={table.values}
                    showEdit={showEdit}
                    showDelete={showDelete}
                    onClickDelete={onClickDelete}
                    onClickEdit={onClickEdit}
                />
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            labelRowsPerPage="Filas por página:"
                            rowsPerPageOptions={[5, 10, 25, { label: 'Todos', value: -1 }]}
                            colSpan={3}
                            count={data.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: { 'aria-label': 'Filas por página:' },
                                native: true,
                            }}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
}
