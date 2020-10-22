import { IAppStore, IStore } from '@store';
import React, { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, LinkProps } from 'react-router-dom';

type ILocaleLink = {
  children: React.ReactNode;
  onClick?: (...args: any[]) => void;
} & LinkProps;

export const LocaleLink = memo(function LocaleLink(props: ILocaleLink) {
  const { locale } = useSelector<IStore, Partial<IAppStore['route']>>((state) => ({
    locale: state.app.route.locale,
  }));
  const _to =
    typeof props.to === 'string'
      ? formatPath(props.to)
      : {
          // @ts-ignore
          ...props.to,
          // @ts-ignore
          pathname: formatPath(props.to.pathname),
        };
  const navProps = { ...props };
  delete navProps.children;

  function formatPath(path: string) {
    return `${locale && locale.length ? '/' + locale : ''}${path.replace(/^\\?(S+)/, '/$1')}`;
  }

  useEffect(() => {
    props?.onClick?.();
  }, []);

  return (
    <Link {...navProps} to={_to}>
      {props.children}
    </Link>
  );
});
