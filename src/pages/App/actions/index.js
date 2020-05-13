import { SHOW_LOADING } from 'pages/App/actions/action-types';

export function showLoading(payload) {
  return { type: SHOW_LOADING, payload };
}
