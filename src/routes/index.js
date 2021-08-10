import React, { lazy, Suspense } from 'react';
import map from 'lodash/map';
import { Switch, Redirect } from 'react-router-dom';
import dashboardLayout from 'layouts/Dashboard';
import HomePageLayout from 'layouts/HomePage';
import Logout from 'pages/Auth/Logout';
import RegistrationForm from 'components/RegistrationForm';

const ChangePassword = lazy(() => import('pages/Auth/ChangePassword'));
const Dashboard = lazy(() => import('pages/Dashboard'));
const Profile = lazy(() => import('pages/Profile/UpdateProfile'));
const Search = lazy(() => import('pages/Search'));
const PrivateRoute = lazy(() => import('routes/PrivateRoute'));
const PublicRoute = lazy(() => import('routes/PublicRoute'));

export const RoutesHOC = (routes, defaultPath) => {
  return (props) => (
    <Suspense fallback={<div></div>}>
      <Switch>
        {map(routes, (route) => {
          if (route.isPublic === true) {
            return (
              <PublicRoute
                key={route.name}
                path={route.path}
                component={route.component}
                exact
              />
            );
          } else {
            return (
              <PrivateRoute
                key={route.name}
                path={route.path}
                component={route.component}
                exact
              />
            );
          }
        })}
        <Redirect to={defaultPath} />
      </Switch>
    </Suspense>
  );
};

export const DashboardRoutes = {
  MAIN: {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
  },
};

export const AppRoutes = {
  LOGIN: {
    path: '/login',
    name: 'Login',
    component: HomePageLayout(RegistrationForm),
    isPublic: true,
  },
  LOGOUT: {
    path: '/logout',
    name: 'Logout',
    component: Logout,
    isPublic: false,
  },
  DASHBOARD: {
    path: '/',
    name: 'Dashboard',
    component: dashboardLayout(RoutesHOC(DashboardRoutes, '/')),
    isPublic: false,
  },
  UPDATE_PROFILE: {
    path: '/update-profile',
    name: 'Update Profile',
    component: dashboardLayout(Profile),
    isPublic: false,
  },
  CHANGE_PASSWORD: {
    path: '/update-password',
    name: 'Update Password',
    component: dashboardLayout(ChangePassword),
    isPublic: false,
  },
  SEARCH: {
    path: '/search',
    name: 'Search',
    component: dashboardLayout(Search),
    isPublic: false,
  },
  PROFILE: {
    path: '/profile/:userId',
    name: 'Profile',
    component: dashboardLayout(Dashboard),
    isPublic: false,
  },
};

export const DEFAULT_PATH = AppRoutes.LOGIN.path;
export const USER_LANDING_PAGE = AppRoutes.DASHBOARD.path;

export const AppRouter = RoutesHOC(AppRoutes, '/login');
