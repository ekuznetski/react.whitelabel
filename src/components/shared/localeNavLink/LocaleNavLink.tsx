import { IStore, IAppStore } from '@store';
import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, NavLinkProps } from 'react-router-dom';

type ILocaleNavLink = {
  children: React.ReactNode;
  to: string;
} & NavLinkProps;

export const LocaleNavLink = memo(function LocaleNavLink(props: ILocaleNavLink) {
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

  return (
    <NavLink {...navProps} to={_to}>
      {props.children}
    </NavLink>
  );
});
