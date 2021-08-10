import {
  FETCH_USER_POSTS,
  ADD_USER_POST,
} from 'pages/Profile/ducks/action-types';

import { createPost, getUserPosts } from 'api';

export function fetchUserPosts(payload) {
  return { type: FETCH_USER_POSTS, payload };
}

export function addUserPost(payload) {
  return { type: ADD_USER_POST, payload };
}

export const fetchUserPostsAction = (userId) => (dispatch) => {
  return getUserPosts(userId)
    .then((resp) => {
      if (resp) {
        dispatch(fetchUserPosts(resp));
        return true;
      }
      return Promise.reject(resp);
    })
    .catch((e) => {
      return Promise.reject(e);
    });
};

export const addUserPostAction = (content, image) => (dispatch) => {
  return createPost(content, image)
    .then((resp) => {
      if (resp) {
        dispatch(addUserPost(resp.data));
        return true;
      }
      return Promise.reject(resp);
    })
    .catch((e) => {
      return Promise.reject(e);
    });
};
