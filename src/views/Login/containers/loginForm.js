import React, { useState } from 'react';
import './login-form-styles.css';
import { Button } from '@material-ui/core';

import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

const LoginForm = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    props.onLogin({ email, password });
  };

  return (
    <div className="form-login-container">
      <div className="form-header">
        <img
          alt="spazer-indicator"
          src={require('assets/images/spazer_1.png')}
          className="logo"
        />
      </div>
      <ValidatorForm
        onSubmit={handleSubmit}
        style={{ display: 'flex', width: '100%' }}
        onError={errors => console.log(errors)}>
        <div className="form-content-container">
          <TextValidator
            fullWidth
            type="email"
            // helperText="Coloca tu correo"
            label="Correo"
            margin="dense"
            name="firstName"
            validators={['required']}
            errorMessages={['Este campo es requerido']}
            onChange={event => setEmail(event.target.value)}
            value={email}
            variant="outlined"
          />
          <TextValidator
            style={{ marginTop: 30 }}
            type="password"
            className="input-margin-top"
            fullWidth
            // helperText="Coloca tu correo"
            label="Contraseña"
            margin="dense"
            name="firstName"
            onChange={event => setPassword(event.target.value)}
            value={password}
            validators={['required']}
            errorMessages={['Este campo es requerido']}
            variant="outlined"
          />
          <div className="button-container">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ backgroundColor: '#ACFE00', color: 'black' }}>
              Ingresar
            </Button>
          </div>
        </div>
      </ValidatorForm>
    </div>
  );
};

export default LoginForm;
