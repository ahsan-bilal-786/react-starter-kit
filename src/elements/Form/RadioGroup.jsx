import React from 'react';
import { useField } from 'formik';
import { Form } from 'react-bootstrap';

const RadioGroup = ({ label, options, ...props }) => {
  const [field, meta] = useField({ ...props, type: 'checkbox' });
  return (
    <>
      <Form.Group
        controlId={props.id || props.name}
        className={props.className}
      >
        {label ? (
          <Form.Label className='mb-0 mr-2'>{`${label}:`}</Form.Label>
        ) : (
          ''
        )}

        {options.map((option, key) => (
          <Form.Check
            type='radio'
            label={option}
            value={option}
            name={props.name}
            key={key}
            inline
            {...field}
            {...props}
          />
        ))}
        {meta.checked && meta.error ? (
          <Form.Text className='text-danger'>{meta.error}</Form.Text>
        ) : null}
      </Form.Group>
    </>
  );
};

export default RadioGroup;
