export function parseUrl(url: string): { [key: string]: string } {
  return url
    .replace('?', '')
    .split('&')
    .reduce((acc, param) => {
      const key = param.split('=')[0];
      const value = param.split('=')[1];
      return Object.assign(acc, { [key]: value });
    }, {});
}
