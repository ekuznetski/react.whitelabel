import { WorkshopCards } from '@components/sections';
import { ITabs, Svg, Tabs } from '@components/shared';
import { ETradingType, EWorkshopType } from '@domain/enums';
import React, { memo } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { BannerCard, UserProfileCard } from './components';
import { TradingAccountCards } from './components/TradingAccountCards/TradingAccountCards';
import './Dashboard.scss';

export const Dashboard = memo(function Dashboard() {
  const { t } = useTranslation();

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
        day: 'Every Wednesday',
        time: '12:30 PM – 1:00 PM GMT',
      },
      info: {
        title: 'FX Week Ahead: Live Market Analysis',
        description: t('Our workshops desc'),
      },
    },
  ];
  const _tempTabsData: ITabs = {
    labels: [
      {
        value: (
          <>
            <Svg href="filter" className="mr-2" /> {t('My Trading Accounts')}
          </>
        ),
        anchor: 'tradingAccounts',
      },
      {
        value: (
          <>
            <Svg href="filter" className="mr-2" /> {t('My Demo Accounts')}
          </>
        ),
        anchor: 'demoAccounts',
      },
    ],
    content: [
      { value: <TradingAccountCards type={ETradingType.live} />, anchor: 'tradingAccounts' },
      { value: <TradingAccountCards type={ETradingType.demo} />, anchor: 'demoAccounts' },
    ],
  };

  return (
    <div className="dashboard-page-wrapper pt-11">
      <Container>
        <section className="profile-info">
          <Row>
            <Col xs={12} md={6}>
              <div className="section-title mb-9">
                <Svg href="profile" height={24} className="mr-3" />
                {t('Profile')}
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={12} lg={6}>
              <UserProfileCard />
            </Col>
            <Col md={12} lg={6}>
              <BannerCard />
            </Col>
          </Row>
        </section>
        <section className="trading-accounts">
          <Row>
            <Col xs={12}>
              <Tabs className="trading-accounts__tabs" {..._tempTabsData} />
            </Col>
          </Row>
        </section>
        <section className="workshops">
          <Row>
            <Col xs={12} md={6}>
              <div className="section-title mb-9">
                <Svg href="workshop" height={24} className="mr-3" />
                {t('Webinars and Workshops')}
              </div>
            </Col>
          </Row>
          <WorkshopCards data={workshopsData} />
        </section>
      </Container>
    </div>
  );
});
