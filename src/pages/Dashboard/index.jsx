import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Row, Col, Alert } from 'react-bootstrap';
import ErrorBoundary from 'components/ErrorBoundary';
import { fetchUserInfoAction } from 'pages/Auth/ducks/actions';
import { fetchUserPostsAction } from 'pages/Profile/ducks/actions';
import ProfileImagesSection from 'components/ProfileImagesSection';
import ProfileContainer from 'elements/Profile/ProfileContainer';
import UserInfoAccordian from 'components/UserInfoAccordian';
import Posts from 'components/Posts';
import { getUserInfo, getUserPosts } from 'api';
import CreatePostPrompt from 'components/CreatePostPrompt';

const Dashboard = ({
  fetchAuthUserInfo,
  fetchAuthUserPosts,
  authUser,
  authUserPosts,
}) => {
  const [posts, setPosts] = useState([]);
  const [postStatus, setPostStatus] = useState({});
  const [user, setUser] = useState({});
  const { userId } = useParams();
  const fetchPostsHandler = () => {
    if (userId) {
      getUserPosts(userId)
        .then((response) => {
          setPosts(response);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      fetchAuthUserPosts().then((response) => response);
    }
  };

  const fetchUserHandler = () => {
    if (userId) {
      getUserInfo(userId)
        .then((response) => {
          setUser(response);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      fetchAuthUserInfo().then((response) => response);
    }
  };
  useEffect(fetchPostsHandler, []);
  useEffect(fetchUserHandler, []);

  return (
    <ErrorBoundary>
      <>
        {!userId
          ? authUser &&
            authUser.profile && (
              <>
                <ProfileImagesSection user={authUser} allowEdit={true} />
                <ProfileContainer>
                  <Row>
                    <Col md='4'>
                      <UserInfoAccordian userInfo={authUser.profile} />
                    </Col>
                    <Col md='8'>
                      {postStatus.type !== '' ? (
                        <Alert variant={postStatus.type}>
                          {postStatus.message}
                        </Alert>
                      ) : (
                        ''
                      )}
                      <CreatePostPrompt setPostStatus={setPostStatus} />
                      {authUserPosts && (
                        <>
                          {' '}
                          <Posts
                            userName={`${authUser.first_name} ${authUser.last_name}`}
                            userProfilePicture={
                              authUser.profile.profile_picture
                            }
                            posts={authUserPosts}
                            allowPosts={true}
                          />
                        </>
                      )}
                    </Col>
                  </Row>
                </ProfileContainer>{' '}
              </>
            )
          : user &&
            user.profile && (
              <>
                <ProfileImagesSection user={user} />
                <ProfileContainer>
                  <Row>
                    <Col md='4'>
                      <UserInfoAccordian userInfo={user.profile} />
                    </Col>
                    <Col md='8'>
                      {posts && (
                        <>
                          {' '}
                          <Posts
                            userName={`${user.first_name} ${user.last_name}`}
                            userProfilePicture={user.profile.profile_picture}
                            posts={posts}
                            allowPosts={false}
                          />
                        </>
                      )}
                    </Col>
                  </Row>
                </ProfileContainer>{' '}
              </>
            )}
      </>
    </ErrorBoundary>
  );
};

const mapStateToProps = (state) => {
  return {
    authUser: state.auth.user,
    authUserPosts: state.posts.posts,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchAuthUserInfo: () => dispatch(fetchUserInfoAction()),
    fetchAuthUserPosts: () => dispatch(fetchUserPostsAction()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
