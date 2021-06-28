import { IconsMaterial } from 'assets/icons/IconsMaterial';
import Constants from 'common/constants';

// Global pages are created for use in the sidebar and on the top bar.
export const Pages = [
    {
      title: 'Sucursales',
      href: '/branch-offices',
      icon: IconsMaterial.Home,
      role: [Constants.SUPER_ROLE_USER, Constants.ADMIN_ROLE_USER]
    },
    {
      title: 'Servicios',
      href: '/services',
      icon: IconsMaterial.Services,
      role: [Constants.SUPER_ROLE_USER, Constants.ADMIN_ROLE_USER]
    },
    {
      title: 'Caracteristicas',
      href: '/features',
      icon: IconsMaterial.Featured,
      role: [Constants.SUPER_ROLE_USER, Constants.ADMIN_ROLE_USER]
    }
    /*{
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
    },
    {
      title: 'Canchas',
      href: '/canchas',
      icon: <ShoppingBasketIcon />
    },
    {
      title: 'Características',
      href: '/caracteristicas',
      icon: <LockOpenIcon />
    },
    {
      title: 'Typography',
      href: '/typography',
      icon: <TextFieldsIcon />
    },
    {
      title: 'Icons',
      href: '/icons',
      icon: <ImageIcon />
    },
    {
      title: 'Account',
      href: '/account',
      icon: <AccountBoxIcon />
    },
    {
      title: 'Settings',
      href: '/settings',
      icon: <SettingsIcon />
    } */
]