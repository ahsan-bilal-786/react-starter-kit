import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { USER_LANDING_PAGE } from 'routes';

const PublicRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Redirect to={USER_LANDING_PAGE} />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

const mapStateToProps = (state, ownProps) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(PublicRoute);
