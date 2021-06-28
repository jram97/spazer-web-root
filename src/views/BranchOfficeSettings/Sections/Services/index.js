import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Button, Modal, Table } from 'components';
import { Container, EmptySection, Header, Select } from 'views/BranchOfficeSettings/components';

import { Grid, TextField } from '@material-ui/core';

import { makeStyles } from '@material-ui/styles';


const useStyles = makeStyles(theme => ({
    radio: {
        '&$checked': {
            color: '#ACFE00'
        }
    },
    marginTopLabel: {
        marginTop: 30
    },
    radioGroupContainer: {
        display: 'flex',
        justifyContent: 'center'
    },
    buttonSave: {
        display: 'flex',
        padding: 15,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    formControl: {
        margin: theme.spacing(1),
        width: '100%'
    }
}));

const Services = ({ type, data, onAdd, onRemove, onEdit }) => {

    const classes = useStyles();

    const initialCreateService = {
        mode: 'new',
        info: {
            name: '',
            price: ''
        }
    }

    const [createService, setCreateService] = useState(initialCreateService);
    const [isOpenModal, setIsOpenModal] = useState(false);

    const handleChangeStateModal = () => setIsOpenModal(!isOpenModal);

    const handleChangeService = ({ target: { value, name } }) =>
        setCreateService({ ...createService, info: { ...createService.info, [name]: value } })

    const handleAdd = () => {
        onAdd("services", createService.info);
        setCreateService(initialCreateService);
        handleChangeStateModal();
    }

    const handleTableDelete = ({ index }) => {
        const ServicesAux = [...data];
        ServicesAux.splice(index, 1);
        onRemove("services", ServicesAux);

    };

    const handleTableEdit = ({ row, index }) => {
        setCreateService({ mode: 'edit', index, info: { ...row } });
        handleChangeStateModal();
    }

    const handleEdit = () => {
        
        const { index, info } = createService;

        const ServicesAux = [...data];
        ServicesAux[index] = info;

        onEdit("services", ServicesAux);

        handleChangeStateModal();
        setCreateService(initialCreateService);

    }

    return (
        <>
            <Header
                sectionName="Servicios"
                buttonText="Agregar servicio"
                isActiveMargin={true}
                onClickButton={handleChangeStateModal}
            />

            <Container>

                {
                    data.length === 0 && <EmptySection title="No se han agregado servicios" />
                }

                {
                    data.length > 0 && (
                        <Table
                            type={`${(type === "Complex" || type === "Meeting rooms") ? `servicio ${type}` : 'servicio'}`}
                            data={data}
                            onClickDelete={handleTableDelete}
                            onClickEdit={handleTableEdit}
                        />
                    )
                }

            </Container>

            <Modal
                open={isOpenModal}
                onClose={handleChangeStateModal}
                title={`${createService.mode === "new" ? "Creación de" : "Edita el"} servicio`}
            >
                <Grid container spacing={2}>
                    <Grid item md={6} xs={12}>
                        <TextField
                            fullWidth
                            type="text"
                            // helperText="Coloca tu correo"
                            label="Nombre del servicio"
                            margin="dense"
                            name="name"
                            onChange={handleChangeService}
                            required
                            value={createService.info.name}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <TextField
                            fullWidth
                            type="text"
                            // helperText="Coloca tu correo"
                            label="Precio p/h"
                            margin="dense"
                            name="price"
                            onChange={handleChangeService}
                            required
                            value={createService.info.price}
                            variant="outlined"
                        />
                    </Grid>
                </Grid>

                {
                    (type === "Complex" || type === "Meeting rooms") && (
                        <Grid container spacing={2}>
                            <Grid item md={6} xs={12}>
                                <Select
                                    title="Tipo de superficie"
                                    name="surfaceType"
                                    values={[
                                        { label: <em>Nada</em>, value: "" },
                                        { label: 'Cesped artificial', value: "Cesped artificial" },
                                        { label: 'Cesped natural', value: "Cesped natural" },
                                        { label: 'Piso', value: "Piso" }
                                    ]}
                                    onChange={handleChangeService}
                                    value={createService.info.surfaceType ? createService.info.surfaceType : ''}
                                />
                            </Grid>
                            {
                                (type === "Complex") && (
                                    <Grid item md={6} xs={12}>
                                        <Select
                                            title="Modo de juego"
                                            name="gameMode"
                                            values={[
                                                { label: <em>Nada</em>, value: "" },
                                                { label: '11 vs 11', value: "11 vs 11" },
                                                { label: '8 vs 8', value: "8 vs 8" },
                                                { label: '6 vs 6', value: "6 vs 6" },
                                                { label: '5 vs 5', value: "5 vs 5" },
                                            ]}
                                            onChange={handleChangeService}
                                            value={createService.info.gameMode ? createService.info.gameMode : ''}
                                        />
                                    </Grid>
                                )
                            }
                        </Grid>
                    )
                }

                <div className={classes.buttonSave} >
                    <Button
                        subtitle="Agregar servicio"
                        type="primary"
                        onClick={createService.mode === "new" ? handleAdd : handleEdit}
                    />
                </div>
            </Modal>
        </>
    )
}

Services.propTypes = {
    type: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
    onAdd: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired
}

export default Services;