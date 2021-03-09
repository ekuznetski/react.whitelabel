import { Cards, Table } from '@components/shared';
import { config, locale } from '@pages/main/leverage';
import React, { memo } from 'react';
import './LeverageRatiosSection.scss';

export const LeverageRatiosSection = memo(function LeverageRatiosSection() {
  return (
    <section className="leverage-wrapper__ratios">
      <div className="container">
        <div className="row">
          <div className="col ratios__container">
            <div className="ratios__title">{locale.leverageRatiosTitle}</div>
            <div className="ratios__subTitle">{locale.leverageRatiosDesc}</div>
            <Table {...config.tableData} />
            <Cards
              id="leverageRatiosCards"
              className="ratios__cards"
              cardWrapperClass="card col"
              cards={config.leverageRatiosCards}
            />
          </div>
        </div>
      </div>
    </section>
  );
});
