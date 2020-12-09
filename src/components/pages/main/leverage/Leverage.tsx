import React from 'react';
import { LeverageRatiosSection, LeverageTopSection } from './components';
import { OpenLiveAccountBannerSection } from '@components/sections';
import { Cards } from '@components/shared';
import { config } from './';

export function Leverage() {
  return (
    <div className="leverage-wrapper">
      <LeverageTopSection />
      <LeverageRatiosSection />
      <OpenLiveAccountBannerSection />
    </div>
  );
}
