import React, { useState } from 'react';
import {
  Grid,
  Typography,
  InputLabel,
  Button,
  CircularProgress
} from '@material-ui/core';

import { Wifi as WifiIcon } from '@material-ui/icons';

import 'views/Register/steps/register-description-step.css';

import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  scheduleCard: {
    marginBottom: theme.spacing(1)
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
  },
  textField: {
    marginBottom: 15
  }
}));

const daysOfWeekAux = [
  {
    title: 'D',
    name: 'Domingo',
    index: 0,
    isSelected: false
  },
  {
    title: 'L',
    name: 'Lunes',
    index: 1,
    isSelected: false
  },
  {
    title: 'M',
    name: 'Martes',
    index: 2,
    isSelected: false
  },
  {
    title: 'M',
    name: 'Miércoles',
    index: 3,
    isSelected: false
  },
  {
    title: 'J',
    name: 'Jueves',
    index: 4,
    isSelected: false
  },
  {
    title: 'V',
    name: 'Viernes',
    index: 5,
    isSelected: false
  },
  {
    title: 'S',
    name: 'Sábado',
    index: 6,
    isSelected: false
  }
];

const Description = ({ request }) => {
  const classes = useStyles();
  const [slots] = useState([{ name: 'Cancha #1', features: [{}, {}, {}] }]);
  const [features] = useState([]);

  const [isFeaturesLoading] = useState([]);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item md={6} xs={12}>
          <Typography variant="h4" className={classes.label}>
            Dirección de sucursal
          </Typography>
          <Typography variant="h5" className={classes.textField}>
            {request.branchOffice ? request.branchOffice.address.address : ''}
          </Typography>
          <InputLabel className={classes.label}>
            Horarios de atención
          </InputLabel>
          <div className={classes.schedulesContainer}>
            {request.branchOffice &&
              request.branchOffice.schedules.map(schedule => {
                let scheduleDays = schedule.days
                  .map(day => daysOfWeekAux[day].name)
                  .join(', ');
                let label =
                  scheduleDays +
                  ' ' +
                  schedule.startTime +
                  ' - ' +
                  schedule.endTime;
                return (
                  <Button variant="contained" className={classes.scheduleCard}>
                    {label}
                  </Button>
                );
              })}
          </div>
          <Typography style={{ marginBottom: 15, marginTop: 10 }}>
            Modalidades del complejo
          </Typography>
          <Grid container spacing={2}>
            <Grid
              item
              md={6}
              xs={12}
              style={{ display: 'flex', flexDirection: 'column' }}>
              <Button
                variant="contained"
                disabled={true}
                className={classes.addDirectionButton}>
                {request.branchOffice &&
                  request.branchOffice.services.length > 0 &&
                  request.branchOffice.services.length + ' servicios'}
              </Button>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
              style={{ display: 'flex', flexDirection: 'column' }}>
              <Button
                variant="contained"
                disabled={true}
                className={classes.addDirectionButton}>
                {request.branchOffice &&
                  request.branchOffice.services.length > 0 &&
                  request.branchOffice.services.length + ' características'}
              </Button>
            </Grid>
          </Grid>
          {/* <Grid container spacing={5}>
          
          </Grid> */}
        </Grid>
        <Grid
          item
          md={6}
          xs={12}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
          <Grid container spacing={2}>
            <div className="register-description-slots-container">
              <div className="register-slots-slot-card">
                <Typography>
                  {request.branchOffice.slots.length} Espacios
                </Typography>
              </div>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Description;
