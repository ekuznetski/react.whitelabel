import { Card, CardContent, CardHeader, Cards, Col, Container, Row, Svg } from '@components/shared';
import { accountTypePip } from '@domain';
import classNames from 'classnames';
import React, { forwardRef, memo } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import './AccountTypesForTradingStyles.scss';

export const AccountTypesForTradingStylesSection = memo(
  forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(function AccountTypesForTradingStylesSection(
    props,
    ref,
  ) {
    const { t } = useTranslation();

    const cards = [
      {
        icon: 'star',
        title: t('Fixed'),
        desc: t('Fixed Spreads from'),
        type: accountTypePip.fixed,
      },
      {
        icon: 'light',
        title: t('Variable'),
        desc: t('Variable Spreads from'),
        type: accountTypePip.variable,
      },
      {
        icon: 'raw',
        title: t('Raw'),
        desc: t('Raw Spreads from'),
        type: accountTypePip.raw,
      },
    ];

    return (
      <section className={classNames('account-types-for-trading-styles-section', props.className)} ref={ref}>
        <Container>
          <Row>
            <Col xs={12} className="account-types-for-trading-styles-section__title mb-10">
              <Trans i18nKey="Account Types Secure Title">
                <b>Our transparency</b> will help you choose
              </Trans>
            </Col>
            <Col xs={12} md={8} lg={7} className="account-types-for-trading-styles-section__description mb-10 mx-auto">
              {t('Account Types Secure Desc')}
            </Col>
          </Row>
          <Row>
            <Col xs={12} className="account-types-for-trading-styles-section__content p-0">
              <Cards id="accountTypesForTradingStylesSectionCards">
                {cards.map((card, idx) => (
                  <Card wrapperClassName="col-12 col-md-6 col-lg-5 col-xl-4 mb-7 mb-md-0" uid={idx}>
                    <CardHeader className="mb-4 header">
                      {card.title}
                      <div className="icon ml-auto">
                        <Svg href={card.icon} />
                      </div>
                    </CardHeader>
                    <CardContent className="text-left">
                      <div className="mb-6">{card.desc}</div>
                      <div className="pips">
                        {card.type}
                        <small>{t('pips')}</small>
                      </div>
                      <div className="tag">{t('No Commission')}</div>
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
