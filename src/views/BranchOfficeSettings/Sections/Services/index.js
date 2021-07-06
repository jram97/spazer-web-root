import React, { useState } from 'react';
import PropTypes from 'prop-types';

import axiosInstance from 'httpConfig';

import { Alert, Button, Modal, Table } from 'components';
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

const Services = ({ onAdd, onRemove }) => {

    const classes = useStyles();

    const [data, setData] = useState([]);

    const initialCreateService = {
        mode: 'new',
        info: {
            name: '',
            duration: '',
            price: ''
        }
    }

    const [createService, setCreateService] = useState(initialCreateService);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [error, setError] = useState({ error: false, msg: '' })

    const handleChangeStateModal = () => {

        if (isOpenModal) {
            setCreateService(initialCreateService);
        }

        setIsOpenModal(!isOpenModal)
    };

    const handleChangeService = ({ target: { value, name } }) =>
        setCreateService({
            ...createService,
            info: {
                ...createService.info,
                [name]: value
            }
        })

    const parseData = () => {


        return new Promise((resolve, reject) => {

            let { info: { name, duration, price } } = createService;

            try {

                duration = parseFloat(duration).toFixed(2);
                price = parseFloat(price).toFixed(2);

                if (!name) {
                    reject("Verifique el campo nombre del servicio")
                }

                if (isNaN(duration)) {
                    reject("Verifique el campo duración")
                }

                if (isNaN(price)) {
                    reject("Verifique el campo precio")
                }

                resolve({ ...createService.info, name, duration: parseFloat(duration), price: parseFloat(price) })

            } catch (error) {
                reject(error)
            }
        })

    }

    const handleAdd = () => {

        parseData()
            .then(information => {

                const token = localStorage.getItem('spazer_token');

                const headers = {
                    "Content-Type": "application/json",
                    "access-token": token
                }

                axiosInstance.post('/service/create', information, { headers })
                    .then(response => {
                        onAdd("services", response.data.service._id);
                        setData([...data, response.data.service]);
                        setCreateService(initialCreateService);
                        handleChangeStateModal();
                    })
                    .catch(err => {
                        setError({ error: true, msg: 'Error al agregar el servicio' });
                        console.error(err);
                    })

            })
            .catch(err => setError({ error: true, msg: err }))

    }

    const handleTableDelete = ({ index }) => {
        
        const ServicesAux = [...data];
        const id = ServicesAux[index].id;

        ServicesAux.splice(index, 1);
        setData(ServicesAux);
        
        onRemove("services", id);

    };

    const handleTableEdit = ({ row: { _id, name, duration, price }, index }) => {
        setCreateService({ mode: 'edit', index, info: { id: _id, name, duration, price } });
        handleChangeStateModal();
    }

    const handleEdit = () => {

        parseData()
            .then(information => {

                const token = localStorage.getItem('spazer_token');

                const headers = {
                    "Content-Type": "application/json",
                    "access-token": token
                }

                axiosInstance.put('/service/update', information, { headers })
                    .then(() => {
                        const { index } = createService;

                        const ServicesAux = [...data];
                        ServicesAux[index] = information;

                        setData(ServicesAux);

                        handleChangeStateModal();
                        setCreateService(initialCreateService);
                    })
                    .catch(err => {
                        setError({ error: true, msg: 'Error al actualizar el servicio' });
                        console.error(err);
                    })

            })
            .catch(err => setError({ error: true, msg: err }))
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
                            type="servicio"
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
                            label="Duración"
                            margin="dense"
                            name="duration"
                            onChange={handleChangeService}
                            required
                            value={createService.info.duration}
                            variant="outlined"
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
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

                <div className={classes.buttonSave} >
                    <Button
                        subtitle={createService.mode === "new" ? "Agregar servicio" : "Guardar" }
                        type="primary"
                        onClick={createService.mode === "new" ? handleAdd : handleEdit}
                    />
                </div>
            </Modal>

            <Alert
                open={error.error}
                handleClose={() => setError({ error: false, msg: '' })}
                title={error.msg}
                type="info"
            />
        </>
    )
}

Services.propTypes = {
    onAdd: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
}

export default Services;