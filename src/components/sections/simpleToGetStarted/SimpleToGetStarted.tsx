import { SectionBg } from '@components/shared';
import classNames from 'classnames';
import React, { forwardRef, memo } from 'react';
import { Col, Container, Row } from '@components/shared';
import { useTranslation } from 'react-i18next';
import { config } from './';
import './SimpleToGetStarted.scss';

export const SimpleToGetStartedSection = memo(
  forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(function SimpleToGetStartedSection(props, ref) {
    const { t } = useTranslation();

    return (
      <section className={classNames('simple-to-get-started', props.className)} ref={ref}>
        <SectionBg primary={config.bg} />
        <Container>
          <Row>
            <Col className="simple-to-get-started__header">
              <div className="header__title">{config.headerTitle}</div>
              <div className="header__description">{config.headerDescription}</div>
            </Col>
            <Col className="simple-to-get-started__steps">
              <Row>
                {config.steps.map((step, idx) => (
                  <Col key={idx} className="steps__item">
                    <div className="step">
                      <div className="step-title">
                        <div className="step-title-number">{idx + 1}</div>
                        {step.title}
                      </div>
                      <div className="step-context">{step.context}</div>
                    </div>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
    );
  }),
);
