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
import { Button, Card, CardContent, CardHeader, Cards, SectionBg, Svg } from '@components/shared';
import { EWorkshopType } from '@domain/enums';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './Home.scss';
import { StockPrices } from './stocks_prices/StockPrices';

export function Home() {
  const { t } = useTranslation();

  const takeControlItems = [
    {
      title: 'Trade with the Metatrader 5 platform',
      desc: 'The forex industry standard',
      img: 'computer.png',
    },
    {
      title: 'Mobile first',
      desc: 'Get trading apps for Android or iOS and trade on the go, anywhere, anytime',
      img: 'phone.png',
    },
    {
      title: 'Don’t miss a thing',
      desc:
        'Never miss an opportunity with our price alerts, push notifications, economic calendar, and market analyses',
      img: 'trade_info.png',
    },
  ];

  const workshopsData = [
    {
      type: EWorkshopType.webinar,
      author: {
        img: 'avatar-1.jpg',
        name: 'William Bailey',
        title: 'Chief Currency Analyst',
      },
      schedule: {
        day: 'Every Monday',
        time: '12:30 PM – 1:00 PM GMT',
      },
      info: {
        title: 'FX Week Ahead: Live Market Analysis',
        description:
          'Get ready for the trading week ahead with our weekly webinar session, where we will be looking at the upcoming FX Week while analysing market movements.',
      },
    },
    {
      type: EWorkshopType.workshop,
      author: {
        img: 'avatar-1.jpg',
        name: 'Mike Hamilton',
        title: 'Chief Currency Analyst',
      },
      schedule: {
        day: 'Every Wednesday',
        time: '12:30 PM – 1:00 PM GMT',
      },
      info: {
        title: 'FX Week Ahead: Live Market Analysis',
        description:
          'Our workshops give you the opportunity to learn directly from an industry expert, Mike Hamilton, as he teaches you the ins and outs of trading in real time.',
      },
    },
  ];

  const tradeProductsCards = [
    {
      title: 'Forex',
      icon: 'filter.svg',
      exchange: 'EUR/USD, GBP/USD, USD/JPY',
    },
    {
      title: 'Stocks',
      icon: 'graph_bars.svg',
      exchange: 'Apple, Amazon, Facebook',
    },
    {
      title: 'Indices',
      icon: 'indices.svg',
      exchange: 'US500, UK100, Japan225',
    },
    {
      title: 'Cryptocurrencies',
      icon: 'crypto.svg',
      exchange: '',
    },
    {
      title: 'Commodities',
      icon: 'commodities.svg',
      exchange: 'Cocoa, Cotton, Sugar',
    },
    {
      title: 'ETFs',
      icon: 'etfs.svg',
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
                <Link to="/registration">{t('Open Live Account')}</Link>
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
