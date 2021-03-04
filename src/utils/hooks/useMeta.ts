import { useUnmount } from 'ahooks';
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

const meta_arr: HTMLMetaElement[] = [];

export const useMeta =
  typeof document !== 'undefined'
    ? function useMeta(options: Options | Options[]) {
        function getMeta(metaType: string) {
          const _meta_arr = document.getElementsByTagName('meta');

          for (let i = 0; i < _meta_arr.length; i++) {
            if (
              _meta_arr[i].getAttribute('name') === metaType ||
              _meta_arr[i].getAttribute('property') === 'og:' + metaType
            ) {
              return _meta_arr[i];
            }
          }

          return null;
        }

        useEffect(() => {
          options = [].concat.apply([], [options as []]);

          options.forEach((opt) => {
            const existingMeta = opt.name ? getMeta(opt.name) : opt.ogTag ? getMeta('og:' + opt.ogTag) : null;
            const meta = existingMeta || document.createElement('meta');

            if (!existingMeta) {
              if (opt.name) meta.setAttribute('name', opt.name);
              if (opt.ogTag) meta.setAttribute('property', 'og:' + opt.ogTag);
            }
            meta.content = opt.content;

            if (!existingMeta || (existingMeta && meta.content != existingMeta.content)) {
              document.getElementsByTagName('head')[0].appendChild(meta);
              meta_arr.push(meta);
            }
          });
        }, [JSON.stringify(options)]);

        useUnmount(() => {
          meta_arr.forEach((linkNode) => linkNode?.parentNode?.removeChild(linkNode));
        });
      }
    : () => {};

export default useMeta;
