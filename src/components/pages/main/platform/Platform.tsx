import {
  AccountTypesForTradingStylesSection,
  MobileTradingSection,
  OpenLiveAccountBannerSection,
  OurOfferBannerSection,
  PlatformTechnologySection,
} from '@components/sections';
import { SectionBg, Svg } from '@components/shared';
import { ac_fetchPrices } from '@store';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { AssetsSection, TopSection } from './components';
import './Platform.scss';

export function Platform() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPricesInterval = setInterval(() => {
      dispatch(ac_fetchPrices());
    }, 5000);

    return () => {
      clearInterval(fetchPricesInterval);
    };
  }, []);

  return (
    <div className="platform-wrapper">
      <TopSection />
      <AssetsSection />
      <OurOfferBannerSection />
      <PlatformTechnologySection />
      <section className="perfect">
        <SectionBg primary="perfect-for-eas.jpg" />
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
