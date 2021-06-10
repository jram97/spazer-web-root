import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles, withStyles } from '@material-ui/styles';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid
} from '@material-ui/core';

import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  button: {
    color: theme.palette.primary.contrastText,
    width: 200,
    marginLeft: 10
  },
  sportsComplexesNumberContainer: {
    backgroundColor: '#ACFE00',
    marginLeft: 10,
    padding: 10
  },
  table: {
    minWidth: 700
  }
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

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

const SportsComplexes = props => {
  const classes = useStyles();
  const history = useHistory();
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9)
  ];

  const navigateToSportsComplexesCretion = () => {
    history.push('/sports-complexes/creation');
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item xs={12} style={{ display: 'flex' }}>
          <Button
            onClick={() => navigateToSportsComplexesCretion()}
            size="large"
            variant="contained"
            color="primary"
            style={{ backgroundColor: '#ffffff', color: 'black' }}>
            Agregar Complejo
          </Button>
          <Button
            // disabled
            size="large"
            variant="contained"
            color="primary"
            className={[classes.button, classes.buttonInfoContainer]}>
            <span style={{ fontSize: 30 }}>8</span>
            <span style={{ marginLeft: 10 }}>Canchas</span>
          </Button>
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Número de complejo</StyledTableCell>
                  <StyledTableCell align="right">
                    Nombre de complejo
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    Canchas disponibles
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map(row => (
                  <StyledTableRow key={row.name}>
                    <StyledTableCell component="th" scope="row">
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.calories}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.fat}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  );
};

export default SportsComplexes;
