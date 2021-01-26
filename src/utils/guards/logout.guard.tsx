import { EAppSection, EPagePath } from '@domain/enums';
import { IActivatorProps, IRouteGuard } from '@domain/interfaces';

export function logoutGuard({ routeState }: IActivatorProps): IRouteGuard {
  return {
    path:
      routeState?.prev?.appSection !== EAppSection.portal ? routeState?.prev?.path ?? EPagePath.Login : EPagePath.Login,
    state: { from: location.pathname },
  };
}
