import { IRouteGuard } from '@domain/interfaces';
import { store } from '@store';

export function allowAuthorized(): IRouteGuard {
  const dataState = store.getState().data;
  const isAuthorized = !!dataState.client.profile;
  return (
    isAuthorized || {
      path: '/login',
      state: { from: location.pathname },
    }
  );
}
