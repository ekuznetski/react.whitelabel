import { EPagePath } from '@domain/enums';
import { IActivatorProps, IRouteGuard } from '@domain/interfaces';

export function logoutGuard({ route, routeState, history }: IActivatorProps): IRouteGuard {
  console.log(route, routeState, history);
  return {
    path: EPagePath.Login,
    state: { from: location.pathname },
  };
}
