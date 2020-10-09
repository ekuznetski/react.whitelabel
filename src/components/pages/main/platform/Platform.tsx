import {
  AccountTypesForTradingStylesSection,
  MobileTradingWithMT5Section,
  OpenLiveAccountBannerSection,
  OurOfferBannerSection,
  PrestigiousPlatformTechnologySection,
} from '@components/sections';
import { Button, ITable, LocaleLink, SectionBg, Svg, Tab, Table, Tabs } from '@components/shared';
import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import './Platform.scss';

export function Platform() {
  const { t } = useTranslation();

  const _tempTableData: ITable = {
    headers: [t('Instrument'), t('Sell'), t('Buy'), t('Change percent')],
    rows: [
      ['Microsoft', '206.24', '206.46', '2.15'],
      ['Microsoft', '206.24', '206.46', '2.15'],
      ['Microsoft', '206.24', '206.46', '2.15'],
      ['Microsoft', '206.24', '206.46', '2.15'],
    ],
  };

  return (
    <div className="platform-wrapper">
      <section className="page-top">
        <SectionBg img="platform-page-top.jpg" />
        <div className="container pt-15">
          <div className="row">
            <div className="col-lg-7">
              <div className="page-top__title mb-7">
                <div>{t('World-Leading MetaTrader Platform:0')}</div>
                <div>{t('World-Leading MetaTrader Platform:1')}</div>
                <div>
                  <strong>{t('Platform Page Top Subtitle')}</strong>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-9 col-xl-8 download-buttons">
              <Button className="mr-6 px-7">{t('Download Desktop Version')}</Button>
              <Button className="mr-6 px-7 store-link">
                <Svg href="app_store_logo.svg" />
              </Button>
              <Button className="px-7 store-link">
                <Svg href="google_play_logo.svg" />
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section className="assets">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-9">
              <div className="assets__title mb-7">
                <Trans i18nKey="Assets Title">
                  <strong>6</strong> Asset Classes, <strong>150+</strong> Instruments
                </Trans>
              </div>
              <div className="assets__description mb-md-13">
                <Trans
                  i18nKey="Assets SubTitle"
                  values={{
                    currencies: '$t(Currencies)',
                    stocks: '$t(Stocks)',
                    indices: '$t(Indices)',
                    commodities: '$t(Commodities)',
                    cryptocurrencies: '$t(Cryptocurrencies)',
                  }}
                >
                  CFD for
                  <LocaleLink to={{ pathname: '/products', state: { scrollTo: 'currencies' } }}>Currencies</LocaleLink>,
                  <LocaleLink to={{ pathname: '/products', state: { scrollTo: 'stocks' } }}>Stocks</LocaleLink>,
                  <LocaleLink to={{ pathname: '/products', state: { scrollTo: 'indices' } }}>Indices</LocaleLink>,
                  <LocaleLink to={{ pathname: '/products', state: { scrollTo: 'commodities' } }}>
                    Commodities
                  </LocaleLink>{' '}
                  and
                  <LocaleLink to={{ pathname: '/products', state: { scrollTo: 'crypto' } }}>
                    Cryptocurrencies
                  </LocaleLink>{' '}
                  at your service on one trading account. Monitor and trade the world’s largest financial markets!
                </Trans>
              </div>
            </div>
            <div className="col-12 col-lg-9">
              <Tabs>
                <Tab label="Forex" anchor="forex">
                  <Table {..._tempTableData} />,
                </Tab>
                <Tab label="Indices" anchor="indices">
                  <Table {..._tempTableData} />,
                </Tab>
                <Tab label="Stocks" anchor="stocks">
                  <Table {..._tempTableData} />,
                </Tab>
                <Tab label="Commodities" anchor="commodities">
                  <Table {..._tempTableData} />,
                </Tab>
                <Tab label="Cryptocurrencies" anchor="cryptocurrencies">
                  <Table {..._tempTableData} />,
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </section>
      <OurOfferBannerSection />
      <PrestigiousPlatformTechnologySection />
      <section className="perfect">
        <SectionBg img="perfect-for-eas.png" />
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="perfect__title mb-4">{t('Perfect For EAs')}</div>
              <div className="perfect__description mb-13">{t('Automate your trading strategies')}</div>
            </div>
            <div className="col-12 col-lg-8 offset-lg-2 perfect__items">
              <div className="perfect__item pb-9 py-md-0">
                <Svg href="pc_install.svg" width={48} className="mb-md-4 mr-5 mr-md-0" />
                {t('Easy to install')}
              </div>
              <div className="perfect__item py-9 py-md-0">
                <Svg href="bridge.svg" width={48} className="mb-md-4 mr-5 mr-md-0" />
                {t('No third party bridges')}
              </div>
              <div className="perfect__item pt-9 py-md-0">
                <Svg href="time_reverse_clock.svg" width={48} className="mb-md-4 mr-5 mr-md-0" />
                {t('24 5 Trading')}
              </div>
            </div>
          </div>
        </div>
      </section>
      <AccountTypesForTradingStylesSection />
      <OpenLiveAccountBannerSection />
      <MobileTradingWithMT5Section />
    </div>
  );
}

export default Platform;
