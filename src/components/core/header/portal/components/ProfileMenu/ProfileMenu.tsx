import { DropDown, Svg } from '@components/shared';
import { profileMenuPortalConfig } from '@domain';
import { MClientProfile, MClientSettings } from '@domain/models';
import { IStore } from '@store';
import classNames from 'classnames';
import React, { createRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './ProfileMenu.scss';
import { EPagePath } from '@domain/enums';

export function ProfileMenu() {
  const { clientProfile, clientSettings } = useSelector<
    IStore,
    { clientProfile: MClientProfile; clientSettings: MClientSettings }
  >((state) => ({
    clientProfile: state.data.client.profile,
    clientSettings: state.data.client.settings,
  }));
  const [hasNotification, setNotification] = useState();
  const [isDropdownMenuOpen, setDropdownMenuOpen] = useState(false);
  const [profileMenu, setProfileMenu] = useState(profileMenuPortalConfig);
  const profileRef = createRef<HTMLDivElement>();
  const facepileRef = createRef<HTMLDivElement>();
  function toggleDropdownMenu() {
    setDropdownMenuOpen(!isDropdownMenuOpen);
  }

  useEffect(() => {
    if (!clientSettings.allow_raf) {
      setProfileMenu(profileMenuPortalConfig.filter((el) => el.path !== EPagePath.Invite));
    }
  }, []);

  return clientProfile ? (
    <div className={classNames('header-profile-menu ml-9 d-lg-flex', isDropdownMenuOpen && 'open')} ref={profileRef}>
      <div
        className={classNames('header-profile-menu__facepile noselect mr-4', hasNotification && 'alert')}
        onClick={toggleDropdownMenu}
        ref={facepileRef}
      >
        {clientProfile.first_name[0]}
        {clientProfile.last_name[0]}
      </div>
      <Svg href="chevron" className="header-profile-menu__chevron" onClick={toggleDropdownMenu} />
      <DropDown
        parentRef={facepileRef}
        items={profileMenu}
        isOpen={isDropdownMenuOpen}
        position="right"
        isOpenDispatcher={setDropdownMenuOpen}
      />
    </div>
  ) : null;
}
