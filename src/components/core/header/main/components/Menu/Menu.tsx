import { LocaleNavLink } from '@components/shared';
import { IRouteNavConfig } from '@domain/interfaces';
import React, { memo } from 'react';
import './Menu.scss';

export const Menu = memo(function Menu(props: { routes: IRouteNavConfig[] }) {
  return (
    <div className="header-panel-inline-menu">
      {props.routes.map((route) => (
        <div key={route.path} className="menu__item">
          <LocaleNavLink exact to={route.path}>
            {route.menuItem?.label}
          </LocaleNavLink>
        </div>
      ))}
    </div>
  );
});
