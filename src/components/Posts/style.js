import styled from 'styled-components';
import { Image, Row, Col } from 'react-bootstrap';

export const ProfileBadge = styled(Image)`
  width: 40px;
  height: 40px;
  margin-right: 5px;
  object-fit: cover;
`;

export const ProfileBadgeText = styled(Col)`
  margin-left: 5px;
`;

export const TimeStamp = styled(Row)`
  color: gray;
  font-size: small;
`;
