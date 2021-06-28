import React from 'react';
import PropTypes from 'prop-types';
import { TableHead, TableRow, TableCell, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    Row: {
        color: '#000 !important'
    }
});

const Head = ({ values, showEdit, showDelete }) => {

    const classes = useStyles();

    return (
        <TableHead>

            <TableRow>

                {
                    values.map(val => (<TableCell className={classes.Row} key={`Head_${val}`}>{val}</TableCell>))
                }

                {
                    (showEdit || showDelete) && (<TableCell align="center" className={classes.Row}>Acciones</TableCell>)
                }

            </TableRow>

        </TableHead>
    )
}

Head.propTypes = {
    values: PropTypes.array.isRequired,
    showEdit: PropTypes.bool.isRequired,
    showDelete: PropTypes.bool.isRequired
}

export default Head;