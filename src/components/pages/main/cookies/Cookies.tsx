import React from 'react';

import { SimplePageTopSection } from '@sections/simplePageTopSection/SimplePageTopSection';
import { useTranslation } from 'react-i18next';
import { Col, Row } from '@components/shared';
import './Cookies.scss';

export function Cookies() {
  const { t } = useTranslation();
  return (
    <>
      <SimplePageTopSection title={t('Cookies Policy')} />
      <div className="cookie-wrapper">
        <Row>
          <Col sm="12" md="6">
            1
          </Col>
        </Row>
      </div>
    </>
  );
}
