import { useEffect } from 'react';

export interface Options {
  /* Specifies a name for the metadata */
  name?: 'application-name' | 'author' | 'description' | 'generator' | 'keywords' | 'viewport';
  /* Specifies the character encoding for the HTML document */
  charset?: string;
  /* Provides an HTTP header for the information/value of the content attribute */
  httpEquiv?: 'content-security-policy' | 'content-type' | 'default-style' | 'refresh';
  /* Turn your web pages into graph objects */
  ogTag?: 'title' | 'url' | 'image' | 'type' | 'description' | 'locale';
  content: string;
}

export const useMeta =
  typeof document !== 'undefined'
    ? function useMeta(options: Options | Options[]) {
        let links: HTMLMetaElement[] = [];

        useEffect(() => {
          options = [].concat.apply([], [options as []]);

          options.forEach((opt) => {
            var link = document.createElement('meta');
            if (opt.name) link.setAttribute('name', opt.name);
            if (opt.ogTag) link.setAttribute('property', 'og:' + opt.ogTag);
            link.content = opt.content;

            document.getElementsByTagName('head')[0].appendChild(link);
            links.push(link);
          });

          return () => links.forEach((linkNode) => linkNode?.parentNode?.removeChild(linkNode));
        }, []);
      }
    : () => {};

export default useMeta;
