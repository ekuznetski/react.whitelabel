import {
  AccountTypesForTradingStylesSection,
  MobileTradingWithMT5Section,
  OpenLiveAccountBannerSection,
  OurOfferBannerSection,
  PrestigiousPlatformTechnologySection,
} from '@components/sections';
import { Button, ITable, ITabs, SectionBg, Svg, Table, Tabs } from '@components/shared';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './Platform.scss';

export function Platform() {
  const _tempTableData: ITable = {
    headers: ['Instrument', 'Sell', 'Buy', 'Change %'],
    rows: [
      ['Microsoft', '206.24', '206.46', '2.15'],
      ['Microsoft', '206.24', '206.46', '2.15'],
      ['Microsoft', '206.24', '206.46', '2.15'],
      ['Microsoft', '206.24', '206.46', '2.15'],
    ],
  };

  const _tempTabsData: ITabs = {
    labels: [
      { value: 'Forex', anchor: 'forex' },
      { value: 'Indices', anchor: 'indices' },
      { value: 'Stocks', anchor: 'stocks' },
      { value: 'Commodities', anchor: 'commodities' },
      { value: 'Cryptocurrencies', anchor: 'cryptocurrencies' },
    ],
    content: [
      { value: <Table {..._tempTableData} />, anchor: 'forex' },
      { value: <Table {..._tempTableData} />, anchor: 'indices' },
      { value: <Table {..._tempTableData} />, anchor: 'stocks' },
      { value: <Table {..._tempTableData} />, anchor: 'commodities' },
      { value: <Table {..._tempTableData} />, anchor: 'cryptocurrencies' },
    ],
  };

  const { t } = useTranslation();

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
                  <strong>{t('Powered by AroFX')}</strong>
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
              <div className="assets__title mb-7">f</div>
              <div className="assets__description mb-md-13">
                {t('CFDs for desc:0')}
                <Link to={{ pathname: '/products', state: { scrollTo: 'currencies' } }}>{t('Currencies')}</Link>,{' '}
                <Link to={{ pathname: '/products', state: { scrollTo: 'stocks' } }}>{t('Stocks')}</Link>,{' '}
                <Link to={{ pathname: '/products', state: { scrollTo: 'indices' } }}>{t('Indices')}</Link>,{' '}
                <Link to={{ pathname: '/products', state: { scrollTo: 'commodities' } }}>{t('Commodities')}</Link>{' '}
                {t('CFDs for desc:1')}
                <Link to={{ pathname: '/products', state: { scrollTo: 'crypto' } }}>{t('Cryptocurrencies')}</Link>{' '}
                {t('CFDs for desc:2')}
                {t('CFDs for desc:3')}
              </div>
            </div>
            <div className="col-12 col-lg-9">
              <Tabs {..._tempTabsData} />
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
                <Svg href="time_reverse_cloak.svg" width={48} className="mb-md-4 mr-5 mr-md-0" />
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
