import { Button, DropDown, LocaleNavLink, Svg } from '@components/shared';
import { profileMenuConfig } from '@domain';
import { IClientProfile } from '@domain/interfaces';
import { IStore } from '@store';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import './UserProfileCard.scss';

type IUserProfileCardState = {
  clientProfile: IClientProfile;
};

export function UserProfileCard() {
  const { clientProfile } = useSelector<IStore, IUserProfileCardState>((state) => ({
    clientProfile: state.data.client.profile,
  }));
  const [isDropdownMenuOpen, setDropdownMenuOpen] = useState(false);
  const profileNavRef = React.createRef<HTMLDivElement>();

  function toggleDropdownMenu() {
    setDropdownMenuOpen(!isDropdownMenuOpen);
  }

  const { t } = useTranslation();

  return (
    <div className="user-profile-card">
      <div className="user-profile-card__context px-11 pt-11">
        <div className="profile-context__facepile mr-11">
          {clientProfile.first_name[0]}
          {clientProfile.surname[0]}
        </div>
        <div className="profile-context__info">
          <div className="profile-info__name">
            {clientProfile.first_name} {clientProfile.surname}
          </div>
          <div className="profile-info__email">{clientProfile.email}</div>
          <div className="profile-info__status danger">
            <Svg href="warning.svg" /> {t('Verify your profile')}
          </div>
        </div>
      </div>
      <div className="user-profile-card__options px-11">
        <div className="profile-options__deposit">
          <Button className="px-3">
            <LocaleNavLink exact to="/deposit">
              {t('Add Deposit')}
              <Svg href="coins.svg" className="ml-4" />
            </LocaleNavLink>
          </Button>
        </div>
        <div className="profile-options__nav ml-auto" ref={profileNavRef}>
          <Button className={isDropdownMenuOpen ? 'active' : ''} onClick={toggleDropdownMenu}>
            <Svg href="gear.svg" />
          </Button>
          <DropDown
            parentRef={profileNavRef}
            items={profileMenuConfig}
            isOpen={isDropdownMenuOpen}
            isOpenDispatcher={setDropdownMenuOpen}
          />
        </div>
      </div>
    </div>
  );
}
