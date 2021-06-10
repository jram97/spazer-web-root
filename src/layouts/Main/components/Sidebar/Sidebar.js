import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Divider, Drawer } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Constants from 'common/constants';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import TodayIcon from '@material-ui/icons/Today';
import HistoryIcon from '@material-ui/icons/History';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import AccountBoxIcon from '@material-ui/icons/AccountBox';

import './sidebar-styles.css';

import { Profile, SidebarNav } from './components';

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

  const pages = [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: <DashboardIcon />,
      role: [Constants.SUPER_ROLE_USER, Constants.ADMIN_ROLE_USER]
    },
    {
      title: 'Peticiones',
      href: '/requests',
      icon: <DashboardIcon />,
      role: [Constants.SUPER_ROLE_USER]
    },
    {
      title: 'Complejos',
      href: '/sports-complexes',
      icon: <DashboardIcon />,
      role: [Constants.ADMIN_ROLE_USER]
    },
    {
      title: 'Espacios',
      href: '/fields',
      icon: <ViewModuleIcon />,
      role: [Constants.ADMIN_ROLE_USER]
    },
    {
      title: 'Características',
      href: '/features',
      icon: <DashboardIcon />,
      role: [Constants.ADMIN_ROLE_USER]
    },
    {
      title: 'Calendario',
      href: '/calendar-schedule',
      icon: <TodayIcon />,
      role: [Constants.ADMIN_ROLE_USER]
    },
    {
      title: 'Historial',
      href: '/booking-history',
      icon: <HistoryIcon />,
      role: [Constants.ADMIN_ROLE_USER]
    },
    {
      title: 'Amonestaciones',
      href: '/warnings-history',
      icon: <RemoveCircleOutlineIcon />,
      role: [Constants.ADMIN_ROLE_USER]
    },
    {
      title: 'Configuración',
      href: '/branch-settings',
      icon: <DashboardIcon />,
      role: [Constants.ADMIN_ROLE_USER]
    },
    {
      title: 'Cuenta',
      href: '/branch-account-settings',
      icon: <AccountBoxIcon />,
      role: [Constants.ADMIN_ROLE_USER]
    }

    // {
    //   title: 'Canchas',
    //   href: '/canchas',
    //   icon: <ShoppingBasketIcon />
    // },
    // {
    //   title: 'Características',
    //   href: '/caracteristicas',
    //   icon: <LockOpenIcon />
    // },
    // {
    //   title: 'Typography',
    //   href: '/typography',
    //   icon: <TextFieldsIcon />
    // },
    // {
    //   title: 'Icons',
    //   href: '/icons',
    //   icon: <ImageIcon />
    // },
    // {
    //   title: 'Account',
    //   href: '/account',
    //   icon: <AccountBoxIcon />
    // },
    // {
    //   title: 'Settings',
    //   href: '/settings',
    //   icon: <SettingsIcon />
    // }
  ];

  return (
    <div style={{ display: 'flex' }}>
      <Drawer
        containerStyle={{ backgroundColor: 'black' }}
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
          <SidebarNav className={classes.nav} pages={pages} />
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
