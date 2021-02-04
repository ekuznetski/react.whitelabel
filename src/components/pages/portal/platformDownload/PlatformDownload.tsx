import { PageTitle, Svg } from '@components/shared';
import { ETradingPlatform } from '@domain/enums';
import { MClientSettings } from '@domain/models';
import { files } from '@domain';
import { IStore } from '@store';
import classNames from 'classnames';
import React, { memo } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { downloadLinks } from '@domain';
import './PlatformDownload.scss';

export const PlatformDownload = memo(function PlatformDownload() {
  const { clientSettings } = useSelector<IStore, { clientSettings: MClientSettings }>((state) => ({
    clientSettings: state.data.client.settings,
  }));
  const { t } = useTranslation();
  return (
    <Container className="platform-download-page-wrapper">
      <Row>
        <Col xs={12}>
          <PageTitle title="Platform Download" />
        </Col>
      </Row>
      <Row className="download-panels">
        {clientSettings.allowed_platforms.map(
          (platform) =>
            downloadLinks[platform] && (
              <Col key={platform} lg={6} className="mb-3">
                <div className={classNames('download__panel', platform)}>
                  <div className="download__panel-title">
                    MetaTrader<span className="ml-1">{platform === ETradingPlatform.mt4 ? 4 : 5}</span>
                  </div>
                  <div className="download__panel-devices py-10 px-9">
                    <div className="device-item mb-11">
                      <div className="device-type mb-5">
                        <Svg href="display" height="24" />
                        {t('Desktop')}
                      </div>
                      <a className="underlined" href={downloadLinks[platform].desktop}>
                        <Svg href="windows" height="18" fill="grey" />
                        <span>Windows</span>
                      </a>
                    </div>
                    <div className="device-item mb-11">
                      <div className="device-type mb-5">
                        <Svg href="mobile" height="24" />
                        {t('Mobile')}
                      </div>
                      <a className="underlined mr-10" href={downloadLinks[platform].appStore}>
                        <Svg href="apple" height="18" fill="grey" />
                        <span>IOS</span>
                      </a>
                      <a className="underlined" href={downloadLinks[platform].googlePlay}>
                        <Svg href="android" height="18" fill="grey" />
                        <span>Android</span>
                      </a>
                    </div>
                    <div className="device-item">
                      <div className="device-type mb-5">
                        <Svg href="browser" height="24" />
                        {t('Web')}
                      </div>
                      <a className="underlined" target="_blank" href={downloadLinks[platform].web}>
                        <Svg href="globe" height="18" fill="grey" />
                        <span>{t('Launch')}</span>
                      </a>
                    </div>
                  </div>
                  <div className="download__panel-instructions">
                    <Svg href="tools" height="18" className="mr-5" />
                    {t('Read instructions on')}
                    <a
                      href={files[`installInstructions${platform.toUpperCase()}` as keyof typeof files]}
                      className="hovered-underlined ml-2"
                      target="_blank"
                    >
                      {t('how to install MetaTrader')} {platform === ETradingPlatform.mt4 ? 4 : 5}
                    </a>
                  </div>
                </div>
              </Col>
            ),
        )}
      </Row>
    </Container>
  );
});
