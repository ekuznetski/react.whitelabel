import { Button, LocaleLink, Svg } from '@components/shared';
import { ProfileMenu } from '@core/header/portal/components';
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
          <Button className="sign-in-btn" noBg>
            <LocaleLink to={EPagePath.Login}>
              <Svg href="key" />
              {t('Login')}
            </LocaleLink>
          </Button>
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
