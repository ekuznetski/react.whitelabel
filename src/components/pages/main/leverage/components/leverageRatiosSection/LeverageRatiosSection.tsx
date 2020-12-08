import { Cards, ITabs, Table, Tabs } from '@components/shared';
import { config } from '@pages/main/leverage';
import { useResponsive } from 'ahooks';
import React, { memo } from 'react';
import { Trans, useTranslation } from 'react-i18next';
// import { MobileDepositTable } from '..';
import './LeverageRatiosSection.scss';

export const LeverageRatiosSection = memo(function LeverageRatiosSection() {
  const responsive = useResponsive();
  const { t } = useTranslation();

  // const tabsData: ITabs = {
  //   labels: [
  //     { value: t('Deposit'), anchor: 'deposit' },
  //     { value: t('Withdrawals'), anchor: 'withdrawals' },
  //   ],
  //   content: [
  //     {
  //       value: responsive.md ? <Table {...config.tableData} /> : <MobileDepositTable {...config.tableData} />,
  //       anchor: 'deposit',
  //     },
  //     {
  //       value: responsive.md ? <Table {...config.tableData} /> : <MobileDepositTable {...config.tableData} />,
  //       anchor: 'withdrawals',
  //     },
  //   ],
  // };

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
              className="deposit__cards mt-16"
              cards={config.depositCards}
              cardWrapperClass="card col-12 col-md-4 mb-9 mb-md-0"
            />
          </div>
          {/* <div className="col-12 px-0 px-md-5">
            <Tabs className="ratios__tabs" {...tabsData} />
          </div> */}
        </div>
      </div>
    </section>
  );
});
