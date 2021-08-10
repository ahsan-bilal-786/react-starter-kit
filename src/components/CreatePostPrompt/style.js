import styled from 'styled-components';
import { TextField } from 'elements/Form';

export const CreatePostTextArea = styled(TextField)`
  resize: none;
  border: ${(props) => (props.haserror ? '' : 'none')};

  &:focus {
    color: #212529;
    background-color: #fff;
    border-color: #86b7fe;
    outline: 0;
    box-shadow: 0 0 0 0.25rem rgb(13 110 253 / 25%);
  }
`;
