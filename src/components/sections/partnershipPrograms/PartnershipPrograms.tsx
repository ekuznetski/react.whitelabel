import { Button, Card, CardContent, CardHeader, Cards, Svg } from '@components/shared';
import { ELabels } from '@domain/enums';
import classNames from 'classnames';
import React, { forwardRef, memo } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { AnyFunction } from '@domain/interfaces';
import './PartnershipPrograms.scss';
import { Col, Container, Row } from 'react-bootstrap';

export interface ISelect {
  onNavigate: AnyFunction;
}

export const PartnershipPrograms = memo(
  forwardRef<HTMLDivElement, ISelect & React.HTMLAttributes<HTMLDivElement>>(function PartnershipPrograms(props, ref) {
    const { t } = useTranslation();

    const programPoints = {
      affiliate: [
        t('Mobile optimized marketing tools'),
        t('Dedicated affiliate manager'),
        t('Round-the-clock access to all your analytics'),
      ],
      brokers: [
        t('Multi-level marketing rebate tiers'),
        t('Free market reviews for clients'),
        t('Customizable marketing and advertising tools'),
        t('Local office and events support'),
      ],
    };

    const onProgramSelect = (program: string) => () => {
      props?.onNavigate?.(program);
    };

    return (
      <section className={classNames('partnership-programs-section', props.className)} ref={ref}>
        <Container>
          <Row>
            <Col xs={12} className="partnership-programs__header">
              <div className="partnership-programs__title mb-4">
                <Trans i18nKey="Programs Section Title">
                  <strong>CUSTOM-MADE</strong> FOR YOU
                </Trans>
              </div>
              <div className="partnership-programs__description mb-11">{t('Programs Section Desc')}</div>
            </Col>
            <Col xs={12} className="p-0">
              <Cards id="partnership-programs__cards">
                <Card wrapperClassName="card col-12 col-md-6 col-lg-4 mb-7 mb-md-0" uid={1}>
                  <CardHeader className="mb-8 header">
                    <Svg href="affiliate" _label={ELabels.bsfx} className="mr-5" />
                    {t('Affiliate Program')}
                  </CardHeader>
                  <CardContent className="text-left">
                    <div className="points">
                      {programPoints.affiliate.map((point) => (
                        <div className="points__item mb-4">{point}</div>
                      ))}
                    </div>
                    <Button onClick={onProgramSelect('affiliate')}>{t('Sign Up')}</Button>
                  </CardContent>
                </Card>
                <Card wrapperClassName="card col-12 col-md-6 col-lg-4 mb-7 mb-md-0" uid={2}>
                  <CardHeader className="mb-8 header">
                    <Svg href="brokers" _label={ELabels.bsfx} className="mr-5" />
                    {t('Introducing Brokers')}
                  </CardHeader>
                  <CardContent className="text-left">
                    <div className="points">
                      {programPoints.brokers.map((point) => (
                        <div className="points__item mb-4">{point}</div>
                      ))}
                    </div>
                    <Button onClick={onProgramSelect('ib')}>{t('Sign Up')}</Button>
                  </CardContent>
                </Card>
              </Cards>
            </Col>
          </Row>
        </Container>
      </section>
    );
  }),
);
