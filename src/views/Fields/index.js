import React, { useEffect, useState } from 'react';
// import { useHistory } from 'react-router-dom';
import {
  makeStyles,
  withStyles,
  createStyles,
  useTheme
} from '@material-ui/styles';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableHead,
  TableRow,
  TableFooter,
  DialogActions,
  Grid,
  Modal,
  Backdrop,
  Fade,
  Typography,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  InputLabel,
  Switch,
  Snackbar
} from '@material-ui/core';

import MuiAlert from '@material-ui/lab/Alert';

import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import { getSlotsByBranchId, updateSlots } from 'services/branchesService';

import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import AddIcon from '@material-ui/icons/Add';

import Paper from '@material-ui/core/Paper';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles1 = makeStyles(theme =>
  createStyles({
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5)
    }
  })
);

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  featuresLabel: {
    marginBottom: 10
  },
  radioGroupContainer: { display: 'flex', justifyContent: 'center' },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20
  },
  radio: {
    '&$checked': {
      color: '#ACFE00'
    }
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
  complexInfoContainer: {
    width: '100%',
    padding: 20,

    height: 'auto'
  },
  checked: {},
  sportsComplexesNumberContainer: {
    backgroundColor: '#ACFE00',
    marginLeft: 10,
    padding: 10
  },
  table: {
    minWidth: 700
  }
}));

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(even)': {
      backgroundColor: theme.palette.action.hover
    }
  }
}))(TableRow);

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: 'black',
    color: theme.palette.common.black
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const Slots = props => {
  const classes = useStyles();
  // const history = useHistory();
  const [messageToShow, setMessageToShow] = useState('');
  const [currentSlotSelectedName, setCurrentSlotSelectedName] = useState('');
  const [typeOfMessage, setTypeOfMessage] = useState('success');
  const [fieldEditionOpen, setFieldEditionOpen] = useState(false);
  const [snackState, setSnackState] = useState(false);
  const [currentSlotSelected, setCurrentSlotSelected] = useState({});
  const [slotName, setSlotName] = useState('');
  const [slotFeatures, setSlotFeatures] = useState([]);
  const [featureName, setFeatureName] = useState('');
  const [featureDescription, setFeatureDescription] = useState('');
  const [isSlotActive, setSlotState] = useState(false);
  const [slotModalOpen, setSlotModalOpen] = useState(false);
  const [slotPrice, setSlotPrice] = useState('');
  let [slots, setSlots] = useState([]);

  useEffect(() => {
    getSlots();
  }, []);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const checkSlotForm = () => {
    if (!currentSlotSelected.name) {
      setMessageToShow('Rellene los campos');
      setTypeOfMessage('warning');
      setSnackState(true);
      return false;
    }
    return true;
  };

  const updateSlot = async () => {
    try {
      if (!checkSlotForm()) {
        return;
      }
      let currentSlotSelectedAux = { ...currentSlotSelected };
      currentSlotSelectedAux.id = currentSlotSelectedAux._id;
      delete currentSlotSelectedAux._id;
      let result = await updateSlots(currentSlotSelectedAux);
      updateSlotInTable();
      setSnackState(true);
      setCurrentSlotSelected({});
      setSlotModalOpen(false);
    } catch (error) {
      console.log('error', error);
    }
  };

  const updateSlotInTable = () => {
    let slotsUpdated = slots.map(slot => {
      if (slot._id === currentSlotSelected._id) {
        return { ...slot, ...currentSlotSelected };
      }
      return { ...slot };
    });
    setSlots(slotsUpdated);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const addNewSlotFeature = () => {
    let newFeature = {
      name: featureName,
      description: featureDescription
    };
    setCurrentSlotSelected({
      ...currentSlotSelected,
      features: [...slotFeatures, newFeature]
    });
    setSlotFeatures([...slotFeatures, newFeature]);
    setFeatureName('');
    setFeatureDescription('');
  };

  const getSlots = async () => {
    try {
      let branchId = JSON.parse(localStorage.getItem('spazer_user'))
        .branchOffice._id;
      let { data } = await getSlotsByBranchId(branchId);
      console.log('data', data);
      setSlots(data);
    } catch (error) {
      console.log('error', error);
    }
  };

  function TablePaginationActions(props) {
    const classes = useStyles1();
    const theme = useTheme();
    const { count, page, rowsPerPage, onChangePage } = props;

    const handleFirstPageButtonClick = event => {
      onChangePage(event, 0);
    };

    const handleBackButtonClick = event => {
      onChangePage(event, page - 1);
    };

    const handleNextButtonClick = event => {
      onChangePage(event, page + 1);
    };

    const handleLastPageButtonClick = event => {
      onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
      <div className={classes.root}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page">
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page">
          {theme.direction === 'rtl' ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page">
          {theme.direction === 'rtl' ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page">
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }

  const handleSelectedSlot = selectedSLot => {
    setCurrentSlotSelected({ ...selectedSLot });
    setCurrentSlotSelectedName(selectedSLot.name);
    setSlotFeatures(
      selectedSLot.features.length > 0 ? selectedSLot.features : []
    );
    setSlotModalOpen(true);
  };

  /*const navigateToSportsComplexesCretion = () => {
    history.push('/sports-complexes/creation');
  };*/

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item xs={12} style={{ display: 'flex' }}>
          <Button
            size="large"
            variant="contained"
            color="primary"
            style={{
              width: 200,
              marginLeft: 10,
              display: 'flex',
              justifyContent: 'space-evenly'
            }}>
            <span style={{ fontSize: 30 }}>8</span>
            <span style={{ marginLeft: 10 }}>Espacios</span>
          </Button>
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">
                    Número de espacio
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    Nombre de espacio
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    Características
                  </StyledTableCell>

                  <StyledTableCell align="left">&nbsp;</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {slots.map((row, index) => (
                  <StyledTableRow key={row.name}>
                    <StyledTableCell align="right">{index}</StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {row.features.length}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <Button
                        // onClick={() => setFeaturesModalOpen(!featuresModalOpen)}
                        size="small"
                        variant="contained"
                        color="primary"
                        style={{
                          backgroundColor: '#F4F4F4',
                          color: 'black',
                          marginRight: 10
                        }}>
                        <DeleteIcon />
                      </Button>
                      <Button
                        onClick={() => handleSelectedSlot(row)}
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
        </Grid>
      </Grid>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={fieldEditionOpen}
        onClose={() => setFieldEditionOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}>
        <Fade in={fieldEditionOpen}>
          <div className={classes.modalContainer}>
            <Typography
              className={[classes.name, classes.marginTopLabel]}
              variant="h4">
              <span className={classes.boldText}>Edición de cancha</span>
            </Typography>
            <Grid container spacing={1} className={classes.marginTopLabel}>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  type="email"
                  label="Nombre de cancha"
                  margin="dense"
                  name="firstName"
                  //   onChange={event =>
                  //     setFieldInfo({ ...fieldInfo, name: event.target.value })
                  //   }
                  required
                  //   value={fieldInfo.name}
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
                  //   onChange={event =>
                  //     setFieldInfo({ ...fieldInfo, price: event.target.value })
                  //   }
                  required
                  //   value={fieldInfo.price}
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
                  //   onChange={event =>
                  //     setFieldInfo({
                  //       ...fieldInfo,
                  //       typeOfSurface: event.target.value
                  //     })
                  //   }
                  //   value={fieldInfo.typeOfSurface}
                  row
                  aria-label="position"
                  name="position"
                  defaultValue="top"
                  className={classes.radioGroupContainer}>
                  <FormControlLabel
                    value="Grama"
                    control={
                      <Radio
                        color="#ACFE00"
                        classes={{
                          root: classes.radio,
                          checked: classes.checked
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
                        color="#ACFE00"
                        classes={{
                          root: classes.radio,
                          checked: classes.checked
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
                  Tipo de Cancha
                </FormLabel>
                <RadioGroup
                  row
                  //   onChange={event =>
                  //     setFieldInfo({
                  //       ...fieldInfo,
                  //       typeOfField: event.target.value
                  //     })
                  //   }
                  //   value={fieldInfo.typeOfField}
                  aria-label="position"
                  name="position"
                  defaultValue="top"
                  className={classes.radioGroupContainer}>
                  <FormControlLabel
                    value="11v11"
                    control={
                      <Radio
                        color="#ACFE00"
                        classes={{
                          root: classes.radio,
                          checked: classes.checked
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
                        color="#ACFE00"
                        classes={{
                          root: classes.radio,
                          checked: classes.checked
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
                        color="#ACFE00"
                        classes={{
                          root: classes.radio,
                          checked: classes.checked
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
                // onClick={() => saveField()}
                size="large"
                variant="contained"
                color="primary">
                Agregar Espacio
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
      <Dialog
        fullWidth={true}
        maxWidth={'sm'}
        open={slotModalOpen}
        onClose={() => setSlotModalOpen(false)}
        aria-labelledby="max-width-dialog-title">
        <DialogTitle id="max-width-dialog-title">
          <Typography variant={'h3'}>
            Modifica el espacio espacio: {currentSlotSelectedName}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Grid container>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item md={4} xs={12}>
                  <InputLabel>Nombre del espacio</InputLabel>
                  <TextField
                    fullWidth
                    value={currentSlotSelected.name}
                    onChange={event =>
                      setCurrentSlotSelected({
                        ...currentSlotSelected,
                        name: event.target.value
                      })
                    }
                  />
                </Grid>
                <Grid item md={4} xs={12}>
                  <InputLabel>Precio</InputLabel>
                  <TextField
                    fullWidth
                    value={currentSlotSelected}
                    onChange={event => setSlotPrice(event.target.value)}
                  />
                </Grid>
                <Grid
                  item
                  md={4}
                  xs={12}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                  <FormControlLabel
                    value="top"
                    control={
                      <Switch
                        color="primary"
                        checked={currentSlotSelected.isActive}
                        onChange={event =>
                          setCurrentSlotSelected({
                            ...currentSlotSelected,
                            isActive: event.target.checked
                          })
                        }
                      />
                    }
                    label={
                      'Estado: ' +
                      (currentSlotSelected.isActive ? 'Activo' : 'Inactivo')
                    }
                    labelPlacement="top"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Typography variant={'h4'} className={classes.featuresLabel}>
                Características | Agregar nueva
              </Typography>
              <ValidatorForm
                onSubmit={event => addNewSlotFeature(event)}
                style={{ display: 'flex', width: '100%' }}
                onError={errors => console.log(errors)}>
                <Grid container style={{ marginBottom: 15 }} spacing={2}>
                  <Grid item md={5} xs={12}>
                    <InputLabel>Nombre</InputLabel>
                    <TextValidator
                      fullWidth
                      value={featureName}
                      validators={['required']}
                      errorMessages={['Este campo es requerido']}
                      onChange={event => setFeatureName(event.target.value)}
                    />
                  </Grid>
                  <Grid item md={5} xs={12}>
                    <InputLabel
                      value={featureDescription}
                      onChange={event =>
                        setFeatureDescription(event.target.value)
                      }>
                      Descripción
                    </InputLabel>
                    <TextValidator
                      fullWidth
                      value={featureDescription}
                      validators={['required']}
                      errorMessages={['Este campo es requerido']}
                      onChange={event =>
                        setFeatureDescription(event.target.value)
                      }
                    />
                  </Grid>
                  <Grid
                    item
                    md={2}
                    xs={12}
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}>
                    <IconButton type="submit" variant={'contained'}>
                      <AddIcon />
                    </IconButton>
                    {/* <Button
                      type="submit"
                      startIcon={}
                      className={classes.buttonStyle}
                      variant={'contained'}></Button> */}
                  </Grid>
                </Grid>
              </ValidatorForm>
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                  <TableHead style={{ backgroundColor: '#1D1D1D' }}>
                    <TableRow>
                      <StyledTableCell align="left">Nombre</StyledTableCell>
                      <StyledTableCell align="left">
                        Descripción
                      </StyledTableCell>
                      {/* <StyledTableCell align="left">Estado</StyledTableCell> */}
                    </TableRow>
                  </TableHead>
                  {/* <TableBody> */}

                  <TableBody>
                    {(rowsPerPage > 0 && currentSlotSelected.features
                      ? currentSlotSelected.features.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                      : currentSlotSelected.feature
                      ? currentSlotSelected.feature
                      : []
                    ).map((row, index) => (
                      <StyledTableRow key={row.name}>
                        <StyledTableCell align="left">
                          <Typography>{row.name}</Typography>
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          <Typography>{row.description}</Typography>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                  {/* {fields.map(row => (
                   
                  ))}
                </TableBody> */}
                  <TableFooter>
                    <TableRow>
                      <TablePagination
                        rowsPerPageOptions={[5]}
                        colSpan={3}
                        count={
                          currentSlotSelected.feature
                            ? currentSlotSelected.feature.length
                            : 0
                        }
                        rowsPerPage={rowsPerPage}
                        page={page}
                        SelectProps={{
                          inputProps: { 'aria-label': 'rows per page' },
                          native: true
                        }}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                        ActionsComponent={TablePaginationActions}
                      />
                    </TableRow>
                  </TableFooter>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            variant={'contained'}
            onClick={() => updateSlot()}
            color="primary">
            Actualizar
          </Button>
          <Button onClick={() => setSlotModalOpen(false)} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackState}
        autoHideDuration={6000}
        onClose={() => setSnackState(false)}>
        <Alert onClose={() => setSnackState(false)} severity={typeOfMessage}>
          {messageToShow}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Slots;
