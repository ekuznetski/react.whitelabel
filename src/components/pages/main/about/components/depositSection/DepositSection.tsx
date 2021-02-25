import { Cards, ITabs, Table, Tabs } from '@components/shared';
import { config, locale } from '@pages/main/about';
import { useResponsive } from 'ahooks';
import React, { memo } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { MobileDepositTable } from '..';
import './DepositSection.scss';

export const DepositSection = memo(function DepositSection() {
  const responsive = useResponsive();
  const { t } = useTranslation();

  return (
    <section className="about-wrapper__deposit">
      <div className="container">
        <div className="row">
          <div className="col p-0">
            <div className="deposit__title mb-12">{locale.depositTitle}</div>
            <div className="deposit__cards-container col-12 col-sm-8 col-md-12 mx-sm-auto">
              <Cards
                id="depositCards"
                className="deposit__cards mb-16"
                cards={config.depositCards}
                cardWrapperClass="card col-12 col-md-4 mb-9 mb-md-0"
              />
            </div>
          </div>
          <div className="col-12 px-0 px-md-5">
            <Tabs className="deposit__tabs" {...config.tabsData(responsive)} />
          </div>
        </div>
      </div>
    </section>
  );
});
