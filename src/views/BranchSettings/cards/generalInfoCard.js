import React, { useRef, useState } from 'react';
import {
  Grid,
  Typography,
  Button,
  Card,
  // Table,
  // TableBody,
  TableCell,
  // TableContainer,
  // TablePagination,
  // TableFooter,
  // TableHead,
  TableRow,
  IconButton,
  Paper,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  InputLabel,
  TextField,
  List,
  ListItem,
  ListItemText
} from '@material-ui/core';
import {
  makeStyles,
  withStyles,
  useTheme,
  createStyles
} from '@material-ui/styles';

import AddIcon from '@material-ui/icons/Add';
import { updateBranch } from 'services/branchesService';

import {
  KeyboardArrowRight,
  KeyboardArrowLeft,
  FirstPage as FirstPageIcon,
  LastPage as LastPageIcon,
  Cancel as CancelRoundedIcon
} from '@material-ui/icons';

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete';

import { GoogleMap, Marker } from '@react-google-maps/api';
import Geocode from 'react-geocode';

import { getDaysFromIndex, getTime12Format } from 'assets/helpers/utilities';
import './general-info-styles.css';

const useStyles1 = makeStyles(theme =>
  createStyles({
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5)
    }
  })
);

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
    color: theme.palette.common.black,
    textAlign: 'center'
  },

  body: {
    fontSize: 14,
    padding: 10
  }
}))(TableCell);

const useStyles = makeStyles(theme => ({
  button: {
    backgroundColor: '#ACFE00'
  },
  schedulesButton: {
    marginBottom: 10
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
    marginRight: 10,
    marginBottom: 10,
    height: 50,
    '&:hover': {
      backgroundColor: theme.palette.primary.main
    }
  },
  addDirectionButton: {
    marginBottom: 25
  },
  cardContainer: {
    padding: 24,
    marginTop: 30
  },
  cardHeader: {
    marginTop: 15,
    marginBottom: 15,
    display: 'flex',
    flexDirection: 'row'
  },
  section: {
    marginTop: 10,
    marginBottom: 10
  },
  cardImages: {
    display: 'flex',
    flexDirection: 'column'
  },
  imagesContainer: {
    height: 150
  },
  editButtonContainer: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
}));

const fieldsArray = [
  {
    id: 1,
    name: 'Cancha #1',
    typeOfSurface: 'Natural',
    typeOfSlot: '5v5 - 8v8'
  },
  {
    id: 1,
    name: 'Cancha #2',
    typeOfSurface: 'Natural',
    typeOfSlot: '5v5 - 8v8'
  },
  {
    id: 1,
    name: 'Cancha #3',
    typeOfSurface: 'Natural',
    typeOfSlot: '5v5 - 8v8'
  },
  {
    id: 1,
    name: 'Cancha #4',
    typeOfSurface: 'Natural',
    typeOfSlot: '5v5 - 8v8'
  }
];

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

const centerAux = {
  lat: 13.708536,
  lng: -89.240989
};

const containerStyle = {
  width: '100%',
  height: '500px'
};

