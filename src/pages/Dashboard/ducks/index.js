import concat from 'lodash/concat';
import {
  RESET_TERMS,
  SET_EMAIL_FILTERS,
  RESET_FILTERS,
  LOADING_EMAILS,
  SET_EMAILS,
  SET_TERMS,
  SET_EMAIL_DETAIL,
  RESET_EMAILS,
  RESET_EMAIL_DETAIL,
} from 'pages/Emails/actions/action-types';
import { showLoading } from 'pages/App/actions';
import API from 'api';

export function setTerms(payload) {
  return { type: SET_TERMS, payload };
}

export function resetTerms() {
  return { type: RESET_TERMS };
}

export function setFilters(payload) {
  return { type: SET_EMAIL_FILTERS, payload };
}

export function resetFilters() {
  return { type: RESET_FILTERS };
}

export function loadingEmails(payload) {
  return { type: LOADING_EMAILS, payload };
}

export function setEmails(payload) {
  return { type: SET_EMAILS, payload };
}

export function resetEmails() {
  return { type: RESET_EMAILS };
}

export function setEmailById(payload) {
  return { type: SET_EMAIL_DETAIL, payload };
}

export function resetEmailDetail() {
  return { type: RESET_EMAIL_DETAIL };
}

export const setFiltersAction = (term, startDate, endDate) => (dispatch) => {
  dispatch(setFilters({ term, startDate, endDate }));
};

export const resetFiltersAction = () => (dispatch) => {
  dispatch(resetFilters());
};

export const resetEmailsData = () => (dispatch) => {
  dispatch(resetEmails());
  dispatch(resetEmailDetail());
};

export const fetchTerms = (pos = []) => (dispatch) => {
  const postAction = (payload) => {
    dispatch(setTerms(payload));
  };
  return API.getTerms(postAction, pos);
};

export const fetchEmailById = (emailId) => (dispatch) => {
  dispatch(showLoading(true));
  dispatch(resetEmailDetail());
  const postAction = (payload) => {
    dispatch(showLoading(false));
    dispatch(setEmailById(payload));
  };
  return API.getEmailById(postAction, emailId);
};

export const fetchEmails = (startDate = '', endDate = '', termId = '') => (
  dispatch,
  getState
) => {
  const { nextPageUrl, emails, isLoading } = getState().analytics;
  if (((!nextPageUrl && emails.length === 0) || nextPageUrl) && !isLoading) {
    dispatch(loadingEmails(true));
    const postAction = (payload) => {
      if (emails.length > 0) {
        payload.results = concat(emails, payload.results);
      }
      dispatch(setEmails(payload));
      dispatch(loadingEmails(false));
    };
    return API.getEmails(postAction, nextPageUrl, startDate, endDate, termId);
  }
};

export const resetTermsData = () => (dispatch) => {
  dispatch(resetTerms());
};
