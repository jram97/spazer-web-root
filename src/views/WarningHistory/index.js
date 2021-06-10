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

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import CloseIcon from '@material-ui/icons/Close';
import Calendar from 'react-calendar';
import {
  getBannedUsersByBranchId,
  removeBannByUserId
} from 'services/bannService';
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
    reason: 'Injustificado',
    status: {
      type: 1,
      name: 'Amonestado'
    }
  },
  {
    name: 'Miguel Alvarez',
    date: '29/12/20',
    reason: 'Mal comportamiento',
    status: {
      type: 2,
      name: 'Suspendido'
    }
  }
];

const WarningHistory = () => {
  const classes = useStyles();
  const [value, onChange] = useState(new Date());
  const [confirmMessageOpen, setConfirmMessageOpen] = useState(false);
  const [page, setPage] = React.useState(0);
  const [filterOptionsOpen, setFilterOptionsOpen] = useState(false);
  const [penaltyUser, setPenaltyUser] = useState('');

  const [fields, setFields] = useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  useEffect(() => {
    getListOfBannedUsers();
  }, []);

  const getListOfBannedUsers = async () => {
    try {
      let branchOfficeId = JSON.parse(localStorage.getItem('spazer_user'))
        .branchOffice._id;
      let { data } = await getBannedUsersByBranchId(branchOfficeId);

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
    switch (1) {
      case 1:
        return (
          <div>
            <Chip style={{ backgroundColor: '#FFED54', color: 'white' }} />
            <span style={{ marginLeft: 20 }}>Amonestado</span>
          </div>
        );
      case 2:
        return (
          <div>
            <Chip style={{ backgroundColor: '#F24505', color: 'white' }} />
            <span style={{ marginLeft: 20 }}>{status.name}</span>
          </div>
        );
      default:
        return (
          <div>
            <Chip style={{ backgroundColor: '#F24505', color: 'white' }} />
            <span style={{ marginLeft: 20 }}>{status.name}</span>
          </div>
        );
    }
  };

  const handlePenaltyUser = user => {
    setPenaltyUser(user);
    setConfirmMessageOpen(true);
  };

  const handleRemoveBann = async () => {
    try {
      let result = await removeBannByUserId(penaltyUser._id);
      removeUserBanned();
      setConfirmMessageOpen(false);
    } catch (error) {
      console.log('este es un error', error);
    }
  };

  const removeUserBanned = () => {
    let usersBannedUpdated = fields.filter(
      bann => bann._id !== penaltyUser._id
    );
    setFields(usersBannedUpdated);
    setPenaltyUser({});
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
              sm={6}
              xs={12}
              style={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                // onClick={() => selectFeature(feature.id)}

                variant="contained"
                color="primary"
                style={{
                  marginLeft: 10
                }}>
                Pagado
              </Button>
            </Grid>
            <Grid
              item
              sm={6}
              xs={12}
              style={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                // onClick={() => selectFeature(feature.id)}

                variant="contained"
                color="primary"
                style={{
                  marginLeft: 10
                }}>
                Cancelado
              </Button>
            </Grid>
            <Grid
              item
              sm={6}
              xs={12}
              style={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                // onClick={() => selectFeature(feature.id)}

                variant="contained"
                color="primary"
                style={{
                  marginLeft: 10
                }}>
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
                  <StyledTableCell align="left">Motivo</StyledTableCell>
                  <StyledTableCell align="left">Estado</StyledTableCell>
                  <StyledTableCell align="left">Acción</StyledTableCell>
                  {/* <StyledTableCell align="left">Estado</StyledTableCell> */}
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
                      {row.description}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {getStatusStyle(row.status)}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Button
                        onClick={() => handlePenaltyUser(row)}
                        variant="outlined">
                        Quitar penalidad
                      </Button>
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
      <Dialog
        open={confirmMessageOpen}
        onClose={() => setConfirmMessageOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Quitar penalidad</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Estas seguro de quitar la penalidad a {penaltyUser.name}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setConfirmMessageOpen(false)}
            color="primary">
            No
          </Button>
          <Button
            onClick={() => handleRemoveBann()}
            color="primary"
            style={{
              color: 'black',
              marginLeft: 10
            }}
            autoFocus>
            Sí
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default WarningHistory;
