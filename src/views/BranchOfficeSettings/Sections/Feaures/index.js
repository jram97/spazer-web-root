import { Grid, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { Button, Modal } from 'components'
import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { Container, EmptySection, Header } from 'views/BranchOfficeSettings/components';

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

const Features = ({ data, onAdd, onEdit }) => {

    const classes = useStyles();

    const initialState = {
        name: '',
        id: '',
        code: ''
    }

    const [state, setState] = useState(initialState);
    const [isOpenModal, setIsOpenModal] = useState(false)

    const handleChange = ({ target: { name, value } }) => setState({ ...state, [name]: value });

    const handleSelectedItem = index => {

        let featuresAux = data.map((feature, i) => {
            if (i === index) {
                return { ...feature, isSelected: !feature.isSelected };
            }
            return { ...feature };
        });

        onEdit('features', featuresAux)
    }

    const handleChangeStateModal = () => setIsOpenModal(!isOpenModal);

    const handleAdd = () => {
        onAdd('features', { ...state, id: data.length });
        setState(initialState);
        handleChangeStateModal()
    };

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
                    data.length === 0 && <EmptySection title="No se han agregado caracteristicas" />
                }

                {
                    data.length > 0 && (
                        <div className={classes.contentFeatures}>
                            {
                                data.map(({ name, isSelected }, i) => (
                                    <div key={`features_${name}_${i}`} className={classes.contentButton}>
                                        <Button
                                            subtitle={name}
                                            type={isSelected ? 'primary' : 'inherit'}
                                            onClick={() => handleSelectedItem(i)}
                                        />
                                    </div>
                                ))
                            }
                        </div>
                    )
                }

            </Container>

            <Modal
                open={isOpenModal}
                onClose={handleChangeStateModal}
                title="Creación de característica"
            >
                <Grid container spacing={1} className={{ marginTop: 20 }}>
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
    data: PropTypes.array.isRequired,
    onAdd: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired
}

export default Features;