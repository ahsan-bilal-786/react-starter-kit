import styled from 'styled-components';
import CheckBoxField from 'elements/Form/CheckBoxField';
import { Link } from 'react-router-dom';
export const CheckBOXField = styled(CheckBoxField)`
  color: white;
  font-size: 13px;
  line-height: 22px;
`;

export const BottomLink = styled(Link)`
  color: white;
  text-decoration: none;
  &:hover,
  &:visited {
    color: white;
  }
`;
