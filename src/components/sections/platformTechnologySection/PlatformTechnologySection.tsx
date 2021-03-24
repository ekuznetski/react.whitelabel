import { Button, Img, LocaleLink } from '@components/shared';
import { EPagePath } from '@domain/enums';
import classNames from 'classnames';
import React, { forwardRef, memo } from 'react';
import { Col, Container, Row } from '@components/shared';
import { useTranslation } from 'react-i18next';
import { config } from '.';
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
      <section className={classNames('prestigious-platform-technology', className)} ref={ref}>
        <Container>
          <Row>
            <Col className="prestigious-platform-technology__context">
              <div className="context__title mb-7">{title || config.title}</div>
              <div className="context__description mb-10">{description || config.desc}</div>
              <Button>
                <LocaleLink to={EPagePath.Registration}>{t('Open Live Account')}</LocaleLink>
              </Button>
            </Col>
            <Col className="prestigious-platform-technology__img">
              <Img src={config.image} />
            </Col>
          </Row>
        </Container>
      </section>
    );
  }),
);
