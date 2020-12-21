import { PartnershipPrograms } from '@components/sections';
import React, { memo } from 'react';
import { PartnershipFormSection, PartnershipPotentialSection, PartnershipTopSection } from './components';
import { PartnershipProvider } from './';
import './Partnerships.scss';

export const Partnerships = memo(function Partnerships() {
  return (
    <PartnershipProvider>
      {(state, dispatch) => {
        return (
          <div className="partnership-wrapper">
            <PartnershipTopSection />
            <PartnershipPrograms />
            <PartnershipPotentialSection />
            <PartnershipFormSection />
          </div>
        );
      }}
    </PartnershipProvider>
  );
});
