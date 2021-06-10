import React, { useState, useRef, useEffect } from 'react';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  IconButton,
  Dialog,
  // DialogTitle,
  TextareaAutosize,
  Stepper,
  Step,
  StepLabel,
  StepConnector,
  Typography,
  Grid,
  DialogContent,
  Fab,
  Menu,
  MenuItem,
  DialogActions,
  Divider,
  InputLabel
} from '@material-ui/core';

import EditIcon from '@material-ui/icons/Edit';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ReceiptIcon from '@material-ui/icons/Receipt';

import { makeStyles, withStyles } from '@material-ui/styles';

import MuiDialogTitle from '@material-ui/core/DialogTitle';

import CloseIcon from '@material-ui/icons/Close';

import BookingPropertyCard from './utils/bookingPropertyCard';

import { getDateFormatFromDateString } from 'assets/helpers/utilities';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { connect } from 'react-redux';
import NewBookingCard from './utils/newBookingCard';
import ReserveInfoCard from './utils/reserveInfoCard';
import ResumePaymentInfoCard from './utils/resumePaymentInfoCard';
import { getBookingsByMonth, makeBooking } from 'services/bookingService';
import { createBann } from 'services/bannService';
import './calendar-styles.css';
import { addReserveData } from 'reduxStore/actions/user';
import { getServicesByBranchId } from 'services/branchesService';

import { emailValidator } from 'services/authService';
import useDebouncedSearch from 'assets/hooks/useDebounce';

const useDebounce = () => useDebouncedSearch(text => emailValidator(text));

let paletteProvider = '';
const useStyles = makeStyles(theme => {
  paletteProvider = theme.palette;
  return {
    divider: {
      width: '100%',
      borderWidth: 1,
      borderColor: 'grey',
      marginTop: 5,
      marginBottom: 15
    },
    bannMessageContainer: {
      marginTop: 10,
      width: '100%'
    },
    scheduleTotalPrice: {
      marginTop: 10
    },
    scheduleTotalPriceAmount: {
      color: theme.palette.primary.main
    },
    reservesLabel: {
      marginBottom: 5
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
      // maxHeight: 200,
      // overflowY: 'scroll'
    },
    eventScheduleItem: {
      background: theme.palette.primary.main,
      color: 'black',
      width: '100%',
      height: '100%',
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    headerCardContainer: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText
    },
    dialogContainer: {
      padding: 24
    },
    scheduleCardContainer: {
      marginBottom: 20,
      minHeight: 150,
      position: 'relative'
    },
    floatingButtonCardAction: {
      position: 'absolute',
      bottom: 10,
      right: 10
    },
    extraInfoContainer: {
      display: 'flex',
      marginTop: 24
    },
    centerText: {
      textAlign: 'center'
    },
    dialogHeaderContainer: {
      marginBottom: 24
    },
    extraInfoItemContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    },
    scheduleCardContentContainer: {
      display: 'flex',
      flexDirection: 'column'
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      // border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      avatar: {
        backgroundColor: 'red'
      }
    },
    stepperContainer: {
      justifyContent: 'center'
    },
    mainContainer: {
      paddingBottom: 40,
      //paddingRight: 15,
      paddingLeft: 30,
      paddingRight: 30
    },

    alternativeLabel: {},
    active: {}, //needed so that the &$active tag works
    completed: {},
    disabled: {}
  };
});

const ColorlibConnector = withStyles({
  alternativeLabel: {
    // top: 22
  },
  disabled: {
    '& $line': {
      backgroundColor: '#F4F4F4'
    }
  }
  // active: {
  //   '& $line': {
  //     backgroundColor: colorPalette.primary.main
  //   }
  // },
  // completed: {
  //   '& $line': {
  //     backgroundColor: colorPalette.primary.main
  //   }
  // },
  // line: {
  //   height: 3,
  //   border: 0,
  //   backgroundColor: colorPalette.primary.main,
  //   borderRadius: 1
  // }
})(StepConnector);

const styles = theme => {
  return {
    root: {
      margin: 0,
      padding: theme.spacing(2)
    },

    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500]
    }
  };
};

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const getSteps = () => {
  return ['Información general', 'Detalles de reserva', 'Resumen de reserva'];
};

