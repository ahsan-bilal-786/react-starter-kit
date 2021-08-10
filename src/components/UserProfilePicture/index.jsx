import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Modal, Form as FormBS, Alert } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
  ProfileImage,
  ProfileDiv,
  ProfileName,
  OverlayButton,
  OverlayText,
  Overlay,
} from 'components/UserProfilePicture/style';
import { updateUserProfilePictureAction } from 'pages/Auth/ducks/actions';
import { FilledButton } from 'elements/Button';
import user from 'assets/img/user.png';

const ProfilePicture = ({ picture }) => {
  return (
    <ProfileImage
      src={picture ? picture : user}
      className='rounded-circle border border-light border-2 image-responsive'
    ></ProfileImage>
  );
};

const UserProfilePicture = ({
  picture,
  user,
  updateProfilePicture,
  allowEdit,
}) => {
  const initialValues = { profile_picture: null };
  const validationSchema = Yup.object({
    profile_picture: Yup.mixed().required(
      'Please Select Profile Picture First'
    ),
  });
  const [showProfilePictureModal, setShowProfilePictureModal] = useState(false);

  const handlePorfilePictureUploadModalShow = () =>
    setShowProfilePictureModal(true);
  const handlePorfilePictureUploadModalClose = () =>
    setShowProfilePictureModal(false);

  const profilePictureUploadHandler = (
    values,
    { setErrors, setSubmitting, setStatus }
  ) => {
    const { profile_picture } = values;
    updateProfilePicture(profile_picture)
      .then((response) => {
        setStatus({
          type: 'success',
          message: 'Cover Picture Updated Successfully!',
        });
        setTimeout(() => {
          handlePorfilePictureUploadModalClose();
        }, 1000);
      })
      .catch((error) => {
        let fieldErrors = {};
        if (error && error.message) {
          setStatus({ type: 'danger', message: error.message });
          console.log(error.message);
        }
        if (error.response && error.response.data.profile_picture) {
          setStatus({ type: 'danger', message: 'Something went wrong!' });
          fieldErrors.profile_picture = error.response.data.profile_picture;
        }
        setErrors(fieldErrors);
      });
    setSubmitting(false);
  };
  return (
    <>
      <ProfileDiv>
        {!allowEdit ? (
          <>
            <ProfilePicture picture={picture} />
          </>
        ) : (
          <>
            <OverlayButton onClick={handlePorfilePictureUploadModalShow}>
              <ProfilePicture picture={user.profile.profile_picture} />
              <Overlay className='rounded-circle'>
                <OverlayText>Update Profile Picture</OverlayText>
              </Overlay>
            </OverlayButton>
          </>
        )}
        <ProfileName>{`${user.first_name} ${user.last_name}, ${user.profile__age}`}</ProfileName>
      </ProfileDiv>
      <Modal
        show={showProfilePictureModal}
        onHide={handlePorfilePictureUploadModalClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Upload New Profile Picture</Modal.Title>
        </Modal.Header>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={profilePictureUploadHandler}
        >
          {({ isSubmitting, setFieldValue, touched, errors, status }) => (
            <Form>
              <Modal.Body>
                {status ? (
                  <Alert variant={status.type}>{status.message}</Alert>
                ) : (
                  ''
                )}
                <FormBS.File
                  accept='image/*'
                  onChange={(e) =>
                    setFieldValue('profile_picture', e.target.files[0])
                  }
                ></FormBS.File>
                {touched.profile_picture && errors.profile_picture ? (
                  <FormBS.Text className='text-danger'>
                    {errors.profile_picture}
                  </FormBS.Text>
                ) : null}
              </Modal.Body>
              <Modal.Footer>
                <FilledButton
                  variant='secondary'
                  onClick={handlePorfilePictureUploadModalClose}
                >
                  Close
                </FilledButton>
                <FilledButton variant='primary' type='submit'>
                  Upload
                </FilledButton>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    updateProfilePicture: (cover_picture) =>
      dispatch(updateUserProfilePictureAction(cover_picture)),
  };
};
export default connect(null, mapDispatchToProps)(UserProfilePicture);
