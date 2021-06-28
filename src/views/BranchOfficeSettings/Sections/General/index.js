import React from 'react'
import PropTypes from 'prop-types';

import { Container, Header, Select } from 'views/BranchOfficeSettings/components';

import { Grid, TextField} from '@material-ui/core';

const General = ({ data, onChange, onSubmit }) => {

    const handleChange = ({ target: { name, value } }) => onChange(name, value);

    return (
        <>
            <Header
                sectionName="Crea una nueva sucursal"
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
                        values={[
                            { label: <em>Nada</em>, value: "" },
                            { label: "Belleza", value: "Beauty" },
                            { label: "Comida", value: "Eat" },
                            { label: "Complejo", value: "Complex" },
                            { label: "Cortes de cabello", value: "Cut" },
                            { label: "Gimnasio", value: "Gym" },
                            { label: "Sala de reuniones", value: "Meeting rooms" },
                            { label: "SPA", value: "SPA" }
                        ]}
                        onChange={handleChange}
                        value={data.typeServices}
                    />
                </Grid>
            </Container>
        </>
    )
}

General.propTypes = {
    data: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
}

export default General;