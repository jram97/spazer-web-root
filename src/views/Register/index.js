import React from 'react';
import {
  Card,
  Stepper,
  Step,
  StepLabel,
  StepConnector
} from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/styles';

import './register-styles.css';
import Topbar from 'layouts/Main/components/Topbar';
import ContactInfo from './steps/contact-info';
import Description from './steps/description';
import Images from './steps/images';
// import {} from './../../assets/images/LOGO_JOGO_SPAZER@2x.png'

const getSteps = () => {
  return ['Registrate con jogo', 'Describe tu sucursal', 'Sube fotografías'];
};

const useStyles = makeStyles(theme => {
  return {
    stepperContainer: {
      justifyContent: 'center'
    },
    mainContainer: {
      paddingBottom: 40,
      //paddingRight: 15,
      paddingLeft: 30,
      paddingRight: 30
    },

    alternativeLabel: {},
    active: {}, //needed so that the &$active tag works
    completed: {},
    disabled: {}
  };
});

const ColorlibConnector = withStyles({
  alternativeLabel: {
    // top: 22
  },
  disabled: {
    '& $line': {
      backgroundColor: '#F4F4F4'
    }
  }
  // active: {
  //   '& $line': {
  //     backgroundColor: colorPalette.primary.main
  //   }
  // },
  // completed: {
  //   '& $line': {
  //     backgroundColor: colorPalette.primary.main
  //   }
  // },
  // line: {
  //   height: 3,
  //   border: 0,
  //   backgroundColor: colorPalette.primary.main,
  //   borderRadius: 1
  // }
})(StepConnector);

const getStepContent = (stepIndex, handleSkip, stepReturn) => {
  switch (stepIndex) {
    case 0:
      return <ContactInfo handleSkip={handleSkip} />;
    case 1:
      return <Description handleSkip={handleSkip} stepReturn={stepReturn} />;
    case 2:
      return <Images stepReturn={stepReturn} />;
    default:
      return 'Unknown stepIndex';
  }
};

const Register = props => {
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const classes = useStyles();
  console.log('calses', classes);

  const handleSkip = () => {
    // if (!isStepOptional(activeStep)) {
    //   // You probably want to guard against something like this,
    //   // it should never occur unless someone's actively trying to break something.
    //   throw new Error("You can't skip a step that isn't optional.");
    // }

    setActiveStep(prevActiveStep => prevActiveStep + 1);
    // setSkipped(prevSkipped => {
    //   const newSkipped = new Set(prevSkipped.values());
    //   newSkipped.add(activeStep);
    //   return newSkipped;
    // });
  };

  const stepReturn = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  return (
    <div
      className="register-main-container"
      // style={{
      //   // height: '100vh',
      //   // backgroundColor: 'white',
      //   paddingTop: 100,
      //   paddingLeft: 50,
      //   paddingRight: 50
    >
      <Topbar
        topBarColor="#1D1D1D"
        appLeftIcon={require('assets/images/spazer_1.png')}
        appIconStyle={{
          objectFit: 'contain',
          height: 70
        }}></Topbar>
      <Card className={classes.mainContainer}>
        <Stepper
          activeStep={activeStep}
          alternativeLabel
          className={classes.stepperContainer}
          connector={<ColorlibConnector />}>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel
                classes={{
                  alternativeLabel: classes.alternativeLabel,
                  labelContainer: classes.labelContainer
                }}>
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
        <div>
          {activeStep === steps.length ? (
            <div></div>
          ) : (
            <div>
              {getStepContent(activeStep, handleSkip, stepReturn)}
              {/* <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
            <div>
              <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                Back
              </Button>
              {isStepOptional(activeStep) && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSkip}
                  className={classes.button}
                >
                  Skip
                </Button>
              )}
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
              >
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div> */}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Register;
