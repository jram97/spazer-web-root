import React from 'react';
import { Card, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(5),
    alignItems: 'center',
    justifyContent: 'center'
  },
  flexDisposition: {
    display: 'flex',
    flexDirection: 'column'
  },
  marginBottomLabel: {
    marginBottom: theme.spacing(3)
  }
}));

const CreditCard = props => {
  const classes = useStyles();
  return (
    <Card className={[classes.flexDisposition, classes.root]}>
      <Typography variant={'h4'} className={classes.marginBottomLabel}>
        Administración de cuentas de crédito
      </Typography>
      <Button variant="contained" color="primary">
        Administrar
      </Button>
    </Card>
  );
};

export default CreditCard;
