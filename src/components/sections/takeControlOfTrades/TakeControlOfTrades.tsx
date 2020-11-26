import { Button, Img } from '@components/shared';
import classNames from 'classnames';
import React, { forwardRef, memo } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import './TakeControlOfTrades.scss';

export interface ITakeControlOfTradesSection {
  data: { title: string; desc: string; img: string }[];
}

export const TakeControlOfTradesSection = memo(
  forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & ITakeControlOfTradesSection>(
    function TakeControlOfTradesSection(props, ref) {
      const { t } = useTranslation();

      return (
        <section className={classNames('take-control-of-trades-section', props.className)} ref={ref}>
          <Container>
            <Row>
              <Col xs={12}>
                <div className="take-control-of-trades-section__title mb-12">{t('Take Control of Your Trades')}</div>
              </Col>
            </Row>
            <Row className="controls-row">
              {props.data.map((item, i) => (
                <Col xs={10} md={5} lg={4} key={i} className="px-0 px-lg-7 mx-5 mx-lg-0">
                  <div className={classNames('take-control-of-trades-section__item p-9', i % 2 === 0 && 'even')}>
                    <div className="item-title mb-4">{t(item.title)}</div>
                    <div className="item-description mb-4">{t(item.desc)}</div>
                    <Img src={item.img} />
                  </div>
                </Col>
              ))}
            </Row>
            <Row>
              <Col xs={12} className="mt-12">
                <Button>{t('Start Trading')}</Button>
              </Col>
            </Row>
          </Container>
        </section>
      );
    },
  ),
);
