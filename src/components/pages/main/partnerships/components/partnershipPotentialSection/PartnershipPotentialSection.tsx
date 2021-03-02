import React, { memo } from 'react';
import { Col, Container, Row } from '@components/shared';
import { Trans, useTranslation } from 'react-i18next';
import { SectionBg } from '@components/shared';
import './PartnershipPotentialSection.scss';

export const PartnershipPotentialSection = memo(function PartnershipPotentialSection() {
  const { t } = useTranslation();

  return (
    <section className="partnership__potential">
      <SectionBg primary="potential-bg.jpg" />
      <Container>
        <Row>
          <Col xs={12} lg={9} xl={8}>
            <div className="potential__title mb-lg-9 mb-md-7 mb-3">{t('Maximize Your Earning Potential')}</div>
            <div className="potential__description">
              <Trans i18nKey="Join Our Partnership Program Today">
                <div className="mb-md-5 mb-3">
                  All our programs are geared up to help you grow your business and maximize your earning potential.
                </div>
                <div>
                  Join our partnership program today. Let us design your bespoke partnership program so that you can
                  start earning right away.
                </div>
              </Trans>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
});
