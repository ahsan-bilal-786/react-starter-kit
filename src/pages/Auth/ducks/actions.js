import {
  AUTH_USER,
  SIGNOUT,
  FETCH_USER,
  UPDATE_AUTH_TOKEN,
  UPDATE_AUTH_USER_INFO,
  UPDATE_AUTH_USER_COVER_PICTURE,
  UPDATE_AUTH_USER_PROFILE_PICTURE,
} from 'pages/Auth/ducks/action-types';
import { setUserToken } from 'utils/user';
import {
  authenticateUser,
  registerUser,
  getUserInfo,
  setAuthToken,
  changeUserPassword,
  updateUserProfile,
  updateUserCoverPicture,
  updateUserProfilePicture,
} from 'api';

export function setAuthUser(payload) {
  return { type: AUTH_USER, payload };
}

export function deleteUserInfo() {
  return { type: SIGNOUT };
}

export function fetchAuthUserInfo(payload) {
  return { type: FETCH_USER, payload };
}
export function updateAuthToken(payload) {
  return { type: UPDATE_AUTH_TOKEN, payload };
}

export function updateAuthUserInfo(payload) {
  return { type: UPDATE_AUTH_USER_INFO, payload };
}

export function updateAuthUserCoverPicture(payload) {
  return { type: UPDATE_AUTH_USER_COVER_PICTURE, payload };
}

export function updateAuthUserProfilePicture(payload) {
  return { type: UPDATE_AUTH_USER_PROFILE_PICTURE, payload };
}
export const authenticateUserAction =
  (username, password, remember_me) => (dispatch) => {
    return authenticateUser(username, password, remember_me)
      .then((resp) => {
        if (resp) {
          dispatch(setAuthUser(resp.data));
          setUserToken(resp.data.token, remember_me);
          setAuthToken(resp.data.token);
          return true;
        }
        return Promise.reject(resp);
      })
      .catch((e) => {
        return Promise.reject(e);
      });
  };

export const registerUserAction =
  (
    email,
    password,
    confirm_password,
    first_name,
    last_name,
    gender,
    birthday
  ) =>
  (dispatch) => {
    return registerUser(
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
          dispatch(setAuthUser(resp.data));
          setUserToken(resp.data.token);
          setAuthToken(resp.data.token);
          return true;
        }
        return Promise.reject(resp);
      })
      .catch((e) => {
        return Promise.reject(e);
      });
  };

export const updateAuthUserInfoAction = (updatedInfo) => (dispatch) => {
  return updateUserProfile(updatedInfo)
    .then((resp) => {
      if (resp) {
        dispatch(updateAuthUserInfo(resp.data));
        return true;
      }
      return Promise.reject(resp);
    })
    .catch((e) => {
      return Promise.reject(e);
    });
};

export const fetchUserInfoAction = (userId) => (dispatch) => {
  return getUserInfo()
    .then((resp) => {
      if (resp) {
        dispatch(fetchAuthUserInfo(resp));
        return true;
      }
      return Promise.reject(resp);
    })
    .catch((e) => {
      return Promise.reject(e);
    });
};

export const updateUserPasswordAction =
  (current_password, new_password, confirm_new_password) => (dispatch) => {
    return changeUserPassword(
      current_password,
      new_password,
      confirm_new_password
    )
      .then((resp) => {
        if (resp) {
          dispatch(updateAuthToken(resp.data));
          setUserToken(resp.data.token);
          setAuthToken(resp.data.token);
          return true;
        }
        return Promise.reject(resp);
      })
      .catch((e) => {
        return Promise.reject(e);
      });
  };

export const updateUserCoverPictureAction = (cover_picture) => (dispatch) => {
  return updateUserCoverPicture(cover_picture)
    .then((resp) => {
      if (resp) {
        dispatch(updateAuthUserCoverPicture(resp.data));
        return true;
      }
      return Promise.reject(resp);
    })
    .catch((e) => {
      return Promise.reject(e);
    });
};

export const updateUserProfilePictureAction = (cover_picture) => (dispatch) => {
  return updateUserProfilePicture(cover_picture)
    .then((resp) => {
      if (resp) {
        dispatch(updateAuthUserProfilePicture(resp.data));
        return true;
      }
      return Promise.reject(resp);
    })
    .catch((e) => {
      return Promise.reject(e);
    });
};
