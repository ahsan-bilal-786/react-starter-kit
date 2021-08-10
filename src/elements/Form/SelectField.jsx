import React from 'react';
import { useField } from 'formik';
import { Form } from 'react-bootstrap';

const SelectField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <Form.Group controlId={props.id || props.name} className={props.className}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        as='select'
        {...field}
        {...props}
        className={meta.touched && meta.error ? 'field-error' : ''}
      />
      {meta.touched && meta.error ? (
        <Form.Text className='text-danger'>{meta.error}</Form.Text>
      ) : null}
    </Form.Group>
  );
};

export default SelectField;
