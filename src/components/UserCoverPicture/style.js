import styled from 'styled-components';
import { Image, Button } from 'react-bootstrap';
export const CoverDiv = styled.div`
  position: relative;
  top: 0;
  left: 0;
`;

export const CoverImage = styled(Image)`
  min-height: 400px;
  max-height: 400px;
  object-fit: cover;
  box-shadow: 0 8px 8px 0 rgba(0, 0, 0, 0.2),
    0 6px 20px 0 rgba(0, 0, 0, 0.19) inset;
  margin: 0;
  padding: 0;
  border: 0;
`;

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 0;
  transition: opacity 0.5s ease;
  background: rgba(0, 0, 0, 0.6);
  height: 100%;
  width: 100%;
  &:hover {
    opacity: 1;
  }
`;

export const OverlayButton = styled(Button)`
  box-shadow: none;
  outline: none;
  min-height: 400px;
  max-height: 400px;
  object-fit: cover;
  box-shadow: 0 8px 8px 0 rgba(0, 0, 0, 0.2),
    0 6px 20px 0 rgba(0, 0, 0, 0.19) inset;
  margin: 0;
  padding: 0;
  border: 0;
  background: none;
  &:hover,&:focus:,&active, {
    box-shadow: none;
    outline: none;
    color: none;
    background: none;
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
