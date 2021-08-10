import {
  FETCH_USER_POSTS,
  ADD_USER_POST,
} from 'pages/Profile/ducks/action-types';

const initialState = { posts: null };

function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_USER_POSTS:
      state = {
        ...state,
        posts: action.payload,
      };
      break;
    case ADD_USER_POST:
      state = {
        ...state,
        posts: [action.payload, ...state.posts],
      };
      break;
    default:
  }
  return state;
}

export default reducer;
