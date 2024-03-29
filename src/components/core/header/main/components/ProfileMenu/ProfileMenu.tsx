import { DropDown, Svg } from '@components/shared';
import { profileMenuMainConfig } from '@domain';
import { MClientProfile } from '@domain/models';
import { IStore } from '@store';
import classNames from 'classnames';
import React, { createRef, useState } from 'react';
import { useSelector } from 'react-redux';
import './ProfileMenu.scss';

export function ProfileMenu(props: { className?: string }) {
  const { clientProfile } = useSelector<IStore, { clientProfile: MClientProfile }>((state) => ({
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
    <div
      className={classNames('header-panel-profile-menu ml-9', props.className, isDropdownMenuOpen && 'open')}
      ref={profileRef}
    >
      <div
        className={classNames('header-panel-profile-menu__facepile noselect mr-4', hasNotification && 'alert')}
        onClick={toggleDropdownMenu}
        ref={facepileRef}
      >
        {clientProfile.initials}
      </div>
      <Svg href="chevron" className="header-panel-profile-menu__chevron" onClick={toggleDropdownMenu} />
      <DropDown
        width={180}
        parentRef={facepileRef}
        items={profileMenuMainConfig}
        isOpen={isDropdownMenuOpen}
        position="right"
        isOpenDispatcher={setDropdownMenuOpen}
      />
    </div>
  ) : null;
}
