import { Button, LocaleLink } from '@components/shared';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { IDataStore, IStore } from '@store';
import './404.scss';
import { useSelector } from 'react-redux';
import { Col, Container, Row } from 'react-bootstrap';

export const NotFound = memo(function NotFound() {
  const { clientProfile } = useSelector<IStore, { clientProfile: IDataStore['client']['profile'] }>((state) => ({
    clientProfile: state.data.client.profile,
  }));
  const { t } = useTranslation();

  return (
    <section className="not-found">
      <Container className="align-self-center">
        <Row>
          <Col className=" m-auto not-found__header mt-n2">
            <div className="not-found__title mb-12">404</div>
            <div className="not-found__subTitle mb-7">{t('Not Found')}</div>
            <div className="not-found__description mb-13">{t('Not Found Page desc')}</div>
            <div className="not-found__btns">
              <Button className="mx-7 mt-3 col-12 col-sm-6 col-md-4 col-lg-3">
                <LocaleLink to="">{t('Go to Home Page')}</LocaleLink>
              </Button>
              {!!clientProfile && (
                <Button className="mx-7 mt-3 col-12 col-sm-6 col-md-4 col-lg-3">
                  <LocaleLink to="/dashboard">{t('Go to Dashboard')}</LocaleLink>
                </Button>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
});
