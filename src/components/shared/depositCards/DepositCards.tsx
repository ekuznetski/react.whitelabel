import { Cards } from '@components/shared';
import React, { memo } from 'react';
import { config } from '.';
import './DepositCards.scss';

export const DepositCards = memo(function DepositCards() {
  return (
    <div className="deposit__cards-wrapper">
      <Cards id="depositCards" className="deposit__cards" cards={config.depositCards} cardWrapperClass="card col" />
    </div>
  );
});
