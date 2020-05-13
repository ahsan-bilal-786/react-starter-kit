import axios from 'axios';
import getRoute from 'api/routes';
import { AppRoutes } from 'routes';

export const setAuthToken = (token) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
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

export const registerUser = (email, password, firstName, lastName) => {
  const data = { email, password, firstName, lastName };
  const route = getRoute('registerUser');
  return postRequest(route, data);
};

export const authenticateUser = (email, password) => {
  const data = { email, password };
  const route = getRoute('login');
  return postRequest(route, data);
};

export const getUserInfo = (userId) => {
  const route = getRoute('userProfile', { userId });
  return getRequest(route);
};

export const updateProfile = (userId, email, password, firstName, lastName) => {
  const data = { email, password, firstName, lastName };
  const route = getRoute('userProfile', { userId });
  return putRequest(route, data);
};
