import { Button, LocaleLink, SectionBg } from '@components/shared';
import React, { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { IDataStore, IStore, ac_fetchProfile, ac_updateRouteParams } from '@store';
import './404.scss';
import { useDispatch, useSelector } from 'react-redux';

export const NotFound = memo(function NotFoundPage() {
  const { clientProfile } = useSelector<IStore, { clientProfile: IDataStore['client']['profile'] }>((state) => ({
    clientProfile: state.data.client.profile,
  }));
  const { t } = useTranslation();

  return (
    <section className="notFoundPage">
      <div className="container align-self-center">
        <div className="row">
          <div className=" m-auto col-12 notFoundPage__header">
            <div className="notFoundPage__text-title mb-12">404</div>
            <div className="notFoundPage__text-subTitle mb-7">{t('Not Found')}</div>
            <div className="notFoundPage__text-description mb-9">{t('Not Found Page desc')}</div>
            <div className="notFoundPage-btns">
              <Button>
                <LocaleLink to="">{t('Go to Home Page')}</LocaleLink>
              </Button>
              {!!clientProfile && (
                <Button>
                  <LocaleLink to="/dashboard">{t('Go to Dashboard')}</LocaleLink>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
