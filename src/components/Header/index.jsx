import React from 'react';
import { connect } from 'react-redux';
import { Nav, NavDropdown } from 'react-bootstrap';
import { APP_NAME } from 'config';
import { AppRoutes } from 'routes';
import {
  UserDropDown,
  NavDropDownLink,
  AppTitle,
  NavBar,
  UserProfileLink,
} from 'components/Header/style';
import UserIcon from 'elements/UserIcon';
import LoginForm from 'components/LoginForm';
import SearchBar from 'components/SearchBar';
/**
 * Header is a template top navigation bar of user layout
 */
const Header = ({ isAuthenticated, userPicture, userName, history }) => {
  return (
    <NavBar collapseOnSelect expand='lg' variant='dark'>
      <NavBar.Brand>
        <AppTitle to={AppRoutes.DASHBOARD.path}>{APP_NAME}</AppTitle>
      </NavBar.Brand>
      <NavBar.Toggle aria-controls='responsive-navbar-nav' />
      <NavBar.Collapse id='responsive-navbar-nav'>
        <Nav className='mr-auto '>{isAuthenticated ? <SearchBar /> : ''}</Nav>
        <Nav>
          {isAuthenticated ? (
            <>
              <UserProfileLink
                to={AppRoutes.DASHBOARD.path}
                style={{ color: 'white' }}
              >
                {userName}
              </UserProfileLink>
              <UserDropDown
                alignRight
                className='dropdown-menu-right'
                title={<UserIcon picture={userPicture} size='40px' />}
              >
                <NavDropDownLink to={AppRoutes.UPDATE_PROFILE.path}>
                  Update Profile
                </NavDropDownLink>
                <NavDropdown.Divider />
                <NavDropDownLink to={AppRoutes.CHANGE_PASSWORD.path}>
                  Update Password
                </NavDropDownLink>
                <NavDropdown.Divider />
                <NavDropDownLink to={AppRoutes.LOGOUT.path}>
                  Logout
                </NavDropDownLink>
              </UserDropDown>
            </>
          ) : (
            <LoginForm history={history} />
          )}
        </Nav>
      </NavBar.Collapse>
    </NavBar>
  );
};

function mapStateToProps(state, ownProps) {
  const user_picture =
    state.auth.user && state.auth.user.profile
      ? state.auth.user.profile.profile_picture
      : null;

  const user_name =
    state.auth.user && state.auth.user.first_name
      ? state.auth.user.first_name + ' ' + state.auth.user.last_name
      : '';
  return {
    isAuthenticated: state.auth.isAuthenticated,
    userPicture: user_picture,
    userName: user_name,
  };
}

export default connect(mapStateToProps)(Header);
