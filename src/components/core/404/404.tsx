import { Button, LocaleLink, SectionBg } from '@components/shared';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import './404.scss';

export const NotFound = memo(function NotFoundPage() {
  const { t } = useTranslation();

  return (
    <section className="notFoundPage">
      <div className="container align-self-center">
        <div className="row">
          <div className=" m-auto col-md-8 col-lg-7 notFoundPage__header">
            <div className="notFoundPage__text-title mb-12">404</div>
            <div className="notFoundPage__text-subTitle mb-7">{t('Not Found')}</div>
            <div className="notFoundPage__text-description mb-9">{t('Not Found Page desc')}</div>
            <Button className="notFoundPage__register-btn">
              <LocaleLink to="/">{t('Go to Home Page')}</LocaleLink>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
});
