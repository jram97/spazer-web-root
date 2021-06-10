import React from 'react';
import {
  Grid,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  TextField,
  InputAdornment,
  Checkbox,
  FormControlLabel
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { getTime12Format } from 'assets/helpers/utilities';
import { connect } from 'react-redux';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import TodayIcon from '@material-ui/icons/Today';

const useStyles = makeStyles(theme => ({
  container: {
    marginBottom: 10
  },
  stepLabel: {
    marginBottom: 10
  },
  priceNumber: {
    color: theme.palette.primary.dark
  },
  resumeLabel: {
    marginBottom: 5
  }
}));

const ResumePaymentInfoCard = props => {
  const classes = useStyles();
  const addressName = JSON.parse(localStorage.getItem('spazer_user'))
    .branchOffice.address.address;
  console.log('valor de props', props.reserveData);

  const getServicesPrice = () => {
    let { services } = props.reserveData;
    return services.reduce((n, { price }) => n + price, 0);
  };

  const getReserveDatetime = () => {
    let { startTime, duration, date } = props.reserveData;
    let startTimeAux = getTime12Format(startTime, 0);
    let endTimeAux = getTime12Format(startTime + duration, 0);
    return (
      date
        .split('-')
        .reverse()
        .join('/') +
      ' De ' +
      startTimeAux +
      ' a ' +
      endTimeAux
    );
  };

  const renderContactInfo = () => {
    if (props.reserveData.userEmail) {
      return (
        <Grid item xs={12}>
          <InputLabel className={classes.resumeLabel}>Email</InputLabel>
          <TextField
            fullWidth
            disabled
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              )
            }}
            value={props.reserveData.userEmail}
          />
        </Grid>
      );
    } else {
      return (
        <>
          <Grid item md={4} xs={12}>
            <InputLabel className={classes.resumeLabel}>Nombre</InputLabel>
            <TextField
              fullWidth
              disabled
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountBoxIcon />
                  </InputAdornment>
                )
              }}
              value={props.reserveData.ifNoUser.name}
            />
          </Grid>
          <Grid item md={4} xs={12}>
            <InputLabel className={classes.resumeLabel}>Número</InputLabel>
            <TextField
              fullWidth
              disabled
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon />
                  </InputAdornment>
                )
              }}
              value={props.reserveData.ifNoUser.contactNumber}
            />
          </Grid>
          <Grid item md={4} xs={12}>
            <InputLabel className={classes.resumeLabel}>Email</InputLabel>
            <TextField
              fullWidth
              disabled
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                )
              }}
              value={props.reserveData.ifNoUser.email}
            />
          </Grid>
        </>
      );
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item md={6} xs={12}>
        <Typography variant="h3" className={classes.stepLabel}>
          Detalles de la reserva
        </Typography>
        <Grid container spacing={2} className={classes.container}>
          {renderContactInfo()}
        </Grid>
        <Grid container spacing={2} className={classes.container}>
          <Grid item md={6} xs={12}>
            <InputLabel className={classes.resumeLabel}>
              Costo por servicios
            </InputLabel>
            <TextField
              fullWidth
              disabled
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MonetizationOnIcon />
                  </InputAdornment>
                )
              }}
              value={`$${getServicesPrice()}`}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <InputLabel className={classes.resumeLabel}>
              Fecha y hora de reserva
            </InputLabel>
            <TextField
              fullWidth
              disabled
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <TodayIcon />
                  </InputAdornment>
                )
              }}
              value={`${getReserveDatetime()}`}
            />
          </Grid>
        </Grid>

        {/* <Typography variant={'h4'} className={classes.resumeLabel}>
          Costo por servicios:{' '}
          <span className={classes.priceNumber}>${getServicesPrice()}</span>
        </Typography> */}
        {/* <Typography variant={'h4'} className={classes.resumeLabel}>
          Fecha y hora de reserva
        </Typography>
        <Typography variant={'h4'}>
          <span className={classes.priceNumber}>{getReserveDatetime()}</span>
        </Typography> */}

        <Typography variant={'h4'} className={classes.resumeLabel}>
          Sucursal y servicios seleccionados
        </Typography>
        <Grid container spacing={2} className={classes.container}>
          <Grid item xs={12}>
            <InputLabel className={classes.resumeLabel}>Dirección</InputLabel>
            <TextField
              fullWidth
              disabled
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MonetizationOnIcon />
                  </InputAdornment>
                )
              }}
              value={addressName}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          {props.reserveData.services.map(service => {
            return (
              <Grid item md={6} xs={12}>
                <FormControlLabel
                  style={{ width: '100%' }}
                  control={
                    <Checkbox
                      checked={true}
                      name="checkedF"
                      disabled
                      // color={theme.palette.secondary}
                    />
                  }
                  label={`${service.name} - ${service.duration} horas - $${service.price}`}
                />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
      <Grid item md={6} xs={12}>
        <Typography variant="h3" className={classes.stepLabel}>
          Método de reserva
        </Typography>
        <InputLabel className={classes.resumeLabel}>
          Selecciona el método de reserva
        </InputLabel>
        <Select
          fullWidth
          value={props.paymentMethod}
          onChange={event => props.setPaymentMethod(event.target.value)}>
          <MenuItem value={'1'}>Pago completo</MenuItem>
          <MenuItem value={'2'}>Reserva con $5</MenuItem>
          <MenuItem value={'3'}>Reserva sencilla</MenuItem>
        </Select>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = state => ({
  reserveData: state.userReducer.reserveData
});

export default connect(mapStateToProps)(ResumePaymentInfoCard);
