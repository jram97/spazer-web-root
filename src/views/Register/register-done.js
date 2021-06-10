import React from 'react';
import { Typography, Button } from '@material-ui/core';
import './register-styles.css';
import { useHistory } from 'react-router-dom';

import AuthLayout from './../../layouts/Main/components/authLayout';
// import {} from './../../assets/images/LOGO_JOGO_SPAZER@2x.png'

const getExtraComponent = () => {
  return (
    <>
      <div
        style={{
          zIndex: 9,
          backgroundColor: 'black',
          opacity: 0.6,
          height: '100%',
          width: '100%'
        }}></div>
    </>
  );
};

const Register = props => {
  const history = useHistory();
  return (
    <AuthLayout
      backgroundImage={require('views/Login/assets/cheering-crowd-event-17598@2x.png')}
      extraInfo={getExtraComponent()}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: 100
        }}>
        <img
          alt="spazer-logo"
          src={require('assets/images/spazer_1.jpeg')}
          style={{ objectFit: 'contain', height: 100, marginBottom: 50 }}
        />
        <Typography variant="h2" style={{ marginBottom: 20 }}>
          <span>Gracias por registrarte con Spazer</span>
        </Typography>
        <Typography
          style={{ textAlign: 'center', width: '50%', marginBottom: 50 }}>
          <span>
            Pronto nos pondremos en contacto contigo para poder reunirnos
            personalmente
          </span>
        </Typography>
        <Button
          onClick={() => history.push('landing')}
          size="large"
          color="primary"
          variant="contained"
          style={{
            borderRadius: 10,
            marginBottom: 100
          }}>
          Llévame a la página principal
        </Button>
      </div>
    </AuthLayout>
  );
};

export default Register;
