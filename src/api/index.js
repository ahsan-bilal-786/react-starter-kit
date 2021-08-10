import axios from 'axios';
import getRoute from 'api/routes';
import { AppRoutes } from 'routes';

export const setAuthToken = (token) => {
  axios.defaults.headers.common['Authorization'] = `Token ${token}`;
};

const failedResponse = (error) => {
  if (
    error.response &&
    error.response.status &&
    error.response.status === 401
  ) {
    window.location.replace(AppRoutes.LOGOUT.path);
  }
  return Promise.reject(error);
};

const getRequest = (route) => {
  if (!route) {
    return;
  }
  return axios
    .get(route)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return failedResponse(error);
    });
};

export const postRequest = (route, data = {}) => {
  return axios
    .post(route, data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return failedResponse(error);
    });
};

export const putRequest = (route, data = {}) => {
  return axios
    .put(route, data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return failedResponse(error);
    });
};
export const patchRequest = (route, data = {}) => {
  return axios
    .patch(route, data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return failedResponse(error);
    });
};

export const registerUser = (
  email,
  password,
  confirm_password,
  first_name,
  last_name,
  gender,
  birthday
) => {
  const data = {
    email,
    password,
    confirm_password,
    first_name,
    last_name,
    gender,
    birthday,
  };
  const route = getRoute('registerUser');
  return postRequest(route, data);
};

export const authenticateUser = (username, password) => {
  const data = { username, password };
  const route = getRoute('login');
  return postRequest(route, data);
};

export const getUserInfo = (userId) => {
  const route = getRoute('userProfile', { id: userId });
  return getRequest(route);
};

export const updateUserProfile = (updatedUserInfo) => {
  const data = updatedUserInfo;
  const route = getRoute('updateProfile');
  return putRequest(route, data);
};

export const changeUserPassword = (
  current_password,
  new_password,
  confirm_new_password
) => {
  const data = { current_password, new_password, confirm_new_password };
  const route = getRoute('changePassword');
  return patchRequest(route, data);
};

export const createPost = (content, image) => {
  const data = new FormData();
  if (content) data.append('content', content);
  if (image) data.append('image', image, image.name);
  const route = getRoute('userPost');
  return postRequest(route, data);
};

export const getUserPosts = (userId) => {
  const route = getRoute('userPost', { id: userId });
  return getRequest(route);
};

export const updateUserProfilePicture = (profile_picture) => {
  const data = new FormData();
  data.append('profile_picture', profile_picture, profile_picture.name);
  const route = getRoute('updateProfileImages');
  return patchRequest(route, data);
};

export const updateUserCoverPicture = (cover_picture) => {
  const data = new FormData();
  data.append('cover_picture', cover_picture, cover_picture.name);
  const route = getRoute('updateProfileImages');
  return patchRequest(route, data);
};

export const userSearch = (searchParams) => {
  const route = getRoute('userSearch', searchParams);
  return getRequest(route);
};
