import { Card, CardContent, CardHeader, Cards, LabelView, Svg } from '@components/shared';
import { ELabels } from '@domain/enums';
import { config } from '@pages/main/home';
import React, { memo } from 'react';
import { Col, Container, Row } from '@components/shared';
import { Trans, useTranslation } from 'react-i18next';
import './TradeProductsSection.scss';

export const TradeProductsSection = memo(function TradeProductsSection() {
  const { t } = useTranslation();

  return (
    <section className="trade-products">
      <Container>
        <Row>
          <Col xs={12} className="trade-products__header">
            <div className="trade-products__title">
              <Trans i18nKey="Trade our products">
                <b>Trade</b> Our Products
              </Trans>
            </div>
          </Col>
          <div className="trade-products__cards">
            <Cards id="tradeProductsCards">
              {config.tradeProductsCards.map((card, c) => (
                <Card key={c} wrapperClassName="card" uid={c}>
                  <CardHeader>
                    <Svg href={card.icon} />
                    {card.title}
                  </CardHeader>
                  <CardContent>
                    <div className="label">
                      <b>
                        <LabelView>
                          {{
                            '*': t('exchange'),
                            [ELabels.bsfx]: t('Instruments:'),
                          }}
                        </LabelView>
                      </b>
                    </div>
                    <span className="greyText">{card.exchange}</span>
                  </CardContent>
                </Card>
              ))}
            </Cards>
          </div>
        </Row>
      </Container>
    </section>
  );
});
