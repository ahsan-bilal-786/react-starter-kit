import styled from 'styled-components';
import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const ProfileLink = styled(Link)`
  text-decoration: none;
  color: black;
  &:hover,
  &:active,
  &:focus {
    text-decoration: none;
    color: black;
  }
`;

export const ProfileImage = styled(Image)`
  width: 70px;
  height: 70px;
  margin-right: 5px;
  object-fit: cover;
`;
