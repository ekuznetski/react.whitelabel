import { Button, Img, LabelView, LocaleLink } from '@components/shared';
import { ELabels } from '@domain/enums';
import classNames from 'classnames';
import { locale } from './';
import React, { forwardRef, memo } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Trans, useTranslation } from 'react-i18next';
import './PrestigiousPlatformTechnology.scss';

interface PrestigiousPlatformTechnologyProps {
  title?: string | React.ReactFragment;
  description?: string | React.ReactFragment;
  className?: string;
}

export const PrestigiousPlatformTechnologySection = memo(
  forwardRef<HTMLDivElement, PrestigiousPlatformTechnologyProps>(function PrestigiousPlatformTechnologySection(
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
                {title || locale.prestigiousPlatformTechnologyTitle}
              </div>
              <div className="prestigious-platform-technology__description mb-10">
                {description || locale.prestigiousPlatformTechnologyDesc}
              </div>
              <Button>
                <LocaleLink to="/registration">{t('Open Live Account')}</LocaleLink>
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
