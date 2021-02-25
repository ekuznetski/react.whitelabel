import { Button, Cards, SectionBg, Svg } from '@components/shared';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { config } from './';
import './Contacts.scss';

export function Contacts() {
  const { t } = useTranslation();

  return (
    <div className="contacts-wrapper">
      <section className="page-top">
        <SectionBg primary="contact-page-top.jpg" />
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
            {config.contactsList.map((contact, c) => (
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
                cards={config.officesCards}
                className="offices__cards"
              ></Cards>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}
