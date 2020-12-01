import { OpenLiveAccountBannerSection } from '@components/sections';
import React from 'react';
import { useTranslation } from 'react-i18next';
import './About.scss';
import { DepositSection, InTouchSection, PageTopSection, TrustedSection } from './components';

export function About() {
  const { t } = useTranslation();

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
