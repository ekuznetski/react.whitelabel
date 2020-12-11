import { config } from '@core/footer';
import React, { memo } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import './FooterPortal.scss';

export const FooterPortal = memo(function FooterPortal() {
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
      <Row className="mb-2">{config.context.portal}</Row>
      <Row className="copyright">{config.copyright.portal}</Row>
    </Container>
  );
});
