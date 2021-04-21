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
      <StockPricesSection />
      <PlatformTechnologySection {...config.platformTechnologySection} />
      <MobileTradingSection {...config.mobileTradingSection} />
      <TakeControlOfTradesSection data={config.takeControlItems} />
      <AccountTypesForTradingStylesSection />
      <OurOfferBannerSection />
      <section className="workshop-cards">
        <Container>
          <Row>
            <Col xs={12}>
              <div className="workshop-cards__title">{t('Free upcoming webinar workshop')}</div>
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
