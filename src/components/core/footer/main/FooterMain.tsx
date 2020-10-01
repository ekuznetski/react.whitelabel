import { Svg } from '@components/shared';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import './FooterMain.scss';

export default function FooterMain() {
  const { t } = useTranslation();

  return (
    <Container className="py-lg-16 py-md-15 py-13">
      <Row className="mb-lg-11 mb-9">
        <Col xs={12} className="live-chat">
          <Svg href="chat.svg" className="mr-5" /> {t('Live Chat')}
        </Col>
      </Row>
      <Row className="mb-lg-11 mb-9">
        <Col xs={12} className="outer-links-container">
          <div className="links mb-9">
            <a className="links-item">{t('Legal Forms and Documents')}</a>
            <div className="links-divider"></div>
            <a className="links-item">{t('Risk Warnings')}</a>
            <div className="links-divider"></div>
            <a className="links-item">{t('Cookies Policy')}</a>
          </div>
          <div className="social-links ml-auto">
            <Svg href="facebook.svg" className="mr-5" />
            <Svg href="tweeter.svg" className="mr-5" />
            <Svg href="linkedin.svg" className="mr-5" />
            <Svg href="instagram.svg" className="mr-5" />
            <Svg href="youtube.svg" />
          </div>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col xs={12} className="context mb-lg-9 mb-7">
          <b>{t('High Risk Investment Warning Main Desc:0')}</b>
          {t('High Risk Investment Warning Main Desc:1')}
        </Col>
        <Col xs={12} className="context mb-lg-9 mb-7">
          <b>{t('Disclaimer desc:0')}</b> {t('Disclaimer desc:1')}
        </Col>
        <Col xs={12} className="context mb-lg-9 mb-7">
          <b>{t('Regional Restrictions:0')}</b>
          {t('Regional Restrictions:1')}
          <a>{t('Regional Restrictions:2')}</a>.
        </Col>
      </Row>
      <hr />
      <Row className="mt-lg-11 mt-9 copyright">
        <Col xs={12}>{t('Copyright 2020 HYCM')}</Col>
      </Row>
    </Container>
  );
}
