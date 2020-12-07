import { WorkshopCards } from '@components/sections';
import { LabelView, Svg, Tabs } from '@components/shared';
import { ELabels } from '@domain/enums';
import React, { memo } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { config } from './';
import { BannerCard, UserProfileCard } from './components';
import './Dashboard.scss';

export const Dashboard = memo(function Dashboard() {
  const { t } = useTranslation();

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
              <Tabs className="trading-accounts__tabs" {...config.tabsData} />
            </Col>
          </Row>
        </section>
        <LabelView hideOn={ELabels.bsfx}>
          <section className="workshops">
            <Row>
              <Col xs={12} md={6}>
                <div className="section-title mb-9">
                  <Svg href="workshop" height={24} className="mr-3" />
                  {t('Webinars and Workshops')}
                </div>
              </Col>
            </Row>
            <WorkshopCards data={config.workshopsData} />
          </section>
        </LabelView>
      </Container>
    </div>
  );
});
