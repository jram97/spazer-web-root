import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Link } from 'react-scroll';
import {
  Toolbar,
  Hidden,
  IconButton,
  Typography,
  Button,
  Menu,
  MenuItem
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import './topbar.css';

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none'
  },
  topBar: {
    boxShadow: 'none',
    backgroundColor: 'transparent'
  },
  flexGrow: {
    display: 'flex',
    justifyContent: 'space-between',
    flexGrow: 1
  },
  logo: {
    width: 180,
    height: 113,
    objectFit: 'contain'
  },
  loginButton: {
    // position: 'absolute',
    width: 132,
    height: 30,
    // left: 1158,
    // top: 30,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#ACFE00',
    boxSizing: 'border-box',
    borderRadius: 47.5
    // border: 1px solid #ACFE00;
    // box-sizing: border-box;
    // border-radius: 47.5px;
  },
  signOutButton: {
    marginLeft: theme.spacing(1)
  }
}));

const Topbar = props => {
  const {
    topBarColor,
    appIconStyle,
    appLeftIcon,
    elevation,
    className,
    onSidebarOpen,
    headerTransparent,
    ...rest
  } = props;

  const [anchorEl, setAnchorEl] = React.useState(null);

  const openContextualMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const classes = useStyles();

  return (
    <div
      {...rest}
      className={
        headerTransparent ? 'topbar-header' : 'topbar-header topbar-transition'
      }
      position="fixed">
      <Toolbar>
        <RouterLink to="/">
          <img
            alt="Logo"
            className="topbar-logo"
            src={require('assets/images/spazer_1.png')}
          />
        </RouterLink>
        <div className={classes.flexGrow} />
        <Hidden mdDown className={classes.flexGrow}>
          <Link
            activeClass="active"
            to="register-container"
            spy={true}
            smooth={true}
            offset={-180}
            duration={500}>
            <Button
              variant="contained"
              color="primary"
              className="topbar-options topbar-register-button">
              <Typography style={{ color: 'black' }}>
                Registrate como comercio
              </Typography>
            </Button>
          </Link>

          {/*<Button className="topbar-login-button">
            <Typography style={{ color: 'white' }}>Iniciar sesión</Typography>
          </Button> */}

          {/* <IconButton className={classes.signOutButton} color="inherit">
            <InputIcon />
          </IconButton> */}
        </Hidden>
        <Hidden lgUp>
          <IconButton color="red" onClick={openContextualMenu}>
            <MenuIcon />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}>
            <MenuItem onClick={handleClose}>
              <Link
                onClick={handleClose}
                activeClass="active"
                to="register-container"
                spy={true}
                smooth={true}
                offset={-180}
                duration={500}>
                <Typography>Registrate como comercio</Typography>
              </Link>
            </MenuItem>
          </Menu>
        </Hidden>
      </Toolbar>
    </div>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func
};

export default Topbar;
