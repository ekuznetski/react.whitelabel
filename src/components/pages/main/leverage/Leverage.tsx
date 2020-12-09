import React from 'react';
import { OpenLiveAccountBannerSection } from '@components/sections';
import { LeverageRatiosSection, LeverageTopSection } from './components';

export function Leverage() {
  return (
    <div className="leverage-wrapper">
      <LeverageTopSection />
      <LeverageRatiosSection />
      <OpenLiveAccountBannerSection />
    </div>
  );
}
