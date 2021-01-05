import { ECookieTypes } from '@domain/enums';

export function getCookie(key: ECookieTypes) {
  const keyPosition = document.cookie.indexOf(key + '=');
  if (keyPosition !== -1) {
    return document.cookie.slice(keyPosition).split('=')[1].split('; ')[0];
  }
  return null;
}

export function getCookies() {
  return Object.keys(ECookieTypes).reduce((acc, key) => {
    const keyPosition = document.cookie.indexOf(key + '=');
    if (keyPosition !== -1) {
      return Object.assign(acc, { [key]: document.cookie.slice(keyPosition).split('=')[1].split('; ')[0] });
    }
    return acc;
  }, {});
}

export function saveCookie(
  key: ECookieTypes,
  value: string,
  expires: Date | 'Session',
  path: string = '/',
  callback: any = null,
): void {
  document.cookie = `${key}=${value}; path=${path}; expires=${expires}`;
  if (callback) callback();
}
