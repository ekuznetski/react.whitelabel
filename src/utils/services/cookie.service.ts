import { EMarketingCookies } from '@domain/enums';
import { parseUrl } from '@utils/fn';

export function getCookie(key: string): string | null {
  const keyPosition = document.cookie.indexOf(key + '=');
  if (keyPosition !== -1) {
    return document.cookie.slice(keyPosition).split('=')[1].split('; ')[0];
  }
  return null;
}

export function getMarketingCookies(): { [key: string]: string } {
  return Object.keys(EMarketingCookies).reduce((acc, key) => {
    const keyPosition = document.cookie.indexOf(key + '=');
    if (keyPosition !== -1) {
      return Object.assign(acc, { [key]: document.cookie.slice(keyPosition).split('=')[1].split('; ')[0] });
    }
    return acc;
  }, {});
}

export function saveMarketingCookies(url: string) {
  const params = parseUrl(url);
  Object.keys(params).map(
    (key) =>
      Object.keys(EMarketingCookies).includes(key) && saveCookie(key as EMarketingCookies, JSON.stringify(params[key])),
  );
}

export function saveCookie(
  key: string,
  value: string,
  expires: Date | 'Session' | null = 'Session',
  path: string = '/',
  callback: any = null,
): void {
  document.cookie = `${key}=${value}; path=${path}; expires=${expires}`;
  if (callback) callback();
}
