import { LocaleLink, Svg } from '@components/shared';
import React, { memo } from 'react';
import { Col, Container, Row } from '@components/shared';
import { useTranslation } from 'react-i18next';
import { config } from '@core/header/main';
import './TopBar.scss';

export const TopBar = memo(function TopBar() {
  const { t } = useTranslation();

  return (
    <Container className="top-header">
      <Row>
        <Col className="top-header__links ml-auto">
          {config.topBarLinks.map(({ url, label, icon }) => (
            <div className="top-header__item ml-5" key={url}>
              <Svg href={icon} height={14} className="mr-1" />
              <LocaleLink to={url}>{t(label)}</LocaleLink>
            </div>
          ))}
        </Col>
      </Row>
    </Container>
  );
});
