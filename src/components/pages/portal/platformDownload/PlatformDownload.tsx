import { PageTitle, Svg } from '@components/shared';
import { ETradingPlatform } from '@domain/enums';
import classNames from 'classnames';
import React, { memo } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import './PlatformDownload.scss';

export const PlatformDownload = memo(function PlatformDownload() {
  const { t } = useTranslation();

  const download_links = {
    [ETradingPlatform.mt4]: {
      windows: '',
      ios: '',
      android: '',
      web_launch: '',
    },
    [ETradingPlatform.mt5]: {
      windows: '',
      ios: '',
      android: '',
      web_launch: '',
    },
  };

  return (
    <Container className="platform-download-page-wrapper">
      <Row>
        <Col xs={12}>
          <PageTitle title="Platform Download" />
        </Col>
      </Row>
      <Row className="download-panels">
        {Object.keys(download_links).map((platform, p) => (
          <Col key={p} lg={6} className="mb-3">
            <div className={classNames('download__panel', platform)}>
              <div className="download__panel-title">
                MetaTrader<span className="ml-1">{platform === ETradingPlatform.mt4 ? 4 : 5}</span>
              </div>
              <div className="download__panel-devices py-10 px-9">
                <div className="device-item mb-11">
                  <div className="device-type mb-5">
                    <Svg href="shrimp" height="24" />
                    {t('Desktop')}
                  </div>
                  <a className="underlined" href="#">
                    <Svg href="shrimp" height="18" />
                    <span>Windows</span>
                  </a>
                </div>
                <div className="device-item mb-11">
                  <div className="device-type mb-5">
                    <Svg href="shrimp" height="24" />
                    {t('Mobile')}
                  </div>
                  <a className="underlined mr-10" href="#">
                    <Svg href="shrimp" height="18" />
                    <span>IOS</span>
                  </a>
                  <a className="underlined" href="#">
                    <Svg href="shrimp" height="18" />
                    <span>Android</span>
                  </a>
                </div>
                <div className="device-item">
                  <div className="device-type mb-5">
                    <Svg href="shrimp" height="24" />
                    {t('Web')}
                  </div>
                  <a className="underlined" href="#">
                    <Svg href="shrimp" height="18" />
                    <span>{t('Launch')}</span>
                  </a>
                </div>
              </div>
              <div className="download__panel-instructions">
                <Svg href="shrimp" height="18" className="mr-5" />
                {t('Read instructions on')}
                <a href="#" className="hovered-underlined ml-2">
                  {t('how to install MetaTrader')} {platform === ETradingPlatform.mt4 ? 4 : 5}
                </a>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
});
