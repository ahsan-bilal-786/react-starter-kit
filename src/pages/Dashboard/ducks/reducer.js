import {
  LOADING_EMAILS,
  SET_EMAIL_FILTERS,
  RESET_FILTERS,
  SET_TERMS,
  SET_EMAILS,
  RESET_EMAILS,
  SET_EMAIL_DETAIL,
  RESET_EMAIL_DETAIL,
  RESET_TERMS,
} from 'pages/Emails/actions/action-types';

const initialState = {
  isLoading: false,
  filters: {
    startDate: '',
    endDate: '',
    term: {},
  },
  terms: {
    next: '',
    results: [],
  },
  count: 0,
  emails: [],
  emailDetail: {},
  nextPageUrl: null,
};

function searchReducer(state = initialState, action) {
  switch (action.type) {
    case LOADING_EMAILS:
      state = { ...state, isLoading: action.payload };
      break;
    case SET_EMAIL_FILTERS:
      state = {
        ...state,
        filters: {
          startDate: action.payload.startDate,
          endDate: action.payload.endDate,
          term: action.payload.term,
        },
      };
      break;
    case RESET_FILTERS:
      state = {
        ...state,
        filters: {
          startDate: initialState.filters.startDate,
          endDate: initialState.filters.endDate,
          term: initialState.filters.term,
        },
      };
      break;
    case SET_TERMS:
      state = { ...state, terms: action.payload };
      break;
    case SET_EMAILS:
      state = {
        ...state,
        count: action.payload.count,
        emails: action.payload.results,
        nextPageUrl: action.payload.next,
      };
      break;
    case RESET_EMAILS:
      state = {
        ...state,
        count: initialState.count,
        emails: initialState.emails,
        nextPageUrl: initialState.nextPageUrl,
      };
      break;
    case SET_EMAIL_DETAIL:
      state = { ...state, emailDetail: action.payload };
      break;
    case RESET_EMAIL_DETAIL:
      state = { ...state, emailDetail: initialState.emailDetail };
      break;
    case RESET_TERMS:
      state = {
        ...state,
        terms: {
          ...state.terms,
          next: initialState.terms.next,
        },
      };
      break;
    default:
  }
  return state;
}

export default searchReducer;
