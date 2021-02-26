import {
  AccountTypesForTradingStylesSection,
  MobileTradingSection,
  OpenLiveAccountBannerSection,
  PlatformTechnologySection,
  SimpleToGetStartedSection,
} from '@components/sections';
import { config } from '@pages/main/home';
import { StockPricesSection, TopSection, TradeProductsSection } from '@pages/main/home/components';
import React from 'react';
import './Home.scss';

export function Home() {
  return (
    <div className="home-wrapper">
      <TopSection />
      <StockPricesSection />
      <PlatformTechnologySection {...config.platformTechnologySection} />
      <MobileTradingSection className="pt-0" {...config.mobileTradingSection} />
      <AccountTypesForTradingStylesSection />
      <OpenLiveAccountBannerSection />
      <TradeProductsSection />
      <SimpleToGetStartedSection />
    </div>
  );
}
