import { SimplePageTopSection } from '@components/sections';
import { BackButton, Card, CardContent, Cards, Col, Container, Row, Svg } from '@components/shared';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { config } from './';
import './LegalForms.scss';

export function LegalForms() {
  const { t } = useTranslation();

  return (
    <div className="legal-forms-wrapper">
      <SimplePageTopSection title={t('Legal Forms and Documents')} />
      <section>
        <Container>
          <Row>
            <Col className="p-0">
              <Cards id="legalCards">
                {config.documents.map((doc, i) => (
                  <Card key={i} wrapperClassName="col-12 col-md-6 mb-9" uid={i}>
                    <CardContent>
                      <div className="document-title">
                        <div className="icon">
                          <Svg href="document" height="20" width="16" />
                        </div>
                        {doc.title}
                      </div>
                      <a className="document-button" download href={doc.link}>
                        <Svg href="download" height="16" width="16" />
                        {t('Download')}
                      </a>
                    </CardContent>
                  </Card>
                ))}
              </Cards>
            </Col>
          </Row>
          <Row className="back-button-wrapper d-lg-none">
            <Col>
              <BackButton />
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}
