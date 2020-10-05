import { IRouteGuard } from '@domain/interfaces';

export function logoutGuard(): IRouteGuard {
  return {
    path: '/login',
    state: { from: location.pathname },
  };
}
