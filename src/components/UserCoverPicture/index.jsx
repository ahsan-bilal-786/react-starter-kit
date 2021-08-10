import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { connect } from 'react-redux';
import { Modal, Form as FormBS, Alert } from 'react-bootstrap';
import * as Yup from 'yup';
import { updateUserCoverPictureAction } from 'pages/Auth/ducks/actions';
import {
  CoverDiv,
  CoverImage,
  OverlayButton,
  Overlay,
  OverlayText,
} from 'components/UserCoverPicture/style';
import { FilledButton } from 'elements/Button';
import cover from 'assets/img/cover.png';

const CoverPicture = ({ picture }) => {
  return <CoverImage className='w-100 ' src={picture ? picture : cover} />;
};

const UserCoverPicture = ({ picture, user, updateCoverPicture, allowEdit }) => {
  const initialValues = { cover_picture: null };
  const validationSchema = Yup.object({
    cover_picture: Yup.mixed().required('Please Select Cover Picture First'),
  });
  const [showCoverPictureModal, setShowCoverPictureModal] = useState(false);
  const handleCoverPictureUploadModalShow = () =>
    setShowCoverPictureModal(true);
  const handleCoverPictureUploadModalClose = () =>
    setShowCoverPictureModal(false);

  const coverPictureUploadHandler = (
    values,
    { setErrors, setSubmitting, setStatus }
  ) => {
    const { cover_picture } = values;
    updateCoverPicture(cover_picture)
      .then((response) => {
        setStatus({
          type: 'success',
          message: 'Cover Picture Updated Successfully!',
        });
        setTimeout(() => {
          handleCoverPictureUploadModalClose();
        }, 1000);
      })
      .catch((error) => {
        let fieldErrors = {};
        if (error && error.message) {
          setStatus({ type: 'danger', message: error.message });
        }
        if (error.response && error.response.data.cover_picture) {
          setStatus({ type: 'danger', message: 'Something went wrong!' });
          fieldErrors.cover_picture = error.response.data.cover_picture;
        }
        setErrors(fieldErrors);
      });
    setSubmitting(false);
  };

  return (
    <>
      <CoverDiv>
        {!allowEdit ? (
          <CoverPicture picture={user.profile.cover_picture} />
        ) : (
          <OverlayButton
            onClick={handleCoverPictureUploadModalShow}
            variant='link'
            className='w-100'
          >
            <CoverPicture picture={user.profile.cover_picture} />
            <Overlay>
              <OverlayText>Update Cover Picture</OverlayText>
            </Overlay>
          </OverlayButton>
        )}
      </CoverDiv>
      <Modal
        show={showCoverPictureModal}
        onHide={handleCoverPictureUploadModalClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Upload New Cover Picture</Modal.Title>
        </Modal.Header>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={coverPictureUploadHandler}
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
                    setFieldValue('cover_picture', e.target.files[0])
                  }
                ></FormBS.File>
                {touched.cover_picture && errors.cover_picture ? (
                  <FormBS.Text className='text-danger'>
                    {errors.cover_picture}
                  </FormBS.Text>
                ) : null}
              </Modal.Body>
              <Modal.Footer>
                <FilledButton
                  variant='secondary'
                  onClick={handleCoverPictureUploadModalClose}
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
        <FormBS onSubmit={coverPictureUploadHandler}></FormBS>
      </Modal>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateCoverPicture: (cover_picture) =>
      dispatch(updateUserCoverPictureAction(cover_picture)),
  };
};
export default connect(null, mapDispatchToProps)(UserCoverPicture);
