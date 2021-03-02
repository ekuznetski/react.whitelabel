import {
  AccountTypesForTradingStylesSection,
  MobileTradingSection,
  OpenLiveAccountBannerSection,
  OurOfferBannerSection,
  PlatformTechnologySection,
  SimpleToGetStartedSection,
  TakeControlOfTradesSection,
  WorkshopCards,
} from '@components/sections';
import React from 'react';
import { Col, Container, Row } from '@components/shared';
import { useTranslation } from 'react-i18next';
import { config } from './';
import { StockPricesSection, TopSection, TradeProductsSection } from './components';
import './Home.scss';

export function Home() {
  const { t } = useTranslation();

  return (
    <div className="home-wrapper">
      <TopSection />
      <StockPricesSection className="p-0" />
      <PlatformTechnologySection {...config.platformTechnologySection} />
      <MobileTradingSection className="pt-0" {...config.mobileTradingSection} />
      <TakeControlOfTradesSection className="py-16" data={config.takeControlItems} />
      <AccountTypesForTradingStylesSection />
      <OurOfferBannerSection />
      <section className="workshop-cards pt-18">
        <Container>
          <Row>
            <Col xs={12}>
              <div className="workshop-cards__title mb-6 mb-md-12">{t('Free upcoming webinar workshop')}</div>
            </Col>
          </Row>
          <WorkshopCards data={config.workshopsData} />
        </Container>
      </section>
      <OpenLiveAccountBannerSection />
      <TradeProductsSection />
      <SimpleToGetStartedSection />
    </div>
  );
}
