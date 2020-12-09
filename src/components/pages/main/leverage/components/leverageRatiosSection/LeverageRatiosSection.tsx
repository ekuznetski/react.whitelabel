import { config } from '@pages/main/leverage';
import { useTranslation } from 'react-i18next';
import { Cards, Table } from '@components/shared';
import React, { memo } from 'react';
import './LeverageRatiosSection.scss';

export const LeverageRatiosSection = memo(function LeverageRatiosSection() {
  const { t } = useTranslation();

  return (
    <section className="leverage-wrapper__ratios">
      <div className="container">
        <div className="row">
          <div className="col p-0">
            <div className="ratios__title mb-7">{t('Leverage Ratios')}</div>
            <div className="ratios__subTitle mb-12">{t('Leverage Ratios Desc')}</div>
            <Table {...config.tableData} />
            <Cards
              id="depositCards"
              className="deposit__cards mt-12 mt-md-16"
              cards={config.depositCards}
              cardWrapperClass="card col-12 col-md-4 mb-9 mb-md-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
});
