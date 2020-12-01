import { LocaleLink, SectionBg } from '@components/shared';
import { locale } from '@pages/main/about';
import React, { memo } from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import './PageTopSection.scss';

export const PageTopSection = memo(function PageTopSection() {
  const { t } = useTranslation();

  return (
    <section className="about-wrapper__page-top">
      <SectionBg img="about-page-top.jpg" />
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-lg-7 page-top__header">
            <div className="page-top__title mb-7">{t('Who Are We')}</div>
            <div className="page-top__description mb-9">{t('About Us Page Desc')}</div>
            <Button className="page-top__register-btn">
              <LocaleLink to="/registration">{locale.pageTopRegisterBtn}</LocaleLink>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
});
