import React from 'react';
import { Grid, Button } from '@material-ui/core';

import './auth-layout-styles.css';
import Topbar from './../Topbar';
// import {} from './../../../../assets/images/LOGO_JOGO_SPAZER@2x.png'

const Register = props => {
  return (
    <div className="container">
      <Topbar
        topBarColor="#1D1D1D"
        elevation={100}
        appLeftIcon={require('assets/images/spazer_1.png')}
        appIconStyle={{
          width: 130,
          height: 90,

          objectFit: 'contain'
        }}>
        <Button
          size="large"
          variant="outlined"
          style={{
            borderColor: '#ACFE00',
            color: '#ffffff',
            borderRadius: 20
          }}>
          Página principal
        </Button>
      </Topbar>
      <Grid container>
        <Grid
          item
          md={6}
          xs={0}
          className="background-image-container"
          style={{ backgroundImage: `url(${props.backgroundImage})` }}>
          {props.extraInfo}
        </Grid>
        <Grid item md={6} xs={12} className="form-container">
          {props.children}
        </Grid>
      </Grid>
    </div>
  );
};

export default Register;
