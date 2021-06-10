import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import './landing-second-container.css';
import { ReactComponent as TimeSVG } from 'assets/icons/time_icon.svg';
import { ReactComponent as WorldSVG } from 'assets/icons/world_icon.svg';
import { ReactComponent as HandSVG } from 'assets/icons/hand_icon.svg';
import { ReactComponent as SecondContainerOne } from 'assets/icons/stuck_two.svg';

import { ReactComponent as LeftLineSVG } from 'assets/icons/vector_line_left.svg';

const LandingSecondContainer = props => {
  return (
    <div
      className="landing-second-container"
      data-aos-duration="500"
      data-aos-offset="200"
      data-aos="fade-right">
      <Grid
        container
        className="landing-second-item-grid landing-second-left-item-grid">
        <Grid
          item
          md={6}
          xs={12}
          className="landing-second-item-grid-content-container">
          <Typography className="landing-second-header-text">
            Innovación para tu empresa
          </Typography>
          <Typography className="landing-second-sub-header-text">
            Traemos el proceso de reserva ideal para tu empresa
          </Typography>
          <LeftLineSVG className="landing-second-left-line" />
        </Grid>
        <Grid item md={6} xs={12} className="landing-second-left-container">
          <div className="landing-second-icons-container-position landing-second-right-line-container">
            <LeftLineSVG className="landing-second-right-line" />
          </div>
          <SecondContainerOne className="landing-second-icon-image-container landing-second-icon-one" />
          <div className="landing-second-icons-container-position landing-second-time-icon-container-position landing-second-time-icon-container-absolute-position">
            <div className="landing-second-icons-container landing-second-time-icon-container">
              <TimeSVG className="landing-second-time-icon" />
              <Typography className="landing-second-icon-container-text">
                Optimiza tu tiempo
              </Typography>
            </div>
          </div>

          <div className="landing-second-icons-container-position landing-second-icons-container-icon-position landing-second-icon-two-container">
            <SecondContainerOne className=" landing-second-icon-two" />
          </div>

          <div className="landing-second-icons-container landing-second-world-icon-container">
            <WorldSVG className="landing-second-world-icon" />
            <Typography className="landing-second-icon-container-text">
              Estés donde estés
            </Typography>
          </div>

          <div
            className="landing-second-icons-container-position landing-second-time-icon-container-position"
            style={{ marginBottom: 50 }}>
            <div className="landing-second-icons-container landing-second-hand-icon-container">
              <SecondContainerOne className="landing-second-icon-image-container landing-second-icon-third" />
              <HandSVG className="landing-second-hand-icon" />
              <Typography className="landing-second-icon-container-text">
                Tus clientes a un click
              </Typography>
            </div>
          </div>

          <div className="landing-second-icons-container-position landing-second-icons-container-icon-position landing-second-icon-third-container">
            <SecondContainerOne className="landing-second-icon-image-container landing-second-icon-third-position" />
          </div>

          {/* <SecondContainerTwo className="landing-second-icon-image-container landing-second-icon-two" /> */}

          {/* <timeSVG className="landing-second-time-icon" /> */}
        </Grid>
      </Grid>
    </div>
  );
};

export default LandingSecondContainer;
