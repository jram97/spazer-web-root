import React, { useState, useEffect } from 'react';

import {
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableFooter,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Button,
  Drawer,
  IconButton
} from '@material-ui/core';

import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import CloseIcon from '@material-ui/icons/Close';
import Calendar from 'react-calendar';
import { getAllBookings } from 'services/bookingService';
import 'react-calendar/dist/Calendar.css';
import './booking-history-styles.css';

import {
  makeStyles,
  withStyles,
  useTheme,
  createStyles
} from '@material-ui/styles';

const useStyles1 = makeStyles(theme =>
  createStyles({
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5)
    }
  })
);

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
    color: theme.palette.common.black,
    textAlign: 'center'
  },

  body: {
    fontSize: 14,
    padding: 10
  }
}))(TableCell);

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },

  dropdown: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    top: 50,
    right: 0,
    left: 0,
    zIndex: 1,
    border: '1px solid',
    // height: 50,
    flexGrow: 1,
    overflowY: 'scroll',
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper
  },
  filterContainer: {
    position: 'relative'
  },
  drawerContainer: {
    padding: 15
  },
  filterContainerDrawer: {
    backgroundColor: theme.palette.white,
    // backgroundColor: '#1D1D1D',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2)
    // display: 'flex',
    // flexDirection: 'column',
    // justifyContent: 'center'
  },
  filterTitleHeader: {
    // marginTop: 15,
    marginBottom: 15
  },
  sectionLabel: {
    marginTop: 15,
    marginBottom: 15
  },
  centerContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  tableContainer: {
    marginTop: 24
  },
  headerOptionsContainer: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
}));

const users = [
  {
    name: 'Rodrigo Corvera',
    date: '29/12/20',
    bookingType: 'Pago Completo',
    time: '17:00 p.m',
    slot: 'Cancha #12',
    status: {
      type: 1,
      name: 'Pagado'
    }
  },
  {
    name: 'Rodrigo Corvera',
    date: '29/12/20',
    bookingType: 'Pago Completo',
    time: '17:00 p.m',
    slot: 'Cancha #12',
    status: {
      type: 2,
      name: 'Cancelado'
    }
  }
];

