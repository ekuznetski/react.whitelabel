import { SectionBg } from '@components/shared';
import classNames from 'classnames';
import React, { forwardRef, memo } from 'react';
import { Col, Container, Row } from '@components/shared';
import { useTranslation } from 'react-i18next';
import './SimpleToGetStarted.scss';

export const SimpleToGetStartedSection = memo(
  forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(function SimpleToGetStartedSection(props, ref) {
    const { t } = useTranslation();

    return (
      <section className={classNames('simple-to-get-started', props.className)} ref={ref}>
        <SectionBg primary="simple-to-get-started.jpg" />
        <Container>
          <Row>
            <Col xs={12} lg={4} xl={3} className="mb-11 mb-lg-0">
              <div className="simple-to-get-started__title mb-7">
                {t("It's Simple to get started:0")}
                <b>{t("It's Simple to get started:1")}</b>
              </div>
              <div className="simple-to-get-started__description">{t('Start Trading In 3 Easy Steps')}</div>
            </Col>
            <Col xs={12} lg={8} className="offset-xl-1 simple-to-get-started__steps">
              <Row>
                <Col xs={12} md={4} className="mb-7 mb-md-0">
                  <div className="step px-7 py-8 p-xl-9">
                    <div className="step-title mb-0 mb-md-3 mt-n1">
                      <div className="step-title-number mr-5 ml-n3">1</div>
                      {t('Sign Up')}
                    </div>
                    <div className="step-context">{t('Start Trading Steps Desc:0')}</div>
                  </div>
                </Col>
                <Col xs={12} md={4} className="mb-7 mb-md-0">
                  <div className="step p-7 p-xl-9">
                    <div className="step-title mb-0 mb-md-3 mt-n1">
                      <div className="step-title-number mr-5 ml-n3">2</div>
                      {t('Explore The Platform')}
                    </div>
                    <div className="step-context">{t('Start Trading Steps Desc:1')}</div>
                  </div>
                </Col>
                <Col xs={12} md={4}>
                  <div className="step p-7 p-xl-9">
                    <div className="step-title mb-0 mb-md-3 mt-n1">
                      <div className="step-title-number mr-5 ml-n3">3</div>
                      {t('Start Trading')}
                    </div>
                    <div className="step-context">{t('Start Trading Steps Desc:2')}</div>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
    );
  }),
);
