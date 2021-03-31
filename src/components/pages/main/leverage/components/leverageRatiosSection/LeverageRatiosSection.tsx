import { DepositCards } from '@components/shared';
import { Table } from '@components/shared';
import { config, locale } from '@pages/main/leverage';
import React, { memo } from 'react';
import './LeverageRatiosSection.scss';

export const LeverageRatiosSection = memo(function LeverageRatiosSection() {
  return (
    <section className="leverage-wrapper__ratios">
      <div className="container">
        <div className="row">
          <div className="col ratios__container">
            <div className="ratios__title">{locale.ratiosTitle}</div>
            <div className="ratios__subTitle">{locale.ratiosDesc}</div>
            <Table {...config.tableData} />
            <DepositCards />
          </div>
        </div>
      </div>
    </section>
  );
});
