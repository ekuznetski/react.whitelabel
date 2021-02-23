import { Button, Img, LocaleLink } from '@components/shared';
import { EPagePath } from '@domain/enums';
import classNames from 'classnames';
import React, { forwardRef, memo } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { locale } from '.';
import './PlatformTechnologySection.scss';

interface PlatformTechnologySectionProps {
  title?: string | React.ReactFragment;
  description?: string | React.ReactFragment;
  className?: string;
}

export const PlatformTechnologySection = memo(
  forwardRef<HTMLDivElement, PlatformTechnologySectionProps>(function PlatformTechnologySection(
    { title, description, className },
    ref,
  ) {
    const { t } = useTranslation();

    return (
      <section className="prestigious-platform-technology" ref={ref}>
        <Container>
          <Row>
            <Col xs={12} lg={6} className="mt-md-12 mt-lg-0 mb-12 mt-md-0">
              <div className={classNames('prestigious-platform-technology__title mb-7', className)}>
                {title || locale.platformTechnologyTitle}
              </div>
              <div className="prestigious-platform-technology__description mb-10">
                {description || locale.platformTechnologyDesc}
              </div>
              <Button>
                <LocaleLink to={EPagePath.Registration}>{t('Open Live Account')}</LocaleLink>
              </Button>
            </Col>
            <Col xs={12} lg={6}>
              <Img src="platform_devices.jpg" />
            </Col>
          </Row>
        </Container>
      </section>
    );
  }),
);
