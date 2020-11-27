import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import './FooterAuth.scss';

export default function FooterAuth() {
  const { t } = useTranslation();

  return (
    <Container className="py-9">
      <Row className="mb-6">
        <Col xs={12} className="d-flex align-items-center">
          <div className="links d-flex flex-column flex-sm-row">
            <a className="links-item">{t('Legal Forms and Documents')}</a>
            <div className="links-divider" />
            <a className="links-item">{t('Risk Warnings')}</a>
            <div className="links-divider" />
            <a className="links-item">{t('Cookies Policy')}</a>
          </div>
        </Col>
      </Row>
      <Row className="mb-2">
        <Col xs={12} className="context">
          <b>{t('High Risk Investment Warning Portal Desc:0')}</b>
          {t('High Risk Investment Warning Portal Desc:1')}
        </Col>
      </Row>
      <Row className="copyright">
        <Col xs={12}>{t('Copyright 2020 HYCM')}</Col>
      </Row>
    </Container>
  );
}
