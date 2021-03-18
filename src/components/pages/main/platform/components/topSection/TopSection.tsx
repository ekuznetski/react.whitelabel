import { Button, SectionBg, Svg } from '@components/shared';
import { downloadLinks } from '@domain';
import React, { memo } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import './TopSection.scss';

export const TopSection = memo(function TopSection() {
  const { t } = useTranslation();

  return (
    <section className="page-top">
      <SectionBg primary="platform-page-top.jpg" />
      <div className="container pt-15">
        <div className="row">
          <div className="col-lg-7">
            <div className="page-top__title mb-7">
              <Trans i18nKey="Platform Page Top Title">
                <div>World-Leading</div>
                <div>MetaTrader Platform</div>
                <div>Powered by AroFX</div>
              </Trans>
            </div>
            <div className="col-12 col-lg-9 col-xl-8 download-buttons row">
              <Button className="desktop-button mr-6 px-7">
                <a href={downloadLinks.mt5.desktop}>{t('Download Desktop Version')}</a>
              </Button>
              <Button className="mr-6 px-7 store-link">
                <a href={downloadLinks.mt5.appStore}>
                  <Svg href="app_store_logo" />
                </a>
              </Button>
              <Button className="px-7 store-link">
                <a href={downloadLinks.mt5.googlePlay}>
                  <Svg href="google_play_logo" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
