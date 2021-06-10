import React from 'react';
import { Typography, IconButton } from '@material-ui/core';
import './landing-footer-container.css';
import { ReactComponent as WaSVG } from 'assets/icons/group_9.svg';
import { ReactComponent as EmailSVG } from 'assets/icons/group_10.svg';
import { ReactComponent as LocationSVG } from 'assets/icons/group_12.svg';
import {
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon
} from '@material-ui/icons';

const LandingFooterContainer = props => {
  return (
    <div className="landing-footer-container">
      <div className="landing-footer-apps-container">
        <img
          alt="cuts"
          src={require('assets/images/cuts.png')}
          className="landing-footer-app-image"
        />
        <img
          alt="beauty"
          src={require('assets/images/beauty.png')}
          className="landing-footer-app-image"
        />
        <img
          alt="jogo"
          src={require('assets/images/LOGO_JOGO_SPAZER@2x.png')}
          className="landing-footer-app-image-jogo"
        />

        <img
          alt="eats"
          src={require('assets/images/eats.png')}
          className="landing-footer-app-image"
        />
        <img
          alt="gym"
          src={require('assets/images/gym.png')}
          className="landing-footer-app-image"
        />
        <img
          alt="spa"
          src={require('assets/images/spa.png')}
          className="landing-footer-app-image"
        />
      </div>
      <div className="landing-footer-sub-container">
        <div className="landing-footer-contact-container">
          <div className="landing-footer-contact-info-container">
            <WaSVG />
            <Typography className="landing-footer-contact-info-text">
              +503 77497112
            </Typography>
          </div>
          <div className="landing-footer-contact-info-container">
            <EmailSVG />
            <Typography className="landing-footer-contact-info-text">
              Iinfo@spazerapp.com
            </Typography>
          </div>
          <div className="landing-footer-contact-info-container">
            <LocationSVG />
            <Typography className="landing-footer-contact-info-text">
              89 Avenida Norte #4616, San Salvador
            </Typography>
          </div>
        </div>
      </div>
      <div className="landing-footer-social-container">
        <IconButton href="https://www.facebook.com/spazerppsv">
          <FacebookIcon style={{ fontSize: 50, color: '#D0FF63' }} />
        </IconButton>
        <IconButton href="https://instagram.com/spazer.sv?igshid=y6b2eez4njzf">
          <InstagramIcon
            style={{
              fontSize: 50,
              color: '#D0FF63',
              marginLeft: 20,
              marginRight: 20
            }}
          />
        </IconButton>
        <IconButton href="https://www.linkedin.com/company/jogo-app">
          <LinkedInIcon style={{ fontSize: 50, color: '#D0FF63' }} />
        </IconButton>
      </div>
    </div>
  );
};

export default LandingFooterContainer;
