import React, { useEffect, useState } from 'react';

import Topbar from './components/topBar';
import LandingFirstContainer from './components/landingFirstContainer';
import LandingSecondContainer from './components/landingSecondContainer';
import LandingThirdContainer from './components/landingThirdContainer';
import LandingFormContainer from './components/landingFormContainer';
import LandingFooterContainer from './components/landingFooterContainer';

import AOS from 'aos';



const Landing = () => {  
  const [
    headerTransparentBackground,
    setHeaderTransparentBackground
  ] = useState(true);

  const handleScroll = event => {
    if (window.scrollY > 100) {
      setHeaderTransparentBackground(false);
    }
    if (window.scrollY === 0) setHeaderTransparentBackground(true);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    AOS.init();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      <Topbar headerTransparent={headerTransparentBackground} />
      <LandingFirstContainer />

      <LandingSecondContainer />
      <LandingThirdContainer />
      <LandingFormContainer />
      <LandingFooterContainer />
    </div>
  );
};

export default Landing;
