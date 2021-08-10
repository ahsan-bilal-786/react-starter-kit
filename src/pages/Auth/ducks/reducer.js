import {
  AUTH_USER,
  FETCH_USER,
  SIGNOUT,
  UPDATE_AUTH_TOKEN,
  UPDATE_AUTH_USER_COVER_PICTURE,
  UPDATE_AUTH_USER_PROFILE_PICTURE,
  UPDATE_AUTH_USER_INFO,
} from 'pages/Auth/ducks/action-types';

const initialState = { token: null, user: {}, isAuthenticated: false };

function reducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_USER:
      state = {
        ...state,
        token: action.payload.token,
        isAuthenticated: true,
      };
      break;
    case SIGNOUT:
      state = initialState;
      break;
    case FETCH_USER:
      state = {
        ...state,
        user: action.payload,
      };
      break;
    case UPDATE_AUTH_TOKEN:
      state = {
        ...state,
        token: action.payload.token,
      };
      break;
    case UPDATE_AUTH_USER_INFO:
      state = {
        ...state,
        user: action.payload,
      };
      break;
    case UPDATE_AUTH_USER_COVER_PICTURE:
      state = {
        ...state,
        user: {
          ...state.user,
          profile: {
            ...state.user.profile,
            cover_picture: action.payload.cover_picture,
          },
        },
      };
      break;
    case UPDATE_AUTH_USER_PROFILE_PICTURE:
      state = {
        ...state,
        user: {
          ...state.user,
          profile: {
            ...state.user.profile,
            profile_picture: action.payload.profile_picture,
          },
        },
      };
      break;
    default:
  }
  return state;
}

export default reducer;
