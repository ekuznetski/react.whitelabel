import { Cards, Tabs } from '@components/shared';
import { config, locale } from '@pages/main/about';
import { useResponsive } from 'ahooks';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import './DepositSection.scss';

export const DepositSection = memo(function DepositSection(props: { showOnlyCards?: boolean }) {
  const responsive = useResponsive();
  const { t } = useTranslation();

  if (props.showOnlyCards)
    return (
      <Cards id="depositCards" className="deposit__cards" cards={config.depositCards} cardWrapperClass="card col" />
    );

  return (
    <section className="about-wrapper__deposit">
      <div className="container">
        <div className="row">
          <div className="deposit__header col">
            <div className="deposit__title">{locale.depositTitle}</div>
            <div className="deposit__cards-container">
              <Cards
                id="depositCards"
                className="deposit__cards"
                cards={config.depositCards}
                cardWrapperClass="card col"
              />
            </div>
          </div>
          <div className="deposit__tabs-container col">
            <Tabs className="deposit__tabs" {...config.tabsData(responsive)} />
          </div>
        </div>
      </div>
    </section>
  );
});
