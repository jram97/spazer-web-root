import React from 'react';
import { TextField, Typography, Button } from '@material-ui/core';

import AuthLayout from './../../layouts/Main/components/authLayout';
// import {} from './../../assets/images/LOGO_JOGO_SPAZER@2x.png'

const getExtraComponent = () => {
  return (
    <>
      <img
        alt="recovery"
        src={require('assets/images/jogo_revovery_text.png')}
        style={{
          zIndex: 10,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover'
        }}        
      />
      {/* <div
        style={{
          zIndex: 9,
          backgroundColor: 'black',
          opacity: 0.6,
          height: '100%',
          width: '100%',
          position: 'absolute'
        }}></div> */}
    </>
  );
};

const Register = props => {
  return (
    <AuthLayout
      backgroundImage={require('assets/images/jogo_recovery_background.png')}
      extraInfo={getExtraComponent()}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          //   alignItems: 'center',
          paddingTop: 100
        }}>
        <Typography variant="h2" style={{ marginBottom: 20 }}>
          <span>Recuperación de la cuenta</span>
        </Typography>
        <Typography
          style={{ textAlign: 'left', width: '70%', marginBottom: 50 }}>
          <span>
            Ingresa tu correo electrónico de registro y nosotros te enviaremos
            los pasos para recuperar tu cuenta
          </span>
        </Typography>
        <TextField
          fullWidth
          type="email"
          label="Correo electrónico"
          margin="dense"
          name="firstName"
          //   onChange={event =>
          //     setFieldInfo({ ...fieldInfo, name: event.target.value })
          //   }
          required
          //   value={fieldInfo.name}
          variant="outlined"
        />
        <div
          style={{
            display: 'flex',
            marginTop: 50,
            justifyContent: 'flex-end'
          }}>
          <Button
            size="large"
            style={{
              backgroundColor: '#ACFE00',
              borderRadius: 10,
              marginBottom: 100
            }}>
            Enviar
          </Button>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Register;
