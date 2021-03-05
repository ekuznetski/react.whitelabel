import { LocaleNavLink, Svg } from '@components/shared';
import { MClientProfile } from '@domain/models';
import { IAppStore, IStore } from '@store';
import { portalProfileMenu } from '@utils/fn/portalProfileMenu';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './BurgerProfile.scss';

type IBurgerProfile = {
  activeSubMenu: number;
  closeSubMenu: () => void;
};

export function BurgerProfile({ activeSubMenu, closeSubMenu }: IBurgerProfile) {
  const { clientProfile, route } = useSelector<IStore, { clientProfile: MClientProfile, route: IAppStore['route'] }>((state) => ({
    clientProfile: state.data.client.profile,
    route: state.app.route,
  }));
  const [isDropdownMenuOpen, setDropdownMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(-1);

  useEffect(() => {
    if (activeSubMenu !== -1) {
      setDropdownMenuOpen(false);
    }
  }, [activeSubMenu]);

  useEffect(() => {
    const _activeMenu = portalProfileMenu().find((item) =>
      item.path
        ? item.path === route.path
        : false
    );

    if (_activeMenu) {
      setActiveMenu(portalProfileMenu().indexOf(_activeMenu));
    }
  }, [route.path]);

  function toggleDropdownMenu() {
    setDropdownMenuOpen(!isDropdownMenuOpen);
    if (!isDropdownMenuOpen) {
      closeSubMenu();
    }
  }

  return (
    <div className={classNames('burger-profile mb-7', !isDropdownMenuOpen && 'closed')}>
      <div className="burger-profile__info px-6 py-5" onClick={toggleDropdownMenu}>
        <div className="burger-profile__info__facepile mr-4">{clientProfile.initials}</div>
        <span className="burger-profile__info__full-name">{clientProfile.full_name}</span>
        <Svg href="chevron" width={13} className="burger-profile__info__chevron ml-auto" />
      </div>
      <div className="burger-profile__sub-menu" style={{ height: portalProfileMenu().length * 50 }}>
        {portalProfileMenu().map((menuItem, index) => (
          <div key={index} className={classNames("burger-profile__sub-menu__item ml-8", index === activeMenu && 'burger-profile__sub-menu__item--active')}>
            <LocaleNavLink exact to={menuItem.path}>
              {menuItem.icon?.length && <Svg href={menuItem.icon} height={20} className="mr-4" />}
              {menuItem.title}
            </LocaleNavLink>
          </div>
        ))}
      </div>
    </div>
  );
}
