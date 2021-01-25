import { EAppSection, EPagePath } from '@domain/enums';
import { IRouteGuard } from '@domain/interfaces';
import { store } from '@store';

export function logoutGuard(): IRouteGuard {
  const previousRoute = store.getState().app.route;

  return {
    path: previousRoute.appSection === EAppSection.portal ? EPagePath.Login : previousRoute.path,
    state: { from: location.pathname },
  };
}
