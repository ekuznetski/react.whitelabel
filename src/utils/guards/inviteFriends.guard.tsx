import { EPagePath } from '@domain/enums';
import { IRouteGuard } from '@domain/interfaces';
import { store } from '@store';

export function inviteFriendsGuard(): IRouteGuard {
  const state = store.getState();

  return state.data.client.settings.allow_raf || {
    path: EPagePath.Dashboard,
    state: { from: location.pathname },
  };
}
