import { LocaleNavLink, Svg } from '@components/shared';
import { MClientProfile } from '@domain/models';
import { IStore } from '@store';
import { portalProfileMenu } from '@utils/fn/portalProfileMenu';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './ProfileMenuMobile.scss';

type IProfileMenuMobile = {
  activeSubMenu: number;
  closeSubMenu: () => void;
};

export function ProfileMenuMobile({ activeSubMenu, closeSubMenu }: IProfileMenuMobile) {
  const { clientProfile } = useSelector<IStore, { clientProfile: MClientProfile }>((state) => ({
    clientProfile: state.data.client.profile,
  }));
  const [isDropdownMenuOpen, setDropdownMenuOpen] = useState(false);

  useEffect(() => {
    if (activeSubMenu !== -1) {
      setDropdownMenuOpen(false);
    }
  }, [activeSubMenu]);

  function toggleDropdownMenu() {
    setDropdownMenuOpen(!isDropdownMenuOpen);
    if (!isDropdownMenuOpen) {
      closeSubMenu();
    }
  }

  return (
    <div className={classNames('burger-profile-menu mt-7')}>
      <div className="burger-profile-menu__info" onClick={toggleDropdownMenu}>
        <div className="burger-profile-menu__info__facepile mr-4">{clientProfile.initials}</div>
        <span className="burger-profile-menu__info__full-name">{clientProfile.full_name}</span>
      </div>
      <div
        className={classNames('burger-profile-menu__sub-menu', !isDropdownMenuOpen && 'closed')}
        style={{ height: portalProfileMenu().length * 50 }}
      >
        {portalProfileMenu().map((menuItem, index) => (
          <div key={index} className="burger-profile-menu__sub-menu__item ml-6">
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
