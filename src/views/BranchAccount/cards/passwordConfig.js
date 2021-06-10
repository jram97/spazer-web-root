import React from 'react';
import {
  Card,
  Divider,
  Typography,
  TextField,
  Button
} from '@material-ui/core';
import './password-config.css';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(5),
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  flexDisposition: {
    display: 'flex',
    flexDirection: 'column'
  },
  inputContainer: {
    padding: theme.spacing(3)
  },
  marginBottomLabel: {
    marginBottom: theme.spacing(3)
  },
  divider: {
    width: '100% ',
    marginBottom: 20
  },
  saveButton: {
    color: theme.palette.primary.contrastText
  }
}));

const PasswordConfig = props => {
  const classes = useStyles();

  return (
    <Card fullWidth className={[classes.flexDisposition, classes.root]}>
      <Typography variant={'h4'} className={classes.marginBottomLabel}>
        Configuración de contraseña
      </Typography>
      <Typography className={classes.marginBottomLabel}>
        Puedes cambiar en cualquier momento tus contraseñas o las contraseñas
        generadas por el sistema
      </Typography>
      <Divider className={classes.divider} />
      <div
        className={[
          classes.flexDisposition,
          classes.inputContainer,
          classes.marginBottomLabel
        ]}>
        <TextField
          fullWidth
          className={classes.marginBottomLabel}
          variant="outlined"
          label="Contraseña actual"
        />
        <TextField
          className={classes.marginBottomLabel}
          fullWidth
          disabled
          variant="outlined"
          label="Contraseña nueva"
        />
        <TextField
          className={classes.marginBottomLabel}
          fullWidth
          disabled
          variant="outlined"
          label="Confirmar contraseña nueva"
        />
      </div>
      <div className="password-config-footer">
        <Button
          variant="contained"
          color="primary"
          className={classes.saveButton}>
          Guardar cambios
        </Button>
      </div>
    </Card>
  );
};

export default PasswordConfig;
