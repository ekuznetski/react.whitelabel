import { LocaleLink, Svg } from '@components/shared';
import React, { memo } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import './TopBar.scss';

export const TopBar = memo(function TopBar() {
  const { t } = useTranslation();
  const links = [
    {
      url: '/partnerships',
      icon: 'affiliate',
      label: 'Partnership',
    },
    {
      url: '',
      icon: 'phone',
      label: 'Help Center',
    },
  ];

  return (
    <Container className="top-header">
      <Row>
        <Col className="top-header__links ml-auto">
          {links.map(({ url, label, icon }) => (
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
