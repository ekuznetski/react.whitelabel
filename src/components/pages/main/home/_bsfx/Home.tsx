import {
  AccountTypesForTradingStylesSection,
  MobileTradingSection,
  OpenLiveAccountBannerSection,
  PlatformTechnologySection,
  SimpleToGetStartedSection,
  TakeControlOfTradesSection,
} from '@components/sections';
import { StockPricesSection, TopSection, TradeProductsSection } from '@pages/main/home/components';
import { config } from '@pages/main/home';
import React from 'react';
import './Home.scss';

export function Home() {
  return (
    <div className="home-wrapper">
      <TopSection />
      <StockPricesSection className="p-0" />
      <PlatformTechnologySection {...config.platformTechnologySection} />
      <MobileTradingSection className="pt-0" {...config.mobileTradingSection} />
      <TakeControlOfTradesSection className="py-16" data={config.takeControlItems} />
      <AccountTypesForTradingStylesSection />
      <OpenLiveAccountBannerSection />
      <TradeProductsSection />
      <SimpleToGetStartedSection />
    </div>
  );
}
