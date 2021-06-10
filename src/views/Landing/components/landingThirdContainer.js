import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import './landing-third-container.css';

const LandingThirdContainer = props => {
  return (
    <div className="landing-third-container">
      <Grid fullWidth container data-aos-offset="50px " data-aos="fade-bottom">
        <Grid item md={6} xs={12} className="landing-third-left-container">
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Typography className="landing-third-header-text">
              Membresía por $10.99
            </Typography>
            <Typography className="landing-third-sub-header-text">
              Contrata la app y centraliza la reserva de tus clientes
            </Typography>
          </div>
        </Grid>
        <Grid item md={6} xs={12} className="landing-third-right-container">
          <img
            alt="phone-indicator"
            src={require('assets/icons/phone_image.png')}
            className="landing-third-image-phone"
          />
        </Grid>
      </Grid>

      {/* <PhoneSVG className="landing-third-image-phone" /> */}
    </div>
  );
};

export default LandingThirdContainer;
