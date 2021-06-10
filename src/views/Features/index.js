import React, { useState } from 'react';

import { makeStyles, withStyles } from '@material-ui/styles';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  Modal,
  Backdrop,
  Fade,
  Typography,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel
} from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';

import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  radioGroupContainer: { display: 'flex', justifyContent: 'center' },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20
  },
  radio: {
    '&$checked': {
      color: '#ACFE00'
    }
  },
  name: {
    marginTop: theme.spacing(1),
    color: 'black'
  },
  boldText: {
    fontWeight: 'bold'
  },
  createComplexContainer: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  marginTopLabel: {
    marginTop: 30
  },
  complexInfoContainer: {
    width: '100%',
    padding: 20,

    height: 'auto'
  },
  checked: {},
  sportsComplexesNumberContainer: {
    backgroundColor: '#ACFE00',
    marginLeft: 10,
    padding: 10
  },
  table: {
    minWidth: 700
  }
}));

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(even)': {
      backgroundColor: theme.palette.action.hover
    }
  }
}))(TableRow);

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: 'transparent',
    color: theme.palette.common.black
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const fieldsData = [
  {
    name: 'Wi fi',
    code: 254
  },
  {
    name: 'Baños',
    code: 276
  },
  {
    name: 'Comida',
    code: 445
  }
];

const Features = props => {
  const classes = useStyles();

  const [fieldEditionOpen, setFieldEditionOpen] = useState(false);
  const fields = fieldsData;

  /*const navigateToSportsComplexesCretion = () => {
    history.push('/sports-complexes/creation');
  };*/

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item xs={12} style={{ display: 'flex' }}>
          <Button
            size="large"
            variant="contained"
            color="primary"
            style={{
              width: 200,
              marginLeft: 10,
              display: 'flex',
              justifyContent: 'space-evenly'
            }}>
            <span style={{ fontSize: 30 }}>8</span>
            <span style={{ marginLeft: 10 }}>Características</span>
          </Button>
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">Nombre</StyledTableCell>
                  <StyledTableCell align="left">Código</StyledTableCell>
                  <StyledTableCell align="left">&nbsp;</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {fields.map(row => (
                  <StyledTableRow key={row.name}>
                    <StyledTableCell align="right">{row.name}</StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {row.code}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <Button
                        // onClick={() => setFeaturesModalOpen(!featuresModalOpen)}
                        size="small"
                        variant="contained"
                        color="primary"
                        style={{
                          backgroundColor: '#F4F4F4',
                          color: 'black'
                        }}>
                        <DeleteIcon />
                      </Button>
                      <Button
                        onClick={() => setFieldEditionOpen(true)}
                        size="small"
                        variant="contained"
                        color="primary"
                        style={{
                          backgroundColor: '#F4F4F4',
                          color: 'black'
                        }}>
                        <CreateIcon />
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={fieldEditionOpen}
        onClose={() => setFieldEditionOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}>
        <Fade in={fieldEditionOpen}>
          <div className={classes.modalContainer}>
            <Typography
              className={[classes.name, classes.marginTopLabel]}
              variant="h4">
              <span className={classes.boldText}>Edición de cancha</span>
            </Typography>
            <Grid container spacing={1} className={classes.marginTopLabel}>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  type="email"
                  label="Nombre de cancha"
                  margin="dense"
                  name="firstName"
                  //   onChange={event =>
                  //     setFieldInfo({ ...fieldInfo, name: event.target.value })
                  //   }
                  required
                  //   value={fieldInfo.name}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12} className={classes.radioGroupContainer}>
                <TextField
                  fullWidth
                  type="email"
                  // helperText="Coloca tu correo"
                  label="Precio p/h"
                  margin="dense"
                  name="firstName"
                  //   onChange={event =>
                  //     setFieldInfo({ ...fieldInfo, price: event.target.value })
                  //   }
                  required
                  //   value={fieldInfo.price}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <FormLabel
                  component="legend"
                  style={{ marginTop: 20, marginBottom: 10 }}>
                  Tipo de superficie
                </FormLabel>
                <RadioGroup
                  //   onChange={event =>
                  //     setFieldInfo({
                  //       ...fieldInfo,
                  //       typeOfSurface: event.target.value
                  //     })
                  //   }
                  //   value={fieldInfo.typeOfSurface}
                  row
                  aria-label="position"
                  name="position"
                  defaultValue="top"
                  className={classes.radioGroupContainer}>
                  <FormControlLabel
                    value="Grama"
                    control={
                      <Radio
                        color="#ACFE00"
                        classes={{
                          root: classes.radio,
                          checked: classes.checked
                        }}
                      />
                    }
                    label="Grama"
                    labelPlacement="top"
                  />
                  <FormControlLabel
                    value="Artificial"
                    control={
                      <Radio
                        color="#ACFE00"
                        classes={{
                          root: classes.radio,
                          checked: classes.checked
                        }}
                      />
                    }
                    label="Artificial"
                    labelPlacement="top"
                  />
                </RadioGroup>
              </Grid>
              <Grid item md={6} xs={12}>
                <FormLabel
                  component="legend"
                  style={{ marginTop: 20, marginBottom: 10 }}>
                  Tipo de Cancha
                </FormLabel>
                <RadioGroup
                  row
                  //   onChange={event =>
                  //     setFieldInfo({
                  //       ...fieldInfo,
                  //       typeOfField: event.target.value
                  //     })
                  //   }
                  //   value={fieldInfo.typeOfField}
                  aria-label="position"
                  name="position"
                  defaultValue="top"
                  className={classes.radioGroupContainer}>
                  <FormControlLabel
                    value="11v11"
                    control={
                      <Radio
                        color="#ACFE00"
                        classes={{
                          root: classes.radio,
                          checked: classes.checked
                        }}
                      />
                    }
                    label="11v11"
                    labelPlacement="top"
                  />
                  <FormControlLabel
                    value="6v6"
                    control={
                      <Radio
                        color="#ACFE00"
                        classes={{
                          root: classes.radio,
                          checked: classes.checked
                        }}
                      />
                    }
                    label="6v6"
                    labelPlacement="top"
                  />
                  <FormControlLabel
                    value="8v8"
                    control={
                      <Radio
                        color="#ACFE00"
                        classes={{
                          root: classes.radio,
                          checked: classes.checked
                        }}
                      />
                    }
                    label="8v8"
                    labelPlacement="top"
                  />
                </RadioGroup>
              </Grid>
            </Grid>
            <div
              style={{
                display: 'flex',
                padding: 15,
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <Button
                // onClick={() => saveField()}
                size="large"
                variant="contained"
                color="primary">
                Agregar Cancha
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default Features;
