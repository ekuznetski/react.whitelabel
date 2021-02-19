import { Button, DropDown, LocaleLink, Svg } from '@components/shared';
import { EPagePath } from '@domain/enums';
import { MClientProfile, MClientStatus, MDocuments } from '@domain/models';
import { IStore } from '@store';
import { portalProfileMenu } from '@utils/fn/portalProfileMenu';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { config } from '@pages/portal/dashboard';
import './UserProfileCard.scss';
import classNames from 'classnames';

type IUserProfileCardState = {
  clientProfile: MClientProfile;
  clientStatus: MClientStatus;
  documents: MDocuments;
};

export function UserProfileCard() {
  const { clientProfile, clientStatus, documents } = useSelector<IStore, IUserProfileCardState>((state) => ({
    clientProfile: state.data.client.profile,
    clientStatus: state.data.client.status,
    documents: state.data.client.documents,
  }));
  const [isDropdownMenuOpen, setDropdownMenuOpen] = useState(false);
  const profileNavRef = React.createRef<HTMLDivElement>();
  const { t } = useTranslation();

  function toggleDropdownMenu() {
    setDropdownMenuOpen(!isDropdownMenuOpen);
  }

  function profileStatus() {
    console.log(clientStatus.isNotVerified, documents.isRequired)
    const _status =
      clientStatus.isNotVerified || documents.isRequired
        ? config.profileStatusTemplates.danger
        : clientStatus.isApproved
        ? config.profileStatusTemplates.success
        : config.profileStatusTemplates.warning;

    return (
      <div className={classNames('profile-info__status', _status.status)}>
        <Svg href={_status.icon} height={14} className="mr-1"/> {_status.text}
      </div>
    );
  }

  return (
    <div className="user-profile-card">
      <div className="user-profile-card__context px-7 pt-7 px-sm-11 pt-sm-11">
        <div className="profile-context__facepile mr-7 mr-sm-11">{clientProfile.initials}</div>
        <div className="profile-context__info">
          <div className="profile-info__name">{clientProfile.full_name}</div>
          <div className="profile-info__email mb-1">{clientProfile.email}</div>
          {profileStatus()}
        </div>
      </div>
      <div className="user-profile-card__options px-7 px-sm-11">
        <div className="profile-options__deposit">
          <Button className="px-3">
            <LocaleLink to={EPagePath.Deposit}>
              {t('Add Deposit')}
              <Svg href="coins" className="ml-4" />
            </LocaleLink>
          </Button>
        </div>
        <div className="profile-options__nav ml-auto" ref={profileNavRef}>
          <Button className={isDropdownMenuOpen ? 'active' : ''} onClick={toggleDropdownMenu}>
            <Svg href="gear" />
          </Button>
          <DropDown
            parentRef={profileNavRef}
            position="right"
            items={portalProfileMenu()}
            isOpen={isDropdownMenuOpen}
            isOpenDispatcher={setDropdownMenuOpen}
          />
        </div>
      </div>
    </div>
  );
}
