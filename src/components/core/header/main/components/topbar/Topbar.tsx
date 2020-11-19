import { LocaleLink, Svg } from '@components/shared';
import React, { memo } from 'react';
import { Col, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import './Topbar.scss';

interface ITopbarProps {
  links: {
    url: string;
    icon?: string;
    label: string;
  }[];
}

export const Topbar = memo(function Topbar({ links }: ITopbarProps) {
  const { t } = useTranslation();

  return (
    <>
      <div className="top-header">
        <Container>
          <Col className="top-header-links">
            {links.map(({ url, label, icon }) => (
              <div className="item">
                <Svg href={icon} height={16} />
                <LocaleLink to={url}>{t(label)}</LocaleLink>
              </div>
            ))}
          </Col>
        </Container>
      </div>
    </>
  );
});