const CalendarSchedule = props => {
  const calendarRef = useRef(null);
  const { inputText, setInputText, searchResults } = useDebounce();
  const [open, setOpen] = useState(false);
  const [bannMessage, setBannMessage] = useState('');
  const [userToBann, setUserToBann] = useState({});
  const [bannModal, setBannModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('1');
  const [services, setServices] = useState([]);
  const [activeStep, setActiveStep] = React.useState(0);
  const [noUser, setNoUser] = useState({});
  const steps = getSteps();
  const [typeOfUser, setTypeOfUser] = useState('u');
  const [reserveDate, onChangeReserveDate] = useState(new Date());
  const [reserveHour, setReserveHour] = useState('');
  const scroll = 'paper';
  const [anchorEl, setAnchorEl] = useState(null);
  const [bookingsByMonth, setBookingsByMonth] = useState([]);
  const [newBooking, setNewBooking] = useState({});
  const [newBookingOpen, setNewBookingOpen] = useState(false);
  const [currentSchedulesEvents, setCurrentSchedulesEvents] = useState([]);
  const classes = useStyles();

  const makeReserve = async () => {
    let reserveToSave = { ...props.reserveData };
    try {
      let branchOfficeId = JSON.parse(localStorage.getItem('spazer_user'))
        .branchOffice._id;
      reserveToSave.services = reserveToSave.services.map(
        service => service._id
      );
      reserveToSave.branchOffice = branchOfficeId;

      let result = await makeBooking(reserveToSave);
      console.log('resultado', result);
      setNewBookingOpen(false);
    } catch (error) {
      console.log('error', error);
    }

    console.log('esta es una reserva', reserveToSave);
  };

  const handleAction = () => {
    if (getSteps().length - 1 === activeStep) {
      makeReserve();
    } else {
      handleSkip();
    }
  };

  useEffect(() => {
    let currentDate = new Date();
    getReserves(currentDate);

    getServices();
  }, []);

  const getServices = async () => {
    try {
      let branchInfo = JSON.parse(localStorage.getItem('spazer_user'))
        .branchOffice;
      const result = await getServicesByBranchId(branchInfo._id);
      console.log('resultado', result);
      setServices(setSelectedStateToServices(result.data));
    } catch (error) {
      console.log('error');
    }
  };

  const setSelectedStateToServices = servicesAux => {
    return servicesAux.map(service => {
      return { ...service, isChecked: false };
    });
  };

  const getSelectedServices = () => {
    return services.filter(service => service.isChecked);
  };

  const handleSkip = () => {
    if (activeStep === 0) {
      let property = {};
      if (typeOfUser === 'u') {
        property.userEmail = inputText;
      } else {
        property.ifNoUser = noUser;
      }

      props.addReserveData(property);
    } else if (activeStep === 1) {
      let reserveDateAux = new Date(reserveDate);
      let selectedServices = getSelectedServices();

      let duration = selectedServices.reduce(
        (n, { duration }) => n + duration,
        0
      );
      let scheduleInfo = {
        date: reserveDateAux.toISOString().split('T')[0],
        startTime: Number(reserveHour.split(':')[0]) + duration,
        duration,
        services: selectedServices
      };
      props.addReserveData(scheduleInfo);
    } else {
      console.log('informacion a guardar', props.reserveData);
      // setNewBookingOpen(false)
      console.log('entro aqui');
    }
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const stepReturn = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const getStepContent = (stepIndex, handleSkip, stepReturn) => {
    switch (stepIndex) {
      case 0:
        return (
          <NewBookingCard
            handleBooking={handleBooking}
            newBooking={newBooking}
            typeOfUser={typeOfUser}
            setTypeOfUser={setTypeOfUser}
            noUser={noUser}
            setNoUser={setNoUser}
            inputText={inputText}
            setInputText={setInputText}
            searchResults={searchResults}
          />
        );
      case 1:
        return (
          <ReserveInfoCard
            onChangeReserveDate={onChangeReserveDate}
            reserveDate={reserveDate}
            reserveHour={reserveHour}
            setReserveHour={setReserveHour}
            services={services}
            setServices={setServices}
          />
        );
      case 2:
        return (
          <ResumePaymentInfoCard
            stepReturn={stepReturn}
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
          />
        );
      default:
        return 'Unknown stepIndex';
    }
  };

  const getReserves = async dateObject => {
    try {
      let { branchOffice } = JSON.parse(localStorage.getItem('spazer_user'));
      let data = {
        year: dateObject.getFullYear(),
        month: dateObject.getMonth(),
        branchId: branchOffice._id
      };
      let result = await getBookingsByMonth(data);
      console.log('resultado en vista', result);
      setBookingsByMonth(result.data);
    } catch (error) {
      console.log('error', error);
    }
  };

  const addNewBooking = () => {
    console.log('data', newBooking);
  };

  const handleCreationBann = async () => {
    try {
      let branchOfficeId = JSON.parse(localStorage.getItem('spazer_user'))
        .branchOffice._id;
      let data = {
        branchOffice: branchOfficeId,
        description: bannMessage,
        user: userToBann._id
      };
      let result = await createBann(data);
      setUserToBann({});
      setBannMessage('');
      setBannModal(false);
      console.log('result', result);
    } catch (error) {
      console.log('este es un error', error);
    }
  };

  const convertTo12FormatTime = time => {
    let AmOrPm = time >= 12 ? 'pm' : 'am';
    time = time % 12 || 12;
    let timeFormatted =
      (time < 10 ? '0' + String(time) : time) + ':' + '00' + ' ' + AmOrPm;

    return timeFormatted;
  };

  const getTimeLabel = ({ startTime, duration }) => {
    let startTimeToShow = convertTo12FormatTime(startTime);
    let endTimeToShow = convertTo12FormatTime(startTime + duration);

    return `${startTimeToShow} - ${endTimeToShow}`;
  };

  const getReservePaymentType = reserveType => {
    switch (reserveType) {
      case 1:
        return 'Pago Completo';
      case 2:
        return 'Reserva con $5';
      case 3:
        return 'Reserva sencilla';
      default:
        return 'No especificado';
    }
  };

  const handleDateClick = arg => {
    const currentDate = new Date(arg.date);

    setNewBooking({
      date: currentDate,
      start_time: currentDate,
      end_time: currentDate
    });
    setNewBookingOpen(true);
  };

  const handleTime = (type, time) => {
    let newBookingState = { ...newBooking };
    newBookingState[type] = time;

    setNewBooking(newBookingState);
  };

  const handleDateBooking = date => {
    setNewBooking({ date: new Date(date) });
  };

  const handleBooking = event => {
    let newBookingState = { ...newBooking };
    newBookingState[event.target.name] = event.target.value;
    setNewBooking(newBookingState);
  };

  const openDialog = currentSchedulesEvents => {
    let selectedDatetime = {
      times: currentSchedulesEvents.extendedProps.times,
      generalInfo: currentSchedulesEvents._instance.range
    };
    console.log(selectedDatetime);

    setCurrentSchedulesEvents(selectedDatetime);
    setOpen(true);
  };

  const renderSchedulesServices = schedulesServices => {
    return schedulesServices.map(service => {
      return (
        <BookingPropertyCard
          bookingProperty={{
            icon: <ShoppingCartIcon />,
            name: `${service.name} - $${service.price}`
          }}
        />
      );
    });
  };

  const renderEventTimeRange = () => {
    console.log('entro aqui en fechas', currentSchedulesEvents);
    if (
      currentSchedulesEvents.generalInfo &&
      currentSchedulesEvents.generalInfo.start &&
      currentSchedulesEvents.generalInfo.end
    ) {
      return getDateFormatFromDateString(
        currentSchedulesEvents.generalInfo.start
      );
    }
    // {getTimeFormatFromDate(currentSchedulesEvents.start)} -{' '}
    // {getTimeFormatFromDate(currentSchedulesEvents.end)}
  };

  const renderEventContent = eventInfo => {
    console.log('reservas', eventInfo);
    return (
      <>
        <div
          onClick={() => openDialog(eventInfo.event)}
          className={classes.eventScheduleItem}>
          <Typography variant={'h5'} style={{ textAlign: 'center' }}>
            Tiene{' '}
            {eventInfo.event.extendedProps.times
              ? eventInfo.event.extendedProps.times.length
              : 0}{' '}
            reservas
            {/* {currentSchedulesEvents.length} reservas */}
          </Typography>
          {/* {eventInfo.event.title} */}
        </div>
      </>
    );
  };

  const checkBackButton = () => {
    if (activeStep === 0) {
      setNewBookingOpen(false);
    } else {
      stepReturn();
    }
  };

  const handleBannUser = userSelected => {
    setUserToBann(userSelected);
    setBannModal(true);
    setOpen(false);
    setAnchorEl(null);
  };

  return (
    <div style={{ paddingLeft: 20, paddingRight: 20 }}>
      <FullCalendar
        eventColor={paletteProvider.primary.main}
        eventTextColor="black"
        ref={calendarRef}
        contentHeight={600}
        dateClick={handleDateClick}
        //   eventDisplay="block"
        eventContent={renderEventContent}
        events={bookingsByMonth}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        //   locale="es"

        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        weekends={true}
        initialView="dayGridMonth"
      />
      <Dialog
        fullWidth={true}
        maxWidth={'md'}
        PaperProps={{
          style: {
            padding: 24
          }
        }}
        onClose={() => setBannModal(false)}
        className={classes.dialogContainer}
        scroll={scroll}
        aria-labelledby="simple-dialog-title"
        aria-describedby="scroll-dialog-description"
        open={bannModal}>
        <DialogTitle>
          <Typography variant={'h3'}>
            Amonestación para: {userToBann.name}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <InputLabel>¿Cuál es la razón de la amonestación?</InputLabel>
              <TextareaAutosize
                fullWidth
                aria-label="minimum height"
                rowsMin={3}
                className={classes.bannMessageContainer}
                value={bannMessage}
                onChange={event => setBannMessage(event.target.value)}
              />
              <div
                style={{
                  marginTop: 10,
                  display: 'flex',
                  justifyContent: 'center',
                  width: '100%'
                }}>
                <Typography variant="h4">
                  No podrá hacer reservas durante algún tiempo
                </Typography>
              </div>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleCreationBann()}>
            Amonestar
          </Button>
          <Button onClick={() => setBannModal(false)}>Cancelar</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        fullWidth={true}
        maxWidth={'md'}
        PaperProps={{
          style: {
            padding: 24
          }
        }}
        onClose={() => setOpen(false)}
        className={classes.dialogContainer}
        scroll={scroll}
        aria-labelledby="simple-dialog-title"
        aria-describedby="scroll-dialog-description"
        open={open}>
        <Grid container spacing={2} className={classes.dialogHeaderContainer}>
          <Grid item md={6} xs={12}>
            <Typography variant={'h2'}>{renderEventTimeRange()}</Typography>
          </Grid>
          <Grid item md={6} xs={12}>
            <Typography variant={'h2'} style={{ textAlign: 'right' }}>
              {currentSchedulesEvents.times
                ? currentSchedulesEvents.times.length
                : 0}{' '}
              reservas
            </Typography>
          </Grid>
        </Grid>
        {/* <DialogTitle id="simple-dialog-title">          
         
         
        </DialogTitle> */}
        <DialogContent dividers={scroll === 'paper'}>
          <Grid container spacing={2}>
            {currentSchedulesEvents.times &&
              currentSchedulesEvents.times.map(schedule => {
                return (
                  <Grid item md={4} xs={12}>
                    <Card className={classes.scheduleCardContainer}>
                      <Fab
                        size="small"
                        color="primary"
                        aria-label="add"
                        className={classes.floatingButtonCardAction}>
                        <EditIcon />
                      </Fab>
                      <CardHeader
                        avatar={
                          <Avatar
                            src={schedule.user?.profilePicture?.url}
                            aria-label="recipe"
                            alt={schedule.user.name.charAt(0)}
                            className={classes.avatar}
                          />
                        }
                        action={
                          <IconButton
                            aria-controls="schedule-menu-options"
                            aira-haspopup="true"
                            onClick={event => setAnchorEl(event.target)}>
                            <MoreVertIcon />
                          </IconButton>
                        }
                        className={classes.headerCardContainer}
                        title={schedule.user.name}
                        titleTypographyProps={{ variant: 'subtitle1' }}
                        subheader={schedule.subheader}
                      />
                      <Menu
                        id="schedule-menu-options"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={event => setAnchorEl(null)}>
                        <MenuItem onClick={() => handleBannUser(schedule.user)}>
                          <Typography>Amonestar</Typography>
                        </MenuItem>
                      </Menu>
                      <CardContent
                        className={classes.scheduleCardContentContainer}>
                        <BookingPropertyCard
                          bookingProperty={{
                            icon: <AccessTimeIcon />,
                            name: getTimeLabel(schedule)
                          }}
                        />
                        <Divider className={classes.divider} />
                        <Typography
                          variant="h5"
                          className={classes.reservesLabel}>
                          Servicios
                        </Typography>
                        {renderSchedulesServices(schedule.services)}

                        <Divider className={classes.divider} />
                        <BookingPropertyCard
                          bookingProperty={{
                            icon: <ReceiptIcon />,
                            name: getReservePaymentType(schedule.type)
                          }}
                        />
                        <Typography
                          variant="h4"
                          className={classes.scheduleTotalPrice}>
                          Total:{' '}
                          <span className={classes.scheduleTotalPriceAmount}>
                            ${schedule.totalPrice}
                          </span>
                        </Typography>

                        {/* <Typography variant={'h3'} className={classes.centerText}>
                        {schedule.slot.name}
                      </Typography>
                      <Grid container className={classes.extraInfoContainer}>
                        <Grid
                          item
                          sm={6}
                          xs={12}
                          className={classes.extraInfoItemContainer}>
                          <SportsIcon />
                          <Typography>{schedule.slot.feature[0]}</Typography>
                        </Grid>
                        <Grid
                          item
                          sm={6}
                          xs={12}
                          className={classes.extraInfoItemContainer}>
                          <SportsIcon />
                          <Typography>{schedule.slot.feature[1]}</Typography>
                        </Grid>
                      </Grid> */}
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
          </Grid>
        </DialogContent>
      </Dialog>
      <Dialog
        onClose={() => setNewBookingOpen(false)}
        fullWidth={true}
        maxWidth={'lg'}
        aria-labelledby="customized-dialog-title"
        open={newBookingOpen}>
        <DialogTitle
          id="customized-dialog-title"
          onClose={() => setNewBookingOpen(false)}>
          <Typography variant={'h3'}>Agregar reserva</Typography>
        </DialogTitle>
        <DialogContent dividers style={{ padding: 25 }}>
          <Stepper
            activeStep={activeStep}
            alternativeLabel
            className={classes.stepperContainer}
            connector={<ColorlibConnector />}>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel
                  classes={{
                    alternativeLabel: classes.alternativeLabel,
                    labelContainer: classes.labelContainer
                  }}>
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
          <div>
            {activeStep === steps.length ? (
              <div></div>
            ) : (
              <div>
                {getStepContent(activeStep, handleSkip, stepReturn)}
                {/* <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
            <div>
              <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                Back
              </Button>
              {isStepOptional(activeStep) && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSkip}
                  className={classes.button}
                >
                  Skip
                </Button>
              )}
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
              >
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div> */}
              </div>
            )}
          </div>
        </DialogContent>
        <DialogActions style={{ padding: 25 }}>
          <Button
            autoFocus
            onClick={() => checkBackButton()}
            color="primary"
            style={{ color: 'black' }}>
            {activeStep === 0 ? 'Cancelar' : 'Anterior'}
          </Button>
          <Button
            onClick={() => handleAction()}
            variant="contained"
            color="primary"
            style={{
              marginLeft: 10
            }}>
            {getSteps().length - 1 === activeStep ? 'Reservar' : 'Siguiente'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapStateToProps = state => ({
  reserveData: state.userReducer.reserveData
});

const mapDispatchToProps = dispatch => ({
  addReserveData: data => dispatch(addReserveData(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(CalendarSchedule);
