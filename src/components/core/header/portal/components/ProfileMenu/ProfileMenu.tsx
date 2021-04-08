import { DropDown, Svg } from '@components/shared';
import { MClientProfile, MClientSettings } from '@domain/models';
import { IStore } from '@store';
import { portalProfileMenu } from '@utils/fn/portalProfileMenu';
import classNames from 'classnames';
import React, { createRef, useState } from 'react';
import { useSelector } from 'react-redux';
import './ProfileMenu.scss';

export function ProfileMenu(props: { className?: string }) {
  const { clientProfile, clientSettings } = useSelector<
    IStore,
    { clientProfile: MClientProfile; clientSettings: MClientSettings }
  >((state) => ({
    clientProfile: state.data.client.profile,
    clientSettings: state.data.client.settings,
  }));
  const [hasNotification, setNotification] = useState();
  const [isDropdownMenuOpen, setDropdownMenuOpen] = useState(false);
  const profileRef = createRef<HTMLDivElement>();
  const facepileRef = createRef<HTMLDivElement>();
  function toggleDropdownMenu() {
    setDropdownMenuOpen(!isDropdownMenuOpen);
  }

  return clientProfile ? (
    <div
      className={(classNames('header-profile-menu ml-9 d-lg-flex', isDropdownMenuOpen && 'open'), props.className)}
      ref={profileRef}
    >
      <div
        className={classNames('header-profile-menu__facepile noselect mr-4', hasNotification && 'alert')}
        onClick={toggleDropdownMenu}
        ref={facepileRef}
      >
        {clientProfile.initials}
      </div>
      <Svg href="chevron" className="header-profile-menu__chevron" onClick={toggleDropdownMenu} />
      <DropDown
        parentRef={facepileRef}
        items={portalProfileMenu()}
        isOpen={isDropdownMenuOpen}
        position="right"
        isOpenDispatcher={setDropdownMenuOpen}
      />
    </div>
  ) : null;
}
