import React, { useState, useEffect, useRef } from 'react';
import { Grid, Typography, IconButton } from '@material-ui/core';
import './landing-first-container.css';
import {} from './../../../assets/images/landing_first_bg.png';

let upgradeTime = 172801;
let seconds = upgradeTime;

const LandingFirstContainer = props => {
  let [timerString, setTimerString] = useState('');
  let countdownTimer = useRef({}).current;

  const timer = () => {
    var days = Math.floor(seconds / 24 / 60 / 60);
    var hoursLeft = Math.floor(seconds - days * 86400);
    var hours = Math.floor(hoursLeft / 3600);
    var minutesLeft = Math.floor(hoursLeft - hours * 3600);
    var minutes = Math.floor(minutesLeft / 60);
    var remainingSeconds = seconds % 60;
    function pad(n) {
      return n < 10 ? '0' + n : n;
    }
    setTimerString(
      pad(days) +
        ':' +
        pad(hours) +
        ':' +
        pad(minutes) +
        ':' +
        pad(remainingSeconds)
    );
    if (seconds === 0) {
      clearInterval(countdownTimer.current);
    } else {
      seconds--;
    }
  };

  useEffect(() => {
    let currentDate = Date.now();
    let releaseDate = new Date(2020, 8, 25);
    seconds = Math.floor((releaseDate.getTime() - currentDate) / 1000);
    countdownTimer.current = setInterval(timer, 1000);
    return () => clearInterval(countdownTimer.current);
  }, []);

  return (
    <div className="landing-first-container">
      <Grid fullWidth container style={{ height: '100%' }}>
        <Grid
          item
          md={6}
          xs={12}
          className="landing-item-grid landing-left-item-grid">
          <Typography className="landing-header-text">
            ¡Tomamos tus citas en nuestra app!
          </Typography>
          <Typography className="landing-subheader-text">
            Registra tu comercio
          </Typography>
          <div className="landing-download-app-container">
            <IconButton className="landing-download-app-store-button">
              <img
                alt="app-store-badge"
                src={require('assets/images/download_app_store.png')}
              />
            </IconButton>
            <IconButton className="landing-download-play-store-button">
              <img
                alt="play-store-badge"
                src={require('assets/images/download_google_play.png')}
              />
            </IconButton>
          </div>
          
          {/*<div className="landing-release-counter-container">
            <Typography variant="h3" className="landing-counter-text">
              Próximamente en:
            </Typography>
            <div className="landing-counter-indicators-container">
              <div className="landing-counter-indicator-container">
                <p className="landing-counter-indicator-label">D</p>
                <p className="landing-counter-indicator-label">
                  {timerString.length > 0 && timerString.split(':')[0]}
                </p>
              </div>
              <div className="landing-counter-indicator-container">
                <p className="landing-counter-indicator-label">H</p>
                <p className="landing-counter-indicator-label">
                  {timerString.length > 0 && timerString.split(':')[1]}
                </p>
              </div>
              <div className="landing-counter-indicator-container">
                <p className="landing-counter-indicator-label">M</p>
                <p className="landing-counter-indicator-label">
                  {timerString.length > 0 && timerString.split(':')[2]}
                </p>
              </div>
              <div className="landing-counter-indicator-container">
                <p className="landing-counter-indicator-label">S</p>
                <p className="landing-counter-indicator-label">
                  {timerString.length > 0 && timerString.split(':')[3]}
                </p>
              </div>
            </div>
  </div>*/}
        </Grid>
        <Grid item md={6} xs={12} className="landing-right-item-grid">
          <img
            alt="app-preview"
            src={require('assets/images/spazer_phone_one.png')}
            className="landing-preview-app-image-one"
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default LandingFirstContainer;
