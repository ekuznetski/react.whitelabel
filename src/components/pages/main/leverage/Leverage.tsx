import React from 'react';
import { OpenLiveAccountBannerSection } from '@components/sections';
import { LeverageRatiosSection, LeverageTopSection } from './components';
import { locale } from './';
import './Leverage.scss';

export function Leverage() {
  return (
    <div className="leverage-wrapper">
      <LeverageTopSection />
      <LeverageRatiosSection />
      <OpenLiveAccountBannerSection title={locale.openLiveSectionTitle} openAccountDesc={locale.openAccountDesc} />
    </div>
  );
}
