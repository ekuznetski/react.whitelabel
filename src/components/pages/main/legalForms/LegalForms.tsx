import React from 'react';

import { useTranslation } from 'react-i18next';
import { SimplePageTopSection } from '@sections/simplePageTopSection/SimplePageTopSection';
import { BackButton, Col, Row, Svg } from '@components/shared';
import { config } from './LegalForms.config';
import './LegalForms.scss';

export function LegalForms() {
  const { t } = useTranslation();

  return (
    <>
      <SimplePageTopSection title={t('Legal Forms and Documents')} />
      <div className="legal-forms-wrapper container">
        <Row>
          {config.documents.map((doc) => (
            <Col key={doc.title} xs="12" sm="6">
              <div className="document-wrapper">
                <div className="document-title">
                  <div className="document-icon">
                    <Svg href="document" height="20" width="16" />
                  </div>
                  {doc.title}
                </div>
                <a className="document-button" download href={doc.link}>
                  <Svg href="download" height="16" width="16" />
                  {t('Download')}
                </a>
              </div>
            </Col>
          ))}
        </Row>
        <Row className="mb-5 d-lg-none">
          <Col>
            <BackButton />
          </Col>
        </Row>
      </div>
    </>
  );
}
