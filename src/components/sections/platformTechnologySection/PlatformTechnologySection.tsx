import { Button, Img, LocaleLink } from '@components/shared';
import { EPagePath } from '@domain/enums';
import classNames from 'classnames';
import React, { forwardRef, memo } from 'react';
import { Col, Container, Row } from '@components/shared';
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
            <Col className="prestigious-platform-technology__context">
              <div className={classNames('context__title mb-7', className)}>
                {title || locale.platformTechnologyTitle}
              </div>
              <div className="context__description mb-10">{description || locale.platformTechnologyDesc}</div>
              <Button>
                <LocaleLink to={EPagePath.Registration}>{t('Open Live Account')}</LocaleLink>
              </Button>
            </Col>
            <Col className="prestigious-platform-technology__img">
              <Img src="platform_devices.jpg" />
            </Col>
          </Row>
        </Container>
      </section>
    );
  }),
);
