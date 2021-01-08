import { EMarketingCookies } from '@domain/enums';
import { parseUrl } from '@utils/fn';

export function getCookie(key: EMarketingCookies): string | null {
  const keyPosition = document.cookie.indexOf(key + '=');
  if (keyPosition !== -1) {
    return document.cookie.slice(keyPosition).split('=')[1].split('; ')[0];
  }
  return null;
}

export function getAllMarketingCookies(): { [key: string]: string } {
  return Object.keys(EMarketingCookies).reduce((acc, key) => {
    const keyPosition = document.cookie.indexOf(key + '=');
    if (keyPosition !== -1) {
      return Object.assign(acc, { [key]: document.cookie.slice(keyPosition).split('=')[1].split('; ')[0] });
    }
    return acc;
  }, {});
}

export function saveAllMarketingCookies(url: string) {
  const params = parseUrl(url);
  Object.keys(params).map(
    (key) => Object.keys(EMarketingCookies).includes(key) && saveCookie(key as EMarketingCookies, params[key]),
  );
}

export function saveCookie(
  key: EMarketingCookies,
  value: string,
  expires: Date | 'Session' | null = 'Session',
  path: string = '/',
  callback: any = null,
): void {
  document.cookie = `${key}=${value}; path=${path}; expires=${expires}`;
  if (callback) callback();
}
