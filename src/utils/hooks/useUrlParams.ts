import { useLocation } from 'react-router-dom';

export function useUrlParams(): { [key: string]: any } {
  return Object.fromEntries(new URLSearchParams(useLocation().search));
}
