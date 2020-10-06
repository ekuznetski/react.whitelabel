import { DropDown, Svg } from '@components/shared';
import { profileMenuConfig } from '@domain';
import { IClientProfile } from '@domain/interfaces';
import { IStore } from '@store';
import classNames from 'classnames';
import React, { createRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './ProfileMenu.scss';

export function ProfileMenu() {
  const { clientProfile } = useSelector<IStore, { clientProfile: IClientProfile }>((state) => ({
    clientProfile: state.data.client.profile,
  }));
  const [hasNotification, setNotification] = useState();
  const [isDropdownMenuOpen, setDropdownMenuOpen] = useState(false);
  const profileRef = createRef<HTMLDivElement>();
  const facepileRef = createRef<HTMLDivElement>();

  function toggleDropdownMenu() {
    setDropdownMenuOpen(!isDropdownMenuOpen);
  }
  return clientProfile ? (
    <div className={classNames('header-profile-menu ml-9 d-lg-flex', isDropdownMenuOpen && 'open')} ref={profileRef}>
      <div
        className={classNames('header-profile-menu__facepile noselect mr-4', hasNotification && 'alert')}
        onClick={toggleDropdownMenu}
        ref={facepileRef}
      >
        {clientProfile.first_name[0]}
        {clientProfile.surname[0]}
      </div>
      <Svg href="chevron.svg" className="header-profile-menu__chevron" onClick={toggleDropdownMenu} />
      <DropDown
        parentRef={facepileRef}
        items={profileMenuConfig}
        isOpen={isDropdownMenuOpen}
        position="right"
        isOpenDispatcher={setDropdownMenuOpen}
      />
    </div>
  ) : null;
}
