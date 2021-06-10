import React, { useState, useEffect } from 'react';
import {
  Grid,
  Typography,
  Checkbox,
  FormControlLabel,
  Button,
  Link,
  InputLabel
} from '@material-ui/core';

import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import { withStyles } from '@material-ui/styles';
import { addRegisterData, removeRegisterData } from 'reduxStore/actions/user';

import { emailValidator } from 'services/authService';
import useDebouncedSearch from 'assets/hooks/useDebounce';
import { connect } from 'react-redux';

const useDebounce = () => useDebouncedSearch(text => emailValidator(text));

const checkBoxStyles = theme => ({
  root: {
    '&$checked': {
      color: '#00e676'
    }
  },
  checked: {}
});

const CustomCheckbox = withStyles(checkBoxStyles)(Checkbox);

const ContactInfo = props => {
  const { inputText, setInputText, searchResults } = useDebounce();

  const [areTermsAndConditionsRead, setTermAndConditionsRead] = useState(false);

  const [email] = useState(
    props.registerData && props.registerData.email
      ? props.registerData.email
      : ''
  );
  const [branchName, setBranchName] = useState(
    props.registerData && props.registerData.branchName
      ? props.registerData.branchName
      : ''
  );
  const [companyOwner, setCompanyOwner] = useState(
    props.registerData && props.registerData.companyName
      ? props.registerData.companyName
      : ''
  );
  const [contactNumber, setContactNumber] = useState(
    props.registerData && props.registerData.contactNumber
      ? props.registerData.contactNumber
      : ''
  );
  useEffect(() => {
    props.removeRegisterData();
    setInputText(
      props.registerData && props.registerData.email
        ? props.registerData.email
        : ''
    );
  }, []);

  const handleNextStep = () => {
    let data = {
      companyName: 'Gambeta',
      companyOwner,
      category: '5f0410dc789fda41f4b442b4',
      contactNumber,
      email: inputText,
      branchName,
      state: 'w'
    };
    console.log('email', email);
    props.addRegisterData(data);
    props.handleSkip();
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
      }}>
      <div
        style={{
          // width: '50%',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column'
        }}>
        <Typography variant="h2">
          <span>Registrate con Spazer</span>
        </Typography>

        <Typography style={{ marginTop: 20 }}>
          Llena el siguiente formulario y uno de nuestros agentes se comunicará
          contigo para que seas parte de la revolución en la industria.
        </Typography>
        <ValidatorForm
          onSubmit={event => handleNextStep()}
          onError={errors => console.log(errors)}>
          <Grid container spacing={2} className="register-form-container">
            <Grid item xs={12}>
              <InputLabel>Nombre de sucursal</InputLabel>
              <TextValidator
                fullWidth
                type="text"
                margin="dense"
                name="firstName"
                color="#ACFE00"
                value={branchName}
                onChange={event => setBranchName(event.target.value)}
                //   onChange={event =>
                //     setFieldInfo({ ...fieldInfo, name: event.target.value })
                //   }
                validators={['required']}
                errorMessages={['Este campo es requerido']}
                //   value={fieldInfo.name}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <InputLabel>Nombre de contacto</InputLabel>
              <TextValidator
                fullWidth
                type="text"
                value={companyOwner}
                onChange={event => setCompanyOwner(event.target.value)}
                margin="dense"
                name="firstName"
                //   onChange={event =>
                //     setFieldInfo({ ...fieldInfo, name: event.target.value })
                //   }
                variant="outlined"
                validators={['required']}
                errorMessages={['Este campo es requerido']}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <InputLabel>Número de teléfono del contacto</InputLabel>
              <TextValidator
                fullWidth
                type="text"
                value={contactNumber}
                onChange={event => setContactNumber(event.target.value)}
                margin="dense"
                name="firstName"
                validators={['required']}
                errorMessages={[
                  'Este campo es requerido',
                  'Ingrese un correo válido'
                ]}
                //   onChange={event =>
                //     setFieldInfo({ ...fieldInfo, name: event.target.value })
                //   }

                //   value={fieldInfo.name}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel>Email</InputLabel>
              <TextValidator
                fullWidth
                type="email"
                margin="dense"
                name="firstName"
                value={inputText}
                onChange={event => setInputText(event.target.value)}
                validators={['required', 'isEmail']}
                errorMessages={[
                  'Este campo es requerido',
                  'Ingrese un correo válido'
                ]}
                validatorListener={event => console.log('evento', event)}
                //   onChange={event =>
                //     setFieldInfo({ ...fieldInfo, name: event.target.value })
                //   }
                //   value={fieldInfo.name}
                variant="outlined"
              />

              {searchResults.loading && (
                <Typography>
                  Verificando correo
                  {/* // <CircularProgress color="white" size={20} /> */}
                </Typography>
              )}

              {searchResults.error && (
                <Typography>Correo no disponible</Typography>
              )}
              {searchResults.result && searchResults.result.lenght !== 0 && (
                <Typography>Correo disponible</Typography>
              )}
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid
              item
              md={6}
              xs={12}
              className="terms-and-conditions-container">
              <FormControlLabel
                control={
                  <CustomCheckbox
                    checked={areTermsAndConditionsRead}
                    onChange={() =>
                      setTermAndConditionsRead(!areTermsAndConditionsRead)
                    }
                    name="checkedB"
                  />
                }
                label="Estoy de acuerdo con los términos"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
              className="terms-and-conditions-container">
              <Button
                type="submit"
                // onClick={() => handleNextStep()}
                disabled={
                  !areTermsAndConditionsRead ||
                  !(
                    searchResults.result && searchResults.result.lenght !== 0
                  ) ||
                  !inputText
                }
                size="large"
                variant="contained"
                color="primary"
                style={{ color: 'black' }}>
                Siguiente
              </Button>
            </Grid>
          </Grid>
        </ValidatorForm>
        <Grid
          container
          style={{
            marginTop: 20,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <Grid>
            <Link
              component="button"
              variant="body2"
              onClick={() => {
                console.info("I'm a button.");
              }}>
              <Typography style={{ marginTop: 0 }}>
                ¿Ya tienes cuenta? Inicia sesión aquí
              </Typography>
            </Link>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  registerData: state.userReducer.registerData
});

const mapDispatchToProps = dispatch => ({
  addRegisterData: registerData => dispatch(addRegisterData(registerData)),
  removeRegisterData: () => dispatch(removeRegisterData())
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactInfo);
