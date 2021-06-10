import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import GeneralInfo from './cards/generalInfo';
import PasswordConfig from './cards/passwordConfig';
import NotificationCard from './cards/notifications';
import CreditCardContainer from './cards/creditCard';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  headerTitle: {
    marginBottom: theme.spacing(3)
  },
  branchInfoContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: theme.spacing(7)
  },
  branchAvatar: {
    height: theme.spacing(30),
    width: theme.spacing(30),
    marginBottom: theme.spacing(5)
  },
  marginBottomLabel: {
    marginBottom: theme.spacing(3)
  },
  lastContainer: {
    display: 'flex',
    flexDirection: 'column'
  }
}));

const BranchAccount = props => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant={'h3'} className={classes.headerTitle}>
        Configuración de cuenta
      </Typography>
      <Grid container spacing={2}>
        <Grid item sm={4} xs={12}>
          <GeneralInfo />
        </Grid>
        <Grid item sm={4} xs={12}>
          <PasswordConfig />
        </Grid>
        <Grid item sm={4} xs={12} className={classes.lastContainer}>
          <NotificationCard />
          <CreditCardContainer />
        </Grid>
      </Grid>
    </div>
  );
};

export default BranchAccount;
