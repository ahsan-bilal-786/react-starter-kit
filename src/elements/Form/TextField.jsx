import React from 'react';
import { useField } from 'formik';
import { Form } from 'react-bootstrap';

const TextField = ({ label, errorClassName, bottomText, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <Form.Group controlId={props.id || props.name} className={props.className}>
      {label ? <Form.Label className='mb-0'>{label}</Form.Label> : ''}
      <Form.Control
        {...field}
        {...props}
        className={meta.touched && meta.error ? 'field-error' : ''}
      />
      {meta.touched && meta.error ? (
        <Form.Text className={errorClassName}>{meta.error}</Form.Text>
      ) : null}
      {bottomText ? <Form.Text className='mt-0'>{bottomText}</Form.Text> : ''}
    </Form.Group>
  );
};

export default TextField;
