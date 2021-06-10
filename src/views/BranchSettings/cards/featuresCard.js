import React, { useEffect, useState, useRef } from 'react';
import {
  Grid,
  Typography,
  Button,
  Card,
  IconButton,
  CardActions
} from '@material-ui/core';
import {
  Wifi as WifiIcon,
  CancelRounded as CancelRoundedIcon,
  Add as AddIcon
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import { updateBranch } from 'services/branchesService';

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
  unselectedButton: {
    backgroundColor: '#EBEBEB'
  },
  cardContainer: {
    padding: 24
  },
  cardHeader: {
    marginTop: 15,
    marginBottom: 15,
    display: 'flex',
    flexDirection: 'row'
  },
  section: {
    marginTop: 10,
    marginBottom: 10
  },
  cardImages: {
    display: 'flex',
    flexDirection: 'column'
  },
  imagesContainer: {
    height: 150
  },
  editButtonContainer: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
}));

const featuresArray = [
  {
    id: 1,
    name: 'Wifi',
    icon: <WifiIcon />,
    isSelected: false
  },
  {
    id: 2,
    name: 'Wifi',
    icon: <WifiIcon />,
    isSelected: true
  },
  {
    id: 3,
    name: 'Wifi',
    icon: <WifiIcon />,
    isSelected: false
  },
  {
    id: 4,
    name: 'Wifi',
    icon: <WifiIcon />,
    isSelected: true
  },
  {
    id: 4,
    name: 'Wifi',
    icon: <WifiIcon />,
    isSelected: true
  },
  {
    id: 4,
    name: 'Wifi',
    icon: <WifiIcon />,
    isSelected: false
  },
  {
    id: 4,
    name: 'Wifi',
    icon: <WifiIcon />,
    isSelected: false
  }
];

const FeaturesCard = props => {
  const classes = useStyles();
  const [features] = useState(featuresArray);
  const inputFileRef = useRef(null);
  const [imagesAux, setImagesAux] = useState([]);
  const [editionMode, setEditionMode] = useState(false);

  // useEffect(() => {
  //   if (props.branchInfo._id) {
  //     getFeaturesByCategoryId()
  //   }

  // }, [props.branchInfo])

  // const getFeaturesByCategoryId =async () => {
  //   try {

  //   }
  //   catch(error) {

  //   }
  // }

  const handleEdition = () => {
    let { images } = props.branchInfo;
    setImagesAux(images);
    console.log('entro aqui');
    setEditionMode(true);
  };

  const removeImageByIndex = imageIndexToDelete => {
    let updatedImages = imagesAux.filter(
      (image, index) => index !== imageIndexToDelete
    );
    setImagesAux(updatedImages);
  };

  const renderBranchImages = () => {
    if (props.branchInfo._id && !editionMode) {
      return props.branchInfo.images.map((image, index) => {
        return (
          <Grid item md={2} xs={12}>
            <img
              alt="slot"
              src={image}
              style={{ objectFit: 'contain', height: 200, width: 200 }}
            />
          </Grid>
        );
      });
    } else {
      return imagesAux.map((image, index) => {
        return (
          <div className={classes.imageContainer}>
            <IconButton
              onClick={() => removeImageByIndex(index)}
              className={classes.closeIconContainer}>
              <CancelRoundedIcon className={classes.closeIcon} />
            </IconButton>

            <img
              src={image.url ? image.url : image}
              style={{ objectFit: 'contain', height: 200, width: 200 }}
              alt={'branch-' + index}
            />
          </div>
        );
      });
    }
  };

  const cancelEditionMode = () => {
    setEditionMode(false);
    setImagesAux([]);
  };

  const renderEditionButton = () => {
    if (editionMode) {
      return (
        <IconButton onClick={cancelEditionMode}>
          <CancelRoundedIcon />
        </IconButton>
      );
    } else {
      return (
        <Button
          onClick={() => handleEdition()}
          variant="contained"
          color="primary">
          Editar
        </Button>
      );
    }
  };

  const handleBranchUpdate = async () => {
    try {
      let branchOfficeId = JSON.parse(localStorage.getItem('spazer_user'))
        .branchOffice._id;

      let branchToUpdate = {
        id: branchOfficeId,
        images: imagesAux.map(image => {
          if (image.url) {
            return;
          }
        })
      };
      let result = await updateBranch(branchToUpdate);
      console.log('Se actualizó', result);
      handleCancelEditionMode();
    } catch (error) {
      console.log('dio error', error);
    }
  };

  const handleCancelEditionMode = () => {
    setImagesAux([]);
    setEditionMode(false);
  };

  const handleChangeImageSelected = event => {
    let images = [...imagesAux];
    images.push({
      url: URL.createObjectURL(event.target.files[0]),
      file: event.target.files[0]
    });

    setImagesAux(images);
  };

  return (
    <Card fullWidth={true} className={classes.cardContainer}>
      <Grid container spacing={2} className={classes.cardHeader}>
        <Grid item md={6} xs={6}>
          <Typography variant={'h3'}>{props.branchInfo.name}</Typography>
        </Grid>
        <Grid item md={6} xs={6} className={classes.editButtonContainer}>
          {renderEditionButton()}
        </Grid>
      </Grid>
      <Grid
        container
        spacing={2}
        className={[classes.cardImages, classes.section]}>
        <Grid item md={12} xs={12}>
          <Typography variant={'h4'}>Fotografías</Typography>
          {editionMode && (
            <IconButton onClick={() => inputFileRef.current.click()}>
              <AddIcon />
            </IconButton>
          )}
          <input
            type="file"
            ref={inputFileRef}
            hidden
            onChange={event => handleChangeImageSelected(event)}
            accept="image/*"
          />
        </Grid>
        <Grid item md={12} xs={12} className={classes.imagesContainer}>
          <Grid container spacing={2}>
            {renderBranchImages()}
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={2}
        className={[classes.cardImages, classes.section]}>
        <Grid item md={6} xs={12}>
          <Typography variant={'h4'}>
            Comodidades que cuenta tu complejo
          </Typography>
        </Grid>
        <Grid item md={12} xs={12} className={classes.imagesContainer}>
          <Grid fullWidth container spacing={4}>
            {props.branchInfo._id &&
              props.branchInfo.features.map(feature => {
                return (
                  <Grid item md={2} xs={6}>
                    <Button
                      fullWidth
                      // disabled
                      // size="large"
                      variant="contained"
                      color="primary"
                      className={[
                        !feature.isSelected ? classes.unselectedButton : null
                      ]}
                      // className={classes.button}
                      startIcon={feature.icon}>
                      {feature.name}
                    </Button>
                  </Grid>
                );
              })}
          </Grid>
        </Grid>
      </Grid>
      {editionMode && (
        <CardActions>
          <Button
            variant="contained"
            color="primary"
            onClick={handleBranchUpdate}>
            Actualizar
          </Button>
          <Button onClick={cancelEditionMode}>Cancelar</Button>
        </CardActions>
      )}
    </Card>
  );
};

export default FeaturesCard;
