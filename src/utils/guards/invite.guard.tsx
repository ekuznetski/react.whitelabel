import { EMarketingCookies, EPagePath } from '@domain/enums';
import { IRouteGuard } from '@domain/interfaces';
import { store } from '@store';
import { saveCookie } from '@utils/services';

export function inviteGuard(): IRouteGuard {
  const expireDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1));

  const raf_id = location.pathname.replace(new RegExp(`.*\/invite\/?`), '');
  if (raf_id) {
    saveCookie(EMarketingCookies.raf_id, raf_id, expireDate);
  }

  return {
    path: EPagePath.Home,
    state: { from: location.pathname },
  };
}
