import { EMarketingCookies, EPagePath } from '@domain/enums';
import { IRouteGuard } from '@domain/interfaces';
import { store } from '@store';
import { saveCookie } from '@utils/services';

export function inviteGuard(): IRouteGuard {
  const locale = store.getState().app.route.locale;
  const expireDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1));

  const raf_id = location.pathname.replace(new RegExp(`.*\/${locale}\/invite\/?`), '');
  if (raf_id) {
    saveCookie(EMarketingCookies.raf_id, raf_id, expireDate);
  }

  return {
    path: EPagePath.Home,
    state: { from: location.pathname },
  };
}
