import {
  AccountTypesForTradingStylesSection,
  MobileTradingSection,
  OpenLiveAccountBannerSection,
  OurOfferBannerSection,
  PlatformTechnologySection,
} from '@components/sections';
import { ac_fetchPrices } from '@store';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { AssetsSection, PerfectSection, TopSection } from './components';
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
      <PerfectSection />
      <AccountTypesForTradingStylesSection />
      <OpenLiveAccountBannerSection />
      <MobileTradingSection />
    </div>
  );
}
