import {
  AccountTypesForTradingStylesSection,
  MobileTradingSection,
  OpenLiveAccountBannerSection,
  OurOfferBannerSection,
  PlatformTechnologySection,
} from '@components/sections';
import { ac_fetchPrices } from '@store';
import React, { useEffect } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { AssetsSection, PerfectSection, TopSection } from '@pages/main/platform/components';
import './Platform.scss';

export function Platform() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPricesInterval = setInterval(() => {
      dispatch(ac_fetchPrices());
    }, 5000);

    return () => {
      clearInterval(fetchPricesInterval);
    };
  }, []);

  return (
    <div className="platform-wrapper">
      <TopSection />
      <AssetsSection />
      <OurOfferBannerSection />
      <PlatformTechnologySection
        title={
          <Trans i18nKey="Prestigious Platform Technology Title Platform Page">
            <b>
              Innovative <span>MT5 Platform</span>
            </b>
            <br /> technology
          </Trans>
        }
        description={
          <Trans i18nKey="Prestigious Platform Technology Desc Platform Page">
            <div className="mb-8">
              MetaTrader is the most widely-used electronic trading platform and is considered the
              <span>golden standard of the financial industry</span> thanks to its cutting-edge technology and
              functionality for traders of all levels.
            </div>
            <div className="mb-8">
              MT5 is a powerful multi-asset platform featuring advanced technical analysis, fundamental analysis,
              flexible trading systems, and a mobile app. It is compatible with automated trading applications such
              as trading robots and Expert Advisors.
            </div>
            <div className="mb-8">
              Compared to its predecessor, MT5 offers <span>additional timeframes and services</span>, including 21
              timeframes, 6 types of pending orders, and an integrated fundamental economic calendar.
            </div>
          </Trans>
        }
      />
      <PerfectSection />
      <AccountTypesForTradingStylesSection />
      <OpenLiveAccountBannerSection title={t('Cutting-edge trading technology')} />
      <MobileTradingSection
        title={
          <Trans i18nKey="Mobile Trading Section Title Platform Page">
            Mobile trading with <span>MT5</span>
          </Trans>
        }
        description={
          <Trans i18nKey="Mobile Trading Section Desc Platform Page">
            <div className="mb-8">
              Carry the functionality of Metatrader with you as you open, manage and close trading positions with ease
              from your smartphone or tablet.
            </div>
            <div className="mb-8">
              MetaTrader 5 for Android or iOS and trade Forex anytime and anywhere in the world!
            </div>
          </Trans>
        }
      />
    </div>
  );
}
