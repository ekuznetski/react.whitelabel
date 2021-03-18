import { Cards, Tabs } from '@components/shared';
import { config, locale } from '@pages/main/about';
import { DepositSectionCards } from '@components/sections';
import { useResponsive } from 'ahooks';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import './DepositSection.scss';

export const DepositSection = memo(function DepositSection() {
  const responsive = useResponsive();
  const { t } = useTranslation();

  return (
    <section className="about-wrapper__deposit">
      <div className="container">
        <div className="row">
          <div className="deposit__header col">
            <div className="deposit__title">{locale.depositTitle}</div>
            <DepositSectionCards />
          </div>
          <div className="deposit__tabs-container col">
            <Tabs className="deposit__tabs" {...config.tabsData(responsive)} />
          </div>
        </div>
      </div>
    </section>
  );
});
