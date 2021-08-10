import React from 'react';
import { connect } from 'react-redux';
import { Form as FormBS, Spinner } from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField } from 'elements/Form';
import { RegistrationFormDiv } from 'components/RegistrationForm/style';
import { FilledButton } from 'elements/Button';
import { registerUserAction } from 'pages/Auth/ducks/actions';
import { AppRoutes } from 'routes';

const RegistrationForm = ({ registerUser, history }) => {
  const today = new Date().toDateString();
  const GENDER_OPTIONS = ['Male', 'Female', 'Others'];
  const initialValues = {
    email: '',
    password: '',
    confirm_password: '',
    first_name: '',
    last_name: '',
    gender: '',
    birthday: '',
  };
  const handleSubmit = (values, { setErrors, setSubmitting }) => {
    const {
      email,
      password,
      confirm_password,
      first_name,
      last_name,
      gender,
      birthday,
    } = values;
    registerUser(
      email,
      password,
      confirm_password,
      first_name,
      last_name,
      gender,
      birthday
    )
      .then((resp) => {
        if (resp) {
          history.push(AppRoutes.DASHBOARD.path);
        }
      })
      .catch((error) => {
        let fieldError = {};
        if (error && error.message) {
          console.log(error.message);
        }
        if (error.response && error.response.data.email) {
          fieldError.email = error.response.data.email;
        }
        if (error.response && error.response.data.password) {
          fieldError.password = error.response.data.password;
        }
        if (error.response && error.response.data.confirm_password) {
          fieldError.confirm_password = error.response.data.confirm_password;
        }
        if (error.response && error.response.data.first_name) {
          fieldError.first_name = error.response.data.first_name;
        }
        if (error.response && error.response.data.last_name) {
          fieldError.last_name = error.response.data.last_name;
        }
        if (error.response && error.response.data.gender) {
          fieldError.gender = error.response.data.gender;
        }
        if (error.response && error.response.data.birthday) {
          fieldError.birthday = error.response.data.birthday;
        }
        setErrors(fieldError);
      });
    setSubmitting(false);
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().min(8).required('Required'),
    confirm_password: Yup.string()
      .min(8)
      .required('Required')
      .when('password', {
        is: (val) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref('password')],
          'Password & Confirm Password Must be same'
        ),
      }),
    first_name: Yup.string().max(15).required('Required'),
    last_name: Yup.string().max(15).required('Required'),
    birthday: Yup.date().max(today).required('Required'),
    gender: Yup.string().required('Required').oneOf(GENDER_OPTIONS),
  });
  return (
    <RegistrationFormDiv>
      <h3>Register Now</h3>
      <hr />

      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ isSubmitting, isValid, values, errors, touched }) => (
          <Form>
            <FormBS.Row>
              <TextField
                name='first_name'
                type='text'
                placeholder='First Name'
                className='col mb-0'
                errorClassName='text-danger'
                label='First Name'
              />
              <TextField
                name='last_name'
                type='text'
                placeholder='Last Name'
                className='col mb-0'
                errorClassName='text-danger'
                label='Last Name'
              />
            </FormBS.Row>
            <FormBS.Row>
              <TextField
                name='email'
                type='email'
                placeholder='Email Address'
                className='col mb-0'
                errorClassName='text-danger'
                label='Email'
              />
            </FormBS.Row>
            <FormBS.Row>
              <TextField
                name='password'
                type='password'
                placeholder='Password'
                className='col mb-0'
                errorClassName='text-danger'
                label='Password'
              />
            </FormBS.Row>
            <FormBS.Row>
              <TextField
                name='confirm_password'
                type='password'
                placeholder='Confirm Password'
                className='col mb-0'
                errorClassName='text-danger'
                label='Confirm Password'
              />
            </FormBS.Row>
            <FormBS.Row>
              <TextField
                name='birthday'
                type='date'
                className='col mb-0'
                errorClassName='text-danger'
                label='Birthday'
                max={new Date().toISOString().split('T')[0]}
              />
            </FormBS.Row>
            <FormBS.Label className='mb-0'>Gender </FormBS.Label>
            <FormBS.Group className='mb-2'>
              <div className='form-check form-check-inline'>
                <label className='form-check-label'>
                  <Field
                    type='radio'
                    name='gender'
                    value='Male'
                    className='mr-1 form-check-input'
                  />
                  Male
                </label>
              </div>
              <div className='form-check form-check-inline'>
                <label className='form-check-label'>
                  <Field
                    type='radio'
                    name='gender'
                    value='Female'
                    className='mr-1 form-check-input'
                  />
                  Female
                </label>
              </div>
              <div className='form-check form-check-inline'>
                <label className='form-check-label'>
                  <Field
                    type='radio'
                    name='gender'
                    value='Others'
                    className='mr-1 form-check-input'
                  />
                  Others
                </label>
              </div>

              {touched.gender && errors.gender ? (
                <FormBS.Text className='text-danger'>
                  {errors.gender}
                </FormBS.Text>
              ) : null}
            </FormBS.Group>
            <small>
              By clicking Sign Up, you agree to our Terms and that you have read
              our Data Use Policy, including our Cookie Use.
            </small>
            <FormBS.Group>
              <FilledButton
                variant='primary'
                type='submit'
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Spinner
                    as='span'
                    animation='border'
                    size='sm'
                    role='status'
                    aria-hidden='true'
                  />
                ) : (
                  'Sign Up'
                )}
              </FilledButton>
            </FormBS.Group>
          </Form>
        )}
      </Formik>
    </RegistrationFormDiv>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    registerUser: (
      email,
      password,
      confirm_password,
      first_name,
      last_name,
      gender,
      birthday
    ) =>
      dispatch(
        registerUserAction(
          email,
          password,
          confirm_password,
          first_name,
          last_name,
          gender,
          birthday
        )
      ),
  };
};

export default connect(null, mapDispatchToProps)(RegistrationForm);
