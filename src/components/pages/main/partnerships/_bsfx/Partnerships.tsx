import React, { memo, useRef, useState } from 'react';
import { PartnershipFormSection, PartnershipPotentialSection, PartnershipTopSection } from '../components';
import '../Partnerships.scss';

export const Partnerships = memo(function Partnerships() {
  const [activeTab, setTab] = useState('affiliate');
  const formRef = useRef<HTMLDivElement>(null);

  return (
    <div className="partnership-wrapper">
      <PartnershipTopSection formRef={formRef} activeTab={activeTab} setTab={setTab} />
      <PartnershipFormSection formRef={formRef} activeTab={activeTab} />
      <PartnershipPotentialSection />
    </div>
  );
});
