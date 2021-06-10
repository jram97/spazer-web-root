import React, { useState } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Badge, Hidden, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none'
  },
  flexGrow: {
    flexGrow: 1
  },
  signOutButton: {
    marginLeft: theme.spacing(1)
  },
  toolbar: {
    paddingBottom: 10
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
    ...rest
  } = props;

  const classes = useStyles();
  const history = useHistory();

  const [notifications] = useState([]);

  const closeSession = () => {
    localStorage.removeItem('spazer_token');
    localStorage.removeItem('spazer_user');
    history.replace('Login');
  };

  return (
    <AppBar
      {...rest}
      style={{
        zIndex: elevation ? elevation : 5,
        backgroundColor: topBarColor ? topBarColor : 'white'
      }}>
      <Toolbar className={classes.toolbar}>
        <RouterLink to="/">
          <img
            alt="Logo"
            style={appIconStyle ? appIconStyle : null}
            src={appLeftIcon ? appLeftIcon : '/images/logos/logo--white.svg'}
          />
        </RouterLink>
        <div className={classes.flexGrow} />
        <Hidden mdDown>
          {props.children && props.children}
          {!props.children && (
            <IconButton
              color="#000000"
              style={{
                displa: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
              onClick={closeSession}>
              <Badge
                badgeContent={notifications.length}
                color="#000000"
                variant="dot">
                <ExitToAppIcon />
                <span
                  style={{
                    marginLeft: 10,
                    fontSize: 18,
                    alignSelf: 'center',
                    color: '#000000'
                  }}>
                  Cerrar sesión
                </span>
              </Badge>
            </IconButton>
          )}

          {/* <IconButton className={classes.signOutButton} color="inherit">
            <InputIcon />
          </IconButton> */}
        </Hidden>
        <Hidden lgUp>
          <IconButton color="red" onClick={onSidebarOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func
};

export default Topbar;
