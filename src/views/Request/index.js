import React, { useState, useEffect } from 'react';

import {
  Grid,
  Input,
  InputAdornment,
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
  IconButton,
  Tabs,
  Tab,
  Box,
  Snackbar,
  Select,
  MenuItem,
  InputLabel
} from '@material-ui/core';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import SearchIcon from '@material-ui/icons/Search';
import ContactInfo from './containers/contact-info';
import Description from './containers/description';
import Images from './containers/images';
import MuiAlert from '@material-ui/lab/Alert';
import { getAllRequests, acceptRequest } from 'services/requestsService';
import Fuse from 'fuse.js';

import {
  makeStyles,
  withStyles,
  useTheme,
  createStyles
} from '@material-ui/styles';
import theme from 'theme';

const useStyles1 = makeStyles(theme =>
  createStyles({
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5)
    }
  })
);

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}>
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
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

const Requests = () => {
  const classes = useStyles();
  //const [value, onChange] = useState(new Date());
  const [snackbarState, setSnackbarState] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [stateFilter, setStateFilter] = useState('t');
  const [responseMessage, setResponseMessage] = useState('');
  const [responseState, setResponseState] = useState('error');
  const [companyName, setCompanyName] = useState('');

  const [currentRequest, setCurrentRequest] = useState({});
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const [confirmMessageOpen, setConfirmMessageOpen] = useState(false);
  const [page, setPage] = React.useState(0);

  const [requests, setRequests] = useState([]);
  const [requestsAux, setRequestsAux] = useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  // const [requests, setRequests] = useState([]);

  useEffect(() => {
    getRequestsToReview();
  }, []);

  const getRequestsToReview = async () => {
    try {
      let result = await getAllRequests();
      console.log('data', result.data);
      setRequests(result.data);
      setRequestsAux(result.data);
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleTabChanged = (event, tabIndex) => {
    console.log('index', tabIndex);
    setCurrentTabIndex(tabIndex);
  };

  const onSearchValueChange = event => {
    let currentSearchValue = event.target.value;
    setSearchValue(currentSearchValue);
    if (!currentSearchValue) {
      changeStateFilter(stateFilter);
      return;
    }
    const options = {
      isCaseSensitive: false,
      includeScore: false,
      shouldSort: true,
      // includeMatches: false,
      // findAllMatches: false,
      // minMatchCharLength: 1,
      // location: 0,
      // threshold: 0.6,
      // distance: 100,
      // useExtendedSearch: false,
      // ignoreLocation: false,
      // ignoreFieldNorm: false,
      keys: ['companyOwner', 'branchOffice.name', 'companyName']
    };

    const fuse = new Fuse(requestsAux, options);

    setRequestsAux(fuse.search(currentSearchValue).map(search => search.item));
  };

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, requestsAux.length - page * rowsPerPage);

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
    switch (status) {
      case 'a':
        return (
          <div>
            <Chip
              style={{
                backgroundColor: theme.palette.primary.main,
                color: 'white'
              }}
            />
            <span style={{ marginLeft: 20 }}>Aceptado</span>
          </div>
        );
      case 'w':
        return (
          <div>
            <Chip style={{ backgroundColor: '#FFED54', color: 'white' }} />
            <span style={{ marginLeft: 20 }}>En espera</span>
          </div>
        );

      case 'r':
        return (
          <div>
            <Chip
              style={{ backgroundColor: theme.palette.error, color: 'white' }}
            />
            <span style={{ marginLeft: 20 }}>Rechazado</span>
          </div>
        );
    }
  };

  const handlePenaltyUser = request => {
    setCompanyName(request.companyName);
    setCurrentRequest(request);
    // setPenaltyUsername(username);
    setConfirmMessageOpen(true);
  };

  const updateRequest = statusToCheck => {
    let updatedRequests = requests.map(request => {
      if (request._id === currentRequest._id) {
        return { ...request, state: statusToCheck };
      }
      return { ...request };
    });
    setRequests(updatedRequests);
  };

  const acceptRequestAction = async () => {
    try {
      let result = await acceptRequest(currentRequest._id);
      console.log('resultado', result);
      updateRequest('a');
      setConfirmMessageOpen(false);

      setResponseMessage(result.data.msg);
      setResponseState('success');
      setSnackbarState(true);
    } catch (error) {
      console.log('ocurrio un error', error);

      setResponseMessage(error.error.msg);
      setResponseState('error');
      setSnackbarState(true);
    }
  };

  const changeStateFilter = event => {
    let filterValue = event.target ? event.target.value : event;

    let requestToFilter = requests;
    if (filterValue !== 't') {
      requestToFilter = requests.filter(request => {
        return request.state === filterValue;
      });
    }
    setPage(0);
    setRequestsAux(requestToFilter);
    setStateFilter(filterValue);
  };

  return (
    <div className={classes.root}>
      {/* <ClickAwayListener onClickAway={() => setFilterOptionsOpen(false)}> */}
      {/* </ClickAwayListener> */}

      <Grid container>
        <Grid item md={6} xs={12}>
          <Typography variant={'h3'}>Solicitudes</Typography>
        </Grid>
        <Grid item md={6} xs={12} className={classes.headerOptionsContainer}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <InputLabel>Estado</InputLabel>
            <Select
              style={{ width: 100 }}
              value={stateFilter}
              color="secondary"
              onChange={changeStateFilter}
              inputProps={{ 'aria-label': 'Without label' }}>
              <MenuItem value="t">Todos</MenuItem>
              <MenuItem value="w">Pendientes</MenuItem>
              <MenuItem value="a">Aprobadas</MenuItem>
            </Select>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginLeft: 20
            }}>
            <InputLabel>Buscador</InputLabel>
            <Input
              value={searchValue}
              onChange={onSearchValueChange}
              startAdornment={
                <InputAdornment>
                  <SearchIcon />
                </InputAdornment>
              }
            />
          </div>
        </Grid>
      </Grid>
      <Grid container className={classes.tableContainer}>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead style={{ backgroundColor: '#1D1D1D' }}>
                <TableRow>
                  <StyledTableCell align="left">Categoría</StyledTableCell>
                  <StyledTableCell align="left">
                    Nombre de empresa
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    Nombre de encargado
                  </StyledTableCell>
                  <StyledTableCell align="left">Estado</StyledTableCell>
                  <StyledTableCell align="left">Acción</StyledTableCell>
                  {/* <StyledTableCell align="left">Estado</StyledTableCell> */}
                </TableRow>
              </TableHead>
              {/* <TableBody> */}

              <TableBody>
                {(rowsPerPage > 0
                  ? requestsAux.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : requests
                ).map(row => (
                  <StyledTableRow key={row.name}>
                    <StyledTableCell align="left">
                      {row.category.name}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.companyName}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {row.companyOwner}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {getStatusStyle(row.state)}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Button
                        onClick={() => handlePenaltyUser(row)}
                        variant="outlined">
                        Revisar
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
              {/* {requests.map(row => (
                   
                  ))}
                </TableBody> */}
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5]}
                    colSpan={3}
                    count={requestsAux.length}
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
        fullWidth
        maxWidth="md"
        onClose={() => setConfirmMessageOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
          <Typography variant="h3">{companyName}</Typography>
        </DialogTitle>
        <DialogContent>
          <Tabs
            value={currentTabIndex}
            onChange={handleTabChanged}
            aria-label="simple tabs example">
            <Tab value={0} label="Información general" />
            <Tab value={1} label="Sucursal" />
            <Tab value={2} label="Imágenes" />
          </Tabs>
          <TabPanel value={currentTabIndex} index={0}>
            <ContactInfo request={currentRequest} />
          </TabPanel>
          <TabPanel value={currentTabIndex} index={1}>
            <Description request={currentRequest} />
          </TabPanel>
          <TabPanel value={currentTabIndex} index={2}>
            <Images request={currentRequest} />
          </TabPanel>
        </DialogContent>
        <DialogActions>
          {currentRequest._id && currentRequest.state === 'w' && (
            <Button
              onClick={() => acceptRequestAction()}
              color="primary"
              style={{
                color: 'black',
                marginLeft: 10
              }}
              variant="contained"
              autoFocus>
              Aceptar
            </Button>
          )}
          <Button
            variant="contained"
            onClick={() => setConfirmMessageOpen(false)}>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarState}
        autoHideDuration={6000}
        onClose={() => setSnackbarState(false)}>
        <Alert onClose={() => setSnackbarState(false)} severity={responseState}>
          {responseMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Requests;
