import { Svg } from '@components/shared';
import { config } from '@core/footer';
import classNames from 'classnames';
import React, { memo } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useIntercom } from 'react-use-intercom';
import './FooterMain.scss';

export const FooterMain = memo(function FooterMain() {
  const { t } = useTranslation();
  const { show } = useIntercom();

  return (
    <Container className="py-lg-16 py-md-15 py-13">
      <Row className="mb-lg-11 mb-9">
        <Col xs={12} className="live-chat">
          <Svg href="chat" className="mr-5" /> <a onClick={show}>{t('Live Chat')}</a>
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
            {config.socialMediaLinks?.map((socialLink, index) => (
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
      <Row className="mb-4">{config.context.main}</Row>
      <hr />
      <Row className="mt-lg-11 mt-9 copyright">{config.copyright.main}</Row>
    </Container>
  );
});
