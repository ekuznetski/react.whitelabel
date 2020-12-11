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

export const useMeta =
  typeof document !== 'undefined'
    ? function useMeta(options: Options | Options[]) {
        let metas: HTMLMetaElement[] = [];

        function getMeta(metaType: string) {
          const metas = document.getElementsByTagName('meta');

          for (let i = 0; i < metas.length; i++) {
            if (metas[i].getAttribute('name') === metaType || metas[i].getAttribute('property') === 'og:' + metaType) {
              return metas[i];
            }
          }

          return null;
        }

        useEffect(() => {
          options = [].concat.apply([], [options as []]);

          options.forEach((opt) => {
            const existingMeta = opt.name ? getMeta(opt.name) : opt.ogTag ? getMeta('og:' + opt.ogTag) : null;
            const meta = existingMeta || document.createElement('meta');
            if (!existingMeta && opt.name) meta.setAttribute('name', opt.name);
            if (!existingMeta && opt.ogTag) meta.setAttribute('property', 'og:' + opt.ogTag);
            meta.content = opt.content;

            document.getElementsByTagName('head')[0].appendChild(meta);
            metas.push(meta);
          });
        }, [options]);

        useUnmount(() => {
          metas.forEach((linkNode) => linkNode?.parentNode?.removeChild(linkNode));
        });
      }
    : () => {};

export default useMeta;
