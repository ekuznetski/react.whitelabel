import React from 'react';

import { useTranslation } from 'react-i18next';
import { SimplePageTopSection } from '@sections/simplePageTopSection/SimplePageTopSection';
import { BackButton, Cards, Col, Row, Svg } from '@components/shared';
import { config } from './LegalForms.config';
import './LegalForms.scss';

export function LegalForms() {
  const { t } = useTranslation();
  const cardsConfig = config.documents.map((e, i) => {
    return {
      header: <CardHeader title={e.title} />,
      content: <CardContent link={e.link} />,
      uid: i + 1,
    };
  });
  return (
    <>
      <SimplePageTopSection title={t('Legal Forms and Documents')} />
      <div className="legal-forms-wrapper container">
        <Cards id="legalCards" className="row" cardWrapperClass="col-xs-12 col-sm-6 mb-9" cards={cardsConfig} />
        <Row className="mb-5 d-lg-none">
          <Col>
            <BackButton />
          </Col>
        </Row>
      </div>
    </>
  );
}

function CardHeader({ title }: { title: string }) {
  return (
    <div className="document-title">
      <div className="document-icon">
        <Svg href="document" height="20" width="16" />
      </div>
      {title}
    </div>
  );
}

function CardContent({ link }: { link: string }) {
  const { t } = useTranslation();

  return (
    <a className="document-button" download href={link}>
      <Svg href="download" height="16" width="16" />
      {t('Download')}
    </a>
  );
}
