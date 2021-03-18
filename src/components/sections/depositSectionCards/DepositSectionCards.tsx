import { Cards } from '@components/shared';
import React, { memo } from 'react';
import { config } from './';
import './DepositSectionCards.scss';

export const DepositSectionCards = memo(function DepositSectionCards() {
  return (
    <div className="deposit__cards-wrapper">
      <Cards id="depositCards" className="deposit__cards" cards={config.depositCards} cardWrapperClass="card col" />
    </div>
  );
});
