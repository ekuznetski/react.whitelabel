import { Button, Card, CardContent, CardHeader, Cards, Svg } from '@components/shared';
import { EPartnershipTabs, usePartnershipDispatch, usePartnershipState } from '@pages/main/partnerships';
import classNames from 'classnames';
import React, { forwardRef, memo } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Trans, useTranslation } from 'react-i18next';
import { config } from './PartnershipPrograms.config';
import './PartnershipPrograms.scss';

export const PartnershipPrograms = memo(
  forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(function PartnershipPrograms(props, ref) {
    const { t } = useTranslation();
    const { formRef } = usePartnershipState();
    const dispatch = usePartnershipDispatch();

    function navigateToForm() {
      formRef?.current?.scrollIntoView({ behavior: 'smooth' });
    }

    function onProgramSelect(program: EPartnershipTabs) {
      dispatch({ type: 'changeTab', activeTab: program });
      navigateToForm();
    }

    return (
      <section className={classNames('partnership-programs-section', props.className)} ref={ref}>
        <Container>
          <Row>
            <Col xs={12} className="partnership-programs__header">
              <div className="partnership-programs__title mb-md-7 mb-5">
                <Trans i18nKey="Custom Made For You">
                  <strong>CUSTOM-MADE</strong> FOR YOU
                </Trans>
              </div>
              <div className="partnership-programs__description mb-xl-11 mb-md-9 mb-7">
                {t('Choose From Our Programs')}
              </div>
            </Col>
            <Col xs={12} className="p-0">
              <Cards id="partnership-programs__cards">
                {config.programsCards.map((card) => (
                  <Card key={card.id} uid={card.id} wrapperClassName="col-12 col-md-6 col-lg-5 col-xl-4 mb-7 mb-md-0">
                    <CardHeader className="mb-8 header">
                      <Svg href={card.icon} className="mr-5" />
                      {card.label}
                    </CardHeader>
                    <CardContent className="text-left">
                      <div className="points">
                        {card.points.map((point, p) => (
                          <div className="points__item mb-4" key={p}>
                            {point}
                          </div>
                        ))}
                      </div>
                      <Button noBg onClick={() => onProgramSelect(card.id)}>
                        {card.btnText}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </Cards>
            </Col>
          </Row>
        </Container>
      </section>
    );
  }),
);
