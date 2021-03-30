import { Button, LocaleLink, SectionBg, Svg } from '@components/shared';
import { ELabels, EPagePath } from '@domain/enums';
import { useResponsive } from 'ahooks';
import classNames from 'classnames';
import React, { forwardRef, memo } from 'react';
import { Col, Container, Row } from '@components/shared';
import { useTranslation } from 'react-i18next';
import { locale } from './';
import './OpenLiveAccountBanner.scss';

interface IOpenLiveAccountBannerSection {
  title?: string;
  desc?: string;
  secondaryTitle?: string;
  secondaryDesc?: string;
}

export const OpenLiveAccountBannerSection = memo(
  forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & IOpenLiveAccountBannerSection>(
    function OpenLiveAccountBannerSection(props, ref) {
      const { t } = useTranslation();
      const responsive = useResponsive();

      return (
        <section className={classNames('open-live-account-banner', props.className)} ref={ref}>
          <SectionBg primary="live-account-bg.jpg" />
          <Container>
            <Row className="open-live-account-banner__row">
              <Col className="open-live-account-banner__column">
                <div className="open-live-account-banner__title">
                  {props.title || locale.openLiveAccountBannerTitle}
                </div>
                <div className="open-live-account-banner__description">{props.desc || t('Banner Section Desc')}</div>
              </Col>
              <Col className="open-account">
                <div className="open-live-account-banner__title">
                  <Svg href="logo" _label={ELabels.uinvex} height={responsive.lg ? 64 : 50} />
                  {props.secondaryTitle || t('Live Account')}
                </div>
                <div className="open-live-account-banner__description">
                  {props.secondaryDesc || t('Discover Trading Tools')}
                </div>
                <Button>
                  <LocaleLink to={EPagePath.Registration}>{t('Open Live Account')}</LocaleLink>
                </Button>
              </Col>
            </Row>
          </Container>
        </section>
      );
    },
  ),
);
