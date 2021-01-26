import { EPagePath } from '@domain/enums';
import { IRouteGuard } from '@domain/interfaces';
import { store } from '@store';

export function allowAuthorizedGuard(): IRouteGuard {
  const dataState = store.getState().data;
  const isAuthorized = !!dataState.client.profile;

  return (
    isAuthorized || {
      path: EPagePath.Login,
      state: { from: location.pathname },
    }
  );
}
