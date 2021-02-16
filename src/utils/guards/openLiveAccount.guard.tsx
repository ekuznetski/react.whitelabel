import { EPagePath } from '@domain/enums';
import { IActivatorProps, IRouteGuard } from '@domain/interfaces';
import { store } from '@store';

export function openLiveAccountGuard({ routeState }: IActivatorProps): IRouteGuard {
  const _allowed = store.getState().data.client?.settings?.allow_additional_live_account;
  return _allowed
    ? _allowed
    : !!routeState?.prev?.path
    ? false
    : {
        path: EPagePath.Dashboard,
        state: { from: location.pathname },
      };
}
