import React from 'react';
import './About.scss';
import { DepositSection, InTouchSection, PageTopSection, TrustedSection } from './components';

export function About() {
  return (
    <div className="about-wrapper">
      <PageTopSection />
      <TrustedSection />
      <DepositSection />
      <InTouchSection />
    </div>
  );
}
