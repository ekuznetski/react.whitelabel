export function getCookie(key: string) {
  const keyPosition = document.cookie.indexOf(key + '=');
  if (keyPosition !== -1) {
    return document.cookie.slice(keyPosition).split('=')[1].split('; ')[0];
  }
  return null;
}

export function saveCookie(
  key: string,
  value: string,
  expires: Date | 'Session',
  path: string = '/',
  callback: any = null,
): void {
  document.cookie = `${key}=${value}; path=${path}; expires=${expires}`;
  if (callback) callback();
}
