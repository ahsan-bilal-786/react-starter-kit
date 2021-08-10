import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Card, Alert, Row, Col, Form as FormBS } from 'react-bootstrap';
import { updateAuthUserInfoAction } from 'pages/Auth/ducks/actions';
import TextField from 'elements/Form/TextField';
import SelectField from 'elements/Form/SelectField';
import { FilledButton } from 'elements/Button';
import UserInfoAccordian from 'components/UserInfoAccordian';
import { ProfileContainer } from 'elements/Profile';
import ProfileImagesSection from 'components/ProfileImagesSection';

const successNotification = 'User profile has been successully updated.';
const UpdateProfile = ({ user, updateUserProfile }) => {
  const [form_status, setFormStatus] = useState({
    type: '',
    message: '',
  });
  const RELATIONSHIP_STATUES = ['Single', 'Committed', 'Married', 'Divorced'];
  const initialValues = {
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name,
    profile: {
      education: user.profile.education,
      work: user.profile.work,
      hometown: user.profile.hometown,
      bio: user.profile.bio,
      gender: user.profile.gender,
      birthday: user.profile.birthday,
      relationship_status: user.profile.relationship_status,
    },
  };

  const validationSchema = Yup.object({
    first_name: Yup.string().min(3).required('First Name should not be empty.'),
    last_name: Yup.string().min(3).required('Last Name should not be empty.'),
    email: Yup.string().email().required('Emails should not be empty.'),
  });

  const handleSubmit = (values, { setErrors, setSubmitting }) => {
    updateUserProfile(values)
      .then((resp) => {
        if (resp) {
          setFormStatus({
            message: successNotification,
            type: 'success',
          });
          setSubmitting(false);
        }
      })
      .catch((error) => {
        let fieldError = {};
        if (error && error.message) {
          setFormStatus({ message: error.message, type: 'danger' });
        }
        if (error.response && error.response.data.first_name) {
          fieldError.first_name = error.response.data.first_name;
        }
        if (error.response && error.response.data.last_name) {
          fieldError.last_name = error.response.data.last_name;
        }
        if (error.response && error.response.data.email) {
          fieldError.email = error.response.data.email;
        }
        if (
          error.response &&
          error.response.data.profile &&
          error.response.data.profile.hometown
        ) {
          fieldError.profile.hometown = error.response.data.profile.hometown;
        }
        if (
          error.response &&
          error.response.data.profile &&
          error.response.data.profile.work
        ) {
          fieldError.profile.work = error.response.data.profile.work;
        }
        if (
          error.response &&
          error.response.data.profile &&
          error.response.data.profile.gender
        ) {
          fieldError.profile.gender = error.response.data.profile.gender;
        }
        if (
          error.response &&
          error.response.data.profile &&
          error.response.data.profile.birthday
        ) {
          fieldError.profile.birthday = error.response.data.profile.birthday;
        }
        if (
          error.response &&
          error.response.data.profile &&
          error.response.data.profile.bio
        ) {
          fieldError.profile.bio = error.response.data.profile.bio;
        }
        if (
          error.response &&
          error.response.data.profile &&
          error.response.data.profile.education
        ) {
          fieldError.profile.education = error.response.data.profile.education;
        }
        setErrors(fieldError);
        setSubmitting(false);
      });
  };
  return (
    <>
      <ProfileImagesSection user={user} />

      <ProfileContainer>
        <Row>
          <Col md='4'>
            <UserInfoAccordian userInfo={user.profile} />
          </Col>
          <Col md='8'>
            <Card>
              <Card.Header>
                <h6 className='mb-0'>Update Profile</h6>
              </Card.Header>
              <Card.Body>
                {form_status.type !== '' ? (
                  <Alert variant={form_status.type}>
                    {form_status.message}
                  </Alert>
                ) : (
                  ''
                )}
                <Formik
                  initialValues={initialValues}
                  onSubmit={handleSubmit}
                  validationSchema={validationSchema}
                >
                  {({ values, touched, errors }) => (
                    <Form>
                      <FormBS.Row>
                        <Col>
                          <TextField
                            type='text'
                            name='first_name'
                            placeholder='First Name'
                            label='First Name'
                            errorClassName='text-danger'
                            className='mb-2'
                            value={values.first_name}
                          />
                        </Col>
                        <Col>
                          <TextField
                            type='text'
                            name='last_name'
                            placeholder='Last Name'
                            label='Last Name'
                            errorClassName='text-danger'
                            className='mb-2'
                            value={values.last_name}
                          />
                        </Col>
                      </FormBS.Row>
                      <TextField
                        type='text'
                        name='email'
                        placeholder='E-mail'
                        label='E-mail Address'
                        errorClassName='text-danger'
                        className='mb-2'
                        value={values.email}
                      />
                      <TextField
                        type='text'
                        name='profile.hometown'
                        placeholder='Hometown'
                        label='Hometown'
                        errorClassName='text-danger'
                        className='mb-2'
                        value={values.profile.hometown}
                      />
                      <TextField
                        type='text'
                        name='profile.education'
                        placeholder='Education'
                        label='Education'
                        errorClassName='text-danger'
                        className='mb-2'
                        value={values.profile.education}
                      />
                      <TextField
                        type='text'
                        name='profile.work'
                        placeholder='Work'
                        label='Work'
                        errorClassName='text-danger'
                        className='mb-2'
                        value={values.profile.work}
                      />
                      <TextField
                        type='text'
                        as='textarea'
                        name='profile.bio'
                        placeholder='Bio'
                        label='Bio'
                        errorClassName='text-danger'
                        className='mb-2'
                        value={values.profile.bio}
                      />
                      <FormBS.Label className='mb-0'>Gender </FormBS.Label>
                      <FormBS.Group className='mb-2'>
                        <div className='form-check form-check-inline'>
                          <label className='form-check-label'>
                            <Field
                              type='radio'
                              name='profile.gender'
                              value='Male'
                              className='mr-1 form-check-input'
                              checked={values.profile.gender === 'Male'}
                            />
                            Male
                          </label>
                        </div>
                        <div className='form-check form-check-inline'>
                          <label className='form-check-label'>
                            <Field
                              type='radio'
                              name='profile.gender'
                              value='Female'
                              className='mr-1 form-check-input'
                              checked={values.profile.gender === 'Female'}
                            />
                            Female
                          </label>
                        </div>
                        <div className='form-check form-check-inline'>
                          <label className='form-check-label'>
                            <Field
                              type='radio'
                              name='profile.gender'
                              value='Others'
                              className='mr-1 form-check-input'
                              checked={values.profile.gender === 'Others'}
                            />
                            Others
                          </label>
                        </div>

                        {touched.profile &&
                        touched.profile.gender &&
                        errors.profile &&
                        errors.profile.gender ? (
                          <FormBS.Text className='text-danger'>
                            {errors.profile.gender}
                          </FormBS.Text>
                        ) : null}
                      </FormBS.Group>
                      <TextField
                        name='profile.birthday'
                        type='date'
                        className='mb-2'
                        errorClassName='text-danger'
                        label='Birthday'
                        max={new Date().toISOString().split('T')[0]}
                      />
                      <SelectField
                        label='Relationship Status'
                        name='profile.relationship_status'
                        value={
                          values.profile.relationship_status === ''
                            ? 'Select Relationship Status'
                            : values.profile.relationship_status
                        }
                        className='mb-2'
                      >
                        <option disabled>Select Relationship Status</option>
                        {RELATIONSHIP_STATUES.map(
                          (relationship_status, index) => (
                            <option
                              value={relationship_status}
                              key={relationship_status}
                            >
                              {relationship_status}
                            </option>
                          )
                        )}
                      </SelectField>
                      <FilledButton variant='primary' type='Submit'>
                        Update Profile
                      </FilledButton>
                    </Form>
                  )}
                </Formik>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </ProfileContainer>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUserProfile: (updatedInfo) =>
      dispatch(updateAuthUserInfoAction(updatedInfo)),
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfile);
