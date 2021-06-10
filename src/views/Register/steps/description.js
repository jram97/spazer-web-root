import React, { useState, useEffect } from 'react';
import {
  Grid,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  Checkbox,
  TableHead,
  Switch,
  TableRow,
  Button,
  InputLabel,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  TableFooter,
  TablePagination,
  FormControlLabel,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Snackbar
} from '@material-ui/core';

import MuiAlert from '@material-ui/lab/Alert';

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete';

import { GoogleMap, Marker } from '@react-google-maps/api';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Geocode from 'react-geocode';

import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import WifiIcon from '@material-ui/icons/Wifi';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { addRegisterData } from 'reduxStore/actions/user';
import { connect } from 'react-redux';
import './register-description-step.css';
import {
  makeStyles,
  withStyles,
  useTheme,
  createStyles
} from '@material-ui/styles';

import { getFeatures } from 'services/featuresServices';

const DEFAULT_TYPE_SCHEDULE = 0;
const SELECTED_TYPE_SCHEDULE = 1;

const useStyles1 = makeStyles(theme =>
  createStyles({
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5)
    }
  })
);

const checkBoxStyles = theme => ({
  root: {
    '&$checked': {
      color: '#00e676'
    }
  },
  checked: {}
});

const CustomCheckbox = withStyles(checkBoxStyles)(Checkbox);

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  addDirectionButton: {
    marginBottom: 25
  },
  label: {
    marginBottom: theme.spacing(2)
  },
  radio: {
    '&$checked': {
      color: '#ACFE00'
    }
  },
  buttonStyle: {
    backgroundColor: theme.palette.primary.main
  },
  featuresLabel: {
    marginTop: 15,
    marginBottom: 10
  },
  timePickerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  selectedDay: {
    backgroundColor: theme.palette.primary.main
  },
  unselectedDay: {
    backgroundColor: theme.palette.primary.white
  },
  dayContainer: {
    color: theme.palette.black,
    borderRadius: 100,
    borderWidth: 1,
    padding: 20,
    width: 50,
    height: 50,
    '&:hover': {
      backgroundColor: theme.palette.primary.main
    }
  },
  checked: {},
  sportsComplexesNumberContainer: {
    backgroundColor: '#ACFE00',
    marginLeft: 10,
    padding: 10
  },
  table: {
    // minWidth: 700
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

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(even)': {
      backgroundColor: theme.palette.action.hover
    }
  }
}))(TableRow);

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: 'transparent',
    color: theme.palette.common.black
  },
  body: {
    fontSize: 14,
    padding: 10
  }
}))(TableCell);

const defaultShedule = {
  type: DEFAULT_TYPE_SCHEDULE
};

const daysOfWeekAux = [
  {
    title: 'D',
    name: 'Domingo',
    index: 0,
    isSelected: false,
    isDisabled: false
  },
  {
    title: 'L',
    name: 'Lunes',
    index: 1,
    isSelected: false,
    isDisabled: false
  },
  {
    title: 'M',
    name: 'Martes',
    index: 2,
    isSelected: false,
    isDisabled: false
  },
  {
    title: 'M',
    name: 'Miércoles',
    index: 3,
    isSelected: false,
    isDisabled: false
  },
  {
    title: 'J',
    name: 'Jueves',
    index: 4,
    isSelected: false,
    isDisabled: false
  },
  {
    title: 'V',
    name: 'Viernes',
    index: 5,
    isSelected: false,
    isDisabled: false
  },
  {
    title: 'S',
    name: 'Sábado',
    index: 6,
    isSelected: false,
    isDisabled: false
  }
];

const slotFeaturesInitialState = [];

const containerStyle = {
  width: '100%',
  height: '500px'
};

const centerAux = {
  lat: 13.708536,
  lng: -89.240989
};

Geocode.setApiKey('AIzaSyDKc3dnf1sWbxi-h37-UF3c_O9gm11ShE0');
Geocode.setLanguage('es');

// set response region. Its optional.
// A Geocoding request with region=es (Spain) will return the Spanish city.
Geocode.setRegion('sv');

