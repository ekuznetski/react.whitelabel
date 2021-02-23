import { Button, Img, LabelView, LocaleLink, SectionBg, Svg } from '@components/shared';
import { ELabels, EPagePath } from '@domain/enums';
import { locale } from '@pages/main/about';
import React, { memo } from 'react';
import { configResponsive, useResponsive } from 'ahooks';
import { useTranslation } from 'react-i18next';
import './PageTopSection.scss';

configResponsive({
  xs: 375,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
});

export const PageTopSection = memo(function PageTopSection() {
  const { t } = useTranslation();
  const responsive = useResponsive();

  return (
    <section className="about-wrapper__page-top">
      <SectionBg img="about-page-top.jpg" />
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
      {responsive.xs ? (
        <Img src="Who_we_are_Image_Desktop.png" _label={ELabels.uinvex} />
      ) : (
        <Img src="hands.png" _label={ELabels.uinvex} />
      )}
    </section>
  );
});
