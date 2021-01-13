import qs, { ParsedQs } from 'qs';

export function parseUrl(url: string): ParsedQs {
  return qs.parse(url, { ignoreQueryPrefix: true });
}
