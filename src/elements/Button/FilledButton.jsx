import React, { memo } from 'react';
import { Button } from 'react-bootstrap';

const FilledButton = ({ children, ...rest }) => {
  return (
    <Button variant='dark' {...rest}>
      {children}
    </Button>
  );
};

export default memo(FilledButton);
