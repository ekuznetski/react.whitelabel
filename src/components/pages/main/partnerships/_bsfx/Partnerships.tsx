import React, { memo, useRef, useState } from 'react';
import { FormsProvider } from '..';
import { PartnershipFormSection, PartnershipPotentialSection, PartnershipTopSection } from '../components';
import '../Partnerships.scss';

export const Partnerships = memo(function Partnerships() {
  return (
    <FormsProvider>
      {(state, dispatch) => {
        return (
          <div className="partnership-wrapper">
            <PartnershipTopSection />
            <PartnershipFormSection />
            <PartnershipPotentialSection />
          </div>
        );
      }}
    </FormsProvider>
  );
});
