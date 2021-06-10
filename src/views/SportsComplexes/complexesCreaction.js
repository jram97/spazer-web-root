import React, { useState, useRef } from 'react';
import {
  Grid,
  Typography,
  Button,
  Card,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Modal,
  Fade,
  Backdrop,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel
} from '@material-ui/core';

import { makeStyles, withStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  radio: {
    '&$checked': {
      color: '#ACFE00'
    }
  },
  checked: {},
  sportsComplexesNumberContainer: {
    backgroundColor: '#ACFE00',
    marginLeft: 10,
    padding: 10
  },
  table: {
    minWidth: 700
  },
  name: {
    marginTop: theme.spacing(1),
    color: 'black'
  },
  boldText: {
    fontWeight: 'bold'
  },
  createComplexContainer: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  marginTopLabel: {
    marginTop: 30
  },

  marginBottomLabel: {
    marginBottom: 15
  },
  complexInfoContainer: {
    width: '100%',
    padding: 20,

    height: 'auto'
  },
  noImageContainer: {
    height: 120,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20
  },
  radioGroupContainer: { display: 'flex', justifyContent: 'center' },
  image: {
    height: 200,
    width: 200
  }
}));

const ComplexesCreation = props => {
  const featuresAux = [
    { id: 1, name: 'baños', isSelected: false },
    { id: 2, name: 'baños', isSelected: false },
    { id: 3, name: 'baños', isSelected: false },
    { id: 4, name: 'baños', isSelected: false },
    { id: 5, name: 'baños', isSelected: false }
  ];
  const classes = useStyles();
  const inputFileRef = useRef(null);
  const [images, setImages] = useState([]);
  const [fieldInfo, setFieldInfo] = useState({});
  const [featureInfo, setFeatureInfo] = useState({});
  const [fields, setFields] = useState([]);
  const [features, setFeatures] = useState([]);
  const [open, setOpen] = useState(false);
  const [featuresModalOpen, setFeaturesModalOpen] = useState(false);
  //   setFeatures(featuresAux);

  const StyledTableRow = withStyles(theme => ({
    root: {
      '&:nth-of-type(even)': {
        backgroundColor: theme.palette.action.hover
      }
    }
  }))(TableRow);

  const toogleModal = () => {
    setOpen(!open);
  };

  const StyledTableCell = withStyles(theme => ({
    head: {
      backgroundColor: 'transparent',
      color: theme.palette.common.black
    },
    body: {
      fontSize: 14
    }
  }))(TableCell);
  const handleChangeImageSelected = event => {
    let imagesAux = [...images];
    imagesAux.push({ url: URL.createObjectURL(event.target.files[0]) });

    setImages(imagesAux);
  };

  

  const saveField = () => {
    let fieldsAux = [...fields];
    fieldsAux.push(fieldInfo);
    setFieldInfo({});
    setFields(fieldsAux);
    setOpen(false);
  };

  const saveFeature = () => {
    let featuresAux = [...features];
    console.log(featureInfo);
    featuresAux.push(featureInfo);
    setFeatureInfo({});
    setFeatures(featuresAux);
    setFeaturesModalOpen(false);
  };

  const selectFeature = featureId => {
    console.log(featureId);
    console.log(features);
    let featuresAux = features.map(feature => {
      if (feature.id === featureId) {
        return { ...feature, isSelected: !feature.isSelected };
      }
      return { ...feature };
    });
    setFeatures(featuresAux);
  };

  const editField = field => {
    setFieldInfo(field);
    setOpen(true);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid container md={12}>
          <Grid item md={6} sm={6} xs={12}>
            <Typography className={classes.name} variant="h4">
              Agregar un nuevo complejo
            </Typography>
          </Grid>
          <Grid
            item
            md={6}
            sm={6}
            xs={12}
            className={classes.createComplexContainer}>
            <Button
              onClick={() => setFeatures(featuresAux)}
              size="large"
              variant="contained"
              color="primary">
              Agregar Complejo
            </Button>
          </Grid>
        </Grid>
        <Grid container md={12}>
          <Card
            className={[classes.complexInfoContainer, classes.marginTopLabel]}>
            <Grid container md={12} spacing={2}>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  type="text"
                  // helperText="Coloca tu correo"
                  label="Nombre de complejo"
                  margin="dense"
                  name="firstName"
                  //   onChange={event => console.log(event.target.value)}
                  required
                  //   value={fieldName}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  type="text"
                  // helperText="Coloca tu correo"
                  label="Dirección de complejo"
                  margin="dense"
                  name="firstName"
                  // onChange={handleChange}
                  required
                  // value={values.firstName}
                  variant="outlined"
                />
              </Grid>
            </Grid>

            <Grid container md={12} spacing={2}>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  type="email"
                  // helperText="Coloca tu correo"
                  label="Número de teléfono"
                  margin="dense"
                  name="firstName"
                  // onChange={handleChange}
                  required
                  // value={values.firstName}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  type="email"
                  // helperText="Coloca tu correo"
                  label="Nombre de complejo"
                  margin="dense"
                  name="firstName"
                  // onChange={handleChange}
                  required
                  // value={values.firstName}
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </Card>
          <Grid container md={12} className={classes.marginTopLabel}>
            <Grid item md={6} xs={12}>
              <Typography
                className={[classes.name, classes.marginTopLabel]}
                variant="h5">
                <span className={classes.boldText}>Imagenes</span>
                <span style={{ fontWeight: 'normal' }}> (Máximo 10)</span>
              </Typography>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
              className={classes.createComplexContainer}>
              <Button
                onClick={() => inputFileRef.current.click()}
                size="large"
                variant="contained"
                color="primary">
                Agregar Imágen
              </Button>
              <input
                type="file"
                ref={inputFileRef}
                hidden
                onChange={event => handleChangeImageSelected(event)}
                accept="image/*"
              />
            </Grid>
          </Grid>

          <Card
            className={[classes.complexInfoContainer, classes.marginTopLabel]}>
            <Grid container spacing={1}>
              {' '}
              {images.length === 0 && (
                <Grid item md={12} xs={12}>
                  <Card
                    className={[
                      classes.complexInfoContainer,
                      classes.noImageContainer
                    ]}>
                    <AccountBoxIcon style={{ fontSize: 40 }} />
                    <Typography className={classes.name} variant="h4">
                      No se han agregado imágenes
                    </Typography>
                  </Card>
                </Grid>
              )}
              {images.map((image, index) => {
                return (
                  // <p>{image.url}</p>
                  <Grid item sm={2} xs={12}>
                    <Card
                      style={{
                        padding: 10,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                      <img
                        alt="complexes-slot"
                        src={image.url}
                        className={classes.image}
                      />
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </Card>
          <Grid container md={12} className={classes.marginTopLabel}>
            <Grid item md={6} xs={12}>
              <Typography
                className={[classes.name, classes.marginTopLabel]}
                variant="h5">
                <span className={classes.boldText}>Canchas</span>
              </Typography>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
              className={classes.createComplexContainer}>
              <Button
                onClick={() => toogleModal()}
                size="large"
                variant="contained"
                color="primary">
                Agregar Cancha
              </Button>
            </Grid>
          </Grid>
          <Card
            className={[classes.complexInfoContainer, classes.marginTopLabel]}>
            <Grid container>
              {fields.length === 0 && (
                <Grid item md={12} xs={12}>
                  <Card
                    className={[
                      classes.complexInfoContainer,
                      classes.noImageContainer
                    ]}>
                    <AccountBoxIcon style={{ fontSize: 40 }} />
                    <Typography className={classes.name} variant="h4">
                      No se han agregado Canchas
                    </Typography>
                  </Card>
                </Grid>
              )}
              {fields.length !== 0 && (
                <TableContainer component={Paper}>
                  <Table
                    className={classes.table}
                    aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>Número de complejo</StyledTableCell>
                        <StyledTableCell align="left">
                          Nombre de complejo
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          Tipo de campo
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          Tipo de superficie
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          Precio p/h
                        </StyledTableCell>
                        <StyledTableCell align="left">&nbsp;</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {fields.map(row => (
                        <StyledTableRow key={row.name}>
                          <StyledTableCell align="right">
                            {row.index}
                          </StyledTableCell>
                          <StyledTableCell component="th" scope="row">
                            {row.name}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {row.typeOfField}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {row.typeOfSurface}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {row.price}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            <Button
                              // onClick={() => setFeaturesModalOpen(!featuresModalOpen)}
                              size="small"
                              variant="contained"
                              color="primary"
                              style={{
                                backgroundColor: '#F4F4F4',
                                color: 'black'
                              }}>
                              <DeleteIcon />
                            </Button>
                            <Button
                              onClick={() => editField(row)}
                              size="small"
                              variant="contained"
                              color="primary"
                              style={{
                                backgroundColor: '#F4F4F4',
                                color: 'black'
                              }}>
                              <CreateIcon />
                            </Button>
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Grid>
          </Card>
          <Grid container md={12} className={classes.marginTopLabel}>
            <Grid item md={6} xs={12}>
              <Typography
                className={[classes.name, classes.marginTopLabel]}
                variant="h5">
                <span className={classes.boldText}>Características</span>
              </Typography>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
              className={classes.createComplexContainer}>
              <Button
                onClick={() => setFeaturesModalOpen(!featuresModalOpen)}
                size="large"
                variant="contained"
                color="primary">
                Crear Característica
              </Button>
              {/* <Button
                onClick={() => toogleModal()}
                size="large"
                variant="contained"
                color="primary"
                style={{
                  backgroundColor: '#ACFE00',
                  color: 'black',
                  marginLeft: 10
                }}>
                Agregar Cancha
              </Button> */}
            </Grid>
          </Grid>
          <Card
            className={[classes.complexInfoContainer, classes.marginTopLabel]}>
            <Grid container spacing={2}>
              {features.length === 0 && (
                <Grid item md={12} xs={12}>
                  <Card
                    className={[
                      classes.complexInfoContainer,
                      classes.noImageContainer
                    ]}>
                    <AccountBoxIcon style={{ fontSize: 40 }} />
                    <Typography className={classes.name} variant="h4">
                      No se han agregado Características
                    </Typography>
                  </Card>
                </Grid>
              )}
              {features.map(feature => {
                return (
                  <Grid key={feature.id} item md={2} xs={12}>
                    <Button
                      onClick={() => selectFeature(feature.id)}
                      size="large"
                      variant="contained"
                      color={feature.isSelected ? 'primary' : 'grey'}
                      style={{
                        width: '100%',
                        color: 'black',
                        marginLeft: 10
                      }}>
                      {feature.name}
                    </Button>
                  </Grid>
                );
              })}
            </Grid>
          </Card>
        </Grid>
      </Grid>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={toogleModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}>
        <Fade in={open}>
          <div className={classes.modalContainer}>
            <Typography
              className={[classes.name, classes.marginTopLabel]}
              variant="h4">
              <span className={classes.boldText}>Creación de cancha</span>
            </Typography>
            <Grid container spacing={1} className={classes.marginTopLabel}>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  type="email"
                  label="Nombre de cancha"
                  margin="dense"
                  name="firstName"
                  onChange={event =>
                    setFieldInfo({ ...fieldInfo, name: event.target.value })
                  }
                  required
                  value={fieldInfo.name}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12} className={classes.radioGroupContainer}>
                <TextField
                  fullWidth
                  type="email"
                  // helperText="Coloca tu correo"
                  label="Precio p/h"
                  margin="dense"
                  name="firstName"
                  onChange={event =>
                    setFieldInfo({ ...fieldInfo, price: event.target.value })
                  }
                  required
                  value={fieldInfo.price}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <FormLabel
                  component="legend"
                  style={{ marginTop: 20, marginBottom: 10 }}>
                  Tipo de superficie
                </FormLabel>
                <RadioGroup
                  onChange={event =>
                    setFieldInfo({
                      ...fieldInfo,
                      typeOfSurface: event.target.value
                    })
                  }
                  value={fieldInfo.typeOfSurface}
                  row
                  aria-label="position"
                  name="position"
                  defaultValue="top"
                  className={classes.radioGroupContainer}>
                  <FormControlLabel
                    value="Grama"
                    control={
                      <Radio
                        color="primary"
                        classes={{
                          root: classes.radio
                        }}
                      />
                    }
                    label="Grama"
                    labelPlacement="top"
                  />
                  <FormControlLabel
                    value="Artificial"
                    control={
                      <Radio
                        color="primary"
                        classes={{
                          root: classes.radio
                        }}
                      />
                    }
                    label="Artificial"
                    labelPlacement="top"
                  />
                </RadioGroup>
              </Grid>
              <Grid item md={6} xs={12}>
                <FormLabel
                  component="legend"
                  style={{ marginTop: 20, marginBottom: 10 }}>
                  Tipo de superficie
                </FormLabel>
                <RadioGroup
                  row
                  onChange={event =>
                    setFieldInfo({
                      ...fieldInfo,
                      typeOfField: event.target.value
                    })
                  }
                  value={fieldInfo.typeOfField}
                  aria-label="position"
                  name="position"
                  defaultValue="top"
                  className={classes.radioGroupContainer}>
                  <FormControlLabel
                    value="11v11"
                    control={
                      <Radio
                        color="primary"
                        classes={{
                          root: classes.radio
                        }}
                      />
                    }
                    label="11v11"
                    labelPlacement="top"
                  />
                  <FormControlLabel
                    value="6v6"
                    control={
                      <Radio
                        color="primary"
                        classes={{
                          root: classes.radio
                        }}
                      />
                    }
                    label="6v6"
                    labelPlacement="top"
                  />
                  <FormControlLabel
                    value="8v8"
                    control={
                      <Radio
                        color="primary"
                        classes={{
                          root: classes.radio
                        }}
                      />
                    }
                    label="8v8"
                    labelPlacement="top"
                  />
                </RadioGroup>
              </Grid>
            </Grid>
            <div
              style={{
                display: 'flex',
                padding: 15,
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <Button
                onClick={() => saveField()}
                size="large"
                variant="contained"
                color="primary">
                Agregar Cancha
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={featuresModalOpen}
        onClose={() => setFeaturesModalOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}>
        <Fade in={featuresModalOpen}>
          <div className={classes.modalContainer}>
            <Typography
              className={[
                classes.name,
                classes.marginTopLabel,
                classes.marginBottomLabel
              ]}
              variant="h4">
              <span className={classes.boldText}>
                Creación de característica
              </span>
            </Typography>
            <Grid container spacing={1} className={{ marginTop: 20 }}>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  type="email"
                  label="Nombre de carácteristica"
                  margin="dense"
                  name="firstName"
                  onChange={event =>
                    setFeatureInfo({
                      ...featureInfo,
                      name: event.target.value,
                      id: features.length + 1,
                      isSelected: false
                    })
                  }
                  required
                  value={featureInfo.name}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  type="email"
                  label="Código"
                  margin="dense"
                  name="firstName"
                  onChange={event =>
                    setFeatureInfo({ ...featureInfo, code: event.target.value })
                  }
                  required
                  value={featureInfo.code}
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <div
              style={{
                display: 'flex',
                padding: 15,
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <Button
                onClick={() => saveFeature()}
                size="large"
                variant="contained"
                color="primary">
                Agregar Característica
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default ComplexesCreation;
