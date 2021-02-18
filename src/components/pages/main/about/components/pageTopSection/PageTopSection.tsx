import { Button, Img, LabelView, LocaleLink, SectionBg, Svg } from '@components/shared';
import { ELabels, EPagePath } from '@domain/enums';
import { locale } from '@pages/main/about';
import React, { memo } from 'react';
import { useResponsive } from 'ahooks';
import { useTranslation } from 'react-i18next';
import './PageTopSection.scss';

export const PageTopSection = memo(function PageTopSection() {
  const { t } = useTranslation();
  const responsive = useResponsive();

  return (
    <section className="about-wrapper__page-top">
      {locale.pageTopBg(responsive)}
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-lg-7 page-top__header">
            <div className="page-top__title mb-7">{locale.pageTopTitle(responsive)}</div>
            <div className="page-top__description mb-9">{locale.pageTopDesc}</div>
            <Button className="page-top__register-btn">
              <LocaleLink to={EPagePath.Registration}>{locale.pageTopRegisterBtn}</LocaleLink>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
});
