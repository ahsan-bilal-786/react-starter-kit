import React from 'react';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Card, Form as FormBS, Spinner } from 'react-bootstrap';
import { CreatePostTextArea } from 'components/CreatePostPrompt/style';
import { addUserPostAction } from 'pages/Profile/ducks/actions';
import FilledButton from 'elements/Button/FilledButton';

const successNotification = 'Post Created Successfully.';
const CreatePostPrompt = ({ createPost, setPostStatus }) => {
  const initialValues = {
    content: '',
    image: null,
  };
  const validationSchema = Yup.object({
    image: Yup.mixed(),
    content: Yup.string().when('image', {
      is: (val) => (val === null ? true : false),
      then: Yup.string().required('Post Cannot be Empty!'),
    }),
  });
  function createPostHandler(values, { resetForm, setSubmitting, setErrors }) {
    const { content, image } = values;

    createPost(content, image)
      .then((response) => {
        setPostStatus({
          message: successNotification,
          type: 'success',
        });
        resetForm();
        document.getElementById('post-input').value = null;
        setSubmitting(false);
      })
      .catch((error) => {
        let fieldErrors = {};

        if (error && error.message)
          setPostStatus({ message: error.message, type: 'danger' });
        if (error.response.data && error.response.data.content)
          fieldErrors.content = error.response.data.content[0];
        if (error.response.data && error.response.data.image)
          fieldErrors.image = error.response.data.image[0];
        setErrors(fieldErrors);
        console.log(fieldErrors);
        setSubmitting(false);
      });
  }

  return (
    <Card className='mb-5'>
      <Card.Body>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={createPostHandler}
        >
          {({ setFieldValue, touched, errors, isSubmitting, values }) => (
            <Form>
              <FormBS.Row className='mb-2'>
                <CreatePostTextArea
                  type='text'
                  as='textarea'
                  rows={3}
                  placeholder="What's on your mind....."
                  errorClassName='text-danger'
                  name='content'
                  onChange={(e) => setFieldValue('content', e.target.value)}
                  className={
                    errors.content
                      ? 'w-100 border-2 field-error rounded'
                      : 'w-100 rounded'
                  }
                  haserror={errors.content}
                  value={values.content}
                />
                {touched.content && errors.content ? (
                  <FormBS.Text className='text-danger'>
                    {errors.content}
                  </FormBS.Text>
                ) : null}
              </FormBS.Row>
              <FormBS.Label>Upload Image</FormBS.Label>
              <FormBS.File
                accept='image/*'
                name='image'
                className='mb-3'
                onChange={(e) => setFieldValue('image', e.target.files[0])}
                id='post-input'
              />
              {touched.image && errors.image ? (
                <FormBS.Text className='text-danger'>
                  {errors.image}
                </FormBS.Text>
              ) : null}
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
                  'Post'
                )}
              </FilledButton>
            </Form>
          )}
        </Formik>
      </Card.Body>
    </Card>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    createPost: (content, image) => dispatch(addUserPostAction(content, image)),
  };
};

export default connect(null, mapDispatchToProps)(CreatePostPrompt);
