import { SectionBg, Svg, Map } from '@components/shared';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import './+Contacts.scss';

export function Contacts() {
  const { t } = useTranslation();
  const contactsList = [
    {
      title: t('Account Opening'),
      points: [
        {
          icon: 'clock',
          label: t('Working hours 24 5'),
        },
        {
          icon: 'envelope',
          label: 'support@BSFX.com',
        },
      ],
    },
    {
      title: t('Our Offices'),
      points: [
        {
          icon: 'marker',
          label: 'United Kingdom Canary Wharf, London, E14 5AA',
        },
        {
          icon: 'envelope',
          label: 'info@bluesquarefx.com',
        },
      ],
    },
  ];

  const officeCoords = {
    lat: 51.505076,
    lng: -0.019478,
  };

  return (
    <div className="contacts-wrapper">
      <section className="page-top">
        <SectionBg img="contact-page-top.jpg" />
        <Container className="pt-14">
          <Row>
            <Col xs={12}>
              <div className="page-top__title mb-9">{t('Contact us')}</div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="contacts">
        <Container>
          <Row className="flex-column">
            {contactsList.map((contact, c) => (
              <Col key={c} className="col-12 contacts__list-header">
                <div className="contacts__title col-12 col-xl-3 mb-9 mb-xl-0">{contact.title}</div>
                <div className="contacts__list">
                  {contact.points.map((point, p) => (
                    <div key={p} className="contacts__list-item mx-6">
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
      <section className="map">
        <Map
          defaultCenter={officeCoords}
          markers={[
            {
              position: officeCoords,
            },
          ]}
        />
      </section>
    </div>
  );
}
