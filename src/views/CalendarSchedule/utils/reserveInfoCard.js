import React, { useState, useEffect } from 'react';
import {
  Grid,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const useStyles = makeStyles(theme => ({
  root: {},
  row: {
    marginBottom: 15
  },
  rowCell: {
    display: 'flex',
    justifyContent: 'flex-start',
    justifyItems: 'center'
  },
  stepLabel: {
    marginBottom: 10
  },
  centerContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));

const ReserveInfoCard = props => {
  const classes = useStyles();

  // const theme = useTheme();

  const handleServiceSelected = (isChecked, serviceId) => {
    let servicesAux = props.services.map(service => {
      if (service._id === serviceId) {
        return { ...service, isChecked: isChecked };
      }
      return { ...service };
    });
    props.setServices(servicesAux);
  };

  return (
    <Grid container>
      <Grid item md={6} xs={12}>
        <Typography variant="h3" className={classes.stepLabel}>
          Información de Reserva
        </Typography>

        <div className={classes.centerContent}>
          <Calendar
            selectRange={false}
            onChange={props.onChangeReserveDate}
            value={props.reserveDate}
          />
        </div>
        <Grid container spacing={2} style={{ marginTop: 15 }}>
          <Grid item md={6} xs={12}>
            <Typography>Hora</Typography>
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              id="time"
              style={{ width: '50%', marginTop: 5 }}
              type="time"
              defaultValue="07:30"
              value={props.reserveHour}
              onChange={event => props.setReserveHour(event.target.value)}
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

      <Grid item md={6} xs={12}>
        <Typography variant="h3" className={classes.stepLabel}>
          &nbsp;
        </Typography>
        <Typography>Servicios</Typography>
        <Grid container spacing={2}>
          {props.services.map(service => {
            return (
              <Grid item md={6} xs={12}>
                <FormControlLabel
                  style={{ width: '100%' }}
                  control={
                    <Checkbox
                      checked={service.isSelected}
                      name="checkedF"
                      // color={theme.palette.secondary}
                      onChange={event => {
                        handleServiceSelected(
                          event.target.checked,
                          service._id
                        );
                      }}
                    />
                  }
                  label={`${service.name} - ${service.duration} horas - $${service.price}`}
                />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ReserveInfoCard;