const Description = props => {
  const [center, setCenter] = useState(centerAux);
  const [addressInfo, setAddressInfo] = useState({
    address: '',
    lat: '',
    lng: ''
  });
  const [snackbarState, setSnackbarState] = useState(false);
  const [features, setFeatures] = useState([]);
  const [services, setServices] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [editionMode, setEditionMode] = useState(false);
  const [scheduleIndex, setScheduleIndex] = useState(0);
  const [isFeaturesLoading, setFeaturesLoading] = useState(true);
  const [schedules, setSchedules] = useState([defaultShedule]);
  const [startTime, setStartTime] = useState('00:00');
  const [endTime, setEndTime] = useState('00:00');
  const [featureName, setFeatureName] = useState('');
  const [featureDescription, setFeatureDescription] = useState('');
  const [daysOfWeek, setDaysOfWeek] = useState(daysOfWeekAux);
  const [slotFeatures, setSlotFeatures] = useState(slotFeaturesInitialState);
  const [slots, setSlots] = useState([]);
  const [slotName, setSlotName] = useState('');
  const [isSlotActive, setSlotState] = useState(false);
  const [slotPrice, setSlotPrice] = useState('');
  const [address, setAddress] = useState('');
  const [serviceName, setServiceName] = useState('');
  const [serviceDuration, setServiceDuration] = useState('');
  const [servicePrice, setServicePrice] = useState('');
  const fields = [];
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [slotModalOpen, setSlotModalOpen] = useState(false);
  const [mapModalOpen, setMapModalOpen] = useState(false);
  const [servicesModalOpen, setServicesModalOpen] = useState(false);
  const [featuresModalOpen, setFeaturesModalOpen] = useState(false);
  const classes = useStyles();

  const [map, setMap] = React.useState(null);

  const handleChange = address => {
    setAddress(address);
    console.log(address);
  };

  const handleSelect = address => {
    setAddress(address);
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        console.log('Success', latLng);
        setCenter(latLng);
      })
      .catch(error => console.error('Error', error));
  };

  const onLoad = React.useCallback(
    function callback(map) {
      const bounds = new window.google.maps.LatLngBounds();
      map.fitBounds(bounds);
      console.log('mapa', map);
      // map.center({ lat: addressInfo.lat, lng: addressInfo.lng });
      setMap(map);
      setTimeout(() => {
        if (addressInfo.address) {
          console.log({ lat: addressInfo.lat, lng: addressInfo.lng });
          setCenter({ lat: addressInfo.lat, lng: addressInfo.lng });
        }
      }, 1000);
    },
    [addressInfo]
  );

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  useEffect(() => {
    getFeaturesInfo();
  }, []);

  const saveAddressInfo = () => {
    if (address && center.lat && center.lng) {
      setMapModalOpen(false);
      setAddressInfo({ address, lat: center.lat, lng: center.lng });
    } else {
      setErrorMessage('Agrega una ubicación');
      setSnackbarState(true);
    }
  };

  const checkBranchInfo = () => {
    if (services.length === 0) {
      return false;
    } else if (slots.length === 0) {
      return false;
    } else if (!addressInfo.address) {
      return false;
    } else if (features.filter(feature => feature.isSelected).length === 0) {
      return false;
    } else if (schedules.length === 1) {
      return false;
    }
    return true;
  };

  const saveInfo = () => {
    if (!checkBranchInfo()) {
      setErrorMessage('Verifique los campos');
      setSnackbarState(true);
      return;
    }

    let branchOffice = {
      name: props.registerData.branchName,
      address: addressInfo,
      slots,
      services,
      features: features
        .filter(feature => feature.isSelected)
        .map(feature => feature._id),
      schedules: schedules
        .filter(schedule => schedule.type === SELECTED_TYPE_SCHEDULE)
        .map(schedule => ({
          days: schedule.daysSelected,
          startTime: schedule.startTime,
          endTime: schedule.endTime
        })),
      isActive: false
    };

    props.addRegisterData({ branchOffice });
    props.handleSkip();
  };

  const saveSlot = () => {
    let slotToSave = {};
    slotToSave.name = slotName;
    slotToSave.features = slotFeatures;
    slotToSave.isActive = isSlotActive;
    slotToSave.schedules = [
      {
        price: slotPrice,
        date: '2015-06-11',
        startTime: '4AM',
        endTime: '10PM'
      }
    ];
    setSlots([...slots, slotToSave]);
    cleanSlotInfo();
  };

  const cleanSlotInfo = () => {
    setSlotName('');
    setSlotPrice('');
    setSlotState(false);
    setFeatureName('');
    setFeatureDescription('');
    setSlotFeatures([]);
  };

  const addNewService = () => {
    let serviceToAdd = {
      name: serviceName,
      price: servicePrice,
      duration: serviceDuration
    };

    setServices([...services, serviceToAdd]);
    setServiceName('');
    setServicePrice('');
    setServiceDuration('');
  };

  const addNewSlotFeature = () => {
    let newFeature = {
      name: featureName,
      description: featureDescription
    };
    setSlotFeatures([...slotFeatures, newFeature]);
    setFeatureName('');
    setFeatureDescription('');
  };

  const isValidTime = () => {
    let startTimeAux = Number(
      startTime.split(':')[0] + startTime.split(':')[1]
    );
    let endTimeAux = Number(endTime.split(':')[0] + endTime.split(':')[1]);
    return startTimeAux < endTimeAux;
  };

  const deleteScheduleTime = () => {
    let schedulesAux = schedules.filter(
      (schedule, index) => index !== scheduleIndex
    );
    setSchedules(schedulesAux);
    setScheduleModalOpen(false);
  };

  const saveScheduleTime = () => {
    if (!isValidTime()) {
      return;
    }

    let schedulesAuxUpdated = [...schedules];
    let selectedShedule = {};
    selectedShedule.type = SELECTED_TYPE_SCHEDULE;

    let selectedSheduleDays = daysOfWeek.filter(day => {
      return day.isSelected;
    });
    if (selectedSheduleDays.length === 0) {
      return;
    }
    let daysSelected = selectedSheduleDays.map(day => {
      return day.name;
    });
    selectedShedule.label =
      daysSelected.join(', ') + ' ' + startTime + '-' + endTime;
    selectedShedule.startTime = startTime;
    selectedShedule.endTime = endTime;
    selectedShedule.daysSelected = selectedSheduleDays.map(day => day.index);

    if (editionMode) {
      schedulesAuxUpdated.splice(scheduleIndex, 1, selectedShedule);
    } else {
      schedulesAuxUpdated.splice(schedules.length - 1, 1, selectedShedule);
      schedulesAuxUpdated.push(defaultShedule);
    }

    setSchedules(schedulesAuxUpdated);
    setScheduleModalOpen(false);
  };

  const selectScheduleDay = daySelected => {
    let daysOfWeekUpdated = daysOfWeek.map(day => {
      if (day.index === daySelected.index) {
        return { ...day, isSelected: !day.isSelected };
      }
      return { ...day };
    });
    console.log('valor', daysOfWeekUpdated);
    setDaysOfWeek(daysOfWeekUpdated);
  };

  const getFeaturesInfo = async () => {
    try {
      console.log('data', props.registerData);
      let result = await getFeatures('5f040faf789fda41f4b442af');
      let features = result.features.map(feature => ({
        ...feature,
        isSelected: false
      }));
      setFeatures(features);
    } catch (error) {
      console.log(error);
    } finally {
      setFeaturesLoading(false);
    }
  };

  // const updateSlotNameByIndex = (value, property, currentIndex) => {
  //   let updatedSlotFeature = slotFeatures.map((feature, index) => {
  //     if (index === currentIndex) return { ...feature, [property]: value };
  //     else return { ...feature };
  //   });
  //   setSlotFeatures(updatedSlotFeature);
  // };

  const cleanScheduleValues = () => {
    let daysAux = daysOfWeek.map(day => ({ ...day, isSelected: false }));

    let daysReset = daysAux.map(day => {
      let dayAlreadySelected = false;
      schedules.forEach(schedule => {
        if (schedule.type !== DEFAULT_TYPE_SCHEDULE) {
          console.log('dias seleccionados', schedule.daysSelected);
          console.log('dias seleccionados', day.index);
        }
        if (
          schedule.type !== DEFAULT_TYPE_SCHEDULE &&
          schedule.daysSelected.includes(day.index)
        )
          dayAlreadySelected = true;
      });

      if (dayAlreadySelected)
        return { ...day, isDisabled: true, isSelected: false };
      else return { ...day, isDisabled: false, isSelected: false };
    });

    setDaysOfWeek(daysReset);
    setStartTime('00:00');
    setEndTime('00:00');
  };

  const showAddScheduleModal = () => {
    cleanScheduleValues();
    setEditionMode(false);
    setScheduleModalOpen(true);
  };

  const showScheduleSelected = (schedule, index) => {
    // cleanScheduleValues();
    let daysAux = daysOfWeek.map(day => ({ ...day, isSelected: false }));

    let daysReset = daysAux.map(day => {
      let dayAlreadySelected = false;
      schedules.forEach(schedule => {
        if (schedule.type !== DEFAULT_TYPE_SCHEDULE) {
          console.log('dias seleccionados', schedule.daysSelected);
          console.log('dias seleccionados', day.index);
        }
        if (
          schedule.type !== DEFAULT_TYPE_SCHEDULE &&
          schedule.daysSelected.includes(day.index)
        )
          dayAlreadySelected = true;
      });

      if (dayAlreadySelected)
        return { ...day, isDisabled: true, isSelected: false };
      else return { ...day, isDisabled: false, isSelected: false };
    });
    let daysSelected = daysReset.map(day => {
      if (schedule.daysSelected.includes(day.index)) {
        return { ...day, isSelected: true, isDisabled: false };
      }
      return { ...day, isSelected: false };
    });
    setStartTime(schedule.startTime);
    setEndTime(schedule.endTime);
    setDaysOfWeek(daysSelected);
    setScheduleIndex(index);
    setEditionMode(true);
    setScheduleModalOpen(true);
  };

  const renderScheduleCardByType = (schedule, index) => {
    if (schedule.type === DEFAULT_TYPE_SCHEDULE)
      return (
        <IconButton
          disableRipple
          variant={'raised'}
          onClick={() => showAddScheduleModal()}>
          <AddIcon />
        </IconButton>
      );
    else
      return (
        <Button
          onClick={() => showScheduleSelected(schedule, index)}
          variant="contained">
          {schedule.label}
        </Button>
      );
  };

  const checkSelectedState = featureId => {
    let featuresAux = features.map(feature => {
      if (feature._id === featureId) {
        return { ...feature, isSelected: !feature.isSelected };
      }
      return { ...feature };
    });
    setFeatures(featuresAux);
  };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const showSlotModal = props => {
    setSlotModalOpen(true);
  };

  // const setField = () => {
  //   let newFieldData = {
  //     name: '',
  //     price: 0,
  //     typeOfField: '5v5',
  //     typeOfSurface: 'Artificial'
  //   };
  //   setFields([...fields, newFieldData]);
  // };

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

  const deleteService = currentIndex => {
    let servicesUpdated = services.filter((feature, index) => {
      return index !== currentIndex;
    });
    setServices(servicesUpdated);
  };

  const openMapModal = () => {
    setMapModalOpen(true);
  };

  const onMarkerDragEnd = (event, map, coord) => {
    const { latLng } = event;
    const lat = latLng.lat();
    const lng = latLng.lng();
    setCenter({ lng, lat });
    Geocode.fromLatLng(lat, lng).then(
      response => {
        const address = response.results[0].formatted_address;
        setAddress(address);
      },
      error => {
        console.error(error);
      }
    );
  };

  return (
    <div className="register-description-container">
      <Grid container spacing={3}>
        <Grid item md={4} xs={12}>
          <Typography variant="h2" style={{ marginBottom: 15 }}>
            <span>Describe tu sucursal deportivo</span>
          </Typography>
          <Typography style={{ marginBottom: 30 }}>
            <span>Completa el siguiente formulario</span>
          </Typography>
          <InputLabel className={classes.label}>
            Dirección de tu sucursal
          </InputLabel>
          <Button
            variant="contained"
            onClick={openMapModal}
            className={addressInfo.address ? classes.addDirectionButton : {}}>
            {addressInfo.address ? addressInfo.address : 'Agregar dirección'}
          </Button>
          {!addressInfo.address && (
            <Typography className={classes.addDirectionButton}>
              Agrega una dirección
            </Typography>
          )}

          <InputLabel className={classes.label}>
            Horarios de atención
          </InputLabel>
          <div className={classes.schedulesContainer}>
            {schedules.map((schedule, index) => {
              return renderScheduleCardByType(schedule, index);
            })}
          </div>
          <Typography style={{ marginBottom: 15, marginTop: 10 }}>
            Seleccione las modalidades con las que cuenta su sucursal
          </Typography>
          <Grid container spacing={2}>
            <Grid
              item
              md={6}
              xs={12}
              style={{ display: 'flex', flexDirection: 'column' }}>
              <Button
                variant="contained"
                className={classes.addDirectionButton}
                onClick={() => setServicesModalOpen(true)}>
                {services.length > 0
                  ? services.length + ' servicios'
                  : 'Agrega servicios'}
              </Button>
              {services.length === 0 && (
                <Typography>Agrega por lo menos un servicio</Typography>
              )}
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
              style={{ display: 'flex', flexDirection: 'column' }}>
              <Button
                variant="contained"
                className={classes.addDirectionButton}
                onClick={() => setFeaturesModalOpen(true)}>
                {features.filter(feature => feature.isSelected).length > 0
                  ? features.length + ' características'
                  : 'Agrega características'}
              </Button>
              {features.filter(feature => feature.isSelected).length === 0 && (
                <Typography>Agrega por lo menos una característica</Typography>
              )}
            </Grid>
          </Grid>

          {/* <Grid container spacing={5}>
          
          </Grid> */}
        </Grid>
        <Grid
          item
          md={8}
          xs={12}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
          <Grid container spacing={2}>
            <Grid
              item
              md={6}
              xs={12}
              style={{ display: 'flex', justifyContent: 'left' }}>
              <Typography>¿Cúantas espacios posee su sucursal?</Typography>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
              className="register-description-add-slot-container">
              <Button
                onClick={() => showSlotModal()}
                size="large"
                variant="contained"
                color="primary"
                style={{
                  color: 'black'
                }}>
                Agregar espacio
              </Button>
            </Grid>

            <div className="register-description-slots-container">
              {slots.map(slot => {
                return (
                  <div className="register-slots-slot-card">
                    <Typography variant="h4">{slot.name}</Typography>
                    <Typography>
                      {slot.features.length} Características
                    </Typography>
                  </div>
                );
              })}
              {slots.length === 0 && (
                <Typography variant="h3">Agrega espacios</Typography>
              )}
            </div>
          </Grid>

          <Grid container>
            <Grid
              item
              md={6}
              xs={12}
              style={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center'
              }}>
              <Button
                onClick={() => props.stepReturn()}
                size="large"
                variant="contained"
                style={{
                  color: 'black'
                }}>
                Regresar
              </Button>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center'
              }}>
              <Button
                onClick={() => saveInfo()}
                size="large"
                variant="contained"
                color="primary"
                style={{
                  color: 'black'
                }}>
                Siguiente
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Dialog
        fullWidth={true}
        maxWidth={'md'}
        open={featuresModalOpen}
        onClose={() => setFeaturesModalOpen(false)}
        aria-labelledby="max-width-dialog-title">
        <DialogTitle id="max-width-dialog-title">
          <Typography variant={'h3'}>Agrega características</Typography>
        </DialogTitle>
        <DialogContent>
          <div className="register-description-features-container">
            {isFeaturesLoading && <CircularProgress color="primary" />}
            {!isFeaturesLoading &&
              features.map(feature => {
                return (
                  <div className="register-description-features-item">
                    <Button
                      onClick={() => checkSelectedState(feature._id)}
                      size="large"
                      variant="contained"
                      color={feature.isSelected ? 'primary' : 'grey'}
                      startIcon={<WifiIcon />}
                      style={{
                        width: '100%'
                      }}>
                      {feature.name}
                    </Button>
                  </div>
                );
              })}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFeaturesModalOpen(false)} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        fullWidth={true}
        maxWidth={'md'}
        open={servicesModalOpen}
        onClose={() => setServicesModalOpen(false)}
        aria-labelledby="max-width-dialog-title">
        <DialogTitle id="max-width-dialog-title">
          <Typography variant={'h3'}>Agrega Servicios</Typography>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <ValidatorForm
                onSubmit={event => addNewService(event)}
                style={{ display: 'flex', width: '100%' }}
                onError={errors => console.log(errors)}>
                <Grid container spacing={2}>
                  <Grid item md={6} xs={12}>
                    <InputLabel>Nombre</InputLabel>
                    <TextValidator
                      fullWidth
                      value={serviceName}
                      validators={['required']}
                      errorMessages={['Este campo es requerido']}
                      onChange={event => setServiceName(event.target.value)}
                    />
                  </Grid>
                  <Grid item md={2} xs={12}>
                    <InputLabel>Duración</InputLabel>
                    <TextField
                      fullWidth
                      min={1}
                      max={10}
                      onKeyDown="return false"
                      type="number"
                      onInput={event =>
                        setServiceDuration(Math.round(event.target.value))
                      }
                      value={Math.round(serviceDuration)}
                      onChange={event => setServiceDuration(event.target.value)}
                    />
                  </Grid>
                  <Grid item md={2} xs={12}>
                    <InputLabel>Precio</InputLabel>
                    <TextValidator
                      fullWidth
                      value={servicePrice}
                      validators={['required']}
                      errorMessages={['Este campo es requerido']}
                      onChange={event => setServicePrice(event.target.value)}
                    />
                  </Grid>
                  <Grid
                    item
                    md={2}
                    xs={12}
                    style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button variant={'contained'} color="primary" type="submit">
                      Añadir
                    </Button>
                  </Grid>
                </Grid>
              </ValidatorForm>
            </Grid>
            <Grid item xs={12}>
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                  <TableHead style={{ backgroundColor: '#1D1D1D' }}>
                    <TableRow>
                      <StyledTableCell align="left">Nombre</StyledTableCell>
                      <StyledTableCell align="left">Duración</StyledTableCell>
                      <StyledTableCell align="left">Precio</StyledTableCell>
                      <StyledTableCell align="left"></StyledTableCell>
                      {/* <StyledTableCell align="left">Estado</StyledTableCell> */}
                    </TableRow>
                  </TableHead>
                  {/* <TableBody> */}

                  <TableBody>
                    {(rowsPerPage > 0
                      ? services.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                      : fields
                    ).map((row, index) => (
                      <StyledTableRow key={row.name}>
                        <StyledTableCell align="left">
                          <Typography>{row.name}</Typography>
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          <Typography>{row.duration}</Typography>
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          <Typography>{row.price}</Typography>
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          <IconButton onClick={() => deleteService(index)}>
                            <DeleteIcon />
                          </IconButton>
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
                        count={slotFeatures.length}
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
          <Button onClick={() => setServicesModalOpen(false)} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        fullWidth={true}
        maxWidth={'lg'}
        open={mapModalOpen}
        onClose={() => setMapModalOpen(false)}
        aria-labelledby="max-width-dialog-title">
        <DialogTitle id="max-width-dialog-title">
          <Typography variant={'h3'}>
            Agrega una ubicación para tu sucursal
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item md={6} xs={12}>
              <InputLabel className={classes.label}>
                Dirección de tu sucursal
              </InputLabel>
              <PlacesAutocomplete
                value={address}
                onChange={handleChange}
                onSelect={handleSelect}>
                {({
                  getInputProps,
                  suggestions,
                  getSuggestionItemProps,
                  loading
                }) => (
                  <div>
                    <TextField
                      {...getInputProps({
                        placeholder: 'Busca tu lugar',
                        className: 'location-search-input'
                      })}
                      fullWidth
                      type="email"
                      margin="dense"
                      name="firstName"
                      color="#ACFE00"
                      value={address}
                      // onChange={event => setAddress(event.target.value)}
                      style={{ marginBottom: 15 }}
                      //   onChange={event =>
                      //     setFieldInfo({ ...fieldInfo, name: event.target.value })
                      //   }
                      required
                      variant="outlined"
                    />
                    {/* <input
                     
                    /> */}
                    <div className="autocomplete-dropdown-container">
                      {loading && <div>Buscando...</div>}
                      {suggestions.map(suggestion => {
                        // const className = suggestion.active
                        //   ? 'suggestion-item--active'
                        //   : 'suggestion-item';
                        // inline style for demonstration purpose
                        // const style = suggestion.active
                        //   ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                        //   : { backgroundColor: '#ffffff', cursor: 'pointer' };
                        return (
                          <List
                            {...getSuggestionItemProps(suggestion, {
                              // className,
                              // style
                            })}
                            component="nav"
                            aria-label="secondary mailbox folders">
                            <ListItem>
                              <ListItem button>
                                <ListItemText
                                  primary={suggestion.description}
                                />
                              </ListItem>
                            </ListItem>
                          </List>
                          // <div
                          //   {...getSuggestionItemProps(suggestion, {
                          //     className,
                          //     style
                          //   })}>
                          //   <span>{suggestion.description}</span>
                          // </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </PlacesAutocomplete>
            </Grid>
            <Grid item md={6} xs={12}>
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={2}
                onLoad={onLoad}
                onUnmount={onUnmount}>
                {/* Child components, such as markers, info windows, etc. */}
                <Marker
                  draggable
                  onDragEnd={onMarkerDragEnd}
                  position={center}
                />
                <></>
              </GoogleMap>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            variant={'contained'}
            onClick={() => saveAddressInfo()}
            color="primary">
            Guardar
          </Button>
          <Button onClick={() => setMapModalOpen(false)} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        fullWidth={true}
        maxWidth={'sm'}
        open={scheduleModalOpen}
        onClose={() => setScheduleModalOpen(false)}
        aria-labelledby="max-width-dialog-title">
        <DialogTitle id="max-width-dialog-title">
          <Typography variant={'h3'}>Agrega horarios de atención</Typography>
        </DialogTitle>
        <DialogContent>
          <Grid container>
            <Grid item xs={12}>
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                {daysOfWeek.map(day => {
                  return (
                    <IconButton
                      disabled={day.isDisabled}
                      className={
                        day.isSelected
                          ? [classes.dayContainer, classes.selectedDay]
                          : [classes.dayContainer, classes.unselectedDay]
                      }
                      onClick={() => selectScheduleDay(day)}>
                      <div>{day.title}</div>
                    </IconButton>
                  );
                })}
              </div>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid
                  item
                  xs={6}
                  style={{ display: 'flex', flexDirection: 'column' }}
                  className={classes.timePickerContainer}>
                  <InputLabel style={{ marginTop: 10 }}>
                    Hora de inicio
                  </InputLabel>
                  <TextField
                    id="time"
                    style={{ width: '50%', marginTop: 5 }}
                    maxWidth={'sm'}
                    type="time"
                    defaultValue="07:30"
                    className={classes.textField}
                    value={startTime}
                    onChange={event => setStartTime(event.target.value)}
                    InputLabelProps={{
                      shrink: true
                    }}
                    inputProps={{
                      step: 300 // 5 min
                    }}
                  />
                </Grid>
                <Grid
                  item
                  xs={6}
                  style={{ display: 'flex', flexDirection: 'column' }}
                  className={classes.timePickerContainer}>
                  <InputLabel style={{ marginTop: 10 }}>Hora de fin</InputLabel>
                  <TextField
                    id="time"
                    style={{ width: '50%', marginTop: 5 }}
                    type="time"
                    defaultValue="07:30"
                    value={endTime}
                    onChange={event => setEndTime(event.target.value)}
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true
                    }}
                    inputProps={{
                      step: 300 // 5 min
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            variant={'contained'}
            onClick={() => saveScheduleTime()}
            color="primary">
            {editionMode ? 'Actualizar' : 'Guardar'}
          </Button>
          {editionMode && (
            <Button
              variant={'contained'}
              onClick={() => deleteScheduleTime()}
              color="warning">
              Eliminar
            </Button>
          )}

          <Button onClick={() => setScheduleModalOpen(false)} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        fullWidth={true}
        maxWidth={'sm'}
        open={slotModalOpen}
        onClose={() => setSlotModalOpen(false)}
        aria-labelledby="max-width-dialog-title">
        <DialogTitle id="max-width-dialog-title">
          <Typography variant={'h3'}>Agrega un espacio</Typography>
        </DialogTitle>
        <DialogContent>
          <Grid container>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item md={4} xs={12}>
                  <InputLabel>Nombre del espacio</InputLabel>
                  <TextField
                    fullWidth
                    value={slotName}
                    onChange={event => setSlotName(event.target.value)}
                  />
                </Grid>
                <Grid item md={4} xs={12}>
                  <InputLabel>Precio</InputLabel>
                  <TextField
                    fullWidth
                    value={slotPrice}
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
                        value={isSlotActive}
                        onChange={event => setSlotState(event.target.checked)}
                      />
                    }
                    label={'Estado: ' + (isSlotActive ? 'Activo' : 'Inactivo')}
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
                    {(rowsPerPage > 0
                      ? slotFeatures.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                      : fields
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
                        count={slotFeatures.length}
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
            onClick={() => saveSlot()}
            color="primary">
            Guardar
          </Button>
          <Button onClick={() => setSlotModalOpen(false)} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarState}
        autoHideDuration={6000}
        onClose={() => setSnackbarState(false)}>
        <Alert onClose={() => setSnackbarState(false)} severity="warning">
          {errorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

const mapStateToProps = state => ({
  registerData: state.userReducer.registerData
});

const mapDispatchToProps = dispatch => ({
  addRegisterData: registerData => dispatch(addRegisterData(registerData))
});

export default connect(mapStateToProps, mapDispatchToProps)(Description);
