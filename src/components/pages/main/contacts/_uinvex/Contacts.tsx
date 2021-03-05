import { Card, CardContent, CardHeader, Cards, Map, SectionBg, Svg } from '@components/shared';
import { config } from '@pages/main/contacts/_uinvex/Contacts.config';
import React from 'react';
import { Col, Container, Row } from '@components/shared';
import { useTranslation } from 'react-i18next';
import './Contacts.scss';
import { ELabels } from '@domain/enums';

export function Contacts() {
  const { t } = useTranslation();

  return (
    <div className="contacts-wrapper">
      <section className="page-top">
        <SectionBg
          primary="header_bg.jpg"
          secondary={{
            md: 'contact-page-top-desktop.png',
            xxs: 'contact-page-top-mobile.png',
          }}
        />
        <Container>
          <Row>
            <Col xs={12} md={6} lg={12}>
              <div className="page-top__title mb-10">{t('Contact Information')}</div>
              <div className="page-top__description">
                <Svg href="phone" className="mr-7" _label={ELabels.uinvex} />
                +1 647 812 4901
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="contacts">
        <Container>
          <Row>
            <Cards id="contactsCards">
              {config.contactsList.map((contact, index) => (
                <Card uid={index} key={index} wrapperClassName="card col-12 col-sm-4 mb-9 mb-md-0">
                  <CardHeader>
                    <div className="contacts__title mb-6">
                      {contact.title}
                      <div className="contacts__title-line mt-6"></div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="contacts__list">
                      {contact.points.map((point, index) => (
                        <div key={index} className="contacts__list-item mb-5">
                          <Svg href={point.icon} width={16} className="mr-3" _label={ELabels.uinvex} />
                          {point.label}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </Cards>
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
