import { Card, CardContent, CardHeader, Cards, LabelView, Svg } from '@components/shared';
import { ELabels } from '@domain/enums';
import { config } from '@pages/main/home';
import React, { memo } from 'react';
import { Col, Container, Row } from '@components/shared';
import { useTranslation } from 'react-i18next';
import './TradeProductsSection.scss';

export const TradeProductsSection = memo(function TradeProductsSection() {
  const { t } = useTranslation();

  return (
    <section className="trade-products">
      <Container>
        <Row>
          <Col xs={12} className="mb-11">
            <div className="trade-products__title">
              <b>{t('Trade')}</b> {t('Our Products')}
            </div>
          </Col>
          <Col xs={12} className="p-0">
            <Cards id="tradeProductsCards">
              {config.tradeProductsCards.map((card, c) => (
                <Card key={c} wrapperClassName="col-12 col-md-6 col-lg-4 mb-9" uid={c}>
                  <CardHeader className="mb-7">
                    <Svg href={card.icon} className="mr-5" />
                    {card.title}
                  </CardHeader>
                  <CardContent className="text-left">
                    <div className="mb-1">
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
          </Col>
        </Row>
      </Container>
    </section>
  );
});
