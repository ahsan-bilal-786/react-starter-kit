import styled from 'styled-components';
import { Accordion } from 'react-bootstrap';

export const StyledAccordian = styled(Accordion.Toggle)`
  background-color: ${(props) =>
    props.iscurrenteventkey === 'true' ? '#e7f1ff !important' : 'white'};
  color: ${(props) =>
    props.iscurrenteventkey === 'true' ? '#0c63e4' : '#212529'};
`;
