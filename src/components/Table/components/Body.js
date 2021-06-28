import { TableBody, TableRow, TableCell } from '@material-ui/core';
import React from 'react';
import { withStyles, makeStyles } from '@material-ui/styles';
import Button from 'components/Button';

const StyledTableRow = withStyles(theme => ({
    root: {
        '&:nth-of-type(even)': {
            backgroundColor: theme.palette.action.hover
        }
    }
}))(TableRow);

const useStyles = makeStyles(() => ({
    containerButtons: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
    }
}))

const Body = ({ rows, rowsPerPage, page, emptyRows, values, showEdit, showDelete, onClickEdit, onClickDelete }) => {

    const classes = useStyles();

    const handleClickEdit = e => onClickEdit(e);
    const handleClickDelete = e => onClickDelete(e);

    return (
        <TableBody>
            {
                (
                    rowsPerPage > 0
                        ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : rows
                ).map((row, i) => (
                    <StyledTableRow key={`table_${i}`}>

                        {
                            values.map((val, index) => (
                                <TableCell component="th" scope="row" key={`Cell_${row[val]}_${i}_${index}`}>
                                    {row[val] ? row[val] : ''}
                                </TableCell>
                            ))
                        }

                        {
                            (showEdit || showDelete) && (
                                <TableCell align="center" component="th" scope="row" className={classes.containerButtons} >

                                    {
                                        showEdit && (
                                            <Button
                                                onClick={() => handleClickEdit({row, index: i})}
                                                icon="Edit"
                                                type="inherit"
                                            />
                                        )
                                    }
                                    {
                                        showDelete && (
                                            <Button
                                                onClick={() => handleClickDelete({row, index: i})}
                                                icon="Delete"
                                                type="inherit"
                                            />
                                        )
                                    }

                                </TableCell>
                            )
                        }

                    </StyledTableRow>
                ))
            }

            {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                </TableRow>
            )}
        </TableBody>
    )
}

export default Body;