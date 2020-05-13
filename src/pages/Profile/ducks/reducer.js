import { SET_PROFILE } from 'pages/Emails/actions/action-types';

const initialState = {
  profile: {},
};

function profileReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PROFILE:
      state = { ...state, profile: action.profile };
      break;
    default:
  }
  return state;
}

export default profileReducer;
