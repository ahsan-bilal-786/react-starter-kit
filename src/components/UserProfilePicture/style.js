import styled from 'styled-components';
import { Image } from 'react-bootstrap';

export const ProfileImage = styled(Image)`
  width: 152px;
  height: 152px;
  object-fit: cover;
`;

export const ProfileDiv = styled.div`
  position: absolute;
  top: 300px;
  left: 300px;
`;

export const ProfileName = styled.span`
  font-size: 30px;
  color: white;
  padding-left: 10px;
`;

export const OverlayButton = styled.a`
  cursor: pointer;
`;

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 0;
  width: 152px;
  height: 152px;
  transition: opacity 0.5s ease;
  background: rgba(0, 0, 0, 0.6);
  &:hover {
    opacity: 1;
  }
`;

export const OverlayText = styled.div`
  color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  text-align: center;
`;
