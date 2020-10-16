import {
  AccountTypesForTradingStylesSection,
  MobileTradingWithMT5Section,
  OpenLiveAccountBannerSection,
  OurOfferBannerSection,
  PrestigiousPlatformTechnologySection,
  SimpleToGetStartedSection,
  TakeControlOfTradesSection,
  WorkshopCards,
} from '@components/sections';
import { Button, Card, CardContent, CardHeader, Cards, LocaleLink, SectionBg, Svg } from '@components/shared';
import { EWorkshopType } from '@domain/enums';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import './Home.scss';
import { StockPrices } from './stocks_prices/StockPrices';

export function Home() {
  const { t } = useTranslation();

  const takeControlItems = [
    {
      title: t('Trade With The Metatrader 5 Platform'),
      desc: t('The Forex Industry Standard'),
      img: 'computer.png',
    },
    {
      title: 'Mobile first',
      desc: t('Get Trading Apps'),
      img: 'phone.png',
    },
    {
      title: t('Don’t miss a thing'),
      desc: t('Never miss an opportunity'),
      img: 'trade_info.png',
    },
  ];
  const workshopsData = [
    {
      type: EWorkshopType.webinar,
      author: {
        img: 'avatar-1.jpg',
        name: 'William Bailey',
        title: t('Chief Currency Analyst'),
      },
      schedule: {
        day: t('Every Monday'),
        time: '12:30 PM – 1:00 PM GMT',
      },
      info: {
        title: 'FX Week Ahead: Live Market Analysis',
        description: t('Get ready for trading'),
      },
    },
    {
      type: EWorkshopType.workshop,
      author: {
        img: 'avatar-1.jpg',
        name: 'Mike Hamilton',
        title: t('Chief Currency Analyst'),
      },
      schedule: {
        day: t('Every Wednesday'),
        time: '12:30 PM – 1:00 PM GMT',
      },
      info: {
        title: 'FX Week Ahead: Live Market Analysis',
        description: 'Our workshops desc',
      },
    },
  ];
  const tradeProductsCards = [
    {
      title: 'Forex',
      icon: 'filter',
      exchange: 'EUR/USD, GBP/USD, USD/JPY',
    },
    {
      title: 'Stocks',
      icon: 'graph_bars',
      exchange: 'Apple, Amazon, Facebook',
    },
    {
      title: 'Indices',
      icon: 'indices',
      exchange: 'US500, UK100, Japan225',
    },
    {
      title: 'Cryptocurrencies',
      icon: 'crypto',
      exchange: '',
    },
    {
      title: 'Commodities',
      icon: 'commodities',
      exchange: 'Cocoa, Cotton, Sugar',
    },
    {
      title: 'ETFs',
      icon: 'etfs',
      exchange: 'iShares, ProShares',
    },
  ];

  return (
    <div className="home-wrapper">
      <section className="page-top">
        <SectionBg img="home-page-top.jpg" />
        <Container>
          <Row className="mb-9 mb-lg-18">
            <Col xs={12} md={8} lg={6}>
              <div className="page-top__title mb-5 mb-lg-9">
                {t('Trade smart')}
                <br />
                {t('Trade safe')}
              </div>
              <div className="page-top__description mb-11 mb-lg-10">{t('Home Page Top Section Desc')}</div>
              <Button>
                <LocaleLink to="/registration">{t('Open Live Account')}</LocaleLink>
              </Button>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="stocks p-0">
        <Container>
          <Row>
            <Col xs={12}>
              <StockPrices />
            </Col>
          </Row>
        </Container>
      </section>
      <PrestigiousPlatformTechnologySection />
      <MobileTradingWithMT5Section className="pt-0" />
      <TakeControlOfTradesSection className="py-16" data={takeControlItems} />
      <AccountTypesForTradingStylesSection />
      <OurOfferBannerSection />
      <section className="workshop-cards pt-18">
        <Container>
          <Row>
            <Col xs={12}>
              <div className="workshop-cards__title mb-6 mb-md-12">{t('Free upcoming webinar workshop')}</div>
            </Col>
          </Row>
          <WorkshopCards data={workshopsData} />
        </Container>
      </section>
      <OpenLiveAccountBannerSection />
      <section className="trade-products">
        <Container>
          <Row>
            <Col xs={12} className="mb-11">
              <div className="trade-products__title">
                <b>{t('Trade')}</b> {t('Our Products')}
              </div>
            </Col>
            <Col xs={12} className="p-0">
              <Cards id="tradeProductsCards">
                {tradeProductsCards.map((card, c) => (
                  <Card key={c} wrapperClassName="col-12 col-md-6 col-lg-4 mb-9" uid={c}>
                    <CardHeader className="mb-7">
                      <Svg href={card.icon} className="mr-5" />
                      {card.title}
                    </CardHeader>
                    <CardContent className="text-left">
                      <div className="mb-1">
                        <b>{t('exchange')}</b>
                      </div>
                      <span className="greyText">{card.exchange}</span>
                    </CardContent>
                  </Card>
                ))}
              </Cards>
            </Col>
          </Row>
        </Container>
      </section>
      <SimpleToGetStartedSection />
    </div>
  );
}
