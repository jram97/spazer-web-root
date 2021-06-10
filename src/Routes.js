import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { Route } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {
  Dashboard as DashboardView,
  ProductList as ProductListView,
  UserList as UserListView,
  Typography as TypographyView,
  Icons as IconsView,
  Account as AccountView,
  Settings as SettingsView,
  SignUp as SignUpView,
  SignIn as SignInView,
  NotFound as NotFoundView,
  Login as LoginView,
  SportsComplexes as SportsComplexesView,
  SportsComplexesCreation as SportsComplexesCreationView,
  Fields as FieldsView,
  Features as FeaturesView,
  Register as RegisterView,
  RegisterDone as RegisterDoneView,
  PasswordRecovery as PasswordRecoveryView,
  CalendarSchedule as CalendarScheduleView,
  BookingHistory as BookingHistoryView,
  WarningsHistory as WarningsHistoryView,
  BranchSettings as BranchSettingsView,
  BranchAccount as BranchAccountView,
  Landing as LandingView,
  Requests as RequestsView
} from './views';

const checkUserAuth = () => {};

const Routes = () => {
  return (
    <Switch>
      <Redirect exact from="/" to="/landing" />
      <Route component={LoginView} exact path="/login" />
      <Route component={LandingView} exact path="/landing" />
      <Route component={RegisterView} exact path="/register" />
      <Route component={RegisterDoneView} exact path="/register-done" />
      <Route component={PasswordRecoveryView} exact path="/password-recovery" />
      <RouteWithLayout
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/dashboard"
      />
      <RouteWithLayout
        component={CalendarScheduleView}
        exact
        layout={MainLayout}
        path="/calendar-schedule"
      />
      <RouteWithLayout
        component={RequestsView}
        exact
        layout={MainLayout}
        path="/requests"
      />
      <RouteWithLayout
        component={BookingHistoryView}
        exact
        layout={MainLayout}
        path="/booking-history"
      />
      <RouteWithLayout
        component={WarningsHistoryView}
        exact
        layout={MainLayout}
        path="/warnings-history"
      />
      <RouteWithLayout
        component={BranchSettingsView}
        exact
        layout={MainLayout}
        path="/branch-settings"
      />
      <RouteWithLayout
        component={BranchAccountView}
        exact
        layout={MainLayout}
        path="/branch-account-settings"
      />

      <RouteWithLayout
        component={UserListView}
        exact
        layout={MainLayout}
        path="/users"
      />
      <RouteWithLayout
        component={ProductListView}
        exact
        layout={MainLayout}
        path="/products"
      />
      <RouteWithLayout
        component={SportsComplexesView}
        exact
        layout={MainLayout}
        path="/sports-complexes"
      />
      <RouteWithLayout
        component={SportsComplexesCreationView}
        exact
        layout={MainLayout}
        path="/sports-complexes/creation"
      />
      <RouteWithLayout
        component={FieldsView}
        exact
        layout={MainLayout}
        path="/fields"
      />
      <RouteWithLayout
        component={FeaturesView}
        exact
        layout={MainLayout}
        path="/features"
      />
      <RouteWithLayout
        component={TypographyView}
        exact
        layout={MainLayout}
        path="/typography"
      />
      <RouteWithLayout
        component={IconsView}
        exact
        layout={MainLayout}
        path="/icons"
      />
      <RouteWithLayout
        component={AccountView}
        exact
        layout={MainLayout}
        path="/account"
      />
      <RouteWithLayout
        component={SettingsView}
        exact
        layout={MainLayout}
        path="/settings"
      />
      <RouteWithLayout
        component={SignUpView}
        exact
        layout={MinimalLayout}
        path="/sign-up"
      />
      <RouteWithLayout
        component={SignInView}
        exact
        layout={MinimalLayout}
        path="/sign-in"
      />
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
