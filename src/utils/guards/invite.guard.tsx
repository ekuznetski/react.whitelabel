import { ECookieTypes, EPagePath } from '@domain/enums';
import { IRouteGuard } from '@domain/interfaces';
import { saveCookie } from '@utils/services';

export function inviteGuard(): IRouteGuard {
  const raf_id = window.location.href.split('/').pop() || '';
  saveCookie(ECookieTypes.raf_id, raf_id, 'Session', '/');

  return {
    path: EPagePath.Home,
    state: { from: location.pathname },
  };
}
