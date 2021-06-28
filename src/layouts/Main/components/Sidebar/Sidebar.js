import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Divider, Drawer } from '@material-ui/core';
import './sidebar-styles.css';

import { Profile, SidebarNav } from './components';

// Route imports
import { Pages } from 'config/Pages';

const useStyles = makeStyles(theme => ({
  drawer: {
    width: 240,

    [theme.breakpoints.up('lg')]: {
      marginTop: 0
      // height: 'calc(100% - 64px)'
    }
  },
  root: {
    //backgroundColor: theme.palette.white,
    backgroundColor: '#1D1D1D',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2)
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  nav: {
    marginBottom: theme.spacing(2)
  }
}));

const Sidebar = props => {
  const { open, variant, onClose, className, ...rest } = props;
  /* const [openSidebar, setOpenSidebar] = useState(false);

  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };*/

  const setLogoImage = () => {
    return '';
  };

  const classes = useStyles();


  return (
    <div style={{ display: 'flex' }}>
      <Drawer
        anchor="left"
        classes={{ paper: classes.drawer }}
        onClose={onClose}
        open={open}
        variant={variant}>
        <div {...rest} className={clsx(classes.root, className)}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 40
            }}>
            <img
              alt="jogo-indicator"
              src={require('assets/images/spazer_1.png')}
              style={{ objectFit: 'contain', height: 70 }}
            />
          </div>
          <Profile />
          <Divider className={classes.divider} />
          <SidebarNav className={classes.nav} pages={Pages} />
          {/* <UpgradePlan /> */}
        </div>
      </Drawer>
      {/* <Topbar onSidebarOpen={handleSidebarOpen} /> */}
      {/* aqui va */}
    </div>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired
};

export default Sidebar;
