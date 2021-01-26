import { EPagePath } from '@domain/enums';
import { IRouteGuard } from '@domain/interfaces';
import { store } from '@store';

export function disallowAuthorizedGuard(): IRouteGuard {
  const dataState = store.getState().data;
  const isAuthorized = !!dataState.client.profile;
  return (
    !isAuthorized || {
      path: EPagePath.Dashboard,
      state: { from: location.pathname },
    }
  );
}
