import React from 'react';
import { makeStyles } from '@material-ui/styles';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

import CallIcon from '@material-ui/icons/Call';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import EmailIcon from '@material-ui/icons/Email';
import {
  Grid,
  Typography,
  InputLabel,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';

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
  }
}));

const NewBookingCard = props => {
  const classes = useStyles();

  const showUserFields = () => {
    if (props.typeOfUser == 'n') {
      return (
        <Grid item md={6} xs={12}>
          <Typography variant="h3" className={classes.stepLabel}>
            &nbsp;
          </Typography>
          <Grid container spacing={1} className={classes.row}>
            <Grid item xs={6} className={classes.rowCell}>
              <Grid container spacing={1}>
                <Grid
                  item
                  md={2}
                  xs={2}
                  style={{ display: 'flex', alignItems: 'flex-end' }}>
                  <CalendarTodayIcon />
                </Grid>
                <Grid
                  item
                  md={10}
                  xs={10}
                  style={{ display: 'flex', alignItems: 'flex-end' }}>
                  <Typography>Reservado por</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6} className={classes.rowCell}>
              <TextField
                fullWidth
                id="standard-basic"
                value={props.noUser.name}
                onChange={event =>
                  props.setNoUser({ ...props.noUser, name: event.target.value })
                }
              />
            </Grid>
          </Grid>

          <Grid container spacing={1} className={classes.row}>
            <Grid item xs={6} className={classes.rowCell}>
              <Grid container spacing={1}>
                <Grid
                  item
                  md={2}
                  xs={2}
                  style={{ display: 'flex', alignItems: 'flex-end' }}>
                  <CallIcon />
                </Grid>
                <Grid
                  item
                  md={10}
                  xs={10}
                  style={{ display: 'flex', alignItems: 'flex-end' }}>
                  <Typography>Número de contacto</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6} className={classes.rowCell}>
              <TextField
                fullWidth
                id="standard-basic"
                value={props.noUser.contactNumber}
                onChange={event =>
                  props.setNoUser({
                    ...props.noUser,
                    contactNumber: event.target.value
                  })
                }
              />
            </Grid>
          </Grid>

          <Grid container spacing={1} className={classes.row}>
            <Grid item xs={6} className={classes.rowCell}>
              <Grid container spacing={1}>
                <Grid
                  item
                  md={2}
                  xs={2}
                  style={{ display: 'flex', alignItems: 'flex-end' }}>
                  <EmailIcon />
                </Grid>
                <Grid
                  item
                  md={10}
                  xs={10}
                  style={{ display: 'flex', alignItems: 'flex-end' }}>
                  <Typography>Correo eléctronico</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6} className={classes.rowCell}>
              <TextField
                fullWidth
                id="standard-basic"
                value={props.noUser.email}
                onChange={event =>
                  props.setNoUser({
                    ...props.noUser,
                    email: event.target.value
                  })
                }
              />
            </Grid>
          </Grid>
        </Grid>
      );
    } else {
      return (
        <Grid item md={6} xs={12}>
          <Typography variant="h3" className={classes.stepLabel}>
            &nbsp;
          </Typography>
          <InputLabel>Email</InputLabel>
          <TextField
            fullWidth
            type="email"
            margin="dense"
            name="firstName"
            value={props.inputText}
            onChange={event => props.setInputText(event.target.value)}
            //   onChange={event =>
            //     setFieldInfo({ ...fieldInfo, name: event.target.value })
            //   }
            //   value={fieldInfo.name}
            variant="outlined"
          />

          {props.searchResults.loading && (
            <Typography>
              Verificando correo
              {/* // <CircularProgress color="white" size={20} /> */}
            </Typography>
          )}

          {props.searchResults.error && (
            <Typography>Correo encontrado</Typography>
          )}
          {props.inputText &&
            props.searchResults.result &&
            props.searchResults.result.lenght !== 0 && (
              <Typography>Correo no encontrado</Typography>
            )}
        </Grid>
      );
    }
  };

  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography variant="h3" className={classes.stepLabel}>
          Información General
        </Typography>
        <Grid container spacing={1} className={classes.row}>
          <Grid item xs={6} className={classes.rowCell}>
            <Grid container spacing={1}>
              <Grid
                item
                md={2}
                xs={2}
                style={{ display: 'flex', alignItems: 'center' }}>
                <AccountBoxIcon />
              </Grid>
              <Grid
                item
                md={10}
                xs={10}
                style={{ display: 'flex', alignItems: 'center' }}>
                <Typography>Tipo de reserva</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6} className={classes.rowCell}>
            <RadioGroup
              row
              aria-label="position"
              name="position"
              onChange={event => props.setTypeOfUser(event.target.value)}
              defaultValue={props.typeOfUser}>
              <FormControlLabel
                value="u"
                control={<Radio color="primary" />}
                label="Usuario"
                labelPlacement="top"
              />
              <FormControlLabel
                value="n"
                control={<Radio color="primary" />}
                label="Sin usuario"
                labelPlacement="top"
              />
            </RadioGroup>
          </Grid>
        </Grid>
      </Grid>
      {showUserFields()}
    </Grid>
  );
};

export default NewBookingCard;
