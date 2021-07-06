import { Grid, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { Button, Modal } from 'components'
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { Container, EmptySection, Header } from 'views/BranchOfficeSettings/components';
import { useGet } from 'hooks/useGet';

import { CircularProgress } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    contentFeatures: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    contentButton: {
        margin: 10,
        justifyContent: 'center',
        display: 'flex'
    },
    contentButtonAdd: {
        display: 'flex',
        padding: 15,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }
}))

const Features = ({ type, onAdd, onRemove }) => {

    const classes = useStyles();

    const initialState = {
        name: '',
        id: '',
        code: ''
    }

    const [state, setState] = useState(initialState); //Modal
    const [isOpenModal, setIsOpenModal] = useState(false); //is Open Modal
    const [features, setFeatures] = useState([])
    const [loading, featuresGetByID] = useGet(`/feature/getByCategory/${type}`); //Get categorys

    const handleChange = ({ target: { name, value } }) => setState({ ...state, [name]: value });

    // const handleSelectedItem = index => {

    //     let featuresAux = data.map((feature, i) => {
    //         if (i === index) {
    //             return { ...feature, isSelected: !feature.isSelected };
    //         }
    //         return { ...feature };
    //     });

    //     onEdit('features', featuresAux)
    // }

    const handleChangeCheck = index => {
        let featuresAux = features.map((feature, i) => {
            if (i === index) {
                return { ...feature, isSelected: !feature.isSelected };
            }
            return { ...feature };
        });

        setFeatures(featuresAux);
    }

    const handleCheck = (index, id) => {
        handleChangeCheck(index);
        onAdd('features', id);
    }

    const handleNotCheck = (index, id) => {
        handleChangeCheck(index);
        onRemove('features', id)
    }

    const handleChangeStateModal = () => setIsOpenModal(!isOpenModal);

    const handleAdd = () => {
        // onAdd('features', { ...state, id: data.length });
        // setState(initialState);
        // handleChangeStateModal()
    };

    useEffect(() => {

        if (!loading && type) {
            // onEdit('features', featuresGetByID.features)
            setFeatures(featuresGetByID.features)
        }

    }, [loading, featuresGetByID, type])

    return (
        <>
            <Header
                sectionName="Caracteristicas"
                buttonText="Agregar caracteristica"
                isActiveMargin={true}
                onClickButton={handleChangeStateModal}
            />

            <Container>

                {
                    loading && (
                        <CircularProgress color="secondary" />
                    )
                }

                {
                    !loading && (
                        <>
                            {
                                features.length === 0 && (
                                    <EmptySection title="No se han agregado caracteristicas" />
                                )
                            }

                            {
                                features.length > 0 && (
                                    <div className={classes.contentFeatures}>
                                        {
                                            features.map(({ name, isSelected, _id }, i) => (
                                                <div key={`features_${name}_${i}`} className={classes.contentButton}>
                                                    <Button
                                                        subtitle={name}
                                                        type={isSelected ? 'primary' : 'inherit'}
                                                        onClick={() => {
                                                            if(isSelected){
                                                                handleNotCheck(i, _id);
                                                            }
                                                            else{
                                                                handleCheck(i, _id);
                                                            }
                                                        }}
                                                    />
                                                </div>
                                            ))
                                        }
                                    </div>
                                )
                            }
                        </>
                    )
                }

            </Container>

            <Modal
                open={isOpenModal}
                onClose={handleChangeStateModal}
                title="Creación de característica"
            >
                <Grid container spacing={1}>
                    <Grid item md={6} xs={12}>
                        <TextField
                            fullWidth
                            type="text"
                            label="Nombre de carácteristica"
                            margin="dense"
                            name="name"
                            required
                            variant="outlined"
                            value={state.name}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <TextField
                            fullWidth
                            type="text"
                            label="Código"
                            margin="dense"
                            name="code"
                            required
                            variant="outlined"
                            value={state.code}
                            onChange={handleChange}
                        />
                    </Grid>
                </Grid>
                <div className={classes.contentButtonAdd}>
                    <Button
                        subtitle="Agregar Característica"
                        type="primary"
                        onClick={handleAdd}
                    />
                </div>
            </Modal>
        </>
    )
}

Features.propTypes = {
    onAdd: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired
}

export default Features;