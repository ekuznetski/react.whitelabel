import { Button, LocaleLink, SectionBg, Svg } from '@components/shared';
import { ELabels, EPagePath } from '@domain/enums';
import { locale } from '@pages/main/about';
import { useResponsive } from 'ahooks';
import React, { memo } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import './PageTopSection.scss';

export const PageTopSection = memo(function PageTopSection() {
  const { t } = useTranslation();
  const responsive = useResponsive();

  return (
    <section className="about-wrapper__page-top">
      <SectionBg
        primary="about-page-top.jpg"
        secondary={{
          xxs: 'about-page-top-xs-mobile.png',
          xs: 'about-page-top-mobile.png',
          md: 'about-page-top-tablet.png',
          lg: 'about-page-top-desktop.png',
        }}
      />
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-lg-7 page-top__header">
            <div className="page-top__title mb-7">
              {responsive.lg ? (
                <>
                  {t('About Us Page Title')}
                  <Svg href="logo" _label={ELabels.uinvex} height={58} />
                </>
              ) : (
                <Trans i18nKey="About Us Page Title Without Logo">
                  Why choose <strong>Uinvex</strong>
                </Trans>
              )}
            </div>
            <div className="page-top__description mb-9">
              <div className="mb-11">{t('About Us Page Desc:0')}</div>
              <Trans i18nKey="About Us Page Desc:1">
                <strong>UINVEX</strong> is dedicated to providing a secure and intuitive trading experience for seasoned
                and new traders alike
              </Trans>
            </div>
            <Button className="page-top__register-btn">
              <LocaleLink to={EPagePath.Registration}>{locale.pageTopRegisterBtn}</LocaleLink>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
});
