import { Card, CardContent, CardHeader, Cards, Col, Container, Img, Row, Svg } from '@components/shared';
import { config } from '@pages/main/home';
import React, { memo } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import './TradeProductsSection.scss';

export const TradeProductsSection = memo(function TradeProductsSection() {
  const { t } = useTranslation();

  return (
    <section className="trade-products">
      <Container>
        <Row>
          <Col xs={12} className="mb-1">
            <div className="trade-products__title">
              <Trans i18nKey="Trade our products">
                <b>Discover</b> our products
              </Trans>
            </div>
          </Col>
          <Col xs={12} className="p-0">
            <Cards id="tradeProductsCards">
              {config.tradeProductsCards.map((card, c) => (
                <Card key={c} wrapperClassName="col-12 col-md-6 col-lg-4 mt-9" uid={c}>
                  <CardHeader className="mb-8">
                    <div className="icon mr-5">
                      <Svg href={card.icon} />
                    </div>
                    {card.title}
                  </CardHeader>
                  <CardContent className="text-left">
                    {card.sideIcons && (
                      <div className="icons">
                        {card.sideIcons.map((icon, i) => (
                          <Img key={i} src={`assets/${icon}`} />
                        ))}
                      </div>
                    )}
                    <div className="mb-1">{card.exchange}</div>
                    <div className="greyText">{t('and much more')}</div>
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
