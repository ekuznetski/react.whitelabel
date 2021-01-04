import { EPagePath } from '@domain/enums';
import { IRouteGuard } from '@domain/interfaces';

export function logoutGuard(): IRouteGuard {
  return {
    path: EPagePath.Login,
    state: { from: location.pathname },
  };
}
