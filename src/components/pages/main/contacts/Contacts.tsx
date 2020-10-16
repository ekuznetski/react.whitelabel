import { Button, Cards, ISingleCard, SectionBg, Svg } from '@components/shared';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import './Contacts.scss';

export function Contacts() {
  const { t } = useTranslation();
  const contactsList = [
    {
      title: t('Client Support'),
      points: [
        {
          icon: 'envelope',
          label: 'support@hycm.com',
        },
        {
          icon: 'clock',
          label: t('Working hours 24 5'),
        },
      ],
    },
    {
      title: t('Account Opening'),
      points: [
        {
          icon: 'envelope',
          label: 'accounts@hycm.com',
        },
        {
          icon: 'phone',
          label: '+44 (208) 816-7812',
        },
        {
          icon: 'clock',
          label: t('Working hours 24 5'),
        },
      ],
    },
    {
      title: t('General Inquiries'),
      points: [
        {
          icon: 'envelope',
          label: 'info@hycm.com',
        },
        {
          icon: 'phone',
          label: '+44 (208) 816-7812',
        },
        {
          icon: 'clock',
          label: t('Working hours 24 5'),
        },
      ],
    },
    {
      title: 'Complaints',
      points: [
        {
          icon: 'envelope',
          label: 'complaints@hycm.com',
        },
        {
          icon: 'clock',
          label: '9:00 - 18.00 (GMT +3)',
        },
      ],
    },
  ];

  const officesCards: ISingleCard[] = [
    {
      header: officesCardHeader('London, United Kingdom', 'Headquarters'),
      content: '18 King William Street London, EC4N 7BP',
      uid: 1,
    },
    {
      header: officesCardHeader('Limassol, Cyprus', 'Europe'),
      content: 'The Noble Center, 4th Floor 47 Spyrou Kyprianou Avenue, Mesa Geitonia 4003',
      uid: 2,
    },
    {
      header: officesCardHeader('Dubai, United Arab Emirates', 'Dubai Office'),
      content: '9th Floor, Liberty House, Dubai International Financial Center',
      uid: 3,
    },
    {
      header: officesCardHeader('Sharq, Kuwait', 'Kuwait Office'),
      content: '31st Floor KIPCO Tower Khalid Bin Al Waleed Street',
      uid: 4,
    },
    {
      header: officesCardHeader('Hong Kong', 'HENYEP Group Headquarters'),
      content: '10th Floor, Nine Queens Road Central',
      uid: 5,
    },
    {
      header: officesCardHeader('London, United Kingdom', 'Headquarters'),
      content: '71 Fort Street, 1st Floor Appleby Tower, P.O. Box 950, Grand Cayman, KY1-1102',
      uid: 6,
    },
  ];

  return (
    <div className="contacts-wrapper">
      <section className="page-top">
        <SectionBg img="contact-page-top.jpg" />
        <Container className="pt-14">
          <Row>
            <Col xs={12}>
              <div className="page-top__title mb-9">{t('Contact us')}</div>
              <div className="page-top__description">
                <Svg href="phone" className="mr-5" />
                +44 (208) 816-7812
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="question p-0">
        <Container>
          <Row>
            <Col className="d-md-flex align-items-center p-7">
              <div className="question mb-5 mb-md-0">
                {t('Have question to help:0')} <br />
                {t(`Have question to help:1`)}
              </div>
              <Button className="ml-auto">{t('Live Chat')}</Button>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="contacts">
        <Container>
          <Row>
            {contactsList.map((contact, c) => (
              <Col key={c} xs={12} md={6} lg={3} className="mb-8 mb-md-5 mb-lg-0">
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
      <section className="offices pt-0 mt-md-n5">
        <Container>
          <Row>
            <Col xs={12}>
              <div className="offices__title mb-5">{t('Our Offices')}</div>
              <div className="offices__description mb-13">{t('Our Offices Section Desc')}</div>
            </Col>
            <Col xs={12} className="p-0">
              <Cards
                id="officesCards"
                cardWrapperClass="col-lg-4 col-md-6"
                cards={officesCards}
                className="offices__cards"
              ></Cards>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}

function officesCardHeader(location: string, office: string) {
  return (
    <>
      <div className="location mb-5">
        <Svg href="globe" width={16} className="mr-3" />
        {location}
      </div>
      <div className="office">
        {office}
        <div className="office-line mt-6"></div>
      </div>
    </>
  );
}
