import { Button, LocaleLink } from '@components/shared';
import { ProfileMenu } from '@core/header/main/components';
import { EPagePath } from '@domain/enums';
import { IDataStore, IStore } from '@store';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import './Auth.scss';

export const Auth = memo(function Auth() {
  const { clientProfile } = useSelector<IStore, { clientProfile: IDataStore['client']['profile'] }>((state) => ({
    clientProfile: state.data.client.profile,
  }));
  const { t } = useTranslation();

  return (
    <div className="header-panel-auth ml-auto">
      {!clientProfile ? (
        <>
          <LocaleLink to={EPagePath.Login} className="sign-in-btn">
            {t('Sign In')}
          </LocaleLink>
          <Button className="open-account-btn">
            <LocaleLink to={EPagePath.Registration}>{t('Open An Account')}</LocaleLink>
          </Button>
        </>
      ) : (
        <ProfileMenu />
      )}
    </div>
  );
});
