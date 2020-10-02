import { IStore } from '@store';
import { useStore } from 'react-redux';
import { useLocation } from 'react-router-dom';

export function usePathLocale() {
  const { pathname } = useLocation();
  const store = useStore<IStore>();
  const locale = store.getState().app.route.locale;

  return {
    localizePath: (path: string) => {
      return `${locale && locale.length ? '/' + locale : ''}${path.replace(/^\\?(S+)/, '/$1')}`;
    },
    delocalizePath: (_pathname?: string) => {
      return (_pathname || pathname).replace(new RegExp(`/${locale}`), '').replace(/^\/$/, '');
    },
  };
}
