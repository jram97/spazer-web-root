import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';

import { useGet } from 'hooks/useGet';

import { Container, Header, Select } from 'views/BranchOfficeSettings/components';

import { Grid, TextField } from '@material-ui/core';

const General = ({ data, onChange, onSubmit, title }) => {

    const [loading, BussinesCategorys] = useGet('/businessCategory/getAllActive');
    const [selectOptions, setSelectOptions] = useState([])

    const handleChange = ({ target: { name, value } }) => onChange(name, value);

    useEffect(() => {

        if (!loading) {
            const newBussinesCategorys = BussinesCategorys.categories.map(({ _id, name }) => ({ label: name, value: _id }));
            setSelectOptions(newBussinesCategorys);
        }

    }, [loading, BussinesCategorys])

    return (
        <>
            <Header
                sectionName={title}
                buttonText="Agregar sucursal"
                onClickButton={onSubmit}
            />
            <Container>
                <Grid container spacing={2}>
                    <Grid item md={6} xs={12}>
                        <TextField
                            fullWidth
                            type="text"
                            label="Nombre de sucursal"
                            margin="dense"
                            name="name"
                            onChange={handleChange}
                            required
                            value={data.name}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <TextField
                            fullWidth
                            type="text"
                            label="Dirección de sucursal"
                            margin="dense"
                            name="address"
                            onChange={handleChange}
                            required
                            value={data.address}
                            variant="outlined"
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={2}>
                    <Grid item md={6} xs={12}>
                        <TextField
                            fullWidth
                            type="text"
                            label="Número de teléfono"
                            margin="dense"
                            name="phone"
                            onChange={handleChange}
                            required
                            value={data.phone}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <TextField
                            fullWidth
                            type="text"
                            label="Horarios"
                            margin="dense"
                            name="schedules"
                            onChange={handleChange}
                            required
                            value={data.schedules}
                            variant="outlined"
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2}>

                    <Select
                        title="Tipo de servicio"
                        name="typeServices"
                        values={selectOptions}
                        onChange={handleChange}
                        value={data.typeServices}
                        disabled={loading}
                    />
                </Grid>
            </Container>
        </>
    )
}

General.propTypes = {
    data: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    title: PropTypes.string
}

General.defaultProps = {
    title: 'Crea una nueva sucursal'
}

export default General;