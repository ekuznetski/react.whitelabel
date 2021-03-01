import { Button, DropDown, LocaleLink, Svg } from '@components/shared';
import { EClientStatusCode, EDocumentsType, EPagePath } from '@domain/enums';
import { MClientProfile, MClientStatus, MDocuments } from '@domain/models';
import { config } from '@pages/portal/dashboard';
import { IStore } from '@store';
import { portalProfileMenu } from '@utils/fn/portalProfileMenu';
import { useResponsive } from 'ahooks';
import classNames from 'classnames';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { PolarAngleAxis, RadialBar, RadialBarChart } from 'recharts';
import './UserProfileCard.scss';

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
  const responsive = useResponsive();
  const { t } = useTranslation();

  const circleSize = responsive.lg ? 85 : 75,
    borderWidth = 4;

  function toggleDropdownMenu() {
    setDropdownMenuOpen(!isDropdownMenuOpen);
  }

  function profileStatus() {
    const _status =
      clientStatus.isNotVerified || documents.isRequired
        ? config.profileStatusTemplates.danger
        : clientStatus.isApproved
        ? config.profileStatusTemplates.success
        : config.profileStatusTemplates.warning;
    const _statusText = (
      <>
        <Svg href={_status.icon} height={14} className="mr-1" /> {_status.text}
      </>
    );

    return (
      <div className={classNames('profile-info__status', _status.status)}>
        {_status.url ? <LocaleLink to={_status.url}>{_statusText}</LocaleLink> : _statusText}
      </div>
    );
  }

  function profileProgress() {
    const steps = [
        clientStatus.fp_status.code === EClientStatusCode.required,
        clientStatus.edd_status.code === EClientStatusCode.required,
        clientStatus.tins_status.code === EClientStatusCode.required,
        clientStatus.dual_status.code === EClientStatusCode.required,
        documents.getDocumentByType(EDocumentsType.ID).code === EClientStatusCode.notSubmitted,
        documents.getDocumentByType(EDocumentsType.PoR).code === EClientStatusCode.notSubmitted,
        documents.getDocumentByType(EDocumentsType.CCCopy1).code === EClientStatusCode.notSubmitted,
      ],
      tick = 100 / steps.length;

    return steps.reduce((acc, val) => (acc += !val ? tick : 0), 0);
  }

  return (
    <div className="user-profile-card">
      <div className="user-profile-card__context px-7 pt-7 px-sm-11 pt-sm-11">
        <div className="profile-context__facepile mr-7 mr-sm-10">
          <RadialBarChart
            width={circleSize}
            height={circleSize}
            innerRadius={circleSize / 2 - borderWidth}
            outerRadius={circleSize / 2}
            data={[{ value: profileProgress() }]}
            startAngle={90}
            endAngle={-270}
          >
            <circle className="bg" cx={circleSize / 2} cy={circleSize / 2} r={circleSize / 2 - borderWidth}></circle>
            <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
            <RadialBar className="progress" background dataKey="value" />
            <text className="text" x={circleSize / 2} y={circleSize / 2} textAnchor="middle" dominantBaseline="middle">
              {clientProfile.initials}
            </text>
          </RadialBarChart>
        </div>
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
