import { IRouteGuard } from '@domain/interfaces';
import { store } from '@store';

export function disallowAuthorized(): IRouteGuard {
  const dataState = store.getState().data;
  const isAuthorized = !!dataState.client.profile;
  return (
    !isAuthorized || {
      path: '/dashboard',
      state: { from: location.pathname },
    }
  );
}
