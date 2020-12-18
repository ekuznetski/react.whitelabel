import { PartnershipPrograms } from '@components/sections';
import React, { memo, useEffect, useRef, useState } from 'react';
import { PartnershipFormSection, PartnershipPotentialSection, PartnershipTopSection } from './components';
import { Dispatch, FormsProvider } from './';
import './Partnerships.scss';

export const Partnerships = memo(function Partnerships() {
  return (
    <FormsProvider>
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
    </FormsProvider>
  );
});
