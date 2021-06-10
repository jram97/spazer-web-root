import React from 'react';
import { Grid, Typography } from '@material-ui/core';

const BookingPropertyCard = ({ bookingProperty }) => {
  return (
    <Grid container spacing={2} style={{ marginBottom: 10 }}>
      <Grid item md={2} xs={12}>
        {bookingProperty.icon}
      </Grid>
      <Grid item md={10} xs={12}>
        <Typography>{bookingProperty.name}</Typography>
      </Grid>
    </Grid>
  );
};

export default BookingPropertyCard;
