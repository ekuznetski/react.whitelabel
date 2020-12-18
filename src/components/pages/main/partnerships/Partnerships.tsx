import { PartnershipPrograms } from '@components/sections';
import React, { memo, useRef, useState } from 'react';
import { PartnershipFormSection, PartnershipPotentialSection, PartnershipTopSection } from './components';
import './Partnerships.scss';

export const Partnerships = memo(function Partnerships() {
  const [activeTab, setTab] = useState('affiliate');
  const formRef = useRef<HTMLDivElement>(null);

  function navigateToForm(program?: string) {
    formRef.current && formRef.current.scrollIntoView({ behavior: 'smooth' });
    program && setTab(program);
  }

  return (
    <div className="partnership-wrapper">
      <PartnershipTopSection formRef={formRef} activeTab={activeTab} setTab={setTab} />
      <PartnershipPrograms onNavigate={navigateToForm} />
      <PartnershipPotentialSection />
      <PartnershipFormSection formRef={formRef} activeTab={activeTab} />
    </div>
  );
});
