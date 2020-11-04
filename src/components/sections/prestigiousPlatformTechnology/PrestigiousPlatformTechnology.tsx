import { Button, Img, LabelView, LocaleLink } from '@components/shared';
import { ELabels } from '@domain/enums';
import classNames from 'classnames';
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
                {title || (
                  <LabelView>
                    {{
                      '*': (
                        <Trans i18nKey="Prestigious Platform Technology Title">
                          Prestigious MT5 <br /> <b>Platform Technology</b>
                        </Trans>
                      ),
                      [ELabels.bsfx]: (
                        <Trans i18nKey="Prestigious Platform Technology Title">
                          Prestigious MT4 <br /> <b>Platform Technology</b>
                        </Trans>
                      ),
                    }}
                  </LabelView>
                )}
              </div>
              <div className="prestigious-platform-technology__description mb-10">
                {description || (
                  <LabelView>
                    {{
                      '*': (
                        <Trans i18nKey="Prestigious Platform Technology Desc">
                          <p className="mb-6">
                            Metatrader is the most popular electronic trading platforms and has long been considered the
                            <b> forex industry standard</b> because of its innovative technology.
                          </p>
                          <p className="mb-6">
                            The platform is suitable for traders of all levels and expertise, offering flexible trading
                            systems, a mobile app, Expert Advisors, and advanced technical analysis.
                          </p>
                          <p>
                            Compared to its predecessor, MT5 has <b>additional features</b> including 6 types of pending
                            orders, 21 timeframes to choose from, and an integrated fundamental economic calendar
                          </p>
                        </Trans>
                      ),
                      [ELabels.bsfx]: (
                        <Trans i18nKey="Prestigious Platform Technology Desc">
                          <p className="mb-6">
                            Metatrader is the most popular electronic trading platforms and has long been considered the
                            <b> forex industry standard</b> because of its innovative technology.
                          </p>
                          <p className="mb-6">
                            The platform is suitable for traders of all levels and expertise, offering flexible trading
                            systems, a mobile app, Expert Advisors, and advanced technical analysis.
                          </p>
                          <p>
                            Compared to its predecessor, MT4 has <b>additional features</b> including 6 types of pending
                            orders, 21 timeframes to choose from, and an integrated fundamental economic calendar
                          </p>
                        </Trans>
                      ),
                    }}
                  </LabelView>
                )}
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
