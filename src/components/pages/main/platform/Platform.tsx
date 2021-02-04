import {
  AccountTypesForTradingStylesSection,
  MobileTradingSection,
  OpenLiveAccountBannerSection,
  OurOfferBannerSection,
  PrestigiousPlatformTechnologySection
} from '@components/sections';
import { Button, LocaleLink, SectionBg, Svg, Tab, Table, Tabs } from '@components/shared';
import { downloadLinks } from '@domain';
import { EPagePath } from '@domain/enums';
import { IPrices } from '@domain/interfaces';
import { IStore, ac_fetchPrices } from '@store';
import { capitalize } from '@utils/fn';
import React, { useEffect } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import './Platform.scss';

export function Platform() {
  const { t } = useTranslation();
  const { prices } = useSelector<IStore, { prices: IPrices }>((state) => ({
    prices: state.data.prices,
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPricesInterval = setInterval(() => {
      dispatch(ac_fetchPrices());
    }, 5000);
    return function () {
      clearInterval(fetchPricesInterval);
    };
  }, []);

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
                  <LocaleLink to={{ pathname: EPagePath.Products, state: { scrollTo: 'currencies' } }}>
                    Currencies
                  </LocaleLink>
                  ,<LocaleLink to={{ pathname: EPagePath.Products, state: { scrollTo: 'stocks' } }}>Stocks</LocaleLink>,
                  <LocaleLink to={{ pathname: EPagePath.Products, state: { scrollTo: 'indices' } }}>Indices</LocaleLink>
                  ,
                  <LocaleLink to={{ pathname: EPagePath.Products, state: { scrollTo: 'commodities' } }}>
                    Commodities
                  </LocaleLink>{' '}
                  <LocaleLink to={{ pathname: EPagePath.Products, state: { scrollTo: 'crypto' } }}>
                    Cryptocurrencies
                  </LocaleLink>{' '}
                  at your service on one trading account. Monitor and trade the world’s largest financial markets!
                </Trans>
              </div>
            </div>
            <div className="col-12 col-lg-9">
              <Tabs>
                {!prices && <div>Prices can't be loaded</div>}
                {prices &&
                  Object.keys(prices)?.map((asset) => {
                    const rowData = Object.keys(prices[asset]).map((item) =>
                      // @ts-ignore
                      Object.values(prices[asset][item].details),
                    );
                    return (
                      <Tab key={asset} label={t(capitalize(asset))} anchor={asset}>
                        <Table
                          key={asset}
                          headers={[t('Instrument'), t('Sell'), t('Buy'), t('Change percent')]}
                          rows={rowData as string[][]}
                          colsPctSize={[30, 20, 20, 20]}
                          preview
                        />
                      </Tab>
                    );
                  })}
              </Tabs>
            </div>
          </div>
        </div>
      </section>
      <OurOfferBannerSection />
      <PrestigiousPlatformTechnologySection />
      <section className="perfect">
        <SectionBg img="perfect-for-eas.jpg" />
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="perfect__title mb-4">{t('Perfect For EAs')}</div>
              <div className="perfect__description mb-13">{t('Automate your trading strategies')}</div>
            </div>
            <div className="col-12 col-lg-8 offset-lg-2 perfect__items">
              <div className="perfect__item pb-7 pb-sm-0">
                <Svg href="pc_install" width={48} className="mb-md-4 mr-5 mr-md-0" />
                {t('Easy to install')}
              </div>
              <div className="perfect__item py-7 py-sm-0">
                <Svg href="bridge" width={48} height={39} className="mb-md-4 mr-5 mr-md-0" />
                {t('No third party bridges')}
              </div>
              <div className="perfect__item pt-7 pt-sm-0">
                <Svg href="time_reverse_clock" width={48} className="mb-md-4 mr-5 mr-md-0" />
                {t('24 5 Trading')}
              </div>
            </div>
          </div>
        </div>
      </section>
      <AccountTypesForTradingStylesSection />
      <OpenLiveAccountBannerSection />
      <MobileTradingSection />
    </div>
  );
}
