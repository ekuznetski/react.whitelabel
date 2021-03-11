import { Table } from '@components/shared';
import { DepositSection } from '@pages/main/about/components';
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
            <DepositSection showOnlyCards />
          </div>
        </div>
      </div>
    </section>
  );
});
