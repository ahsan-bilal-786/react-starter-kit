import React from 'react';
import { useField } from 'formik';
import { Form } from 'react-bootstrap';

const CheckBoxField = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props, type: 'checkbox' });
  return (
    <Form.Group controlId={props.id || props.name} className={props.className}>
      <Form.Check {...field} {...props} label={children} />
      {meta.touched && meta.error ? (
        <Form.Text className='text-danger'>{meta.error}</Form.Text>
      ) : null}
    </Form.Group>
  );
};

export default CheckBoxField;
