import { OpenLiveAccountBannerSection } from '@components/sections';
import React from 'react';
import { DepositSection, InTouchSection, PageTopSection, TrustedSection } from './components';
import './About.scss';

export function About() {
  return (
    <div className="about-wrapper">
      <PageTopSection />
      <TrustedSection />
      <OpenLiveAccountBannerSection />
      <DepositSection />
      <InTouchSection />
    </div>
  );
}
