import React from 'react';
import { Typography, Grid } from '@material-ui/core';

const ContactInfo = ({ request }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5
      }}>
      <div
        style={{
          // width: '50%',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column'
        }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h3">Nombre de sucursal</Typography>
            <Typography variant="h5">
              {request.branchOffice ? request.branchOffice.name : ''}
            </Typography>
          </Grid>
          <Grid item md={6} xs={12}>
            <Typography variant="h3">Nombre de contacto</Typography>
            <Typography variant="h5">{request.companyOwner}</Typography>
          </Grid>
          <Grid item md={6} xs={12}>
            <Typography variant="h3">
              Número de teléfono del contacto
            </Typography>
            <Typography variant="h5">{request.contactNumber}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h3">Email</Typography>
            <Typography variant="h5">{request.email}</Typography>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default ContactInfo;
