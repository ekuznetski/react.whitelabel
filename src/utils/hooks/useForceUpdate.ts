import { useReducer } from 'react';

export function useForceUpdate(): () => void {
  return useReducer(() => ({}), {})[1] as () => void; // <- paste here
}
