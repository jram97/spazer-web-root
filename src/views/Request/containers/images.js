import React from 'react';
import { Grid } from '@material-ui/core';

import { makeStyles } from '@material-ui/styles';
import 'views/Register/steps/register-image-step.css';

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

// const imagesAux = [
//   {
//     url: require('assets/images/image_1.png')
//   },
//   {
//     url: require('assets/images/image_2.png')
//   },
//   {
//     url: require('assets/images/image_3.png')
//   }
// ];

const ImagesContainer = ({ request }) => {
  const classes = useStyles();
  // const [images, setImages] = useState(imagesAux);

  return (
    <Grid container spacing={2}>
      {request.branchOffice && (
        <div className="register-image-uploads-container">
          {request.branchOffice &&
            request.branchOffice.images.length > 0 &&
            request.branchOffice.images.map((image, index) => (
              <div className={classes.imageContainer}>
                <img
                  src={image}
                  style={{ objectFit: 'contain', height: 200, width: 200 }}
                  alt={'slot-' + index}
                />
              </div>
            ))}
        </div>
      )}
    </Grid>
  );
};

export default ImagesContainer;
