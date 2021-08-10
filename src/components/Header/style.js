import styled from 'styled-components';
import { NavDropdown, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const AppTitle = styled(Link)`
  color: #fff;
  &:hover {
    color: #fff;
    text-decoration: none;
  }
`;

export const UserDropDown = styled(NavDropdown)`
  > a {
    font-size: 30px;
    padding: 0;
    &:after {
      display: none;
    }
  }
`;

export const NavDropDownLink = styled(Link)`
  padding: 10px;
  color: #000;
`;

export const NavBar = styled(Navbar)`
  background: #3b5998;
  color: #fff;
`;

export const UserProfileLink = styled(Link)`
  color: #fff;
  padding: 10px;
  padding-left: 0;
`;
