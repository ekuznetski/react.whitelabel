import { Map, SectionBg, Svg } from '@components/shared';
import { config } from '@pages/main/contacts/_bsfx/Contacts.config';
import React from 'react';
import { Col, Container, Row } from '@components/shared';
import { useTranslation } from 'react-i18next';
import './Contacts.scss';

export function Contacts() {
  const { t } = useTranslation();

  return (
    <div className="contacts-wrapper">
      <section className="page-top">
        <SectionBg primary="contact-page-top.jpg" />
        <Container className="pt-17">
          <Row>
            <Col xs={12}>
              <div className="page-top__title mb-9">{t('Contact us')}</div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="contacts">
        <Container>
          <Row>
            {config.contactsList.map((contact, c) => (
              <Col key={c} xs={12} md={6} lg={5} className="contacts__item mb-8">
                <div className="contacts__title mb-6">
                  {contact.title}
                  <div className="contacts__title-line mt-6"></div>
                </div>
                <div className="contacts__list">
                  {contact.points.map((point, p) => (
                    <div key={p} className="contacts__list-item mb-5">
                      <Svg href={point.icon} width={16} className="mr-3" />
                      {point.label}
                    </div>
                  ))}
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
      <section className="map p-0">
        <Map
          defaultCenter={config.officeCoords}
          markers={[
            {
              position: config.officeCoords,
            },
          ]}
          embed
        />
      </section>
    </div>
  );
}
