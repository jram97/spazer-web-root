import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import { Button, Table } from 'components';
import { useHistory } from 'react-router-dom';
import { useGet } from 'hooks/useGet';
import { CircularProgress } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4)
    },
    contentButtons: {
        display: 'flex'
    },
    progress: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center'
    }
}));

const BranchOffices = () => {

    const classes = useStyles();
    const history = useHistory();

    const [loading, data] = useGet('/branchOffice/getAll');
    const [branchOffice, setBranchOffice] = useState({
        loading: true,
        data: []
    });

    const handleClick = e => history.push('/branch-offices/creation');

    const handleEditClick = ({ row: { _id } }) => history.push(`/branch-offices/edit/${_id}`);

    useEffect(() => {

        if (!loading) {
            
            const info = data.branchOffices.map(({ name, _id }, index) => {

                const number = index + 1;

                const numberString = number < 10 ? `0${number}` : String(number);

                return { number: numberString, name, _id }

            })

            setBranchOffice({ loading: false, data: info })

        }

    }, [loading, data])

    return (
        <div className={classes.root}>

            {
                (loading && branchOffice.loading) && (
                    <div className={classes.progress}>
                        <CircularProgress color="secondary" />
                    </div>
                )
            }

            {
                (!loading && !branchOffice.loading) && (
                    <>
                        <div className={classes.contentButtons}>
                            <Button subtitle="Agregar sucursal" type="inherit" onClick={handleClick} />
                            <Button title={String(branchOffice.data.length)} subtitle="Total de sucursales" type="primary" />
                        </div>

                        <Table data={branchOffice.data} type="sucursal" onClickEdit={handleEditClick} />
                    </>
                )
            }

        </div>
    )
}

export default BranchOffices