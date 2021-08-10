import { useLocation } from 'react-router';

/***
    Function Gives Access to URLSearchParams
***/
export default function useQuery() {
  return new URLSearchParams(useLocation().search);
}