const GeneralInfoCard = props => {
  const classes = useStyles();
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [schedules, setSchedules] = useState([]);
  const mapRef = useRef(null);
  const [center, setCenter] = useState(centerAux);
  const [address, setAddress] = useState('');
  const [addressInfo, setAddressInfo] = useState({});
  const [page, setPage] = useState(0);
  const [snackbarState, setSnackbarState] = useState(false);
  const [mapModalOpen, setMapModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [daysOfWeek, setDaysOfWeek] = useState(daysOfWeekAux);
  const [scheduleIndex, setScheduleIndex] = useState('');
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);

  const [editionMode, setEditionMode] = useState(false);

  const [map, setMap] = React.useState(null);
  const fields = fieldsArray;

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

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

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, fields.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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

  const setScheduleFormat = scheduleTime => {
    let scheduleDays = getDaysFromIndex(scheduleTime.days);
    let startTimeAux = scheduleTime.startTime.split(':');
    let endTimeAux = scheduleTime.endTime.split(':');
    return `${scheduleDays} -  de ${getTime12Format(
      startTimeAux[0],
      startTimeAux[1]
    )} a ${getTime12Format(endTimeAux[0], endTimeAux[1])}`;
  };

  const handleEditionButton = () => {
    let branchSchedules = props.branchInfo.schedules;
    setAddressInfo(props.branchInfo?.address);
    setAddress(props.branchInfo?.address.address);
    setSchedules(branchSchedules);
    setEditionMode(true);
  };

  const isValidTime = () => {
    let startTimeAux = Number(
      startTime.split(':')[0] + startTime.split(':')[1]
    );
    let endTimeAux = Number(endTime.split(':')[0] + endTime.split(':')[1]);
    return startTimeAux < endTimeAux;
  };

  const handleChange = address => {
    setAddress(address);
  };

  const handleSelect = address => {
    // setAddressInfo(address);
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

      console.log('mapa', mapRef);
      map.fitBounds(bounds);
      console.log('mapa', map);
      map.setCenter({ lat: addressInfo.lat, lng: addressInfo.lng });
      setMap(map);
      setTimeout(() => {
        if (addressInfo) {
          console.log({ lat: addressInfo.lat, lng: addressInfo.lng });
          setCenter({ lat: addressInfo.lat, lng: addressInfo.lng });
        }
      }, 1000);
    },
    [addressInfo]
  );

  const saveAddressInfo = () => {
    if (address && center.lat && center.lng) {
      setMapModalOpen(false);
      setAddressInfo({ address, lat: center.lat, lng: center.lng });
    } else {
      setErrorMessage('Agrega una ubicación');
      setSnackbarState(true);
    }
  };

  const renderBranchAddress = () => {
    if (editionMode) {
      return (
        <Button
          variant="contained"
          onClick={openMapModal}
          f
          className={addressInfo.address ? classes.addDirectionButton : {}}>
          {addressInfo.address}
        </Button>
      );
    } else {
      return <Typography>{props.branchInfo?.address?.address}</Typography>;
    }
  };

  const openMapModal = () => {
    let branchAddress = props.branchInfo?.address;
    setCenter({ lng: branchAddress.lng, lat: branchAddress.lat });
    setMapModalOpen(true);
  };

  const cancelEditionMode = () => {
    setAddress('');
    setAddressInfo({});
    setEditionMode(false);
  };

  const renderEditionButton = () => {
    if (editionMode) {
      return (
        <IconButton onClick={cancelEditionMode}>
          <CancelRoundedIcon />
        </IconButton>
      );
    } else {
      return (
        <Button
          onClick={handleEditionButton}
          variant="contained"
          color="primary">
          Editar
        </Button>
      );
    }
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

  const saveScheduleTime = () => {
    if (!isValidTime()) {
      return;
    }

    let schedulesAuxUpdated = [...schedules];
    let selectedShedule = {};
    selectedShedule.type = 1;

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
    selectedShedule.days = selectedSheduleDays.map(day => day.index);

    if (editionMode && scheduleIndex !== '') {
      schedulesAuxUpdated.splice(scheduleIndex, 1, selectedShedule);
    } else {
      schedulesAuxUpdated.push(selectedShedule);
      // schedulesAuxUpdated.push(defaultShedule);
    }

    setSchedules(schedulesAuxUpdated);
    setScheduleModalOpen(false);
  };

  const handleUpdateBranch = async () => {
    try {
      let branchOfficeId = JSON.parse(localStorage.getItem('spazer_user'))
        .branchOffice._id;
      let branchToUpdate = {
        id: branchOfficeId,
        address: addressInfo,
        schedules: schedules.map(schedule => ({
          days: schedule.days,
          startTime: schedule.startTime,
          endTime: schedule.endTime
        }))
      };
      let result = await updateBranch(branchToUpdate);
      console.log('Se actualizó', result);
      handleCancelEditionMode();
    } catch (error) {
      console.log('dio error', error);
    }
  };

  const handleCancelEditionMode = () => {
    setAddress('');
    setAddressInfo({});
    setSchedules([]);
    setEditionMode(false);
  };

  const cleanScheduleValues = () => {
    let daysAux = daysOfWeek.map(day => ({ ...day, isSelected: false }));

    let daysReset = daysAux.map(day => {
      let dayAlreadySelected = false;
      schedules.forEach(schedule => {
        if (schedule.days.includes(day.index)) dayAlreadySelected = true;
      });

      if (dayAlreadySelected)
        return { ...day, isDisabled: true, isSelected: false };
      else return { ...day, isDisabled: false, isSelected: false };
    });

    setDaysOfWeek(daysReset);
    setStartTime('00:00');
    setEndTime('00:00');
  };

  const deleteScheduleTime = () => {
    let schedulesAux = schedules.filter(
      (schedule, index) => index !== scheduleIndex
    );
    setSchedules(schedulesAux);
    setScheduleModalOpen(false);
  };

  const showAddScheduleModal = () => {
    cleanScheduleValues();
    // setEditionMode(false);
    setScheduleIndex('');
    setScheduleModalOpen(true);
  };

  const showScheduleSelected = (schedule, index) => {
    // cleanScheduleValues();
    let daysAux = daysOfWeek.map(day => ({ ...day, isSelected: false }));

    let daysReset = daysAux.map(day => {
      let dayAlreadySelected = false;
      schedules.forEach(schedule => {
        if (schedule.days.includes(day.index)) dayAlreadySelected = true;
      });

      if (dayAlreadySelected)
        return { ...day, isDisabled: true, isSelected: false };
      else return { ...day, isDisabled: false, isSelected: false };
    });
    let daysSelected = daysReset.map(day => {
      if (schedule.days.includes(day.index)) {
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
    return (
      <Button
        className={classes.schedulesButton}
        onClick={() => showScheduleSelected(schedule, index)}
        variant="contained">
        {setScheduleFormat(schedule)}
      </Button>
    );
  };

  const renderSchedules = () => {
    if (editionMode) {
      return (
        <div className={classes.schedulesContainer}>
          {schedules.map((schedule, index) => {
            return renderScheduleCardByType(schedule, index);
          })}
        </div>
      );
    } else {
      if (props.branchInfo._id) {
        return props.branchInfo.schedules.map(schedule => {
          return <Typography bold>{setScheduleFormat(schedule)}</Typography>;
        });
      }
    }
  };

  return (
    <Card fullWidth={true} className={classes.cardContainer}>
      <Grid container spacing={2} className={classes.cardHeader}>
        <Grid item md={6} xs={6}>
          <Typography variant={'h3'}>Datos Generales</Typography>
        </Grid>
        <Grid item md={6} xs={6} className={classes.editButtonContainer}>
          {renderEditionButton()}
        </Grid>
      </Grid>
      <Grid
        container
        spacing={2}
        className={[classes.cardImages, classes.section]}>
        <Grid item md={6} xs={12}>
          <Typography variant={'h4'}>Dirección de complejo</Typography>
        </Grid>
        <Grid item md={6} xs={12} className={classes.imagesContainer}>
          {renderBranchAddress()}
        </Grid>
      </Grid>
      <Grid
        container
        spacing={2}
        className={[classes.cardImages, classes.section]}>
        <Grid item md={6} xs={12}>
          <Typography variant={'h4'}>Horarios de atención</Typography>
          {editionMode && (
            <IconButton onClick={showAddScheduleModal}>
              <AddIcon />
            </IconButton>
          )}
        </Grid>
        <Grid item md={6} xs={12} className={classes.imagesContainer}>
          {renderSchedules()}
        </Grid>
      </Grid>
      {editionMode && (
        <div className={'general-info-update-container'}>
          <Button
            style={{ marginRight: 10 }}
            color="primary"
            variant="contained"
            onClick={() => handleUpdateBranch()}>
            Actualizar
          </Button>
          <Button variant="contained" onClick={() => handleCancelEditionMode()}>
            Cancelar
          </Button>
        </div>
      )}

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
                ref={mapRef}
                mapContainerStyle={containerStyle}
                defaultCenter={center}
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
            {editionMode && scheduleIndex !== '' ? 'Actualizar' : 'Guardar'}
          </Button>
          {editionMode && scheduleIndex !== '' && (
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
    </Card>
  );
};

export default GeneralInfoCard;
