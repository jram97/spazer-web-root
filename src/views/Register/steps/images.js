import React, { useState, useRef } from 'react';
import {
  Grid,
  Button,
  Typography,
  IconButton,
  Snackbar
} from '@material-ui/core';
import BackupIcon from '@material-ui/icons/Backup';
import './register-image-step.css';
import { makeStyles } from '@material-ui/styles';
import { addRegisterData } from 'reduxStore/actions/user';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import MuiAlert from '@material-ui/lab/Alert';
import { requestRegisterCompany } from 'services/companyService';

import CancelRoundedIcon from '@material-ui/icons/CancelRounded';

const useStyles = makeStyles(theme => ({
  imageContainer: {
    position: 'relative',
    width: 200,
    height: 200,
    marginRight: 10
  },
  closeIconContainer: {
    position: 'absolute',
    right: -30,
    top: -35
  },
  closeIcon: {
    width: 40,
    height: 40,
    color: theme.palette.primary.main
  },
  noImagesContainer: {
    width: '100%',
    marginTop: 20,

    height: 300,
    backgroundColor: '#F4F4F4',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  uploadImagesContainer: {
    padding: 20
  }
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Images = props => {
  const history = useHistory();
  const [images, setImages] = useState([]);
  const inputFileRef = useRef(null);
  const [snackState, setSnackState] = useState(false);
  const classes = useStyles();

  const handleChangeImageSelected = event => {
    let imagesAux = [...images];
    imagesAux.push({
      url: URL.createObjectURL(event.target.files[0]),
      file: event.target.files[0]
    });

    setImages(imagesAux);
  };

  const handleRegister = async () => {
    if (images.length < 3) {
      setSnackState(true);
      return;
    }
    let registerData = { ...props.registerData };
    let imagesAux = images.map(image => ({ file: image.file }));

    let formData = new FormData();
    for (let registerKey in registerData) {
      if (registerData[registerKey] instanceof Object) {
        formData.append(registerKey, JSON.stringify(registerData[registerKey]));
      } else {
        formData.append(registerKey, registerData[registerKey]);
      }
    }
    imagesAux.forEach(image => {
      formData.append('images', image.file);
    });

    for (var pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }

    try {
      let result = await requestRegisterCompany(formData);
      history.push('register-done');
      console.log('resultado', result);
    } catch (error) {
      console.log('error', error);
    }
  };

  const removeImageByIndex = imageIndexToDelete => {
    let updatedImages = images.filter(
      (image, index) => index !== imageIndexToDelete
    );
    setImages(updatedImages);
  };

  return (
    <Grid container spacing={2}>
      <Grid item md={6} xs={12}>
        <Typography variant={'h2'}>
          Sube fotografías para mostrar tu sucursal
        </Typography>
      </Grid>
      <Grid
        item
        md={6}
        xs={12}
        className="register-image-step-add-image-container">
        <Button
          onClick={() => inputFileRef.current.click()}
          disabled={images.length >= 10 ? true : false}
          size="large"
          variant="contained"
          color="primary"
          style={{
            color: 'black'
          }}>
          Agregar imagen
        </Button>
        <input
          type="file"
          ref={inputFileRef}
          hidden
          onChange={event => handleChangeImageSelected(event)}
          accept="image/*"
        />
      </Grid>
      {images.length === 0 && (
        <div className={classes.noImagesContainer}>
          <BackupIcon style={{ fontSize: 70, marginBottom: 10 }} />
          <Typography>Sube tus imágenes (máximo 10)</Typography>
        </div>
      )}
      {images.length !== 0 && (
        <div className="register-image-uploads-container">
          {images.length === 0 && (
            <div className={classes.noImagesContainer}>
              <BackupIcon style={{ fontSize: 70, marginBottom: 10 }} />
              <Typography>Sube tus imágenes (máximo 10)</Typography>
            </div>
          )}
          {images.map((image, index) => (
            <div className={classes.imageContainer}>
              <IconButton
                onClick={() => removeImageByIndex(index)}
                className={classes.closeIconContainer}>
                <CancelRoundedIcon className={classes.closeIcon} />
              </IconButton>

              <img
                src={image.url}
                style={{ objectFit: 'contain', height: 200, width: 200 }}
                alt={'image-' + index}
              />
            </div>
          ))}
        </div>
      )}

      {/* <Grid container spacing={3} className={classes.uploadImagesContainer}>
        {images.length === 0 && (
          <div className={classes.noImagesContainer}>
            <BackupIcon style={{ fontSize: 70, marginBottom: 10 }} />
            <Typography>Sube tus imágenes (máximo 10)</Typography>
          </div>
        )}
        {images.map((image, index) => (
          <Grid item md={2} xs={12}>
            <div className={classes.imageContainer}>
              <IconButton
                onClick={() => removeImageByIndex(index)}
                className={classes.closeIconContainer}>
                <CancelRoundedIcon className={classes.closeIcon} />
              </IconButton>

              <img
                alt="slot"
                src={image.url}
                style={{ objectFit: 'contain', height: 200, width: 200 }}
                alt={'image-' + index}
              />
            </div>
          </Grid>
        ))}
      </Grid> */}
      <Grid container style={{ marginTop: 20 }}>
        <Grid item md={1} xs={6}>
          <Button
            onClick={() => props.stepReturn()}
            size="large"
            variant="contained"
            style={{
              color: 'black'
            }}>
            Regresar
          </Button>
        </Grid>
        <Grid item md={1} xs={6}>
          <Button
            onClick={() => handleRegister()}
            size="large"
            variant="contained"
            color="primary"
            style={{
              color: 'black'
            }}>
            Finalizar
          </Button>
        </Grid>
      </Grid>
      <Snackbar
        open={snackState}
        autoHideDuration={6000}
        onClose={() => setSnackState(false)}>
        <Alert onClose={() => setSnackState(false)} severity="warning">
          Se requieren por lo menos 3 imágenes
        </Alert>
      </Snackbar>
    </Grid>
  );
};

const mapStateToProps = state => ({
  registerData: state.userReducer.registerData
});

const mapDispatchToProps = dispatch => ({
  addRegisterData: registerData => dispatch(addRegisterData(registerData))
});

export default connect(mapStateToProps, mapDispatchToProps)(Images);
