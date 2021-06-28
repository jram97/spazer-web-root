import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Hidden, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import Logout from './Components/Logout';
import Items from './Components/Items';

const useStyles = makeStyles(({elevation, topBarColor}) => ({
  appBar: {
    zIndex: elevation ? elevation : 5,
    backgroundColor: topBarColor ? topBarColor : 'white'
  },
  flexGrow: {
    flexGrow: 1
  },
  toolbar: {
    paddingBottom: 10
  }
}));

const Topbar = ({
  topBarColor,
  appIconStyle,
  appLeftIcon,
  elevation,
  className,
  onSidebarOpen,
  children,
  ...rest
}) => {

  const classes = useStyles({elevation, topBarColor});

  const [notifications] = useState([]);

  return (

    <AppBar
      {...rest}
      className={classes.appBar}
    >
      <Toolbar className={classes.toolbar}>

        <Items />

        <div className={classes.flexGrow} />

        <Hidden mdDown>

          {
            !children &&
            <Logout numberOfNotificacions={notifications.length} />
          }

        </Hidden>

        <Hidden lgUp>

          <IconButton onClick={onSidebarOpen}>
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
