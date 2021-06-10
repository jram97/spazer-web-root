import React from 'react';
import {
  Typography,
  Card,
  Divider,
  FormControlLabel,
  Switch
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(5),
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  marginBottomLabel: {
    marginBottom: theme.spacing(3)
  },
  divider: {
    width: '100% ',
    marginBottom: theme.spacing(3)
  },
  switchController: {
    marginLeft: theme.spacing(1)
  },
  formControlLabelContainer: {
    marginLeft: 0
  }
}));

const Notifications = props => {
  const classes = useStyles();
  return (
    <Card fullWidth className={classes.root}>
      <Typography variant={'h4'} className={classes.marginBottomLabel}>
        Configuración de notificaciones
      </Typography>
      <Typography className={classes.marginBottomLabel}>
        Configura las notificaciones como tú quieras
      </Typography>
      <Divider className={classes.divider} />
      <FormControlLabel
        value="false"
        className={[
          classes.marginBottomLabel,
          classes.formControlLabelContainer
        ]}
        control={
          <Switch className={[classes.switchController]} color="primary" />
        }
        label="Correos electrónicos de recordatorio"
        labelPlacement="Start"
      />
      <FormControlLabel
        value="false"
        className={classes.formControlLabelContainer}
        control={
          <Switch className={classes.switchController} color="primary" />
        }
        label="Notificar reseñas y calificaciones"
        labelPlacement="Start"
      />
    </Card>
  );
};

export default Notifications;
