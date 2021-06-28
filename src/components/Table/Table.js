import { makeStyles } from '@material-ui/core';
import React from 'react'
import { CustomPaginationActionsTable } from './components/CustomPaginationActionsTable';
import configTables from 'config/configTables.json';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
    Table: {
        marginTop: 20
    }
})

const Table = ({data, type, showEdit, showDelete, onClickEdit, onClickDelete}) => {

    const classes = useStyles();

    return (
        <div className={classes.Table}>
            <CustomPaginationActionsTable 
                data={data} 
                table={configTables[type]} 
                showEdit={showEdit}
                showDelete={showDelete}
                onClickDelete={onClickDelete}
                onClickEdit={onClickEdit}
            />
        </div>
    )
}

Table.propTypes = {
    data: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired,
    showEdit: PropTypes.bool,
    showDelete: PropTypes.bool,
    onClickDelete: PropTypes.func,
}

Table.defaultProps = {
    showEdit: true,
    showDelete: true,
    onClickEdit: () => {},
    onClickDelete: () => {}
}

export default Table;