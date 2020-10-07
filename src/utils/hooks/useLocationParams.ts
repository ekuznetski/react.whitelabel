import { useLocation } from 'react-router-dom';

export function useLocationParams() {
  const { search } = useLocation();
  const urlParams = new URLSearchParams(search.slice(1));
  const params = Object.fromEntries(urlParams.entries());

  return params;
}