const History = () => {
  const classes = useStyles();
  const [value, onChange] = useState(new Date());
  const [page, setPage] = React.useState(0);
  const [filterOptionsOpen, setFilterOptionsOpen] = useState(false);
  const [fields, setFields] = useState(users);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const setTypeOfPayment = typeOfPaymentId => {
    switch (typeOfPaymentId) {
      case 1:
        return 'Pago Completo';
      case 2:
        return 'Reserva con $5';
      case 3:
        return 'Reserva Sencilla';
    }
  };

  useEffect(() => {
    getBookingHistory();
  }, []);

  const getBookingHistory = async () => {
    try {
      let branchOfficeId = JSON.parse(localStorage.getItem('spazer_user'))
        .branchOffice._id;
      let { data } = await getAllBookings(branchOfficeId);
      console.log('esta es la data', data);
      setFields(data);
    } catch (error) {
      console.log('error', error);
    }
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, fields.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function TablePaginationActions(props) {
    const classes = useStyles1();
    const theme = useTheme();
    const { count, page, rowsPerPage, onChangePage } = props;

    const handleFirstPageButtonClick = event => {
      onChangePage(event, 0);
    };

    const handleBackButtonClick = event => {
      onChangePage(event, page - 1);
    };

    const handleNextButtonClick = event => {
      onChangePage(event, page + 1);
    };

    const handleLastPageButtonClick = event => {
      onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
      <div className={classes.root}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page">
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page">
          {theme.direction === 'rtl' ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page">
          {theme.direction === 'rtl' ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page">
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }

  const getStatusStyle = status => {
    switch (status.type) {
      case 1:
        return (
          <Chip
            style={{ backgroundColor: 'green', color: 'white' }}
            label={status.name}
          />
        );
      case 2:
        return (
          <Chip
            style={{ backgroundColor: 'red', color: 'white' }}
            label={status.name}
          />
        );
      default:
        return (
          <Chip
            style={{ backgroundColor: 'red', color: 'white' }}
            label={status.name}
          />
        );
    }
  };

  return (
    <div className={classes.root}>
      {/* <ClickAwayListener onClickAway={() => setFilterOptionsOpen(false)}> */}
      <Drawer
        anchor={'right'}
        variant="persistent"
        open={filterOptionsOpen}
        onClose={() => setFilterOptionsOpen(false)}
        className={classes.drawerContainer}>
        <div className={classes.filterContainerDrawer}>
          <Grid container>
            <Grid xs={6}>
              <Typography variant={'h3'} className={classes.filterTitleHeader}>
                Filtros
              </Typography>
            </Grid>
            <Grid
              xs={6}
              style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <IconButton onClick={() => setFilterOptionsOpen(false)}>
                <CloseIcon></CloseIcon>
              </IconButton>
            </Grid>
          </Grid>

          <Typography variant={'h4'} className={classes.sectionLabel}>
            Cancha
          </Typography>
          <Grid container spacing={1}>
            <Grid
              item
              sm={3}
              xs={6}
              style={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                // onClick={() => selectFeature(feature.id)}

                variant="contained"
                color="primary">
                Cancha #12
              </Button>
            </Grid>
            <Grid
              item
              sm={3}
              xs={6}
              style={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                // onClick={() => selectFeature(feature.id)}

                variant="contained"
                color="primary">
                Cancha #12
              </Button>
            </Grid>
            <Grid
              item
              sm={3}
              xs={6}
              style={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                // onClick={() => selectFeature(feature.id)}

                variant="contained"
                color="primary">
                Cancha #12
              </Button>
            </Grid>
            <Grid
              item
              sm={3}
              xs={6}
              style={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                // onClick={() => selectFeature(feature.id)}

                variant="contained"
                color="primary">
                Cancha #12
              </Button>
            </Grid>
            <Grid
              item
              sm={3}
              xs={6}
              style={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                // onClick={() => selectFeature(feature.id)}

                variant="contained"
                color="primary">
                Cancha #12
              </Button>
            </Grid>
          </Grid>
          <Typography variant={'h4'} className={classes.sectionLabel}>
            Seleccionar fecha
          </Typography>
          <div className={classes.centerContent}>
            <Calendar selectRange={true} onChange={onChange} value={value} />
          </div>
          <Typography variant={'h4'} className={classes.sectionLabel}>
            Estado
          </Typography>
          <Grid container spacing={1}>
            <Grid
              item
              sm={3}
              xs={6}
              style={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                // onClick={() => selectFeature(feature.id)}

                variant="contained"
                color="primary">
                Pagado
              </Button>
            </Grid>
            <Grid
              item
              sm={3}
              xs={6}
              style={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                // onClick={() => selectFeature(feature.id)}

                variant="contained"
                color="primary">
                Cancelado
              </Button>
            </Grid>
            <Grid
              item
              sm={3}
              xs={6}
              style={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                // onClick={() => selectFeature(feature.id)}

                variant="contained"
                color="primary">
                En espera
              </Button>
            </Grid>
          </Grid>
        </div>
      </Drawer>
      {/* </ClickAwayListener> */}

      <Grid container>
        <Grid item md={6} xs={12}>
          <Typography variant={'h3'}>Historial de Reservas</Typography>
        </Grid>
        <Grid item md={6} xs={12} className={classes.headerOptionsContainer}>
          <Button
            onClick={() => setFilterOptionsOpen(true)}
            size="large"
            variant="contained"
            color="primary"
            style={{
              width: 200,
              marginLeft: 10,
              display: 'flex',
              justifyContent: 'space-evenly'
            }}>
            Filtro
            {/* <span s}tyle={{ fontSize: 30 }}>8</span> */}
            {/* <span style={{ marginLeft: 10 }}>Filtro</span> */}
          </Button>
        </Grid>
      </Grid>
      <Grid container className={classes.tableContainer}>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead style={{ backgroundColor: '#1D1D1D' }}>
                <TableRow>
                  <StyledTableCell align="left">Cliente</StyledTableCell>
                  <StyledTableCell align="left">Fecha</StyledTableCell>
                  <StyledTableCell align="left">
                    Tipo de Reserva
                  </StyledTableCell>
                  <StyledTableCell align="left">Hora</StyledTableCell>
                  <StyledTableCell align="left">Espacio</StyledTableCell>
                  <StyledTableCell align="left">Estado</StyledTableCell>
                </TableRow>
              </TableHead>
              {/* <TableBody> */}

              <TableBody>
                {(rowsPerPage > 0
                  ? fields.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : fields
                ).map(row => (
                  <StyledTableRow key={row.name}>
                    <StyledTableCell align="left">{row.name}</StyledTableCell>
                    <StyledTableCell align="center">{row.date}</StyledTableCell>
                    <StyledTableCell align="left">
                      {row.bookingType}
                    </StyledTableCell>
                    <StyledTableCell align="center">{row.time}</StyledTableCell>
                    <StyledTableCell align="left">{row.slot}</StyledTableCell>
                    <StyledTableCell align="center">
                      {setTypeOfPayment(row.type)}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
              {/* {fields.map(row => (
                   
                  ))}
                </TableBody> */}
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5]}
                    colSpan={3}
                    count={fields.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: { 'aria-label': 'rows per page' },
                      native: true
                    }}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  );
};

export default History;
