import { Map, SectionBg, Svg } from '@components/shared';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { config } from '@pages/main/contacts/_bsfx/Contacts.config';
import './Contacts.scss';

export function Contacts() {
  const { t } = useTranslation();

  return (
    <div className="contacts-wrapper">
      <section className="page-top">
        <SectionBg img="contact-page-top.jpg" />
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
              <Col key={c} xs={12} md={6} lg={5} className="mb-8 mb-md-5">
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
      <section className="p-0 map">
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
