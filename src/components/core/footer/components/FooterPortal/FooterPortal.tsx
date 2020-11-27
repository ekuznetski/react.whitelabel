import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { config } from '@core/footer';
import './FooterPortal.scss';

export default function FooterPortal() {
  const { t } = useTranslation();

  return (
    <Container className="py-9">
      <Row className="mb-6">
        <Col xs={12} className="d-flex align-items-center">
          <div className="links d-flex flex-column flex-sm-row">
            {config?.documents?.map((documents, index) => (
              <React.Fragment key={index}>
                <a href={documents.link} className="links-item">
                  {documents.name}
                </a>
                {index + 1 != config.documents.length && <div className="links-divider"></div>}
              </React.Fragment>
            ))}
          </div>
        </Col>
      </Row>
      <Row className="mb-2">
        <Col xs={12} className="context">
          <b>{t('High Risk Investment Warning')}</b>
          {t('High Risk Investment Warning Portal Desc')}
        </Col>
      </Row>
      <Row className="copyright">
        <Col xs={12}>{t('Journey since 1977')}</Col>
      </Row>
    </Container>
  );
}
