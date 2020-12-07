import { LabelView, Svg } from '@components/shared';
import { config } from '@core/footer';
import { ELabels } from '@domain/enums';
import classNames from 'classnames';
import React, { memo } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Trans, useTranslation } from 'react-i18next';
import './FooterMain.scss';

export const FooterMain = memo(function FooterMain() {
  const { t } = useTranslation();

  return (
    <Container className="py-lg-16 py-md-15 py-13">
      <Row className="mb-lg-11 mb-9">
        <Col xs={12} className="live-chat">
          <Svg href="chat" className="mr-5" /> {t('Live Chat')}
        </Col>
      </Row>
      <Row className="mb-lg-11 mb-9">
        <Col xs={12} className="outer-links-container">
          <div className="links">
            {config?.documents?.map((documents, index) => (
              <React.Fragment key={index}>
                <a href={documents.link} className="links-item">
                  {documents.name}
                </a>
                {index + 1 != config.documents.length && <div className="links-divider"></div>}
              </React.Fragment>
            ))}
          </div>
          <div className="social-links ml-auto">
            {config?.socialMediaLinks?.map((socialLink, index) => (
              <a key={index} href={socialLink.link} className="noUnderLine">
                <Svg
                  href={socialLink.icon}
                  className={classNames(index + 1 != config.socialMediaLinks.length && 'mr-5')}
                />
              </a>
            ))}
          </div>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col xs={12} className="context mb-lg-9 mb-7">
          <b className="mr-2">{t('High Risk Investment Warning')}:</b>
          {t('High Risk Investment Warning Main Desc')}
        </Col>
        <Col xs={12} className="context mb-lg-9 mb-7">
          <b className="mr-2">{t('Disclaimer')}:</b>
          {t('Disclaimer Desc')}
        </Col>
        <Col xs={12} className="context mb-lg-9 mb-7">
          <b className="mr-2">{t('Regional Restrictions')}:</b>
          <Trans i18nKey="Regional Restrictions Desc">
            Regional Restrictions Desc
            <a className="ml-2">{t('Help Center')}</a>
          </Trans>
        </Col>
      </Row>
      <hr />
      <Row className="mt-lg-11 mt-9 copyright">
        <LabelView>
          {{
            [ELabels.bsfx]: (
              <Col xs={12} className="mb-lg-9 mb-7">
                <Trans i18nKey="Regulation Desc">
                  Regulation Desc
                  <b>Registration Number</b>
                  <a className="ml-2">Label Link</a>
                </Trans>
              </Col>
            ),
          }}
        </LabelView>
        <Col xs={12}>{t('Label Copyright')}</Col>
      </Row>
    </Container>
  );
});
