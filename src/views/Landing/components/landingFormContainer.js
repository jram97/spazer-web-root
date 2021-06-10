import React, { useState, useEffect } from 'react';
import {
  Grid,
  Typography,
  Button,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Dialog,
  DialogContent,
  DialogActions,
  Checkbox,
  Snackbar
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { getCategories } from 'services/categoriesService';
import { makeStyles } from '@material-ui/core';
import { requestRegisterCompany } from 'services/companyService';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import './landing-form-container.css';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
  formMessages: {
    color: theme.palette.primary.main
  }
}));

const LandingFormContainer = () => {
  const classes = useStyles();
  const [categories, setCategories] = useState([]);
  const [checkboxTermsValue, setCheckboxTermsValue] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [category, setCategory] = useState('');
  const [companyOwner, setCompanyOwner] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [dialogState, setDialogState] = useState(false);
  const [snackbarState, setSnackbarState] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getFormCategories();
  }, []);

  const getFormCategories = async () => {
    try {
      let data = await getCategories();
      setCategories(data.categories);
      setCategory(data.categories[0]._id);
      console.log('data 2', data.categories);
    } catch (error) {}
  };

  const requestRegisterCompanyHandler = async event => {
    event.preventDefault();
    let data = {
      companyName,
      companyOwner,
      category,
      contactNumber,
      email,
      state: 'w'
    };

    try {
      let result = await requestRegisterCompany(data);
      clearForm();
      console.log(result);
      setDialogState(true);
    } catch (error) {
      setSnackbarState(true);
      setErrorMessage(error.errorMessage);
    }
  };

  const clearForm = () => {
    setCompanyName('');
    setCompanyOwner('');
    setCategory(categories[0]._id);
    setContactNumber('');
    setEmail('');
  };

  return (
    <div className="landing-form-container">
      <div
        id="register-container"
        className="landing-form-box-container"
        data-aos-duration="1000"
        data-aos-offset="200"
        data-aos="fade-up">
        <ValidatorForm
          onSubmit={event => requestRegisterCompanyHandler(event)}
          onError={errors => console.log(errors)}>
          <Typography className="landing-form-register-title">
            Registrate con Spazer
          </Typography>
          <Typography className="landing-form-register-sub-title">
            Llena el siguiente formulario y uno de nuestros agentes se
            comunicará contigo para que seas parte de la revolución en el
            comercio
          </Typography>
          <InputLabel
            id="type-of-business"
            className="landing-form-register-type-of-business">
            Nombre de tu spazer
          </InputLabel>
          <TextValidator
            id="type-of-business"
            value={companyName}
            onChange={event => setCompanyName(event.target.value)}
            placeholder=""
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
            errorStyle={{ marginTop: 10 }}
            validators={['required']}
            errorMessages={['Este campo es requerido', 'email is not valid']}
          />
          <InputLabel
            id="type-of-business-label"
            className="landing-form-register-type-of-business">
            Tipo de Spazer
          </InputLabel>
          <Select
            fullWidth
            labelId="type-of-business-label"
            id="demo-simple-select"
            label="Tipo de Spazer"
            value={category}
            onChange={event => setCategory(event.target.value)}>
            {categories.map(category => {
              return <MenuItem value={category._id}>{category.name}</MenuItem>;
            })}
          </Select>
          <Grid
            container
            className="landing-form-register-contact-container"
            spacing={2}>
            <Grid item md={6} xs={12}>
              <InputLabel className="landing-form-register-type-of-business">
                Nombre del contacto
              </InputLabel>
              <TextValidator
                value={companyOwner}
                onChange={event => setCompanyOwner(event.target.value)}
                placeholder=""
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true
                }}
                errorStyle={{ marginTop: 10 }}
                validators={['required']}
                errorMessages={[
                  'Este campo es requerido',
                  'email is not valid'
                ]}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <InputLabel className="landing-form-register-type-of-business">
                Número de contacto
              </InputLabel>
              <TextValidator
                value={contactNumber}
                onChange={event => setContactNumber(event.target.value)}
                placeholder=""
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true
                }}
                errorStyle={{ marginTop: 10 }}
                validators={['required', 'isNumber']}
                errorMessages={[
                  'Este campo es requerido',
                  'Debe ser un número de teléfono'
                ]}
              />
            </Grid>
          </Grid>
          <InputLabel className="landing-form-register-type-of-business">
            Email
          </InputLabel>
          <TextValidator
            id="standard-full-width"
            value={email}
            onChange={event => setEmail(event.target.value)}
            placeholder=""
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
            validators={['required', 'isEmail']}
            errorMessages={[
              'Este campo es requerido',
              'Debe ser un correo válido'
            ]}
          />
          <Grid container className="landing-form-terms-and-register-container">
            <Grid
              item
              md={6}
              xs={12}
              spacing={2}
              className="landing-form-terms-and-register-left-item">
              <FormControlLabel
                value="top"
                control={
                  <Checkbox
                    value={checkboxTermsValue}
                    onChange={event =>
                      setCheckboxTermsValue(event.target.checked)
                    }
                    color="primary"
                    className="landing-form-terms-checkbox"
                  />
                }
                label="Estoy de acuerdo con los términos"
                labelPlacement="end"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
              spacing={2}
              className="landing-form-terms-and-register-right-item">
              <Button
                disabled={!checkboxTermsValue}
                type="submit"
                variant="contained"
                color="secundary"
                className="landing-form-register-button">
                Registrarse
              </Button>
            </Grid>
          </Grid>
        </ValidatorForm>
      </div>
      <Dialog
        open={dialogState}
        onClose={() => setDialogState(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogContent
          style={{ backgroundColor: '#272727', paddingBottom: 30 }}>
          <Grid container>
            <Grid
              item
              xs={12}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <Typography variant="h3" className={classes.formMessages}>
                ¡Felicidades! te has registrado en:
              </Typography>
              <img
                alt="Logo"
                className="landing-form-spazer-logo"
                src={require('assets/images/spazer_1.png')}
              />
              <Typography variant="h5" className={classes.formMessages}>
                Espera el correo para poder completar tu perfil
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions style={{ backgroundColor: '#272727' }}>
          <Button
            onClick={() => setDialogState(false)}
            variant="contained"
            color="primary"
            autoFocus>
            Entendido
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarState}
        autoHideDuration={6000}
        onClose={() => setSnackbarState(false)}>
        <Alert onClose={() => setSnackbarState(false)} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default LandingFormContainer;
